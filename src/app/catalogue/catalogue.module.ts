import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
;
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { RacineComponent } from './racine/racine.component';

@NgModule({
  declarations: [

    RacineComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CatalogueRoutingModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  entryComponents: [ ]
})
export class CatalogueModule {}
