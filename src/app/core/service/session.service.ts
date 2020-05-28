import { Injectable } from '@angular/core';
import { Session, Password } from '../../class/article';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  public checkLogin(): void {
    this.afAuth
      .authState
      .subscribe(auth => {
        console.log(auth);
        // ログイン状態を返り値の有無で判断
        this.session.login = (!!auth);
        this.sessionSubject.next(this.session);
      });
  }
  // ログイン状況確認(State)
  public checkLoginState(): Observable<Session> {
    return this.afAuth
      .authState
      .pipe(
        map(auth => {
          // ログイン状態を返り値の有無で判断
          this.session.login = (!!auth);
          return this.session;
        })
      )
  }

  public logout(): void {
    this.afAuth
      .signOut()
      .then(() => {
        this.sessionSubject.next(this.session.reset());
        return this.router.navigate(['/account/login']);
      }).then(() => alert('ログアウトしました。'))
      .catch(err => {
        console.log(err);
        alert('ログアウトに失敗しました。\n' + err);
      })
  }
  public signup(account: Password): void {
    this.afAuth
      .createUserWithEmailAndPassword(account.email, account.password)
      // .then(auth => auth.user.sendEmailVerification())
      .then(() => alert('アカウントを登録しました'))
      .catch(err => {
        console.log(err);
        alert('アカウントの作成に失敗しました。' + err);
      })
  }
  public login(account: Password): void { // 変更
    this.afAuth
      .signInWithEmailAndPassword(account.email, account.password)
      .then(auth => {
        // メールアドレス確認が済んでいるかどうか
        // console.log(auth.user);
        if (!auth.user.email) {
          this.afAuth.signOut();
          return Promise.reject('メールアドレスが確認できていません。');
        } else {
          this.session.login = true;
          this.sessionSubject.next(this.session);
          return this.router.navigate(['/']);
        }
      })
      .then(() => alert('ログインしました。'))
      .catch(err => {
        console.log(err);
        alert('ログインに失敗しました。\n' + err);
      })
  }
}
