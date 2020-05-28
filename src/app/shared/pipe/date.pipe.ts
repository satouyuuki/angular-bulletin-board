import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'; // 追加
@Pipe({
  name: 'jpdate'
})
export class DatePipe implements PipeTransform {

  transform(date: number): string {
    moment.locale("ja");
    return moment(date).format('LLL');
  }

}
