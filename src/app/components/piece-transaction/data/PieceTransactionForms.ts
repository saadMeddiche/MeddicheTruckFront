import {MyInput} from "@app/base/models/MyInput";
import {PieceTransaction} from "@app/components/piece-transaction/models/PieceTransaction";
import {InputType} from "@app/base/enums/InputType";
import {TransactionType} from "@app/components/piece-transaction/enums/TransactionType";
import {getErrorMessageForName} from "@app/base/validation/error-messages/error.messages";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export class PieceTransactionForms {

  public readonly transactionInputs: MyInput<PieceTransaction>[] = [
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
    {
      name: 'description',
      label: 'Description',
      type: InputType.TEXTAREA,
      validationMessage: () => getErrorMessageForName('description' , this.transactionForm)
    },
    {
      name: 'type',
      label: 'Type',
      type: InputType.SELECT,
      validationMessage: () => getErrorMessageForName('type' , this.transactionForm),
      options: Object.values(TransactionType)
    },
    {
      name: 'price',
      label: 'Price',
      type: InputType.NUMBER,
      validationMessage: () => getErrorMessageForName('price' , this.transactionForm)
    }
  ]

  public transactionForm: FormGroup = this.buildTransactionForm();

   private buildTransactionForm(): FormGroup {
      return new FormGroup({
        date: new FormControl('', [Validators.required]),
        time: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required])
      });
   }
}
