import { Component } from '@angular/core';
import {InputTextModule} from 'primeng/primeng';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
   constructor(
       private route: ActivatedRoute,
       private router: Router){
    }
   onclick() {
       let link = ['homePage'];
    	 this.router.navigate(link);
    }
}
