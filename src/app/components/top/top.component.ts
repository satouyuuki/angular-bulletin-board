import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { iArticle } from '../../interface/article';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit, OnDestroy {
  public articles;
  private subscription: Subscription;
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
  getArticles(): void {
    this.articles = this.articleService.getArticles();
  }
  deleteArticle(id) {
    console.log(id);
    this.articleService.deleteArticle(id);
  }

}
