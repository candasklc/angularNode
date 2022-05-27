import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { PostCreatorComponent } from './components/post-creator/post-creator.component';
import { HeaderComponent } from './components/header/header.component';
import { PostListComponent } from './components/post-list/post-list.component';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PostCreatorComponent,
    HeaderComponent,
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatListModule
  ],
  exports: [
    PostCreatorComponent,
    HeaderComponent,
    PostListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
