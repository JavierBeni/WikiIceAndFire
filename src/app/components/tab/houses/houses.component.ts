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

  houses: House[] = [];
  loading: boolean = true;
  displayedColumns: string[] = ['name', 'region', 'coatOfArms', 'words', 'titles', 'seats', 'detail'];
  dataSource: MatTableDataSource<House>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public auth: AuthService, public _api: ApiService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.loadHouses(1);
  }

  //Funtion to filter table by text in the input. Get elements with any porperty match with the text.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) 
      this.dataSource.paginator.firstPage();
  }

  //Call to the service to get all houses. This is recursive beacuse the API only allow max 50 houses by call.
  //When it finish, it put data on table.
  loadHouses(page: number) {
    this._api.getHouses(page.toString()).subscribe((resp: House[]) => {

      this.houses = this.houses.concat(resp);
      if (resp.length !== 0)
        this.loadHouses(page + 1)
      else {
        this.dataSource = new MatTableDataSource(this.houses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      }
    });
  }

  //Go to component which show more details about house.
  detail(url: string) {
    let temp: string[] = url.split('/');
    if (temp.length > 0)
      this.router.navigate(['/house/' + temp[temp.length - 1]]);
  }

}
