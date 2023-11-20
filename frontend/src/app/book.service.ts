import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  add(nazivF, godinaF, jezikF, autorF, zanrF, izdavacF, slikaF, userF){
    const data = {
      naziv: nazivF,
      autor: autorF,
      zanr: zanrF,
      izdavac: izdavacF,
      godina: godinaF,
      jezik: jezikF,
      slika: slikaF,
      korisnicko_ime: userF.korisnicko_ime
    }

    if (userF.tip!='citalac') {
      return this.http.post(`${this.uri}/knjige/add`, data)
    } else {
      return this.http.post(`${this.uri}/knjigeZahtevi/request`, data)
    }
  }

  findAll(){
    const data = {
    }

    return this.http.post(`${this.uri}/knjige/findAll`, data)
  }

  findAllRequests(){
    const data = {
    }

    return this.http.post(`${this.uri}/knjige/findAllRequests`, data)
  }

  update(nazivF, godinaF, jezikF, autorF, zanrF, izdavacF, slikaF, idF, danaF, stanjeF) {
    const data = {
      naziv: nazivF,
      autor: autorF,
      zanr: zanrF,
      izdavac: izdavacF,
      godina: godinaF,
      jezik: jezikF,
      slika: slikaF,
      id: idF,
      dana: danaF,
      stanje: stanjeF
    }
    return this.http.post(`${this.uri}/knjige/update`, data)
  }

  delete(idF){
    const data = {
      id: idF
    }

    return this.http.post(`${this.uri}/knjige/delete`, data)
  }

  stock(idF, numberF){
    const data = {
      id: idF,
      number: numberF
    }

    return this.http.post(`${this.uri}/knjige/stock`, data)
  }

  deleteRequest(nazivF, godinaF, jezikF, autorF, zanrF, izdavacF, slikaF, usernameF){
    const data = {
      naziv: nazivF,
      autor: autorF,
      zanr: zanrF,
      izdavac: izdavacF,
      godina: godinaF,
      jezik: jezikF,
      slika: slikaF,
      korisnicko_ime: usernameF
    }

    return this.http.post(`${this.uri}/knjigeZahtevi/deleteRequest`, data)
  }
}
