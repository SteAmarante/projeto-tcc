// Central API base URL used across the app. Change only this file when you need
// to point the app to a different server (LAN IP, emulator addresses, tunnel, etc.).
// NOTE: This file lives under `app/` so Expo Router treats it as a route.
// Expo Router requires a default React export for files under `app/`.
// Export a tiny inert default component to silence that warning while keeping
// the named export for runtime code.
export const API_BASE = 'http://192.168.15.7:4000';

// Inert default export so expo-router doesn't warn about missing default export.
export default function _ApiRoute() {
	return null;
}
