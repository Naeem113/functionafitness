import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { LayoutService } from 'app/dataService.service';
import { exercises } from 'app/Models/ExercisesModel';
import { equipment } from 'app/Models/EquipmentModel';
import { bodyparts } from 'app/Models/BodypartsModel';
import { levels } from 'app/Models/LevelsModel';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  //****************************************************************************************************************/
  //                                                        CONSTRUCTOR                                             /
  //****************************************************************************************************************/

  constructor(
    private ServiceData: LayoutService,
    private db: AngularFirestore
  ) {
    this.ExercisesCollection = this.db.collection('Exercises');
  }

  //****************************************************************************************************************/
  //                                                          ngOnInIt                                              /
  //****************************************************************************************************************/

  ngOnInit() {
    this.ServiceDataSubscription();
  }

  //****************************************************************************************************************/
  //                                           VRIABLES DECLARATION FOR EXERCISE FORM                               /
  //****************************************************************************************************************/

  updateContainer: boolean = false;
  AddContainer: boolean = false;
  updateitem: exercises;
  Levels: levels[] = [];
  Bodyparts: bodyparts[] = [];
  Equipments: equipment[] = [];

  //****************************************************************************************************************/
  //                                                       ng IF Div FUNCTION                                       /
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
  //                                                     VARIABLES DECLARATION                                      /
  //****************************************************************************************************************/

  Exercises: exercises[] = [];
  Subscription: Subscription[] = [];
  ExercisesCollection: AngularFirestoreCollection<exercises>;

  //****************************************************************************************************************/
  //                                                  ADD EXERCISES DATA FUNCTION                                   /
  //****************************************************************************************************************/

  addExercise(data: NgForm) {
    console.log(data.value);

    this.ServiceData.addData(data.value, this.ExercisesCollection);
    data.reset();
  }

  //****************************************************************************************************************/
  //                                               REMOVE EXERCISES DATA FUNCTION                                   /
  //****************************************************************************************************************/

  RemoveExercise(item) {
    this.ServiceData.deleteData(item, this.ExercisesCollection);
  }

  //****************************************************************************************************************/
  //                                                SERVICE DATA SUBSCRIPTION                                       /
  //****************************************************************************************************************/

  ServiceDataSubscription() {
    this.Subscription.push(
      this.ServiceData.Exercises.subscribe((exer) => {
        this.Exercises = exer;
        console.log(this.Exercises);
      })
    );

    this.Subscription.push(
      this.ServiceData.Equipments.subscribe((res) => {
        this.Equipments = res;
      })
    );

    this.Subscription.push(
      this.ServiceData.Bodyparts.subscribe((res) => {
        this.Bodyparts = res;
      })
    );

    this.Subscription.push(
      this.ServiceData.Levels.subscribe((res) => {
        this.Levels = res;
      })
    );
  }

  //****************************************************************************************************************/
  //                                               UPDATE EXERCISES DATA FUNCTION                                   /
  //****************************************************************************************************************/

  updateExercise(item: NgForm) {
    item.value['id'] = this.updateitem.id;
    this.ServiceData.updateData(item.value, this.ExercisesCollection);
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
    for (const iterator of this.Subscription) {
      iterator.unsubscribe();
    }
  }
}
