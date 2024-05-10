import { Component } from '@angular/core';
import {NavigationService} from "@app/base/services/navigation.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent extends NavigationService {

  constructor(override router: Router,
              override location: Location ) {
    super(router, location);
  }

  cards = [
    { title: 'Manage Persons',
      description: "Manage the persons that have been participated in transaction",
      imagePath: "assets/persons.png",
      function: () => this.navigateToPersonsList()
    },
    // { title: 'Manage Pieces',
    //   description: "Manage Pieces like vehicle engine , wheels , parts of vehicle ...",
    //   imagePath: "assets/scrap.png",
    //   function: () => this.navigateToPiecesList()
    // },
    // { title: 'Manage Piece Transaction',
    //   description: "Here you can store the transaction and necessary information about it",
    //   imagePath: "assets/transactions.png",
    //   function: () => this.navigateToPieceTransactionsList()
    // },
    { title: 'Manage Vehicle Transaction',
      description: "Here you can store the transaction and necessary information about it",
      imagePath: "assets/transactions.png",
      function: () => this.navigateToVehicleTransactionsList()
    },
    { title: 'Manage vehicles',
      description: "Manage Vehicle and create your own history",
      imagePath: "assets/vehicles.png",
      function: () => this.navigateToVehiclesList()
    },
  ];

}
