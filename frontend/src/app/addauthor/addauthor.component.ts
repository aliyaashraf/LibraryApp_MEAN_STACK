import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { AuthorModel } from '../authors/author.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-addauthor',
  templateUrl: './addauthor.component.html',
  styleUrls: ['./addauthor.component.css'],
})
export class AddauthorComponent implements OnInit {
  title: String = 'Add Author';

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private _auth: AuthService
  ) {}
  authorItem = new AuthorModel('', '', '', '');
  ngOnInit(): void {}
  AddAuthor() {
    this.authorService.newAuthor(this.authorItem);
    console.log('called');
    alert('Success');
    this.router.navigate(['/authors']);
  }
}
