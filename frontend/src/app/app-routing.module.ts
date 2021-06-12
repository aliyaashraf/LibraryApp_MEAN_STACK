import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { EditbookComponent } from './editbook/editbook.component';
import { EditauthorComponent } from './editauthor/editauthor.component';
import { AddauthorComponent } from './addauthor/addauthor.component';
import { AddbookComponent } from './addbook/addbook.component';
import { AuthorComponent } from './author/author.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', canActivate: [AuthGuard], component: BooksComponent },
  { path: 'addbook', canActivate: [AuthGuard], component: AddbookComponent },
  { path: 'editbook', component: EditbookComponent },
  { path: 'authors', canActivate: [AuthGuard], component: AuthorsComponent },
  {
    path: 'addauthor',
    canActivate: [AuthGuard],
    component: AddauthorComponent,
  },
  { path: 'editauthor', component: EditauthorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'deleteauthor', component: AuthorComponent },
  { path: 'deletebook', component: BookComponent },
  { path: 'book', canActivate: [AuthGuard], component: BookComponent },
  { path: 'author', canActivate: [AuthGuard], component: AuthorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
