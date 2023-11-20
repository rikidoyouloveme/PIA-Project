import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  zaduzi(korisnicko_imeF,knjiga_idF,datum_zaduzenjaF){
    let datum_razduzenjaF=null;
    let produzenF = false;
    let datum_rezervacijeF = null;
    const data = {
      korisnicko_ime:korisnicko_imeF,
      knjiga_id:knjiga_idF,
      datum_zaduzenja:datum_zaduzenjaF,
      datum_razduzenja:datum_razduzenjaF,
      produzen: produzenF,
      datum_rezervacije: datum_rezervacijeF
    }

    return this.http.post(`${this.uri}/zaduzenja/add`, data)
  }

  zaduziRezervaciju(korisnicko_imeF,knjiga_idF,datum_zaduzenjaF, datum_rezervacijeF){
    let datum_razduzenjaF=null;
    let produzenF = false;
    const data = {
      korisnicko_ime:korisnicko_imeF,
      knjiga_id:knjiga_idF,
      datum_zaduzenja:datum_zaduzenjaF,
      datum_razduzenja:datum_razduzenjaF,
      produzen: produzenF,
      datum_rezervacije: datum_rezervacijeF
    }

    return this.http.post(`${this.uri}/zaduzenja/addReserved`, data)
  }

  zaduziRezervacijuMany(korisnicko_imeF,knjiga_idF,datum_zaduzenjaF, datum_rezervacijeF){
    let datum_razduzenjaF=null;
    let produzenF = false;
    const data = {
      korisnicko_ime:korisnicko_imeF,
      knjiga_id:knjiga_idF,
      datum_zaduzenja:datum_zaduzenjaF,
      datum_razduzenja:datum_razduzenjaF,
      produzen: produzenF,
      datum_rezervacije: datum_rezervacijeF
    }

    return this.http.post(`${this.uri}/zaduzenja/addReservedMany`, data)
  }

  rezervisi(korisnicko_imeF,knjiga_idF){
    let datum_zaduzenjaF=null;
    let datum_razduzenjaF=null;
    let produzenF = false;
    let datum_rezervacijeF = new Date();
    const data = {
      korisnicko_ime:korisnicko_imeF,
      knjiga_id:knjiga_idF,
      datum_zaduzenja:datum_zaduzenjaF,
      datum_razduzenja:datum_razduzenjaF,
      produzen: produzenF,
      datum_rezervacije: datum_rezervacijeF
    }

    return this.http.post(`${this.uri}/zaduzenja/add`, data)
  }

  findAll(){
    const data = {
    }

    return this.http.get(`${this.uri}/zaduzenja/findAll`, data)
  }

  find(korisnicko_imeF, idF){
    const data = {
      korisnicko_ime:korisnicko_imeF,
      knjiga_id:idF
    }

    return this.http.post(`${this.uri}/zaduzenja/find`, data)
  }

  findMany(korisnicko_imeF, idF){
    const data = {
      korisnicko_ime:korisnicko_imeF,
      knjiga_id:idF
    }

    return this.http.post(`${this.uri}/zaduzenja/findMany`, data)
  }

  findByBook(idF){
    const data = {
      knjiga_id:idF
    }

    return this.http.post(`${this.uri}/zaduzenja/findByBook`, data)
  }

  findByUser(korisnicko_imeF){
    const data = {
      korisnicko_ime:korisnicko_imeF
    }

    return this.http.post(`${this.uri}/zaduzenja/findByUser`, data)
  }

  update(korisnicko_imeF,knjiga_idF,datum_zaduzenjaF,datum_razduzenjaF,produzenF) {
    const data = {
      korisnicko_ime:korisnicko_imeF,
      knjiga_id:knjiga_idF,
      datum_zaduzenja:datum_zaduzenjaF,
      datum_razduzenja:datum_razduzenjaF,
      produzen: produzenF
    }
    return this.http.post(`${this.uri}/zaduzenja/update`, data)
  }

  updateAll(korisnicko_imeF, newkorisnickoF) {
    const data = {
      korisnicko_ime:korisnicko_imeF,
      newkorisnicko:newkorisnickoF
    }
    return this.http.post(`${this.uri}/zaduzenja/updateAll`, data)
  }


}
