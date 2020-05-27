import { Injectable } from '@angular/core';
import { iArticle } from '../interface/article';
import { ARTICLES } from '../mock/mock-article';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
// import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public articles = ARTICLES;

  constructor(
    private router: Router,
  ) { }
  // get articles(): iArticle {
  //   return this._articles;
  // }
  // set articles(value: iArticle) {
  //   this._articles.push(value);
  // }

  public getArticles(): Observable<iArticle[]> {
    return of(this.articles);
  }
  public getArticle(id: number): Observable<iArticle> {
    // 取得するのが１つだけ(find と filter使い分け)
    return of(this.articles.find(val => val.id === id));
  }
  public getNavigate(path) {
    this.router.navigate([path]);
  }
  public addArticle(form) {
    this.articles.push(form);
    console.log(this.articles);
  }
}
