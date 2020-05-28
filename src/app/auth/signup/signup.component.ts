import { Component, OnInit } from '@angular/core';
import { Password } from '../../class/article'; // 追加
import { SessionService } from '../../core/service/session.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public account = new Password(); // 追加

  constructor(private session: SessionService) { }

  ngOnInit(): void {
  }

  // アカウント作成
  submitSignUp(e: Event): void { // 追加
    e.preventDefault();
    // パスワード確認
    if (this.account.password !== this.account.password_confirmation) {
      alert('パスワードが異なります。');
      return;
    }
    this.session.signup(this.account);
    // this.account.reset();
  }

}
