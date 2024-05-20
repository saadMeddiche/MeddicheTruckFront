export class MyOption {
  private _value: string;
  private _label: string;
  private _selected: boolean;

  constructor(value: string, label: string, selected: boolean = false) {
    this._value = value;
    this._label = label;
    this._selected = selected;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get label(): string {
    return this._label;
  }

  set label(label: string) {
    this._label = label;
  }

  get selected(): boolean {
    return this._selected;
  }

  set selected(selected: boolean) {
    this._selected = selected;
  }

}
