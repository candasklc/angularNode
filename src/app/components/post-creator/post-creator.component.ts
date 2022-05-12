import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-post-creator',
  templateUrl: './post-creator.component.html',
  styleUrls: ['./post-creator.component.css']
})
export class PostCreatorComponent implements OnInit {
  @Output() public postCreated: EventEmitter<Post> = new EventEmitter();
  public enteredTitle = '';
  public enteredContent = '';

  constructor() { }

  ngOnInit(): void {
  }
  public onAddPost(): void {
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent,
    };
    this.postCreated.emit(post);
  }
}
