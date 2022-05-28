import { parse, serialize, parseFragment } from "parse5";
import type {
  Node,
  Element,
  Template,
  TextNode,
  ParentNode,
} from "parse5/dist/tree-adapters/default";
import type { TAG_NAMES } from "parse5/dist/common/html";

type Tags = keyof typeof TAG_NAMES;
type PrePost = "pre" | "post";
type Other = "#text";
type OptionKeys = Lowercase<Tags | PrePost | Other>;
type IOption = {
  [key in OptionKeys]: (node: Node, parent: Node | null) => void | boolean;
};

interface IVitePluginHeadOption {
  cssPreload?: boolean;
  title?: string;
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
