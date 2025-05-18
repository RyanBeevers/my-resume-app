import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

function initializeDarkMode() {
  const userPreference = localStorage.getItem('theme');
  const prefersDark = userPreference ? userPreference === 'dark' : true;
  console.log(prefersDark);
  if (prefersDark) {
    const element = document.querySelector('html');
    if (element)
      element.classList.toggle('my-app-dark');
  } else {
    document.body.classList.remove('my-app-dark');
  }
}

initializeDarkMode();
