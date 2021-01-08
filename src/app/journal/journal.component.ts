import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormService} from '../form'
import firebase from 'firebase/app'
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-quotes',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css'],
})
export class JournalComponent implements OnInit {
  //****************************************************************************************************************/
  //                                                     CONSTRUCTOR                                                /
  //****************************************************************************************************************/
  constructor( public Form:FormService ,private route:Router, private snackBar:MatSnackBar) {
    firebase.firestore().collection('Journals').orderBy('created_at','desc')
    .onSnapshot(res=>{
      this.journalStringList=[]
      res.forEach(list=>{    
        this.journalStringList.push(list.data())
        console.log(this.journalStringList);
        this.progressBar=true
        this.progressBar2=false
      })
    });
  }

  progressBar:boolean=false;
  progressBar2:boolean=true;
  journalStringList:any[] = [];
  //****************************************************************************************************************/
  //                                                       ngOnInIt                                                 /
  //****************************************************************************************************************/

  ngOnInit() {
    
  }


  //****************************************************************************************************************/
  //                                                 DELETE QUOTES DATA FUNCTION                                    /
  //****************************************************************************************************************/

  RemoveJournal(id:any) {
    if (confirm('Are you sure to delete this record?')) {

      firebase.firestore()
        .collection('Journals')
        .doc(id)
        .delete()
        .then((Response) => {
          this.snackBar.open('Journal String Deleted', 'close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
        });
    }
  }

}
