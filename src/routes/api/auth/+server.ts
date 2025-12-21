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
<p>Error: ${tokenData.error_description || tokenData.error}</p>
<script>
  if (window.opener) {
    window.opener.postMessage(
      "authorization:github:error:" + JSON.stringify({msg: "${tokenData.error_description || tokenData.error}"}),
      "*"
    );
  }
</script>
</body></html>`,
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Step 3: Return success - send token to opener
  const token = tokenData.access_token;

  return new Response(
    `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Success</title></head>
<body>
<p>Success! Closing...</p>
<script>
  const data = { token: "${token}", provider: "github" };
  const message = "authorization:github:success:" + JSON.stringify(data);
  
  if (window.opener) {
    // Try multiple times to ensure message is received
    window.opener.postMessage(message, "*");
    
    setTimeout(function() {
      window.opener.postMessage(message, "*");
    }, 100);
    
    setTimeout(function() {
      window.opener.postMessage(message, "*");
      window.close();
    }, 500);
  } else {
    document.body.innerHTML = "<p>Please close this window and refresh the admin page.</p>";
  }
</script>
</body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
};
