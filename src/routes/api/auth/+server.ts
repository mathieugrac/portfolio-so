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
  if (window.opener) {
    window.opener.postMessage("authorization:github:error:" + JSON.stringify({msg: error}), "*");
    window.close();
  }
})();
</script>
</body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const token = tokenData.access_token;
  
  return new Response(
    `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Auth</title></head>
<body>
<script>
(function() {
  var token = "${token}";
  
  if (window.opener) {
    // Try multiple message formats - Decap CMS 3.x expects JSON format
    var formats = [
      "authorization:github:success:" + JSON.stringify({token: token}),
      "authorization:github:success:" + JSON.stringify({token: token, provider: "github"}),
      "authorization:github:success:" + token
    ];
    
    formats.forEach(function(msg, i) {
      setTimeout(function() {
        console.log("Sending format " + i + ":", msg);
        window.opener.postMessage(msg, "*");
      }, i * 100);
    });
    
    setTimeout(function() { window.close(); }, 1000);
  } else {
    document.body.innerHTML = '<p>Auth successful but no opener. Close this window and refresh /admin/</p>';
  }
})();
</script>
<p>Authenticating...</p>
</body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
};
