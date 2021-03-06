import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(public http: HttpClient) {}

  getAuthors() {
    return this.http.get('http://localhost:3000/authors');
  }
  newAuthor(item: any) {
    return this.http
      .post('http://localhost:3000/addauthor', { author: item })
      .subscribe((data) => {
        console.log(data);
      });
  }

  editAuthor(author: any) {
    return this.http
      .put('http://localhost:3000/editauthor', author)
      .subscribe((data) => {
        console.log(data);
      });
  }
  getAuthor(id: any) {
    return this.http.get('http://localhost:3000/author/' + id);
  }
  deleteAuthor(id: any) {
    return this.http.delete('http://localhost:3000/deleteauthor/' + id);
  }
}
