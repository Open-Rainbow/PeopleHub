export function buildButtonClassNames(baseClass, variant, size, isExpanded) {
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
//# sourceMappingURL=button-control.types.js.map