import { authorizeAdminRequest, unauthorized } from "@/lib/auth";
import { getKV } from "@/lib/store";

const TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};
const MAX_BYTES = 700 * 1024;

export async function POST(request: Request) {
  if (!(await authorizeAdminRequest(request))) return unauthorized();
  let file: File | null = null;
  try {
    const form = await request.formData();
    const f = form.get("file");
    file = f instanceof File ? f : null;
  } catch {
    return Response.json({ error: "Invalid upload." }, { status: 400 });
  }
  if (!file) return Response.json({ error: "No file selected." }, { status: 400 });
  const ext = TYPES[file.type];
  if (!ext) return Response.json({ error: "Only PNG, JPG, WEBP, GIF or AVIF images are allowed." }, { status: 400 });
  if (file.size > MAX_BYTES) return Response.json({ error: "Image must be smaller than 700 KB. Please compress it first." }, { status: 400 });

  const key = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  try {
    await getKV("media").setBinary(key, await file.arrayBuffer(), file.type);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
  return Response.json({ url: `/api/media/${key}` });
}
