import { Component, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
export class CommonComponent {
    static ɵfac = function CommonComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CommonComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CommonComponent, selectors: [["common-root"]], decls: 2, vars: 0, template: function CommonComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "p");
            i0.ɵɵtext(1, " common works! ");
            i0.ɵɵdomElementEnd();
        } }, encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommonComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'common-root', standalone: true, imports: [], template: "    <p>\r\n      common works!\r\n    </p>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CommonComponent, { className: "CommonComponent", filePath: "libs/shared/common/src/lib/common.component.ts", lineNumber: 11 }); })();
//# sourceMappingURL=common.component.js.map