import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ActionsRendererComponent } from '../../components/grids/actions-renderer/actions-renderer.component';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { CandidateService } from '../../core/services/candidate.service';
import { PositionService } from '../../core/services/position.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatTableModule, ActionsRendererComponent, AgGridModule],
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
      filter: 'agTextColumnFilter'
    },
    { field: 'country',
      filter: 'agTextColumnFilter'
    },
    { field: 'years_experience' },
    {
      field: 'company',
      filter: 'agTextColumnFilter'
    },
    { 
      editable: true,
      field: 'status',
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
    { field: 'actions', cellRenderer: ActionsRendererComponent },
  ];

  rowData$ = this._candidateService.getCandidates();
  positions$ = this._positionService.getPositions();

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

  deleteCandidate(data: any) {
    // TODO: implement this
    console.log('deleteCandidate', data)
  }

  commentsCandidate(data: any) {
    // TODO: implement this
    console.log('commentsCandidate', data)
  }

  scheduleCandidate(data: any) {
    // TODO: implement this
    console.log('scheduleCandidate', data)
  }

  statusHandler(rowData: any) {
    const { name, status } = rowData.data;
    this._candidateService.updateStatus({ name, status }).subscribe(resp => console.log('update status', resp))
  }
}
