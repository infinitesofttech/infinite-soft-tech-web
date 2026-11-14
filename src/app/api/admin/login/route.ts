import { createSession, isAuthConfigured, verifyCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return Response.json(
      { error: "Admin login is not configured. Add ADMIN_PASSWORD and AUTH_SECRET in Netlify environment variables." },
      { status: 503 },
    );
  }
  let username = "";
  let password = "";
  try {
    const body = (await request.json()) as { username?: unknown; password?: unknown };
    username = typeof body.username === "string" ? body.username : "";
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyCredentials(username, password)) {
    await new Promise((r) => setTimeout(r, 700)); // slow down brute-force attempts
    return Response.json({ error: "Wrong username or password." }, { status: 401 });
  }

  await createSession(username.trim());
  return Response.json({ ok: true });
}
