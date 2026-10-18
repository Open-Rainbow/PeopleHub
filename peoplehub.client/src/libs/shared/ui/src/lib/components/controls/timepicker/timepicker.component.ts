import { AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { TimeState } from '../../../models/component-models/time-state.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class TimepickerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() use24HourFormat = false;
  @Input() showSeconds = true;
  @Output() timeChange = new EventEmitter<string>();
  @Output() blurEvent = new EventEmitter<void>();

  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  isPickerOpen = false;
  userInteracted = false;

  hoursList: number[] = [];
  minutesList = Array.from({ length: 60 }, (_, i) => i);
  secondsList = Array.from({ length: 60 }, (_, i) => i);
  ampmList: string[] = ['AM', 'PM'];

  visibleHours: number[] = [];
  visibleMinutes: number[] = [];
  visibleSeconds: number[] = [];
  visibleAmPm: string[] = [];

  private _time: TimeState = { hours: 0, minutes: 0, seconds: 0, ampm: 'PM' };
  readonly itemHeight = 40;
  private readonly repeatCount = 200;
  private scrollTimers = new Map<string, any>();
  private liveClockInterval: any;
  private lastMinute = 0;

  @ViewChild('hoursCol', { static: false }) hoursCol!: ElementRef<HTMLDivElement>;
  @ViewChild('minutesCol', { static: false }) minutesCol!: ElementRef<HTMLDivElement>;
  @ViewChild('secondsCol', { static: false }) secondsCol!: ElementRef<HTMLDivElement>;
  @ViewChild('ampmCol', { static: false }) ampmCol!: ElementRef<HTMLDivElement>;

  constructor(private eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.isPickerOpen && !this.eRef.nativeElement.contains(event.target as Node)) {
      this.closePicker();
    }
  }

  ngOnInit(): void {
    this.initializeLists();
    this.setInitialTime();
    this.startLiveClock();
  }

  ngAfterViewInit(): void {
    this.updateVisibleLists();
  }

  ngOnDestroy(): void {
    this.stopLiveClock();
    this.scrollTimers.forEach((timer) => clearTimeout(timer));
    this.scrollTimers.clear();
  }

  private initializeLists(): void {
    this.hoursList = this.use24HourFormat
      ? Array.from({ length: 24 }, (_, i) => i)
      : Array.from({ length: 12 }, (_, i) => i + 1);
  }

  // 12h mode must show 1..12, not 0..23
  private toDisplayHours(hours24: number): number {
    return this.use24HourFormat ? hours24 : hours24 % 12 || 12;
  }

  private setInitialTime(): void {
    const istTime = this.getIstTime();
    this.setTimeState({
      hours: this.toDisplayHours(istTime.getHours()),
      minutes: istTime.getMinutes(),
      seconds: istTime.getSeconds(),
      ampm: istTime.getHours() >= 12 ? 'PM' : 'AM'
    });
  }

  private getIstTime(): Date {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 5.5 * 60 * 60 * 1000);
  }

  // Keeps the parent form control in sync (previously only emitted timeChange)
  private setTimeState(time: TimeState): void {
    this._time = { ...this._time, ...time };
    const formatted = this.formatDisplayTime();
    if (this.control && this.control.value !== formatted) {
      this.control.setValue(formatted);
    }
    this.timeChange.emit(formatted);
  }

  onBlur() {
    this.control?.markAsTouched();
    this.blurEvent.emit();
  }

  togglePicker(): void {
    if (this.isPickerOpen) {
      this.closePicker();
    } else {
      this.openPicker();
    }
  }

  private openPicker(): void {
    this.isPickerOpen = true;
    this.setInitialTime();

    setTimeout(() => {
      this.setScrollBehavior(false);
      requestAnimationFrame(() => {
        this.centerOnSelected(true);
        this.setScrollBehavior(true);
      });
    });
  }

  private closePicker(): void {
    this.isPickerOpen = false;
    this.stopLiveClock();
    this.userInteracted = false;
  }

  private startLiveClock(): void {
    this.stopLiveClock();
    this.liveClockInterval = setInterval(() => {
      const istTime = this.getIstTime();
      const newTime: TimeState = {
        hours: this.toDisplayHours(istTime.getHours()),
        minutes: istTime.getMinutes(),
        seconds: istTime.getSeconds(),
        ampm: istTime.getHours() >= 12 ? 'PM' : 'AM'
      };

      if (!this.userInteracted) {
        this.setTimeState(newTime);
        this.scrollToCurrentSeconds();

        if (this.minutes !== this.lastMinute) {
          this.lastMinute = this.minutes;
          this.scrollToCurrentMinutes();
        }

        if (this.minutes === 0 && this.seconds === 0) {
          this.scrollToCurrentHours();
        }
      }
    }, 1000);
  }

  private stopLiveClock(): void {
    if (this.liveClockInterval) {
      clearInterval(this.liveClockInterval);
      this.liveClockInterval = null;
    }
  }

  onScroll(type: 'hours' | 'minutes' | 'seconds' | 'ampm'): void {
    const el = this.getCol(type);
    if (!el) return;

    if (!this.userInteracted) {
      this.userInteracted = true;
      this.stopLiveClock();
    }

    if (this.scrollTimers.has(type)) {
      clearTimeout(this.scrollTimers.get(type));
    }

    const scrollTop = el.scrollTop;
    const centerOffset = (el.clientHeight / 2) - (this.itemHeight / 2);
    const position = (scrollTop + centerOffset) / this.itemHeight;
    const list = this.getList(type);
    const index = Math.round(position) % list.length;
    const newValue = list[index];

    this.updateTimeFromScroll(type, newValue);

    const timer = setTimeout(() => {
      const middleIndex = list.length + index;
      el.scrollTo({
        top: (middleIndex * this.itemHeight) - centerOffset,
        behavior: 'smooth'
      });
    }, 200);

    this.scrollTimers.set(type, timer);
  }

  selectValue(type: 'hours' | 'minutes' | 'seconds', value: number): void {
    this.userInteracted = true;
    this.stopLiveClock();
    this.updateTimeFromScroll(type, value);
    this.control?.markAsDirty();
    setTimeout(() => this.centerOnSelected(true), 0);
  }

  setAmPm(value: string): void {
    const normalizedValue: 'AM' | 'PM' = value === 'AM' ? 'AM' : 'PM';
    this.userInteracted = true;
    this.stopLiveClock();
    this.setTimeState({ ...this._time, ampm: normalizedValue });
    this.control?.markAsDirty();

    if (this.ampmCol?.nativeElement) {
      this.ampmCol.nativeElement.scrollTo({
        top: normalizedValue === 'AM' ? 0 : this.itemHeight,
        behavior: 'smooth'
      });
    }
  }

  private getList(type: 'hours' | 'minutes' | 'seconds' | 'ampm'): any[] {
    return type === 'hours' ? this.hoursList :
           type === 'minutes' ? this.minutesList :
           type === 'seconds' ? this.secondsList : this.ampmList;
  }

  private updateTimeFromScroll(type: 'hours' | 'minutes' | 'seconds' | 'ampm', value: any): void {
    const updates: Partial<TimeState> = { [type]: value };
    this.setTimeState({ ...this._time, ...updates });
  }

  private getCol(type: 'hours' | 'minutes' | 'seconds' | 'ampm'): HTMLElement | null {
    const cols: { [key: string]: ElementRef<HTMLDivElement> | undefined } = {
      hours: this.hoursCol,
      minutes: this.minutesCol,
      seconds: this.secondsCol,
      ampm: this.ampmCol
    };
    return (cols[type] as ElementRef)?.nativeElement || null;
  }

  private updateVisibleLists(): void {
    const repeat = <T>(arr: T[]): T[] => Array.from({ length: this.repeatCount }, () => arr).flat();

    this.visibleHours = repeat(this.hoursList);
    this.visibleMinutes = repeat(this.minutesList);
    this.visibleAmPm = repeat(this.ampmList);
    if (this.showSeconds) {
      this.visibleSeconds = repeat(this.secondsList);
    }
  }

  private centerOnSelected(instant = false): void {
    if (!this.hoursCol?.nativeElement || !this.minutesCol?.nativeElement) return;

    const centerOffset = (this.hoursCol!.nativeElement.clientHeight / 2) - (this.itemHeight / 2);
    const behavior = instant ? 'auto' : 'smooth';

    const hoursIndex = this.hoursList.indexOf(this.hours);
    const minutesIndex = this.minutesList.indexOf(this.minutes);

    this.hoursCol.nativeElement.scrollTo({
      top: (this.hoursList.length + hoursIndex) * this.itemHeight - centerOffset,
      behavior
    });

    this.minutesCol.nativeElement.scrollTo({
      top: (this.minutesList.length + minutesIndex) * this.itemHeight - centerOffset,
      behavior
    });

    if (this.showSeconds && this.secondsCol) {
      const secondsIndex = this.secondsList.indexOf(this.seconds);
      this.secondsCol.nativeElement.scrollTo({
        top: (this.secondsList.length + secondsIndex) * this.itemHeight - centerOffset,
        behavior
      });
    }

    if (!this.use24HourFormat && this.ampmCol) {
      const ampmIndex = this.ampmList.indexOf(this.ampm);
      const ampmOffset = (this.ampmCol.nativeElement.clientHeight / 2) - (this.itemHeight / 2);
      this.ampmCol.nativeElement.scrollTo({
        top: (this.ampmList.length + ampmIndex) * this.itemHeight - ampmOffset,
        behavior
      });
    }
  }

  private scrollToCurrentHours(): void {
    if (this.hoursCol) this.centerOnSelected(true);
  }

  private scrollToCurrentMinutes(): void {
    if (this.minutesCol) this.centerOnSelected(true);
  }

  private scrollToCurrentSeconds(): void {
    if (this.secondsCol) this.centerOnSelected(true);
  }

  private setScrollBehavior(enable: boolean): void {
    [this.hoursCol, this.minutesCol, this.secondsCol, this.ampmCol]
      .filter(col => col?.nativeElement)
      .forEach(col => {
        col!.nativeElement.classList.toggle('smooth', enable);
      });
  }
  get hours(): number { return this._time.hours; }
  get minutes(): number { return this._time.minutes; }
  get seconds(): number { return this._time.seconds; }
  get ampm(): 'AM' | 'PM' { return this._time.ampm; }

  formatDisplayTime(): string {
    const hh = this.hours.toString().padStart(2, '0');
    const mm = this.minutes.toString().padStart(2, '0');
    const ss = this.seconds.toString().padStart(2, '0');
    const baseTime = this.showSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
    return this.use24HourFormat ? baseTime : `${baseTime} ${this.ampm}`;
  }

  isActive(type: 'hours' | 'minutes' | 'seconds', value: number): boolean {
    return (type === 'hours' && value === this.hours) ||
           (type === 'minutes' && value === this.minutes) ||
           (type === 'seconds' && value === this.seconds);
  }
}
