import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../app/services/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookComponent } from './components/element/book/book.component';
import { CharacterComponent } from './components/element/character/character.component';
import { HouseComponent } from './components/element/house/house.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'book/:id', component: BookComponent, canActivate: [AuthGuard]  },
    { path: 'character/:id', component: CharacterComponent, canActivate: [AuthGuard]  },
    { path: 'house/:id', component: HouseComponent, canActivate: [AuthGuard]  },
    { path: 'list/:list', component: ListComponent, canActivate: [AuthGuard]  },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const APP_ROUTING = RouterModule.forRoot(routes);