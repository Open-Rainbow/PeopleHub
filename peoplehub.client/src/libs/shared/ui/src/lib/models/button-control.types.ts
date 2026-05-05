export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  | 'white'
  | 'link';

export type ButtonSize = 'small' | 'medium' | 'large';

export type NativeButtonType = 'button' | 'submit' | 'reset';

export type IconPosition = 'left' | 'right';

export function buildButtonClassNames(
  baseClass: string,
  variant: ButtonVariant,
  size: ButtonSize,
  isExpanded: boolean,
): string {
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--${size}`,
  ];

  if (isExpanded) {
    classes.push(`${baseClass}--expanded`);
  }

  return classes.join(' ');
}