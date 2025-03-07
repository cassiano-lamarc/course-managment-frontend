import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner-loader',
  templateUrl: './spinner-loader.component.html',
  styleUrls: ['./spinner-loader.component.scss']
})

export class SpinnerLoaderComponent {
  @Input() show: boolean;
}
