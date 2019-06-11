import { Directive, EventEmitter, ElementRef,
		HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/fileItem';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
	@Input() files:FileItem[] = [];

	@Output() mouseAbout: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event:any ){
  	this.mouseAbout.emit(true)
  	this._preventStop( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event:any ){
  	this.mouseAbout.emit(false)
  }

  @HostListener('drop', ['$event'])
  public onDrop( event:any ){

  	const transfer = this._getTransfer( event );

  	if (!transfer) {
  		return;
  	}

  	this._extractFiles( transfer.files );

  	this._preventStop( event );

  	this.mouseAbout.emit(false);
  }

  private _getTransfer( ev:any ){
  	return ev.dataTransfer ? ev.dataTransfer : ev.originalEvent.dataTransfer;
  }

  private _extractFiles( fileList: FileList ){

  	for( const property in Object.getOwnPropertyNames( fileList )){

  		const temporalFile = fileList[property];

  		if (this._fileCanLoad( temporalFile )) {
  			const newFile = new FileItem( temporalFile );
  			this.files.push(newFile);
  		}

  	}

  }

  // Validations
  private _fileCanLoad( file:File ):boolean {

  	if (!this._fileDropped( file.name ) && this._isImage( file.type )) {  		
  		return true;
  	} else {
  		return false;
  	}

  }

  private _preventStop( ev ){
  	ev.preventDefault();
  	ev.stopPropagation();
  }

  private _fileDropped( fileName:string ):boolean {
  	for (let file of this.files ) {
  		if (file.nameFile == fileName) {
  			console.log('Nombre de Archivo: '+fileName + ' ya existe.')
  			return true;
  		}

  		return false;
  	}
  }

  private _isImage( typeFile:string ):boolean {
  	return ( typeFile === '' || typeFile === undefined ) ? false : typeFile.startsWith('image');
  }

}
