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
  public imagePreview: string;


  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      image: new FormControl(null, {
        validators: []
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
          this.form.patchValue({
            title: this.post.title,
            content: this.post.content
          });
          this.isLoading = false;
        });
      } else {
        this.isCreateMode = true;
        this.post = {
          id: '',
          title: '',
          content: '',
        };
      }
    });
  }
  public onImageChanged(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    };
    reader.readAsDataURL(file);
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
