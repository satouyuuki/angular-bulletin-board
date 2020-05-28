import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../core/service/session.service';
import { Password } from '../../class/article'; // 追加
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public account = new Password(); // 追加

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
  }

  submitLogin(e: Event) {
    // this.sessionService.login();
    e.preventDefault();
    this.sessionService.login(this.account); // 変更
  }

}
