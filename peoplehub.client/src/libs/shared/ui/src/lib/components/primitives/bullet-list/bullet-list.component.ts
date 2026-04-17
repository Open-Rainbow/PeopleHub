import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, Input, ViewContainerRef } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'ui-bullet-list',
  templateUrl: './bullet-list.component.html',
  imports: [CommonModule, IconComponent],
  styleUrls: ['./bullet-list.component.scss']
})
export class BulletListComponent {

  @Input() mode: 'bullet' | 'icon' | 'number' | 'alphabet' = 'bullet'; // Added 'alphabet' type

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) { }
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();

      const activeNode = window.getSelection()?.anchorNode;
      if (!activeNode) return;

      const currentLi = this.findLi(activeNode);
      if (!currentLi) return;

      const newLi = this.createNewLi(currentLi);

      currentLi.after(newLi);
      this.placeCursor(newLi.querySelector('.text'));
    }
  }
  createNewLi(prevLi: HTMLElement): HTMLElement {
    const li = document.createElement('li');
    li.classList.add('line');

    const prefix = document.createElement('span');
    prefix.classList.add('prefix');
    if (this.mode === 'bullet') {
      prefix.innerHTML = '•';
    }

    if (this.mode === 'icon') {
      const prevIcon = prevLi.querySelector('orms-icon');
      const iconName = prevIcon?.getAttribute('name') || 'home';

      const factory = this.resolver.resolveComponentFactory(IconComponent);
      const componentRef = factory.create(this.vcr.injector);

      componentRef.instance.name = iconName;

      this.vcr.insert(componentRef.hostView);

      const nativeIcon = (componentRef.hostView as any).rootNodes[0];

      prefix.appendChild(nativeIcon);
    }

    if (this.mode === 'number') {
      const index = Array.from(prevLi.parentElement!.children).indexOf(prevLi) + 1;
      prefix.innerHTML = `${index + 1}.`;
    }
    if (this.mode === 'alphabet') {
      const index = Array.from(prevLi.parentElement!.children).indexOf(prevLi);
      const alphabet = this.getAlphabetSequence(index + 1); // +1 because we're creating a new item after current
      prefix.innerHTML = `${alphabet}.`;
    }

    const text = document.createElement('span');
    text.classList.add('text');
    text.innerHTML = '&nbsp;';

    li.appendChild(prefix);
    li.appendChild(text);

    return li;
  }
  private getAlphabetSequence(num: number): string {
    let result = '';

    while (num > 0) {
      num--;
      result = String.fromCharCode(97 + (num % 26)) + result;
      num = Math.floor(num / 26);
    }

    return result || 'a';
  }
  findLi(node: any): HTMLElement | null {
    while (node && node.nodeType !== 1) {
      node = node.parentNode;
    }
    return node?.closest('li') || null;
  }
  placeCursor(el: HTMLElement | null) {
    if (!el) return;

    const range = document.createRange();
    const sel = window.getSelection();

    range.setStart(el, el.childNodes.length);
    range.collapse(true);

    sel?.removeAllRanges();
    sel?.addRange(range);
  }
}