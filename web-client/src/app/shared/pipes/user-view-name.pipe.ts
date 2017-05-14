import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../models/user.model';

@Pipe({
  name: 'userViewName'
})
export class UserViewNamePipe implements PipeTransform {

  transform(value: User): string {
    if (value == null) {
      return 'Анонимный пользователь';
    }
    if (value.firstName != null && value.firstName.length > 0) {
      return `${value.lastName} ${value.firstName}`;
    }
    return value.username;
  }

}
