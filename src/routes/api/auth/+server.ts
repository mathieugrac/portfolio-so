import { redirect } from "@sveltejs/kit";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get("code");

  if (!code) {
    // Step 1: Redirect to GitHub OAuth
    const authUrl = new URL("https://github.com/login/oauth/authorize");
    authUrl.searchParams.set("client_id", GITHUB_CLIENT_ID);
    authUrl.searchParams.set("scope", "repo,user");
    authUrl.searchParams.set("redirect_uri", `${url.origin}/api/auth`);

    throw redirect(302, authUrl.toString());
  }

  // Step 2: Exchange code for access token
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
<html><head><meta charset="utf-8"><title>Error</title></head>
<body>
<script>
(function() {
  function recieveMessage(e) {
    console.log("recieveMessage %o", e);
    window.opener.postMessage(
      'authorization:github:error:' + JSON.stringify({msg: e.message, err: e}),
      e.origin
    );
  }
  window.addEventListener("message", recieveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
<p>Error: ${tokenData.error_description || tokenData.error}</p>
</body></html>`,
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Step 3: Return success page that communicates with Decap CMS
  const token = tokenData.access_token;

  return new Response(
    `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Success</title></head>
<body>
<script>
(function() {
  function recieveMessage(e) {
    console.log("recieveMessage %o", e);
    window.opener.postMessage(
      'authorization:github:success:' + JSON.stringify({token: "${token}", provider: "github"}),
      e.origin
    );
    window.removeEventListener("message", recieveMessage, false);
  }
  window.addEventListener("message", recieveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
<p>Authorizing...</p>
</body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
};
