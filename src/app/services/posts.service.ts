import { Injectable } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private url = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Post[] {
    this.http.get<{ message: string, posts: Post[] }>(this.url)
      .subscribe((data) => {
        this.posts = data.posts;
        this.postsUpdated.next([...this.posts]);
      });
    return [...this.posts];
  }

  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string): void {
    const newPost: Post = {
      id: '',
      title: title,
      content: content
    };

    this.http.post<{ message: string }>(this.url, newPost)
      .subscribe((data) => {
        console.log(data.message);
        this.posts.push(newPost);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
