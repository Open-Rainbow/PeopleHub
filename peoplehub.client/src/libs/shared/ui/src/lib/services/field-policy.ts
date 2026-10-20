import { ElementRef, inject, InjectionToken } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';

/** How Setup wants a field shown for the signed-in role. */
export interface UiFieldRule {
  hidden: boolean;
  readOnly: boolean;
  requirement: 'Default' | 'Required' | 'Optional';
}

/** Implemented by the app (AccessService in `common`); the ui lib only knows this contract. */
export interface UiFieldPolicy {
  /** Rule for the field on the form being rendered, or null for none. */
  ruleFor(fieldKey: string): UiFieldRule | null;
  /** Lets Setup list the field (label as shown on the form). */
  register?(fieldKey: string, label: string): void;
}

/** Optional: without a provider the controls behave exactly as before. */
export const UI_FIELD_POLICY = new InjectionToken<UiFieldPolicy>('UI_FIELD_POLICY');

/** The bits of a shared control the policy touches. */
export interface FieldPolicyTarget {
  id?: string;
  label?: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  parentFormGroup?: FormGroup;
}

/**
 * Call from a field initializer of a shared control, then run the returned function first thing in ngOnInit:
 *   private readonly fieldPolicy = useFieldPolicy();
 *   ngOnInit() { this.fieldPolicy(this); ... }
 * Hidden: not rendered and not required. Required / Optional: overrides isRequired. Read-only: cannot be changed.
 */
export function useFieldPolicy(): (target: FieldPolicyTarget) => void {
  const policy = inject(UI_FIELD_POLICY, { optional: true });
  const host = inject<ElementRef<HTMLElement>>(ElementRef);
  return (target) => {
    if (!policy || !target.id || !target.parentFormGroup) return;
    try {
      applyFieldPolicy(policy, host.nativeElement, target);
    } catch {
      // A field rule must never break a form.
    }
  };
}

function applyFieldPolicy(policy: UiFieldPolicy, host: HTMLElement, t: FieldPolicyTarget): void {
  const fieldKey = t.id as string;
  const label = typeof t.label === 'string' ? t.label.trim() : '';
  if (label) policy.register?.(fieldKey, label);

  const rule = policy.ruleFor(fieldKey);
  if (!rule) return;
  const control = t.parentFormGroup?.get(fieldKey) ?? null;

  if (rule.hidden) {
    host.style.display = 'none';
    host.setAttribute('data-field-hidden', 'true');
    setRequired(t, control, false);
    return;
  }

  if (rule.requirement === 'Required') setRequired(t, control, true);
  else if (rule.requirement === 'Optional') setRequired(t, control, false);

  if (rule.readOnly) {
    if ('isReadOnly' in t) t.isReadOnly = true;
    host.setAttribute('aria-readonly', 'true');
    host.setAttribute('data-field-readonly', 'true');
    host.style.pointerEvents = 'none';
    host.style.opacity = '0.7';
    host.addEventListener(
      'keydown',
      (e: KeyboardEvent) => {
        if (e.key !== 'Tab') e.preventDefault();
      },
      true,
    );
  }
}

function setRequired(t: FieldPolicyTarget, control: AbstractControl | null, required: boolean): void {
  t.isRequired = required;
  if (!control) return;
  if (required) control.addValidators(Validators.required);
  else control.removeValidators(Validators.required);
  control.updateValueAndValidity({ emitEvent: false });
}
