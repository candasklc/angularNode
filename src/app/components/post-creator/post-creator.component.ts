import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-creator',
  templateUrl: './post-creator.component.html',
  styleUrls: ['./post-creator.component.css']
})
export class PostCreatorComponent implements OnInit {
  public enteredTitle = '';
  public enteredContent = '';
  public post: Post;
  private mode = 'crate';
  private postId = '';

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    // Checking id the url has post id and depending on this, change the mode from create to edit.
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getPostById(this.postId);
      } else {
        this.mode = 'crate';
      }
    });
  }
  public onAddPost(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
