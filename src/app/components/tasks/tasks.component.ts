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
  id: any;

  constructor(
    public dialog: MatDialog,
    public httpService: HttpService,
    public parameterService: ParameterService,
  ) { }

  ngOnInit(): void {
    this.GetTask();
  }

  GetTask() {
    this.httpService.GetTasks().subscribe(
      (response: any) => {
        if (response && response.result) {
          this.tasks = response.result.tasks || [];
          this.allTasks = [...this.tasks];
          this.count = response.result.count;
        } else {
          this.tasks = [];
        }
      },
      (error) => {
        console.error('Error al obtener las tareas:', error);
        this.tasks = [];
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
    const dialogRef = this.dialog.open(CreateTasksComponent, {
      width: width,
      data: {
        httpService: this.httpService,
        parametersService: this.parameterService,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.GetTask();
    });
  }

  ModalUpdateTask(task: any) {
    let width = this.smallSize ? "90%" : "40%";
    const dialogRef = this.dialog.open(UpdateTasksComponent, {
      width: width,
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      this.GetTask();
    });
  }
}
