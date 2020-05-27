import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  editArticleForm; 
  // editArticleForm = this.fb.group({
  //   title: [this.article._title, Validators.required],
  //   desc: ['', Validators.required]
  // });
  article;
  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private location: Location,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.getSelectedArticle();
    this.editArticleForm = this.fb.group({
      title: ['', Validators.required],
      desc: ['', Validators.required]
    });
    console.log(this.editArticleForm);
  }

  goBack(): void {
    this.location.back();
  }

  editArticle() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (typeof this.editArticleForm.value.title !== "undefined") {
      this.articleService.editArticle(this.editArticleForm.value, id);
    }
  }
  getSelectedArticle() {
    const id = +this.route.snapshot.paramMap.get('id');
    // this.article = this.articleService.getSelectedArticle(id);
    // console.log(this.article);
    this.articleService.getArticles().subscribe(article => {
      this.article = article.find(val => val._aid == id);
    })
  }


}
