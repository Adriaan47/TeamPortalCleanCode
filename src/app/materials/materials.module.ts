<<<<<<< HEAD
=======

>>>>>>> 5aa587f100cacf2b8ceaee1313c4788c669993a7
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatDialogModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatSortModule,
    Material.MatPaginatorModule,
  ],
  exports: [
    Material.MatDatepickerModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatDialogModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatSortModule,
    Material.MatPaginatorModule,
  ]
})
export class MaterialsModule {}
