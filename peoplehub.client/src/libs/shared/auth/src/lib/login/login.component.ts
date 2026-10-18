import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'common';
import { IconComponent } from 'ui';

const REMEMBERED_USER_KEY = 'rememberedUsername';

@Component({
  selector: 'login-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly commonService = inject(CommonService);
  private readonly router = inject(Router);

  readonly year = new Date().getFullYear();
  readonly errorMessage = signal('');
  readonly showPassword = signal(false);
  readonly loading = signal(false);

  private readonly rememberedUsername = localStorage.getItem(REMEMBERED_USER_KEY) ?? '';

  readonly form: FormGroup = this.fb.group({
    username: [this.rememberedUsername, Validators.required],
    password: ['', Validators.required],
    rememberMe: [!!this.rememberedUsername],
  });

  isInvalid(control: 'username' | 'password'): boolean {
    const c = this.form.get(control);
    return !!c && c.invalid && c.touched;
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  forgotPassword(): void {
    this.errorMessage.set('Please contact your HR administrator to reset your password.');
  }

  login(): void {
    this.errorMessage.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage.set('Please enter your username and password.');
      return;
    }

    const payload = this.form.getRawValue();
    const username = String(payload.username).trim();
    const isKnownCredential =
      ['employee', 'hr', 'admin'].includes(username) && payload.password === '123';

    if (!isKnownCredential) {
      this.errorMessage.set('Invalid username or password.');
      return;
    }

    this.loading.set(true);
    this.commonService.getLogin({ ...payload, username }).subscribe({
      next: role => {
        if (payload.rememberMe) {
          localStorage.setItem(REMEMBERED_USER_KEY, username);
        } else {
          localStorage.removeItem(REMEMBERED_USER_KEY);
        }
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', username);
        this.loading.set(false);
        this.router.navigate([`/${role}/dashboard`]);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Something went wrong. Please try again.');
      },
    });
  }
}
