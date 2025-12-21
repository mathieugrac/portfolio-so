import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";

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
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head><title>Auth Error</title></head>
        <body>
          <script>
            window.opener.postMessage(
              'authorization:github:error:${JSON.stringify(tokenData)}',
              window.location.origin
            );
            window.close();
          </script>
        </body>
      </html>
    `,
      {
        headers: { "Content-Type": "text/html" },
      }
    );
  }

  // Step 3: Send token back to Decap CMS
  return new Response(
    `
    <!DOCTYPE html>
    <html>
      <head><title>Auth Success</title></head>
      <body>
        <script>
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({
              token: tokenData.access_token,
              provider: "github",
            })}',
            window.location.origin
          );
          window.close();
        </script>
      </body>
    </html>
  `,
    {
      headers: { "Content-Type": "text/html" },
    }
  );
};

