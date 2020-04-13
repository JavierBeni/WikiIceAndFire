import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { House } from 'src/app/models/house.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {


  housesOriginal: House[] = [];

  displayedColumns: string[] = ['name', 'gender', 'culture', 'aliases', 'born', 'playedBy', 'detail'];
  dataSource: MatTableDataSource<House>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public auth: AuthService, public _api: ApiService, private router: Router) {
    this.loadHouses(1);
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

  // compareS(a: House, b: House) { return (a.culture > b.culture) ? 1 : -1 }

  loadHouses(page: number) {

    this._api.getHouses(page.toString()).subscribe((resp: House[]) => {

      this.housesOriginal = this.housesOriginal.concat(resp);
      if (resp.length !== 0)
        this.loadHouses(page + 1)
      else {
        // this.housesOriginal.sort(this.compareS);

        this.dataSource = new MatTableDataSource(this.housesOriginal);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }


  detail(url: string) {
    let temp: string[] = url.split('/');
    if (temp.length > 0)
      this.router.navigate(['/house/' + temp[temp.length - 1]]);
  }

}
