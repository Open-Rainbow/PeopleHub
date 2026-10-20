import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccessAction } from './access.models';
import { AccessService } from './access.service';

/**
 * Renders the element only when the signed-in role may do the action (configured in Setup).
 *   <ui-text-button *phCan="'policies'; action: 'create'" ...></ui-text-button>
 *   <div *phCan="'leave-approval:approve'">...</div>
 */
@Directive({
  selector: '[phCan]',
  standalone: true,
})
export class CanDirective {
  private readonly access = inject(AccessService);
  private readonly tpl = inject(TemplateRef<unknown>);
  private readonly vcr = inject(ViewContainerRef);

  /** Page key, or "pageKey:action". */
  readonly phCan = input.required<string>();
  readonly phCanAction = input<AccessAction>('view');

  private shown = false;

  constructor() {
    effect(() => {
      this.access.version();
      const [pageKey, inlineAction] = this.phCan().split(':');
      const allowed = this.access.can(pageKey, (inlineAction as AccessAction) || this.phCanAction());
      if (allowed && !this.shown) {
        this.vcr.createEmbeddedView(this.tpl);
        this.shown = true;
      } else if (!allowed && this.shown) {
        this.vcr.clear();
        this.shown = false;
      }
    });
  }
}
