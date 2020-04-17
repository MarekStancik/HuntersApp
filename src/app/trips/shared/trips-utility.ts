import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Time } from '@angular/common';

export class TripsUtility {
    static compare(a: Date,b: Date):number{
        let ac = new Date(a);
        let bc = new Date(b);
        ac.setHours(0,0,0,0);
        bc.setHours(0,0,0,0);
      
        if(ac < bc)
          return -1;
        else if(ac > bc)
          return 1;
        return 0;
      }
      
      static minDateValidator(date: Date): ValidatorFn{
        return (control: AbstractControl): {[key: string]: any} | null => {
          if(this.compare(control.value,date) === -1){
            return {'minDate': {value: control.value}};
          }
          return null;
        };
      }
      
      static timeFromFormControl(val: string): Time{
        if(val){
          return {hours:parseInt(val.substr(0,2)),minutes: parseInt(val.substr(3,2))}; 
        }
        return {hours:0,minutes: 0};
      }

      static dateFromControlValue(val: any,dateName: string,timeName: string): Date{
        const date = new Date(val[dateName]);
        const toTime = TripsUtility.timeFromFormControl(val[timeName]);
        date.setHours(toTime.hours,toTime.minutes,0,0);
        return date;
      }

      static dateToTimeStr(date: Date):string{
        let rval = '';
        if(date.getHours() < 10)
        rval = '0' + date.getHours();
        else
        rval += date.getHours();

        rval += ':';

        if(date.getMinutes() < 10)
        rval += '0' + date.getMinutes();
        else
        rval += date.getMinutes();      
        return rval; 
      }
}
