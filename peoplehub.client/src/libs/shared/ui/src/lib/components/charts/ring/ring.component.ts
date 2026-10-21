import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Small progress ring (KPI cards, leave balance cards). Colours are CSS strings, so theme tokens
 * such as var(--color-primary) work in light and dark mode.
 */
@Component({
  selector: 'ui-ring',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="ui-ring" [style.width.px]="size" [style.height.px]="size" role="img" [attr.aria-label]="ariaLabel || text">
      <svg viewBox="0 0 36 36" [attr.width]="size" [attr.height]="size" aria-hidden="true">
        <circle cx="18" cy="18" r="15.9155" fill="none" [style.stroke]="trackColor" [attr.stroke-width]="thickness"></circle>
        <circle cx="18" cy="18" r="15.9155" fill="none" [style.stroke]="color" [attr.stroke-width]="thickness"
                stroke-linecap="round" [attr.stroke-dasharray]="dash" transform="rotate(-90 18 18)"></circle>
      </svg>
      <span class="ui-ring__text" [style.font-size.px]="fontSize" [style.color]="textColor">{{ text }}</span>
    </span>
  `,
  styles: [`
    :host { display: inline-flex; }
    .ui-ring { position: relative; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .ui-ring svg { position: absolute; inset: 0; }
    .ui-ring circle { transition: stroke-dasharray 0.4s ease; }
    .ui-ring__text { position: relative; font-weight: 600; line-height: 1; }
  `],
})
export class RingComponent {
  /** 0-100 */
  @Input() value = 0;
  /** Text in the middle. Default: the percentage. */
  @Input() label: string | number | null = null;
  @Input() size = 48;
  @Input() thickness = 3.5;
  @Input() color = 'var(--color-primary)';
  @Input() trackColor = 'var(--color-surface-muted)';
  @Input() textColor = 'var(--color-text-primary)';
  @Input() ariaLabel = '';

  get pct(): number {
    const v = Number(this.value);
    return Number.isFinite(v) ? Math.min(Math.max(Math.round(v), 0), 100) : 0;
  }

  get dash(): string {
    return `${this.pct} ${100 - this.pct}`;
  }

  get text(): string {
    return this.label === null || this.label === undefined ? `${this.pct}%` : String(this.label);
  }

  get fontSize(): number {
    return Math.max(Math.round(this.size / (this.text.length > 3 ? 4.6 : 3.6)), 9);
  }
}
