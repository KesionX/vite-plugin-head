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
  title?: string;
  transformLink?: TransformLinkHook;
}

/**
 * add,remove,update attrs for yourself.
 */
type TransformLinkHook = (attrs: IAttr, href: string | undefined) => IAttr;
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

### IVitePluginHeadOption.title

Configure title for html.

```html
<link rel="stylesheet" href="/assets/index/index-8df8383a.css">
```

transform html after.

```html
<title>Hello World</title>
<link rel="preload" href="/assets/index/index-8df8383a.css">
```

### IVitePluginHeadOption.transformLink

Configure hook for html.

```ts
 pluginHead({
    transformLink(attrs) {
        attrs['title'] = "English HTML";
        attrs['rel'] = "preload";
        return attrs;
    }
})
```

```html
<link rel="stylesheet" href="/assets/index/index-8df8383a.css">
```

transform html after.

```html
<link rel="preload" title="English HTML" href="/assets/index/index-8df8383a.css">
```
