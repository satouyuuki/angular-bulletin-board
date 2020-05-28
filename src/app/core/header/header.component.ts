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
  public username: string;

  constructor(
    public sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.sessionService.sessionState.subscribe((session: Session) => {
      if (session) {
        this.username = session.user.name;
        this.login = session.login;
      }
    })
  }

  public logout(): void {
    this.sessionService.logout();
  }

}
