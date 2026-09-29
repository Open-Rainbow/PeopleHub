import { httpResource } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  ChartConfiguration,
  TooltipModel,
} from 'chart.js';
import { formatFileContent } from 'storybook/internal/common';

type LegendShape = 'circle' | 'rectRounded' | 'rect';

@Component({
  selector: 'line-chart',
  standalone: true,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('chartCanvas', { static: true })
  private chartRef!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;

  @Input() labels: string[] = [];
  @Input() data: number[][] = [];
  @Input() colors: string[] = [];
  @Input() lineStyles: ('solid' | 'dotted' | 'dashed')[] = [];
  @Input() visible: boolean[] = [];
  @Input() seriesLabels: string[] = [];
  @Input() lineThickness: number[] = [];
  @Input() legendShapes: LegendShape[] = [];
  @Input() yAxisLabels: (string | number)[] = [];
  @Input() showDataPoints: boolean = true;
  @Input() yAxisStep: number | null = null;
  @Input() showYAxisLine: boolean = true;

  ngOnInit() {
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title,
      CategoryScale,
      Tooltip,
      Legend
    );
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      this.chart &&
      (changes['labels'] ||
        changes['data'] ||
        changes['colors'] ||
        changes['lineStyles'] ||
        changes['visible'] ||
        changes['lineThickness'] ||
        changes['legendShapes'] ||
        changes['yAxisLabels'] ||
        changes['yAxisStep'] ||
      changes['showYAxisLine'])
    ) {
      this.updateChart();
    }
  }

  private createChart() {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const dashedLinePlugin = {
      id: 'dashedLinePlugin',
      afterDatasetsDraw: (chart: Chart) => {
        const activeElements = chart.getActiveElements();
        if (activeElements.length > 0) {
          const ctx = chart.ctx;
          const x = activeElements[0].element.x;
          const topY = chart.scales['y'].top;
          const bottomY = chart.scales['y'].bottom;

          ctx.save();
          ctx.beginPath();
          ctx.setLineDash([4, 4]); // Dotted pattern
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#9ca3af'; // Gray line color
          ctx.stroke();
          ctx.restore();
        }
      },
    };

    const config: ChartConfiguration<'line'> = {
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
            enabled: false, // Disable default canvas tooltip
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
              generateLabels: (chart: Chart) =>
                this.generateCustomLegendLabels(chart),
            },
            pointStyle: (context: any) => {
              const index = context.datasetIndex;
              const shape = this.legendShapes[index] ?? 'rectRounded';
              return shape;
            },
          } as any,
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            beginAtZero: true,
            border: { display: this.showYAxisLine },
            grid: { color: 'rgba(0,0,0,0.1)'},
            ticks: {
              stepSize: this.yAxisStep ?? undefined,
              color: '#374151',
              font: {
                size: 12,
                family: 'Poppins, sans-serif',
              },
              callback: (value: any, index: number) => {
                if (
                  this.yAxisLabels.length > 0 &&
                  this.yAxisLabels[index] !== undefined
                ) {
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

  private externalTooltipHandler(context: {
    chart: Chart;
    tooltip: TooltipModel<'line'>;
  }) {
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
      bodyLines.forEach((body: any, i) => {
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
    } else {
      left = positionX + caretX + gap;
    }

    const top = positionY + caretY;

    tooltipEl.style.opacity = '1';
    tooltipEl.style.left = `${left}px`;
    tooltipEl.style.top = `${top}px`;
    tooltipEl.style.transform = 'translateY(-50%)';
    tooltipEl.style.pointerEvents = 'none';
  }

  private buildDatasets() {
    return this.data
      .map((dataset, i) => {
        if (this.visible[i] === false) return null;

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
      .filter((d): d is NonNullable<typeof d> => d !== null);
  }

  private getLineDash(style?: 'solid' | 'dotted' | 'dashed'): number[] {
    switch (style) {
      case 'dotted':
        return [2, 6];
      case 'dashed':
        return [8, 6];
      default:
        return [];
    }
  }

  private generateCustomLegendLabels(chart: Chart) {
    const datasets = chart.data.datasets || [];
    return datasets
      .map((dataset: any, i: number) => {
        const isVisible =
          this.visible[i] === undefined ? true : this.visible[i];
        if (!isVisible) return null;

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
      .filter((d): d is NonNullable<typeof d> => d !== null);
  }

  private updateChart() {
    if (!this.chart) return;
    this.chart.data.labels = this.labels;
    this.chart.data.datasets = this.buildDatasets();

    if (this.chart.options.scales?.['y']) {
      const yScale: any = this.chart.options.scales['y'];
      
      
      yScale.ticks.stepSize = this.yAxisStep ?? undefined;
      
      // Add these lines to dynamically toggle the axis line:
      if (yScale.border) yScale.border.display = this.showYAxisLine;
     
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
}