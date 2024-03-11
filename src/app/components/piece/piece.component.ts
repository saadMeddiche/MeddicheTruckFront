import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.scss'
})
export class PieceComponent {

  constructor(private router :Router) { }

  goToPieceList(){
    this.router.navigate(['pieces/list']);
  }

}
