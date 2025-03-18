import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { ParameterService } from 'src/app/Services/parameter.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})

export class TasksComponent {
  filterValue: string = '';
  tasks: any = [];
  count: any = [];
  constructor(
    public httpService: HttpService,
    public parameterService: ParameterService,
  ) { }

  ngOnInit(): void {
    this.GetTask();
  }

  GetTask() {
    this.httpService.GetTasks().subscribe(
      (response) => {
        console.log('Respuesta del backend:', response);
        this.tasks = response.result.tasks;
        this.count = response.result.count;
        console.log("this.count: ", this.count);
        console.log('Tareas cargadas:', this.tasks);
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
      }
    );
  }

  applyFilter(filterValue: string) {
    //this.tableGestionBack.filter = filterValue.trim().toLowerCase();
    console.log("filterValue: ", filterValue);
  }
}
