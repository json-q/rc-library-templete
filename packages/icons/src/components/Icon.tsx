import React, { useContext } from 'react';
import type { ComponentType, CSSProperties, DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import IconContext from './context';

export type IconSize = 'small' | 'default' | 'large';

export interface IconProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  svg: ReactNode;
  size?: IconSize;
  spin?: boolean;
  rotate?: number;
  prefixCls?: string;
  type?: string;
}

const Icon = React.forwardRef<SVGSVGElement, React.PropsWithChildren<IconProps>>((props, ref) => {
  const { svg, spin = false, rotate, style, className, type, size = 'default', ...restProps } = props;
  const ctx = useContext(IconContext);
  const prefixCls = props.prefixCls || ctx.prefixCls || 'rclt';

  const classes = clsx(
    `${prefixCls}-icon`,
    {
      [`${prefixCls}-icon-small`]: size === 'small', // 12x12
      [`${prefixCls}-icon-default`]: size === 'default', // 16x16
      [`${prefixCls}-icon-large`]: size === 'large', // 20x20
      [`${prefixCls}-icon-spinning`]: !!spin,
      [`${prefixCls}-icon-${type}`]: !!type,
    },
    className,
  );

  const outerStyle: CSSProperties = {};
  if (Number.isSafeInteger(rotate)) {
    outerStyle.transform = `rotate(${rotate}deg)`;
  }

  const styles = { ...outerStyle, ...style };

  return (
    <span role="img" ref={ref} aria-label={type} className={classes} style={styles} {...restProps}>
      {svg}
    </span>
  );
});

Icon.displayName = 'Icon';

const convertIcon = (Svg: ComponentType, iconType: string) => {
  const InnerIcon = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'svg' | 'type'>>((props, ref) => (
    <Icon svg={React.createElement(Svg)} type={iconType} ref={ref} {...props} />
  ));

  InnerIcon.displayName = 'Icon';
  return InnerIcon;
};

export { convertIcon };
export default Icon;
