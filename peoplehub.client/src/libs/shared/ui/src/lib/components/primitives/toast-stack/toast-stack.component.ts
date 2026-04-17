import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastMessage } from '../../../models/common.model';
import { ToastComponent } from '../toast/toast.component';


@Component({
  selector: 'ui-toast-stack',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './toast-stack.component.html',
  styleUrls: ['./toast-stack.component.scss'],

})
export class ToastStackComponent {

  @Input() position:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right' = 'top-right';
  // @Input() type: 'normal' | 'warning' | 'alert' | 'success' = 'normal';
  //   @Input() duration = 3000;

  @Input() toasts: ToastMessage[] = [];
  @Output() toastClosed = new EventEmitter<number>();
  removeToast(id: number) {
    // this.toasts = this.toasts.filter(t => t.id !== id);
    this.toastClosed.emit(id);
  }

  trackById(_index: number, toast: ToastMessage) {
    return toast.id;
  }
}
