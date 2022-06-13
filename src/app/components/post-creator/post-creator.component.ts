import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  public isLoading = false;
  public form: FormGroup;
  public isCreateMode: boolean;
  public isEditMode: boolean;
  private postId = '';

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      })
    });
    // Checking id the url has post id and depending on this, change the mode from create to edit.
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.isEditMode = true;
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPostById(this.postId).subscribe(data => {
          this.post = data.post;
          this.isLoading = false;
        });
      } else {
        this.isCreateMode = true;
        this.post = {
          id: '',
          title: '',
          content: '',
        }
      }
      this.form.setValue({
        title: this.post.title,
        content: this.post.content
      });
    });
  }
  public onAddOrSavePost(): void {
    if (this.form.invalid) {
      return;
    }
    this.isEditMode = true;
    if (this.isCreateMode) {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
      this.form.reset();
    } else if (this.isEditMode) {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }
  }
}
