import { notFound } from "next/navigation";
import { CollectionManager } from "@/components/admin/CollectionManager";
import { COLLECTION_DEFS } from "@/lib/collections";
import { isCollectionKey } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  return { title: isCollectionKey(collection) ? COLLECTION_DEFS[collection].label : "Content" };
}

export default async function ContentPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  if (!isCollectionKey(collection)) notFound();
  return <CollectionManager key={collection} collection={collection} />;
}
