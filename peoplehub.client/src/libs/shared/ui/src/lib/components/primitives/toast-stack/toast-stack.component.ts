import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ToastMessage } from '../../../models/common.model';
import { ToastComponent } from '../toast/toast.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-toast-stack',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './toast-stack.component.html',
  styleUrls: ['./toast-stack.component.scss'],

})
export class ToastStackComponent {
  private readonly toastInstanceKeys = new WeakMap<ToastMessage, number>();
  private nextToastInstanceKey = 1;

  @Input() position:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right' = 'top-right';

  @Input() toasts: ToastMessage[] = [];
  @Output() toastClosed = new EventEmitter<number>();
  removeToast(id: number) {
    this.toastClosed.emit(id);
  }

  trackByToastInstance(_index: number, toast: ToastMessage) {
    const existingKey = this.toastInstanceKeys.get(toast);
    if (existingKey !== undefined) {
      return existingKey;
    }

    const newKey = this.nextToastInstanceKey++;
    this.toastInstanceKeys.set(toast, newKey);
    return newKey;
  }
}
