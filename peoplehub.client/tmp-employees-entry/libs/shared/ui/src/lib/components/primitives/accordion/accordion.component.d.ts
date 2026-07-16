import { ElementRef, EventEmitter, TemplateRef, Signal, OnInit, AfterViewInit } from '@angular/core';
import { AccordionGroupComponent } from './accordion-group.component';
import { AccordionVariant } from './accordion.types';
import * as i0 from "@angular/core";
export declare class AccordionComponent implements OnInit, AfterViewInit {
    private parentGroup?;
    title: string;
    subtitle?: string;
    modalTemplate?: TemplateRef<any>;
    sectionId?: string;
    isOpen?: boolean;
    variant: AccordionVariant;
    allowMultiple?: boolean;
    icon?: string;
    showEditButton: boolean;
    toggle: EventEmitter<string>;
    edit: EventEmitter<{
        sectionId: string;
        title: string;
        template?: TemplateRef<any>;
    }>;
    content: ElementRef;
    contentHeight: number;
    parentOpenItemsSignal: Signal<Set<string>> | null;
    constructor(parentGroup?: AccordionGroupComponent | undefined);
    ngOnInit(): void;
    isAccordionOpen(): boolean;
    toggleSection(): void;
    onKeyDown(event: KeyboardEvent): void;
    onEditClick(event: MouseEvent): void;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccordionComponent, [{ optional: true; skipSelf: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AccordionComponent, "ui-accordion", never, { "title": { "alias": "title"; "required": false; }; "subtitle": { "alias": "subtitle"; "required": false; }; "modalTemplate": { "alias": "modalTemplate"; "required": false; }; "sectionId": { "alias": "sectionId"; "required": false; }; "isOpen": { "alias": "isOpen"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "allowMultiple": { "alias": "allowMultiple"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "showEditButton": { "alias": "showEditButton"; "required": false; }; }, { "toggle": "toggle"; "edit": "edit"; }, never, never, true, never>;
}
//# sourceMappingURL=accordion.component.d.ts.map