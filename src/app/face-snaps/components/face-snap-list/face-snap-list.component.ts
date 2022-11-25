import { Component, OnInit, OnDestroy } from '@angular/core';
import { FaceSnap } from '../../../core/model/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { interval, Observable, Subject } from 'rxjs';
import { tap, take, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {

  //faceSnaps!: FaceSnap[];

  faceSnaps$!: Observable<FaceSnap[]>;

  private destroy$!: Subject<boolean>

  constructor(private faceSnapsService: FaceSnapsService) {}
  
  ngOnInit() {
    this.destroy$ = new Subject<boolean>();
    interval(1000).pipe(
      //take(3),
     // tap(console.log),
      takeUntil(this.destroy$)
    ).subscribe();
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();
  };

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
