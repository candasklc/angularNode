import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from 'src/app/components/post-list/post-list.component';
import { PostCreatorComponent } from 'src/app/components/post-creator/post-creator.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreatorComponent },
  { path: 'edit/:postId', component: PostCreatorComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
