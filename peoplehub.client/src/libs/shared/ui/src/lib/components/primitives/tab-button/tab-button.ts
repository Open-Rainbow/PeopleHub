import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';

export interface TabButtonItem {
  id: string;
  label: string;
}

@Component({
  selector: 'ui-tab-button',
  standalone: true,
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

  ngAfterViewInit(): void {
    this.updateArrowVisibility();

    this.resizeObserver = new ResizeObserver(() => {
      this.updateArrowVisibility();
    });

    this.resizeObserver.observe(this.tabContainer.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  selectTab(tabId: string): void {
    this.tabChange.emit(tabId);
  }

  scrollLeft(): void {
    this.tabContainer.nativeElement.scrollBy({
      left: -250,
      behavior: 'smooth'
    });
  }

  scrollRight(): void {
    this.tabContainer.nativeElement.scrollBy({
      left: 250,
      behavior: 'smooth'
    });
  }

  onScroll(): void {
    this.updateArrowVisibility();
  }

  private updateArrowVisibility(): void {
    if (!this.tabContainer) {
      return;
    }

    const element = this.tabContainer.nativeElement;

    const maxScrollLeft =
      element.scrollWidth - element.clientWidth;

    this.showLeftArrow = element.scrollLeft > 1;

    this.showRightArrow =
      element.scrollLeft < maxScrollLeft - 1;
  }
}