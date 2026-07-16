import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ArcElement, Chart, DoughnutController, Legend, Tooltip, } from 'chart.js';
import * as i0 from "@angular/core";
const _c0 = ["dialCanvas"];
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
export class DialChartComponent {
    dialCanvas;
    percentage = 70;
    lastMonthChange = 5;
    isRounded = false;
    dialColor = '#ff7a00';
    hoverColor = '#1d4ed8';
    bgColor = '#f5f5f5';
    chart;
    ngAfterViewInit() {
        this.drawChart();
    }
    ngOnChanges(changes) {
        if (this.chart && (changes['isRounded'] || changes['percentage'])) {
            const dataset = this.chart.data.datasets[0];
            dataset.data = [this.percentage, 100 - this.percentage];
            dataset.borderRadius = this.isRounded ? 40 : 0;
            this.chart.update();
        }
        else if (this.dialCanvas) {
            this.drawChart();
        }
    }
    drawChart() {
        const ctx = this.dialCanvas.nativeElement.getContext('2d');
        if (!ctx)
            return;
        if (this.chart)
            this.chart.destroy();
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: [this.percentage, 100 - this.percentage],
                        backgroundColor: [this.dialColor, this.bgColor],
                        borderWidth: 0,
                        borderRadius: this.isRounded ? 40 : 0,
                    },
                ],
            },
            options: {
                responsive: true,
                rotation: -90,
                circumference: 180,
                cutout: '80%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                },
                onHover: (event, elements) => {
                    const canvas = this.dialCanvas.nativeElement;
                    const dataset = this.chart.data.datasets[0];
                    const hovered = elements && elements.length > 0 && elements[0].index === 0;
                    canvas.style.cursor = hovered ? 'pointer' : 'default';
                    if (hovered) {
                        dataset.backgroundColor = [this.hoverColor, this.bgColor];
                    }
                    else {
                        dataset.backgroundColor = [this.dialColor, this.bgColor];
                    }
                    this.chart.update('none');
                },
            },
        });
    }
    static ɵfac = function DialChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DialChartComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DialChartComponent, selectors: [["ui-dial-chart"]], viewQuery: function DialChartComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dialCanvas = _t.first);
        } }, inputs: { percentage: "percentage", lastMonthChange: "lastMonthChange", isRounded: "isRounded" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 2, consts: [["dialCanvas", ""], [1, "relative", "w-[280px]", "h-[140px]", "mx-auto"], [1, "h-full!", "w-[55%]!"], [1, "absolute", "top-[60%]", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "text-center", "w-full"], [1, "text-[15px]", "font-bold", "pr-[130px]"], [1, "bg-white", "rounded-md", "mr-[120px]", "inline-block", "text-sm"], [1, "text-green-500", "font-semibold"]], template: function DialChartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 1);
            i0.ɵɵdomElement(1, "canvas", 2, 0);
            i0.ɵɵdomElementStart(3, "div", 3)(4, "h2", 4);
            i0.ɵɵtext(5);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(6, "div", 5);
            i0.ɵɵtext(7, " Last Month ");
            i0.ɵɵdomElementStart(8, "span", 6);
            i0.ɵɵtext(9);
            i0.ɵɵdomElementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("", ctx.percentage, "%");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", ctx.lastMonthChange, "%+");
        } }, encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DialChartComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-dial-chart', standalone: true, template: "<div class=\"relative w-[280px] h-[140px] mx-auto\">\r\n  <canvas class=\"h-full! w-[55%]!\" #dialCanvas></canvas>\r\n\r\n  <div\r\n    class=\"absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full\"\r\n  >\r\n    <h2 class=\"text-[15px] font-bold pr-[130px]\">{{ percentage }}%</h2>\r\n    <div class=\"bg-white rounded-md mr-[120px] inline-block text-sm\">\r\n      Last Month\r\n      <span class=\"text-green-500 font-semibold\">{{ lastMonthChange }}%+</span>\r\n    </div>\r\n  </div>\r\n</div>\r\n" }]
    }], null, { dialCanvas: [{
            type: ViewChild,
            args: ['dialCanvas']
        }], percentage: [{
            type: Input
        }], lastMonthChange: [{
            type: Input
        }], isRounded: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DialChartComponent, { className: "DialChartComponent", filePath: "libs/shared/ui/src/lib/components/charts/dial-chart/dial-chart.component.ts", lineNumber: 26 }); })();
//# sourceMappingURL=dial-chart.component.js.map