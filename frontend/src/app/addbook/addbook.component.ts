import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { BookModel } from '../books/book.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddbookComponent implements OnInit {
  title: String = 'Add Book';
  constructor(
    private bookService: BookService,
    private router: Router,
    private _auth: AuthService
  ) {}
  bookItem = new BookModel('', '', '', '', '');
  ngOnInit(): void {}
  AddBook() {
    this.bookService.newBook(this.bookItem);
    console.log('called');
    alert('Success');
    this.router.navigate(['/books']);
  }
}
