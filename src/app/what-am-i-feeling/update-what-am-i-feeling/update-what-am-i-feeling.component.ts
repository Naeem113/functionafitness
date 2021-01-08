import { Component, OnInit } from '@angular/core';
import {FormService} from '../../form'
import firebase from 'firebase/app'
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-update-what-am-i-feeling',
  templateUrl: './update-what-am-i-feeling.component.html',
  styleUrls: ['./update-what-am-i-feeling.component.css']
})
export class UpdateWhatAmIFeelingComponent implements OnInit {


  constructor( public Form:FormService ,private route:Router, private snackBar:MatSnackBar,private router: ActivatedRoute,private _fb:FormBuilder) {
    this.progressBar2=true
    this.router.params.subscribe((params) => {
      this.emotion_id = params.key;})
  }



  public addmore: FormGroup;
  progressBar:boolean;
  progressBar2:boolean;
  progressBar3:boolean;


  EmotionData:any;
  emotion_id: any;
  ngOnInit() {
    this.progressBar=false
  	this.addmore = this._fb.group({
  	  primary_emotion:['',Validators.required],
      itemRows: this._fb.array([this.initItemRows()])
    });
    firebase.firestore()
  .collection('Emotions')
  .doc(this.emotion_id)
  .get()
  .then((response) => {
    let data:any = response.data();
    this.EmotionData = data;
    console.log(data);
    for (let line = 1; line < data.data.length; line++){
      this.formArr.push(this.initItemRows())
    }
    this.addmore.patchValue({
      primary_emotion: data.primary_emotion,
      itemRows:data.data
    })
    this.progressBar=true
    this.progressBar2=false

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

  updateEmotion(data:any) {

    this.progressBar3=true;
    var id = Math.random().toString(36).substring(2);

    var primary_emotion ={
      emotion_id:this.emotion_id,
      primary_emotion:data.primary_emotion,
      data:data.itemRows,
      created_at:new Date()
    }

    console.log(primary_emotion);
    firebase.firestore().collection('Emotions').doc(this.emotion_id).update(primary_emotion)
    .then(()=>{
      this.route.navigate(['/what-am-i-feeling']);
          this.snackBar.open('Successfully Update Emotion', 'close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          this.addmore.reset()
          this.progressBar3=false
    })

    

  }


}
