import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

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
      this.userService.adminLogin(this.username, this.password).subscribe((userFromDB: User)=>{
        if(userFromDB!=null){
          sessionStorage.setItem("admin", JSON.stringify(userFromDB))
          this.router.navigate(['admin']);
        }
        else{
          this.message="Wrong username or password."
        }
      })
    }
  }

}
