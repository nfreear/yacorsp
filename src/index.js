import isWhiteListed from './whitelist.js';
import {
  corsProxyResponse,
  errorNotWhitelistedResponse,
  errorBadRequestResponse,
  errorCaughtResponse
} from './responses.js';

/**
 * Yet Another CORS Proxy (YACORSP).
 *
 * A minimalist CORS proxy as a CloudFlare worker.
 *
 * @see https://github.com/Zibri/cloudflare-cors-anywhere
 * @see https://developers.cloudflare.com/workers/
 */
export default {
	async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const proxiedUrl = params ? params.get('url') : null;
    const proxyiedOK = proxiedUrl ? new URL(proxiedUrl) : null;
    const isGetMethod = request.method === 'GET';
    const isProxyPath = url.pathname === '/proxy';
    // console.debug('Request:', request.method, request.url);

    // We have a valid 'proxiedUrl'.
    if (isProxyPath && isGetMethod && proxyiedOK) {
      const origin = request.headers.get('Origin') || request.headers.get('X-Origin');
      console.debug('Proxy - whitelist?', proxiedUrl, origin, !!isWhiteListed(origin));

      if (!origin || isWhiteListed(origin)) {
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
