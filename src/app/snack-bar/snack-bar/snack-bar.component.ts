import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  template: '{{this.displayMsg}}'
})
export class SnackBarComponent implements OnInit {
  displayMsg: string = this.data;

  constructor(@Inject(MAT_SNACK_BAR_DATA) private data: any) { }

  ngOnInit(): void {

  }

}
