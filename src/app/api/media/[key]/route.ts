import { getKV } from "@/lib/store";

const KEY_RE = /^[a-z0-9]+-[a-z0-9]+\.(png|jpg|webp|gif|avif)$/;

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!KEY_RE.test(key)) return new Response("Not found", { status: 404 });
  const file = await getKV("media").getBinary(key).catch(() => null);
  if (!file) return new Response("Not found", { status: 404 });
  return new Response(file.data, {
    headers: {
      "Content-Type": file.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
