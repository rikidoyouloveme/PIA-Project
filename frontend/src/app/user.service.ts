import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(korisnicko_imeFromForm, lozinkaFromForm){
    const data = {
      korisnicko_ime: korisnicko_imeFromForm,
      lozinka: lozinkaFromForm
    }

    return this.http.post(`${this.uri}/korisnici/login`, data)
  }

  adminLogin(korisnicko_imeFromForm, lozinkaFromForm){
    const data = {
      korisnicko_ime: korisnicko_imeFromForm,
      lozinka: lozinkaFromForm
    }

    return this.http.post(`${this.uri}/korisnici/adminLogin`, data)
  }

  register(imePrezimeForm, adresaForm, korisnicko_imeForm, lozinkaForm, mejlForm, telefonForm, slikaForm){
    let tipForm = 'citalac';
    const data = {
      imePrezime: imePrezimeForm,
      adresa: adresaForm,
      korisnicko_ime: korisnicko_imeForm,
      lozinka: lozinkaForm,
      mejl: mejlForm,
      telefon: telefonForm,
      slika: slikaForm,
      tip: tipForm
    }

    return this.http.post(`${this.uri}/korisnici/register`, data)
  }

  add(imePrezimeForm, adresaForm, korisnicko_imeForm, lozinkaForm, mejlForm, telefonForm, slikaForm, tipForm){
    const data = {
      imePrezime: imePrezimeForm,
      adresa: adresaForm,
      korisnicko_ime: korisnicko_imeForm,
      lozinka: lozinkaForm,
      mejl: mejlForm,
      telefon: telefonForm,
      slika: slikaForm,
      tip: tipForm
    }

    return this.http.post(`${this.uri}/korisnici/registerByAdmin`, data)
  }
  update(imePrezimeForm, adresaForm, korisnicko_imeForm, lozinkaForm, mejlForm, telefonForm, slikaForm, tipForm, usernameForm) {
    const data = {
      imePrezime: imePrezimeForm,
      adresa: adresaForm,
      korisnicko_ime: korisnicko_imeForm,
      lozinka: lozinkaForm,
      mejl: mejlForm,
      telefon: telefonForm,
      slika: slikaForm,
      tip: tipForm,
      username: usernameForm
    }
    return this.http.post(`${this.uri}/korisnici/update`, data)
  }
  changePassword(korisnicko_imeForm, lozinkaForm) {
    const data = {
      korisnicko_ime: korisnicko_imeForm,
      lozinka: lozinkaForm
    }
    return this.http.post(`${this.uri}/korisnici/changePassword`, data)
  }
  changeBlock(usernameForm) {
    const data = {
      username: usernameForm
    }
    return this.http.post(`${this.uri}/korisnici/changeBlock`, data)
  }
  notify(usernameForm,notificationForm) {
    const data = {
      korisnicko_ime: usernameForm,
      obavestenje: notificationForm
    }
    return this.http.post(`${this.uri}/korisnici/notify`, data)
  }
  notifyMany(usernameForm,notificationForm) {
    const data = {
      korisnicko_ime: usernameForm,
      obavestenje: notificationForm
    }
    return this.http.post(`${this.uri}/korisnici/notifyMany`, data)
  }
  unnotify(usernameForm,notificationForm) {
    const data = {
      korisnicko_ime: usernameForm,
      obavestenje: notificationForm
    }
    return this.http.post(`${this.uri}/korisnici/unnotify`, data)
  }
  unblock(usernameForm) {
    const data = {
      username: usernameForm
    }
    return this.http.post(`${this.uri}/korisnici/unblock`, data)
  }
  findAllRequests(){
    const data = {
    }

    return this.http.post(`${this.uri}/korisnici/findAllRequests`, data)
  }

  delete(korisnicko_imeF){
    const data = {
      korisnicko_ime: korisnicko_imeF
    }

    return this.http.post(`${this.uri}/korisnici/delete`, data)
  }

  deleteRequest(korisnicko_imeF){
    const data = {
      korisnicko_ime: korisnicko_imeF
    }

    return this.http.post(`${this.uri}/korisnici/deleteRequest`, data)
  }

  findAll(){
    return this.http.get(`${this.uri}/korisnici/findAll`)
  }
}
