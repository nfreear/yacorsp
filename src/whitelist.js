import { env } from 'cloudflare:workers';

export function whitelistFromEnv () {
  // Check your configuration!
  if (!('ORIGIN_WHITELIST' in env)) {
    return null; // Was: [];
  }

  const whitelist = env.ORIGIN_WHITELIST.trim().split(/\s+/);

  console.assert(Array.isArray(whitelist), 'Missing whitelist array');
  console.debug('Proxy whitelist:', typeof whitelist, whitelist);
  return whitelist;
}

/**
 * Start simple - require an exact match!
 */
export function isWhitelisted (origin) {
  const whitelist = whitelistFromEnv();
  return origin && whitelist.find(it => it === origin);
}
