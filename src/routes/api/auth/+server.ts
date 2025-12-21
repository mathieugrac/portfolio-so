import { redirect } from "@sveltejs/kit";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get("code");

  if (!code) {
    const authUrl = new URL("https://github.com/login/oauth/authorize");
    authUrl.searchParams.set("client_id", GITHUB_CLIENT_ID);
    authUrl.searchParams.set("scope", "repo,user");
    authUrl.searchParams.set("redirect_uri", `${url.origin}/api/auth`);
    throw redirect(302, authUrl.toString());
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    }
  );

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(
      `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Auth Error</title></head>
<body>
<p>Error: ${tokenData.error_description || tokenData.error}</p>
<script>
(function() {
  var error = ${JSON.stringify(tokenData.error_description || tokenData.error)};
  var msg = "authorization:github:error:" + JSON.stringify({msg: error});
  
  // Try window.opener
  if (window.opener) {
    window.opener.postMessage(msg, "*");
    window.close();
  }
})();
</script>
</body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const token = tokenData.access_token;
  
  // Return HTML that sends the message and handles the case where opener is null
  return new Response(
    `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Auth</title></head>
<body>
<script>
(function() {
  var token = "${token}";
  var provider = "github";
  var msg = "authorization:" + provider + ":success:" + JSON.stringify({token: token, provider: provider});
  
  console.log("Sending auth message:", msg);
  
  // Method 1: Try window.opener (standard way)
  if (window.opener) {
    console.log("Found window.opener, sending message");
    window.opener.postMessage(msg, "${url.origin}");
    setTimeout(function() { window.close(); }, 500);
    return;
  }
  
  // Method 2: Try parent (in case of iframe)
  if (window.parent && window.parent !== window) {
    console.log("Found window.parent, sending message");
    window.parent.postMessage(msg, "${url.origin}");
    setTimeout(function() { window.close(); }, 500);
    return;
  }
  
  // Method 3: Use BroadcastChannel API
  if (typeof BroadcastChannel !== 'undefined') {
    console.log("Using BroadcastChannel");
    var bc = new BroadcastChannel('decap-cms-auth');
    bc.postMessage({token: token, provider: provider});
    bc.close();
  }
  
  // Method 4: Use localStorage (fallback - parent window can listen for storage events)
  console.log("Using localStorage fallback");
  localStorage.setItem('decap-cms-auth', JSON.stringify({token: token, provider: provider, timestamp: Date.now()}));
  
  // Show success message
  document.body.innerHTML = '<p>Authentication successful!</p><p>Token received. You can close this window and refresh the admin page.</p>';
})();
</script>
<p>Authenticating...</p>
</body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
};
