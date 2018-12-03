import { Component, OnInit } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {
  public possibleCategories = ["Comedy", "Drama", "Action", "Technology"];
  
  public blogTitle:string;
  public blogBody:string;
  public blogDesc:string;
  public blogCat:string;

  public postStatus = false;
  public postStatusError = false;
  
  constructor(private BlogHttpService:BlogHttpService, private _route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.postStatus = false;
    this.postStatusError = false;
  }

  createBlog(){
    
    let blogData = {
      
      title: this.blogTitle,
      description: this.blogDesc,
      blogBody: this.blogBody,
      category: this.blogCat
      
    }

    this.BlogHttpService.createBlog(blogData).subscribe(

      data => {
        this.postStatus = true;
        setTimeout(() => {
          this.router.navigate(['/blog', data.data.blogId])
        }, 1000);
      },

      error => {
        this.postStatus = false;
      }
    )


  }

}
