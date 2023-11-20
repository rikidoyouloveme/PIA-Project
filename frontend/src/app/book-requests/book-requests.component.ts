import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../model/books';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-book-requests',
  templateUrl: './book-requests.component.html',
  styleUrls: ['./book-requests.component.css']
})
export class BookRequestsComponent implements OnInit {

  constructor(private router: Router, private bookService: BookService, private userService: UserService) { }

  ngOnInit(): void {
    this.moderator=JSON.parse(sessionStorage.getItem("moderator"));
    if (this.moderator==null || this.moderator.blokiran) {
      this.router.navigate([''])
    }
    this.bookService.findAllRequests().subscribe((booksFromDB: Book[])=>{
      if(booksFromDB!=null){
        this.books=booksFromDB;
      }
      else{
        this.message="Error";
      }
    })

  }

  moderator:User;
  books:Book[];
  message:string;

  add(book: Book) {
    this.bookService.add(book.naziv,book.godina,book.jezik,book.autor,book.zanr,book.izdavac,book.slika,this.moderator).subscribe(resp=>{
      this.message = resp['message']
      this.bookService.deleteRequest(book.naziv,book.godina,book.jezik,book.autor,book.zanr,book.izdavac,book.slika,book.korisnicko_ime).subscribe(resp=>{
        this.message = resp['message']
        this.userService.notify(book.korisnicko_ime, "Your requested book titled "+book.naziv+" has been added.").subscribe(resp=>{
          this.message = resp['message']
          window.location.reload();
        })
      })
    })
  }

  delete(book: Book) {
    this.bookService.deleteRequest(book.naziv,book.godina,book.jezik,book.autor,book.zanr,book.izdavac,book.slika,book.korisnicko_ime).subscribe(resp=>{
      this.message = resp['message']
      window.location.reload();
    })
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])
  }

}
