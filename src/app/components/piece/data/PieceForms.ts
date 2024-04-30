import {MyInput} from "@app/base/models/MyInput";
import {Piece} from "@app/components/piece/models/piece";
import {InputType} from "@app/base/enums/InputType";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {noSpaceValidator} from "@app/base/validation/costum-validators/costum.validators";
import {TransactionType} from "@app/components/piece-transaction/enums/TransactionType";
import {PieceTransaction} from "@app/components/piece-transaction/models/PieceTransaction";
import {getErrorMessageForName} from "@app/base/validation/error-messages/error.messages";

export class PieceForms {

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
      options: Object.values(TransactionType)
    },
    {
      idPrefix: 'PT',
      name: 'pieceId',
      label: 'Piece ID',
      type: InputType.NUMBER,
      validationMessage: () => getErrorMessageForName('pieceId', this.transactionForm)
    },
    {
      idPrefix: 'PT',
      name: 'personId',
      label: 'Person ID',
      type: InputType.NUMBER,
      validationMessage: () => getErrorMessageForName('personId', this.transactionForm)
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
}
