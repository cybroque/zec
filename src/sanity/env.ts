export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-07";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Sanity requires projectId to only contain [a-z0-9-]
export const isSanityConfigured = Boolean(
  rawProjectId &&
    /^[a-z0-9-]+$/.test(rawProjectId) &&
    rawProjectId !== "your-project-id" &&
    rawProjectId !== "placeholder-project-id"
);

export const projectId =
  rawProjectId && /^[a-z0-9-]+$/.test(rawProjectId)
    ? rawProjectId
    : "placeholder-project-id";

export const useCdn = false;
