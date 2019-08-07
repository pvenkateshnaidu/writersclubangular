
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../_services/categories.service';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService } from '../_services';
@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.css']
})
export class MyStoriesComponent implements OnInit {
  allstories:[]=[];
  loading = false;

  constructor( private categoriesService: CategoriesService,
    private userService: UserService,
    private router:Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.getAllStories();
  }
  getAllStories()
  {
   let  currentUser = JSON.parse(localStorage.getItem('currentUser'));
   this.loading = true;
    this.categoriesService.getStoriesById(currentUser.id).subscribe(
      (res:any) => {
    this.allstories=res.data;
    console.log(this.allstories)
    this.loading = false;
       // this.router.navigate(['/myprofile']);
      
      },
      (err) => {
      
      })
  }

}
