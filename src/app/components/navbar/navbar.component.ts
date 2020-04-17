import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  element: string = '';
  constructor(private _api: ApiService, public auth: AuthService, private router: Router) { }

  ngOnInit() {

    const findTerm = (term) => { if (this.router.url.includes(term)) return true; };

    switch (true) {
      case findTerm('book'):
        this.element = 'books';
        break;
      case findTerm('character'):
        this.element = 'characters';
        break;
      case findTerm('house'):
        this.element = 'houses';
        break;
      default:
        this.element = '';
        break;
    }

  }

  changeTo(element: string) {
    this.element = element;
    this._api.emitter.emit(element);
    this.router.navigateByUrl('/list/' + element);
  }

}
