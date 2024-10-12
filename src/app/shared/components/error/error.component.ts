import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  providers: [],
})
export class ErrorComponent implements ControlValueAccessor {
  private readonly ERROR_MESSAGES: Record<string, Function> = {
    required: () => `Required`,
    pattern: () => `Only integer values`, // in case of this app, pattern is used for only this, otherwise I would write custom validator
    min: ({ min }: { min: number }) => `Minimum ${min}`,
    max: ({ max }: { max: number }) => `Minimum ${max}`,
    minlength: ({ requiredLength }: { requiredLength: number }) => `Minimum ${requiredLength} characters`,
    maxlength: ({ requiredLength }: { requiredLength: number }) => `Maximum ${requiredLength} characters`,
  };
  private _value: any;

  constructor(@Inject(NgControl) public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  getErrorMessages(): string[] {
    const errors = this.ngControl?.control?.errors;
    const errorMessages: string[] = [];

    if (errors) {
      for (const [errorKey, errorValue] of Object.entries(errors)) {
        if (this.ERROR_MESSAGES[errorKey]) {
          errorMessages.push(this.ERROR_MESSAGES[errorKey](errorValue));
        } else {
          errorMessages.push('Unknown error');
        }
      }
    }

    return errorMessages;
  }

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}
}
