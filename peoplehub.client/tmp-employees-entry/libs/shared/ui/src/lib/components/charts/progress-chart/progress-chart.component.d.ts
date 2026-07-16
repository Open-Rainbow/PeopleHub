import { AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ProgressChartComponent implements AfterViewInit, OnChanges {
    goalChart: ElementRef<HTMLCanvasElement>;
    goalText: string;
    progress: number;
    barColor: string;
    bgColor: string;
    private chart;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private renderChart;
    private updateChart;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProgressChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProgressChartComponent, "ui-progress-chart", never, { "goalText": { "alias": "goalText"; "required": false; }; "progress": { "alias": "progress"; "required": false; }; "barColor": { "alias": "barColor"; "required": false; }; "bgColor": { "alias": "bgColor"; "required": false; }; }, {}, never, never, true, never>;
}
//# sourceMappingURL=progress-chart.component.d.ts.map