import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';

/**
 * Moves the host element to <body> so fixed overlays (drawers, modals, toasts)
 * are never clipped or covered by the app shell (header, sidebar, transformed
 * or overflow-hidden containers). Bindings keep working; Angular removes the
 * node normally when the view is destroyed.
 */
@Directive({
  selector: '[annBodyPortal]',
  standalone: true,
})
export class BodyPortalDirective implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    this.document.body.appendChild(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.host.nativeElement.remove();
  }
}
