import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Component({
  selector: 'app-spinner-loader',
  templateUrl: './spinner-loader.component.html',
  styleUrls: ['./spinner-loader.component.scss']
})

export class SpinnerLoaderComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.loaderState$.subscribe((state) => {
      this.isLoading = state;
    });
  }
}
