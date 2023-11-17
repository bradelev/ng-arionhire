import { Component, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActionsRendererComponent } from '../../components/grids/actions-renderer/actions-renderer.component';
import { CandidateService } from '../../core/services/candidate.service';
import { PositionService } from '../../core/services/position.service';
import { ProfileLinkComponent } from '../../components/grids/profile-link/profile-link.component';
import { CountryComponent } from '../../components/grids/country/country.component';
import { DialogMessageComponent } from '../../components/dialog/dialog-message/dialog-message.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatTableModule, ActionsRendererComponent, AgGridModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  private readonly _candidateService = inject(CandidateService);
  private readonly _positionService = inject(PositionService);
  private readonly _dialog = inject(MatDialog);
  
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  private gridApi!: GridApi<any>;
  
  context = { dashboard: this };
  columnDefs: ColDef[] = [
    { 
      field: 'name',
      cellRenderer: ProfileLinkComponent
    },
    { 
      field: 'country',
      width: 100,
      cellRenderer: CountryComponent
    },
    {
      field: 'years_experience',
      headerName: 'Years of Experience'
    },
    {
      field: 'company',
      filter: 'agTextColumnFilter'
    },
    { 
      editable: true,
      field: 'status',
      width: 150,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [
          'contacted',
          'said no',
          'said yes (interview)',
          'had questions',
          'positive interview',
          'negative interview',
          'discarded candidate'
        ]
      },
      filter: 'agTextColumnFilter',
      onCellValueChanged: (rowData) => this.statusHandler(rowData)
    },
    {
      field: 'last_update',
      filter: 'agTextColumnFilter',
      headerName: 'Last updated',
      width: 150,
      valueFormatter: (data) => this.convertToYYMMDD(data.value)
    },
    { field: 'actions', cellRenderer: ActionsRendererComponent },
  ];

  rowData = toSignal(this._candidateService.getCandidates());
  positions = toSignal(this._positionService.getPositions());

  selectPosition(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    this.rowData = toSignal(this._candidateService.getCandidates(selected));
  }

  handlerActions(action = '', params: any) {
    switch (action) {
      case 'delete':
        this.deleteCandidate(params.data)
        break;
      case 'info':
        this.commentsCandidate(params)
        break;
      case 'schedule':
        this.scheduleCandidate(params.data)
        break;
      default:
        break;
    }
  }

  deleteCandidate(rowData: any) {
    const { name } = rowData.data;
    const status = 'discarded candidate';
    this._candidateService.updateStatus({ name, status }).subscribe(resp => console.log('update status', resp))
  }

  commentsCandidate(rowData: any) {
    const dialogRef = this._dialog.open(DialogMessageComponent, {
      data: { comment: rowData.data.message }
    });
    const { name, status } = rowData.data;

    dialogRef.afterClosed().pipe(
      switchMap((message: string) => {
        return this._candidateService.updateMessage({ name, message, status });
      })
    ).subscribe(resp => {
      const rowNode = this.gridApi.getRowNode(rowData.node.id)
      rowNode?.setData({ ...rowData.data, message: resp.message})
    });
  } 

  scheduleCandidate(data: any) {
    window.open(`https://www.google.com/calendar/render?
      action=TEMPLATE
      &text=Arionkoder%20Interview
      `)
  }

  statusHandler(rowData: any) {
    const { name, status } = rowData.data;
    this._candidateService.updateStatus({ name, status }).subscribe(resp => {
      const rowNode = this.gridApi.getRowNode(rowData.node.id)
      rowNode?.setDataValue('status', status);
    })
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }

  convertToYYMMDD(d: any) {
    const date = new Date(d);
    let year = date.getFullYear().toString().substr(-2);  // Get the last 2 digits of the year
    let month = (date.getMonth() + 1).toString().padStart(2, '0');  // Months are 0-based in JavaScript
    let day = date.getDate().toString().padStart(2, '0');

    return `${year}/${month}/${day}`;
  }
}
