import { Component } from '@angular/core';
import {IntroTourComponent} from "./components/intro-tour/intro-tour.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  ngOnInit(): void {
    // IntroTourComponent.startTour();
  }
}
