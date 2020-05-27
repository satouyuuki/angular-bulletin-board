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
  public param: any = {};
  public messageInfo: any = {
    id: null,
    message: null
  }
  public messageInfoList: any = [this.messageInfo];
  public messageId: number = 1;
  public message: string = '';
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((article) => {
      this.articles = article;
    });
    this.articleService.get()
      .then(
        (response) => {
          this.param = response;
          this.messageInfoList = this.param.messages;
        }
      )
      .catch(
        (error) => console.log(error)
      );
  }

}
