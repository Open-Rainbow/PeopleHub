import { AfterViewInit, ElementRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import * as i0 from "@angular/core";
export declare class SpinningChartComponent implements AfterViewInit, OnDestroy, OnChanges {
    chartCanvas: ElementRef<HTMLCanvasElement>;
    chart: Chart | undefined;
    percentage?: number;
    value?: number;
    total?: number;
    size: number;
    width?: number;
    height?: number;
    showData: boolean;
    completedColor?: string;
    remainingColor: string;
    textColor: string;
    hoverCompletedColor: string;
    chartData: number[];
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private computePercentage;
    private centerTextPlugin;
    private continuousBackgroundPlugin;
    private createDoughnutChart;
    static ɵfac: i0.ɵɵFactoryDeclaration<SpinningChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SpinningChartComponent, "ui-spinning-chart", never, { "percentage": { "alias": "percentage"; "required": false; }; "value": { "alias": "value"; "required": false; }; "total": { "alias": "total"; "required": false; }; "size": { "alias": "size"; "required": false; }; "width": { "alias": "width"; "required": false; }; "height": { "alias": "height"; "required": false; }; "showData": { "alias": "showData"; "required": false; }; "completedColor": { "alias": "completedColor"; "required": false; }; "remainingColor": { "alias": "remainingColor"; "required": false; }; "textColor": { "alias": "textColor"; "required": false; }; "hoverCompletedColor": { "alias": "hoverCompletedColor"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=spinning-chart.component.d.ts.map