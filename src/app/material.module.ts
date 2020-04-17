import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    entryComponents: [],
    declarations: [],
    imports: [
        CommonModule,
        MatInputModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatSelectModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatToolbarModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatSelectModule,
        MatProgressSpinnerModule
    ]
})
export class MaterialModule { }
