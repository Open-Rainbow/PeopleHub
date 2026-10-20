import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';

/** Moves drawers / dialogs to <body> so they sit above the header and sidebar. */
@Directive({
  selector: '[setBodyPortal]',
  standalone: true,
})
export class SetupBodyPortalDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    this.document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.el.nativeElement.remove();
  }
}
