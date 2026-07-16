import { Signal } from '@angular/core';
import { AccordionGroupVariant } from './accordion.types';
import * as i0 from "@angular/core";
export declare class AccordionGroupComponent {
    variant: AccordionGroupVariant;
    allowMultiple: boolean;
    private openItems;
    getOpenItemsSignal(): Signal<Set<string>>;
    isItemOpen(sectionId: string): boolean;
    toggleAccordion(sectionId: string): void;
    getOpenState(sectionId: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccordionGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AccordionGroupComponent, "ui-accordion-group", never, { "variant": { "alias": "variant"; "required": false; }; "allowMultiple": { "alias": "allowMultiple"; "required": false; }; }, {}, never, ["*"], true, never>;
}
//# sourceMappingURL=accordion-group.component.d.ts.map