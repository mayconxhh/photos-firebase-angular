import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/fileItem';
import { LoadImageService } from '../../providers/load-image.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: []
})
export class LoadComponent implements OnInit {

  isAboutBox:boolean = false;

	files:FileItem[] = [];

  constructor( public _loadImage:LoadImageService ) { }

  ngOnInit() {
  }

  loadImages(){
  	this._loadImage.loadImagesFirebase( this.files );
  }

  cleanFiles(){
    this.files = [];
  }

}
