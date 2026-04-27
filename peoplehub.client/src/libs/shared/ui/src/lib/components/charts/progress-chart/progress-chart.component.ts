import { AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-progress-chart',
  standalone: true,
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.scss'],
})
export class ProgressChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('goalChart') goalChart!: ElementRef<HTMLCanvasElement>;

  @Input() goalText: string = '720 to Goal';
  @Input() progress: number = 70;
  @Input() barColor: string = '#d18238';
  @Input() bgColor: string = '#fbe7d2';

  private chart!: Chart;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.updateChart();
    }
  }

  private renderChart(): void {
    const ctx = this.goalChart.nativeElement.getContext('2d');

    const config: ChartConfiguration<'bar'> = {
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

    this.chart = new Chart(ctx!, config);
    this.goalChart.nativeElement.style.background = this.bgColor;
    this.goalChart.nativeElement.style.borderRadius = '10px';
  }

  private updateChart(): void {
    this.chart.data.datasets[0].data = [this.progress];
    this.chart.data.datasets[0].backgroundColor = this.barColor;
    this.goalChart.nativeElement.style.background = this.bgColor;
    this.chart.update();
  }
}
