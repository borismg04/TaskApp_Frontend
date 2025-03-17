import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//angular material-modulos
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';

//componentes
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCardModule
  ],
  exports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressBarModule,
    SpinnerComponent,
    MatCardModule
  ]
})
export class SharedModule { }
