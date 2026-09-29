
# Yet Another CORS Proxy

A minimalist [CORS][] proxy as a [CloudFlare worker][worker].

## Usage

1. [Install][npm] dependencies
2. Copy and edit the [.env][env] file
3. Try it out.
4. [Deploy][] me!

```
npm install
npm start
npm run deploy
```

Visit:
```
http://localhost:8787/proxy?url=https%3A//example.org/
https://cors.{NAME}.workers.dev/proxy?url=https%3A//example.org
```

Inspired by [Zibri/cloudflare-cors-anywhere][inspire]!

## License

* [MIT License][mit]

[env]: https://github.com/nfreear/yacorsp/blob/main/.env.EXAMPLE
[npm]: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm?ref=meilisearch-blog
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
[worker]: https://developers.cloudflare.com/workers/
[deploy]: https://developers.cloudflare.com/workers/get-started/guide/#4-deploy-your-project
[dev]: https://developers.cloudflare.com/workers/configuration/routing/workers-dev/
[inspire]: https://github.com/Zibri/cloudflare-cors-anywhere
[mit]: https://nfreear.mit-license.org/2026
