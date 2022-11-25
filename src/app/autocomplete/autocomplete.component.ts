import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements ControlValueAccessor {
  @Input() options!: string[];
  @Input() placeholder?: string;

  disabled = false;
  value: string = '';
  visible: boolean = false;
  onChange: any = () => { };
  onTouched: any = () => { };
  filteredOptions: string[] = [];

  onShow() {
    this.onTouched();
    this.visible=true
  }

  onHide() {
    setTimeout(() => {
      this.visible=false
    }, 250)
  }

  onModelChange() {
    this.onTouched();
    if (this.value.length == 0) {
      this.filteredOptions = [];
    } else {
      this.filteredOptions = this.options.filter((option) => {
        return option.toLocaleLowerCase().startsWith(this.value.toLowerCase());
      });
    }
  }

  onSelect(option: string) {
    this.value=option;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
