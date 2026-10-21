import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';

/**
 * Moves the host element to <body> so drawers, dialogs and toasts are never clipped or
 * covered by the app shell (the header is z-[2000]).
 */
@Directive({
  selector: '[empBodyPortal]',
  standalone: true,
})
export class EmployeeBodyPortalDirective implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    this.document.body.appendChild(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.host.nativeElement.remove();
  }
}
