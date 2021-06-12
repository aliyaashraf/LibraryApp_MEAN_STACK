import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorModel } from './author.model';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent implements OnInit {
  title: String = 'Authors';
  imageWidth: Number = 70;
  imageMargin: Number = 3;

  adata: AuthorModel[] = [];

  constructor(private authorService: AuthorService, private router: Router) {}

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe((data) => {
      this.adata = JSON.parse(JSON.stringify(data));
    });
  }

  deleteAuthor(authors: any) {
    this.authorService.deleteAuthor(authors._id).subscribe((data) => {
      this.adata = this.adata.filter((p) => p !== authors);
    });
  }

  EditAuthor(authors: any) {
    localStorage.setItem('editAuthorId', authors._id.toString());
    this.router.navigate(['/editauthor']);
  }

  ReadAuthor(authors: any) {
    localStorage.setItem('readAuthorId', authors._id.toString());
    this.router.navigate(['/author']);
  }
}
