import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { Certificate } from '../../../core/models/certificate';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
@Component({
  selector: 'app-table',
  imports: [MaterialModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() set data(value: Certificate[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setupFilterPredicate();

    // Configurar el filtrado personalizado
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

  @Output() deleteRequest = new EventEmitter<Certificate>();
  @Output() editRequest = new EventEmitter<Certificate>();

  displayedColumns: string[] = [
    'code',
    'studentName',
    'documentType',
    'documentNumber',
    'courseName',
    'hours',
    'email',
    'created_at',
    'actions'
  ];

  dataSource: MatTableDataSource<Certificate>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Certificate>([]);
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


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(certificate: Certificate) {
    // Implementar lógica de edición
    console.log('Edit:', certificate);
  }

  onDelete(certificate: Certificate) {
    // Mostrar diálogo de confirmación
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

  onView(certificate: Certificate) {
    // Implementar lógica de visualización
    console.log('View:', certificate);
  }

  onDownload(certificate: Certificate) {
    // Implementar lógica de descarga
    console.log('Download:', certificate);
  }
}
