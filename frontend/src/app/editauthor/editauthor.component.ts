import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorModel } from '../authors/author.model';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-editauthor',
  templateUrl: './editauthor.component.html',
  styleUrls: ['./editauthor.component.css'],
})
export class EditauthorComponent implements OnInit {
  title: String = 'Edit Author';
  constructor(private authorService: AuthorService, private router: Router) {}
  authorItem = new AuthorModel('', '', '', '');

  ngOnInit(): void {
    let authorId = localStorage.getItem('editAuthorId');
    this.authorService.getAuthor(authorId).subscribe((data) => {
      this.authorItem = JSON.parse(JSON.stringify(data));
    });
  }

  EditAuthor() {
    this.authorService.editAuthor(this.authorItem);
    alert('Success');
    this.router.navigate(['/authors']);
  }
}
