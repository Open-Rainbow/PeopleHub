import { AfterViewInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import * as i0 from "@angular/core";
export declare class ScatterChartComponent implements AfterViewInit {
    scatterCanvas: ElementRef<HTMLCanvasElement>;
    chart: Chart<'scatter', {
        x: number;
        y: number;
    }[]>;
    title: string;
    xAxisLabel: string;
    yAxisLabel: string;
    yAxisLabels: string[];
    legendShape: 'circle' | 'rect' | 'rectRounded' | 'triangle' | 'rectRot';
    datasets: {
        label: string;
        data: {
            x: number;
            y: number;
        }[];
        backgroundColor?: string;
        borderColor?: string;
        pointRadius?: number;
        pointStyle?: 'circle' | 'rect' | 'rectRounded' | 'triangle' | 'rectRot';
    }[];
    ngAfterViewInit(): void;
    private createChart;
    private buildData;
    private buildOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScatterChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScatterChartComponent, "ui-scatter-chart", never, { "title": { "alias": "title"; "required": false; }; "xAxisLabel": { "alias": "xAxisLabel"; "required": false; }; "yAxisLabel": { "alias": "yAxisLabel"; "required": false; }; "yAxisLabels": { "alias": "yAxisLabels"; "required": false; }; "legendShape": { "alias": "legendShape"; "required": false; }; "datasets": { "alias": "datasets"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=scatter-chart.component.d.ts.map