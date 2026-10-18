import { Pipe, PipeTransform } from '@angular/core';

/**
 * Relative time ("5 mins ago" / "in 2 days").
 * Pure pipe: only recalculates when the input changes. For a live-ticking UI,
 * re-emit the value from the component on a timer.
 */
@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined): string {
    if (value === null || value === undefined || value === '') return '';

    const inputDate = new Date(value).getTime();
    if (Number.isNaN(inputDate)) return '';

    const now = Date.now();

    const diffInSeconds = Math.floor((now - inputDate) / 1000);
    const absDiff = Math.abs(diffInSeconds);
    const isPast = diffInSeconds >= 0;

    let result = '';

    if (absDiff < 60) {
      result = `${absDiff} sec${absDiff === 1 ? '' : 's'}`;
    } else if (absDiff < 3600) {
      const mins = Math.floor(absDiff / 60);
      result = `${mins} min${mins === 1 ? '' : 's'}`;
    } else if (absDiff < 86400) {
      const hours = Math.floor(absDiff / 3600);
      result = `${hours} hour${hours === 1 ? '' : 's'}`;
    } else {
      const days = Math.floor(absDiff / 86400);
      result = `${days} day${days === 1 ? '' : 's'}`;
    }

    return isPast ? `${result} ago` : `in ${result}`;
  }
}
