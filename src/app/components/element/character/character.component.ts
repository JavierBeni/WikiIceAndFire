import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Character } from 'src/app/models/character.model';


@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  character: Character = new Character();

  constructor(public _api: ApiService, private route: ActivatedRoute) {

    const id = this.route.snapshot.paramMap.get('id').split('/').pop();
    this._api.getCharacter(id).subscribe((resp: Character) => this.character = resp);
  }

  ngOnInit() {
  }

}
