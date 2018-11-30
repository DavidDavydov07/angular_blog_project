// this is a by default statement.
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

//temp imports
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// this is a decorator
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


// a simple class using lifecycle hooks.
export class HomeComponent implements OnInit, OnDestroy {

  public allBlogs:any;
  public isLoaded = false;
  //dummy blog var is allBlogs
  constructor(private BlogHttpService:BlogHttpService, private _http:HttpClient) { 

  }

  ngOnInit() {
    console.log("Home Component has been initalized.");

    this.allBlogs = this.getAllBlogs();
  }

  getAllBlogs(){
    this.BlogHttpService.requestApiData().subscribe(
      async data =>{

        this.allBlogs = await data["data"];
        this.isLoaded = true;
      }
    )
  }
  ngOnDestroy(){

  }

}

