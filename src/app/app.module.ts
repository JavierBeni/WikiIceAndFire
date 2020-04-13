//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//Routing
import { APP_ROUTING } from './app.routes';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';

//Services
import { ApiService } from './services/api.service';
import { BooksComponent } from './components/tab/books/books.component';
import { CharactersComponent } from './components/tab/characters/characters.component';
import { HousesComponent } from './components/tab/houses/houses.component';
import { BookComponent } from './components/element/book/book.component';
import { CharacterComponent } from './components/element/character/character.component';
import { HouseComponent } from './components/element/house/house.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    NavbarComponent,
    ProfileComponent,
    BooksComponent,
    CharactersComponent,
    HousesComponent,
    BookComponent,
    CharacterComponent,
    HouseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    APP_ROUTING,
    MaterialModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
