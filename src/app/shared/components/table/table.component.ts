// table.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild, OnInit, AfterViewInit } from '@angular/core';
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
  imports: [MaterialModule, DatePipe, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() deleteRequest = new EventEmitter<Certificate>();
  @Output() editRequest = new EventEmitter<Certificate>();
  @Output() viewRequest = new EventEmitter<Certificate>();

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
    // Verificar si hay datos
    if (!value || value.length === 0) {
      this.dataSource = new MatTableDataSource<Certificate>([]);
      return;
    }

    // Manejar el caso cuando created_at es undefined
    const sortedData = value.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
      const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    this.dataSource = new MatTableDataSource(sortedData);
    
    // Verificar si los elementos de paginación están disponibles
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    
    this.setupFilterPredicate();
  }

  ngOnInit(): void {
    // Inicialización básica
  }

  ngAfterViewInit() {
    // Es importante volver a asignar el paginator y el sort después de que las vistas estén disponibles
    setTimeout(() => {
      if (this.dataSource) {
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      }
    });
  }

  private setupFilterPredicate() {
    this.dataSource.filterPredicate = (data: Certificate, filter: string) => {
      const searchStr = (
        (data.code || '') +
        (data.studentName || '') +
        (data.documentNumber || '') +
        (data.courseName || '') +
        (data.email || '')
      ).toLowerCase();
      
      return searchStr.includes(filter.toLowerCase());
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter(input: HTMLInputElement) {
    input.value = '';
    this.dataSource.filter = '';
    
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

  onEdit(certificate: Certificate) {
    this.editRequest.emit(certificate);
  }

  onView(certificate: Certificate) {
    this.viewRequest.emit(certificate);
  }
}
