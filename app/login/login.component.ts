import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Cat } from '../_models/cat';
import { UserService } from '../_services';
import { CategoriesService } from '../_services/categories.service';
import { AlertService, AuthenticationService } from '../_services';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
   
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,private category: CategoriesService,
        private alertService: AlertService) {}
        cats: Cat[]=[] ; 
        token:any;
    ngOnInit() {
      //  this.getCateg();
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
    
        this.loading = true;
        this.category.getToken().subscribe(
            data => {
                this.token=data;
               // alert(this.token);
        this.authenticationService.login(this.f.email.value, this.f.password.value,this.token.access_token)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
            });
    }
    getCateg()
    {
      this.category.getToken().subscribe(
        data => {
           // alert(this.token);
         this.token=data;
         this.category.getAllC(this.token.access_token).pipe(first()).subscribe(cats => {
          this.cats = cats;
      });
    });
}
}
