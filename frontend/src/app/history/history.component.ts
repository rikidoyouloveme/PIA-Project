import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { LoanService } from '../loan.service';
import { Book } from '../model/books';
import { Loan } from '../model/loan';
import { User } from '../model/user';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private router: Router, private bookService: BookService, private loanService: LoanService) { }

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
        this.loans=this.loans.filter(l=>l.datum_razduzenja!=null)
      }
      else{
        this.message="Error";
      }
    })

    this.sort='turninDate';
    this.sortLoans();

  }

  user:User;
  message:string;
  books:Book[];
  allBooks:Book[];
  loans:Loan[];
  @ViewChild(MatTable) table: MatTable<any>;

  sort:string;

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

  toDate(date: Date) {
    if(date != null) {
      date = new Date(date);
      let datum = '' + date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()  + ' ' + date.getHours() + ':' + date.getMinutes()
      return datum;
    } else {
      return ''
    }
  }

  sortLoans() {
    switch(this.sort) {
      case 'loanDate': {  
        this.loans.sort((loan1, loan2)=>{
          if(loan1.datum_zaduzenja<loan2.datum_zaduzenja){
            return 1;
          }
          else{
            if(loan1.datum_zaduzenja == loan2.datum_zaduzenja){
              return 0;
            }
            else return -1;
          }
        })
        break;
      }
      case 'turninDate': {  
        this.loans.sort((loan1, loan2)=>{
          if(loan1.datum_razduzenja<loan2.datum_razduzenja){
            return 1;
          }
          else{
            if(loan1.datum_razduzenja == loan2.datum_razduzenja){
              return 0;
            }
            else return -1;
          }
        })
        break;
      }
      case 'name': {
        this.loans.sort((loan1, loan2)=>{
          return this.naziv(loan1).localeCompare(this.naziv(loan2));
        })
        break;
      }
      case 'author': {
        this.loans.sort((loan1, loan2)=>{
          let prvi = this.autor(loan1)[0];
          let drugi = this.autor(loan2)[0];
          let prviObrnut='';
          let drugiObrnut='';
          for (const c of prvi) {
            prviObrnut = c + prviObrnut;
          }
          for (const c of drugi) {
            drugiObrnut = c + drugiObrnut;
          }
          prvi='';
          drugi='';
          for (const c of prviObrnut) {
            if(c==' ') {break;}
            prvi += c;
          }
          for (const c of drugiObrnut) {
            if(c==' ') {break;}
            drugi += c;
          }
          return prvi.localeCompare(drugi);
        })
        break;
      }
    }
    this.table.renderRows();
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

  clickedBook(l: Loan){
    let book = new Book();
    for (const b of this.allBooks) {
      if (b.id==l.knjiga_id) {book=b}
    }
    sessionStorage.setItem("book", JSON.stringify(book))
    this.router.navigate(['/book'])
  }

  displayedColumns: string[] = ['Name:', 'Author:', 'Loan date:', 'Turn-in date:', 'Details'];
  

}
