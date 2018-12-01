import { Component } from '@angular/core';
import { BlogHttpService } from './blog-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blog Application Demo';
  public loadBarProgress = 0;
  
  constructor(BlogHttpService:BlogHttpService){

  }
}
