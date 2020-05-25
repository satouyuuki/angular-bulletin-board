import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { Article } from '../mock/article';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  article;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDetailArticle();
  }

  getDetailArticle() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticle(id).subscribe((val) => {
      console.log(val);
      this.article = val;
    })
  }

}
