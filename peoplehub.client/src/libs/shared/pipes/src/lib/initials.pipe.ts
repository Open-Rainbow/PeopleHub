import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

transform(fullName: string | null | undefined): string {
    if (!fullName) return '';
    const words = fullName.trim().split(/\s+/);

    if (words.length === 0) return '';

    const firstInitial = words[0].charAt(0).toUpperCase();
    const lastInitial =
      words.length > 1
        ? words[words.length - 1].charAt(0).toUpperCase()
        : '';

    return firstInitial + lastInitial;
}
}
