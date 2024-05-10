import {MyOption} from "@app/base/models/MyOption";
import {PersonService} from "@app/components/person/services/person.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyInput} from "@app/base/models/MyInput";
import {Piece} from "@app/components/piece/models/piece";
import {InputType} from "@app/base/enums/InputType";
import {getErrorMessageForName} from "@app/base/validation/error-messages/error.messages";
import {PieceTransaction} from "@app/components/piece-transaction/models/PieceTransaction";
import {TransactionType} from "@app/components/piece-transaction/enums/TransactionType";
import {noSpaceValidator} from "@app/base/validation/costum-validators/costum.validators";
import {Person} from "@app/components/person/models/person";
import {Injectable} from "@angular/core";
import {Vehicle} from "@app/components/vehicle/models/vehicle";
import {VehicleType} from "@app/components/vehicle/enums/vehicle.type";
import {EngineType} from "@app/components/vehicle/enums/engine.type";
import {VehicleTransaction} from "@app/components/vehicle-transaction/models/VehicleTransaction";

@Injectable({
  providedIn: 'root'
})
export class VehicleForms {

  private personOptions: MyOption[] = [];

  constructor(private personService : PersonService) {
    this.buildPersonOptions();
  }

  public vehicleForm: FormGroup = this.buildVehicleForm();

  public transactionForm: FormGroup = this.buildTransactionForm();

  public readonly vehicleInputs: MyInput<Vehicle>[] = [
    {
      name: 'plate',
      label: 'Plate',
      type: InputType.TEXT,
      validationMessage: () => getErrorMessageForName('plate', this.vehicleForm)
    },
    {
      name: 'model',
      label: 'Model',
      type: InputType.TEXT,
      validationMessage: () => getErrorMessageForName('model', this.vehicleForm)
    },
    {
      name: 'type',
      label: 'Type',
      type: InputType.SELECT,
      options: () => Object.values(VehicleType).map(value => new MyOption(value, value)),
      validationMessage: () => getErrorMessageForName('type', this.vehicleForm)
    },
    {
      name: 'engineType',
      label: 'Engine Type',
      type: InputType.SELECT,
      options:() => Object.values(EngineType).map(value => new MyOption(value, value)),
      validationMessage: () => getErrorMessageForName('engineType', this.vehicleForm)
    },
    {
      name: 'inStock',
      label: 'In Stock',
      type: InputType.SELECT,
      options: () => [new MyOption('true', 'Yes'), new MyOption('false', 'No')],
      validationMessage: () => getErrorMessageForName('inStock', this.vehicleForm)
    }
  ]

  public readonly transactionInputs: MyInput<VehicleTransaction>[] = [
    {
      idPrefix: 'PT',
      name: 'date',
      label: 'Date',
      type: InputType.DATE,
      validationMessage: () => getErrorMessageForName('date', this.transactionForm)
    },
    {
      idPrefix: 'PT',
      name: 'time',
      label: 'Time',
      type: InputType.TIME,
      validationMessage: () => getErrorMessageForName('time', this.transactionForm)
    },
    {
      idPrefix: 'PT',
      name: 'type',
      label: 'Type',
      type: InputType.SELECT,
      validationMessage: () => getErrorMessageForName('type', this.transactionForm),
      options: () => Object.values(TransactionType).map(value => new MyOption(value, value))
    },
    // {
    //   idPrefix: 'PT',
    //   name: 'vehicleId',
    //   label: 'Vehicle ID',
    //   type: InputType.NUMBER,
    //   validationMessage: () => getErrorMessageForName('vehicleId', this.transactionForm)
    // },
    {
      idPrefix: 'PT',
      name: 'personId',
      label: 'Persons',
      type: InputType.SELECT,
      validationMessage: () => getErrorMessageForName('personId', this.transactionForm),
      options: () =>  this.personOptions
    },
    {
      idPrefix: 'PT',
      name: 'price',
      label: 'Price',
      type: InputType.NUMBER,
      validationMessage: () => getErrorMessageForName('price', this.transactionForm)
    },
    {
      idPrefix: 'PT',
      name: 'description',
      label: 'Description',
      type: InputType.TEXTAREA,
      validationMessage: () => getErrorMessageForName('description', this.transactionForm)
    },
  ]

  private buildVehicleForm(): FormGroup {
    return new FormGroup({
      plate: new FormControl('', [
        Validators.required
      ]),
      model: new FormControl('', [
        Validators.required
      ]),
      type: new FormControl(VehicleType.CAR, [
        Validators.required
      ]),
      engineType: new FormControl(EngineType.FUEL, [
        Validators.required
      ]),
      inStock: new FormControl(true, [
        Validators.required
      ])
    });
  }

  private buildTransactionForm(): FormGroup {
    return new FormGroup({
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      description: new FormControl('Default description', [Validators.required]),
      type: new FormControl(TransactionType.BUY, [Validators.required]),
      vehicleId: new FormControl('', [Validators.required]),
      personId: new FormControl('', [Validators.required]),
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
