import { ButtonHTMLAttributes, CSSProperties } from 'react';

export interface BaseButtonProps {
  className?: CSSProperties;
  type?: 'default' | 'primary' | 'danger';
  size?: 'small' | 'default' | 'large';
}

export type ButtonProps = BaseButtonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;
