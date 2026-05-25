import { Component, Input, ChangeDetectionStrategy, signal, Signal } from '@angular/core';
import { AccordionGroupVariant } from './accordion.types';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'ui-accordion-group',
  templateUrl: './accordion-group.component.html',
})
export class AccordionGroupComponent {
  @Input() variant: AccordionGroupVariant = 'flush';
  @Input() allowMultiple: boolean = false;

  // Signal to track open accordion items
  private openItems = signal<Set<string>>(new Set());

  // Expose signal for children to track reactively
  getOpenItemsSignal(): Signal<Set<string>> {
    return this.openItems;
  }

  // Check if a specific item is open
  isItemOpen(sectionId: string): boolean {
    return this.openItems().has(sectionId);
  }

  // Toggle accordion item - manages exclusive/multiple opening
  toggleAccordion(sectionId: string) {
    const currentOpen = new Set(this.openItems());

    if (currentOpen.has(sectionId)) {
      // Close the accordion
      currentOpen.delete(sectionId);
    } else {
      // For flush variant or default with allowMultiple=false: close all others
      if (!this.allowMultiple) {
        currentOpen.clear();
      }
      // Add the current item
      currentOpen.add(sectionId);
    }

    this.openItems.set(currentOpen);
  }

  // Get the open state for a specific item
  getOpenState(sectionId: string): boolean {
    return this.openItems().has(sectionId);
  }
}
