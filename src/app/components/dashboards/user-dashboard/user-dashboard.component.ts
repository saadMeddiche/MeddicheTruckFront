import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Card} from "../../models/Card";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})

export class UserDashboardComponent {
  cards : Card[] = [
    {
      title: 'Pieces',
      image: 'assets/scrap.png',
      description: 'Manage your pieces',
      url:'pieces',
      flipped: false
    },
    {
      title: 'Vehicles',
      image: 'assets/vehicles.png',
      description: 'Manage your vehicles',
      url:'?test',
      flipped: false
    },
    {
      title: 'Transactions',
      image: 'assets/transactions.png',
      description: 'Manage your transactions',
      url:'?test',
      flipped: false
    },
    {
      title: 'Persons',
      image: 'assets/persons.png',
      description: 'Manage the persons you work with',
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
