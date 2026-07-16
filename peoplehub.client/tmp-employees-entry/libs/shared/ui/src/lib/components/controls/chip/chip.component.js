import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import { CHIP_VARIANT_PALETTE, } from '../../../models/component-models/chip.types';
import * as i0 from "@angular/core";
export class ChipComponent {
    text = 'text';
    defaultTextColor = '#6b7280';
    color = this.defaultTextColor;
    bgColor;
    variant;
    disabled = false;
    activeBGColor = '#7c3aed';
    activeColor = 'white';
    borderRadius = '9999px';
    size = 'extrasmall';
    usePointerCursor = true;
    height = '28px';
    width = 'auto';
    fontSize = '0.875rem';
    horizontalGap = '12px';
    isHovered = false;
    parentFormGroup;
    id;
    get control() {
        return this.parentFormGroup?.get(this.id);
    }
    get isInvalid() {
        return ((this.control?.invalid && (this.control?.dirty || this.control?.touched)) ??
            false);
    }
    get variantPalette() {
        return this.variant ? CHIP_VARIANT_PALETTE[this.variant] : undefined;
    }
    get textColor() {
        const palette = this.variantPalette;
        if (palette && this.color === this.defaultTextColor) {
            return palette.text;
        }
        return this.color;
    }
    get finalBgColor() {
        if (this.bgColor) {
            return this.bgColor;
        }
        if (this.variantPalette) {
            return this.variantPalette.background;
        }
        return this.convertToOpacity(this.textColor, 0.1);
    }
    ngOnChanges(changes) {
        if (changes['size'])
            this.updateSize();
    }
    ngOnInit() {
        this.updateSize();
    }
    updateSize() {
        switch (this.size) {
            case 'large':
                this.height = '33px';
                this.fontSize = '1.1rem';
                this.horizontalGap = '22px';
                break;
            case 'status':
                this.height = '28px';
                this.fontSize = '0.75rem';
                this.horizontalGap = '8px';
                break;
            case 'medium':
            default:
                this.height = '28px';
                this.fontSize = '1rem';
                this.horizontalGap = '16px';
                break;
            case 'small':
                this.height = '22px';
                this.fontSize = '.8rem';
                this.horizontalGap = '10px';
                break;
            case 'extrasmall':
                this.height = '18px';
                this.fontSize = '.8rem';
                this.horizontalGap = '12px';
                break;
        }
    }
    onMouseEnter() {
        if (!this.disabled) {
            this.isHovered = true;
        }
    }
    onMouseLeave() {
        this.isHovered = false;
    }
    convertToOpacity(color, opacity) {
        if (color.startsWith('#')) {
            const hex = color.replace('#', '');
            const bigint = parseInt(hex.length === 3
                ? hex.split('').map(x => x + x).join('')
                : hex, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        return color;
    }
    static ɵfac = function ChipComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ChipComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ChipComponent, selectors: [["ui-chip"]], inputs: { text: "text", color: "color", bgColor: "bgColor", variant: "variant", disabled: "disabled", activeBGColor: "activeBGColor", activeColor: "activeColor", borderRadius: "borderRadius", size: "size", usePointerCursor: "usePointerCursor", parentFormGroup: "parentFormGroup", id: "id" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 25, consts: [[1, "chip", 3, "mouseenter", "mouseleave"]], template: function ChipComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0);
            i0.ɵɵdomListener("mouseenter", function ChipComponent_Template_div_mouseenter_0_listener() { return ctx.onMouseEnter(); })("mouseleave", function ChipComponent_Template_div_mouseleave_0_listener() { return ctx.onMouseLeave(); });
            i0.ɵɵtext(1);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵstyleProp("background-color", ctx.isHovered ? ctx.activeBGColor : ctx.finalBgColor)("color", ctx.isHovered ? ctx.activeColor : ctx.textColor)("cursor", ctx.disabled ? "not-allowed" : ctx.usePointerCursor ? "pointer" : "default")("border-radius", ctx.borderRadius)("height", ctx.height)("width", ctx.width)("font-size", ctx.fontSize)("padding-left", ctx.horizontalGap)("padding-right", ctx.horizontalGap);
            i0.ɵɵclassProp("error", ctx.isInvalid)("disabled", ctx.disabled)("chip-size-status", ctx.size === "status");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.text, "\n");
        } }, styles: [".chip[_ngcontent-%COMP%] {\r\n\tdisplay: inline-flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\twidth: fit-content;\r\n\twhite-space: nowrap;\r\n\tborder: 1px solid var(--color-border);\r\n\tbox-shadow: 0 1px 2px rgba(17, 24, 39, 0.12);\r\n\ttransition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;\r\n\tuser-select: none;\r\n\tfont-weight: 500;\r\n\tline-height: 1;\r\n\r\n\t&:not(.disabled):hover {\r\n\t\tbox-shadow: 0 2px 6px rgba(17, 24, 39, 0.18);\r\n\t}\r\n\r\n\t&.chip-size-status {\r\n\t\tfont-weight: 600;\r\n\t\tborder-radius: 8px !important;\r\n\t}\r\n\r\n\t&.error {\r\n\t\tborder-color: var(--color-danger);\r\n\t}\r\n\r\n\t&.disabled {\r\n\t\topacity: 0.55;\r\n\t\tpointer-events: none;\r\n\t}\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ChipComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-chip', template: "<div\r\n  class=\"chip\"\r\n  [class.error]=\"isInvalid\"\r\n  [class.disabled]=\"disabled\"\r\n  [class.chip-size-status]=\"size === 'status'\"\r\n  [style.backgroundColor]=\"isHovered ? activeBGColor : finalBgColor\"\r\n  [style.color]=\"isHovered ? activeColor : textColor\"\r\n  [style.cursor]=\"disabled ? 'not-allowed' : (usePointerCursor ? 'pointer' : 'default')\"\r\n  [style.borderRadius]=\"borderRadius\"\r\n  [style.height]=\"height\"\r\n  [style.width]=\"width\"\r\n  [style.fontSize]=\"fontSize\"\r\n  [style.paddingLeft]=\"horizontalGap\"\r\n  [style.paddingRight]=\"horizontalGap\"\r\n  (mouseenter)=\"onMouseEnter()\"\r\n  (mouseleave)=\"onMouseLeave()\"\r\n>\r\n  {{ text }}\r\n</div>\r\n", styles: [".chip {\r\n\tdisplay: inline-flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\twidth: fit-content;\r\n\twhite-space: nowrap;\r\n\tborder: 1px solid var(--color-border);\r\n\tbox-shadow: 0 1px 2px rgba(17, 24, 39, 0.12);\r\n\ttransition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;\r\n\tuser-select: none;\r\n\tfont-weight: 500;\r\n\tline-height: 1;\r\n\r\n\t&:not(.disabled):hover {\r\n\t\tbox-shadow: 0 2px 6px rgba(17, 24, 39, 0.18);\r\n\t}\r\n\r\n\t&.chip-size-status {\r\n\t\tfont-weight: 600;\r\n\t\tborder-radius: 8px !important;\r\n\t}\r\n\r\n\t&.error {\r\n\t\tborder-color: var(--color-danger);\r\n\t}\r\n\r\n\t&.disabled {\r\n\t\topacity: 0.55;\r\n\t\tpointer-events: none;\r\n\t}\r\n}\r\n"] }]
    }], null, { text: [{
            type: Input
        }], color: [{
            type: Input
        }], bgColor: [{
            type: Input
        }], variant: [{
            type: Input
        }], disabled: [{
            type: Input
        }], activeBGColor: [{
            type: Input
        }], activeColor: [{
            type: Input
        }], borderRadius: [{
            type: Input
        }], size: [{
            type: Input
        }], usePointerCursor: [{
            type: Input
        }], parentFormGroup: [{
            type: Input
        }], id: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ChipComponent, { className: "ChipComponent", filePath: "libs/shared/ui/src/lib/components/controls/chip/chip.component.ts", lineNumber: 22 }); })();
//# sourceMappingURL=chip.component.js.map