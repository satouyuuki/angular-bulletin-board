import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { SessionService } from '../../core/service/session.service';
import { Password } from '../../class/article';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public account = new Password();

  constructor(
    private sessionService: SessionService,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(document.body, 'bg');
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'bg');
  }

  submitLogin(e: Event) {
    e.preventDefault();
    this.sessionService.login(this.account);
  }

}
