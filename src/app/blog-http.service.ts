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

        if(currentPage === `home`){ this.constructorLog("home!");
          this.url_currentDetail = `all`;
        }
        else if(currentPage === `about` || currentPage === `create`){ this.constructorLog("About or Create!");;
          //pass
        }
        else if(currentPage === `blog`){this.constructorLog("Blog View!");
          
        }
        else if(currentPage === `edit`){ this.constructorLog("Edit!");

        }
        else {this.constructorLog("Not Found?");
          this.router.navigate(['**']);
        }

      }
    });

  }

  //Method to throw errors for the requestApiData() command.
  private errorApiData(error: any) {
    return Observable.throw(error.json());
  }
  
  //Requests a json from the API using the api url, "currentDetail", and token. 
  public requestApiData(): Observable<any> {
    console.log("Doin' up the house!")

    return this._http
      .get(`${this.url_baseURL}${this.url_currentDetail}${this.url_baseToken}`)
      .catch(this.errorApiData);

      

  }

  private constructorLog(myLog){
    console.log(myLog);
  }

  public async constructorBlogFunction(){
              
    if(this.router.url.split("/").length > 2){this.constructorLog("Blog has a ID!");

    let temp_json;
    let blogId = this.router.url.split("/")[2];
    let isAMatch:boolean = false;

    this.constructorLog("Blog's ID is...");
    this.constructorLog(blogId);
    this.constructorLog("Let's see if We can find that blog!");
    this.url_currentDetail = `all`

    this.constructorLog("Subscribing to the Api Data Req!");
        
    await this.requestApiData().toPromise().then( data => {

      this.constructorLog("getting data!")
      temp_json = data['data'];
      this.constructorLog("got data!")
      this.constructorLog(temp_json);
      
    })
    
    this.constructorLog("Started a for-loop, baby!");
    for(let blog of temp_json){
      this.constructorLog("is it this blog?");
      this.constructorLog(blog);
      this.constructorLog(blogId);
      this.constructorLog(blog.blogId)
      if(blog.blogId === blogId){this.constructorLog("Match success!")
        this.url_currentDetail = `view/${blogId}`
        this.constructorLog(this.url_currentDetail)
        isAMatch = true;

        break;
      }
    }

    if(isAMatch !== true){
      this.router.navigate(['**']);
    }
    

  }
  else{this.constructorLog("Blog has no ID....");
    this.router.navigate(['**']);
  }

  }




  //The following is depricated code imported from the pokedex-demo project.
  //After realizing that the blog-demo project didn't need all of these functions since it's so simple it was better to just comment them out and save them for later projects/updates.

  //Writes the json data to a var. 
  /*private writeApiData(){
    let tempData;

    this.requestApiData().subscribe(
      async data =>{
        console.log("Logging getAllBlogs() data...");
        console.log(data);

        console.log("Logging allBlogs...");
        tempData = await data["data"];
        console.log(tempData);
      }
    )
    
    return tempData;
  }

  //Itterates through the "json_tempCache" to see if the json was requested already. 
  //If it was requested before the "json_timeMinimum" has passed used a json stored in the cache instead. 
  public getApiData():any {
    let sortApiData_timeCurrent:number = new Date().getTime();
    console.log("Hey!");

    if(this.json_tempCache.length > 0){
      for(let requestsMade of this.json_tempCache){
        
        if(requestsMade.cached_url_currentDetail === this.url_currentDetail && Math.abs(requestsMade.cached_timeRequestWasMade - sortApiData_timeCurrent) > this.json_timeMinimum){
          
          requestsMade.cached_json_currentDetail = this.writeApiData();
          requestsMade.timeRequestWasMade = sortApiData_timeCurrent;

          return requestsMade.cached_json_currentDetail;
        }
        
        
        else if(requestsMade.cached_url_currentDetail === this.url_currentDetail){
          
          return requestsMade.cached_json_currentDetail;
        }
      }
    }

    else{
      let temp_json_currentDetail = this.writeApiData();

      this.json_tempCache.push({
        'cached_url_currentDetail': this.url_currentDetail,
        'cached_json_currentDetail': temp_json_currentDetail,
        'cached_timeRequestWasMade': sortApiData_timeCurrent
      })

      return temp_json_currentDetail;
    }
  }*/

}
