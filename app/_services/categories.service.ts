import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/observable';
import { map } from 'rxjs/operators';
import { Cat } from '../_models/cat';
import { User } from '../_models/user';
import { HttpHeaders } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
 
    testUrl="http://universitiesconnect.com/bongoswriters/api_1_0_0/Api";
      baseUrl = 'http://universitiesconnect.com/php/api';
      tokenurl="http://universitiesconnect.com/bongoswriters/api_1_0_0/token/token";
      data: Object;
    cats:Cat[];
    users:User[];
token:any;
    constructor(private http: HttpClient) { }
    
getToken()
{
  
  const body = new HttpParams()          
  .set('grant_type', "client_credentials")          
  .set('client_id', "webmobilez")    
  .set('client_secret', "Web$5367");
  let headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    
     });
let options = { headers: headers };
   return this.http.post(`${this.tokenurl}`, body.toString(), options);

}
    getAllC(token:string) {
   
  
      return this.http.get<Cat[]>(`${this.testUrl}/categories?access_token=`+token);
     }
     register(users: User,token:string) {
      //console.log(this.getAllC().subscribe());
      let headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
         });
    let options = { headers: headers };
    
      return this.http.post(`${this.testUrl}/registration?access_token=`+token, users,options);
  
    }
    public uploadImage(image: any) {
      const formData = new FormData();
      let headers = new HttpHeaders({
      //  'Content-Type': undefined
     //  'Accept': 'application/json',
     //  'Content-Type': 'application/x-www-form-urlencoded'
    // "Content-Type": "multipart/form-data"
     //   'Content-Type': 'image/x-www-form-urlencoded'
        
         });
         let options = { headers: headers };
      formData.append('image', image);
  
      return this.http.post(`${this.testUrl}/profileUpdate?access_token=`, image,options);
    }
    public createStory(image: any) {
      const formData = new FormData();
      let headers = new HttpHeaders({
      //  'Content-Type': undefined
     //  'Accept': 'application/json',
     //  'Content-Type': 'application/x-www-form-urlencoded'
    // "Content-Type": "multipart/form-data"
     //   'Content-Type': 'image/x-www-form-urlencoded'
        
         });
         let options = { headers: headers };
      formData.append('image', image);
  
      return this.http.post(`${this.testUrl}/createStory?access_token=`, image,options);
    }
public getStories(){
  let headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
     });
let options = { headers: headers };

  return this.http.get(`${this.testUrl}/getStories`,options);

}
public getStoriesById(id:number){
  let headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
     });
let options = { headers: headers };

  return this.http.get(`${this.testUrl}/getStories?id=`+id,options);

}
public getStory(id:number)
{
  let headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
     });
let options = { headers: headers };

  return this.http.get(`${this.testUrl}/getStory?id=`+id,options);
}
}
