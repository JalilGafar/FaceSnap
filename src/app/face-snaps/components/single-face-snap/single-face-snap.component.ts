import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FaceSnap } from '../../../core/model/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {

  faceSnap!: FaceSnap;
  faceSnap$!: Observable<FaceSnap>
  buttonText!: string;

  constructor(private faceSnapsService: FaceSnapsService,
              private route: ActivatedRoute){}

  ngOnInit(){
    this.buttonText = 'Oh Snap !';
    const snapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(snapId);
  } 



  onChangeSnap(faceSnapId: number){
    this.buttonText === 'Oh Snap !' ? 
      ( this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, this.buttonText).pipe(
          tap(() => this.buttonText = 'Oops unSnap !')
        )        
      ) 
      :(this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, this.buttonText).pipe(
          tap(() => this.buttonText = 'Oh Snap !')
        )        
      );
  }

}
