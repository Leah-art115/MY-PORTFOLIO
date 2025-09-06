import { Component, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() themeToggle = new EventEmitter<void>();
  
  isMenuOpen = false;
  isScrolled = false;
  isDarkMode = false;

  // Navigation items
  navItems: NavItem[] = [
    { label: 'Home', href: '#hero', icon: 'fas fa-home' },
    { label: 'About', href: '#about', icon: 'fas fa-user' },
    { label: 'Skills', href: '#skills', icon: 'fas fa-code' },
    { label: 'Projects', href: '#projects', icon: 'fas fa-briefcase' },
    { label: 'Services', href: '#services', icon: 'fas fa-cogs' },
    { label: 'Certifications', href: '#certifications', icon: 'fas fa-certificate' },
    { label: 'Contact', href: '#contact', icon: 'fas fa-envelope' }
  ];

  ngOnInit() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      // Check system preference
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Apply the theme
    this.applyTheme();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  onThemeToggle() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.saveThemePreference();
    this.themeToggle.emit();
  }

  private applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  private saveThemePreference() {
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  // Get the appropriate icon for theme toggle
  get themeIcon(): string {
    return this.isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
  }

  // Get the appropriate title for theme toggle
  get themeTitle(): string {
    return this.isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }

  // Smooth scroll to section
  scrollToSection(href: string, event: Event) {
    event.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.closeMenu();
    }
  }
}