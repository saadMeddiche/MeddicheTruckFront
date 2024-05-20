import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {toastTemplates} from "@app/layouts/toast/data/toastTemplates";

export interface ToastTemplate {
  title: string;
  content: string;
  type: ToastType;
  icon: string;
}

export function getToastTemplateByType(type: ToastType): ToastTemplate | undefined {
  return toastTemplates.find(toast => toast.type === type);
}

export function getIconToastTemplateByType(type: ToastType): string | undefined {
  return getToastTemplateByType(type)?.icon;
}

export function getTitleToastTemplateByType(type: ToastType): string | undefined {
  return getToastTemplateByType(type)?.title;
}

export function getContentToastTemplateByType(type: ToastType): string | undefined {
  return getToastTemplateByType(type)?.content;
}

