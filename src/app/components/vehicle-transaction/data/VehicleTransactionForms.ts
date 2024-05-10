import {Injectable} from "@angular/core";
import {MyInput} from "@app/base/models/MyInput";
import {InputType} from "@app/base/enums/InputType";
import {getErrorMessageForName} from "@app/base/validation/error-messages/error.messages";
import {TransactionType} from "@app/components/piece-transaction/enums/TransactionType";
import {MyOption} from "@app/base/models/MyOption";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VehicleTransaction} from "@app/components/vehicle-transaction/models/VehicleTransaction";
import {Person} from "@app/components/person/models/person";
import {PersonService} from "@app/components/person/services/person.service";

@Injectable({
  providedIn: 'root'
})
export class VehicleTransactionForms {

  private personOptions: MyOption[] = [];

  constructor(private personService : PersonService) {
    this.buildPersonOptions();
  }

  public readonly transactionInputs: MyInput<VehicleTransaction>[] = [
    {
      name: 'date',
      label: 'Date',
      type: InputType.DATE,
      validationMessage: () => getErrorMessageForName('date' , this.transactionForm)
    },
    {
      name: 'time',
      label: 'Time',
      type: InputType.TIME,
      validationMessage: () => getErrorMessageForName('time' , this.transactionForm)
    },
    // {
    //   name: 'vehicleId',
    //   label: 'Vehicle ID',
    //   type: InputType.NUMBER,
    //   validationMessage: () => getErrorMessageForName('vehicleId', this.transactionForm)
    // },
    {
      name: 'personId',
      label: 'Persons',
      type: InputType.SELECT,
      validationMessage: () => getErrorMessageForName('personId', this.transactionForm),
      options: () =>  this.personOptions
    },
    {
      name: 'type',
      label: 'Type',
      type: InputType.SELECT,
      validationMessage: () => getErrorMessageForName('type' , this.transactionForm),
      options: () => Object.values(TransactionType).map(value => new MyOption(value, value))
    },
    {
      name: 'price',
      label: 'Price',
      type: InputType.NUMBER,
      validationMessage: () => getErrorMessageForName('price' , this.transactionForm)
    },
    {
      name: 'description',
      label: 'Description',
      type: InputType.TEXTAREA,
      validationMessage: () => getErrorMessageForName('description' , this.transactionForm)
    },
  ]

  public transactionForm: FormGroup = this.buildTransactionForm();

  private buildTransactionForm(): FormGroup {
    return new FormGroup({
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      vehicleId: new FormControl('', [Validators.required]),
      personId: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    });
  }

  private buildPersonOptions() {
    this.personService.getAllItems().subscribe(
      (persons : Person[]) => {
        this.personOptions = persons.map(person => {
          const fullName = `${person.firstName} ${person.middleName} ${person.lastName}`;
          return new MyOption(person.id!.toString(), fullName)
        });
      }
    )
  }
}
