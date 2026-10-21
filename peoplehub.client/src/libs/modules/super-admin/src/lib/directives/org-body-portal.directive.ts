import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';

/** Moves the host element to <body> so drawers, dialogs and toasts sit above the app shell. */
@Directive({
  selector: '[orgBodyPortal]',
  standalone: true,
})
export class OrgBodyPortalDirective implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    this.document.body.appendChild(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.host.nativeElement.remove();
  }
}
