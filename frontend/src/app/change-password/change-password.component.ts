import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if (JSON.parse(sessionStorage.getItem("reader"))!=null) {
      this.user=JSON.parse(sessionStorage.getItem("reader"));
    } else if (JSON.parse(sessionStorage.getItem("moderator"))!=null) {
      this.user=JSON.parse(sessionStorage.getItem("moderator"));
    } else if (JSON.parse(sessionStorage.getItem("admin"))!=null) {
      this.user=JSON.parse(sessionStorage.getItem("admin"));
    } else {
      this.user = new User();
      this.user.tip = 'prazan';
    }

  }

  user:User;

  password:string;
  newPassword:string;
  passwordConfirm:string;
  message:string;

  changePassword() {
    if (this.user.lozinka==this.password) {
      let regEx = /(?=.*[A-Z])(?=.*[0-9])(?=.*[ !\"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~])[a-zA-Z].{7,11}$/
      let result = [];
      result = regEx.exec(this.newPassword);
      if (result == null) {result = [];}
      if (result.includes(this.newPassword)){ 
        if (this.newPassword==this.passwordConfirm) {
          this.userService.changePassword(this.user.korisnicko_ime, this.newPassword).subscribe(resp=>{
            this.message = resp['message'];
            sessionStorage.clear()
            this.router.navigate([''])
          })
        } else {this.message="Passwords don't match!"}
      } else {
        this.message="Password has to have at least one capital letter, one special character, one number and between 8 and 12 characters."
      }
    } else {this.message="Wrong password!"}
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])
  }
}
