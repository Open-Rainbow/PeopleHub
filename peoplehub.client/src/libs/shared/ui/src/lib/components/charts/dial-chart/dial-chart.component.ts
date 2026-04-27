import { AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {
    ArcElement,
    Chart,
    ChartEvent,
    DoughnutController,
    Legend,
    Tooltip,
} from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-dial-chart',
  templateUrl: './dial-chart.component.html',
  styleUrls: ['./dial-chart.component.scss'],
  standalone: true,
})
export class DialChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('dialCanvas') dialCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() percentage = 70;
  @Input() lastMonthChange = 5;
  @Input() isRounded = false;

  dialColor = '#ff7a00';
  hoverColor = '#1d4ed8';
  bgColor = '#f5f5f5';
  private chart!: Chart;

  ngAfterViewInit() {
    this.drawChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && (changes['isRounded'] || changes['percentage'])) {
      const dataset = this.chart.data.datasets[0];
      dataset.data = [this.percentage, 100 - this.percentage];
      (dataset as any).borderRadius = this.isRounded ? 40 : 0;
      this.chart.update();
    } else if (this.dialCanvas) {
      this.drawChart();
    }
  }

  private drawChart() {
    const ctx = this.dialCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    if (this.chart) this.chart.destroy();

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
        onHover: (event: ChartEvent, elements) => {
          const canvas = this.dialCanvas.nativeElement;
          const dataset = this.chart.data.datasets[0];
          const hovered =
            elements && elements.length > 0 && (elements[0] as any).index === 0;

          canvas.style.cursor = hovered ? 'pointer' : 'default';
          if (hovered) {
            (dataset as any).backgroundColor = [this.hoverColor, this.bgColor];
          } else {
            (dataset as any).backgroundColor = [this.dialColor, this.bgColor];
          }
          this.chart.update('none');
        },
      },
    });
  }
}
