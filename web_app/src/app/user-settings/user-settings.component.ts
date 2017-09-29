import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  
  //Arrays and variables for the setting dropdowns
  myWRating = '1800+';
  wRatings = [{code: '1800+', name: '1800+'}, {code: '2000+', name: '2000+'}, {code: '2200+', name: '2200+'}, {code: '2400+', name: '2400+'}];

  myBRating = '1800+';
  bRatings = [{code: '1800+', name: '1800+'}, {code: '2000+', name: '2000+'}, {code: '2200+', name: '2200+'}, {code: '2400+', name: '2400+'}];

  myMaxGames = '10';
  maxGames = [{code: '10', name: '10'}, {code: '15', name: '15'}, {code: '20', name: '20'}, {code: '25', name: '25'}];


  //Setup for the autocomplete fields
  texts: string[];
    
  results: string[];
  
  /*search(event) {
      this.mylookupservice.getResults(event.query).then(data => {
          this.results = data;
      });
  }*/


  //Onclick functions for buttons
  ngOnInit() {
  }

  logout() {
  	console.log("this was a test")
  }

  discontinueEmails(){

  }

  changePassword(){

  }
  
  deleteAccount(){

  }
}
