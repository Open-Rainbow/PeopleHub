import { CommonModule } from '@angular/common';
import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    ArcElement,
    Chart,
    ChartConfiguration,
    DoughnutController,
    Legend,
    Plugin,
    Tooltip,
} from 'chart.js';

@Component({
  selector: 'ui-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
  imports: [CommonModule],
})
export class DoughnutChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true })
  chartRef!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;

  @Input() showLegends: boolean = true;
  @Input() centerText: boolean = true;
  @Input() showAsValue: boolean = false;

  @Input() legendData: { color: string; value: number; label: string }[] = [];

  @Input() activeLabel: string = 'Total Data';
  activeValue: string = '0';
  total: number = 0;
  defaultLabel: string = '';
  activeIndex: number | null = null;
  originalColors: string[] = [];
  animatedTotal: number = 0;
  animatedPercentages: number[] = [];
  animatedValues: number[] = [];


  ngOnInit() {
    this.originalColors = [...this.legendData.map(d => d.color)];

    Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

    this.total = this.legendData.reduce((sum, item) => sum + item.value, 0);
    this.animatedValues = this.legendData.map(() => 0);
    this.animateNumbers();
    this.activeValue = this.total.toString();
    this.defaultLabel = this.activeLabel;

    const centerTextPlugin: Plugin<'doughnut'> = {
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
          } else {
            ctx.fillText(this.activeValue, width / 2, height / 2);
          }
        }

        ctx.restore();
      },
    };

    const config: ChartConfiguration<'doughnut'> = {
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
  } else {
    this.updateHighlight(null);
    this.activeValue = this.total.toString();
    this.activeLabel = this.defaultLabel;
  }
},

      },
      plugins: [centerTextPlugin],
    };

    this.chart = new Chart(
      this.chartRef.nativeElement.getContext('2d')!,
      config
    );
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }

getDisplayValue(index: number): string {
  return `${this.animatedValues[index]}`;
}

private updateHighlight(index: number | null) {
  const dataset = this.chart.data.datasets[0] as any;

  if (index === null) {
  
    dataset.backgroundColor = [...this.originalColors];
    dataset.borderWidth = 0;
  } else {
    dataset.backgroundColor = this.originalColors.map((color, i) =>
      i === index ? color : '#E5E7EB' 
    );

    dataset.borderWidth = this.originalColors.map((_, i) =>
      i === index ? 3 : 0
    );
    dataset.borderColor = this.originalColors;
  }

  this.activeIndex = index;
  this.chart.update();
}



onLegendHover(index: number) {
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
private animateNumbers() {
  const duration = 1000; 
  const frameRate = 16; 
  const totalFrames = duration / frameRate;

  let frame = 0;
  const targetValues = this.legendData.map(item => item.value);


  const counter = setInterval(() => {
    frame++;

    const progress = frame / totalFrames;

    this.animatedTotal = Math.round(this.total * progress);

    this.animatedValues = targetValues.map(v =>
      Math.round(v * progress)
    );


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



}
