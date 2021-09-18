import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from '../component/dialog/dialog.component';
import { Dialog } from '../model/dialog.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog :MatDialog) { }

  confirmDialog(data : Dialog) :Observable<boolean>{
    return this.dialog.open(DialogComponent,{
      data,
      disableClose : true,
      hasBackdrop:true,
      backdropClass:"bdrop"

    }).afterClosed();
}

}
