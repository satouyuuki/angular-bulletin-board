import { Injectable } from '@angular/core';
import { iArticle } from '../interface/article';
// import { ARTICLES } from '../mock/mock-article';
import { Observable, of } from 'rxjs';
import { map, find } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, Article } from '../class/article';
import { Router } from '@angular/router';
const CURRENT_USER: User = new User(1, 'Tanaka Jiro');
const ANOTHER_USER: User = new User(2, 'Suzuki Taro');

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: Observable<iArticle[]>;
  article: iArticle;
  public current_user = CURRENT_USER;

  constructor(
    private db: AngularFirestore,
    private router: Router,
  ) { 
    this.articles = db
      .collection<iArticle>('articles')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          // const key = action.payload.doc.id;
          const data = action.payload.doc.data();
          console.log(data);
          return data;
        }))
      );
  }
  // ngOnChange() {
  //   this.getArticles();
  // }

  public getArticles(): Observable<iArticle[]> {
    // return of(ARTICLES);
    // return this.article;
    return this.articles;
  }
  public addArticle(form) {
    let article = new Article(this.current_user);
    article.title = form.title;
    article.desc = form.desc;
    article.aid = 4;
    console.log(article);
    this.db
      .collection('articles')
      .add(article.deserialize());
  }
  public getNavigate(path) {
    this.router.navigate([path]);
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
