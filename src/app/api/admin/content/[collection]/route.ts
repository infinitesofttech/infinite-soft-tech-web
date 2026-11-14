import { revalidatePath } from "next/cache";
import { authorizeAdminRequest, unauthorized } from "@/lib/auth";
import { isCollectionKey, readCollection, readSettings, writeCollection, writeSettings } from "@/lib/content";
import { normalizeCollection, normalizeSettings, ValidationError } from "@/lib/normalize";
import type { CollectionMap } from "@/lib/types";

type Ctx = { params: Promise<{ collection: string }> };

function refreshWebsite() {
  // Rebuild every public page on next visit so admin changes go live immediately.
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
}

export async function GET(request: Request, { params }: Ctx) {
  if (!(await authorizeAdminRequest(request))) return unauthorized();
  const { collection } = await params;
  try {
    if (collection === "settings") return Response.json({ settings: await readSettings() });
    if (!isCollectionKey(collection)) return Response.json({ error: "Unknown collection" }, { status: 404 });
    return Response.json({ items: await readCollection(collection) });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Could not load content." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Ctx) {
  if (!(await authorizeAdminRequest(request))) return unauthorized();
  const { collection } = await params;
  const raw = await request.text();
  if (raw.length > 2_000_000) return Response.json({ error: "Content is too large." }, { status: 413 });

  let body: { items?: unknown; settings?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  try {
    if (collection === "settings") {
      const settings = normalizeSettings(body.settings);
      await writeSettings(settings);
      refreshWebsite();
      return Response.json({ settings });
    }
    if (!isCollectionKey(collection)) return Response.json({ error: "Unknown collection" }, { status: 404 });
    const items = normalizeCollection(collection, body.items) as unknown as CollectionMap[typeof collection][];
    await writeCollection(collection, items);
    refreshWebsite();
    return Response.json({ items });
  } catch (err) {
    if (err instanceof ValidationError) return Response.json({ error: err.message }, { status: 400 });
    console.error(err);
    return Response.json({ error: "Could not save. Please try again." }, { status: 500 });
  }
}
