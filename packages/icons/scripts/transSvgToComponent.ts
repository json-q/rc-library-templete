import { fileURLToPath } from 'node:url';
import { basename, resolve } from 'node:path';
import fs from 'fs-extra';
import { Config, transform } from '@svgr/core';
import { optimize } from 'svgo';
import camelCase from 'camelcase';
import decamelize from 'decamelize';
import prettier from 'prettier';
import prettierConfig from '../../../.prettierrc.cjs';

const entryDir = fileURLToPath(new URL('../src/svgs', import.meta.url));
const outDir = fileURLToPath(new URL('../src/icons', import.meta.url));

const transSvgToComponent = async () => {
  // 移除并重新创建目录
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true });
  }
  fs.mkdirSync(outDir);

  const indexFileName = 'index.ts';
  const svgFiles = fs.readdirSync(entryDir, 'utf-8');
  console.log(svgFiles);

  const batches = svgFiles
    .filter((f) => f.endsWith('.svg'))
    .map(async (file) => {
      try {
        const svgFileName = basename(file, '.svg'); // 只取文件名
        const componentName = `${camelCase(svgFileName, { pascalCase: true })}`; // 转换成驼峰命名
        const reactFileName = `${componentName}.tsx`;
        const svgContent = fs.readFileSync(resolve(entryDir, file), 'utf-8');
        const svgProps: Record<string, string> = {
          focusable: '{false}', // react focusable={false}
          'aria-hidden': '{true}',
        };
        const result = optimize(svgContent, {
          plugins: [
            {
              name: 'convertColors',
              params: { currentColor: /^(?!url|none)./ },
            },
            'removeDimensions',
          ],
        });
        const jsxCode = await transform(
          result.data,
          {
            plugins: ['@svgr/plugin-jsx'],
            typescript: true,
            icon: true,
            svgProps,
            template: customTemplate,
          },
          { componentName },
        );

        // 代码按照项目的 prettier 进行格式化
        const formattedCode = await prettier.format(jsxCode, {
          ...prettierConfig,
          parser: 'typescript',
          endOfLine: 'lf',
        });

        fs.writeFileSync(resolve(outDir, reactFileName), formattedCode);
        return {
          fileName: reactFileName,
          componentName,
        };
      } catch (error) {
        console.error(error);
        throw error;
      }
    });

  const arr = await Promise.all(batches);

  // 写入 index.ts
  const indexFileContent = arr
    .map((a) => `export { default as ${a.componentName} } from './${a.componentName}';`)
    .join('\n');

  fs.writeFileSync(resolve(outDir, indexFileName), indexFileContent, 'utf-8');
};

const customTemplate: Config['template'] = (variables, context) => {
  const { componentName, imports, interfaces, jsx, props } = variables;
  const { tpl } = context;

  return tpl`${imports}
  import { convertIcon } from '../components/Icon';

  ${interfaces}
  function ${componentName}(${props}) {
    return ${jsx};
  }

  const IconComponent = convertIcon(${componentName}, '${getOriginalSvgFileName(componentName)}');

  export default IconComponent;
    `;
};

function getOriginalSvgFileName(componentName: string) {
  const originalFileName = decamelize(componentName, { separator: '-' });
  return originalFileName;
}

transSvgToComponent();
