import { Injectable } from '@angular/core';
//HTTP Stuff
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

//Router Imports for the Dynamic 
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from "@angular/router";

//Obs stuff
import { Observable } from "rxjs/observable"
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})

export class BlogHttpService {
  // private json_tempCache = [];
  // private json_currentDetal = {};
  // private json_timeMinimum = 5000*60*5;

  public  url_currentDetail = `all`;
  private url_baseURL = `https://blogapp.edwisor.com/api/v1/blogs/`;
  private url_baseToken:string = `?authToken=NGExNzdiYjhjNDIzZmM4NmM0N2YzZWI0YWY3ZThlNDAyMjNjNTVjZDg0M2QxNjI5ZDU4OGU2ODc3ZDRjZDUwZmJmNGM1MDFkMGE2MGVlNDExMzcyODBiNTZhMjNiNzFhMjUzYjY3MjQ4M2Y2MDU3ZWZlODIzOTdjYzdhZThkYjE3YQ==`;
  public fakePromise = false;
  
  constructor(private _http:HttpClient, private _route: ActivatedRoute, private router: Router) { 

    //this is used to dynamicly change the send requests sent to the API by changing the "currentDetail".
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        
        let currentPage = this.router.url.split("/")[1];
        this.constructorLog(currentPage);

        if(currentPage === `home`){
          this.url_currentDetail = `all`;
        }
        else if(currentPage === `blog`){
          //This is taken care of by the blog-view component.
          //This exists for completeness. Please don't remove it.
        }
        else if(currentPage === `edit`){
          //This exists for completeness. Please don't remove it.
        }
        else if(currentPage === `about` || currentPage === `create`){
          //This exists for completeness. Please don't remove it.
        }
        else {
          this.router.navigate(['**']);
        }
      }
    });

  }

  //Method to throw errors for the requestApiData() command.
  private errorApiData(error: any) {
    return Observable.throw(error.json());
  }

  //This is a meathod used to call console.log() from the constructor. 
  private constructorLog(myLog){
    console.log(myLog);
  }
  

  //Requests a json from the API using the api url, "currentDetail", and token. 
  public requestApiData(): Observable<any> {

    //Get's a responce from the api, use the errorApiData function if needed.
    return this._http
      .get(`${this.url_baseURL}${this.url_currentDetail}${this.url_baseToken}`)
      .catch(this.errorApiData);
  }

  
  //Method deals with finding the correct blog for the blog-view component.
  //At the time of writing this is only called inside said component.
  public async constructorBlogFunction(){
    
    //Only run all of this if there's something proceeding the blog (hopefully a blogID.)
    if(this.router.url.split("/").length > 2){

      let temp_json;
      let blogId = this.router.url.split("/")[2];
      let isAMatch:boolean = false;

      //Set the currentDetail to all so that we can get a list of all the blogs. 
      this.url_currentDetail = `all`
        
      //Get a list of all the blogs from the requestApiData function.
      await this.requestApiData().toPromise().then( data => {

        //Put the data in our temperary json var. 
        temp_json = data['data'];      
      })
      
      //Run through all the "blogs" in the temp-JSON variable .
      for(let blog of temp_json){

        /*If the blogID proceeding the blog url file path matches 
        the blogID of a actual blog, set the current detail to call that
        specific blog from the API. 
        
        Also sets isAMatch to true and breaks the for loop.*/ 
        if(blog.blogId === blogId){this.constructorLog("Match success!")
          //Set the currentDetail to view/:BlogId.
          this.url_currentDetail = `view/${blogId}`

          //Set isAMatch to true so that the if statement below can redirect the user is no such blog exists.
          isAMatch = true;

          break;
        }
      }

      //If isAMatch was never set to true, redirect the user to the Not Found page.
      if(isAMatch !== true){
        this.router.navigate(['**']);
      }
    }

    //If this blog has nothing proceding the "blog" route redirect to not found since the blog-view component isn't functional without a blogID.
    else{ 
      this.router.navigate(['**']);
    }
  }

}
