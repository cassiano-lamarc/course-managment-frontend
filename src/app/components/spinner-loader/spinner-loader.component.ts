import { Component, OnInit } from '@angular/core';
import { LoaderServiceService } from 'src/app/services/loader-service.service';

@Component({
  selector: 'app-spinner-loader',
  templateUrl: './spinner-loader.component.html',
  styleUrls: ['./spinner-loader.component.scss']
})

export class SpinnerLoaderComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private loaderService: LoaderServiceService) { }

  ngOnInit(): void {
    this.loaderService.loaderState$.subscribe((state) => {
      this.isLoading = state;
    });
  }
}
