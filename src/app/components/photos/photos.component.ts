import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Image { name: string; url:string; date: Date };

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styles: []
})
export class PhotosComponent implements OnInit {

	private imagesCollection: AngularFirestoreCollection<Image>;
  images: Observable<Image[]>;

  constructor(private afs: AngularFirestore) {
  	this.imagesCollection = afs.collection<Image>('img');
    this.images = this.imagesCollection.valueChanges();
  }

  ngOnInit() {
  }

}
