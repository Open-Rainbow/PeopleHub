import * as i0 from "@angular/core";
export declare class DotComponent {
    label: string;
    labelColor: string;
    labelPosition: 'left' | 'right';
    dotColor: string;
    dotSize: 'small' | 'medium' | 'large';
    getDotSize(dotSize: 'small' | 'medium' | 'large'): {
        width: string;
        height: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<DotComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DotComponent, "ui-dot", never, { "label": { "alias": "label"; "required": false; }; "labelColor": { "alias": "labelColor"; "required": false; }; "labelPosition": { "alias": "labelPosition"; "required": false; }; "dotColor": { "alias": "dotColor"; "required": false; }; "dotSize": { "alias": "dotSize"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=dot.component.d.ts.map