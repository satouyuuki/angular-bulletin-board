import { Injectable } from '@angular/core';
import { iArticle } from '../interface/article';
// import { ARTICLES } from '../mock/mock-article';
import { Observable, of } from 'rxjs';
import { map, find } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, Article, Comment } from '../class/article';
import { Router } from '@angular/router';
const CURRENT_USER: User = new User(1, 'Tanaka Jiro');
const ANOTHER_USER: User = new User(2, 'Suzuki Taro');

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: Observable<any[]>;
  comments: Observable<any[]>;
  // article: iArticle;
  collectionNum: number;
  commentNum: number;
  public current_user = CURRENT_USER;

  constructor(
    private db: AngularFirestore,
    private router: Router,
  ) { 
    this.articles = db
      .collection<any>('articles')
      .snapshotChanges()
      .pipe(
        map(actions => {
          this.collectionNum = actions.length;
          console.log(this.collectionNum);
          return actions.map(action => {
            // const key = action.payload.doc.id;
            // const bar = Number(key.match(/\d+/));
            const data = action.payload.doc.data();
            console.log(data);
            return data;
          })
        })
      );
  }
  ngOnInit() {
    this.getArticles();
  }

  public getArticles(): Observable<iArticle[]> {
    // return of(ARTICLES);
    // return this.article;
    return this.articles;
  }
  public addArticle(form) {
    this.collectionNum++;
    let collectionId = this.collectionNum;
    let article = new Article(this.current_user);
    article.date = new Date();
    article.title = form.title;
    article.desc = form.desc;
    article.aid = collectionId;
    this.db
      .collection('articles').doc(`article${article.aid}`)
      .set(article.deserialize());
  }
  public getComments(id: number) {
    return this.comments = this.db
      .collection('articles')
      .doc(`article${id}`)
      .collection('comments')
      .snapshotChanges()
      .pipe(
        map(actions => {
          this.commentNum = actions.length;
          console.log(this.commentNum);
          return actions.map(action => {
            // const key = action.payload.doc.id;
            // const bar = Number(key.match(/\d+/));
            const data = action.payload.doc.data();
            console.log(data);
            return data;
          })
        })
      );

  }
  public addComment(form, id: number) {
    this.commentNum++;
    let commentId = this.commentNum;
    let comment = new Comment(this.current_user);
    comment.date = new Date();
    comment.comment = form.comment;
    comment.cid = commentId;
    this.db
      .collection('articles')
      .doc(`article${id}`)
      .collection('comments')
      .doc(`comment${comment.cid}`)
      .set(
        comment.deserialize()
      );
    
    // id = this.db.createId();
  }
  public deleteArticle(id: number) {
    this.db
      .collection('articles')
      .doc(`article${id}`)
      .delete()
      .then(() => {
        alert('記事を削除しました');
      });
  }
  public deleteComment(aid: number, uid: number) {
    this.db
      .collection('articles')
      .doc(`article${aid}`)
      .collection('comments')
      .doc(`comment${uid}`)
      .delete()
      .then(() => {
        alert('コメントを削除しました');
      });
  }
  public getNavigate(path) {
    this.router.navigate([path]);
  }
}
