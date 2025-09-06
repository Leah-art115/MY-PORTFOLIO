import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  features: string[];
  priceRange?: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services: Service[] = [
    {
      id: 1,
      title: 'Full-Stack Web Development',
      description: 'Complete web applications from frontend to backend with modern frameworks and best practices.',
      icon: 'fas fa-code',
      technologies: ['Angular', 'NestJS', 'PostgreSQL', 'Prisma'],
      features: [
        'Responsive web applications',
        'RESTful API development',
        'Database design & optimization',
        'Authentication & authorization',
        'Real-time features',
        'Performance optimization'
      ],
      priceRange: '$2,500'
    },
    {
      id: 2,
      title: 'API Development & Integration',
      description: 'Robust RESTful APIs and GraphQL services with comprehensive documentation and testing.',
      icon: 'fas fa-server',
      technologies: ['NestJS', 'PostgreSQL', 'Prisma', 'Swagger'],
      features: [
        'RESTful API design',
        'GraphQL implementation',
        'API documentation',
        'Rate limiting & security',
        'Third-party integrations',
        'API testing & monitoring'
      ],
      priceRange: '$1,500'
    },
    {
      id: 3,
      title: 'Database Design & Optimization',
      description: 'Efficient database architecture with Prisma ORM for scalable and maintainable data solutions.',
      icon: 'fas fa-database',
      technologies: ['PostgreSQL', 'Prisma', 'Redis', 'MongoDB'],
      features: [
        'Database schema design',
        'Query optimization',
        'Data modeling',
        'Migration strategies',
        'Performance tuning',
        'Backup & recovery planning'
      ],
      priceRange: '$1,200'
    },
    {
      id: 4,
      title: 'Frontend Development',
      description: 'Modern, responsive user interfaces with Angular and contemporary design patterns.',
      icon: 'fas fa-palette',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS'],
      features: [
        'Component-based architecture',
        'State management',
        'Responsive design',
        'Progressive Web Apps',
        'Performance optimization',
        'Accessibility compliance'
      ],
      priceRange: '$2,000'
    },
    {
      id: 5,
      title: 'E-commerce Solutions',
      description: 'Complete e-commerce platforms with payment processing, inventory management, and admin panels.',
      icon: 'fas fa-shopping-cart',
      technologies: ['Angular', 'NestJS', 'Stripe', 'PostgreSQL'],
      features: [
        'Product catalog management',
        'Shopping cart & checkout',
        'Payment gateway integration',
        'Order management system',
        'Admin dashboard',
        'Analytics & reporting'
      ],
      priceRange: '$4,000'
    },
    {
      id: 6,
      title: 'Real-time Applications',
      description: 'Interactive applications with live updates, chat systems, and collaborative features.',
      icon: 'fas fa-bolt',
      technologies: ['Socket.io', 'NestJS', 'Angular', 'Redis'],
      features: [
        'Real-time messaging',
        'Live notifications',
        'Collaborative editing',
        'Live data updates',
        'WebSocket implementation',
        'Scalable architecture'
      ],
      priceRange: '$3,000'
    },
    // {
    //   id: 7,
    //   title: 'Legacy System Modernization',
    //   description: 'Upgrade and modernize existing applications with current technologies and architectures.',
    //   icon: 'fas fa-sync-alt',
    //   technologies: ['Angular', 'NestJS', 'Migration Tools', 'Docker'],
    //   features: [
    //     'Code modernization',
    //     'Database migration',
    //     'Architecture upgrade',
    //     'Performance improvement',
    //     'Security enhancement',
    //     'Documentation & training'
    //   ],
    //   priceRange: '$3,500'
    // },
    // {
    //   id: 8,
    //   title: 'DevOps & Deployment',
    //   description: 'Complete deployment pipelines, containerization, and cloud infrastructure setup.',
    //   icon: 'fas fa-cloud',
    //   technologies: ['Docker', 'AWS', 'CI/CD', 'Nginx'],
    //   features: [
    //     'Containerized deployment',
    //     'CI/CD pipeline setup',
    //     'Cloud infrastructure',
    //     'Monitoring & logging',
    //     'Automated testing',
    //     'Security hardening'
    //   ],
    //   priceRange: '$1,800'
    // }
  ];

  constructor() { }

  ngOnInit(): void {
    this.addScrollAnimations();
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
   * Generate animation delay for staggered animations
   */
  getAnimationDelay(index: number): string {
    return `${index * 0.1}s`;
  }

  /**
   * Track by function for performance
   */
  trackByServiceId(index: number, service: Service): number {
    return service.id;
  }

  /**
   * Add intersection observer for scroll animations
   */
  private addScrollAnimations(): void {
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

      setTimeout(() => {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
        animatedElements.forEach(el => observer.observe(el));
      }, 100);
    }
  }
}