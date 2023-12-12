import { Component, Signal, ViewChild, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PositionService } from 'src/app/core/services/position.service';
import { ConfirmDialogComponent } from 'src/app/components/dialog/confirm-dialog/confirm-dialog.component';
import { catchError, of, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-job-description',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTooltipModule, EditorModule, MatIconModule, MatTableModule, MatButtonModule, ReactiveFormsModule, ConfirmDialogComponent, MatDialogModule],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.scss'
})
export class JobDescriptionComponent {

  private readonly _positionService = inject(PositionService);
  constructor(public _dialog: MatDialog) {
    // effect(() => {
    //   this.positions()
    //   console.log('effect')
    // })
  }
  
  positions$ = this._positionService.getPositions();

  jobDescriptionForm = new FormGroup({
    name: new FormControl('', { validators: Validators.required }),
    description: new FormControl('', { validators: Validators.required }),
    identifier: new FormControl(''),

  });
  openEditor = false;


  save() {
    if (this.jobDescriptionForm.valid) {
      const { name, description, identifier } = this.jobDescriptionForm.value;
      
      const sub = identifier
        ? this._positionService.updatePosition(<string>name, <string>description, <string>identifier)
        : this._positionService.createPosition(<string>name, <string>description)
      
      sub.subscribe(result => {
        this.refreshTable();
        this.jobDescriptionForm.reset();
        this.openEditor = false;
      })
    }
  }

  cancel() {
    this.openEditor = false;
    this.jobDescriptionForm.reset();
  }

  add() {
    this.openEditor = true;
  }

  edit(position: any) {
    this.openEditor = true;
    this.jobDescriptionForm.patchValue({
      name: position.name,
      description: position.description,
      identifier: position.identifier
    })
  }

  delete(position: any): void {
    const dg = this._dialog.open(ConfirmDialogComponent, {
      data: {
        entity: 'Position'
      }
    });


    dg.afterClosed().pipe(
      switchMap(response => {
        return response 
          ? this._positionService.deletePosition(position.identifier)
          : of(null)
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        return of(null);
      })
    ).subscribe(res => {
      this.refreshTable();
    });
  }

  refreshTable() {
    this.positions$ = this._positionService.getPositions();
  }


}
