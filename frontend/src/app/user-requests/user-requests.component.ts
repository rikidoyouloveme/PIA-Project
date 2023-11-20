import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if (JSON.parse(sessionStorage.getItem("admin"))==null) {this.router.navigate([''])}
    this.admin=JSON.parse(sessionStorage.getItem("admin"));

    this.userService.findAllRequests().subscribe((userFromDB: User[])=>{
      if(userFromDB!=null){
        this.users=userFromDB;
      }
      else{
        this.message="Error";
      }
    })

  }

  admin:User;

  users:User[];

  message: string;

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])
  }

  delete(username) {
    this.userService.deleteRequest(username).subscribe(resp=>{
      this.message = resp['message']
      window.location.reload();
    })
  }

  add(user: User){
    this.userService.add(user.imePrezime, user.adresa, user.korisnicko_ime, user.lozinka, user.mejl, user.telefon, user.slika, 'citalac').subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.message = 'User added';
        this.delete(user.korisnicko_ime);
      }
      else{
        this.message = 'Error'
      }
    });
  }

}
