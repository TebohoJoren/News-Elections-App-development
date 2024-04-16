import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'privacyPolicie'
})
export class PrivacyPoliciePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
