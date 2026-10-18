import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LucideDynamicIcon, LucideIconInput } from '@lucide/angular';
import { resolveUiIcon } from './icon-registry';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-icon',
  standalone: true,
  imports: [LucideDynamicIcon],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() name: string = '';
  @Input() color: string = 'currentColor';
  @Input() hoverColor: string = '';
  @Input() size: string = '1em';
  @Input() strokeWidth: number = 2;

  get icon(): LucideIconInput {
    return resolveUiIcon(this.name);
  }
}
