import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import type { LegendShape } from '../../../models/component-models/chart-grid-options.model';
import * as i0 from "@angular/core";
export declare class LineChartComponent implements OnInit, OnChanges, OnDestroy {
    private chartRef;
    private chart;
    labels: string[];
    data: number[][];
    colors: string[];
    lineStyles: ('solid' | 'dotted' | 'dashed')[];
    visible: boolean[];
    seriesLabels: string[];
    lineThickness: number[];
    legendShapes: LegendShape[];
    yAxisLabels: (string | number)[];
    showDataPoints: boolean;
    yAxisStep: number | null;
    showYAxisLine: boolean;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private createChart;
    private externalTooltipHandler;
    private buildDatasets;
    private getLineDash;
    private generateCustomLegendLabels;
    private updateChart;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LineChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LineChartComponent, "ui-line-chart", never, { "labels": { "alias": "labels"; "required": false; }; "data": { "alias": "data"; "required": false; }; "colors": { "alias": "colors"; "required": false; }; "lineStyles": { "alias": "lineStyles"; "required": false; }; "visible": { "alias": "visible"; "required": false; }; "seriesLabels": { "alias": "seriesLabels"; "required": false; }; "lineThickness": { "alias": "lineThickness"; "required": false; }; "legendShapes": { "alias": "legendShapes"; "required": false; }; "yAxisLabels": { "alias": "yAxisLabels"; "required": false; }; "showDataPoints": { "alias": "showDataPoints"; "required": false; }; "yAxisStep": { "alias": "yAxisStep"; "required": false; }; "showYAxisLine": { "alias": "showYAxisLine"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=line-chart.component.d.ts.map