import {MyInput} from "@app/base/models/MyInput";
import {Piece} from "@app/components/piece/models/piece";
import {InputType} from "@app/base/enums/InputType";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {noSpaceValidator} from "@app/base/validation/costum-validators/costum.validators";
import {TransactionType} from "@app/components/piece-transaction/enums/TransactionType";
import {PieceTransaction} from "@app/components/piece-transaction/models/PieceTransaction";
import {getErrorMessageForName} from "@app/base/validation/error-messages/error.messages";
import {MyOption} from "@app/base/models/MyOption";
import {PersonService} from "@app/components/person/services/person.service";
import {Injectable} from "@angular/core";
import {Person} from "@app/components/person/models/person";

@Injectable({
  providedIn: 'root'
})
export class PieceForms {

  private personOptions: MyOption[] = [];

  constructor(private personService : PersonService) {
    this.buildPersonOptions();
  }

  public pieceForm: FormGroup = this.buildPieceForm();

  public transactionForm: FormGroup = this.buildTransactionForm();

  public readonly pieceInputs: MyInput<Piece>[] = [
    {
      name: 'name',
      label: 'Name',
      type: InputType.TEXT,
      validationMessage: () => getErrorMessageForName('name', this.pieceForm)
    },
    {
      name: 'inStock',
      label: 'In Stock',
      type: InputType.CHECKBOX,
      validationMessage: () => getErrorMessageForName('inStock', this.pieceForm)
    }
  ]

  public readonly transactionInputs: MyInput<PieceTransaction>[] = [
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
    //   name: 'pieceId',
    //   label: 'Piece ID',
    //   type: InputType.NUMBER,
    //   validationMessage: () => getErrorMessageForName('pieceId', this.transactionForm)
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

  private buildPieceForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
        noSpaceValidator()
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
      pieceId: new FormControl('', [Validators.required]),
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
