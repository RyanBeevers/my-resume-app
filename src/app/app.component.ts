import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './service/theme.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ButtonModule,
    MenubarModule, RouterModule, ToggleSwitchModule,
    FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isDark: boolean = true;
  items: MenuItem[] = [];
  activeItem: MenuItem | null = null;
  isMobile = false;

  constructor(private primeng: PrimeNG, private router: Router, private themeService: ThemeService) { }

  ngOnInit() {
    this.primeng.ripple.set(true);
    this.checkViewport();
    this.items = [
      { label: 'Resume', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Experience', icon: 'pi pi-briefcase', routerLink: '/experience' },
      { label: 'Skills', icon: 'pi pi-cog', routerLink: '/skills' },
      { label: 'Projects', icon: 'pi pi-folder', routerLink: '/projects' },
      { label: 'Contact', icon: 'pi pi-envelope', routerLink: '/contact' },
    ];
    this.activeItem = this.items[0];

    this.themeService.darkMode$.subscribe(isDark => {
      this.isDark = isDark;
      const htmlEl = document.documentElement;
      if (isDark) {
        htmlEl.classList.add('my-app-dark');
      } else {
        htmlEl.classList.remove('my-app-dark');
      }
    });
  }

  navigate(item: MenuItem) {
    if (item.routerLink) {
      this.router.navigate([item.routerLink]);
    }
  }

  @HostListener('window:resize')
  checkViewport() {
    this.isMobile = window.innerWidth <= 768;
  }

  onTabChange(item: MenuItem) {
    this.activeItem = item;
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode(this.isDark);
  }

}
