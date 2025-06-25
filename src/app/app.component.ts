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
import { ApiService } from './service/api.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { PopoverModule } from 'primeng/popover';
import { StarFoundDialogComponent } from "./star-found-dialog/star-found-dialog.component";
import { StarService } from './service/star.service';
import { CertificateComponent } from "./certificate/certificate.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ButtonModule,
    MenubarModule, RouterModule, ToggleSwitchModule,
    FormsModule, ToastModule, DialogModule, InputTextModule,
    RatingModule, TooltipModule, StarFoundDialogComponent,
    CertificateComponent, PopoverModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isDark: boolean = true;
  items: MenuItem[] = [];
  activeItem: MenuItem | null = null;
  isMobile = false;
  username: string = '';
  visitorId: string | null = null;
  displayDialog = false;
  starsFound: string[] = [];
  foundStar = false;
  allStars = ['star1', 'star2', 'star3', 'star4', 'star5'];
  certificateUnlocked = false;
  certificateShown = false;
  showPopover: boolean = false;
  showStarProgressDialog = false;
  completedAt: Date | undefined;

  constructor(
    private primeng: PrimeNG,
    private router: Router,
    private themeService: ThemeService,
    private apiService: ApiService,
    public starService: StarService
  ) { }

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

    this.visitorId = localStorage.getItem('visitor_id');
    const savedUsername = localStorage.getItem('username');
    if (!this.visitorId) {
      this.displayDialog = true;
    } else {
      this.username = savedUsername ?? '';
      this.trackVisit();
      this.starService.loadStars(this.visitorId);

      this.subscribeToStarsFound();
      this.subscribeToCompletedStatus();
    }
  }

  subscribeToStarsFound() {
    this.starService.starsFound$.subscribe(stars => {
      this.starsFound = stars;
    });
  }

  subscribeToCompletedStatus() {
    this.starService.isCompleted$.subscribe(completed => {
      const alreadyShown = localStorage.getItem('certificate_shown');
      if (completed && !alreadyShown) {
        this.certificateUnlocked = true;  // shows modal
        this.certificateShown = true;
        localStorage.setItem('certificate_shown', 'true');
      }
    });

    this.starService.completedAt$.subscribe(completed => {
      this.completedAt = completed;
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
    this.onFindStar('star1');
  }

  startGame(guest: boolean = false) {
    if (guest || this.username.trim()) {
      if (!guest) {
        localStorage.setItem('username', this.username.trim());
      }
      if (!this.visitorId) {
        this.visitorId = crypto.randomUUID();
        localStorage.setItem('visitor_id', this.visitorId);
      }
      this.subscribeToStarsFound();
      this.subscribeToCompletedStatus();
      this.starService.loadStars(this.visitorId);
      this.displayDialog = false;
      this.trackVisit();
    }
  }

  trackVisit() {
    if (this.visitorId) {
      this.starService.loadStars(this.visitorId);
      this.apiService.trackVisit(this.visitorId, this.username || undefined)
        .subscribe({
          next: res => console.log('Visit logged', res),
          error: err => console.error('Error logging visit', err)
        });
    }
  }

  onFindStar(starId: string) {
    this.starService.findStar(starId).subscribe(response => {
      if (response === `Star ${starId} added!`) {
        this.foundStar = true;
      }
      console.log(response);
    });
  }

  closeFoundStarDialog(event: any) {
    this.foundStar = false;
  }

  showCertificate() {
    this.certificateUnlocked = true;
    localStorage.setItem('certificate_shown', 'true');
  }

  showStarProgress() {
    this.showStarProgressDialog = true;
  }

}
