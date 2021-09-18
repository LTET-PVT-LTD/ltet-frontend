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
      password: new FormControl('', Validators.required),
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


          this.loginService.login().subscribe(
            (user) => {


              this.dialog.closeAll();


              this.store.dispatch(addUser({ user }));
              this.loginService.setUserInLocalStorage(user);
            },
            (error) => {

              this.store.dispatch(removeUser());
              this.dialogService.confirmDialog({color:"red",message:"Please Enter correct Email and Password"});

            }
          );
        },
        (error) => {

          this.store.dispatch(removeUser());
          // this.showSpinner= false;
          this.dialogService.confirmDialog({color:"red",message:"Please Enter correct Email and Password"});
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
          this.dialogService.confirmDialog({color:"green",message:"Your account is created successfully"});
          this.dialogRef.close();



        },
        (error) => {
          // this.showSpinner= false;
          this.dialogService.confirmDialog({color:"red",message:"Something went wrong"});
        }
      );
    }
  }
}
