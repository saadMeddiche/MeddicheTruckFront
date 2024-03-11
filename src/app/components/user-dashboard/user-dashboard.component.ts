import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Card} from "../models/Card";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})

export class UserDashboardComponent {
  cards : Card[] = [
    {
      title: 'Card 1',
      image: 'assets/questionmark.png',
      description: 'Description for Card 1',
      url:'?test',
      flipped: false
    },
    {
      title: 'Card 2',
      image: 'assets/questionmark.png',
      description: 'Description for Card 2',
      url:'?test',
      flipped: false
    },
    {
      title: 'Card 3',
      image: 'assets/questionmark.png',
      description: 'Description for Card 3',
      url:'?test',
      flipped: false
    },
    {
      title: 'Card 4',
      image: 'assets/questionmark.png',
      description: 'Description for Card 4',
      url:'?test',
      flipped: false
    },
    {
      title: 'Card 5',
      image: 'assets/questionmark.png',
      description: 'Description for Card 5',
      url:'?test',
      flipped: false
    },
    {
      title: 'Card 6',
      image: 'assets/questionmark.png',
      description: 'Description for Card 6',
      url:'?test',
      flipped: false
    },
    {
      title: 'Card 7',
      image: 'assets/questionmark.png',
      description: 'Description for Card 7',
      url:'?test',
      flipped: false
    },
    {
      title: 'Card 8',
      image: 'assets/questionmark.png',
      description: 'Description for Card 8',
      url:'?test',
      flipped: false
    }
  ];

  constructor(private router: Router) {}

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

}
