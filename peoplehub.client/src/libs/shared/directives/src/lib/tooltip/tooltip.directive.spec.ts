import type { MockedObject } from 'vitest';
import { ElementRef, Renderer2 } from '@angular/core';

import { TooltipDirective } from './tooltip.directive';

describe('TooltipDirective', () => {
    let elementRefMock: ElementRef;
    let rendererMock: MockedObject<Renderer2>;

    beforeEach(() => {
        elementRefMock = new ElementRef(document.createElement('div'));

        // Only the Renderer2 methods the directive uses are mocked.
        rendererMock = {
            createElement: vi.fn().mockName('Renderer2.createElement'),
            createText: vi.fn().mockName('Renderer2.createText'),
            appendChild: vi.fn().mockName('Renderer2.appendChild'),
            setStyle: vi.fn().mockName('Renderer2.setStyle'),
            removeChild: vi.fn().mockName('Renderer2.removeChild')
        } as unknown as MockedObject<Renderer2>;

        rendererMock.createElement.mockReturnValue(document.createElement('div'));
        rendererMock.createText.mockImplementation((text: string) => document.createTextNode(text));
    });

    it('should create an instance', () => {
        const directive = new TooltipDirective(elementRefMock, rendererMock);
        expect(directive).toBeTruthy();
    });
});
