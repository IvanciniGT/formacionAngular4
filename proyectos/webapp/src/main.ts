import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './config/app.config';
import { AppComponent } from './components/app/app.component';

// Este es el archivo principal que ejecuta nuestro navegador cuando cargamos la página.
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  // Solo tenemos 1 línea de código que dice: Angular, ejecuta tu mi app.
  // Aquí estamos haciendo la inversión de control: 
  // Angular, ejecuta mi app, y Angular se encarga de todo lo demás.