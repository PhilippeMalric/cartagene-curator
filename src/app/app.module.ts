import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/auth';
import {AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR} from '@angular/fire/firestore';
import {AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/functions';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {EditCourseDialogComponent} from './edit-course-dialog/edit-course-dialog.component';
import {LoginComponent} from './login/login.component';
import {CoursesCardListComponent} from './courses-card-list/courses-card-list.component';
import {AppRoutingModule} from './app-routing.module';
import {CourseComponent} from './course/course.component';
import {CreateCourseComponent} from './create-course/create-course.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CreateUserComponent} from './create-user/create-user.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import { LoadCSVComponent } from './load-csv/load-csv.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { VarViewComponent } from './var-view/var-view.component';
import { VarTestComponent } from './var-test/var-test.component';
import { Svg1Component } from './svg1/svg1.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './reducers/main.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MainEffects } from './effects/main.effects';
import { DataDivComponent } from './data-div/data-div.component';
import { StreamDivComponent } from './stream-div/stream-div.component';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CourseComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    LoginComponent,
    CreateCourseComponent,
    CreateUserComponent,
    LoadCSVComponent,
    VarViewComponent,
    VarTestComponent,
    Svg1Component,
    DataDivComponent,
    StreamDivComponent
  ],
  imports: [
    MatCheckboxModule,
    MatGridListModule,
    NgxCsvParserModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    StoreModule.forRoot({ main: reducer }),
    EffectsModule.forRoot([MainEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
      { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },
      { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
      { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



