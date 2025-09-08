import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

interface NavigationLink {
  title: string;
  url?: string;
  route?: string;
  section?: string; // section property for scroll functionality
}

interface Service {
  name: string;
  icon: string;
}

interface ContactInfo {
  label: string;
  value: string;
  icon: string;
  link?: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  // Basic Info
  developerName: string = 'Leah Achieng';
  aboutText: string = 'Passionate full-stack developer creating beautiful, functional web applications with modern technologies. Let\'s build something amazing together.';
  currentYear: number = new Date().getFullYear();
  
  // Newsletter
  newsletterEmail: string = '';

  // Social Media Links
  socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/Leah-art115',
      icon: 'fab fa-github'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/leah-achieng-a3b8a9360/',
      icon: 'fab fa-linkedin-in'
    },
    // {
    //   name: 'Twitter',
    //   url: 'https://twitter.com/yourusername',
    //   icon: 'fab fa-twitter'
    // },
    {
      name: 'Email',
      url: 'mailto:olaachieng123@gmail.com',
      icon: 'fas fa-envelope'
    },
    // {
    //   name: 'Instagram',
    //   url: 'https://instagram.com/yourusername',
    //   icon: 'fab fa-instagram'
    // }
  ];

  // Quick Navigation Links
  quickLinks: NavigationLink[] = [
    { title: 'Home', section: 'hero' },
    { title: 'About', section: 'about' },
    { title: 'Portfolio', section: 'projects' },
    { title: 'Skills', section: 'skills' },
    { title: 'Certificates', section: 'certifications' },
    // { title: 'Experience', section: 'experience' },
    // { title: 'Contact', section: 'contact' },
    // { title: 'Blog', route: '/blog' },
    // { title: 'Resume', url: '/assets/resume.pdf' }
  ];

  // Services Offered
  services: Service[] = [
    { name: 'Web Development', icon: 'fas fa-code' },
    { name: 'Mobile Apps', icon: 'fas fa-mobile-alt' },
    { name: 'UI/UX Design', icon: 'fas fa-paint-brush' },
    { name: 'API Development', icon: 'fas fa-server' },
    { name: 'Database Design', icon: 'fas fa-database' },
    { name: 'DevOps & Deployment', icon: 'fas fa-cloud' },
    { name: 'Consulting', icon: 'fas fa-lightbulb' }
  ];

  // Contact Information
  contactInfo: ContactInfo[] = [
    {
      label: 'Email',
      value: 'olaachieng123@gmail.com',
      icon: 'fas fa-envelope',
      link: 'mailto:your.email@example.com'
    },
    {
      label: 'Phone',
      value: '+254704607226',
      icon: 'fas fa-phone',
      link: 'tel:+15551234567'
    },
    {
      label: 'Location',
      value: 'Chuka, Kenya',
      icon: 'fas fa-map-marker-alt'
    },
    {
      label: 'Availability',
      value: 'Open for freelance and Available for work',
      icon: 'fas fa-clock'
    }
  ];

  // Footer Links 
  footerLinks: NavigationLink[] = [
    { title: 'Privacy Policy', route: '/privacy' },
    { title: 'Terms of Service', route: '/terms' },
    { title: 'Sitemap', route: '/sitemap' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Add scroll animations
    this.addScrollAnimations();
  }

  /**
   * Handle newsletter subscription
   */
  // onNewsletterSubmit(): void {
  //   if (this.newsletterEmail && this.isValidEmail(this.newsletterEmail)) {
      
  //     console.log('Newsletter subscription:', this.newsletterEmail);
      
      
  //     alert('Thank you for subscribing to my newsletter!');
      
  //     this.newsletterEmail = '';
  //   } else {
  //     alert('Please enter a valid email address.');
  //   }
  // }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Smooth scroll to section 
   */
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  /**
   * Smooth scroll to top of page
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Add intersection observer for scroll animations
   */
  private addScrollAnimations(): void {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);

      // Observe footer sections
      setTimeout(() => {
        const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
        animatedElements.forEach(el => observer.observe(el));
      }, 100);
    }
  }

  /**
   * Track by function for ngFor performance
   */
  trackByIndex(index: number, item: any): number {
    return index;
  }

  trackBySocialName(index: number, item: SocialLink): string {
    return item.name;
  }

  trackByLinkTitle(index: number, item: NavigationLink): string {
    return item.title;
  }

  trackByServiceName(index: number, item: Service): string {
    return item.name;
  }

  trackByContactLabel(index: number, item: ContactInfo): string {
    return item.label;
  }
}