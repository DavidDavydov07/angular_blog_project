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
  public currentBlog:object;
  public isLoaded:boolean;

  constructor(private _route: ActivatedRoute, private router: Router, private BlogHttpService:BlogHttpService) {
    console.log("constructor is called");

   }

  async ngOnInit() {
    /*Set isLoaded to false so that this component's templating doesn't
    active prematurely before the data is called.
    
    This isn't a problem on the first component call but happens durring
    subsequent calls.*/ 
    this.isLoaded = false;

    //getting the blog id from the route.
    await this.BlogHttpService.constructorBlogFunction();
    
    //Get the blog in question and then set isLoaded to true.
    this.currentBlog = await this.getCurrentBlog();
    this.isLoaded = true;
  }


  /*Function gets and returns the current blog's data after the 
  BlogHttpService's constructorBlogFunction() method is called.*/
  async getCurrentBlog(){
    let tempCurrentBlog;

    await this.BlogHttpService.requestApiData().toPromise().then( data => {
      tempCurrentBlog = data['data'];
    })

    return await tempCurrentBlog;
  }

  ngOnDestroy(){

  }



}
