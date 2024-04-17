import { Component } from '@angular/core';
import {UserInformations} from "@app/authentication/models/UserInformations";
import {AuthService} from "@app/authentication/services/authentication/auth.service";
import {Router} from "@angular/router";
import {Logo} from "@app/configurations/globalData";
import {NavigationService} from "@app/services/navigation.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends NavigationService {

  user : UserInformations = {
    username :'',
    firstName :'',
    middleName :'',
    lastName :'',
    email :'',
    password :'',
    birthDate :''
  };

  constructor(private auth :AuthService , override router :Router) {
    super(router);
  }

  register(): void {
    this.auth.register(this.user).subscribe();
  }

  protected readonly Logo  = Logo;
}
