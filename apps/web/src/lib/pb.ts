// apps/web/src/lib/pb.ts
const PB_URL = import.meta.env.PUBLIC_PB_URL;

type ListOptions = Record<string, any>;

export async function pbList(collection: string, opts: ListOptions = {}) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(opts)) params.set(k, String(v));
  const url = `${PB_URL}/api/collections/${collection}/records?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`PocketBase list failed: ${res.status}`);
  return res.json();
}

export async function pbGet(collection: string, idOrSlug: string, by: "id" | "slug" = "id") {
  if (by === "id") {
    const res = await fetch(`${PB_URL}/api/collections/${collection}/records/${idOrSlug}`);
    if (!res.ok) throw new Error(`PocketBase get failed: ${res.status}`);
    return res.json();
  }

  // by slug
  const data = await pbList(collection, { filter: `slug="${idOrSlug}"`, perPage: 1 });
  return data?.items?.[0] ?? null;
}

export function fileUrl(collection: string, recordId: string, fileName: string) {
  return `${PB_URL}/api/files/${collection}/${recordId}/${fileName}`;
}
