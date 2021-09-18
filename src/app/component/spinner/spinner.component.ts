import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  @Input() login!: boolean;
  constructor() {}

  ngOnInit(): void {}

  backdrop() {
    return {
      position: 'absolute',
      'z-index': 100,
      top: 0,
      'margin-top': '10vh',
      width: '100%',
      height: '90%',
      'background-color': 'rgba(255,255,255,0.8)',
    };
  }
}
