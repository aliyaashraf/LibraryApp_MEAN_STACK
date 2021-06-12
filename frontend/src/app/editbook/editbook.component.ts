import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from '../books/book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css'],
})
export class EditbookComponent implements OnInit {
  title: String = 'Edit Book';
  constructor(private bookService: BookService, private router: Router) {}
  bookItem = new BookModel('', '', '', '', '');

  ngOnInit(): void {
    let bookId = localStorage.getItem('editBookId');
    this.bookService.getBook(bookId).subscribe((data) => {
      this.bookItem = JSON.parse(JSON.stringify(data));
    });
  }

  EditBook() {
    this.bookService.editBook(this.bookItem);
    alert('Success');
    this.router.navigate(['/books']);
  }
}
