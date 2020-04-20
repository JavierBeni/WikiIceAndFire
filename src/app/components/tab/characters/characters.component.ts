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

  characters: Character[] = [];
  loading: boolean = true;
  displayedColumns: string[] = ['name', 'gender', 'culture', 'aliases', 'born', 'playedBy', 'detail'];
  dataSource: MatTableDataSource<Character>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public auth: AuthService, public _api: ApiService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.loadCharacters(1);
  }
  //Funtion to filter table by text in the input. Get elements with any porperty match with the text.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }

  //Used this to show at first important chatacters.
  compareS(a: Character, b: Character) {

    if (a.playedBy[0] !== '' && b.playedBy[0] === '')
      return -1;
    else
      if (a.playedBy[0] === '' && b.playedBy[0] !== '')
        return 1;
      else
        return (a.playedBy > b.playedBy) ? 1 : -1
  }

  //Call to the service to get all characters. This is recursive beacuse the API only allow max 50 characters by call.
  //When it finish, it put data on table.
  loadCharacters(page: number) {
    this._api.getCharacters(page.toString()).subscribe((resp: Character[]) => {

      this.characters = this.characters.concat(resp);
      if (resp.length !== 0)
        this.loadCharacters(page + 1)
      else {
        this.characters.sort(this.compareS);

        this.dataSource = new MatTableDataSource(this.characters);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      }
    });
  }

  //Go to component which show more details about character.
  detail(url: string) {
    let temp: string[] = url.split('/');
    if (temp.length > 0)
      this.router.navigate(['/character/' + temp[temp.length - 1]]);
  }

}
