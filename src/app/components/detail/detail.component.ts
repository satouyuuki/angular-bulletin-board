import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../../service/article.service';
import { iArticle, iComment } from '../../interface/article';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from '../../core/service/session.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  commentForm = this.fb.group({
    comment: ['', Validators.required],
  });
  article: iArticle;
  comments;
  public sessionData;
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private session: SessionService,
  ) { }

  ngOnInit(): void {
    this.getDetailArticle();
    this.getComments();
    this.sessionData = this.session.session;
  }
  getComments() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getComments(id).subscribe(comment => {
      this.comments = comment;
    })
  }
  
  getDetailArticle() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticles().subscribe((val) => {
      this.article = val.find(val => val._aid == id);
    });
  }
  goBack():void {
    this.location.back();
  }
  addComment() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.addComment(this.commentForm.value, id);
    this.commentForm.setValue({comment: ''});
  }
  deleteComment(aid: number, uid: number) {
    this.articleService.deleteComment(aid, uid);
  }
  updateComment(comment) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.updateComment(comment, id);
  }
  editFlagToggle(comment) {
    comment.edit_flag = (!comment.edit_flag);
  }

}
