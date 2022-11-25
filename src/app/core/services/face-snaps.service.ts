import { Injectable } from "@angular/core";
import { FaceSnap } from "../model/face-snap.model";
import { HttpClient } from "@angular/common/http";
import { concatMap, exhaustMap, filter, map, Observable, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class FaceSnapsService {

    constructor(private http: HttpClient,
                private route: Router        
        ){

    }
    
    faceSnaps$!: Observable <FaceSnap[]> 
    ids!:number [];
    idMax!: number;
    faceSnaps: FaceSnap[] = [
        {
            id: 1,
            title: 'Archile',
            description: 'Mon Best Combi',
            imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
            createdDate: new Date(),
            //buttonText:'Oh Snap !',
            snaps: 10
          },
          {
            id: 2,
            title: 'Toto',
            description: 'Mon Best LOGO',
            imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
            createdDate: new Date(),
            //buttonText:'Oh Snap !',
            snaps: 100,
            location: 'Yaoundé'
          },
          {
            id: 3,
            title: 'Fonda',
            description: 'Mon Best Me',
            imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
            createdDate: new Date(),
            //buttonText:'Oh Snap !',
            snaps: 200
          }
    ];

    /*
    getAllFaceSnaps(): FaceSnap[] {
        return this.faceSnaps;
    };
    */
   getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
   }

    snapFaceSnapById(faceSnapId:number, snapType:string): Observable<FaceSnap> {
        //const faceSnap = this.getFaceSnapById(faceSnapId);
        //snapType === 'Oh Snap !' ? (faceSnap.snaps++ ) : (faceSnap.snaps--)
        return this.getFaceSnapById(faceSnapId).pipe(
            map(faceSnap =>({
                ...faceSnap,
                snaps: faceSnap.snaps + (snapType === 'Oh Snap !' ? 1 : -1),
            })),
            switchMap(updatedFaceSnap => this.http.put<FaceSnap>(
                `http://localhost:3000/facesnaps/${faceSnapId}`,
                updatedFaceSnap)
            )
        );
    };
    
    /*
    getFaceSnapById(faceSnapId:number): FaceSnap {
        const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id == faceSnapId)
        if (!faceSnap) {
            throw new Error('FaceSnap not found !');
        } else {
            return faceSnap;
        }
    };
    */
   getFaceSnapById (faceSnapId:number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`)
   }

   /*
    addNewFaceSnap(formValue: {title:string, description: string, imageUrl: string, location?: string}){
        const faceSnap: FaceSnap = {
            ...formValue,
            //buttonText:'Oh Snap !',
            snaps:0,
            createdDate: new Date(),
            id: this.faceSnaps[this.faceSnaps.length - 1].id + 1
        }
        this.faceSnaps.push(faceSnap);
    }
    */

    addNewFaceSnap(formValue: {title:string, description: string, imageUrl: string, location?: string}): Observable<FaceSnap>{
        return this.getAllFaceSnaps().pipe(
            map (facesnaps => [...facesnaps].sort((a,b) => a.id - b.id)),
            map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length -1]),
            map(previousFacesnap => ({
                ...formValue,
                snaps:0,
                createdDate: new Date(),
                id: previousFacesnap.id + 1
            })),
            switchMap(newFacesnap => this.http.post<FaceSnap>(
                'http://localhost:3000/facesnaps',
                newFacesnap
            ))
        );   
    }

}