import { Component, OnInit } from '@angular/core';
import { Password } from '../../class/article';
import { SessionService } from '../../core/service/session.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public account = new Password();

  constructor(private session: SessionService) { }

  ngOnInit(): void {
  }

  // アカウント作成
  submitSignUp(e: Event): void {
    e.preventDefault();
    // パスワード確認
    if (this.account.password !== this.account.password_confirmation) {
      alert('パスワードが異なります。');
      return;
    }
    this.session.signup(this.account);
  }

}
