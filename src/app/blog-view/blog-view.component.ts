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
  public isLoaded=false;

  constructor(private _route: ActivatedRoute, private router: Router, private BlogHttpService:BlogHttpService) {
    console.log("constructor is called");

   }

  async ngOnInit() {
    this.isLoaded = false;
    console.log("ngOnInit is called")
    console.log("when a couple of guys who are up to no good,");
    //getting the blog id from the route.
    await this.BlogHttpService.constructorBlogFunction();
    this.currentBlog = await this.getCurrentBlog();
    console.log("Got in one little fight and my mom got scared!")
    this.isLoaded = true;
    /*if(this.BlogHttpService.allBlogs === undefined || this.BlogHttpService.allBlogs.length === 0){
      this.BlogHttpService.setAllBlogs();
    }

    this.currentBlog = this.BlogHttpService.getSingleBlogInformation(myBlogId);
    console.log("hihihihi" + this.currentBlog);*/
  }

  async getCurrentBlog(){
    console.log("started making trouble in my neighborhood")
    let tempCurrentBlog;

    await this.BlogHttpService.requestApiData().toPromise().then( data => {
      tempCurrentBlog = data['data'];
    })
    console.log("Dududula-dududula-durururu!", tempCurrentBlog);

    return await tempCurrentBlog;
  }

  ngOnDestroy(){

  }



}
