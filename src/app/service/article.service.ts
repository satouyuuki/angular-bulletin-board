import { Injectable } from '@angular/core';
import { Article } from '../mock/article';
import { ARTICLES } from '../mock/mock-article';
import { Observable, of } from 'rxjs';
// import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor() { }

  public getArticles(): Observable<Article[]> {
    return of(ARTICLES);
  }
  public getArticle(id: number): Observable<Article> {
    // 取得するのが１つだけ(find と filter使い分け)
    return of(ARTICLES.find(val => val.id === id));
  }
}
