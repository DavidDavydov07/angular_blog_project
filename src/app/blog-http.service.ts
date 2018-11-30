import { Injectable } from '@angular/core';
//HTTP Stuff
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

//Obs stuff
import { Observable } from "rxjs/observable"
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})

export class BlogHttpService {
  public json_temp_cache= [];

  public currentBlog;
  public baseURL = 'https://blogapp.edwisor.com/api/v1/blogs/';
  public token = '?authToken=YmEzNjIyZWUyNDY3MjZkYTI4MTg4MzUwZjVjNmMwZjBiOWZkNDc2YjA2ZTM0ZDBkZGI4NmVlZDczMWFjYTFjZDFhZmI1NzQxM2NkN2Y2YTVhMzg0MTJkODQzNjY0Zjc2MWYwNDMwMzE3MDZhOWQ1YjI4Mjc4Zjg1YzE0YzQ0OTBhNQ==';
  
  constructor(private _http:HttpClient) { }

  situationalRedirect(): any {
    throw new Error("Method not implemented.");
  }
  
  public returnApiData(): Observable<any> {
    return this._http.get(`${this.baseURL}${this.situationalRedirect()}${this.token}`)
    .map(res => res )
  }


  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  public getSingleBlogInformation(currentBlogId):any {
    
    console.log("Started looking through blogs!");
    console.log(this.allBlogs);
    for (let blog of this.allBlogs){
      console.log("Is this is?....");
      if(blog.blogId == currentBlogId){
        console.log("Yes!");
        this.currentBlog = blog;
        console.log("Current blog is " + this.currentBlog);
      }
    }

    return this.currentBlog;
  }


}
