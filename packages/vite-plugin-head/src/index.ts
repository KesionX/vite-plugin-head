import { parse, serialize, parseFragment } from "parse5";
import type {
  Node,
  Element,
  Template,
  TextNode,
  ParentNode,
} from "parse5/dist/tree-adapters/default";
import type { TAG_NAMES } from "parse5/dist/common/html";
import { Attribute } from "parse5/dist/common/token";

type Tags = keyof typeof TAG_NAMES;
type PrePost = "pre" | "post";
type Other = "#text";
type OptionKeys = Lowercase<Tags | PrePost | Other>;
type IOption = {
  [key in OptionKeys]: (node: Node, parent: Node | null) => void | boolean;
};

interface IAttr {
  [key: string]: string;
}

/**
 * add,remove,update attrs for yourself.
 */
type TransformLinkHook = (attrs: IAttr, href: string | undefined) => IAttr;

interface IVitePluginHeadOption {
  cssPreload?: boolean;
  title?: string;
  transformLink?: TransformLinkHook;
}

const traverse = (root: Node, options: Partial<IOption>) => {
  const visit = (node: Node, parent: Node | null) => {
    let res;
    if (!node) {
      return;
    }
    if (options && options.pre) {
      res = options.pre(node, parent);
    }
    if (options) {
      for (const key in options) {
        if (key !== "pre" && key !== "post" && node.nodeName === key) {
          const call = options[key as OptionKeys];
          call && call(node, parent);
        }
      }
    }

    let { childNodes } = node as Element;
    if (
      (node as Template).content &&
      Array.isArray((node as Template).content.childNodes)
    ) {
      ({ childNodes } = (node as Template).content);
    }
    if (res !== false && Array.isArray(childNodes) && childNodes.length >= 0) {
      childNodes.forEach((child) => {
        visit(child, node);
      });
    }
    if (options && options.post) {
      options.post(node, parent);
    }
  };
  visit(root, null);
};

/**
 * get attrs
 * @param node element
 * @param keys default all
 */
function getAttrs(node: Element, keys?: string[] | null) {
  const obj: Record<string, string> = {};
  for (let index = 0; index < node.attrs?.length; index++) {
    const attr = node.attrs[index];
    if (!keys) {
      if (attr?.name) {
        obj[attr.name] = attr.value;
      }
      continue;
    }
    if (attr?.name && keys.includes(attr.name)) {
      obj[attr.name] = attr.value;
    }
  }
  return obj;
}

function handleCssPreload(node: Node) {
  let attrRel = null;
  let attrHref = null;
  if (!(node as Element)?.attrs) {
    return;
  }
  for (let index = 0; index < (node as Element).attrs?.length; index++) {
    const attr = (node as Element).attrs[index];
    if (attr?.name === "rel") {
      attrRel = attr;
    }
    if (attr?.name === "href") {
      attrHref = attr;
    }
  }
  if (attrRel && attrHref && /(.css)$/.test(attrHref.value)) {
    attrRel.value = "preload";
  }
}

function handleTitle(node: Node, title: string) {
  traverse(node, {
    "#text": (tNode) => {
      (tNode as TextNode).value = title;
    },
  });
}

function handleTransformLink(node: Node, transformLink: TransformLinkHook) {
  const attrs = getAttrs(node as Element);
  const newAttrs = transformLink(attrs, attrs["href"]);
  const attrList: Attribute[] = [];
  for (const key in newAttrs) {
    if (newAttrs[key]) {
      attrList.push({
        name: key,
        value: newAttrs[key] as string,
      });
    }
  }
  (node as Element).attrs = attrList;
}

function headTransform(html: string, option: IVitePluginHeadOption) {
  const htmlAst = parse(html, {
    sourceCodeLocationInfo: true,
  });
  let hasTitle = false;
  let headNode: null | Element = null;
  traverse(htmlAst, {
    head(node) {
      headNode = node as Element;
    },
    link(node) {
      if (option?.cssPreload) {
        handleCssPreload(node);
      }
      if (option?.transformLink) {
        handleTransformLink(node, option.transformLink);
      }
    },
    title(node) {
      hasTitle = true;
      if (option?.title) {
        handleTitle(node, option.title);
      }
    },
  });

  if (!hasTitle && headNode) {
    const titleNode = parseFragment(`<title>${option.title}</title>`)
      .childNodes[0];
    (headNode as Element).childNodes.unshift(titleNode as Element);
    (titleNode as Element).parentNode = headNode as ParentNode;
  }

  const resHtml = serialize(htmlAst);
  return resHtml;
}

export default (option: IVitePluginHeadOption) => ({
  name: "vite-plugin-head",
  enforce: "post",
  transformIndexHtml(html: string) {
    return headTransform(html, option);
  },
});
