import { fileURLToPath } from 'node:url';
import { Config } from '@svgr/core';
import { type PluginConfig } from 'svgo';
import decamelize from 'decamelize';
import transSvgToComponent from './transSvgToComponent';
import { iconPrefix, iconSuffix } from './constants';

const entryDir = fileURLToPath(new URL('../src/svgs', import.meta.url));
const outDir = fileURLToPath(new URL('../src/icons', import.meta.url));

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

const svgoPlugins: PluginConfig[] = [
  {
    name: 'convertColors',
    params: { currentColor: /^(?!url|none)./ },
  },
  'removeDimensions',
];

transSvgToComponent({
  entryDir,
  outDir,
  prefix: iconPrefix,
  suffix: iconSuffix,
  svgoPlugins,
  svgrConfig: {
    typescript: true,
    icon: true,
    template: customTemplate,
  },
});

function getOriginalSvgFileName(componentName: string) {
  // remove prefix and suffix
  const trimmedName = componentName.replace(new RegExp(`^${iconPrefix}`), '').replace(new RegExp(`${iconSuffix}$`), '');
  const originalFileName = decamelize(trimmedName, { separator: '-' });
  return originalFileName;
}
