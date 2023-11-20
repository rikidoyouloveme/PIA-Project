import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  add(korisnicko_imeF, idF, komentarF, ocenaF){
    const data = {
      korisnicko_ime: korisnicko_imeF,
      komentar: komentarF,
      id: idF,
      ocena: ocenaF
    }

    return this.http.post(`${this.uri}/komentari/add`, data)
  }

  update(korisnicko_imeF, idF, komentarF, ocenaF){
    const data = {
      korisnicko_ime: korisnicko_imeF,
      komentar: komentarF,
      id: idF,
      ocena: ocenaF
    }

    return this.http.post(`${this.uri}/komentari/update`, data)
  }

  findAll(){
    const data = {
    }

    return this.http.get(`${this.uri}/komentari/findAll`, data)
  }
}
