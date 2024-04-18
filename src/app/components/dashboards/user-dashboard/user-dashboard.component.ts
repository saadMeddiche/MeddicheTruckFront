import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {

  cards = [
    { title: 'Manage Persons', description: "Manage the persons that have been participated in transaction", imagePath: "assets/persons.png" },
    { title: 'Manage Pieces', description: "Manage Pieces like vehicle engine , wheels , parts of vehicle ...", imagePath: "assets/scrap.png" },
    { title: 'Manage Transaction', description: "Here you can store the transaction and necessary information about it", imagePath: "assets/transactions.png" },
    { title: 'Manage vehicles', description: "Manage Vehicle and create your own history", imagePath: "assets/vehicles.png" },
  ];

}
