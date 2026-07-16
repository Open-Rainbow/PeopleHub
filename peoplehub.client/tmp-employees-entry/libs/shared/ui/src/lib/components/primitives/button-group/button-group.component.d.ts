import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import type { ButtonGroupItem } from '../../../models/component-models/button-list-item.model';
import type { ButtonGroupOrientation, ButtonGroupSelectionMode, ButtonGroupSize, ButtonGroupVariant } from '../../../models/component-models/button-group.types';
import * as i0 from "@angular/core";
export declare class ButtonGroupComponent implements OnChanges {
    items: ButtonGroupItem[];
    variant: ButtonGroupVariant;
    size: ButtonGroupSize;
    orientation: ButtonGroupOrientation;
    selectionMode: ButtonGroupSelectionMode;
    ariaLabel: string;
    selectedValues: string[];
    selectionChange: EventEmitter<string[]>;
    buttonClick: EventEmitter<ButtonGroupItem>;
    readonly _selected: import("@angular/core").WritableSignal<Set<string>>;
    ngOnChanges(changes: SimpleChanges): void;
    isSelected(value: string): boolean;
    getContainerClasses(): string;
    getButtonClasses(item: ButtonGroupItem): string;
    handleClick(item: ButtonGroupItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonGroupComponent, "ui-button-group", never, { "items": { "alias": "items"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "orientation": { "alias": "orientation"; "required": false; }; "selectionMode": { "alias": "selectionMode"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; "selectedValues": { "alias": "selectedValues"; "required": false; }; }, { "selectionChange": "selectionChange"; "buttonClick": "buttonClick"; }, never, never, true, never>;
}
//# sourceMappingURL=button-group.component.d.ts.map