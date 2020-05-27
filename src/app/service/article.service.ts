import { Injectable } from '@angular/core';
import { iArticle } from '../interface/article';
import { ARTICLES } from '../mock/mock-article';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
// import { filter } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private httpOptions: any = {
    // ヘッダ情報
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    // DELETE 実行時に `body` が必要になるケースがあるのでプロパティとして用意しておく
    // ( ここで用意しなくても追加できるけど... )
    body: null
  };
  private host: string = 'http://localhost:4200/app';  public articles = ARTICLES;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    this.setAuthorization('my-auth-token');
  }
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

  public get(): Promise<any[]> {
    return this.http.get(this.host + '/get', this.httpOptions)
      .toPromise()
      .then((res) => {
        // response の型は any ではなく class で型を定義した方が良いが
        // ここでは簡便さから any としておく

        // @angular/http では json() でパースする必要があったが､ @angular/common/http では不要となった
        //const response: any = res.json();
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  private errorHandler(err) {
    console.log('Error occured.', err);
    return Promise.reject(err.message || err);
  }
  public setAuthorization(token: string = null): void {
    if (!token) {
      return;
    }
    const bearerToken: string = `Bearer ${token}`;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', bearerToken);
  }
}
