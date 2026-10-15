# Alive Readme

Gives your README.md life instead of staticness. Generate button images from a URL and paste them into any README.

```md
[![Docs](https://YOUR-DOMAIN/btn?text=Docs&color=7c3aed&icon=book&style=pill&anim=shine)](https://your-target-link.com)
```

## Button parameters

| Param   | Values                                                                 | Default   |
|---------|------------------------------------------------------------------------|-----------|
| `text`  | up to 40 chars                                                         | Click me  |
| `color` | hex without `#`                                                        | 7c3aed    |
| `fg`    | hex without `#` (text and icon)                                        | ffffff    |
| `style` | `flat`, `pill`, `outline`, `gradient`                                  | flat      |
| `icon`  | `book` `star` `download` `mail` `link` `globe` `code` `heart` `play`   | none      |
| `anim`  | `shine`, `pulse`                                                       | none      |

## Run and deploy

```bash
npm i -g wrangler
wrangler dev        # local at http://localhost:8787
wrangler deploy     # publishes to <name>.<your-subdomain>.workers.dev
```

The generator page lives in `public/` and is served as a static asset. The Worker only runs for `/btn`, so only button image requests count toward the daily request quota.
