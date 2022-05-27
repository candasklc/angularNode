import { Injectable } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { map, Observable, Subject } from 'rxjs';
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
    this.http.get<{ message: string, posts: any }>(this.url)
      // Modifying the received object. (_id -> id) 
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            id: post._id,
            title: post.title,
            content: post.content
          };
        });
      }))
      .subscribe((editedPost) => {
        this.posts = editedPost;
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

    this.http.post<{ message: string, postId: string }>(this.url, newPost)
      .subscribe((data) => {
        const id = data.postId;
        newPost.id = id;
        this.posts.push(newPost);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(id: string): void {
    this.http.delete<{ message: string }>(`${this.url}/${id}`)
      .subscribe((data) => {
        const updatedPosts = this.posts.filter(post => post.id !== id);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
