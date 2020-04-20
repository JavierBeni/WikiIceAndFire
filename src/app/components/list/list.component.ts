import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Character } from '../../models/character.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private characters: Character[] = [];
  public toShow: string;

  constructor(public auth: AuthService, public _api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.toShow = this.route.snapshot.paramMap.get('list');
    this._api.emitter.subscribe(toShow => this.toShow = toShow);
  }

}
