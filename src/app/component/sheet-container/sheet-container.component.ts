import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Sheet } from 'src/app/model/sheet.model';

@Component({
  selector: 'app-sheet-container',
  templateUrl: './sheet-container.component.html',
  styleUrls: ['./sheet-container.component.scss'],
  animations: [
    trigger('rightToLeft', [
      transition(':enter', [
        query(
          ':enter',
          [
            style({ transform: 'translateX(100%)' }),
            stagger('300ms', [
              animate('500ms ease', style({ transform: 'translateX(0)' })),
            ]),
          ],{optional:true}
        ),
      ]),
    ]),
  ],

})
export class SheetContainerComponent implements OnInit {
  sheetId!: number;
  sheet!: Sheet;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ sheet: Sheet[] }>,
    private router: Router
  ) {
    
    let currSheet = this.router.getCurrentNavigation()?.extras.state;
    this.sheet = {
      sheet_name: currSheet?.sheet_name,
      id: currSheet?.id,
      questions: currSheet?.questions,
      sheet_description: currSheet?.sheet_description,
      enrolled_users_count: currSheet?.enrolled_user_count,
      enrolled_users: currSheet?.enrolled_users,
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.sheetId = param.id;
    });
  }
}
