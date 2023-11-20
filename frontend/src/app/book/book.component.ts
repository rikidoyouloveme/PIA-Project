import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { CommentService } from '../comment.service';
import { LoanService } from '../loan.service';
import { Book } from '../model/books';
import { Comment } from '../model/comments';
import { Loan } from '../model/loan';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private commentService: CommentService, private bookService: BookService, private loanService: LoanService) { }

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

    this.book = JSON.parse(sessionStorage.getItem("book"));
    this.edit = false;
    this.nemaZaduzeno = true;
    this.loans = []

    this.autori='';
    this.book.autor.forEach(b => {
      this.autori+=b;
      if(this.autori.indexOf(b)!=this.autori.length-1) {
        this.autori+=", ";
      }
    });

    this.hasLoaned=false;

    this.loanService.findMany(this.user.korisnicko_ime,this.book.id).subscribe((loanFromDB: Loan[])=>{
      if(loanFromDB!=null){
        this.nemaZaduzeno=true;

        for (const x of loanFromDB) {
          if (x.datum_zaduzenja!=null) {
            this.hasLoaned=true;
            if (x.datum_razduzenja==null) {
              this.nemaZaduzeno=false;
            }
          }
        }

      }
      else{
        this.nemaZaduzeno=true;
      }
    })

    this.bookService.findAll().subscribe((booksFromDB: Book[])=>{
      if(booksFromDB!=null){
        this.loanService.findByUser(this.user.korisnicko_ime).subscribe((loansFromDB: Loan[])=>{
          if(loansFromDB!=null){

            loansFromDB=loansFromDB.filter(l=>(l.datum_zaduzenja!=null&&l.datum_razduzenja==null))
            this.numberOfLoans=loansFromDB.length;
            let rokovi=[];
            for (const l of loansFromDB) {
                let dns = new Date();
                let zad = new Date(l.datum_zaduzenja)
                let dana = 0;
                for (const b of booksFromDB) {
                  if(b.id==l.knjiga_id) { 
                    dana = b.dana;
                    if(l.produzen==true) dana+=b.dana;
                  }
                }
                dana = dana - (dns.getTime() - zad.getTime())/1000/60/60/24
                if (dana<0) {rokovi.push(true)}
                else {rokovi.push(false)}
            }
            if (rokovi.includes(true)) {this.isLate=true;}
            else {this.isLate=false;}
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

    this.commentService.findAll().subscribe((commentsFromDB: Comment[])=>{
      if(commentsFromDB!=null){
        this.comments=commentsFromDB;

        this.comments=this.comments.filter(c=>c.id==this.book.id);

        this.comments.sort((comment1, comment2)=>{
          if(comment1.datum<comment2.datum){
            return 1;
          }
          else{
            if(comment1.datum == comment2.datum){
              return 0;
            }
            else return -1;
          }
        })

        this.prosecna_ocena=0;
        let brojOcena = 0;
        this.updateComment=false;

        this.comments.forEach(c=> { 
          this.prosecna_ocena += c.ocena;
          brojOcena++;
          if (c.korisnicko_ime==this.user.korisnicko_ime) this.updateComment=true;
        })
        if(brojOcena!=0) {this.prosecna_ocena=this.prosecna_ocena/brojOcena}

      }
      else{
        this.message="Error";
      }
    })

    this.ratings = [0,0,0,0,0,0,0,0,0,0];
    this.showWarning=false;
    this.tooMany=false;


    let userNames = [];
    let isLate = [];
    let numberOfLoans = [];

    this.loanService.findAll().subscribe((loanFromDB: Loan[])=>{
      if(loanFromDB!=null){
        this.userService.findAll().subscribe((usersFromDB: User[])=>{
          if(usersFromDB!=null){
            for (const u of usersFromDB) {
              userNames.push(u.korisnicko_ime);
              isLate.push(false);
              numberOfLoans.push(0);
            }
            for (const l of loanFromDB) {
              let i = userNames.indexOf(l.korisnicko_ime);
              if (l.datum_razduzenja==null&&l.datum_zaduzenja!=null) {
                numberOfLoans[i]+=1;
                if (this.late(l)<0) {
                  isLate[i]=false;
                }
              }
            }

            loanFromDB=loanFromDB.filter(l=>l.datum_rezervacije!=null&&l.datum_zaduzenja==null)
            if (loanFromDB.length>0) {
              loanFromDB.sort((loan1, loan2)=>{
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
            }

            for (const l of loanFromDB) {
              if (l.knjiga_id==this.book.id && l.datum_rezervacije!=null && l.datum_zaduzenja==null) {
                let x = userNames.indexOf(l.korisnicko_ime);
                if (isLate[x]==false && numberOfLoans[x]<3) {
                  this.loans.push(l);
                }
              }

            }

          }
        })
      }
    })

  }

  user:User;
  book:Book;
  comments:Comment[];
  prosecna_ocena:number;
  message:string;
  autori:string;
  edit:boolean;
  nemaZaduzeno:boolean;
  numberOfLoans:number;
  isLate:boolean;

  name: string;
  publisher: string;
  year: number;
  language: string;
  authors: string;
  days: number;
  stock: number;
  tooMany: boolean;

  rating: number;
  ratings: number[];
  newComment: string;
  showWarning:boolean;
  updateComment:boolean;
  hasLoaned:boolean;

  picture: string;
  genreFormControl = new FormControl('');
  genreList: string[] = ['Crime', 'Comedy', 'Drama', 'Cooking', 'Fiction', 'Art', 'Manga', 'Horror', 'Romantic', 'Feelgood'];

  loans: Loan[];

  addComment() {
    if (this.rating != 0) {
      if (this.newComment.length<1000) {
        if (!this.updateComment) {
          this.commentService.add(this.user.korisnicko_ime, this.book.id, this.newComment, this.rating).subscribe(resp=>{
            this.message = resp['message'];
            window.location.reload();
          })
        } else {
          this.commentService.update(this.user.korisnicko_ime, this.book.id, this.newComment, this.rating).subscribe(resp=>{
            this.message = resp['message'];
            window.location.reload();
          })
        }
      }
      else {
        this.tooMany=true;
      }
    } else {
      this.showWarning=true;
    }
  }

  late(l: Loan) {
    let dns = new Date();
    let zad = new Date(l.datum_zaduzenja)
    let dana = 0;
    dana = this.book.dana;
    if(l.produzen==true) dana+=this.book.dana;
    dana = dana - (dns.getTime() - zad.getTime())/1000/60/60/24
    return dana;
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

  rezervisi() {
    this.loanService.rezervisi(this.user.korisnicko_ime, this.book.id).subscribe(resp=>{
      this.message = resp['message'];
    })
  }

  canReserve(b: Book) {
    if (this.book.stanje==0&&this.isLate!=true&&this.numberOfLoans<3) {
      return true
    }
    return false;
  }

  delete(){
    this.loanService.findByBook(this.book.id).subscribe((loansFromDB: Loan[])=>{
      if(loansFromDB!=null){
        let loans=loansFromDB;
        loans=loans.filter(l=>l.datum_razduzenja==null)
        if (loans.length>0) {
          this.message="Can't delete! Book is loaned."
        } else {
          this.bookService.delete(this.book.id).subscribe(resp=>{
            this.message = resp['message']
          })
        }
      }
      else{
        this.message="Error";
      }
    })
  }

  update() {

    if (this.name != null) this.book.naziv=this.name;
    if (this.publisher != null) this.book.izdavac=this.publisher;
    if (this.year != null) this.book.godina=this.year;
    if (this.language != null) this.book.jezik=this.language;
    if (this.days != null) this.book.dana=this.days;
    let oldStanje = this.book.stanje;
    if (this.stock != null) this.book.stanje=this.stock;

    if (this.authors!=null){
      this.autori=this.authors;
      let i = 0;
      let authorName = '';
      this.book.autor = [];
      while(true) {
        if(i==this.autori.length) {
          this.book.autor.push(authorName);
          break;
        }
        if(this.autori[i]==',') {
          this.book.autor.push(authorName);
          authorName='';
        } else if(authorName=='' && this.autori[i]==' ') {
        } else {
          authorName += this.autori[i];
        }
        i++;
      }
    }

    this.bookService.update(this.book.naziv, this.book.godina, this.book.jezik, this.book.autor, this.book.zanr, this.book.izdavac, this.book.slika, this.book.id, this.book.dana, this.book.stanje).subscribe(resp=>{
      this.message = resp['message'];
      
      if (this.stock != null && this.stock != 0) { 
        if (oldStanje == 0) {
          let k_imena = [];
          let ids = [];
          let datumi = [];

          let count = 0;
          for (const x of this.loans) {
            if(count < this.stock) {
              k_imena.push(x.korisnicko_ime);
              ids.push(x.knjiga_id);
              datumi.push(x.datum_rezervacije);
            } count++;
          }
            
          this.loanService.zaduziRezervacijuMany(k_imena, ids, new Date(), datumi).subscribe(resp=>{
            this.message = resp['message'];
          })
          let naziv = this.book.naziv;
          this.userService.notifyMany(k_imena, "You have loaned your previously reserved book titled "+ naziv +".").subscribe(resp=>{
            this.message = resp['message'];
          })
          this.bookService.stock(this.book.id, -1*count).subscribe(resp=>{
            this.message = resp['message'];
            this.book.stanje-=count;
            sessionStorage.setItem("book", JSON.stringify(this.book))
            window.location.reload();
          })
  
        } else {
          window.location.reload();
        }
      }
      else {
        window.location.reload();
      }

    })
    sessionStorage.setItem("book", JSON.stringify(this.book))
  }

  changePicture(img) {
    if(img.target.files && img.target.files[0]) {
      this.book.slika=this.getBase64(img);
    }
  }

  zaduzi() {
    this.loanService.zaduzi(this.user.korisnicko_ime, this.book.id, new Date()).subscribe(resp=>{
      this.message = resp['message'];
    })
    this.bookService.update(this.book.naziv, this.book.godina, this.book.jezik, this.book.autor, this.book.zanr, this.book.izdavac, this.book.slika, this.book.id, this.book.dana, (this.book.stanje-1)).subscribe(resp=>{
      this.message = resp['message'];
    })
    this.book.stanje-=1;
    sessionStorage.setItem("book", JSON.stringify(this.book))
    window.location.reload();
  }

  rate(rating: number) {
    this.rating=rating;
    let i = 0;
    this.ratings=[0,0,0,0,0,0,0,0,0,0];
    while (i<rating) {
      this.ratings[i]=1;
      i++;
    }
    this.showWarning=false;
  }

  logout(){
    sessionStorage.clear()
    this.router.navigate([''])
  }

  getBase64(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      //data:image/jpeg;base64,
      const slika = e.target.result.slice(22);
      this.book.slika = slika.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    return "";
 }

 mash(n) {
  while(n>5) {n=n-5}
  if(n==0){n=-1}
  n++;
  return n*20;
  }

}
