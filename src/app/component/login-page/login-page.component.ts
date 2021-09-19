import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addUser, removeUser } from 'src/app/action/user.action';
import { LoaderService } from 'src/app/loader/loader.service';
import { Cred } from 'src/app/model/crediential.model';
import { LoginResponse } from 'src/app/model/loginResponse.model';
import { User } from 'src/app/model/user.model';
import { DialogService } from 'src/app/service/dialog.service';
import { LoginServiceService } from 'src/app/service/login-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  // showSpinner=false;
  error= false;
  errorValue="";
  constructor(
    private loginService: LoginServiceService,
    private dialog: MatDialog,
    private store: Store<{ user: User }>,
    private dialogService: DialogService,
    public loaderService:LoaderService,
    private currDialog:MatDialogRef<LoginPageComponent>,
    private dialogRef:MatDialogRef<LoginPageComponent>

  ) {}


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)]),
    });
    this.loginForm.get("email")?.valueChanges.subscribe(val=>{
      this.error=false;
      this.errorValue="";
    });
    this.loginForm.get("password")?.valueChanges.subscribe(val=>{
      this.error=false;
      this.errorValue="";
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      // this.showSpinner= true;

      const cred: Cred = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.loginService.generateToken(cred).subscribe(
        (response:LoginResponse) => {

          this.loginService.doLoginUser(response);
          this.loginService.login().subscribe(
            (user) => {
              if(user.is_verified){
                this.dialog.closeAll();
                this.store.dispatch(addUser({ user }));
                this.loginService.setUserInLocalStorage(user);
              }
              else{
                this.error= true;
                this.errorValue="Please verify your email first"
              }

            },
            (error) => {
              this.store.dispatch(removeUser());
              // this.dialogService.confirmDialog({color:"red",message:"Please Enter correct Email and Password"});
              this.error= true;
              this.errorValue=error.error.detail
            }
          );
        },
        (error) => {
          console.log(error);

          this.store.dispatch(removeUser());
          // this.showSpinner= false;
          this.error= true;
          this.errorValue=error.error.detail;
        }
      );
    }
  }


  onSignUp() {
    if (this.loginForm.valid) {
      // this.showSpinner= false;


      const cred: Cred = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.loginService.signUp(cred).subscribe(
        (response) => {

          // this.showSpinner= false;
          this.dialogService.confirmDialog({color:"green",message:"Your account is created successfully",load:false});
          this.dialogRef.close();



        },
        (error) => {
          // this.showSpinner= false;
          console.log(error);
          this.error= true;
          this.errorValue=error.error.email;
        }
      );
    }
  }
}
