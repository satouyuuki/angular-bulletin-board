import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Password } from '../../class/article';
import { SessionService } from '../../core/service/session.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  public account = new Password();

  constructor(
    private session: SessionService,
    private renderer: Renderer2
  ) { 
    this.renderer.addClass(document.body, 'bg');
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'bg');
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
