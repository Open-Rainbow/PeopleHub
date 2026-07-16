export declare const CHIP_VARIANTS: readonly ["green", "darkGrey", "lightGrey", "darkBlue", "lightBlue", "purple", "red", "amber", "white", "darkGreen", "darkRed", "pink", "darkPink", "brown", "yellow"];
export type ChipVariant = (typeof CHIP_VARIANTS)[number];
export type ChipPalette = {
    text: string;
    background: string;
};
export declare const CHIP_VARIANT_PALETTE: Record<ChipVariant, ChipPalette>;
//# sourceMappingURL=chip.types.d.ts.map