import { env } from 'cloudflare:workers';

export function getWhitelistFromEnv () {
  // Check configuration!
  if (!(PROXY_WHITELIST in env)) {
    console.error('Missing PROXY_WHITELIST env variable');
    return [];
  }

  const whitelist = env.PROXY_WHITELIST.trim().split(/\s+/);

  console.assert(Array.isArray(whitelist), 'Missing whitelist array');
  console.debug('Proxy whitelist:', typeof whitelist, whitelist);
  return whitelist;
}

/**
 * Start simple - require an exact match!
 */
export default function isWhiteListed (origin) {
  const whitelist = getWhitelistFromEnv();
  return origin && whitelist.find(it => it === origin);
}
