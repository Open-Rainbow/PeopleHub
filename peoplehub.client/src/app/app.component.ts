import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'peoplehub.client';
}
