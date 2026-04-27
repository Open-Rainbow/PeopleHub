import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[directivesTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  @Input('directivesTooltip') tooltipText = '';
  @Input() tooltipPosition: TooltipPosition = 'top';
  @Input() tooltipBgColor = '#03a9f4';
  @Input() tooltipTextColor = '#ffffff';
  @Input() tooltipMaxWidth = 'none';

  private tooltipEl: HTMLElement | null = null;

  constructor(
    private host: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onEnter(): void {
    if (!this.tooltipText?.trim() || this.tooltipEl) return;

    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.appendChild(this.tooltipEl, this.renderer.createText(this.tooltipText));

    this.renderer.setStyle(this.tooltipEl, 'position', 'fixed');
    this.renderer.setStyle(this.tooltipEl, 'z-index', '10000');
    this.renderer.setStyle(this.tooltipEl, 'pointer-events', 'none');
    this.renderer.setStyle(this.tooltipEl, 'padding', '6px 10px');
    this.renderer.setStyle(this.tooltipEl, 'border-radius', '6px');
    this.renderer.setStyle(this.tooltipEl, 'font-size', '14px');
    this.renderer.setStyle(this.tooltipEl, 'line-height', '1.2');
    this.renderer.setStyle(this.tooltipEl, 'max-width', this.tooltipMaxWidth);
    this.renderer.setStyle(this.tooltipEl, 'background', this.tooltipBgColor);
    this.renderer.setStyle(this.tooltipEl, 'color', this.tooltipTextColor);
    this.renderer.setStyle(this.tooltipEl, 'box-shadow', '0 6px 20px rgba(0, 0, 0, 0.18)');

    this.renderer.appendChild(document.body, this.tooltipEl);
    this.reposition();

    window.addEventListener('scroll', this.reposition, true);
    window.addEventListener('resize', this.reposition, true);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.destroyTooltip();
  }

  ngOnDestroy(): void {
    this.destroyTooltip();
  }

  private reposition = (): void => {
    if (!this.tooltipEl) return;

    const hostRect = this.host.nativeElement.getBoundingClientRect();
    const tipRect = this.tooltipEl.getBoundingClientRect();
    const margin = 8;

    let top = 0;
    let left = 0;

    switch (this.tooltipPosition) {
      case 'bottom':
        top = hostRect.bottom + margin;
        left = hostRect.left + (hostRect.width - tipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tipRect.height) / 2;
        left = hostRect.left - tipRect.width - margin;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tipRect.height) / 2;
        left = hostRect.right + margin;
        break;
      case 'top':
      default:
        top = hostRect.top - tipRect.height - margin;
        left = hostRect.left + (hostRect.width - tipRect.width) / 2;
        break;
    }

    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    left = Math.max(6, Math.min(Math.round(left), vw - tipRect.width - 6));
    top = Math.max(6, Math.min(Math.round(top), vh - tipRect.height - 6));

    this.renderer.setStyle(this.tooltipEl, 'left', `${left}px`);
    this.renderer.setStyle(this.tooltipEl, 'top', `${top}px`);
  };

  private destroyTooltip(): void {
    if (this.tooltipEl?.parentNode) {
      this.renderer.removeChild(this.tooltipEl.parentNode, this.tooltipEl);
    }

    this.tooltipEl = null;

    window.removeEventListener('scroll', this.reposition, true);
    window.removeEventListener('resize', this.reposition, true);
  }
}
