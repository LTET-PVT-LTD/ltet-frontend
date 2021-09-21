import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { HomeComponent } from './component/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import { SubHeaderComponent } from './component/sub-header/sub-header.component';
import { RoomFormComponent } from './component/room-form/room-form.component';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SheetComponent } from './component/sheet/sheet.component';
import {MatListModule} from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SheetContainerComponent } from './component/sheet-container/sheet-container.component';
import { RoomContainerComponent } from './component/room-container/room-container.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { RoomCardComponent } from './component/room-card/room-card.component';
import { RoomPageComponent } from './component/room-page/room-page.component';

import { StoreModule } from '@ngrx/store';
import { user } from './reducer/user.reducer';
import { Sheet } from './reducer/sheet.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EnrollComponent } from './component/enroll/enroll.component';
import { Room } from './reducer/room.reducer';
import { UserRoom } from './reducer/user_room.reducer';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { DialogComponent } from './component/dialog/dialog.component';
import {MatIconModule} from '@angular/material/icon';
import { JoinRoomComponent } from './component/join-room/join-room.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { InviteComponent } from './component/invite/invite.component';
import { QuestionComponent } from './component/question/question.component';
import { MyLearningComponent } from './component/my-learning/my-learning.component';
import { LearningContainerComponent } from './component/learning-container/learning-container.component';
import {MatRippleModule} from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';
import { InterceptorService } from './loader/interceptor.service';
import { LandingPageComponent } from './component/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    HomeComponent,
    SubHeaderComponent,
    RoomFormComponent,
    SheetComponent,
    SheetContainerComponent,
    RoomContainerComponent,
    SideBarComponent,
    RoomCardComponent,
    RoomPageComponent,
    EnrollComponent,
    SpinnerComponent,
    DialogComponent,
    JoinRoomComponent,
    InviteComponent,
    QuestionComponent,
    MyLearningComponent,
    LearningContainerComponent,
    LandingPageComponent

  ],
  entryComponents:[LoginPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    FlexLayoutModule,
    NgbModule,
    DragDropModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    MatRippleModule,
    StoreModule.forRoot({user:user, sheet:Sheet,room:Room,userRoom:UserRoom}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })



  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:InterceptorService,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
