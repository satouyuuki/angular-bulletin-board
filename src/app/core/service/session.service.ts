import { Injectable } from '@angular/core';
import { Session, Password, User } from '../../class/article';
import { Subject, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }
  
  // ログイン状況確認
  public checkLogin(): void {
    this.afAuth
      .authState
      .pipe(
        switchMap(auth => {
          if (!auth) {
            return of(null);
          } else {
            return this.getUser(auth.uid);
          }
        })
      )
      .subscribe(auth => {
        // ログイン状態を返り値の有無で判断
        this.session.login = (!!auth);
        this.session.user = (auth) ? auth : new User();
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
        return this.router.navigate(['/account/login']);
      })
      .then(() => {
        this.sessionSubject.next(this.session.reset());
        alert('ログアウトしました。')
      })
      .catch(err => {
        // console.log(err);
        alert('ログアウトに失敗しました。\n' + err);
      })
  }
  public signup(account: Password): void {
    let auth;
    this.afAuth
      .createUserWithEmailAndPassword(account.email, account.password)
      .then(_auth => {
        _auth.user.updateProfile({
          displayName: account.name
        });
        auth = _auth;
      })
      .then(() => {
        return this.createUser(new User(auth.user.uid, account.name));
      })
      .then(() => this.afAuth.signOut())
      .then(() => {
        account.reset();
        alert('アカウントを登録しました');
      })
      .catch(err => {
        // console.log(err);
        alert('アカウントの作成に失敗しました。' + err);
      })
  }
  // ユーザーを作成
  private createUser(user: User): Promise<void> {
    return this.afs
      .collection('users')
      .doc(user.uid)
      .set(user.deserialize());
  }
  private getUser(uid: string): Observable<any> {
    return this.afs
      .collection('users')
      .doc(uid)
      .valueChanges()
      .pipe(
        take(1),
        switchMap((user: User) => of(new User(uid, user.name)))
    )
  }
  public login(account: Password): void { // 変更
    this.afAuth
      .signInWithEmailAndPassword(account.email, account.password)
      .then(auth => {
        // メールアドレス確認が済んでいるかどうか
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
        // console.log(err);
        alert('ログインに失敗しました。\n' + err);
      })
  }
}
