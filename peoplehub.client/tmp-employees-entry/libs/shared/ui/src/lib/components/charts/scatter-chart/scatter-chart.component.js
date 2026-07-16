import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Chart, Legend, LinearScale, PointElement, ScatterController, Title, Tooltip } from 'chart.js';
import * as i0 from "@angular/core";
const _c0 = ["scatterCanvas"];
Chart.register(ScatterController, LinearScale, PointElement, Tooltip, Legend, Title);
export class ScatterChartComponent {
    scatterCanvas;
    chart;
    title = '';
    xAxisLabel = '';
    yAxisLabel = '';
    yAxisLabels = [];
    legendShape = 'rectRounded';
    datasets = [];
    ngAfterViewInit() {
        this.createChart();
    }
    createChart() {
        this.chart = new Chart(this.scatterCanvas.nativeElement, {
            type: 'scatter',
            data: this.buildData(),
            options: this.buildOptions(),
        });
    }
    buildData() {
        return {
            datasets: this.datasets.map(ds => ({
                label: ds.label,
                data: ds.data,
                backgroundColor: ds.backgroundColor ?? '#3b82f6',
                borderColor: ds.borderColor ?? '#3b82f6',
                pointRadius: ds.pointRadius ?? 6,
                pointStyle: ds.pointStyle ?? 'circle',
                clip: false,
            })),
        };
    }
    buildOptions() {
        return {
            responsive: true,
            plugins: {
                title: {
                    display: !!this.title,
                    text: this.title,
                },
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        pointStyle: this.legendShape,
                    },
                },
            },
            scales: {
                x: {
                    type: 'linear',
                    min: 0,
                    title: {
                        display: !!this.xAxisLabel,
                        text: this.xAxisLabel,
                    },
                    ticks: {
                        stepSize: 0.5,
                    },
                },
                y: {
                    type: 'linear',
                    min: 0,
                    max: this.yAxisLabels.length
                        ? this.yAxisLabels.length - 1
                        : undefined,
                    title: {
                        display: !!this.yAxisLabel,
                        text: this.yAxisLabel,
                    },
                    ticks: {
                        stepSize: 1,
                        callback: (value) => this.yAxisLabels[value] ?? '',
                    },
                },
            },
        };
    }
    static ɵfac = function ScatterChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ScatterChartComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ScatterChartComponent, selectors: [["ui-scatter-chart"]], viewQuery: function ScatterChartComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.scatterCanvas = _t.first);
        } }, inputs: { title: "title", xAxisLabel: "xAxisLabel", yAxisLabel: "yAxisLabel", yAxisLabels: "yAxisLabels", legendShape: "legendShape", datasets: "datasets" }, decls: 2, vars: 0, consts: [["scatterCanvas", ""]], template: function ScatterChartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElement(0, "canvas", null, 0);
        } }, encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ScatterChartComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-scatter-chart', standalone: true, template: "<canvas #scatterCanvas></canvas>\r\n\r\n" }]
    }], null, { scatterCanvas: [{
            type: ViewChild,
            args: ['scatterCanvas', { static: true }]
        }], title: [{
            type: Input
        }], xAxisLabel: [{
            type: Input
        }], yAxisLabel: [{
            type: Input
        }], yAxisLabels: [{
            type: Input
        }], legendShape: [{
            type: Input
        }], datasets: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ScatterChartComponent, { className: "ScatterChartComponent", filePath: "libs/shared/ui/src/lib/components/charts/scatter-chart/scatter-chart.component.ts", lineNumber: 35 }); })();
//# sourceMappingURL=scatter-chart.component.js.map