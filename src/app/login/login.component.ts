import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormService } from '../form'
import firebase from "firebase/app";
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //****************************************************************************************************************/
  //                                                    CONSTRUCTOR                                                 /
  //****************************************************************************************************************/

  constructor( public Form:FormService ,private route:Router, private snackBar:MatSnackBar) {

  }

  ngOnInit(): void {}

  //****************************************************************************************************************/
  //                                                  Login Function                                                /
  //****************************************************************************************************************/

  progressBar:boolean=false

  LoginWithEmail(user:any) {
    console.log(user);

    this.progressBar = true;
    firebase.auth().signInWithEmailAndPassword
      (user.email, user.password)
      .then((res) => {
        this.progressBar = false;
        this.route.navigate(['dashboard'])
      })
      .catch((err) => {
        this.snackBar.open(err, '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'end' });

        this.progressBar = false;
      });
}




}
