import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { BookService } from '../book.service';
import { Book } from '../model/books';
import { User } from '../model/user';
import { mixinColor } from '@angular/material/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router, private bookService: BookService) { }

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
      }
      else{
        this.message="Error";
      }
    })

    this.napredna=false;
    this.genres = [];

  }

  user:User;
  searchAuthor:string;
  searchName:string;
  searchAuthors:string[];
  message:string;
  books:Book[];
  allBooks:Book[];

  genreFormControl = new FormControl('');
  genreList: string[] = ['Crime', 'Comedy', 'Drama', 'Cooking', 'Fiction', 'Art', 'Manga', 'Horror', 'Romantic', 'Feelgood'];
  genres:string[];

  searchLower:number;
  searchUpper:number;
  napredna:boolean;

  search() {

    let i = 0;
    let authorName = '';
    this.searchAuthors = [];
    let potentialBooks = [];
    if (this.searchAuthor==null) {this.searchAuthor=""}
    if (this.searchName==null) {this.searchName=""}
    while(true) {
      if(i==this.searchAuthor.length) {
        this.searchAuthors.push(authorName);
        break;
      }
      if(this.searchAuthor[i]==',') {
        this.searchAuthors.push(authorName);
        authorName='';
      } else if(authorName=='' && this.searchAuthor[i]==' ') {
      } else {
        authorName += this.searchAuthor[i];
      }
      i++;
    }
    let found = this.allBooks;
    found = found.filter(b=>b.naziv.toLowerCase().includes(this.searchName.toLowerCase()));
    this.searchAuthors.forEach(autor => {
      for (const b of found) {
        let x = 0;
        for (const a of b.autor) {
          if (a.toLowerCase().includes(autor.toLowerCase())) {x++}
        }
        if (x != 0) {
          potentialBooks.push(b);
        }
      }
    })
    this.books=[];
    potentialBooks.forEach(e => {
      let i = 0;
      potentialBooks.forEach(e2 => {
        if (e==e2) {i++}
      })
      if (i==this.searchAuthors.length && !this.books.includes(e)) {
        this.books.push(e);
      }
    });
    if (this.searchAuthor=="") {this.books=this.allBooks.filter(b=>b.naziv.toLowerCase().includes(this.searchName.toLowerCase()));}
    if (this.napredna) {
      if (this.genres.length>0) {
        for (const g of this.genres) {
          this.books=this.books.filter(b=>b.zanr.includes(g));
        }
      }
      if (this.searchLower==null) {this.searchLower=0}
      if (this.searchUpper==null) {this.searchUpper=(new Date()).getFullYear()}
      this.books=this.books.filter(b=>b.godina>=this.searchLower&&b.godina<=this.searchUpper)
    }
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])
  }

  clicked(book){
    sessionStorage.setItem("book", JSON.stringify(book))
    this.router.navigate(['/book'])
  }

  mash(n) {
    while(n>5) {n=n-5}
    return n*20;
  }
}
