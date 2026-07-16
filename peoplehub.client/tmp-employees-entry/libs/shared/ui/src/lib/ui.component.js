import { Component, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
export class UiComponent {
    static ɵfac = function UiComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UiComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UiComponent, selectors: [["ui-root"]], decls: 2, vars: 0, template: function UiComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "p");
            i0.ɵɵtext(1, " ui works! ");
            i0.ɵɵdomElementEnd();
        } }, encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UiComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-root', standalone: true, imports: [], template: "    <p>\r\n      ui works!\r\n    </p>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UiComponent, { className: "UiComponent", filePath: "libs/shared/ui/src/lib/ui.component.ts", lineNumber: 11 }); })();
//# sourceMappingURL=ui.component.js.map