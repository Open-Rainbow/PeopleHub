import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconComponent, IconTextButtonComponent, NoticeBannerComponent, PasswordComponent, TextBoxComponent } from 'ui';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper.service';
import { EmployeeDataService } from '../../services/employee-data.service';
import { tempLoginForm } from '../../config/form-configs/temp-login.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-temp-login-credentials',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextBoxComponent, PasswordComponent, IconComponent, NoticeBannerComponent, IconTextButtonComponent],
  templateUrl: './temp-login-credentials.component.html',
  styleUrls: ['./temp-login-credentials.component.scss'],
})
export class TempLoginCredentialsComponent implements OnInit {
  private readonly commonService = inject(CommonService);
  private readonly stepperService = inject(StepperService);
  private readonly dataService = inject(EmployeeDataService);

  readonly formConfig = tempLoginForm;
  tempLoginCredentials!: FormGroup;

  temporaryPassword = signal('');
  temporaryUsername = signal('');

  hasUppercase = signal(false);
  hasLowercase = signal(false);
  hasNumber = signal(false);
  hasSpecialChar = signal(false);
  isLengthValid = signal(false);
  isAllRulesMet = false;

  ngOnInit(): void {
    this.tempLoginCredentials = this.commonService.createForm(this.formConfig);

    const savedData = this.dataService.getDataByRoute('temp-login-credentials');
    if (savedData) {
      this.tempLoginCredentials.patchValue(savedData as Record<string, unknown>);
    }

    this.tempLoginCredentials.statusChanges.subscribe(status => {
      const isValid = status === 'VALID' && this.isAllRulesMet;
      this.stepperService.setStepValidity(isValid);
    });
  }

  onUserNameInput(value: string): void {
    this.temporaryUsername.set(value);
    this.updateFormValues();
  }

  onPasswordInput(value: string): void {
    this.temporaryPassword.set(value);
    this.checkPasswordRules();
    this.updateFormValues();
  }

  preventInvalidKeys(event: KeyboardEvent): void {
    const allowed = /[A-Za-z0-9!@#$%&*]/;
    if (!allowed.test(event.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
      event.preventDefault();
    }
  }

  emailSplitting(email: string): void {
    if (!email) return;
    const username = email.split('@')[0];
    this.temporaryUsername.set(username);
    this.generate();
  }

  generate(): void {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%&*';

    const required =
      upper[Math.floor(Math.random() * upper.length)] +
      lower[Math.floor(Math.random() * lower.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      special[Math.floor(Math.random() * special.length)];

    const allChars = upper + lower + numbers + special;
    let password = required;

    for (let i = required.length; i < 12; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    const shuffled = password.split('').sort(() => Math.random() - 0.5).join('');
    this.temporaryPassword.set(shuffled);
    this.checkPasswordRules();
    this.updateFormValues();
  }

  private checkPasswordRules(): void {
    const pwd = this.temporaryPassword();
    this.isLengthValid.set(pwd.length >= 12);
    this.hasUppercase.set(/[A-Z]/.test(pwd));
    this.hasLowercase.set(/[a-z]/.test(pwd));
    this.hasNumber.set(/\d/.test(pwd));
    this.hasSpecialChar.set(/[!@#$%&*]/.test(pwd));
    this.isAllRulesMet =
      this.isLengthValid() &&
      this.hasUppercase() &&
      this.hasLowercase() &&
      this.hasNumber() &&
      this.hasSpecialChar();
  }

  private updateFormValues(): void {
    this.tempLoginCredentials.patchValue({
      temporaryUsername: this.temporaryUsername(),
      temporaryPassword: this.temporaryPassword(),
    });
  }
}
