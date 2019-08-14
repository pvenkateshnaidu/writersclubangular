import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { Cat } from '../_models/cat';

import { UserService } from '../_services/user.service';
import { CategoriesService } from '../_services/categories.service';
import { AuthenticationService } from '../_services/authentication.service';
@Component({templateUrl: 'home.component.html',  styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit {
    currentUser: any;
    loading = false;
    users: User[] = [];
    cats: Cat[]=[] ; 
 token:any;

    constructor(private userService: UserService,private category: CategoriesService,private authService: AuthenticationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
       
      //  this.loadAllUsers();
        this.getCateg();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }
      
getCateg()
{
   
  this.category.getToken().subscribe(
    data => {
        this.loading = true;
      //  alert(this.token);
     this.token=data;
     this.category.getAllC(this.token.access_token).pipe(first()).subscribe(cats => {
      this.cats = cats;
  });
    
      //  this.alertService.success('Registration successful', true);
      //  this.router.navigate(['/home']);
    },
  );
	
}

}