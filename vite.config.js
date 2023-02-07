import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import rehypeStringify from 'rehype-stringify';
import mdx from '@mdx-js/rollup';
import mdxMermaid from 'mdx-mermaid';
import {
  QuickChart,
  quickchartPlugin,
  rehypeMetaAsAttributes,
} from './src/utils/rehypes';

// const mdxMermaid = await import('mdx-mermaid');

// https://vitejs.dev/config/
export default defineConfig(async ({}) => {
  return {
    plugins: [
      reactRefresh(),
      mdx({
        rehypePlugins: [
          rehypeMetaAsAttributes,
          rehypeStringify,
          {
            allowDangerousCharacters: true,
            quoteSmart: true,
          },
          quickchartPlugin,
        ],
        useDynamicImport: true,
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [[mdxMermaid, { output: 'svg' }]],
      }),
    ],
  };
});
