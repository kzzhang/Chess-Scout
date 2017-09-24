import { Component } from '@angular/core';
import {InputTextModule} from 'primeng/primeng';
import { ActivatedRoute, Router} from '@angular/router';;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
       private route: ActivatedRoute,
       private router: Router){
    }
   login() {
       let link = ['homePage'];
    	 this.router.navigate(link);
    }

    register() {
      let link = ['register'];
      this.router.navigate(link);
    }

}
