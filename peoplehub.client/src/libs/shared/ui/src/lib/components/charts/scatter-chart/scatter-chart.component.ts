import { AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    ViewChild, ChangeDetectionStrategy } from '@angular/core';

import {
    Chart,
    ChartDataset,
    ChartOptions,
    Legend,
    LinearScale,
    PointElement,
    ScatterController,
    Title,
    Tooltip
} from 'chart.js';

Chart.register(
  ScatterController,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-scatter-chart',
  standalone: true,
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss'],
})
export class ScatterChartComponent implements AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('scatterCanvas', { static: true })
  scatterCanvas!: ElementRef<HTMLCanvasElement>;

  chart?: Chart<'scatter', { x: number; y: number }[]>;

  @Input() title = '';

  @Input() xAxisLabel = '';

  @Input() yAxisLabel = '';

  @Input() yAxisLabels: string[] = [];

  @Input() legendShape:
    | 'circle'
    | 'rect'
    | 'rectRounded'
    | 'triangle'
    | 'rectRot' = 'rectRounded';

  @Input() datasets: {
    label: string;
    data: { x: number; y: number }[];
    backgroundColor?: string;
    borderColor?: string;
    pointRadius?: number;
    pointStyle?: 'circle' | 'rect' | 'rectRounded' | 'triangle' | 'rectRot';
  }[] = [];

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (!this.chart) return;
    this.chart.data = this.buildData();
    this.chart.options = this.buildOptions();
    this.chart.update();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
    this.chart = undefined;
  }

  private createChart(): void {
    this.chart?.destroy();
    this.chart = new Chart(this.scatterCanvas.nativeElement, {
      type: 'scatter',
      data: this.buildData(),
      options: this.buildOptions(),
    });
  }

  private buildData(): {
    datasets: ChartDataset<'scatter', { x: number; y: number }[]>[];
  } {
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

  private buildOptions(): ChartOptions<'scatter'> {
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
            callback: (value) =>
              this.yAxisLabels[value as number] ?? '',
          },
        },
      },
    };
  }
}
