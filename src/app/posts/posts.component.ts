import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'app/dataService.service';
import { Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { posts } from 'app/Models/PostsModel';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  //****************************************************************************************************************/
  //                                                     CONSTRUCTOR                                                /
  //****************************************************************************************************************/

  constructor(
    private ServiceData: LayoutService,
    private db: AngularFirestore
  ) {
    this.PostCollection = this.db.collection('Posts');
  }

  //****************************************************************************************************************/
  //                                                       ngOnInIt                                                 /
  //****************************************************************************************************************/

  ngOnInit() {
    this.PostSubscription = this.ServiceData.Posts.subscribe((res) => {
      this.Post = res;
    });
  }

  //****************************************************************************************************************/
  //                                                  VARIABLES DECLARATION                                         /
  //****************************************************************************************************************/

  updateContainer: boolean = false;
  AddContainer: boolean = false;
  updateitem: posts;
  Post: posts[] = [];
  PostSubscription: Subscription;
  PostCollection: AngularFirestoreCollection<posts>;

  //****************************************************************************************************************/
  //                                                      ng IF Div FUCNTIONS                                       /
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
  //                                                     ADD POST DATA FUNCTION                                     /
  //****************************************************************************************************************/

  addPost(data: NgForm) {
    this.ServiceData.addData(data.value, this.PostCollection);
    data.reset();
  }

  //****************************************************************************************************************/
  //                                                    DELETE POST DATA FUNCTION                                   /
  //****************************************************************************************************************/

  RemovePost(item) {
    this.ServiceData.deleteData(item, this.PostCollection);
  }

  //****************************************************************************************************************/
  //                                                    UPDATE POST DATA FUNCTION                                   /
  //****************************************************************************************************************/

  updatePost(item: NgForm) {
    item.value['id'] = this.updateitem.id;
    this.ServiceData.updateData(item.value, this.PostCollection);
    this.updateContainer = false;
  }

  UpdateSlecetedItem(item) {
    this.updateContainer = true;
    this.updateitem = item;
  }

  //****************************************************************************************************************/
  //                                                           ngOnDestroy                                          /
  //****************************************************************************************************************/

  ngOnDestroy(): void {
    this.PostSubscription.unsubscribe();
  }
}
