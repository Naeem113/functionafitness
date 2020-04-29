import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'app/dataService.service';
import { Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { workouts } from 'app/Models/WorkoutsModel';
import { levels } from 'app/Models/LevelsModel';
import { goals } from 'app/Models/GoalsModel';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css'],
})
export class WorkoutsComponent implements OnInit {
  //****************************************************************************************************************/
  //                                                     CONSTRUCTOR                                                /
  //****************************************************************************************************************/

  constructor(
    private ServiceData: LayoutService,
    private db: AngularFirestore
  ) {
    this.ServiceDataSubscription();
    this.workoutCollection = this.db.collection('Workouts');
  }

  //****************************************************************************************************************/
  //                                                       NgOnInit                                                 /
  //****************************************************************************************************************/

  ngOnInit() {
    this.WorkoutSubscription = this.ServiceData.Workouts.subscribe((res) => {
      this.Workouts = res;
      console.log(res);
    });
  }

  //****************************************************************************************************************/
  //                                                  VERIABLE DECLARATION                                          /
  //****************************************************************************************************************/

  updateContainer: boolean = false;
  AddContainer: boolean = false;
  updateitem: workouts;
  Lastupdate: Date;
  Levels: levels[] = [];
  Goals: goals[] = [];
  Workouts: workouts[] = [];
  Subscription: Subscription[] = [];
  WorkoutSubscription: Subscription;
  workoutCollection: AngularFirestoreCollection<workouts>;

  //****************************************************************************************************************/
  //                                                    ng-IF Div Fuctions                                          /
  //****************************************************************************************************************/

  CloseAddContainer() {
    this.AddContainer = false;
  }

  OpenAddContainer() {
    this.AddContainer = true;
  }
  CloseUpdateContainer() {
    this.updateContainer = false;
  }

  //****************************************************************************************************************/
  //                                                SERVICE DATA SUBSCRIPTION                                       /
  //****************************************************************************************************************/

  ServiceDataSubscription() {
    this.Subscription.push(
      this.ServiceData.Goals.subscribe((res) => {
        this.Goals = res;
        console.log(this.Goals);
      })
    );

    this.Subscription.push(
      this.ServiceData.Levels.subscribe((res) => {
        this.Levels = res;
      })
    );
  }

  //****************************************************************************************************************/
  //                                                   ADD EQUIPMENTS DATA                                          /
  //****************************************************************************************************************/

  addWorkout(data: NgForm) {
    this.Lastupdate = new Date();
    data.value['lastupdate'] = new Date();
    this.ServiceData.addData(data.value, this.workoutCollection);
    data.reset();
  }

  //****************************************************************************************************************/
  //                                                   REMOVE EQUIPMENTS DATA                                       /
  //****************************************************************************************************************/

  RemoveWorkout(item) {
    this.ServiceData.deleteData(item, this.workoutCollection);
  }

  //****************************************************************************************************************/
  //                                                  UPDATE EQUIPMENTS DATA                                        /
  //****************************************************************************************************************/

  updateWorkout(item: NgForm) {
    item.value['id'] = this.updateitem.id;
    this.ServiceData.updateData(item.value, this.workoutCollection);
    this.updateContainer = false;
  }

  UpdateSlecetedItem(item) {
    this.updateContainer = true;
    this.updateitem = item;
  }

  //****************************************************************************************************************/
  //                                                        ngOnDestroy                                             /
  //****************************************************************************************************************/

  ngOnDestroy(): void {
    this.WorkoutSubscription.unsubscribe();
    for (const iterator of this.Subscription) {
      iterator.unsubscribe();
    }
  }
}
