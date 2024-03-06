import { Component } from '@angular/core';
import {UserInformations} from "../../models/UserInformations";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  user : UserInformations = {
    username :'',
    firstName :'',
    middleName :'',
    lastName :'',
    email :'',
    password :'',
    birthDate :''
  };

  constructor(private auth :AuthService , private router :Router) {}

  signup(): void {
    this.auth.register(this.user).subscribe(
      (response) => {
        this.router.navigate(['/userDashboard']);
      }
    );

  }

}
