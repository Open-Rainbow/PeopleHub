import type { CountWidgetLabelPosition } from '../../../models/component-models/count-widget.types';
import * as i0 from "@angular/core";
export declare class CountWidgetComponent {
    label: string;
    labelColor: string;
    value: number;
    valueColor: string;
    borderColor: string;
    backgroundColor: string;
    showBorder: boolean;
    labelPosition: CountWidgetLabelPosition;
    labelSize: string;
    valueSize: string;
    locale: string;
    useGrouping: boolean;
    get isVertical(): boolean;
    get isReverse(): boolean;
    get formattedValue(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CountWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CountWidgetComponent, "ui-count-widget", never, { "label": { "alias": "label"; "required": false; }; "labelColor": { "alias": "labelColor"; "required": false; }; "value": { "alias": "value"; "required": false; }; "valueColor": { "alias": "valueColor"; "required": false; }; "borderColor": { "alias": "borderColor"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "showBorder": { "alias": "showBorder"; "required": false; }; "labelPosition": { "alias": "labelPosition"; "required": false; }; "labelSize": { "alias": "labelSize"; "required": false; }; "valueSize": { "alias": "valueSize"; "required": false; }; "locale": { "alias": "locale"; "required": false; }; "useGrouping": { "alias": "useGrouping"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=count-widget.component.d.ts.map