import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormService} from '../form'
import firebase from 'firebase/app'
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-what-am-i-feeling',
  templateUrl: './what-am-i-feeling.component.html',
  styleUrls: ['./what-am-i-feeling.component.css']
})
export class WhatAmIFeelingComponent implements OnInit {

  //****************************************************************************************************************/
  //                                                     CONSTRUCTOR                                                /
  //****************************************************************************************************************/
  constructor( public Form:FormService ,private route:Router, private snackBar:MatSnackBar) {
    firebase.firestore().collection('Emotions').orderBy('created_at','desc')
    .onSnapshot(res=>{
      this.emotionsList=[]
      res.forEach(list=>{    
        this.emotionsList.push(list.data())
        console.log(this.emotionsList);
        this.progressBar=true
        this.progressBar2=false
      })
    });
  }

  progressBar:boolean=false;
  progressBar2:boolean=true;
  emotionsList:any[] = [];

  //****************************************************************************************************************/
  //                                                       ngOnInIt                                                 /
  //****************************************************************************************************************/

  ngOnInit() {
    
  }


  //****************************************************************************************************************/
  //                                                 DELETE QUOTES DATA FUNCTION                                    /
  //****************************************************************************************************************/

  RemoveEmotion(id:any) {
    if (confirm('Are you sure to delete this record?')) {

      firebase.firestore()
        .collection('Emotions')
        .doc(id)
        .delete()
        .then((Response) => {
          this.snackBar.open('Emotion Deleted', 'close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
        });
    }
  }
}
