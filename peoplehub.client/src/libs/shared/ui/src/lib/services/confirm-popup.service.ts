import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ConfirmPopup, PopupOptions } from '../models/confirm-popup.model';

export type { ConfirmPopup, PopupOptions };

@Injectable({
  providedIn: 'root',
})
export class ConfirmPopupService {
  public showPopup$ = new Subject<PopupOptions | null>();
  private resultEmitter!: EventEmitter<string>;

  public showOk(title: string, message: string, icon?: string, color = 'blue'): EventEmitter<string> {
    const okButton: ConfirmPopup = {
      text: 'OK',
      value: 'OK',
      bgColor: color,
      color: 'white',
      hoverBgColor: '#337ab7',
      hoverColor: 'white',
      borderColor: color,
      showBorder: true,
    };
    return this.show(title, message, [okButton], icon, color);
  }

  public showValidation(formGroup: FormGroup, formConfig: Record<string, any>): EventEmitter<string> {
    const invalidRequiredFields = Object.keys(formGroup.controls)
      .filter((key) => {
        const control = formGroup.get(key);
        const config = formConfig[key];
        return config?.isRequired && !config?.isHide && control?.invalid;
      })
      .map((key) => formConfig[key]?.label || key);

    if (invalidRequiredFields.length === 0) {
      return new EventEmitter<string>();
    }

    const message = '<b>' + invalidRequiredFields.join(', ') + '</b>';
    const okButton: ConfirmPopup = {
      text: 'OK',
      value: 'OK',
      bgColor: 'red',
      color: 'white',
      hoverBgColor: '#337ab7',
      hoverColor: 'white',
      borderColor: 'red',
      showBorder: true,
    };

    return this.show('Missing Required fields', 'Please fill in the required fields: ' + message, [okButton], 'warning', 'red');
  }

  public showConfirm(title: string, message: string, icon?: string, color = 'red'): EventEmitter<string> {
    const buttons: ConfirmPopup[] = [
      { text: 'Yes', value: 'Yes', bgColor: 'green', color: 'white', hoverBgColor: 'darkgreen', hoverColor: 'white', borderColor: 'green', showBorder: true },
      { text: 'No', value: 'No', bgColor: color, color: 'white', hoverBgColor: 'darkred', hoverColor: 'white', borderColor: color, showBorder: true },
    ];
    return this.show(title, message, buttons, icon, color);
  }

  public showMaybe(title: string, message: string, icon?: string, color = 'orange'): EventEmitter<string> {
    const buttons: ConfirmPopup[] = [
      { text: 'Yes', value: 'Yes', bgColor: 'green', color: 'white', hoverBgColor: 'darkgreen', hoverColor: 'white', borderColor: 'green', showBorder: true },
      { text: 'No', value: 'No', bgColor: 'red', color: 'white', hoverBgColor: 'darkred', hoverColor: 'white', borderColor: 'red', showBorder: true },
      { text: 'Maybe', value: 'Maybe', bgColor: color, color: 'white', hoverBgColor: 'darkorange', hoverColor: 'white', borderColor: color, showBorder: true },
    ];
    return this.show(title, message, buttons, icon, color);
  }

  public showCustomButtons(title: string, message: string, buttons: ConfirmPopup[], icon?: string, color = 'gray'): EventEmitter<string> {
    return this.show(title, message, buttons, icon, color);
  }

  private show(title: string, label: string, buttons: ConfirmPopup[], changeIcon?: string, borderColor?: string): EventEmitter<string> {
    this.resultEmitter = new EventEmitter<string>();
    this.showPopup$.next({ title, label, changeIcon, borderColor, buttons });
    return this.resultEmitter;
  }

  public buttonClicked(value: string): void {
    if (this.resultEmitter) {
      this.resultEmitter.emit(value);
    }
  }

  public hide(): void {
    this.showPopup$.next(null);
  }
}
