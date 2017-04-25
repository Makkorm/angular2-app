import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statePipe'
})
export class StatePipe implements PipeTransform {

  transform(value: any, args?: string): any {
    return value.filter(todo => {
      if (args == 'active') {
        return todo.complete === false
      } else if (args == 'completed') {
        return todo.complete === true
      } else {
        return todo
      }
    });
  }

}
