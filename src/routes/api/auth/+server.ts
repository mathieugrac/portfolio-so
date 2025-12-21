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
    const content = `authorization:github:error:${JSON.stringify({ msg: tokenData.error_description || tokenData.error })}`;
    
    return new Response(
      `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8"><title>Error</title></head>
  <body>
    <script>
      const content = '${content}';
      if (window.opener) {
        window.opener.postMessage(content, '*');
      }
      setTimeout(() => window.close(), 250);
    </script>
    <p>${tokenData.error_description || tokenData.error}</p>
  </body>
</html>`,
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Step 3: Send token back to Decap CMS
  const token = tokenData.access_token;
  const content = `authorization:github:success:{"token":"${token}","provider":"github"}`;

  return new Response(
    `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8"><title>Success</title></head>
  <body>
    <script>
      const content = '${content}';
      console.log('Sending message:', content);
      if (window.opener) {
        window.opener.postMessage(content, '*');
        console.log('Message sent to opener');
      } else {
        console.log('No opener found');
      }
      setTimeout(() => {
        console.log('Closing window');
        window.close();
      }, 500);
    </script>
    <p>Success! This window will close automatically...</p>
  </body>
</html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
};
