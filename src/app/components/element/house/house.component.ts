import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { House } from 'src/app/models/house.model';
import { Character } from 'src/app/models/character.model';


@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {

  house: House = new House();
  overlord: House = new House();
  founder: Character = new Character();
  currentLord: Character = new Character();

  constructor(public _api: ApiService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id').split('/').pop();
    this._api.getHouse(id).subscribe((resp: House) => {
      this.house = resp;
      if (this.house.currentLord) {
        let idCurrentLord = this.house.currentLord.split('/').pop();
        this._api.getCharacter(idCurrentLord).subscribe((resp: Character) => this.currentLord = resp);
      }
      if (this.house.overlord) {
        let idOverlord = this.house.overlord.split('/').pop();
        this._api.getHouse(idOverlord).subscribe((resp: House) => this.overlord = resp);
      }
      if (this.house.founder) {
        let idFounder = this.house.founder.split('/').pop();
        this._api.getCharacter(idFounder).subscribe((resp: Character) => this.founder = resp);
      }
    });




  }

  ngOnInit() {
  }

}
