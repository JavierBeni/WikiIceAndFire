import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/character.model';
import { Book } from '../models/book.model';
import { House } from '../models/house.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  @Output() emitter: EventEmitter<string> = new EventEmitter();

  private urlAPI: string = "https://anapioficeandfire.com/api/";

  constructor(private http: HttpClient) {
  }

  //Get one character 
  getCharacter(id: string) {
    let url = `${this.urlAPI}characters/${id}`;
    return this.http.get<Character>(url);
  }

  //Get 50 characters form one page
  getCharacters(page: string) {
    let url = `${this.urlAPI}characters?page=${page}&pageSize=50`;
    return this.http.get<Character[]>(url);
  }
  //Get one house
  getHouse(id: string) {
    let url = `${this.urlAPI}houses/${id}`;
    return this.http.get<House>(url);
  }
  //Get 50 houses of one page
  getHouses(page: string) {
    let url = `${this.urlAPI}houses?page=${page}&pageSize=50`;
    return this.http.get<House[]>(url);
  }
  //Get a book
  getBook(id: string) {
    let url = `${this.urlAPI}books/${id}`;
    return this.http.get<Book>(url);
  }
  //Get all books
  getBooks(page: string) {
    let url = `${this.urlAPI}books?page=${page}&pageSize=50`;
    return this.http.get<Book[]>(url);
  }

}
