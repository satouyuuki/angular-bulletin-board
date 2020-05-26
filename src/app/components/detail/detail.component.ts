import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { iArticle } from '../../interface/article';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  article: iArticle;

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
    this.articleService.getArticles().subscribe((val) => {
      this.article = val.find(val1 => val1.id == id);
    });
  }
  goBack():void {
    this.location.back();
  }
  addComment(post) {
    // if (post.value) {
    //   const comment = post.value;
    //   this.articleService.addComment(comment);
    // }
  }

}
