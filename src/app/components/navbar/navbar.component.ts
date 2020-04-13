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
  }

  changeTo(element: string) {
    this.element = element;
    this._api.emitter.emit(element);
    this.router.navigateByUrl('/list/' + element);
  }

}
