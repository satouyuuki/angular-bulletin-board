import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../core/service/session.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
  }

  submitLogin() {
    this.sessionService.login();
  }

}
