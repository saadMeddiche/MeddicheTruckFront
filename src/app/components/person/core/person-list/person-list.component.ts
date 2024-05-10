import {Component, ViewChild} from '@angular/core';
import {ValidationService} from "@app/base/services/validation.service";
import {Router} from "@angular/router";
import {PersonService} from "@app/components/person/services/person.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {birthDateValidator, noSpaceValidator} from "@app/base/validation/costum-validators/costum.validators";
import {Person} from "@app/components/person/models/person";
import {Column} from "@app/base/models/Column";
import {ColumnType} from "@app/base/enums/ColumnType";
import {MyInput} from "@app/base/models/MyInput";
import {InputType} from "@app/base/enums/InputType";
import {BaseAddComponent} from "@app/base/core/base-add/base-add.component";
import {BaseUpdateComponent} from "@app/base/core/base-update/base-update.component";
import {BaseDeleteComponent} from "@app/base/core/base-delete/base-delete.component";
import {BaseListComponent} from "@app/base/core/base-list/base-list.component";
import {ID} from "@app/types/GeneralTypes";
import {Location} from "@angular/common";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent extends ValidationService {

  @ViewChild(BaseAddComponent)
  baseAddComponent!: BaseAddComponent<Person, PersonService>;

  @ViewChild(BaseUpdateComponent)
  baseUpdateComponent!: BaseUpdateComponent<Person, PersonService>;

  @ViewChild(BaseDeleteComponent)
  baseDeleteComponent!: BaseDeleteComponent<Person, PersonService>;

  @ViewChild(BaseListComponent)
  baseListComponent!: BaseListComponent<Person, PersonService>;

  constructor(
    protected personService: PersonService,
    override router: Router,
    override location: Location
  ) {
    super(router,location);
  }

  columns : Column<Person>[] = [
    {
      name: 'firstName',
      label: 'First Name' ,
      type: ColumnType.TEXT,
      value: (item: Person) => item.firstName
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: ColumnType.TEXT,
      value: (item: Person) => item.lastName
    },
    {
      name: 'middleName',
      label: 'Middle Name',
      type: ColumnType.TEXT,
      value: (item: Person) => item.middleName != "" ? item.middleName : "-"
    },
    {
      name: 'birthDate',
      label: 'Birth Date',
      type: ColumnType.TEXT,
      value: (item: Person) => item.birthDate
    },
    {
      name: 'mainPhoneNumber',
      label: 'N¤1 Phone',
      type: ColumnType.TEXT,
      value: (item: Person) => item.mainPhoneNumber
    },
    {
      name: 'secondaryPhoneNumber',
      label: 'N¤2 Phone',
      type: ColumnType.TEXT,
      value: (item: Person) => item.secondaryPhoneNumber != "" ? item.secondaryPhoneNumber : "-"
    },
    {
      name: 'description',
      label: 'Description',
      type: ColumnType.TEXTAREA,
      value: (item: Person) => item.description != "" ? item.description : "-"
    }
  ]

  inputs: MyInput<Person>[] = [
    {
      name: 'firstName',
      label: 'First Name',
      type: InputType.TEXT,
      validationMessage: () => this.getErrorName('firstName')
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: InputType.TEXT,
      validationMessage: () => this.getErrorName('lastName')
    },
    {
      name: 'middleName',
      label: 'Middle Name',
      type: InputType.TEXT,
      validationMessage: () => this.getErrorName('middleName')
    },
    {
      name: 'birthDate',
      label: 'Birth Date',
      type: InputType.DATE,
      validationMessage: () => this.getErrorBirthDate('birthDate')
    },
    {
      name: 'mainPhoneNumber',
      label: 'N¤1 Phone',
      type: InputType.TEXT,
      validationMessage: () => this.getErrorName('mainPhoneNumber')
    },
    {
      name: 'secondaryPhoneNumber',
      label: 'N¤2 Phone',
      type: InputType.TEXT,
      validationMessage: () => this.getErrorName('secondaryPhoneNumber')
    },
    {
      name: 'description',
      label: 'Description',
      type: InputType.TEXTAREA,
      validationMessage: () => this.getErrorName('description')
    }
  ]
  override buildForm(): FormGroup {
    return new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        noSpaceValidator()
      ]),
      lastName: new FormControl('', [
        Validators.required,
        noSpaceValidator()
      ]),
      middleName: new FormControl('', [
        noSpaceValidator()
      ]),
      birthDate: new FormControl('', [
        Validators.required,
        birthDateValidator()
      ]),
      description: new FormControl('', []),
      mainPhoneNumber: new FormControl('', [
        Validators.required
      ]),
      secondaryPhoneNumber: new FormControl('', [])
    });
  }

  addPerson(){
    this.baseAddComponent.toggleModal();
  }

  editPerson(vehicleId :ID){
    this.baseUpdateComponent.startUpdateProcess(vehicleId);
  }

  deletePerson(vehicleId :ID){
    this.baseDeleteComponent.startDeleteProcess(vehicleId);
  }

  refreshList(){
    this.baseListComponent.searchItems();
  }

}
