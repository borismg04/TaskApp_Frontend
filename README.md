# TaskAppFrontEnd

TaskAppFrontEnd es una aplicación de gestión de tareas desarrollada con Angular. Permite a los usuarios crear, editar, eliminar y gestionar tareas con diferentes prioridades y estados.

## Despliegue en Producción

La aplicación está desplegada en Vercel y puedes acceder a ella en el siguiente enlace:

[TaskAppFrontEnd en Producción](https://task-app-frontend-psi.vercel.app/)

### Credenciales de Acceso

Para acceder a la aplicación como administrador, utiliza las siguientes credenciales:

- **Correo:** admin@ad.com  
- **Contraseña:** administrator  

## Características

- Crear, editar y eliminar tareas.
- Filtrar tareas por nombre, descripción, prioridad, estado, usuario y fecha.
- Interfaz de usuario intuitiva y responsiva.
- Gestión de usuarios con diferentes perfiles (Administrador, SuperAdmin, etc.).

## Requisitos Previos

- Node.js (versión 14 o superior)
- Angular CLI (versión 16.2.16 o superior)

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/TaskAppFrontEnd.git
   ```

2. Navega al directorio del proyecto:
   ```sh
   cd TaskAppFrontEnd
   ```

3. Instala las dependencias:
   ```sh
   npm install
   ```

## Uso

### Servidor de Desarrollo

Ejecuta el siguiente comando para iniciar un servidor de desarrollo:
```sh
ng serve
```
Navega a [http://localhost:4200/](http://localhost:4200/). La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

### Generación de Componentes

Ejecuta el siguiente comando para generar un nuevo componente:
```sh
ng generate component component-name
```
También puedes usar:
```sh
ng generate directive|pipe|service|class|guard|interface|enum|module
```

### Construcción

Ejecuta el siguiente comando para construir el proyecto:
```sh
ng build
```
Los artefactos de construcción se almacenarán en el directorio `dist/`.

### Ejecución de Pruebas Unitarias

Ejecuta el siguiente comando para ejecutar las pruebas unitarias a través de Karma:
```sh
ng test
```

### Ejecución de Pruebas End-to-End

Ejecuta el siguiente comando para ejecutar las pruebas end-to-end:
```sh
ng e2e
```
Para usar este comando, primero necesitas agregar un paquete que implemente capacidades de pruebas end-to-end.

## Estructura del Proyecto

```
src/
  app/
    components/
      home/
        home.component.html
        home.component.scss
        home.component.ts
      tasks/
        tasks.component.html
        tasks.component.scss
        tasks.component.ts
      administrator/
        administrator.component.html
        administrator.component.scss
        administrator.component.ts
    services/
      task.service.ts
      user.service.ts
    models/
      task.model.ts
      user.model.ts
  assets/
    background.png
  environments/
    environment.ts
    environment.prod.ts
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para discutir cualquier cambio que te gustaría realizar.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
