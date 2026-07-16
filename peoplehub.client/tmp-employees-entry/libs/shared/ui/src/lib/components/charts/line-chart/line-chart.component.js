import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, } from 'chart.js';
import * as i0 from "@angular/core";
const _c0 = ["chartCanvas"];
export class LineChartComponent {
    chartRef;
    chart;
    labels = [];
    data = [];
    colors = [];
    lineStyles = [];
    visible = [];
    seriesLabels = [];
    lineThickness = [];
    legendShapes = [];
    yAxisLabels = [];
    showDataPoints = true;
    yAxisStep = null;
    showYAxisLine = true;
    ngOnInit() {
        Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);
        this.createChart();
    }
    ngOnChanges(changes) {
        if (this.chart &&
            (changes['labels'] ||
                changes['data'] ||
                changes['colors'] ||
                changes['lineStyles'] ||
                changes['visible'] ||
                changes['lineThickness'] ||
                changes['legendShapes'] ||
                changes['yAxisLabels'] ||
                changes['yAxisStep'] ||
                changes['showYAxisLine'])) {
            this.updateChart();
        }
    }
    createChart() {
        const ctx = this.chartRef.nativeElement.getContext('2d');
        if (!ctx)
            return;
        const dashedLinePlugin = {
            id: 'dashedLinePlugin',
            afterDatasetsDraw: (chart) => {
                const activeElements = chart.getActiveElements();
                if (activeElements.length > 0) {
                    const ctx = chart.ctx;
                    const x = activeElements[0].element.x;
                    const topY = chart.scales['y'].top;
                    const bottomY = chart.scales['y'].bottom;
                    ctx.save();
                    ctx.beginPath();
                    ctx.setLineDash([4, 4]);
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = '#9ca3af';
                    ctx.stroke();
                    ctx.restore();
                }
            },
        };
        const config = {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: this.buildDatasets(),
            },
            plugins: [dashedLinePlugin],
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    tooltip: {
                        enabled: false,
                        external: (context) => this.externalTooltipHandler(context),
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            boxWidth: 18,
                            boxHeight: 20,
                            color: '#374151',
                            padding: 14,
                            font: {
                                size: 13,
                                family: 'Poppins, sans-serif',
                                weight: '500',
                            },
                            generateLabels: (chart) => this.generateCustomLegendLabels(chart),
                        },
                        pointStyle: (context) => {
                            const index = context.datasetIndex;
                            const shape = this.legendShapes[index] ?? 'rectRounded';
                            return shape;
                        },
                    },
                },
                scales: {
                    x: { grid: { display: false } },
                    y: {
                        beginAtZero: true,
                        border: { display: this.showYAxisLine },
                        grid: { color: 'rgba(0,0,0,0.1)' },
                        ticks: {
                            stepSize: this.yAxisStep ?? undefined,
                            color: '#374151',
                            font: {
                                size: 12,
                                family: 'Poppins, sans-serif',
                            },
                            callback: (value, index) => {
                                if (this.yAxisLabels.length > 0 &&
                                    this.yAxisLabels[index] !== undefined) {
                                    return this.yAxisLabels[index];
                                }
                                return value;
                            },
                        },
                    },
                },
            },
        };
        this.chart = new Chart(ctx, config);
    }
    externalTooltipHandler(context) {
        const { chart, tooltip } = context;
        let tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip';
            chart.canvas.parentNode?.appendChild(tooltipEl);
        }
        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = '0';
            return;
        }
        if (tooltip.body) {
            const titleLines = tooltip.title || [];
            const bodyLines = tooltip.body.map((b) => b.lines);
            let innerHtml = '';
            titleLines.forEach((title) => {
                innerHtml += `<div class="tooltip-header">${title}</div>`;
            });
            innerHtml += `<div class="tooltip-body">`;
            bodyLines.forEach((body, i) => {
                const colors = tooltip.labelColors[i];
                const style = `background:${colors.backgroundColor}; border-color:${colors.borderColor}`;
                const text = body[0];
                const parts = text.split(':');
                const seriesName = parts[0];
                const value = parts.length > 1 ? parts[1] : '';
                innerHtml += `
        <div class="tooltip-row">
          <span class="color-dot" style="${style}"></span>
          <span class="series-name">${seriesName}: </span>
          <span class="tooltip-value">${value}</span>
        </div>
        `;
            });
            innerHtml += `</div>`;
            tooltipEl.innerHTML = innerHtml;
        }
        const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
        const tooltipWidth = tooltipEl.offsetWidth;
        const chartWidth = chart.width;
        const caretX = tooltip.caretX;
        const caretY = tooltip.caretY;
        const isRightSide = caretX > chartWidth / 2;
        const gap = 15;
        let left = 0;
        if (isRightSide) {
            left = positionX + caretX - tooltipWidth - gap;
        }
        else {
            left = positionX + caretX + gap;
        }
        const top = positionY + caretY;
        tooltipEl.style.opacity = '1';
        tooltipEl.style.left = `${left}px`;
        tooltipEl.style.top = `${top}px`;
        tooltipEl.style.transform = 'translateY(-50%)';
        tooltipEl.style.pointerEvents = 'none';
    }
    buildDatasets() {
        return this.data
            .map((dataset, i) => {
            if (this.visible[i] === false)
                return null;
            return {
                label: this.seriesLabels[i] || `Series ${i + 1}`,
                data: dataset,
                borderColor: this.colors[i] || 'gray',
                backgroundColor: this.colors[i] || 'gray',
                borderDash: this.getLineDash(this.lineStyles[i]),
                fill: false,
                tension: 0.3,
                pointRadius: this.showDataPoints ? 4 : 0,
                pointHoverRadius: 6,
                pointHitRadius: 10,
                pointHoverBackgroundColor: this.colors[i],
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
                borderWidth: this.lineThickness[i] ?? 2,
            };
        })
            .filter((d) => d !== null);
    }
    getLineDash(style) {
        switch (style) {
            case 'dotted':
                return [2, 6];
            case 'dashed':
                return [8, 6];
            default:
                return [];
        }
    }
    generateCustomLegendLabels(chart) {
        const datasets = chart.data.datasets || [];
        return datasets
            .map((dataset, i) => {
            const isVisible = this.visible[i] === undefined ? true : this.visible[i];
            if (!isVisible)
                return null;
            return {
                text: dataset.label ?? `Series ${i + 1}`,
                fillStyle: this.colors[i] ?? '#999',
                strokeStyle: this.colors[i] ?? '#999',
                datasetIndex: i,
                hidden: !chart.isDatasetVisible(i),
                lineWidth: 0,
                pointStyle: this.legendShapes[i] ?? 'rectRounded',
            };
        })
            .filter((d) => d !== null);
    }
    updateChart() {
        if (!this.chart)
            return;
        this.chart.data.labels = this.labels;
        this.chart.data.datasets = this.buildDatasets();
        if (this.chart.options.scales?.['y']) {
            const yScale = this.chart.options.scales['y'];
            yScale.ticks.stepSize = this.yAxisStep ?? undefined;
            if (yScale.border)
                yScale.border.display = this.showYAxisLine;
        }
        this.chart.update();
    }
    ngOnDestroy() {
        const tooltipEl = document.getElementById('chartjs-tooltip');
        if (tooltipEl) {
            tooltipEl.remove();
        }
        this.chart?.destroy();
    }
    static ɵfac = function LineChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LineChartComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LineChartComponent, selectors: [["ui-line-chart"]], viewQuery: function LineChartComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.chartRef = _t.first);
        } }, inputs: { labels: "labels", data: "data", colors: "colors", lineStyles: "lineStyles", visible: "visible", seriesLabels: "seriesLabels", lineThickness: "lineThickness", legendShapes: "legendShapes", yAxisLabels: "yAxisLabels", showDataPoints: "showDataPoints", yAxisStep: "yAxisStep", showYAxisLine: "showYAxisLine" }, features: [i0.ɵɵNgOnChangesFeature], decls: 3, vars: 0, consts: [["chartCanvas", ""], [1, "relative", "w-full", "h-full", "overflow-visible"]], template: function LineChartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 1);
            i0.ɵɵdomElement(1, "canvas", null, 0);
            i0.ɵɵdomElementEnd();
        } }, styles: ["#chartjs-tooltip {\r\n  opacity: 0;\r\n  position: absolute;\r\n  background: white;\r\n  color: var(--color-text-primary);\r\n  border-radius: 8px;\r\n  pointer-events: none;\r\n  transition: all 0.3s ease;\r\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid var(--color-border);\r\n  width: auto;\r\n  min-width: 140px;\r\n  white-space: nowrap; \r\n  z-index: 100;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n  #chartjs-tooltip .tooltip-header {\r\n  background-color: var(--color-surface-muted);\r\n  color: var(--color-text-secondary);\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n  padding: 8px 12px;\r\n  border-top-left-radius: 8px;\r\n  border-top-right-radius: 8px;\r\n  border-bottom: 1px solid var(--color-border);\r\n}\r\n\r\n\r\n  #chartjs-tooltip .tooltip-body {\r\n  padding: 10px 12px;\r\n  background: white;\r\n  border-bottom-left-radius: 8px;\r\n  border-bottom-right-radius: 8px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 8px;\r\n}\r\n\r\n  #chartjs-tooltip .tooltip-row {\r\n  display: flex !important;\r\n  flex-direction: row !important;\r\n  align-items: center;\r\n  justify-content: flex-start;\r\n  font-size: 13px;\r\n  width: 100%;\r\n}\r\n\r\n  #chartjs-tooltip .color-dot {\r\n  width: 10px;\r\n  height: 10px;\r\n  border-radius: 50%;\r\n  display: inline-block;\r\n  flex-shrink: 0;\r\n}\r\n\r\n  #chartjs-tooltip .series-name {\r\n  margin-left: 5px;\r\n  color: var(--color-text-secondary);\r\n  font-weight: 300;\r\n  font-size: 14px;\r\n}\r\n\r\n  #chartjs-tooltip .tooltip-value {\r\n  margin-left: auto; \r\n  \r\n  font-weight: 600;\r\n  color: #7e8da0;\r\n  font-size: 14px;\r\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LineChartComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ui-line-chart', standalone: true, template: "<div class=\"relative w-full h-full overflow-visible\">\r\n  <canvas #chartCanvas></canvas>\r\n</div>\r\n", styles: ["\r\n\r\n::ng-deep #chartjs-tooltip {\r\n  opacity: 0;\r\n  position: absolute;\r\n  background: white;\r\n  color: var(--color-text-primary);\r\n  border-radius: 8px;\r\n  pointer-events: none;\r\n  transition: all 0.3s ease;\r\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid var(--color-border);\r\n  width: auto;\r\n  min-width: 140px;\r\n  white-space: nowrap; \r\n  z-index: 100;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\n::ng-deep #chartjs-tooltip .tooltip-header {\r\n  background-color: var(--color-surface-muted);\r\n  color: var(--color-text-secondary);\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n  padding: 8px 12px;\r\n  border-top-left-radius: 8px;\r\n  border-top-right-radius: 8px;\r\n  border-bottom: 1px solid var(--color-border);\r\n}\r\n\r\n\r\n::ng-deep #chartjs-tooltip .tooltip-body {\r\n  padding: 10px 12px;\r\n  background: white;\r\n  border-bottom-left-radius: 8px;\r\n  border-bottom-right-radius: 8px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 8px;\r\n}\r\n\r\n::ng-deep #chartjs-tooltip .tooltip-row {\r\n  display: flex !important;\r\n  flex-direction: row !important;\r\n  align-items: center;\r\n  justify-content: flex-start;\r\n  font-size: 13px;\r\n  width: 100%;\r\n}\r\n\r\n::ng-deep #chartjs-tooltip .color-dot {\r\n  width: 10px;\r\n  height: 10px;\r\n  border-radius: 50%;\r\n  display: inline-block;\r\n  flex-shrink: 0;\r\n}\r\n\r\n::ng-deep #chartjs-tooltip .series-name {\r\n  margin-left: 5px;\r\n  color: var(--color-text-secondary);\r\n  font-weight: 300;\r\n  font-size: 14px;\r\n}\r\n\r\n::ng-deep #chartjs-tooltip .tooltip-value {\r\n  margin-left: auto; \r\n  \r\n  font-weight: 600;\r\n  color: #7e8da0;\r\n  font-size: 14px;\r\n}\r\n"] }]
    }], null, { chartRef: [{
            type: ViewChild,
            args: ['chartCanvas', { static: true }]
        }], labels: [{
            type: Input
        }], data: [{
            type: Input
        }], colors: [{
            type: Input
        }], lineStyles: [{
            type: Input
        }], visible: [{
            type: Input
        }], seriesLabels: [{
            type: Input
        }], lineThickness: [{
            type: Input
        }], legendShapes: [{
            type: Input
        }], yAxisLabels: [{
            type: Input
        }], showDataPoints: [{
            type: Input
        }], yAxisStep: [{
            type: Input
        }], showYAxisLine: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LineChartComponent, { className: "LineChartComponent", filePath: "libs/shared/ui/src/lib/components/charts/line-chart/line-chart.component.ts", lineNumber: 31 }); })();
//# sourceMappingURL=line-chart.component.js.map