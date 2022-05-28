# vite-plugin-head

Modify, add, delete Metadata in the head element.

## Installation

`npm i vite-plugin-head`

## Usage


```ts
// vite.config.ts
import VitePluginHead from "vite-plugin-head"

plugins: [
    VitePluginHead({
        cssPreload: true
    })
]
```

### Type 

```ts
interface IVitePluginHeadOption {
  cssPreload?: boolean;
}
```

### IVitePluginHeadOption.cssPreload

Configure link href css file rel as preload.

```html
<link rel="stylesheet" href="/assets/index/index-8df8383a.css">
```

transform html after.

```html
<link rel="preload" href="/assets/index/index-8df8383a.css">
```
