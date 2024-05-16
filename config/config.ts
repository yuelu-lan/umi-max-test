import { defineConfig } from '@umijs/max';
import { routes } from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes,
  npmClient: 'pnpm',
  // NOTE: https://umijs.org/docs/guides/mfsu#worker-%E5%85%BC%E5%AE%B9%E9%97%AE%E9%A2%98
  mfsu: {
    exclude: ['lodash'],
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd-v2',
        style: 'css', // `style: true` 会加载 less 文件
      },
    ],
  ],
});
