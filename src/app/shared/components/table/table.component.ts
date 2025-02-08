// table.component.ts
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Certificate } from '../../../core/models/certificate';
import { MaterialModule } from '../../material.module';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [MaterialModule, DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() deleteRequest = new EventEmitter<Certificate>();
  @Output() editRequest = new EventEmitter<Certificate>();

  displayedColumns: string[] = [
    'code',
    'studentName',
    'documentNumber',
    'courseName',
    'hours',
    'email',
    'created_at',
    'actions'
  ];

  dataSource: MatTableDataSource<Certificate>;

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Certificate>([]);
  }

  @Input() set data(value: Certificate[]) {
    // Manejar el caso cuando created_at es undefined
    const sortedData = value.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
      const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    this.dataSource = new MatTableDataSource(sortedData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setupFilterPredicate();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private setupFilterPredicate() {
    this.dataSource.filterPredicate = (data: Certificate, filter: string) => {
      const searchStr = (
        data.code +
        data.studentName +
        data.documentNumber +
        data.courseName +
        data.email
      ).toLowerCase();
      return searchStr.indexOf(filter.toLowerCase()) !== -1;
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(certificate: Certificate) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      width: '350px',
      data: certificate.studentName
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRequest.emit(certificate);
      }
    });
  }
}
