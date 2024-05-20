import { Component } from '@angular/core';
import {Logo} from "@app/data/logo";
import {NavigationService} from "@app/base/services/navigation.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {ValidationService} from "@app/base/services/validation.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "@app/components/profile/services/profile.service";
import {Profile} from "@app/components/profile/models/profile";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {ToastType} from "@app/layouts/toast/enums/ToastType";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent extends ValidationService {

  protected readonly Logo = Logo;

  constructor(
    override router :Router,
    override location :Location,
    private profileService :ProfileService,
    private toaster :ToastService
  ) {
    super(router, location);
  }

  ngOnInit(): void {
    this.profileService.getProfileData().subscribe((profile: Profile) => {
      this.form.patchValue({
        firstName: profile.firstName,
        middleName: profile.middleName,
        lastName: profile.lastName,
        email: profile.email,
        birthDate: profile.birthDate
      });
    }
    ,
      (error) => {
        console.error('\n[ProfileComponent](ngOnInit) Error: ', error);
        this.toaster.pushToToaster(error, ToastType.DANGER);
      }
    );
  }

  override buildForm(): FormGroup {
    return new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      birthDate: new FormControl('', [Validators.required])
    });
  }

  updateProfile(){
    this.profileService.updateProfileData(this.form.value).subscribe(() => {
      this.toaster.pushToToaster('Profile updated successfully', ToastType.SUCCESS);
    },
      (error) =>{
        console.error('\n[ProfileComponent](updateProfile) Error: ', error);
        this.toaster.pushToToaster('Error updating profile', ToastType.DANGER);
      }
    )
  }

}
