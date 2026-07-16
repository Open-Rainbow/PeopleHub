import { Component, Input, ChangeDetectionStrategy, signal } from '@angular/core';
import * as i0 from "@angular/core";
const _c0 = ["*"];
export class AccordionGroupComponent {
    variant = 'flush';
    allowMultiple = false;
    // Signal to track open accordion items
    openItems = signal(new Set(), ...(ngDevMode ? [{ debugName: "openItems" }] : /* istanbul ignore next */ []));
    // Expose signal for children to track reactively
    getOpenItemsSignal() {
        return this.openItems;
    }
    // Check if a specific item is open
    isItemOpen(sectionId) {
        return this.openItems().has(sectionId);
    }
    // Toggle accordion item - manages exclusive/multiple opening
    toggleAccordion(sectionId) {
        const currentOpen = new Set(this.openItems());
        if (currentOpen.has(sectionId)) {
            // Close the accordion
            currentOpen.delete(sectionId);
        }
        else {
            // For flush variant or default with allowMultiple=false: close all others
            if (!this.allowMultiple) {
                currentOpen.clear();
            }
            // Add the current item
            currentOpen.add(sectionId);
        }
        this.openItems.set(currentOpen);
    }
    // Get the open state for a specific item
    getOpenState(sectionId) {
        return this.openItems().has(sectionId);
    }
    static ɵfac = function AccordionGroupComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AccordionGroupComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AccordionGroupComponent, selectors: [["ui-accordion-group"]], inputs: { variant: "variant", allowMultiple: "allowMultiple" }, ngContentSelectors: _c0, decls: 3, vars: 0, template: function AccordionGroupComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵtext(0, "'");
            i0.ɵɵprojection(1);
            i0.ɵɵtext(2, "'");
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AccordionGroupComponent, [{
        type: Component,
        args: [{ standalone: true, changeDetection: ChangeDetectionStrategy.Default, selector: 'ui-accordion-group', template: "'<ng-content></ng-content>'" }]
    }], null, { variant: [{
            type: Input
        }], allowMultiple: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AccordionGroupComponent, { className: "AccordionGroupComponent", filePath: "libs/shared/ui/src/lib/components/primitives/accordion/accordion-group.component.ts", lineNumber: 10 }); })();
//# sourceMappingURL=accordion-group.component.js.map