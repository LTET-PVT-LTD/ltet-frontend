import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './component/home/home.component';
import { LearningContainerComponent } from './component/learning-container/learning-container.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { MyLearningComponent } from './component/my-learning/my-learning.component';
import { RoomContainerComponent } from './component/room-container/room-container.component';
import { RoomPageComponent } from './component/room-page/room-page.component';
import { SheetContainerComponent } from './component/sheet-container/sheet-container.component';
import { SheetComponent } from './component/sheet/sheet.component';
import { Sheet } from './reducer/sheet.reducer';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, pathMatch: 'full' },
  {
    path: 'sheet/:id',
    component: SheetContainerComponent,
    pathMatch: 'full',
    data: Sheet,
  },
  {
    path: 'room',
    canActivate: [AuthGuard],
    component: RoomContainerComponent,
    pathMatch: 'full',
  },
  {
    path: 'room/:code',
    canActivate: [AuthGuard],
    component: RoomPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'learning',
    canActivate: [AuthGuard],
    component: MyLearningComponent,
    pathMatch: 'full',
  },
  {
    path: 'learning/:id',
    canActivate: [AuthGuard],
    component: LearningContainerComponent,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
