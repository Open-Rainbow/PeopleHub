import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { IconButtonComponent } from '../../controls/icon-button/icon-button.component';
import type { TabButtonItem } from '../../../models/component-models/tab-button.model';

@Component({
  selector: 'ui-tab-button',
  standalone: true,
  imports: [IconButtonComponent],
  templateUrl: './tab-button.html',
  styleUrl: './tab-button.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabButtonComponent implements AfterViewInit, OnDestroy {
  @Input() tabs: TabButtonItem[] = [];
  @Input() activeTab = '';
  @Output() tabChange = new EventEmitter<string>();

  @ViewChild('tabContainer')
  private tabContainer!: ElementRef<HTMLDivElement>;

  showLeftArrow = false;
  showRightArrow = false;

  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const element = this.tabContainer.nativeElement;
    requestAnimationFrame(() => {
      this.updateArrowVisibility();
      this.changeDetectorRef.markForCheck();
    });

    setTimeout(() => {
      this.updateArrowVisibility();
      this.changeDetectorRef.markForCheck();
    }, 0);

    this.resizeObserver = new ResizeObserver(() => {
      this.updateArrowVisibility();
      this.changeDetectorRef.markForCheck();
    });
    this.resizeObserver.observe(element);

    this.mutationObserver = new MutationObserver(() => {
      this.updateArrowVisibility();
      this.changeDetectorRef.markForCheck();
    });
    this.mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
  }

  selectTab(tabId: string): void {
    this.tabChange.emit(tabId);
  }

  scrollLeft(): void {
    const element = this.tabContainer.nativeElement;
    element.scrollBy({ left: -(element.clientWidth * 0.7), behavior: 'smooth' });
  }

  scrollRight(): void {
    const element = this.tabContainer.nativeElement;
    element.scrollBy({ left: element.clientWidth * 0.7, behavior: 'smooth' });
  }

  onScroll(): void {
    this.updateArrowVisibility();
    this.changeDetectorRef.markForCheck();
  }

  private updateArrowVisibility(): void {
    if (!this.tabContainer) return;
    const element = this.tabContainer.nativeElement;
    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    this.showLeftArrow = element.scrollLeft > 1;
    this.showRightArrow = maxScrollLeft > 1 && element.scrollLeft < maxScrollLeft - 1;
  }
}
