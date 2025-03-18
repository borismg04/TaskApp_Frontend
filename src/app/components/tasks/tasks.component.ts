import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { ParameterService } from 'src/app/Services/parameter.service';
import { CreateTasksComponent } from './create-tasks/create-tasks.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTasksComponent } from './update-tasks/update-tasks.component';

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
  smallSize: boolean = false;

  constructor(
    public dialog : MatDialog,
    public httpService: HttpService,
    public parameterService: ParameterService,
  ) { }

  ngOnInit(): void {
    this.GetTask();
  }

  GetTask() {
    this.httpService.GetTasks().subscribe(
      (response) => {
        this.allTasks = response.result.tasks;
        this.tasks = [...this.allTasks];
        this.count = response.result.count;
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
  }

  ModalCreateTask() {
    let width = this.smallSize ? "90%" : "40%";
    this.dialog.open(CreateTasksComponent, {
      width: width,
      data: {
        httpService: this.httpService,
        parametersService: this.parameterService,
      }
    });
  }

  ModalUpdateTask(task: any) {
    let width = this.smallSize ? "90%" : "40%";
    this.dialog.open(UpdateTasksComponent, {
      width: width,
      data: {
        httpService: this.httpService,
        parametersService: this.parameterService,
        task: task,
      }
    });
  }
}
