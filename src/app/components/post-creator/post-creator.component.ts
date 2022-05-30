import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  public isCreateMode: boolean;
  public isEditMode: boolean;
  private postId = '';

  constructor(public postsService: PostsService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Checking id the url has post id and depending on this, change the mode from create to edit.
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.isEditMode = true;
        this.postId = paramMap.get('postId');
        this.postsService.getPostById(this.postId).subscribe(data => {
          this.post = data.post;
        });
      } else {
        this.isCreateMode = true;
        this.post = {
          id: '',
          title: '',
          content: '',
        }
      }
    });
  }
  public onAddOrSavePost(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    if (this.isCreateMode) {
      this.postsService.addPost(form.value.title, form.value.content);
      form.resetForm();
    } else if (this.isEditMode) {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
      this.router.navigate(['/']);
    }
  }
}
