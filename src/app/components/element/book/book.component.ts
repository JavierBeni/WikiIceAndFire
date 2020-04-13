import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  book: Book = new Book();

  constructor( public _api: ApiService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id').split('/').pop();
    this._api.getBook(id).subscribe((resp: Book) => this.book = resp);
  }

  ngOnInit() {
  }

}
