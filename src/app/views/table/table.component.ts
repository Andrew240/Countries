import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { FILTERS } from '@shared/country/country';
import { Subject } from 'rxjs';

// Services
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  public countries: Array<any> = [];
  public data: Array<any> = [];
  public string_value: string = '';
  public array_values: Array<string> = [];
  public filters: Array<any> = [];
  public selectedFilter: any;

  constructor(
    private api: ApiService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [[10, 50, 100, 250], [10, 50, 100, 250]],
      dom: "<'row'<'col-lg-6 col-md-6 col-sm-6 col-12'l><'col-lg-6 col-md-6 col-sm-6 col-12'f>>" +
          "<'row'<'col-12'tr>>" +
          "<'row'<'col-lg-3 col-12'i><'col-lg-9 col-12'p>>",
      responsive: true,
      /* below is the relevant part, e.g. translated to spanish */
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ elementos",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      }
    };
    // Set filter types
    for (let index in FILTERS['types']) {
      let object = FILTERS['types'][index];
      this.filters.push({
        label: object['label'],
        value: object['value']
      });
    }
    this.getAllCountries();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  // Get all countries
  getAllCountries() {
    this.api.getAll().subscribe((resp: any) => {
      this.countries = this.data = resp;
      this.rerender();
    });
  }

  // Set string value
  search(event: any) {
    this.string_value = event;
  }

  // Set select filter
  select(event: any) {
    this.string_value = "";
    this.selectedFilter = event;
    if (this.selectedFilter == null) {
      this.resetCountries();
    }
  }

  // Get country by specific filter
  searchByFilter(event: string, filter: string) {
    // Set value and remove white spaces
    let string_value = event.replace(/\s/g, '');
    if (string_value && filter) {
      if (filter == 'name') {
        this.api.getByName(string_value).subscribe((resp: any) => {
          this.countries = resp;
          this.rerender();
          this.showSuccess();
        },
          error => {
            console.log(error);
            this.countries = [];
            this.rerender();
            this.showWarning();
          });
      }
      if (filter == 'full_name') {
        this.api.getByFullName(string_value).subscribe((resp: any) => {
          this.countries = resp;
          this.rerender();
          this.showSuccess();
        },
          error => {
            console.log(error);
            this.countries = [];
            this.rerender();
            this.showWarning();
          });
      }
      if (filter == 'code') {
        this.api.getByCode(string_value).subscribe((resp: any) => {
          this.countries = resp;
          this.rerender();
          this.showSuccess();
        },
          error => {
            console.log(error);
            this.countries = [];
            this.rerender();
            this.showWarning();
          });
      }
      if (filter == 'code_list') {
        let code_list: Array<string> = string_value.split(',');
        this.api.getByCodeList(code_list).subscribe((resp: any) => {
          this.countries = resp;
          this.rerender();
          this.showSuccess();
        },
          error => {
            console.log(error);
            this.countries = [];
            this.rerender();
            this.showWarning();
          });
      }
      if (filter == 'currency') {
        this.api.getByCurrency(string_value).subscribe((resp: any) => {
          this.countries = resp;
          this.rerender();
          this.showSuccess();
        },
          error => {
            console.log(error);
            this.countries = [];
            this.rerender();
            this.showWarning();
          });
      }
      if (filter == 'language') {
        this.api.getByLanguage(string_value).subscribe((resp: any) => {
          this.countries = resp;
          this.rerender();
          this.showSuccess();
        },
          error => {
            console.log(error);
            this.countries = [];
            this.rerender();
            this.showWarning();
          });
      }
      if (filter == 'translation') {
        this.api.getByTranslation(string_value).subscribe((resp: any) => {
          this.countries = resp;
          this.rerender();
          this.showSuccess();
        },
          error => {
            console.log(error);
            this.countries = [];
            this.rerender();
            this.showWarning();
          });
      }
      if (filter == 'capital') {
        this.api.getByCapital(string_value).subscribe((resp: any) => {
          this.countries = resp;
          this.rerender();
          this.showSuccess();
        },
          error => {
            console.log(error);
            this.countries = [];
            this.rerender();
            this.showWarning();
          });
      }
      if (filter == 'region') {
        this.api.getByRegion(string_value).subscribe((resp: any) => {
          this.countries = resp;
          this.rerender();
          this.showSuccess();
        },
          error => {
            console.log(error);
            this.countries = [];
            this.rerender();
            this.showWarning();
          });
      }
      if (filter == 'subregion') {
        this.api.getBySubregion(string_value).subscribe((resp: any) => {
          this.countries = resp;
          this.rerender();
          this.showSuccess();
        },
          error => {
            console.log(error);
            this.countries = [];
            this.rerender();
            this.showWarning();
          });
      }
      if (filter == 'demonym') {
        this.api.getByDemonym(string_value).subscribe((resp: any) => {
          this.countries = resp;
          this.rerender();
          this.showSuccess();
        },
          error => {
            console.log(error);
            this.countries = [];
            this.rerender();
            this.showWarning();
          });
      }
    }
    else {
      this.showInfo();
      this.resetCountries();
    }
  }

  // Success message
  showSuccess() {
    this.toastr.success('Se encontraron datos', 'Consulta exitosa!', {
      timeOut: 3000,
      positionClass: 'toast-top-center'
    });
  }

  // Warning message
  showWarning() {
    this.toastr.warning('No se encontraron datos', 'Consulta erronea!', {
      timeOut: 3000,
      positionClass: 'toast-top-center'
    });
  }

  // Info message
  showInfo() {
    this.toastr.info('No puede ir vacio', 'Consulta erronea!', {
      timeOut: 3000,
      positionClass: 'toast-top-center'
    });
  }

  // Reset countries list
  resetCountries() {
    this.string_value = "";
    this.countries = this.data;
    this.rerender();
  }

}
