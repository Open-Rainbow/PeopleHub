import { EventEmitter, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ToastType, ToastPosition } from '../../../models/component-models/toast.types';
import * as i0 from "@angular/core";
export declare class ToastComponent implements OnInit, OnDestroy {
    private readonly cdr;
    type: ToastType;
    title?: string;
    subtitle?: string;
    icon: string;
    position: ToastPosition;
    isStacked: boolean;
    duration: number;
    closed: EventEmitter<void>;
    isStorybook: boolean;
    progress: number;
    visible: boolean;
    private frameId;
    private startTime;
    private elapsedBeforePause;
    private readonly defaultDuration;
    private isPaused;
    constructor(cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    startTimer(): void;
    clearTimer(): void;
    closeToast(): void;
    pauseTimer(): void;
    resumeTimer(): void;
    private scheduleNextFrame;
    private updateProgress;
    getPositionClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToastComponent, "ui-toast", never, { "type": { "alias": "type"; "required": false; }; "title": { "alias": "title"; "required": false; }; "subtitle": { "alias": "subtitle"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "position": { "alias": "position"; "required": false; }; "isStacked": { "alias": "isStacked"; "required": false; }; "duration": { "alias": "duration"; "required": false; }; "isStorybook": { "alias": "isStorybook"; "required": false; }; }, { "closed": "closed"; }, never, never, true, never>;
}
//# sourceMappingURL=toast.component.d.ts.map