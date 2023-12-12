import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { catchError, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CandidateService } from '../../core/services/candidate.service';
import { PositionService } from '../../core/services/position.service';
import { DialogMessageComponent } from '../../components/dialog/dialog-message/dialog-message.component';
import { ConfirmDialogComponent } from '../../components/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  
  private readonly _candidateService = inject(CandidateService);
  private readonly _positionService = inject(PositionService);
  private readonly _dialog = inject(MatDialog);

  rowData = this._candidateService.getCandidates();
  positions = toSignal(this._positionService.getPositions());

  deleteCandidate(rowData: any) {
    const { name } = rowData.data;
    const status = 'discarded candidate';
    this._candidateService.updateStatus({ name, status }).subscribe(resp => console.log('update status', resp))
  }

  commentsCandidate(rowData: any) {
    const dialogRef = this._dialog.open(DialogMessageComponent, {
      data: { comment: rowData.message }
    });
    const { name, status } = rowData;

    dialogRef.afterClosed().pipe(
      switchMap((message: string) => {
        return this._candidateService.updateMessage({ name, message, status });
      })
    ).subscribe(resp => {
      this.refreshTable();
    });
  } 

  scheduleCandidate(data: any) {
    window.open(`https://www.google.com/calendar/render?
      action=TEMPLATE
      &text=Arionkoder%20Interview
      `)
  }

  delete(position: any): void {
    const dg = this._dialog.open(ConfirmDialogComponent, {
      data: {
        entity: 'Candidate'
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
    this.rowData = this._candidateService.getCandidates();
  }
}
