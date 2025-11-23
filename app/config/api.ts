import Constants from 'expo-constants';

const extra =
  ((Constants.expoConfig as any)?.extra) ||
  ((Constants.manifest as any)?.extra) ||
  {};

export const API_BASE =
  extra.API_BASE ||
  'https://risktrackapp-production.up.railway.app';

export default function _ApiRoute() {
  return null;
}
