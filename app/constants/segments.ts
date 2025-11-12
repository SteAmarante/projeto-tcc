// Re-export constants from project-level constants to avoid duplication.
// This file lives under `app/` so the router expects a default React export.
// Export a tiny inert React component as default to silence the router warning,
// and re-export the real data from the project-level `constants` folder.

export * from '../../constants/segments';

export default function _SegmentsRoute() {
  return null;
}
