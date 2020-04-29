import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'app/dataService.service';

import { Subscription } from 'rxjs';
import { quotes } from 'app/Models/QuotesModel';
import { equipment } from 'app/Models/EquipmentModel';
import { exercises } from 'app/Models/ExercisesModel';
import { bodyparts } from 'app/Models/BodypartsModel';
import { levels } from 'app/Models/LevelsModel';
import { workouts } from 'app/Models/WorkoutsModel';
import { goals } from 'app/Models/GoalsModel';
import { posts } from 'app/Models/PostsModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  //****************************************************************************************************************/
  //                                                        CONSTRUCTOR                                             /
  //****************************************************************************************************************/

  constructor(private ServiceData: LayoutService) {}

  //****************************************************************************************************************/
  //                                                         ngOnInIt                                               /
  //****************************************************************************************************************/

  ngOnInit() {
    this.ServiceDataSubscription();
  }

  //****************************************************************************************************************/
  //                                                   VARIABLES DECLARATION                                        /
  //****************************************************************************************************************/

  Posts: posts[] = [];
  Goals: goals[] = [];
  Workouts: workouts[] = [];
  Levels: levels[] = [];
  Bodyparts: bodyparts[] = [];
  Equipment: equipment[] = [];
  EquipmentTable: equipment[] = [];
  Exercises: exercises[] = [];
  Quotes: quotes[] = [];
  Quotestable: quotes[] = [];
  Subscription: Subscription[] = [];

  //****************************************************************************************************************/
  //                                             SERVICES DATA SUBSCRIPTION FUNCTION                                /
  //****************************************************************************************************************/

  ServiceDataSubscription() {
    this.Subscription.push(
      this.ServiceData.Equipments.subscribe((res) => {
        this.Equipment = res;
        if (res.length < 4) {
          this.EquipmentTable = this.Equipment;
        } else {
          for (let index = 0; index < 4; index++) {
            this.EquipmentTable.push(res[index]);
          }
        }
      })
    );

    this.Subscription.push(
      this.ServiceData.Quotes.subscribe((res) => {
        this.Quotes = res;
        if (res.length < 4) {
          this.Quotestable = this.Quotes;
        } else {
          for (let index = 0; index < 3; index++) {
            this.Quotestable.push(res[index]);
          }
        }
      })
    );

    this.Subscription.push(
      this.ServiceData.Exercises.subscribe((res) => {
        this.Exercises = res;
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

    this.Subscription.push(
      this.ServiceData.Workouts.subscribe((res) => {
        this.Workouts = res;
      })
    );

    this.Subscription.push(
      this.ServiceData.Goals.subscribe((res) => {
        this.Goals = res;
      })
    );

    this.Subscription.push(
      this.ServiceData.Posts.subscribe((res) => {
        this.Posts = res;
      })
    );
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
