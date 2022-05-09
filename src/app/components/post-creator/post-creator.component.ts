import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-creator',
  templateUrl: './post-creator.component.html',
  styleUrls: ['./post-creator.component.css']
})
export class PostCreatorComponent implements OnInit {
  public enteredValue = '';
  public newPost = 'Mock value';

  constructor() { }

  ngOnInit(): void {
  }
  public onAddPost(): void {
    console.log(this.enteredValue);
    this.newPost = this.enteredValue;
  }
}
