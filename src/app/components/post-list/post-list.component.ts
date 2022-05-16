import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  private postsSub: Subscription;
  public panelOpenState = false;
  public postsInList: Post[] = [];

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.postsInList = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.postsInList = posts;
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
