import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import {
  ToastType,
  ToastPosition,
} from '../../../models/component-models/toast.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-toast',
  standalone: true,
  imports: [IconComponent, CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() type: ToastType = 'normal';
  @Input() title?: string = 'Hi';
  @Input() subtitle?: string = 'Hello, world! This is a Toast message.';
  @Input() icon: string = 'home';
  @Input() position: ToastPosition = 'top-center';
  @Input() isStacked = false;
  @Input() duration: number = 5000;
  @Output() closed = new EventEmitter<void>();
  @Input() isStorybook = false;

  progress: number = 100;
  visible: boolean = true;

  private frameId: number | null = null;
  private startTime = 0;
  private elapsedBeforePause = 0;
  private readonly defaultDuration = 5000;
  private isPaused = false;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.duration || this.duration <= 0) {
      this.duration = this.defaultDuration;
    }

    this.startTimer();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  startTimer(): void {
    this.clearTimer();

    this.isPaused = false;
    this.elapsedBeforePause = 0;
    this.progress = 100;
    this.startTime = performance.now();
    this.scheduleNextFrame();
  }

  clearTimer(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  closeToast(): void {
    this.visible = false;
    this.clearTimer();
    this.cdr.markForCheck();
    this.closed.emit();
  }

  pauseTimer(): void {
    if (this.isPaused) {
      return;
    }

    this.isPaused = true;
    this.elapsedBeforePause += performance.now() - this.startTime;
    this.clearTimer();
  }

  resumeTimer(): void {
    if (!this.isPaused || !this.visible) {
      return;
    }

    this.isPaused = false;
    this.startTime = performance.now();
    this.scheduleNextFrame();
  }

  private scheduleNextFrame(): void {
    this.frameId = requestAnimationFrame((timestamp: number) => {
      this.updateProgress(timestamp);
    });
  }

  private updateProgress(timestamp: number): void {
    if (this.isPaused || !this.visible) {
      return;
    }

    const elapsed = this.elapsedBeforePause + (timestamp - this.startTime);
    const normalizedElapsed = Math.min(elapsed / this.duration, 1);
    this.progress = Math.max(0, 100 - normalizedElapsed * 100);
    this.cdr.markForCheck();

    if (normalizedElapsed >= 1) {
      this.visible = false;
      this.clearTimer();
      this.closed.emit();
      return;
    }

    this.scheduleNextFrame();
  }

  getPositionClasses(): string {
    if (this.isStacked) {
      return '';
    }

    const baseClasses = 'fixed z-[9999]';
    const positionClasses: Record<ToastPosition, string> = {
      'top-left': 'top-4 left-4',
      'top-center': 'top-4 left-1/2 -translate-x-1/2',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
      'bottom-right': 'bottom-4 right-4',
    };

    return `${baseClasses} ${positionClasses[this.position]}`;
  }
}
