import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ActionsRendererComponent } from '../../components/grids/actions-renderer/actions-renderer.component';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { CandidateService } from '../../core/services/candidate.service';
import { PositionService } from '../../core/services/position.service';
import { ProfileLinkComponent } from '../../components/grids/profile-link/profile-link.component';
import { CountryComponent } from '../../components/grids/country/country.component';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatTableModule, ActionsRendererComponent, AgGridModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  private readonly _candidateService = inject(CandidateService);
  private readonly _positionService = inject(PositionService);
  
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  
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

  rowData$ = this._candidateService.getCandidates();
  positions$ = this._positionService.getPositions();

  selectPosition(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    this.rowData$ = this._candidateService.getCandidates(selected)
  }

  handlerActions(action = '', params: any) {
    switch (action) {
      case 'delete':
        this.deleteCandidate(params.data)
        break;
      case 'info':
        this.commentsCandidate(params.data)
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

  commentsCandidate(data: any) {
    // TODO: implement this
    console.log('commentsCandidate', data)
  }

  scheduleCandidate(data: any) {
    window.open(`https://www.google.com/calendar/render?
      action=TEMPLATE
      &text=Arionkoder%20Interview
      `)
  }

  statusHandler(rowData: any) {
    const { name, status } = rowData.data;
    this._candidateService.updateStatus({ name, status }).subscribe(resp => console.log('update status', resp))
  }

  convertToYYMMDD(d: any) {
    const date = new Date(d);
    let year = date.getFullYear().toString().substr(-2);  // Get the last 2 digits of the year
    let month = (date.getMonth() + 1).toString().padStart(2, '0');  // Months are 0-based in JavaScript
    let day = date.getDate().toString().padStart(2, '0');

    return `${year}/${month}/${day}`;
  }
}
