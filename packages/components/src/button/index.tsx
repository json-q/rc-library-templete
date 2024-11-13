import React from 'react';
import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import type { ButtonProps } from './interface';

const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { children, className, type = 'default', size = 'default', ...resetProps } = props;

  const classes = clsx('rclt-btn', className, {
    [`rclt-btn-${type}`]: type,
    [`rclt-btn-${size}`]: size,
  });

  return (
    <button className={classes} {...resetProps}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
