import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  posts: Post[] = [];
  title: 'mean-training';

  public onPostAdded(post: Post): void {
    this.posts.push(post);
  }
}
