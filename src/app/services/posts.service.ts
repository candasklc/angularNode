import { Injectable } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { map, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private url = 'http://localhost:3000/posts';

  constructor(private http: HttpClient, private router: Router) { }

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

  getPostById(id: string) {
    return this.http.get<{ message: string, post: Post }>(`${this.url}/${id}`);

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
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http.put<{ message: string }>(`${this.url}/${id}`, post)
      .subscribe((data) => {
        // copy the post array.
        const updatedPosts = [...this.posts];
        // search for the edited post.
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        // replace the old post with the edited version.
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      })
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
