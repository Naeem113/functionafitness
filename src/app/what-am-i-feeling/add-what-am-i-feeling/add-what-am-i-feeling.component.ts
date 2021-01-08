import { Component, OnInit } from '@angular/core';
import {FormService} from '../../form'
import firebase from 'firebase/app'
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-what-am-i-feeling',
  templateUrl: './add-what-am-i-feeling.component.html',
  styleUrls: ['./add-what-am-i-feeling.component.css']
})
export class AddWhatAmIFeelingComponent implements OnInit {

  

  constructor( public Form:FormService ,private route:Router, private snackBar:MatSnackBar,private _fb: FormBuilder) {
  
  }



  public addmore: FormGroup;
  progressBar:boolean;

  ngOnInit() {
  	this.addmore = this._fb.group({
  	  primary_emotion:['',Validators.required],
      itemRows: this._fb.array([this.initItemRows()])
    });
  }
  get formArr() {
    return this.addmore.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this._fb.group({
      secondary_emotion:['',Validators.required],
      description:['',Validators.required],

    });
  }
  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
    //****************************************************************************************************************/
  //                                                 ADD QUOTES DATA FUNCTION                                       /
  //****************************************************************************************************************/

  addJournal(data:any) {

    this.progressBar=true;
    var id = Math.random().toString(36).substring(2);

    var primary_emotion ={
      emotion_id:id,
      primary_emotion:data.primary_emotion,
      data:data.itemRows,
      created_at:new Date()
    }

    console.log(primary_emotion);
    
    firebase.firestore().collection('Emotions').doc(id).set(primary_emotion)
    .then(()=>{
      this.route.navigate(['/what-am-i-feeling']);
          this.snackBar.open('Successfully add Emotion', 'close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          this.addmore.reset()
          this.progressBar=false
    })

    

  }

}
