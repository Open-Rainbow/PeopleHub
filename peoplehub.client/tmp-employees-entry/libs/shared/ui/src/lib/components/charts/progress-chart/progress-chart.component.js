import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as i0 from "@angular/core";
const _c0 = ["goalChart"];
Chart.register(...registerables);
export class ProgressChartComponent {
    goalChart;
    goalText = '720 to Goal';
    progress = 70;
    barColor = '#d18238';
    bgColor = '#fbe7d2';
    chart;
    ngAfterViewInit() {
        this.renderChart();
    }
    ngOnChanges(changes) {
        if (this.chart) {
            this.updateChart();
        }
    }
    renderChart() {
        const ctx = this.goalChart.nativeElement.getContext('2d');
        const config = {
            type: 'bar',
            data: {
                labels: ['Progress'],
                datasets: [
                    {
                        label: 'Progress',
                        data: [this.progress],
                        backgroundColor: this.barColor,
                        borderRadius: 10,
                        barPercentage: 1,
                        categoryPercentage: 1,
                        borderSkipped: false,
                    },
                ],
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 800,
                    easing: 'easeOutQuart',
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                },
                scales: {
                    x: {
                        min: 0,
                        max: 100,
                        display: false,
                        grid: { display: false },
                    },
                    y: {
                        display: false,
                        grid: { display: false },
                    },
                },
            },
        };
        this.chart = new Chart(ctx, config);
        this.goalChart.nativeElement.style.background = this.bgColor;
        this.goalChart.nativeElement.style.borderRadius = '10px';
    }
    updateChart() {
        this.chart.data.datasets[0].data = [this.progress];
        this.chart.data.datasets[0].backgroundColor = this.barColor;
        this.goalChart.nativeElement.style.background = this.bgColor;
        this.chart.update();
    }
    static ɵfac = function ProgressChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProgressChartComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProgressChartComponent, selectors: [["ui-progress-chart"]], viewQuery: function ProgressChartComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.goalChart = _t.first);
        } }, inputs: { goalText: "goalText", progress: "progress", barColor: "barColor", bgColor: "bgColor" }, features: [i0.ɵɵNgOnChangesFeature], decls: 9, vars: 2, consts: [["goalChart", ""], [1, "w-[320px]", "bg-white", "rounded-[10px]", "px-4", "py-[14px]", "shadow-[0_1px_4px_rgba(0,0,0,0.08)]", "font-['Segoe_UI',_sans-serif]"], [1, "flex", "justify-between", "items-center", "mb-2"], [1, "text-[#0a2233]", "font-semibold"], [1, "text-[#9ca3af]", "font-medium"], [1, "h-2", "w-full"], [1, "w-full", "h-full"]], template: function ProgressChartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 1)(1, "div", 2)(2, "span", 3);
            i0.ɵɵtext(3);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(4, "span", 4);
            i0.ɵɵtext(5);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(6, "div", 5);
            i0.ɵɵdomElement(7, "canvas", 6, 0);
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.goalText);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", ctx.progress, "%");
        } }, encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProgressChartComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-progress-chart', standalone: true, template: "<div class=\"w-[320px] bg-white rounded-[10px] px-4 py-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.08)] font-['Segoe_UI',_sans-serif]\">\r\n  <div class=\"flex justify-between items-center mb-2\">\r\n    <span class=\"text-[#0a2233] font-semibold\">{{ goalText }}</span>\r\n    <span class=\"text-[#9ca3af] font-medium\">{{ progress }}%</span>\r\n  </div>\r\n  <div class=\"h-2 w-full\">\r\n    <canvas #goalChart class=\"w-full h-full\"></canvas>\r\n  </div>\r\n</div>\r\n" }]
    }], null, { goalChart: [{
            type: ViewChild,
            args: ['goalChart']
        }], goalText: [{
            type: Input
        }], progress: [{
            type: Input
        }], barColor: [{
            type: Input
        }], bgColor: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProgressChartComponent, { className: "ProgressChartComponent", filePath: "libs/shared/ui/src/lib/components/charts/progress-chart/progress-chart.component.ts", lineNumber: 19 }); })();
//# sourceMappingURL=progress-chart.component.js.map