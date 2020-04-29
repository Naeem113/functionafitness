import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'app/dataService.service';
import { Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { levels } from 'app/Models/LevelsModel';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css'],
})
export class LevelsComponent implements OnInit {
  //****************************************************************************************************************/
  //                                                          CONSTRUCTOR                                           /
  //****************************************************************************************************************/

  constructor(
    private ServiceData: LayoutService,
    private db: AngularFirestore
  ) {
    this.LevelsCollection = this.db.collection('Levels');
  }

  //****************************************************************************************************************/
  //                                                         ngOnInIt                                               /
  //****************************************************************************************************************/

  ngOnInit() {
    this.LevelsSubscription = this.ServiceData.Levels.subscribe((res) => {
      this.Levels = res;
    });
  }

  //****************************************************************************************************************/
  //                                                    VARIABLES DECLARATION                                       /
  //****************************************************************************************************************/

  updateContainer: boolean = false;
  AddContainer: boolean = false;
  updateitem: levels;
  Levels: levels[] = [];
  LevelsSubscription: Subscription;
  LevelsCollection: AngularFirestoreCollection<levels>;

  //****************************************************************************************************************/
  //                                                    ng IF Div FUNCTIONS                                         /
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
  //                                                     ADD LEVELS DATA FUNCTION                                   /
  //****************************************************************************************************************/

  addLevels(data: NgForm) {
    this.ServiceData.addData(data.value, this.LevelsCollection);
    data.reset();
  }

  //****************************************************************************************************************/
  //                                                   DELETE LEVELS DATA FUNCTION                                  /
  //****************************************************************************************************************/

  RemoveLevels(item) {
    this.ServiceData.deleteData(item, this.LevelsCollection);
  }

  //****************************************************************************************************************/
  //                                                  UPDATE LEVELS DATA FUNCTION                                   /
  //****************************************************************************************************************/

  updateLevels(item: NgForm) {
    item.value['id'] = this.updateitem.id;
    this.ServiceData.updateData(item.value, this.LevelsCollection);
    this.updateContainer = false;
  }

  UpdateSlecetedItem(item) {
    this.updateContainer = true;
    this.updateitem = item;
  }

  //****************************************************************************************************************/
  //                                                          ngOnDestroy                                           /
  //****************************************************************************************************************/

  ngOnDestroy(): void {
    this.LevelsSubscription.unsubscribe();
  }
}
