import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconifyIconComponent } from './iconify-icon.component';
import { WeatherForecast, WeatherForecastService } from './weather-forecast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IconifyIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  readonly forecasts = signal<WeatherForecast[]>([]);
  readonly title = 'peoplehub.client';

  private readonly weatherService = inject(WeatherForecastService);

  ngOnInit() {
    this.weatherService.getForecasts().subscribe(data => {
      this.forecasts.set(data);
    });
  }
}
