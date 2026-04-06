import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Injectable({ providedIn: 'root' })
export class WeatherForecastService {
  private readonly http = inject(HttpClient);

  getForecasts(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>('/weatherforecast');
  }
}
