import { Injectable } from '@angular/core';
import { iArticle } from '../interface/article';
import { Observable, of } from 'rxjs';
import { map, find } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, Article, Comment } from '../class/article';
import { Router } from '@angular/router';
import { SessionService } from '../core/service/session.service';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: Observable<any[]>;
  comments: Observable<any[]>;
  // article: iArticle;
  collectionNum: number;
  commentNum: number;
  public current_user: User;

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private session: SessionService,
  ) { 
    this.session
      .sessionState
      .subscribe(data => {
        this.current_user = data.user;
      });
    this.articles = db
      .collection<any>('articles', ref => {
        return ref.orderBy('_date', 'asc');
      })
      .snapshotChanges()
      .pipe(
        map(actions => {
          if (actions.length > 0) {
            this.collectionNum = actions.length;
          }
          else {
            this.collectionNum = 0;
          }
          return actions.map(action => {
            const data = action.payload.doc.data();
            return data;
          })
        })
      );
  }
  ngOnInit() {
    this.getArticles();
  }

  public getArticles(): Observable<iArticle[]> {
    return this.articles;
  }
  public addArticle(form) {
    this.collectionNum++;
    let collectionId = this.collectionNum;
    let article = new Article(this.current_user);
    article.date = +moment();
    article.title = form.title;
    article.desc = form.desc;
    article.aid = collectionId;
    this.db
      .collection('articles').doc(`article${article.aid}`)
      .set(article.deserialize())
      .then(() => {
        alert('新しいスレッドを作成しました');
      })
      .then(() => {
        this.router.navigate(['/']);
      });

  }
  public getComments(id: number) {
    return this.comments = this.db
      .collection('articles')
      .doc(`article${id}`)
      .collection('comments', ref => {
        return ref.orderBy('_date', 'asc');
      })
      .snapshotChanges()
      .pipe(
        map(actions => {
          this.commentNum = actions.length;
          return actions.map(action => {
            const data = action.payload.doc.data();
            return data;
          })
        })
      );

  }
  public addComment(form, id: number) {
    this.commentNum++;
    let commentId = this.commentNum;
    let comment = new Comment(this.current_user);
    comment.date = +moment();
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
  }
  public editArticle(form) {
    let article = new Article(this.current_user);
    article.date = +moment();
    article.title = form._title;
    article.desc = form._desc;
    article.aid = form._aid;
    this.db
      .collection('articles').doc(`article${article.aid}`)
      .update(article.deserialize())
      .then(() => {
        alert('スレッドを更新しました');
      })
      .then(() => {
        this.router.navigate(['/']);
      });
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
  public updateComment(comment, aid: number) {
    let updateComment = new Comment(this.current_user);
    updateComment.date = comment._date;
    updateComment.comment = comment._comment;
    updateComment.cid = comment._cid;
    this.db
      .collection('articles')
      .doc(`article${aid}`)
      .collection('comments')
      .doc(`comment${updateComment.cid}`)
      .update(updateComment.deserialize())
      .then(() => {
        alert('コメントを編集しました');
      });
  }
  protected getNavigate(path) {
    this.router.navigate([path]);
  }
}
