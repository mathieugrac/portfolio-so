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
<html><head><meta charset="utf-8"></head>
<body><script>
  window.opener && window.opener.postMessage(
    "authorization:github:error:" + ${JSON.stringify(JSON.stringify({ msg: tokenData.error }))},
    "*"
  );
  setTimeout(() => window.close(), 1000);
</script>
<p>Error: ${tokenData.error_description || tokenData.error}</p>
</body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  // Try the format Decap CMS expects
  return new Response(
    `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body><script>
(function() {
  var token = "${tokenData.access_token}";
  var provider = "github";
  
  // Format 1: JSON with token and provider
  var msg1 = "authorization:" + provider + ":success:" + JSON.stringify({token: token, provider: provider});
  
  // Format 2: JSON with access_token
  var msg2 = "authorization:" + provider + ":success:" + JSON.stringify({access_token: token});
  
  console.log("Sending messages:", msg1, msg2);
  
  if (window.opener) {
    window.opener.postMessage(msg1, "*");
    setTimeout(function() { window.opener.postMessage(msg2, "*"); }, 50);
    setTimeout(function() { window.close(); }, 1000);
  } else {
    document.body.innerHTML = "<p>Auth successful. Token: " + token.substring(0,10) + "... Close this window.</p>";
  }
})();
</script>
<p>Authenticating...</p>
</body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
};
