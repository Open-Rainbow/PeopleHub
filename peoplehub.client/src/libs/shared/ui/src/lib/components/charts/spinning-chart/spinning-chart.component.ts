import { AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {
    ArcElement,
    Chart,
    ChartConfiguration,
    ChartData,
    Plugin,
    registerables,
} from 'chart.js';

Chart.register(...registerables);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-spinning-chart',
  templateUrl: './spinning-chart.component.html',
  styleUrls: ['./spinning-chart.component.scss'],
})
export class SpinningChartComponent
  implements AfterViewInit, OnDestroy, OnChanges
{
  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  public chart: Chart | undefined;

  @Input() percentage?: number;
  @Input() value?: number;
  @Input() total?: number;
  @Input() size: number = 64;        
  @Input() width?: number=200;
  @Input() height?: number = 200;
  @Input() showData: boolean = true;
  @Input() completedColor?: string = 'rgb(0, 150, 255)';
  @Input() remainingColor: string = 'rgb(220, 240, 255)';
  @Input() textColor: string = 'rgb(1, 19, 41)';
  @Input() hoverCompletedColor: string = 'rgba(8, 116, 194, 1)';
  public chartData: number[] = [0, 100];

  ngAfterViewInit(): void {
    if (this.chartCanvas) {
      const percent = this.computePercentage();
      this.createDoughnutChart(percent);
    } else {
      console.error('Chart canvas element not found!');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['percentage'] || changes['value'] || changes['total']) {
      const percent = this.computePercentage();
      if (this.chartCanvas) {
        this.createDoughnutChart(percent);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private computePercentage(): number {
    if (this.value != null && this.total != null && this.total > 0) {
      return (this.value / this.total) * 100;
    }
    return this.percentage ?? 0;
  }

  private centerTextPlugin: Plugin<'doughnut'> = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const {
        ctx,
        chartArea: { width, height },
      } = chart;
      ctx.save();

      if (
        (this.value != null && this.total != null && this.value > this.total) ||
        (this.percentage != null && this.percentage > 100)
      ) {
        const fontSize = (height / 100).toFixed(2);
        ctx.font = `bold ${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'red';
        const text = 'Not valid';
        const textX =
          Math.round((width - ctx.measureText(text).width) / 2) +
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

        const text =
          this.value != null && this.total != null
            ? `${this.value}`
            : `${this.percentage ?? 0}%`;

        const textX =
          Math.round((width - ctx.measureText(text).width) / 2) +
          chart.chartArea.left;
        const textY = height / 2 + chart.chartArea.top;

        ctx.fillText(text, textX, textY);
      }

      ctx.restore();
    },
  };

  private continuousBackgroundPlugin: Plugin<'doughnut'> = {
    id: 'continuousBackground',
    beforeDatasetsDraw: (chart) => {
      const { ctx, chartArea } = chart;
      ctx.save();

      const meta = chart.getDatasetMeta(0);
      if (!meta || !meta.data || meta.data.length === 0) {
        ctx.restore();
        return;
      }

      const arc = meta.data[0] as ArcElement;
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

  private createDoughnutChart(percentage: number): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const isInvalid =
      (this.value != null && this.total != null && this.value > this.total) ||
      (this.percentage != null && this.percentage > 100);

    if (isInvalid) {
      this.chartData = [0, 100];
    } else {
      this.chartData = [percentage, 100 - percentage];
    }

    const data: ChartData<'doughnut'> = {
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

    const config: ChartConfiguration<'doughnut'> = {
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
}
