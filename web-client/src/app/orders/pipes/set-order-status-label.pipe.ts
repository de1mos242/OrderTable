import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../../models/order-event.model';

@Pipe({
  name: 'setOrderStatusLabel'
})
export class SetOrderStatusLabelPipe implements PipeTransform {

  transform(value: OrderStatus): string {
    switch (value) {
      case 'PREPARE': return 'Вернуть на подготовку';
      case 'BUILD': return 'Передать в сборку';
      case 'SEND': return 'Оформить заказ';
      case 'PAY': return 'Начать оплаты';
      case 'CLOSE': return 'Закрыть';
      default: return 'Неизвестно';
    }
  }

}
