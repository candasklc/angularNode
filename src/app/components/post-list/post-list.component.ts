import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public panelOpenState = false;
  @Input() public postsInList: Post[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
