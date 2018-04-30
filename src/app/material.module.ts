import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule, MatSnackBarModule, MatGridListModule, MatDividerModule, MatCardModule, MatButtonModule,
  MatSidenavModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatIconModule, MatInputModule, MatTableModule,
  MatSortModule, MatSelectModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule
  ],
  exports: [
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
