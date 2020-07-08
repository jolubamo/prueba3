import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  ocultarInput: boolean = false;
  title: string = '';
  constructor() { }

  onocultarInputClick(): void {
    console.log('funcion de ocultar Input');
    /*if(this.ocultarInput)
      this.ocultarInput=false;
    else
      this.ocultarInput=true;*/
    this.ocultarInput = !this.ocultarInput;

  }
  ngOnInit(): void {
  }
  
}
