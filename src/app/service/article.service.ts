import { Injectable } from '@angular/core';
import { Article } from '../mock/article';
// import { ARTICLES } from '../mock/mock-article';
import { Observable, of } from 'rxjs';
import { map, find } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: Observable<Article[]>;
  article: Observable<Article>;

  constructor(
    private db: AngularFirestore
  ) { 
    this.articles = db
      .collection<Article>('articles', ref => {
        return ref;
      })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          // const key = action.payload.doc.id;
          const data = action.payload.doc.data();
          return data;
        }))
      );
  }

  public getArticles(): Observable<Article[]> {
    // return of(ARTICLES);
    // return this.article;
    console.log(this.articles);
    return this.articles;
  }
  // public getArticle(id: number): Observable<Article> {
    // 取得するのが１つだけ(find と filter使い分け)
    // return of(ARTICLES.find(val => val.id === id));
    // this.articles.subscribe(article => {
    //   console.log({ id, article });
    //   return article.find(val => val.id === id);
    // });
    // this.articles.subscribe(article => {
    //   this.article = article.find(val => val.id == id);
    // });
    // console.log(this.article);
    // return this.article;
    // return article;
    // return this.articles.find(val => val.id == id);
  // }
}
