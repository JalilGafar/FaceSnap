import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaceSnap } from '../../../core/model/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})

export class FaceSnapComponent implements OnInit {
  
  @Input() faceSnap!: FaceSnap;
  buttonText!: string;

  constructor(private faceSnapsService: FaceSnapsService,
              private appRout : Router){}

  ngOnInit(){
    //this.buttonText = 'Oh Snap !';
  } 

  onViewFaceSnap(){
    this.appRout.navigateByUrl('facesnaps/'+ this.faceSnap.id);
  }

  onChangeSnap(){
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, this.buttonText);
   
  }
}
