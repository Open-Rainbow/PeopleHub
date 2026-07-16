import { AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DialChartComponent implements AfterViewInit, OnChanges {
    dialCanvas: ElementRef<HTMLCanvasElement>;
    percentage: number;
    lastMonthChange: number;
    isRounded: boolean;
    dialColor: string;
    hoverColor: string;
    bgColor: string;
    private chart;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private drawChart;
    static ɵfac: i0.ɵɵFactoryDeclaration<DialChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DialChartComponent, "ui-dial-chart", never, { "percentage": { "alias": "percentage"; "required": false; }; "lastMonthChange": { "alias": "lastMonthChange"; "required": false; }; "isRounded": { "alias": "isRounded"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=dial-chart.component.d.ts.map