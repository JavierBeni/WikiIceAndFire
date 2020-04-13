import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  charactersOriginal: Character[] = [];

  displayedColumns: string[] = ['name', 'gender', 'culture', 'aliases', 'born', 'playedBy', 'detail'];
  dataSource: MatTableDataSource<Character>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public auth: AuthService, public _api: ApiService, private router: Router) {
    this.loadCharacters(1);
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

  compareS(a: Character, b: Character) {

    if (a.playedBy[0] !== '' && b.playedBy[0] === '')
      return -1;
    else
      if (a.playedBy[0] === '' && b.playedBy[0] !== '')
        return 1;
      else
        return (a.playedBy > b.playedBy) ? 1 : -1
  }

  loadCharacters(page: number) {

    this._api.getCharacters(page.toString()).subscribe((resp: Character[]) => {

      this.charactersOriginal = this.charactersOriginal.concat(resp);
      if (resp.length !== 0)
        this.loadCharacters(page + 1)
      else {
        this.charactersOriginal.sort(this.compareS);

        this.dataSource = new MatTableDataSource(this.charactersOriginal);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  detail(url: string) {
    let temp: string[] = url.split('/');
    if (temp.length > 0)
      this.router.navigate(['/character/' + temp[temp.length - 1]]);
  }

}
