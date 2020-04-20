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
  spouse: Character = new Character();

  constructor(public _api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id').split('/').pop();
    this.loadCharacter(id);
  }

  //Recursive funtion to get all characters.
  loadCharacter(id: string) {
    this._api.getCharacter(id).subscribe((resp: Character) => {
      this.character = resp;
      this.character.titles = this.character.titles.map(x => ' '.concat(x));
      if (this.character.spouse) {
        let idOverlord = this.character.spouse.split('/').pop();
        this._api.getCharacter(idOverlord).subscribe((resp: Character) => this.spouse = resp);
      }
    });
  }

  //Get a character from the info od other character.
  chargeOther(characterURL: string) {
    this.loadCharacter(characterURL.split('/').pop());
  }

}
