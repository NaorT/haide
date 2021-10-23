import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  options?: FormGroup;

  constructor() {

  }
  ngOnInit(): void {
    this.options = new FormGroup({
      bottom: new FormControl(0),
      fixed: new FormControl(true),
      top: new FormControl(0)
    });
  }

}
