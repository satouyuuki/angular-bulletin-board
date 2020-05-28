import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { iArticle } from '../../interface/article';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  article;
  constructor(
    private articleService: ArticleService,
    private location: Location,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.getSelectedArticle();
  }

  goBack(): void {
    this.location.back();
  }

  editArticle() {
    this.articleService.editArticle(this.article);
  }
  
  getSelectedArticle() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticles().subscribe(article => {
      this.article = article.find(val => val._aid == id);
    })
  }
}
