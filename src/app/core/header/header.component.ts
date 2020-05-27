import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { Session } from '../../class/article'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public login: boolean = false;

  constructor(
    public sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.sessionService.sessionState.subscribe((session: Session) => {
      if (session) {
        this.login = session.login;
      }
    })
    // this.login = this.sessionService.session.login;
    // console.log('header-component-login:' + this.login);
  }

  public logout(): void {
    this.sessionService.logout();
  }

}
