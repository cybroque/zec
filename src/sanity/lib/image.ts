import { createClient } from "next-sanity";
import { dataset, projectId } from "../env";

// We can build image URLs using standard Sanity asset URL pattern or fallback
export function urlForImage(source: any): string | null {
  if (!source) return null;
  if (typeof source === "string") return source;

  // Sanity image asset object or reference
  const ref = source?.asset?._ref || source?._ref;
  if (ref && typeof ref === "string") {
    // Sanity asset ID format: image-{assetId}-{width}x{height}-{format}
    const parts = ref.split("-");
    if (parts.length >= 4) {
      const id = parts[1];
      const dimensions = parts[2];
      const format = parts[3];
      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
    }
  }

  if (source?.url) return source.url;
  return null;
}
