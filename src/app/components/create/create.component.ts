import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../../service/article.service';
import { iArticle } from '../../interface/article';
import { Location } from '@angular/common';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  createArticleForm = this.fb.group({
    title: ['', Validators.required],
    desc: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private location: Location
  ) {

   }

  ngOnInit(): void {
  }
  
  goBack(): void {
    this.location.back();
  }

  addArticle() {
    console.warn(typeof this.createArticleForm.value.title);
    if (typeof this.createArticleForm.value.title !== "undefined") {
      this.articleService.addArticle(this.createArticleForm.value);
    }
  }

}
