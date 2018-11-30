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
  private json_tempCache = [];
  private json_currentDetal = {};
  private json_timeMinimum = 5000*60*5;

  public  url_currentDetail = `all`;
  private url_baseURL = `https://blogapp.edwisor.com/api/v1/blogs/`;
  private url_baseToken:string = ``;
  
  constructor(private _http:HttpClient, private _route: ActivatedRoute, private router: Router) { 

    //this is used to dynamicly change the send requests sent to the API by changing the "currentDetail".
    this.router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        
        let currentPage = this.router.url.split("/")[1];

        if(currentPage === `home`){
          this.url_currentDetail = `all`;
        }
        else if(currentPage === `about` || currentPage === `create`){
          //pass
        }
        else if(currentPage === `blog`){

        }
        else if(currentPage === `edit`){

        }
        else {
          this.router.navigate(['**']);
        }

      }
    });

  }

  //Method to format errors for the requestApiData() command.
  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }
  
  //Requests a json from the API using the api url, "currentDetail", and token. 
  public requestApiData(): Observable<any> {
    return this._http.get(`${this.url_baseURL}${this.url_currentDetail}${this.url_baseToken}`)
  }





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
