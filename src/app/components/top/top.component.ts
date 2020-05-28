import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { iArticle } from '../../interface/article';
import { Observable, Subscription } from 'rxjs';
import { SessionService } from '../../core/service/session.service';
@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  public articles;
  // public current_user;
  public sessionData;

  // private subscription: Subscription;
  constructor(
    private articleService: ArticleService,
    private session: SessionService,
  ) { 
    
  }
  
  ngOnInit(): void {
    this.sessionData = this.session.session;
    this.getArticles();
  }
  getArticles(): void {
    this.articles = this.articleService.getArticles();
  }
  deleteArticle(id) {
    this.articleService.deleteArticle(id);
  }

}
