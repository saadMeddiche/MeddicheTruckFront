import { Component } from '@angular/core';
import {UserInformations} from "@app/authentication/models/UserInformations";
import {AuthService} from "@app/authentication/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

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

  register(): void {
    this.auth.register(this.user).subscribe(
      async (response) => {
        await this.navigateTo('/userDashboard')
      }
    );
  }

  async navigateTo(route :string) {
    await this.router.navigate([route]);
  }

}
