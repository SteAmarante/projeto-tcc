import Constants from 'expo-constants';

// Prefer runtime value injected via EAS/Expo (expoConfig.extra.API_BASE) when available.
// Fallback to a sensible default: local LAN address during dev, production URL otherwise.
const extra = ((Constants.expoConfig as any)?.extra) || ((Constants.manifest as any)?.extra) || {};

export const API_BASE =
  (extra && extra.API_BASE) ||
  (__DEV__ ? 'http://192.168.15.7:4000' : 'https://risktrackapp-production.up.railway.app');

// Inert default export so expo-router doesn't warn about missing default export.
export default function _ApiRoute() {
  return null;
}
