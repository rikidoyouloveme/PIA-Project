import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { LoanService } from '../loan.service';
import { Book } from '../model/books';
import { Loan } from '../model/loan';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  constructor(private router: Router, private bookService: BookService, private loanService: LoanService, private userService: UserService) { }

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
    
    this.books=[];

    this.bookService.findAll().subscribe((booksFromDB: Book[])=>{
      if(booksFromDB!=null){
        this.allBooks=booksFromDB;
        this.books = this.allBooks;
      }
      else{
        this.message="Error";
      }
    })

    this.loanService.findByUser(this.user.korisnicko_ime).subscribe((loansFromDB: Loan[])=>{
      if(loansFromDB!=null){
        this.loans=loansFromDB;
        this.loans=this.loans.filter(l=>l.datum_razduzenja==null&&l.datum_zaduzenja!=null)
      }
      else{
        this.message="Error";
      }
    })

    this.userNames = [];
    this.isLate = [];
    this.numberOfLoans = [];

    this.loanService.findAll().subscribe((loanFromDB: Loan[])=>{
      if(loanFromDB!=null){
        this.userService.findAll().subscribe((usersFromDB: User[])=>{
          if(usersFromDB!=null){
            for (const u of usersFromDB) {
              this.userNames.push(u.korisnicko_ime);
              this.isLate.push(false);
              this.numberOfLoans.push(0);
            }
            for (const l of loanFromDB) {
              let i = this.userNames.indexOf(l.korisnicko_ime);
              if (l.datum_razduzenja==null&&l.datum_zaduzenja!=null) {
                this.numberOfLoans[i]+=1;
                if (this.late(l)<0) {
                  this.isLate[i]=true;
                }
              }
            }
          }
        })
      }
    })

  }

  user:User;
  message:string;
  books:Book[];
  allBooks:Book[];
  loans:Loan[];
  userNames:string[];
  isLate:boolean[];
  numberOfLoans:number[];

  slika(l: Loan) {
    let id = l.knjiga_id;
    for (const b of this.books) {
      if(b.id==id) return b.slika;
    }
    return '';

  }

  autor(l: Loan) {
    let id = l.knjiga_id;
    let autor = [];
    for (const b of this.books) {
      if(b.id==id) return b.autor;
    }
    return autor;
  }

  naziv(l: Loan) {
    let id = l.knjiga_id;
    for (const b of this.books) {
      if(b.id==id) return b.naziv;
    }
    return '';
  }

  rok(l) {
    let dns = new Date();
    let zad = new Date(l.datum_zaduzenja)
    let dana = 0;
    for (const b of this.books) {
      if(b.id==l.knjiga_id) { 
        dana = b.dana;
        if(l.produzen==true) dana+=b.dana;
      }
    }
    dana = dana - (dns.getTime() - zad.getTime())/1000/60/60/24
    return Math.floor(dana);
  }

  kasni(l: Loan) {
    let dns = new Date();
    let zad = new Date(l.datum_zaduzenja)
    let dana = 0;
    for (const b of this.books) {
      if(b.id==l.knjiga_id) { 
        dana = b.dana;
        if(l.produzen==true) dana+=b.dana;
      }
    }
    dana = dana - (dns.getTime() - zad.getTime())/1000/60/60/24
    if (dana<0) {return true}
    else {return false}
  }

  late(l: Loan) {
    let dns = new Date();
    let zad = new Date(l.datum_zaduzenja)
    let dana = 0;
    for (const b of this.books) {
      if(b.id==l.knjiga_id) { 
        dana = b.dana;
        if(l.produzen==true) dana+=b.dana;
      }
    }
    dana = dana - (dns.getTime() - zad.getTime())/1000/60/60/24
    return dana;
  }

  razduzi(l: Loan) {
    this.loanService.update(l.korisnicko_ime,l.knjiga_id,l.datum_zaduzenja,new Date(),false).subscribe(resp=>{
      this.message = resp['message'];
      this.bookService.stock(l.knjiga_id, 1).subscribe(resp=>{
        this.message = resp['message'];
        this.loanService.findByBook(l.knjiga_id).subscribe((loansFromDB: Loan[])=>{
          if(loansFromDB!=null){
            loansFromDB=loansFromDB.filter(l=>l.datum_rezervacije!=null&&l.datum_zaduzenja==null)
            if (loansFromDB.length>0) {
              loansFromDB.sort((loan1, loan2)=>{
                if(loan1.datum_rezervacije<loan2.datum_rezervacije){
                  return -1;
                }
                else{
                  if(loan1.datum_rezervacije == loan2.datum_rezervacije){
                    return 0;
                  }
                  else return 1;
                }
              })
              let i = 0;
              for (const l of loansFromDB) {
                let x = this.userNames.indexOf(l.korisnicko_ime);
                if (this.isLate[x]!=true && this.numberOfLoans[x]<3) {
                  break;
                } else {
                  i++;
                }
              }
              if (this.isLate[i]==true || this.numberOfLoans[i]>=3) {
                i++;
              } 
              if (i < loansFromDB.length) {
                this.loanService.zaduziRezervaciju(loansFromDB[i].korisnicko_ime, loansFromDB[i].knjiga_id, new Date(), loansFromDB[i].datum_rezervacije).subscribe(resp=>{
                  this.message = resp['message'];
                  let naziv = '';
                  for (const b of this.books) {
                    if (b.id==loansFromDB[i].knjiga_id) {naziv=b.naziv;}
                  }
                  this.userService.notify(loansFromDB[i].korisnicko_ime, "You have loaned your previously reserved book titled "+ naziv +".").subscribe(resp=>{
                    this.message = resp['message'];
                    this.bookService.stock(loansFromDB[i].knjiga_id, -1).subscribe(resp=>{
                      this.message = resp['message'];
                      window.location.reload();
                    })
                  })
                })
              } else {
                window.location.reload();
              }
            } else {
              window.location.reload();
            }
          }
          else{
            this.message="Error";
          }
        })
      })
    })
  }

  produzi(l: Loan) {
    this.loanService.update(l.korisnicko_ime,l.knjiga_id,l.datum_zaduzenja,l.datum_razduzenja,true).subscribe(resp=>{
      this.message = resp['message'];
    })
    window.location.reload();
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])
  }

  clicked(l: Loan){
    let id = l.knjiga_id;
    let book = new Book();
    for (const b of this.books) {
      if(b.id==id) book=b;
    }
    sessionStorage.setItem("book", JSON.stringify(book))
    this.router.navigate(['/book'])
  }

  mash(n) {
    while(n>5) {n=n-5}
    return n*20;
  }

}
