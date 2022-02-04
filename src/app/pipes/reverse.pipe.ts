import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string) {
    return value.split('').reverse().join(''); //se usan comandos javascript para convertir la acadena string de entrada, en otra cadena string pero alreves.
  }

}
