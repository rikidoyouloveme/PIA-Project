import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { CommentService } from '../comment.service';
import { LoanService } from '../loan.service';
import { Book } from '../model/books';
import { Loan } from '../model/loan';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  constructor(private router: Router, private bookService:BookService, private commentService:CommentService, private loanService:LoanService, private userService: UserService) { }

  ngOnInit(): void {
    this.reader=JSON.parse(sessionStorage.getItem("reader"));
    this.notifications=this.reader.obavestenja;
    if (this.notifications==null) {this.notifications=[]}
    let allBooks = [];
    this.bookService.findAll().subscribe((booksFromDB: Book[])=>{
      if(booksFromDB!=null){
        allBooks=booksFromDB;
        
        var d = new Date();
        function random(a) {
          var t = a += 0x6D2B79F5;
          t = Math.imul(t ^ t >>> 15, t | 1);
          t ^= t + Math.imul(t ^ t >>> 7, t | 61);
          return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
        let key = Math.floor(random(d.getDate())*100);
        this.book = allBooks[key%allBooks.length];

        this.loanService.findByUser(this.reader.korisnicko_ime).subscribe((loansFromDB: Loan[])=>{
          if(loansFromDB!=null) {
            let broj = 0;
            for(const l of loansFromDB) {
              if (l.datum_razduzenja==null&&l.datum_zaduzenja!=null) {
                let dana = 0;
                let naziv = '';
                for (const b of allBooks) {
                  if (b.id==l.knjiga_id) {
                    dana = b.dana;
                    naziv = b.naziv;
                    if(b.produzen){dana+=dana}
                  }
                }
                if ((dana*24*60*60*1000-(new Date()).getTime()+(new Date(l.datum_zaduzenja)).getTime())<=3*24*60*60*1000 && (dana*24*60*60*1000-(new Date()).getTime()+(new Date(l.datum_zaduzenja)).getTime())>=0) {
                  this.notifications.push("You have 2 or less days to return "+ naziv +"!")
                } else if (((new Date()).getTime()-(new Date(l.datum_zaduzenja)).getTime())>dana*24*60*60*1000) {
                  this.notifications.push("You are late with returning "+ naziv +"!")
                }
                broj++;
              }
            }
            if (broj>=3) {this.notifications.push("You have loaned the maximum of 3 books")}
            if(this.reader.blokiran) {this.notifications.push("You have been blocked by the administrator!")}
            for (const n of this.reader.obavestenja) {
              if (n.includes('reserved')) {
                this.userService.unnotify(this.reader.korisnicko_ime,'reserved').subscribe(resp=>{
                  this.message = resp['message'];
                  this.userService.login(this.reader.korisnicko_ime,this.reader.lozinka).subscribe((userFromDB: User)=>{
                    if(userFromDB!=null){
                        sessionStorage.setItem("reader", JSON.stringify(userFromDB))
                    }
                    else{
                      this.message="Error"
                    }
                  })
                })
              }
            }
          }
        })

        let comments = [];

        this.commentService.findAll().subscribe((commentsFromDB: Comment[])=>{
          if(commentsFromDB!=null){
            comments=commentsFromDB;

            comments=comments.filter(c=>c.id==this.book.id);

            this.prosecna_ocena=0;
            let brojOcena = 0;

            comments.forEach(c=> { 
              this.prosecna_ocena += c.ocena;
              brojOcena++;
            })
            if(brojOcena!=0) {this.prosecna_ocena=this.prosecna_ocena/brojOcena}

          }
          else{
            this.message="Error";
          }
        })
      
      }
      else{
        this.message="Error";
      }
    })

  
  }

  reader:User;
  book:Book;
  prosecna_ocena:number;
  message:string;
  notifications:string[];

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])
  }

  mash(n) {
    while(n>5) {n=n-5}
    return n*20;
  }
}
