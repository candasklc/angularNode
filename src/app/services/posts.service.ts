import { Injectable } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor() { }

  getPosts(): Post[] {
    return [...this.posts];
  }

  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string): void {
    const newPost: Post = {
      title: title,
      content: content
    };
    this.posts.push(newPost);
    this.postsUpdated.next([...this.posts]);
  }
}
