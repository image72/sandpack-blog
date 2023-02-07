import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

export function rehypeComponents(options) {
  const { components = {} } = options;
  const processor = this;
  return (tree, vfile) => {
    const context = { tree, vfile, processor };
    visit(tree, (node, index, parent) => {
      const component = components[node.tagName];
      if (component) {
        const replacedNode = component(node.properties, node.children, context);
        parent.children[index] = replacedNode;

        // This return value makes sure that the traversal continues by
        // visiting the children of the replaced node (if any)
        return [visit.SKIP, index];
      }
    });
  };
}

// module.exports = rehypeComponents;

export const QuickChart = (properties, children) => {
  const type = properties.type === 'qr' ? 'qr' : 'chart';
  let config =
    children && ['qr', 'chart'].includes(type) ? JSON.parse(children) : {};
  let link = `https://quickchart.io/chart?${JSON.stringify(config)}`;

  if (type === 'qr') {
    config = {
      text: children,
      ...config,
    };
    link = `https://quickchart.io/qr?${JSON.stringify(config)}`;
  }
  if (type === 'graphviz') {
    link = `https://quickchart.io/graphviz?${JSON.stringify(children)}`;
  }

  return h('section.quickchart', h('img.quickchart-img', { src: link }));
};

export function quickchartPlugin() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.name !== 'quickchart') return;

      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes);
        let config = (node.children[0].children[0].value || '')
          .replace(/\n/g, '')
          .replace(/\t/g, '');
        let link = `https://quickchart.io/chart?c=${JSON.stringify(config)}`;

        if (type === 'qr') {
          config = {
            text: children,
            ...config,
          };
          link = `https://quickchart.io/qr?${JSON.stringify(config)}`;
        }
        if (type === 'graphviz') {
          link = `https://quickchart.io/graphviz?${JSON.stringify(children)}`;
        }

        data.hName = 'img';
        data.hProperties = {
          src: link,
        };
      }
    });
  };
}

export function rehypeMetaAsAttributes() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'code' && node.data && node.data.meta) {
        node.properties.meta = node.data.meta;
      }
    });
  };
}
