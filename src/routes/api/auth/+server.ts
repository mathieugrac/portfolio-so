import { redirect } from "@sveltejs/kit";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get("code");

  if (!code) {
    // Step 1: Redirect to GitHub OAuth
    const authUrl = new URL("https://github.com/login/oauth/authorize");
    authUrl.searchParams.set("client_id", GITHUB_CLIENT_ID);
    authUrl.searchParams.set("scope", "repo user");
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
    // Return error page
    return new Response(
      `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Authentication Error</title>
  </head>
  <body>
    <p>Authentication error: ${tokenData.error_description || tokenData.error}</p>
    <script>
      (function() {
        function sendMessage(message) {
          if (window.opener) {
            window.opener.postMessage(message, "*");
            setTimeout(function() { window.close(); }, 100);
          } else {
            document.body.innerHTML = '<p>Error: ' + message + '</p><p>Please close this window and try again.</p>';
          }
        }
        sendMessage('authorization:github:error:${JSON.stringify(tokenData).replace(/'/g, "\\'")}');
      })();
    </script>
  </body>
</html>`,
      {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  // Step 3: Send token back to Decap CMS
  const successData = JSON.stringify({
    token: tokenData.access_token,
    provider: "github",
  }).replace(/'/g, "\\'");

  return new Response(
    `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Authentication Successful</title>
  </head>
  <body>
    <p>Authenticating...</p>
    <script>
      (function() {
        function sendMessage(message) {
          if (window.opener) {
            window.opener.postMessage(message, "*");
            setTimeout(function() { window.close(); }, 100);
          } else {
            document.body.innerHTML = '<p>Success! You can close this window.</p>';
          }
        }
        sendMessage('authorization:github:success:${successData}');
      })();
    </script>
  </body>
</html>`,
    {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
};
