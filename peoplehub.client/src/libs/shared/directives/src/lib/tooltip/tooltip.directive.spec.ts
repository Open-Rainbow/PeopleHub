import { ElementRef, Renderer2 } from '@angular/core';

import { TooltipDirective } from './tooltip.directive';

describe('TooltipDirective', () => {
  let elementRefMock: ElementRef;
  let rendererMock: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    elementRefMock = new ElementRef(document.createElement('div'));

    rendererMock = jasmine.createSpyObj('Renderer2', [
      'createElement',
      'createText',
      'appendChild',
      'setStyle',
      'removeChild',
    ]);

    rendererMock.createElement.and.returnValue(document.createElement('div'));
    rendererMock.createText.and.callFake((text: string) => document.createTextNode(text));
  });

  it('should create an instance', () => {
    const directive = new TooltipDirective(elementRefMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
