import { Component } from '@angular/core';
import { SessionService } from './core/service/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sy-bulletin-board';
  constructor(
    private session: SessionService
  ) {
    this.session.checkLogin();
  }
}
