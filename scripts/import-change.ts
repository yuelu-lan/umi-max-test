import { Visitor, transformFileSync } from '@babel/core';
import * as fs from 'node:fs';
import * as path from 'node:path';

const entryDirPath = path.resolve(__dirname, '../src');

const dirHandle = (dirPath: string) => {
  const content = fs.readdirSync(dirPath);

  for (let i = 0; i < content.length; i++) {
    const fillPath = path.join(dirPath, content[i]);
    const stat = fs.lstatSync(fillPath);

    if (stat.isDirectory()) {
      dirHandle(fillPath);
      continue;
    }

    // TODO: 如果不是 jsx、tsx、js、ts 则跳过
    if (!['.js', '.jsx', '.ts', '.tsx'].includes(path.extname(fillPath))) {
      continue;
    }

    let isChange: boolean = false;

    const { code } =
      transformFileSync(fillPath, {
        // 不要包含多余的空白字符和行结束符。
        compact: false,
        // 保留行号。（会保留空白行，推荐在不使用 source-map 时使用）
        retainLines: true,
        parserOpts: {
          /**
           * 配置语法插件
           * 保留源代码，因为你只希望 Babel 进行代码分析或 code mods。
           */
          plugins: ['jsx', 'typescript'],
        },
        plugins: [
          () => {
            const visitor: Visitor = {
              ImportDeclaration(path) {
                const libraryName = path.node.source.value.split('/')[0];

                if (libraryName === 'antd') {
                  path.node.source.value = 'antd-v2';
                  isChange = true;
                }
              },
            };

            return {
              visitor,
            };
          },
        ],
      }) ?? {};

    if (isChange) {
      console.log('🚀 ~ dirHandle ~ fillPath:', fillPath);
      // console.log('🚀 ~ dirHandle ~ code:', code);

      fs.writeFileSync(fillPath, code ?? '');
    }
  }
};

const main = () => {
  const needChangeDirs = ['components', 'pages'];
  for (let i = 0; i < needChangeDirs.length; i++) {
    dirHandle(path.join(entryDirPath, needChangeDirs[i]));
  }
};

main();

console.log('import change success !!!');
