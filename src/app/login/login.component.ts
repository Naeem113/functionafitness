import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { LayoutService } from 'app/dataService.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //****************************************************************************************************************/
  //                                                    CONSTRUCTOR                                                 /
  //****************************************************************************************************************/

  constructor(
    private afauth: AngularFireAuth,
    private router: Router,
    private Serivce: LayoutService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {}

  //****************************************************************************************************************/
  //                                                  Login Function                                                /
  //****************************************************************************************************************/

  Login(form: NgForm) {
    // this.afauth.auth
    //   .createUserWithEmailAndPassword(form.value.email, form.value.password)
    //   .then((res) => {
    //     console.log(res);
    //     this.db.collection('users').doc(res.user.uid).set({
    //       username: 'naeem',
    //       password: 'naeem',
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    this.afauth.auth
      .signInWithEmailAndPassword(form.value.email, form.value.password)
      .then((res) => {
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {
        this.logInValidation(err.message, form.value);
      });
  }

  //****************************************************************************************************************/
  //                                        Login From Validation Function                                          /
  //****************************************************************************************************************/
  signup(form: NgForm) {
    this.afauth.auth
      .createUserWithEmailAndPassword(form.value.email, form.value.password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logInValidation(error, data) {
    if (data.email === '' && data.password === '') {
      this.Serivce.showNotification(
        'bottom',
        'left',
        'Email & Password must be required...'
      );
    } else {
      if (error.includes('email')) {
        this.Serivce.showNotification(
          'bottom',
          'left',
          'Please use valid email...'
        );
      } else {
        if (error.includes('no user')) {
          this.Serivce.showNotification(
            'bottom',
            'left',
            'please use valid email...'
          );
        } else {
          if (error.includes('password is invalid')) {
            this.Serivce.showNotification(
              'bottom',
              'left',
              'Please use valid password'
            );
          }
        }
      }
    }
  }
}
