import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DoughnutChartComponent implements OnInit, OnDestroy {
    chartRef: ElementRef<HTMLCanvasElement>;
    private chart;
    showLegends: boolean;
    centerText: boolean;
    showAsValue: boolean;
    legendData: {
        color: string;
        value: number;
        label: string;
    }[];
    activeLabel: string;
    activeValue: string;
    total: number;
    defaultLabel: string;
    activeIndex: number | null;
    originalColors: string[];
    animatedTotal: number;
    animatedPercentages: number[];
    animatedValues: number[];
    ngOnInit(): void;
    ngOnDestroy(): void;
    getDisplayValue(index: number): string;
    private updateHighlight;
    onLegendHover(index: number): void;
    onLegendLeave(): void;
    private animateNumbers;
    resetChart(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DoughnutChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DoughnutChartComponent, "ui-doughnut-chart", never, { "showLegends": { "alias": "showLegends"; "required": false; }; "centerText": { "alias": "centerText"; "required": false; }; "showAsValue": { "alias": "showAsValue"; "required": false; }; "legendData": { "alias": "legendData"; "required": false; }; "activeLabel": { "alias": "activeLabel"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=doughnut-chart.component.d.ts.map