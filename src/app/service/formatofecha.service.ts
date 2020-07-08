import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatofechaService {

  constructor() { }

  stringTodate(fecha:string):Date{

    let splitFecha:string[]=fecha.split('-');


    let year:number=parseInt(splitFecha[0]);
    let month:number=parseInt(splitFecha[1])-1;
    let day:number=parseInt(splitFecha[2]);

    
    return new Date(year,month,day);
  }
}
