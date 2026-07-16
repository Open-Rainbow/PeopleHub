import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Chart, registerables, } from 'chart.js';
import * as i0 from "@angular/core";
const _c0 = ["chartCanvas"];
Chart.register(...registerables);
export class SpinningChartComponent {
    chartCanvas;
    chart;
    percentage;
    value;
    total;
    size = 64;
    width = 200;
    height = 200;
    showData = true;
    completedColor = 'rgb(0, 150, 255)';
    remainingColor = 'rgb(220, 240, 255)';
    textColor = 'rgb(1, 19, 41)';
    hoverCompletedColor = 'rgba(8, 116, 194, 1)';
    chartData = [0, 100];
    ngAfterViewInit() {
        if (this.chartCanvas) {
            const percent = this.computePercentage();
            this.createDoughnutChart(percent);
        }
        else {
            console.error('Chart canvas element not found!');
        }
    }
    ngOnChanges(changes) {
        if (changes['percentage'] || changes['value'] || changes['total']) {
            const percent = this.computePercentage();
            if (this.chartCanvas) {
                this.createDoughnutChart(percent);
            }
        }
    }
    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
        }
    }
    computePercentage() {
        if (this.value != null && this.total != null && this.total > 0) {
            return (this.value / this.total) * 100;
        }
        return this.percentage ?? 0;
    }
    centerTextPlugin = {
        id: 'centerText',
        beforeDraw: (chart) => {
            const { ctx, chartArea: { width, height }, } = chart;
            ctx.save();
            if ((this.value != null && this.total != null && this.value > this.total) ||
                (this.percentage != null && this.percentage > 100)) {
                const fontSize = (height / 100).toFixed(2);
                ctx.font = `bold ${fontSize}em sans-serif`;
                ctx.textBaseline = 'middle';
                ctx.fillStyle = 'red';
                const text = 'Not valid';
                const textX = Math.round((width - ctx.measureText(text).width) / 2) +
                    chart.chartArea.left;
                const textY = height / 2 + chart.chartArea.top;
                ctx.fillText(text, textX, textY);
                ctx.restore();
                return;
            }
            if (this.showData) {
                const fontSize = (height / 100).toFixed(2);
                ctx.font = `bold ${fontSize}em sans-serif`;
                ctx.textBaseline = 'middle';
                ctx.fillStyle = this.textColor;
                const text = this.value != null && this.total != null
                    ? `${this.value}`
                    : `${this.percentage ?? 0}%`;
                const textX = Math.round((width - ctx.measureText(text).width) / 2) +
                    chart.chartArea.left;
                const textY = height / 2 + chart.chartArea.top;
                ctx.fillText(text, textX, textY);
            }
            ctx.restore();
        },
    };
    continuousBackgroundPlugin = {
        id: 'continuousBackground',
        beforeDatasetsDraw: (chart) => {
            const { ctx, chartArea } = chart;
            ctx.save();
            const meta = chart.getDatasetMeta(0);
            if (!meta || !meta.data || meta.data.length === 0) {
                ctx.restore();
                return;
            }
            const arc = meta.data[0];
            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = (chartArea.top + chartArea.bottom) / 2;
            const outerRadius = arc.outerRadius;
            const innerRadius = arc.innerRadius;
            ctx.beginPath();
            ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
            ctx.arc(centerX, centerY, innerRadius, 2 * Math.PI, 0, true);
            ctx.fillStyle = this.remainingColor;
            ctx.fill();
            ctx.restore();
        },
    };
    createDoughnutChart(percentage) {
        if (this.chart) {
            this.chart.destroy();
        }
        const isInvalid = (this.value != null && this.total != null && this.value > this.total) ||
            (this.percentage != null && this.percentage > 100);
        if (isInvalid) {
            this.chartData = [0, 100];
        }
        else {
            this.chartData = [percentage, 100 - percentage];
        }
        const data = {
            labels: ['Complete', 'Remaining'],
            datasets: [
                {
                    data: this.chartData,
                    backgroundColor: [this.completedColor, 'transparent'],
                    hoverBackgroundColor: [this.hoverCompletedColor, 'transparent'],
                    hoverBorderWidth: 0,
                    hoverOffset: 0,
                    spacing: 0,
                    borderWidth: 0,
                    borderRadius: [999, 0],
                },
            ],
        };
        const config = {
            type: 'doughnut',
            data,
            plugins: [this.continuousBackgroundPlugin, this.centerTextPlugin],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '80%',
                circumference: 360,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                },
                elements: {
                    arc: {
                        spacing: 0,
                        borderWidth: 0,
                    },
                },
            },
        };
        this.chart = new Chart(this.chartCanvas.nativeElement, config);
    }
    static ɵfac = function SpinningChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SpinningChartComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SpinningChartComponent, selectors: [["ui-spinning-chart"]], viewQuery: function SpinningChartComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.chartCanvas = _t.first);
        } }, inputs: { percentage: "percentage", value: "value", total: "total", size: "size", width: "width", height: "height", showData: "showData", completedColor: "completedColor", remainingColor: "remainingColor", textColor: "textColor", hoverCompletedColor: "hoverCompletedColor" }, features: [i0.ɵɵNgOnChangesFeature], decls: 3, vars: 4, consts: [["chartCanvas", ""], [1, "relative"], [1, "!w-full", "!h-full", "text-[15px]"]], template: function SpinningChartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 1);
            i0.ɵɵdomElement(1, "canvas", 2, 0);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵstyleProp("width", ctx.width, "px")("height", ctx.height, "px");
        } }, encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SpinningChartComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-spinning-chart', template: "<div\r\n  class=\"relative\"\r\n  [style.width.px]=\"width\"\r\n  [style.height.px]=\"height\"\r\n>\r\n  <canvas #chartCanvas class=\"!w-full !h-full text-[15px]\"></canvas>\r\n</div>" }]
    }], null, { chartCanvas: [{
            type: ViewChild,
            args: ['chartCanvas', { static: true }]
        }], percentage: [{
            type: Input
        }], value: [{
            type: Input
        }], total: [{
            type: Input
        }], size: [{
            type: Input
        }], width: [{
            type: Input
        }], height: [{
            type: Input
        }], showData: [{
            type: Input
        }], completedColor: [{
            type: Input
        }], remainingColor: [{
            type: Input
        }], textColor: [{
            type: Input
        }], hoverCompletedColor: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SpinningChartComponent, { className: "SpinningChartComponent", filePath: "libs/shared/ui/src/lib/components/charts/spinning-chart/spinning-chart.component.ts", lineNumber: 26 }); })();
//# sourceMappingURL=spinning-chart.component.js.map