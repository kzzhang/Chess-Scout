import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  myOpening = '';
  openings = [{code: 'Sicillian', name: 'Sicillian'}, {code: 'Queens Gambit', name: 'Queens Gambit'}, {code: 'Nimzowitz', name: 'Nimzowitz'}];

}
