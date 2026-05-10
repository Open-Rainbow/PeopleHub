import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild, ChangeDetectionStrategy, Optional, SkipSelf, Signal, OnInit, AfterViewInit, signal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { AccordionGroupComponent } from './accordion-group.component';
import { AccordionVariant } from './accordion.types';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'ui-accordion',
  imports: [IconComponent, CommonModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit, AfterViewInit {
  @Input() title = 'Accordion Item';
  @Input() subtitle?: string;
  @Input() modalTemplate?: TemplateRef<any>;
  @Input() sectionId?: string = '';
  @Input() isOpen?: boolean = false;
  @Input() variant: AccordionVariant = 'default';
  @Input() allowMultiple?: boolean = false;
  @Input() icon?: string;
  @Input() showEditButton: boolean = true;
  @Output() toggle = new EventEmitter<string>();
  @Output() edit = new EventEmitter<{ sectionId: string; title: string; template?: TemplateRef<any> }>();

  @ViewChild('content') content!: ElementRef;
  contentHeight = 0;
  parentOpenItemsSignal: Signal<Set<string>> | null = null;

  // Inject parent accordion group if available
  constructor(@Optional() @SkipSelf() private parentGroup?: AccordionGroupComponent) {
    // Capture parent's signal in constructor
    if (this.parentGroup) {
      this.parentOpenItemsSignal = this.parentGroup.getOpenItemsSignal();
    }
  }

  ngOnInit() {
    // Initialize any needed state
  }

  // Check if accordion is open - read from parent's signal directly
  isAccordionOpen(): boolean {
    if (this.parentOpenItemsSignal) {
      return this.parentOpenItemsSignal().has(this.sectionId!);
    }
    return this.isOpen || false;
  }

  toggleSection() {
    if (this.parentGroup) {
      // Use parent group's toggle logic
      this.parentGroup.toggleAccordion(this.sectionId!);
    } else {
      // Standalone: toggle own state
      this.isOpen = !this.isOpen;
    }
    this.toggle.emit(this.sectionId);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleSection();
    }
  }

  onEditClick(event: MouseEvent) {
    event.stopPropagation();
    this.edit.emit({
      sectionId: this.sectionId!,
      title: this.title,
      template: this.modalTemplate,
    });
  }

  ngAfterViewInit() {
    this.contentHeight = this.content.nativeElement.scrollHeight;
  }
}