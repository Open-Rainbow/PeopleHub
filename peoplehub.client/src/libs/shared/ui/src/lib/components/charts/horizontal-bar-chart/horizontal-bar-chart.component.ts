import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, Legend, LinearScale, Tooltip, } from 'chart.js';
import type {
    GridDisplayOption,
    GridLineStyle,
    LegendShape,
} from '../../../models/component-models/chart-grid-options.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-horizontal-bar-chart',
  standalone: true,
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss'],
})
export class HorizontalBarChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true })
  chartRef!: ElementRef<HTMLCanvasElement>;
  @Input() horizontal = false;
  @Input() showLegend = true;
  @Input() singleLine = false;
  @Input() showLabels = true;
  @Input() showData = true;
@Input() backgroundColors: string[] = [
  '#2166E1',
  '#FF8800',
  '#13C9E4',
  '#FFB400'
];
  @Input() legendShapes: LegendShape[] = [];
  @Input() labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',];
  @Input() data: number[][] = [
    [390, 120, 295, 230, 100, 20, 180, 230, 250],
    [100, 190, 110, 380, 100, 200, 290, 300, 100],
    [150, 200, 190, 120, 100, 400, 90, 120, 200],
  ];
  @Input() datasetLabels: string[] = ['Net Profit', 'Revenue', 'Free Cash Flow'];
  @Input() yAxisTicks: number[] = [0, 50, 100, 150, 200, 250, 300, 350, 400];
  @Input() whiteTheme = false;
  @Input() gridDisplay: GridDisplayOption = 'both';
  @Input() gridLineStyle: GridLineStyle = 'dashed';
  @Input() gridLineColor = '#030303ff';
  @Input() gridLineWidth = 1;
  @Input() dynamicYAxis = false;
  private originalColors = ['#2166E1', '#FF8800', '#13C9E4', '#FFB400'];
  private chart!: Chart;

  ngOnInit() {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
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
    const config: ChartConfiguration<'bar'> = {
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
              generateLabels: (chart: Chart) => {
                const datasets = chart.data.datasets || [];
                return datasets.map((dataset: any, i: number) => {
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
                    pointStyle: shape as any,
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
              if (ctx.type !== 'data') return;

              const chart = ctx.chart;
              const isHorizontal = chart.options.indexAxis === 'y';
              const scale = chart.scales[isHorizontal ? 'x' : 'y'];

              const datasetIndex = ctx.datasetIndex;
              const dataIndex = ctx.dataIndex;

              let cumulative = 0;
              for (let i = 0; i < datasetIndex; i++) {
                const prevValue =
                  chart.data.datasets[i].data[dataIndex] as number;
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
    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.chartRef.nativeElement.getContext('2d')!, config);
  }

  private getHoverBackgroundColor(index: number): string {
    if (this.whiteTheme) {
      return this.originalColors[index] || this.getBackgroundColor(index);
    }
    return this.darkenColor(this.getBackgroundColor(index), 0.2);
  }

  private darkenColor(color: string, amount: number): string {
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

  private getGridConfig(axis: 'x' | 'y'): any {
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

    const dashMap: Record<GridLineStyle, number[]> = {
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

  private shouldDisplayXGrid(): boolean {
    if (this.horizontal) {
      return this.gridDisplay === 'both' || this.gridDisplay === 'horizontal';
    }
    return this.gridDisplay === 'both' || this.gridDisplay === 'vertical';
  }

  private shouldDisplayYGrid(): boolean {
    if (this.horizontal) {
      return this.gridDisplay === 'both' || this.gridDisplay === 'vertical';
    }
    return this.gridDisplay === 'both' || this.gridDisplay === 'horizontal';
  }

  private calculateStepSize(ticks: number[]): number {
    if (ticks.length < 2) return 1;
    return ticks[1] - ticks[0];
  }

  private getBackgroundColor(index: number): string {
    return (
      this.backgroundColors[index] ??
      this.originalColors[index % this.originalColors.length]
    );
  }


  private getLegendShape(index: number): LegendShape {
    if (this.legendShapes && this.legendShapes[index] !== undefined) {
      return this.legendShapes[index];
    }
    return 'rectRounded';
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }
}
