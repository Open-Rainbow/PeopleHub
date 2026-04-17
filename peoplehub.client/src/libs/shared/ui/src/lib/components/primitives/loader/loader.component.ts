import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-loader',
  templateUrl: './loader.component.html',
  imports: [CommonModule],
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  @Input() type: 'spinner' | 'bar' = 'spinner';
  @Input() color: string = '#1976d2';
  @Input() size: number = 50;
}
