const { Response } = globalThis;

/**
 * CORS proxy response - success?!
 */
export async function corsProxyResponse (resp) {
  // Very basic error handling!
  console.assert(resp.ok, `Fetch Error (proxy): ${resp.status}`);
  const contentType = resp.headers.get('content-type');
  const rawBody = await resp.text();
  return new Response(rawBody, {
    status: resp.status, // Pass on success or error.
    statusText: resp.statusText,
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
    }
  });
}

/**
 * Whitelisting error.
 */
export function errorNotWhitelistedResponse (origin) {
  console.warn('Error: not whitelisted!', origin);
  return new Response(`Error: not whitelisted! ${origin}`, {
    status: 403,
    statusText: 'Forbidden'
  });
}

/**
 * Bad Request error.
 */
export function errorBadRequestResponse () {
  console.error('Error: missing url parameter?');
  return new Response('Error: missing url parameter? - /proxy?url=https://...', {
    status: 400,
    statusText: 'Bad Request'
  });
}

export function errorCaughtResponse (error) {
  console.error(error);
  return new Response(error, {
    status: 500,
  });
}
