import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormService} from '../../form'
import firebase from 'firebase/app'
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-journal',
  templateUrl: './update-journal.component.html',
  styleUrls: ['./update-journal.component.css']
})
export class UpdateJournalComponent implements OnInit {

  constructor( public Form:FormService ,private route:Router, private snackBar:MatSnackBar,private router: ActivatedRoute) {
    this.router.params.subscribe((params) => {
      this.journal_id = params.key;})
    firebase.firestore().collection('Journals').orderBy('created_at','desc')
    .onSnapshot(res=>{
      this.journalStringList=[]
      res.forEach(list=>{    
        this.journalStringList.push(list.data())
        console.log(this.journalStringList);
        this.progressBar2=false
        this.progressBar=true
      })
    });
  }

  progressBar:boolean=false;
  progressBar2:boolean=true;
  journalStringList:any[] = [];
  journal_id:string;

  ngOnInit(): void {
    firebase.firestore()
  .collection('Journals')
  .doc(this.journal_id)
  .get()
  .then((response) => {
    let data:any = response.data();
    this.Form.updateJournal.patchValue({
      title: data.title,
    })
  });
  }

    //****************************************************************************************************************/
  //                                                  UPDATE QUOTES DATA FUNCTION                                   /
  //****************************************************************************************************************/

  updateJournal(data: any) {
    data.updated_at=new Date()
    data.journal_id = this.journal_id;

    firebase.firestore().collection('Journals').doc(this.journal_id).update(data)
    .then(()=>{
      this.route.navigate(['/journals']);
          this.snackBar.open('Successfully Update Journal String', 'close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          this.Form.updateJournal.reset()
          this.progressBar=true
    })

   
  }

  UpdateSlecetedItem(item:any) {

    this.journal_id = item.journal_id
    firebase.firestore()
  .collection('Journals')
  .doc(item.journal_id)
  .get()
  .then((response) => {
    let data:any = response.data();
    console.log(data);
    this.Form.updateJournal.patchValue({
      title: data.title,
    })
  });
 
  }

}
