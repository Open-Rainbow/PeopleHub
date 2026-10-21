import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

export type UiChartType = 'bar' | 'line' | 'doughnut';

/** One data series. `color` takes any CSS colour, including var(--token) and color-mix(). */
export interface UiChartSeries {
  label: string;
  data: number[];
  color?: string;
  /** Mixed charts: draw this series as bars or as a line. */
  type?: 'bar' | 'line';
  dashed?: boolean;
  /** Line: fill the area under it (area chart). */
  fill?: boolean;
  /** Bars with the same stack id are stacked. */
  stack?: string;
}

/** Default series colours, built only from theme tokens (light / dark both work). */
export const UI_CHART_PALETTE: readonly string[] = [
  'var(--color-primary)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-danger)',
  'color-mix(in srgb, var(--color-primary) 55%, var(--color-danger))',
  'color-mix(in srgb, var(--color-success) 50%, var(--color-primary))',
  'color-mix(in srgb, var(--color-warning) 50%, var(--color-danger))',
  'var(--color-primary-soft)',
  'color-mix(in srgb, var(--color-success) 50%, var(--color-warning))',
  'var(--color-text-secondary)',
];

/**
 * Shared Chart.js wrapper for bar, line, area, mixed and doughnut charts.
 * Every colour is read from the theme tokens at draw time and the chart redraws when the theme changes.
 */
