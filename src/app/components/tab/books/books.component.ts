import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Book } from 'src/app/models/book.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  loading: boolean = true;
  displayedColumns: string[] = ['name', 'authors', 'detail'];
  dataSource: MatTableDataSource<Book>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public auth: AuthService, public _api: ApiService, private router: Router) {
    this.loading = true;
    this.loadBooks(1);
  }

  ngOnInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadBooks(page: number) {

    this._api.getBooks(page.toString()).subscribe((resp: Book[]) => {
      this.books = resp;
      this.dataSource = new MatTableDataSource(this.books);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  detail(url: string) {
    let temp: string[] = url.split('/');
    if (temp.length > 0) {
      this.router.navigate(['/book/' + temp[temp.length - 1]]);
    }
  }

}
