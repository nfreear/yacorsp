import { isWhitelisted, whitelistFromEnv } from './whitelist.js';
import {
  corsProxyResponse,
  errorNotWhitelistedResponse,
  errorBadRequestResponse,
  errorCaughtResponse
} from './responses.js';

/**
 * Yet Another CORS Proxy (YaCorsP).
 *
 * A minimalist CORS proxy as a CloudFlare worker.
 *
 * @license MIT
 */
export default {
	async fetch(request, env, ctx) {
    if (!whitelistFromEnv()) {
      return errorCaughtResponse('Missing ORIGIN_WHITELIST environment variable.\n\nCheck your configuration!');
    }

    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const proxiedUrl = params ? params.get('url') : null;
    const proxyiedOK = proxiedUrl ? new URL(proxiedUrl) : null;
    const isGetMethod = request.method === 'GET';
    const isProxyPath = url.pathname === '/proxy';

    // We have a valid "proxiedUrl".
    if (isProxyPath && isGetMethod && proxyiedOK) {
      const origin = request.headers.get('Origin') || request.headers.get('X-Origin');
      console.debug('Proxy - whitelist?', proxiedUrl, origin, !!isWhitelisted(origin));

      if (!origin || isWhitelisted(origin)) {
        // Yay! The origin is whitelisted.
        try {
          const response = await fetch(proxiedUrl);
          return await corsProxyResponse(response);
        } catch (error) {
          return errorCaughtResponse(error);
        }
      } else {
        return errorNotWhitelistedResponse(origin);
      }
    } else {
      return errorBadRequestResponse();
    }
	},
};
