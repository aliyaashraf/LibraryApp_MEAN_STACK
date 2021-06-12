import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from './book.model';
import { AuthService } from '../auth.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  title: String = 'Books';
  imageWidth: Number = 70;
  imageMargin: Number = 3;

  bdata: BookModel[] = [];

  constructor(
    public bookService: BookService,
    private router: Router,
    public _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.bdata = JSON.parse(JSON.stringify(data));
    });
  }

  deleteBook(books: any) {
    this.bookService.deleteBook(books._id).subscribe((data) => {
      this.bdata = this.bdata.filter((p) => p !== books);
    });
  }

  EditBook(books: any) {
    localStorage.setItem('editBookId', books._id.toString());
    this.router.navigate(['/editbook']);
  }

  ReadBook(books: any) {
    localStorage.setItem('readBookId', books._id.toString());
    this.router.navigate(['/book']);
  }
}
