import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.clear()
  }

  username: string;
  password: string;
  message: string;

  login(){
    if (this.username==null || this.password==null || this.username=="" || this.password=="") {this.message="Must input username and password!"}
    else {
      this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
        if(userFromDB!=null){
          if(userFromDB.tip=='citalac'){
            sessionStorage.setItem("reader", JSON.stringify(userFromDB))
            this.router.navigate(['reader']);
          } else {
            sessionStorage.setItem("moderator", JSON.stringify(userFromDB))
            this.router.navigate(['moderator']);
          }
        }
        else{
          this.message="Wrong username or password."
        }
      })
    }
    
  }

}
