import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
export class LoaderComponent {
    type = 'spinner';
    color = '#1976d2';
    size = 50;
    static ɵfac = function LoaderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoaderComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoaderComponent, selectors: [["ui-loader"]], inputs: { type: "type", color: "color", size: "size" }, decls: 5, vars: 0, consts: [[1, "fixed", "inset-0", "flex", "items-center", "justify-center", "bg-black/15", "z-[9999]"], [1, "relative", "w-[70px]", "h-[70px]", "flex", "items-center", "justify-center"], ["src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtV5o8uP07w1WZBt1RhCfk6qtv37V3HpzkQ&s", 1, "w-[45px]", "h-[45px]", "z-[2]", "rounded-full"], [1, "absolute", "inset-0", "rounded-full", "border-[4px]", "border-[#0c2d6b]", "[mask:conic-gradient(transparent_0deg_90deg,black_90deg_170deg,transparent_170deg_250deg,black_250deg_360deg)]", "[-webkit-mask:conic-gradient(transparent_0deg_90deg,black_90deg_170deg,transparent_170deg_250deg,black_250deg_360deg)]", "animate-spin"], [1, "absolute", "inset-0", "rounded-full", "border-[4px]", "border-[#0c2d6b]", "[mask:conic-gradient(transparent_0deg_90deg,black_90deg_170deg,transparent_170deg_250deg,black_250deg_360deg)]", "[-webkit-mask:conic-gradient(transparent_0deg_90deg,black_90deg_170deg,transparent_170deg_250deg,black_250deg_360deg)]", "animate-spinGap"]], template: function LoaderComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵdomElement(2, "img", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵdomElementEnd()();
        } }, dependencies: [CommonModule], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoaderComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-loader', imports: [CommonModule], template: "<div class=\"fixed inset-0 flex items-center justify-center bg-black/15 z-[9999]\"> \r\n<div class=\"relative w-[70px] h-[70px] flex items-center justify-center\">\r\n  <img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtV5o8uP07w1WZBt1RhCfk6qtv37V3HpzkQ&s\"\r\n    class=\"w-[45px] h-[45px] z-[2] rounded-full\" />\r\n\r\n\r\n  <div class=\"absolute inset-0 rounded-full border-[4px] border-[#0c2d6b]\r\n              [mask:conic-gradient(transparent_0deg_90deg,black_90deg_170deg,transparent_170deg_250deg,black_250deg_360deg)]\r\n              [-webkit-mask:conic-gradient(transparent_0deg_90deg,black_90deg_170deg,transparent_170deg_250deg,black_250deg_360deg)]\r\n              animate-spin\"></div>\r\n  <div class=\"absolute inset-0 rounded-full border-[4px] border-[#0c2d6b]\r\n              [mask:conic-gradient(transparent_0deg_90deg,black_90deg_170deg,transparent_170deg_250deg,black_250deg_360deg)]\r\n              [-webkit-mask:conic-gradient(transparent_0deg_90deg,black_90deg_170deg,transparent_170deg_250deg,black_250deg_360deg)]\r\n              animate-spinGap\"></div>\r\n</div>\r\n</div>\r\n\r\n\r\n" }]
    }], null, { type: [{
            type: Input
        }], color: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoaderComponent, { className: "LoaderComponent", filePath: "libs/shared/ui/src/lib/components/primitives/loader/loader.component.ts", lineNumber: 11 }); })();
//# sourceMappingURL=loader.component.js.map