import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'ui-toast',
  imports: [IconComponent,CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'], // fixed typo
})
export class ToastComponent implements OnInit {
  @Input() type: 'normal' | 'warning' | 'alert' | 'success' = 'normal';
  @Input() title?: string = 'Hi';
  @Input() subTitle?: string = 'Hello, world! This is a Toast message.';
  @Input() icon: string = 'home';
  @Input() position:
    | 'top-left' 
    | 'top-center' 
    | 'top-right' 
    | 'bottom-left' 
    | 'bottom-center' 
    | 'bottom-right' = 'top-center';
  @Input() duration: number = 5000;
  @Output() closed = new EventEmitter<void>();
  @Input() isStorybook = false;
  progress: number = 100;
  visible: boolean = true;

  private intervalId: any;
  private interval = 10;
  private step!: number;
  private isPaused = false;

ngOnInit(): void {
  if (!this.duration || this.duration <= 0) {
    this.duration = 5000; 
  }

  this.step = (this.interval / this.duration) * 100;
  this.startTimer();
}
  startTimer() {
    this.clearTimer();

    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.progress -= this.step;

        if (this.progress <= 0) {
          this.progress = 0;
          this.visible = false;
          this.clearTimer();
          this.closed.emit();
        }
      }
    }, this.interval);
  }

  clearTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }


 
  closeToast(): void {
    this.visible = false;
    this.clearTimer();
    this.closed.emit();
  }

  pauseTimer() {
    this.isPaused = true;
  }
  resumeTimer() {
    this.isPaused = false;
  }
}
