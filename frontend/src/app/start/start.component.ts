import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { LoanService } from '../loan.service';
import { Book } from '../model/books';
import { Loan } from '../model/loan';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private router: Router, private bookService: BookService, private loanService: LoanService) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.bookService.findAll().subscribe((booksFromDB: Book[])=>{
      if(booksFromDB!=null){
        this.allBooks=booksFromDB;
        this.books=[];
        let numberList=[];
        for (const b of this.allBooks) {
          numberList.push(0);
        }

        this.loanService.findAll().subscribe((loansFromDB: Loan[])=>{
          if(loansFromDB!=null){
            this.loans=loansFromDB;
            for (const l of this.loans) {
              for (const b of this.allBooks) {
                if (b.id==l.knjiga_id) {
                  numberList[this.allBooks.indexOf(b)]+=1;
                }
              }
            }
            let i = 0;
            while(true) {
              let j = 0;
              while(j<numberList.length) {
                if (numberList[j]==i) {
                  this.books.push(this.allBooks[j]);
                }
                j++;
              }
              i++;
              if(this.books.length==numberList.length) break;
            }

            let top = [];
            i=0;
            while (i<3) {
              top.push(this.books.pop())
              i++;
            }
            this.books=top;
            this.sliderValue=0;
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

  sliderValue:number;
  allBooks:Book[];
  books:Book[];
  message:string;
  loans:Loan[];

}
