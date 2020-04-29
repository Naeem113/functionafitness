import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'app/dataService.service';
import { Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { quotes } from 'app/Models/QuotesModel';
declare var $: any;

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent implements OnInit {
  //****************************************************************************************************************/
  //                                                     CONSTRUCTOR                                                /
  //****************************************************************************************************************/

  constructor(
    private ServiceData: LayoutService,
    private db: AngularFirestore
  ) {
    this.QuotesCollection = this.db.collection('Quotes');
  }

  //****************************************************************************************************************/
  //                                                       ngOnInIt                                                 /
  //****************************************************************************************************************/

  ngOnInit() {
    this.QuotesSubscription = this.ServiceData.Quotes.subscribe((equip) => {
      this.Quotes = equip;
    });
  }

  //****************************************************************************************************************/
  //                                                  VARIABLE DECLARATION                                          /
  //****************************************************************************************************************/

  updateContainer: boolean = false;
  AddContainer: boolean = false;
  updateitem: quotes;
  Quotes: quotes[] = [];
  QuotesSubscription: Subscription;
  QuotesCollection: AngularFirestoreCollection<quotes>;

  //****************************************************************************************************************/
  //                                                     ng IF Div FUNCTIONS                                        /
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
  //                                                 ADD QUOTES DATA FUNCTION                                       /
  //****************************************************************************************************************/

  addQuote(data: NgForm) {
    this.ServiceData.addData(data.value, this.QuotesCollection);
    data.reset();
  }

  //****************************************************************************************************************/
  //                                                 DELETE QUOTES DATA FUNCTION                                    /
  //****************************************************************************************************************/

  RemoveQuote(item) {
    this.ServiceData.deleteData(item, this.QuotesCollection);
  }

  //****************************************************************************************************************/
  //                                                  UPDATE QUOTES DATA FUNCTION                                   /
  //****************************************************************************************************************/

  updateQuotes(item: NgForm) {
    item.value['id'] = this.updateitem.id;
    this.ServiceData.updateData(item.value, this.QuotesCollection);
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
    this.QuotesSubscription.unsubscribe();
  }
}
