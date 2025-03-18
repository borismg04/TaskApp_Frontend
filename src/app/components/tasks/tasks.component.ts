import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { ParameterService } from 'src/app/Services/parameter.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})

export class TasksComponent {
  tasks: any[] = [];
  allTasks: any[] = [];
  filterValue: string = '';
  count: any;

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
        this.allTasks = response.result.tasks; // guardamos la copia original
        this.tasks = [...this.allTasks]; // mostramos todos inicialmente
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
    const filter = filterValue.trim().toLowerCase();
    this.tasks = this.allTasks.filter(task =>
      task.nameTask.toLowerCase().includes(filter) ||
      task.description.toLowerCase().includes(filter) ||
      task.priority.toLowerCase().includes(filter) ||
      task.state.toLowerCase().includes(filter) ||
      task.userGestion.toLowerCase().includes(filter)
    );
    console.log("Filtrado:", this.tasks);
  }
}
