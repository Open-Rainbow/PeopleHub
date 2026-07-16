import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ArcElement, Chart, DoughnutController, Legend, Tooltip, } from 'chart.js';
import * as i0 from "@angular/core";
const _c0 = ["chartCanvas"];
function DoughnutChartComponent_Conditional_4_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 6);
    i0.ɵɵdomListener("mouseenter", function DoughnutChartComponent_Conditional_4_For_2_Template_div_mouseenter_0_listener() { const ɵ$index_10_r2 = i0.ɵɵrestoreView(_r1).$index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onLegendHover(ɵ$index_10_r2)); })("mouseleave", function DoughnutChartComponent_Conditional_4_For_2_Template_div_mouseleave_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onLegendLeave()); });
    i0.ɵɵdomElementStart(1, "div", 7);
    i0.ɵɵdomElement(2, "span", 8);
    i0.ɵɵdomElementStart(3, "span", 9);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(5, "span", 10);
    i0.ɵɵtext(6);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ɵ$index_10_r2 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("opacity-40", ctx_r2.activeIndex !== null && ctx_r2.activeIndex !== ɵ$index_10_r2)("bg-gray-100", ctx_r2.activeIndex === ɵ$index_10_r2);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("background", item_r4.color);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", item_r4.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", item_r4.color);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.getDisplayValue(ɵ$index_10_r2), " ");
} }
function DoughnutChartComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 4);
    i0.ɵɵrepeaterCreate(1, DoughnutChartComponent_Conditional_4_For_2_Template, 7, 10, "div", 5, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.legendData);
} }
export class DoughnutChartComponent {
    chartRef;
    chart;
    showLegends = true;
    centerText = true;
    showAsValue = false;
    legendData = [];
    activeLabel = 'Total Data';
    activeValue = '0';
    total = 0;
    defaultLabel = '';
    activeIndex = null;
    originalColors = [];
    animatedTotal = 0;
    animatedPercentages = [];
    animatedValues = [];
    ngOnInit() {
        this.originalColors = [...this.legendData.map(d => d.color)];
        Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
        this.total = this.legendData.reduce((sum, item) => sum + item.value, 0);
        this.animatedValues = this.legendData.map(() => 0);
        this.animateNumbers();
        this.activeValue = this.total.toString();
        this.defaultLabel = this.activeLabel;
        const centerTextPlugin = {
            id: 'centerText',
            afterDraw: (chart) => {
                const { width, height, ctx } = chart;
                ctx.save();
                const fontSizeMain = (height / 7).toFixed(0);
                ctx.font = `bold ${fontSizeMain}px Arial`;
                ctx.fillStyle = '#1E1E1E';
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                if (this.centerText) {
                    if (this.activeLabel && this.activeLabel.trim() !== '') {
                        ctx.font = `bold 30px Arial`;
                        ctx.fillStyle = '#9CA3AF';
                        ctx.fillText(this.activeValue, width / 2, height / 2 - 8);
                        ctx.font = `12px Arial`;
                        ctx.fillStyle = '#9CA3AF';
                        ctx.fillText(this.activeLabel, width / 2, height / 2 + 18);
                    }
                    else {
                        ctx.fillText(this.activeValue, width / 2, height / 2);
                    }
                }
                ctx.restore();
            },
        };
        const config = {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: this.legendData.map((d) => d.value),
                        backgroundColor: this.legendData.map((d) => d.color),
                        borderWidth: 0,
                        borderRadius: 5,
                        spacing: 5,
                        hoverOffset: 1
                    },
                ],
            },
            options: {
                cutout: '85%',
                rotation: 0,
                responsive: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: false,
                        callbacks: {
                            label: (context) => {
                                const index = context.dataIndex;
                                const item = this.legendData[index];
                                const percentage = Math.round((item.value / this.total) * 100);
                                return this.showAsValue
                                    ? `${item.label}: ${item.value}`
                                    : `${item.label}: ${percentage}%`;
                            },
                        },
                    },
                },
                onHover: (event, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        this.updateHighlight(index);
                        const item = this.legendData[index];
                        const percentage = Math.round((item.value / this.total) * 100);
                        this.activeValue = this.showAsValue
                            ? `${item.value}`
                            : `${percentage}%`;
                        this.activeLabel = item.label;
                    }
                    else {
                        this.updateHighlight(null);
                        this.activeValue = this.total.toString();
                        this.activeLabel = this.defaultLabel;
                    }
                },
            },
            plugins: [centerTextPlugin],
        };
        this.chart = new Chart(this.chartRef.nativeElement.getContext('2d'), config);
    }
    ngOnDestroy() {
        this.chart?.destroy();
    }
    getDisplayValue(index) {
        return `${this.animatedValues[index]}`;
    }
    updateHighlight(index) {
        const dataset = this.chart.data.datasets[0];
        if (index === null) {
            dataset.backgroundColor = [...this.originalColors];
            dataset.borderWidth = 0;
        }
        else {
            dataset.backgroundColor = this.originalColors.map((color, i) => i === index ? color : '#E5E7EB');
            dataset.borderWidth = this.originalColors.map((_, i) => i === index ? 3 : 0);
            dataset.borderColor = this.originalColors;
        }
        this.activeIndex = index;
        this.chart.update();
    }
    onLegendHover(index) {
        this.updateHighlight(index);
        const item = this.legendData[index];
        const percentage = Math.round((item.value / this.total) * 100);
        this.activeValue = this.showAsValue
            ? `${item.value}`
            : `${percentage}%`;
        this.activeLabel = item.label;
    }
    onLegendLeave() {
        this.updateHighlight(null);
        this.activeValue = this.total.toString();
        this.activeLabel = this.defaultLabel;
    }
    animateNumbers() {
        const duration = 1000;
        const frameRate = 16;
        const totalFrames = duration / frameRate;
        let frame = 0;
        const targetValues = this.legendData.map(item => item.value);
        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            this.animatedTotal = Math.round(this.total * progress);
            this.animatedValues = targetValues.map(v => Math.round(v * progress));
            if (frame >= totalFrames) {
                this.animatedTotal = this.total;
                this.animatedValues = targetValues;
                clearInterval(counter);
            }
            this.activeValue = this.animatedTotal.toString();
            this.chart?.draw();
        }, frameRate);
    }
    resetChart() {
        this.chart.setActiveElements([]);
        this.updateHighlight(null);
        this.activeIndex = null;
        this.activeValue = this.total.toString();
        this.activeLabel = this.defaultLabel;
        this.chart.update();
    }
    static ɵfac = function DoughnutChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DoughnutChartComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DoughnutChartComponent, selectors: [["ui-doughnut-chart"]], viewQuery: function DoughnutChartComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.chartRef = _t.first);
        } }, inputs: { showLegends: "showLegends", centerText: "centerText", showAsValue: "showAsValue", legendData: "legendData", activeLabel: "activeLabel" }, decls: 5, vars: 1, consts: [["chartCanvas", ""], [1, "flex", "items-center", "justify-center", "gap-6"], [1, "chart-container"], ["width", "216", "height", "216", 3, "mouseleave"], [1, "flex", "flex-col", "justify-center", "text-gray-600", "text-sm", "min-w-[160px]", "font-sans"], [1, "flex", "items-center", "justify-between", "gap-2.5", "px-3", "py-2", "rounded-lg", "transition-opacity", "duration-200", "text-[12px]", 3, "opacity-40", "bg-gray-100"], [1, "flex", "items-center", "justify-between", "gap-2.5", "px-3", "py-2", "rounded-lg", "transition-opacity", "duration-200", "text-[12px]", 3, "mouseenter", "mouseleave"], [1, "flex", "items-center", "gap-2.5"], [1, "w-3", "h-3", "rounded-full", "shrink-0"], [1, "text-gray-700"], [1, "font-semibold"]], template: function DoughnutChartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 1)(1, "div", 2)(2, "canvas", 3, 0);
            i0.ɵɵdomListener("mouseleave", function DoughnutChartComponent_Template_canvas_mouseleave_2_listener() { return ctx.resetChart(); });
            i0.ɵɵdomElementEnd()();
            i0.ɵɵconditionalCreate(4, DoughnutChartComponent_Conditional_4_Template, 3, 0, "div", 4);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.showLegends ? 4 : -1);
        } }, dependencies: [CommonModule], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DoughnutChartComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-doughnut-chart', imports: [CommonModule], template: "\r\n\r\n<div class=\"flex items-center justify-center gap-6\">\r\n\r\n  <div class=\"chart-container\">\r\n    <canvas #chartCanvas width=\"216\" height=\"216\" (mouseleave)=\"resetChart()\"></canvas>\r\n  </div>\r\n\r\n  @if (showLegends) {\r\n    <div class=\"flex flex-col justify-center text-gray-600 text-sm min-w-[160px] font-sans\">\r\n\r\n      @for (item of legendData; let i = $index; track item) {\r\n        <div\r\n          class=\"flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg transition-opacity duration-200 text-[12px]\"\r\n          (mouseenter)=\"onLegendHover(i)\"\r\n          (mouseleave)=\"onLegendLeave()\"\r\n          [class.opacity-40]=\"activeIndex !== null && activeIndex !== i\"\r\n          [class.bg-gray-100]=\"activeIndex === i\"\r\n        >\r\n          <div class=\"flex items-center gap-2.5\">\r\n            <span class=\"w-3 h-3 rounded-full shrink-0\"\r\n                  [style.background]=\"item.color\"></span>\r\n\r\n            <span class=\"text-gray-700\" >\r\n              {{ item.label }}\r\n            </span>\r\n          </div>\r\n\r\n          <span class=\"font-semibold\"\r\n                [style.color]=\"item.color\">\r\n            {{ getDisplayValue(i) }}\r\n          </span>\r\n        </div>\r\n      }\r\n\r\n    </div>\r\n  }\r\n</div>\r\n" }]
    }], null, { chartRef: [{
            type: ViewChild,
            args: ['chartCanvas', { static: true }]
        }], showLegends: [{
            type: Input
        }], centerText: [{
            type: Input
        }], showAsValue: [{
            type: Input
        }], legendData: [{
            type: Input
        }], activeLabel: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DoughnutChartComponent, { className: "DoughnutChartComponent", filePath: "libs/shared/ui/src/lib/components/charts/doughnut-chart/doughnut-chart.component.ts", lineNumber: 25 }); })();
//# sourceMappingURL=doughnut-chart.component.js.map