@Component({
  selector: 'ui-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ui-chart" [style.height.px]="height">
      <canvas #canvas role="img" [attr.aria-label]="ariaLabel"></canvas>
      @if (type === 'doughnut' && centerValue !== null && centerValue !== undefined) {
        <div class="ui-chart__center" aria-hidden="true">
          <span class="ui-chart__value">{{ centerValue }}</span>
          @if (centerLabel) { <span class="ui-chart__label">{{ centerLabel }}</span> }
        </div>
      }
      <span #probe class="ui-chart__probe" aria-hidden="true"></span>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .ui-chart { position: relative; width: 100%; }
    .ui-chart__center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; }
    .ui-chart__value { font-size: 1.75rem; font-weight: 700; line-height: 1; color: var(--color-text-primary); }
    .ui-chart__label { margin-top: 0.25rem; font-size: 0.75rem; color: var(--color-text-secondary); }
    .ui-chart__probe { position: absolute; width: 0; height: 0; overflow: hidden; visibility: hidden; }
  `],
})
export class UiChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('canvas', { static: true }) private canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('probe', { static: true }) private probe!: ElementRef<HTMLSpanElement>;

  @Input() type: UiChartType = 'bar';
  @Input() labels: string[] = [];
  @Input() series: UiChartSeries[] = [];
  /** Doughnut slice colours (default: palette). */
  @Input() colors: string[] = [];
  @Input() stacked = false;
  @Input() horizontal = false;
  @Input() height = 260;
  @Input() showLegend = true;
  @Input() legendPosition: 'bottom' | 'top' | 'right' = 'bottom';
  @Input() cutout = '74%';
  @Input() centerValue: string | number | null = null;
  @Input() centerLabel = '';
  @Input() smooth = true;
  @Input() yStep: number | null = null;
  @Input() ariaLabel = 'Chart';

  private readonly zone = inject(NgZone);
  private readonly document = inject(DOCUMENT);
  private chart: Chart | null = null;
  private observer: MutationObserver | null = null;
  private ready = false;

  ngAfterViewInit(): void {
    this.ready = true;
    this.render();
    const root = this.document.documentElement;
    if (typeof MutationObserver !== 'undefined') {
      this.observer = new MutationObserver(() => this.render());
      this.observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    }
  }

  ngOnChanges(): void {
    if (this.ready) this.render();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.chart?.destroy();
    this.chart = null;
  }

  private render(): void {
    this.zone.runOutsideAngular(() => {
      this.chart?.destroy();
      const ctx = this.canvas.nativeElement.getContext('2d');
      if (!ctx) return;
      this.chart = new Chart(ctx, this.config());
    });
  }

  private config(): ChartConfiguration {
    const text = this.resolve('var(--color-text-secondary)');
    const strong = this.resolve('var(--color-text-primary)');
    const grid = withAlpha(this.resolve('var(--color-border)'), 0.6);
    const surface = this.resolve('var(--color-surface)');
    const border = this.resolve('var(--color-border)');
    const font = { family: 'inherit', size: 12 };

    const tooltip = {
      backgroundColor: surface,
      titleColor: strong,
      bodyColor: text,
      borderColor: border,
      borderWidth: 1,
      padding: 10,
      usePointStyle: true,
      boxPadding: 4,
    };
    const legend = {
      display: this.showLegend,
      position: this.legendPosition,
      labels: { color: text, usePointStyle: true, pointStyle: 'circle' as const, boxWidth: 8, boxHeight: 8, padding: 14, font },
    };

    if (this.type === 'doughnut') {
      const values = this.series[0]?.data ?? [];
      const colors = values.map((_, i) => this.resolve(this.colors[i] ?? UI_CHART_PALETTE[i % UI_CHART_PALETTE.length]));
      const empty = values.every((v) => !v);
      return {
        type: 'doughnut',
        data: {
          labels: empty ? ['No data'] : this.labels,
          datasets: [{
            data: empty ? [1] : values,
            backgroundColor: empty ? [this.resolve('var(--color-surface-muted)')] : colors,
            borderWidth: 0,
            borderRadius: 6,
            spacing: empty ? 0 : 3,
            hoverOffset: 4,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: this.cutout,
          plugins: { legend: { ...legend, display: this.showLegend && !empty }, tooltip: { ...tooltip, enabled: !empty } },
        },
      } as ChartConfiguration;
    }

    const datasets = this.series.map((s, i) => {
      const color = this.resolve(s.color ?? UI_CHART_PALETTE[i % UI_CHART_PALETTE.length]);
      const kind = s.type ?? (this.type === 'line' ? 'line' : 'bar');
      if (kind === 'line') {
        return {
          type: 'line' as const,
          label: s.label,
          data: s.data,
          borderColor: color,
          backgroundColor: s.fill ? withAlpha(color, 0.16) : color,
          fill: s.fill ? 'origin' : false,
          tension: this.smooth ? 0.4 : 0,
          borderWidth: 2,
          borderDash: s.dashed ? [6, 6] : [],
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: color,
          order: 0,
        };
      }
      return {
        type: 'bar' as const,
        label: s.label,
        data: s.data,
        backgroundColor: color,
        borderRadius: this.stacked ? 2 : 6,
        maxBarThickness: 28,
        stack: this.stacked ? s.stack ?? 'all' : s.stack,
        order: 1,
      };
    });

    const axis = (isValue: boolean) => ({
      stacked: this.stacked,
      beginAtZero: true,
      grid: { display: isValue, color: grid },
      border: { display: false },
      ticks: { color: text, font, ...(isValue && this.yStep ? { stepSize: this.yStep } : {}), precision: isValue ? 0 : undefined },
    });

    return {
      type: this.type === 'line' ? 'line' : 'bar',
      data: { labels: this.labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: this.horizontal ? 'y' : 'x',
        interaction: { mode: 'index', intersect: false },
        plugins: { legend, tooltip },
        scales: { x: axis(this.horizontal), y: axis(!this.horizontal) },
      },
    } as ChartConfiguration;
  }

  /** Turns any CSS colour (var(), color-mix()) into a value the canvas understands. */
  private resolve(css: string): string {
    const el = this.probe?.nativeElement;
    if (!el || typeof getComputedStyle === 'undefined') return css;
    el.style.color = '';
    el.style.color = css;
    return toCanvasColor(getComputedStyle(el).color) || css;
  }
}

function toCanvasColor(value: string): string {
  const v = (value ?? '').trim();
  if (!v || v.startsWith('rgb') || v.startsWith('#')) return v;
  const m = /^color\(srgb\s+([\d.e-]+)\s+([\d.e-]+)\s+([\d.e-]+)(?:\s*\/\s*([\d.e-]+))?\)$/i.exec(v);
  if (!m) return v;
  const c = (n: string) => Math.round(Math.min(Math.max(Number(n), 0), 1) * 255);
  return `rgba(${c(m[1])}, ${c(m[2])}, ${c(m[3])}, ${m[4] ?? 1})`;
}

function withAlpha(color: string, alpha: number): string {
  const m = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(color);
  if (m) return `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${alpha})`;
  const hex = /^#([0-9a-f]{6})$/i.exec(color);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
  }
  return color;
}
