import { Component } from '@angular/core';
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {Toast} from "@app/layouts/toast/models/Toast";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {getIconToastTemplateByType} from "@app/layouts/toast/models/ToastTemplate";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {SemiString} from "@app/types/GeneralTypes";
import {sleep} from "@app/utils/sleep";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

  protected toasts :Toast[] = [];

  constructor(private toastService :ToastService , private sanitizer : DomSanitizer){}

  ngOnInit() {
    this.toastService.toaster$.subscribe((toasts :Toast[]) => {
      this.toasts = toasts;
    });
  }

  sanitizeIcon(toastType :ToastType): SafeHtml {
    const icon =  getIconToastTemplateByType(toastType);
    return this.sanitizer.bypassSecurityTrustHtml(icon as string);
  }

  async removeToast(uuid :SemiString): Promise<void> {
    await this.removeToastAnimation(uuid);
    this.toastService.removeToast(uuid!);
  }

  async removeToastAnimation(uuid :SemiString): Promise<void> {
    const element = document.getElementById(uuid!);

    for(let i = 0; i < 11; i++) {
      element!.style.opacity = `${1 - i * 0.1}`;
      await sleep(30);
    }

    element!.style.display = 'none';

  }

}
