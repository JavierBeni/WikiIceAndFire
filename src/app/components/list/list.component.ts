import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Character } from '../../models/character.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  private characters: Character[] = [];
  public toShow: string;

  constructor(public auth: AuthService, public _api: ApiService, private route: ActivatedRoute) {
    this.toShow = this.route.snapshot.paramMap.get('list');
    _api.emitter.subscribe(toShow => this.toShow = toShow);
    // this._api.getCharacters().subscribe((resp: Character[]) => this.characters = resp);
    // this.characters = this._api.getCharacters();
  }

  ngOnInit() {

    // console.log(this._api.getCharacter());

  }


  mostrar() {

    console.log('Chars ' + this.characters[1].name);
  }

}
