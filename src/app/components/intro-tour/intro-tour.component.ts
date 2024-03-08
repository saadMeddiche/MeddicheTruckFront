import { Component } from '@angular/core';
import introJs from "intro.js";

@Component({
  selector: 'app-intro-tour',
  templateUrl: './intro-tour.component.html',
  styleUrl: './intro-tour.component.scss'
})
export class IntroTourComponent {

  public static startTour(): void {
    // start the tour
    const intro = introJs();

    intro.setOptions({
      steps: [
        {
          intro: "Welcome to the tour! Click next to continue."
        },
        {
          element: '#WebTitle',
          intro: "This is the title of our website.",

        },
        {
          element: '#LoginRoute',
          intro: "Click here to login."
        },
        {
          element: '#RegisterRoute',
          intro: "Click here to register.",
        }
      ],
      showStepNumbers: true,
      showProgress: true
    });

    intro.start();
  }
}
