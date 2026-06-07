import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'common';

@Component({
  selector: 'login-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly commonService = inject(CommonService);
  private readonly router = inject(Router);

  readonly showError = signal(false);

  readonly form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  login(): void {
    this.showError.set(false);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showError.set(true);
      return;
    }

    const payload = this.form.getRawValue();
    const isKnownCredential =
      (payload.username === 'employee' && payload.password === '123') ||
      (payload.username === 'hr' && payload.password === '123') ||
      (payload.username === 'admin' && payload.password === '123');

    if (!isKnownCredential) {
      this.showError.set(true);
      return;
    }

    this.commonService.getLogin(payload).subscribe(role => {
      localStorage.setItem('userRole', role);
      this.showError.set(false);
      this.router.navigate([`/${role}/dashboard`]);
    });
  }
}

