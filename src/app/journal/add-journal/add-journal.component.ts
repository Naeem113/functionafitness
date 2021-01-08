import { Component, OnInit } from '@angular/core';
import {FormService} from '../../form'
import firebase from 'firebase/app'
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.css']
})
export class AddJournalComponent implements OnInit {

  constructor( public Form:FormService ,private route:Router, private snackBar:MatSnackBar) {
    
  }

  progressBar:boolean=false
  ngOnInit(): void {
  }

    //****************************************************************************************************************/
  //                                                 ADD QUOTES DATA FUNCTION                                       /
  //****************************************************************************************************************/

  addJournal(data:any) {
    console.log(data);
    var id = Math.random().toString(36).substring(2);
    data.created_at=new Date()
    data.journal_id = id;

    firebase.firestore().collection('Journals').doc(id).set(data)
    .then(()=>{
      this.route.navigate(['/journals']);
          this.snackBar.open('Successfully add Journal String', 'close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          this.Form.addJournal.reset()
          this.progressBar=true
    })

    

  }

}
