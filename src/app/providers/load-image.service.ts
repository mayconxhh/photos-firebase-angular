import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from  'firebase';
import { FileItem } from '../models/fileItem'

@Injectable({
  providedIn: 'root'
})
export class LoadImageService {

	private ImageFolder = 'img';

  constructor( private db: AngularFirestore ) { }

  loadImagesFirebase( images:FileItem[] ){
  	const storageRef = firebase.storage().ref();

    for( const image of images ){
      image.isLoading = true;
      if (image.progress >=100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.ImageFolder}/${image.nameFile}`)
        .put( image.file );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot)  => 
                    image.progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) *100,
        ( error ) => console.log('Error al subir', error),
        () => {
          console.log('Imagen cargada correctamente');

          const thisComponent = this;

          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL:string) {
            image.isLoading = false;
            image.url = downloadURL;

            thisComponent.saveImage({
              name: image.nameFile,
              url: image.url,
              date: new Date()
            });

          });
        }

      )

    }

  }

  private saveImage(image: { name:string, url:string, date: Date } ){

  	this.db.collection(`/${this.ImageFolder}`)
  						.add( image );

  }

}
