import { Component, OnInit, OnDestroy } from '@angular/core';
//Importing route related code. 
import {ActivatedRoute, Router} from "@angular/router";
import { BlogHttpService } from '../blog-http.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})


export class BlogViewComponent implements OnInit, OnDestroy {
  public currentBlog;

  constructor(private _route: ActivatedRoute, private router: Router, private BlogHttpService:BlogHttpService) {
    console.log("constructor is called");

   }

  ngOnInit() {
    console.log("ngOnInit is called")

    //getting the blog id from the route.
    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);

    if(this.BlogHttpService.allBlogs === undefined || this.BlogHttpService.allBlogs.length === 0){
      this.BlogHttpService.setAllBlogs();
    }

    this.currentBlog = this.BlogHttpService.getSingleBlogInformation(myBlogId);
    console.log("hihihihi" + this.currentBlog);
  }

  ngOnDestroy(){

  }



}
