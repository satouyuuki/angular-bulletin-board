import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { iArticle } from '../../interface/article';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  articles: iArticle[];
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((article) => {
      this.articles = article;
    });
  }

}
