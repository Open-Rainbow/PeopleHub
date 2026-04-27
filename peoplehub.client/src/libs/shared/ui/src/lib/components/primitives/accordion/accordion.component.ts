import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-accordion',
  imports: [IconComponent, CommonModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() title = 'Basic info';
  @Input() subtitle = 'inner-basic';
  @Input() modalTemplate?: TemplateRef<any>;
  @Input() sectionId?: string = ''; 
  @Input() isOpen?: boolean = false; 
  @Output() toggle = new EventEmitter<string>();
  @Output() edit = new EventEmitter<{ sectionId: string; title: string; template?: TemplateRef<any> }>();
  
  @ViewChild('content') content!: ElementRef;
  contentHeight = 0;

  toggleSection() {
    this.isOpen = !this.isOpen;
    this.toggle.emit(this.sectionId);
  }

  onEditClick(event: MouseEvent) {
    event.stopPropagation();
    this.edit.emit({
    sectionId: this.sectionId!,
    title: this.title,
    template: this.modalTemplate
  });
  }

  ngAfterViewInit() {
    this.contentHeight = this.content.nativeElement.scrollHeight;
  }
}