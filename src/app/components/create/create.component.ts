import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../../service/article.service';
import { iArticle } from '../../interface/article';

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
  ) {

  }

  ngOnInit(): void {
  }

  addArticle() {
    this.articleService.addArticle(this.createArticleForm.value);
    console.warn(this.createArticleForm.value);
    this.articleService.getNavigate('/');
  }

}
