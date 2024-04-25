import {Component, Input} from '@angular/core';
import {InputType} from "@app/base/enums/InputType";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {Router} from "@angular/router";
import {BaseModel} from "@app/base/models/BaseModel";
import {BaseService} from "@app/base/services/base.service";
import {MyInput} from "@app/base/models/MyInput";
import {FormGroup} from "@angular/forms";
import {NavigationService} from "@app/base/services/navigation.service";

@Component({
  selector: 'app-base-add',
  templateUrl: './base-add.component.html',
  styleUrl: './base-add.component.scss'
})
export class BaseAddComponent<I extends BaseModel, S extends BaseService<I>> extends NavigationService {

  @Input() inputs!: MyInput<I>[];

  @Input() form!: FormGroup;

  @Input() service!: S;

  isModalVisible: boolean = false;

  public constructor(
    protected toastService: ToastService,
    override router: Router
  ) {
    super(router);
  }

  addItem(){
    this.service.addItem(this.form.value).subscribe(
      () => {
        this.toastService.pushToToaster(`${this.service.getItemName()} added successfully`, ToastType.SUCCESS);
        this.toggleModal();
      },
      (httpErrorResponse) => {
        console.error(httpErrorResponse);

        if(httpErrorResponse.status === 401 ){
          this.toastService.pushToToaster("Error: Please reload page or re-login", ToastType.DANGER);
        }

        this.toastService.pushToToaster(`${this.service.getItemName()} didn't added as expected`, ToastType.DANGER);
      }
    );
  }

  toggleModal(){
    this.isModalVisible = !this.isModalVisible;
  }

  protected readonly InputType = InputType;
}
