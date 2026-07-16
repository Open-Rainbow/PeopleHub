import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip, } from 'chart.js';
import * as i0 from "@angular/core";
const _c0 = ["chartCanvas"];
export class HorizontalBarChartComponent {
    chartRef;
    horizontal = false;
    showLegend = true;
    singleLine = false;
    showLabels = true;
    showData = true;
    backgroundColors = [
        '#2166E1',
        '#FF8800',
        '#13C9E4',
        '#FFB400'
    ];
    legendShapes = [];
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',];
    data = [
        [390, 120, 295, 230, 100, 20, 180, 230, 250],
        [100, 190, 110, 380, 100, 200, 290, 300, 100],
        [150, 200, 190, 120, 100, 400, 90, 120, 200],
    ];
    datasetLabels = ['Net Profit', 'Revenue', 'Free Cash Flow'];
    yAxisTicks = [0, 50, 100, 150, 200, 250, 300, 350, 400];
    whiteTheme = false;
    gridDisplay = 'both';
    gridLineStyle = 'dashed';
    gridLineColor = '#030303ff';
    gridLineWidth = 1;
    dynamicYAxis = false;
    originalColors = ['#2166E1', '#FF8800', '#13C9E4', '#FFB400'];
    chart;
    ngOnInit() {
        Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);
        this.createChart();
    }
    ngOnChanges(changes) {
        if ((changes['horizontal'] || changes['showLegend'] || changes['singleLine'] ||
            changes['showLabels'] || changes['showData'] || changes['gridLineColor'] ||
            changes['backgroundColors'] ||
            changes['legendShapes'] || changes['gridLineWidth'] || changes['labels'] ||
            changes['data'] || changes['datasetLabels'] || changes['gridLineStyle'] ||
            changes['yAxisTicks'] || changes['gridDisplay'] || changes['whiteTheme'] || changes['dynamicYAxis']) && this.chart) {
            this.createChart();
        }
    }
    createChart() {
        const dashArray = this.gridLineStyle === 'dashed' ? [6, 4] : this.gridLineStyle === 'dotted' ? [1, 3] : [];
        const baseDatasets = this.data.map((datasetData, index) => ({
            label: this.datasetLabels[index] || `Series ${index + 1}`,
            data: datasetData,
            backgroundColor: this.whiteTheme ? '#FFFFFF' : this.getBackgroundColor(index),
            hoverBackgroundColor: this.getHoverBackgroundColor(index),
            borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 },
            borderSkipped: false,
            borderWidth: 1,
            borderColor: 'transparent',
        }));
        const datasets = this.showData
            ? baseDatasets
            : baseDatasets.map((ds) => ({
                ...ds,
                data: new Array(ds.data.length).fill(0),
                backgroundColor: 'rgba(0,0,0,0)',
                hoverBackgroundColor: 'rgba(0,0,0,0)',
            }));
        const config = {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets,
            },
            options: {
                indexAxis: this.horizontal ? 'y' : 'x',
                plugins: {
                    legend: {
                        display: this.showLegend,
                        position: 'bottom',
                        labels: {
                            boxWidth: 15,
                            padding: 8,
                            color: this.whiteTheme ? '#FFFFFF' : '#555',
                            font: { size: 13 },
                            usePointStyle: true,
                            generateLabels: (chart) => {
                                const datasets = chart.data.datasets || [];
                                return datasets.map((dataset, i) => {
                                    const shape = this.getLegendShape(i);
                                    const bgColor = this.whiteTheme
                                        ? this.getHoverBackgroundColor(i)
                                        : (typeof dataset.backgroundColor === 'string'
                                            ? dataset.backgroundColor
                                            : Array.isArray(dataset.backgroundColor)
                                                ? dataset.backgroundColor[0]
                                                : '#999');
                                    return {
                                        text: dataset.label ?? `Series ${i + 1}`,
                                        fillStyle: bgColor,
                                        strokeStyle: bgColor,
                                        datasetIndex: i,
                                        hidden: !chart.isDatasetVisible(i),
                                        lineWidth: 0,
                                        pointStyle: shape,
                                        fontColor: this.whiteTheme ? '#FFFFFF' : '#555',
                                    };
                                });
                            },
                        },
                    },
                    tooltip: {
                        enabled: this.showData,
                        backgroundColor: this.whiteTheme ? '#1F2937' : 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#FFFFFF',
                        bodyColor: '#FFFFFF',
                        borderColor: this.whiteTheme ? '#374151' : 'rgba(0, 0, 0, 0.8)',
                        borderWidth: 1,
                    },
                },
                scales: {
                    x: {
                        stacked: this.singleLine,
                        grid: this.getGridConfig('x'),
                        ticks: {
                            display: this.showLabels,
                            color: this.whiteTheme ? '#9CA3AF' : '#BCC2D9',
                            font: {
                                size: 13,
                                weight: 'bold'
                            },
                        },
                        border: {
                            display: true,
                            dash: dashArray,
                            dashOffset: 0
                        }
                    },
                    y: {
                        stacked: this.singleLine,
                        grid: this.getGridConfig('y'),
                        ticks: {
                            display: this.showLabels,
                            color: this.whiteTheme ? '#9CA3AF' : '#BCC2D9',
                            font: { size: 13, weight: 'bold' },
                            callback: (value) => value,
                            stepSize: this.dynamicYAxis ? undefined : this.calculateStepSize(this.yAxisTicks),
                        },
                        min: this.dynamicYAxis ? undefined : this.yAxisTicks[0],
                        max: this.dynamicYAxis ? undefined : this.yAxisTicks[this.yAxisTicks.length - 1],
                        suggestedMax: this.dynamicYAxis ? undefined : Math.max(...this.data.flat()) * 1.1,
                        border: {
                            display: true,
                            dash: dashArray,
                            dashOffset: 0
                        }
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart',
                },
                animations: {
                    y: {
                        from: (ctx) => {
                            if (ctx.type !== 'data')
                                return;
                            const chart = ctx.chart;
                            const isHorizontal = chart.options.indexAxis === 'y';
                            const scale = chart.scales[isHorizontal ? 'x' : 'y'];
                            const datasetIndex = ctx.datasetIndex;
                            const dataIndex = ctx.dataIndex;
                            let cumulative = 0;
                            for (let i = 0; i < datasetIndex; i++) {
                                const prevValue = chart.data.datasets[i].data[dataIndex];
                                cumulative += prevValue || 0;
                            }
                            return scale.getPixelForValue(cumulative);
                        }
                    },
                },
                datasets: {
                    bar: {
                        categoryPercentage: this.singleLine ? 0.9 : 0.8,
                        barPercentage: this.singleLine ? 0.25 : 0.8,
                    },
                },
                interaction: {
                    mode: 'nearest',
                    intersect: false,
                },
                onHover: (event, elements) => {
                    if (this.whiteTheme && this.chartRef?.nativeElement) {
                        this.chartRef.nativeElement.style.cursor = elements.length ? 'pointer' : 'default';
                    }
                },
            },
        };
        if (this.chart)
            this.chart.destroy();
        this.chart = new Chart(this.chartRef.nativeElement.getContext('2d'), config);
    }
    getHoverBackgroundColor(index) {
        if (this.whiteTheme) {
            return this.originalColors[index] || this.getBackgroundColor(index);
        }
        return this.darkenColor(this.getBackgroundColor(index), 0.2);
    }
    darkenColor(color, amount) {
        if (color.startsWith('#')) {
            let r = parseInt(color.slice(1, 3), 16);
            let g = parseInt(color.slice(3, 5), 16);
            let b = parseInt(color.slice(5, 7), 16);
            r = Math.floor(r * (1 - amount));
            g = Math.floor(g * (1 - amount));
            b = Math.floor(b * (1 - amount));
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        }
        return color;
    }
    getGridConfig(axis) {
        const shouldDisplay = axis === 'x'
            ? this.shouldDisplayXGrid()
            : this.shouldDisplayYGrid();
        if (!shouldDisplay || this.gridLineStyle === 'none') {
            return {
                display: true,
                drawOnChartArea: false,
                drawTicks: false
            };
        }
        const dashMap = {
            solid: [],
            dashed: [6, 4],
            dotted: [2, 6],
            none: []
        };
        return {
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            color: this.gridLineColor,
            lineWidth: this.gridLineWidth,
            drawBorder: false,
            borderDash: dashMap[this.gridLineStyle],
            borderDashOffset: 0,
        };
    }
    shouldDisplayXGrid() {
        if (this.horizontal) {
            return this.gridDisplay === 'both' || this.gridDisplay === 'horizontal';
        }
        return this.gridDisplay === 'both' || this.gridDisplay === 'vertical';
    }
    shouldDisplayYGrid() {
        if (this.horizontal) {
            return this.gridDisplay === 'both' || this.gridDisplay === 'vertical';
        }
        return this.gridDisplay === 'both' || this.gridDisplay === 'horizontal';
    }
    calculateStepSize(ticks) {
        if (ticks.length < 2)
            return 1;
        return ticks[1] - ticks[0];
    }
    getBackgroundColor(index) {
        return (this.backgroundColors[index] ??
            this.originalColors[index % this.originalColors.length]);
    }
    getLegendShape(index) {
        if (this.legendShapes && this.legendShapes[index] !== undefined) {
            return this.legendShapes[index];
        }
        return 'rectRounded';
    }
    ngOnDestroy() {
        this.chart?.destroy();
    }
    static ɵfac = function HorizontalBarChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HorizontalBarChartComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HorizontalBarChartComponent, selectors: [["ui-horizontal-bar-chart"]], viewQuery: function HorizontalBarChartComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.chartRef = _t.first);
        } }, inputs: { horizontal: "horizontal", showLegend: "showLegend", singleLine: "singleLine", showLabels: "showLabels", showData: "showData", backgroundColors: "backgroundColors", legendShapes: "legendShapes", labels: "labels", data: "data", datasetLabels: "datasetLabels", yAxisTicks: "yAxisTicks", whiteTheme: "whiteTheme", gridDisplay: "gridDisplay", gridLineStyle: "gridLineStyle", gridLineColor: "gridLineColor", gridLineWidth: "gridLineWidth", dynamicYAxis: "dynamicYAxis" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 0, consts: [["chartCanvas", ""], [1, "!w-full", "!h-full", "max-w-full", "max-h-full", "block"]], template: function HorizontalBarChartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElement(0, "canvas", 1, 0);
        } }, encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HorizontalBarChartComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-horizontal-bar-chart', standalone: true, template: "<canvas #chartCanvas class=\"!w-full !h-full max-w-full max-h-full block\"></canvas>\r\n" }]
    }], null, { chartRef: [{
            type: ViewChild,
            args: ['chartCanvas', { static: true }]
        }], horizontal: [{
            type: Input
        }], showLegend: [{
            type: Input
        }], singleLine: [{
            type: Input
        }], showLabels: [{
            type: Input
        }], showData: [{
            type: Input
        }], backgroundColors: [{
            type: Input
        }], legendShapes: [{
            type: Input
        }], labels: [{
            type: Input
        }], data: [{
            type: Input
        }], datasetLabels: [{
            type: Input
        }], yAxisTicks: [{
            type: Input
        }], whiteTheme: [{
            type: Input
        }], gridDisplay: [{
            type: Input
        }], gridLineStyle: [{
            type: Input
        }], gridLineColor: [{
            type: Input
        }], gridLineWidth: [{
            type: Input
        }], dynamicYAxis: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HorizontalBarChartComponent, { className: "HorizontalBarChartComponent", filePath: "libs/shared/ui/src/lib/components/charts/horizontal-bar-chart/horizontal-bar-chart.component.ts", lineNumber: 16 }); })();
//# sourceMappingURL=horizontal-bar-chart.component.js.map