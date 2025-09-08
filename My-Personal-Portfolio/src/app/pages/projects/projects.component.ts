import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from '@angular/common';

// Project Interface
export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  techStack: string[];
  liveDemo?: string;
  githubUrl: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
}

// Category Interface
export interface ProjectCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  // Component State
  isVisible: boolean = false;
  activeCategory: string = 'all';
  filteredProjects: Project[] = [];

  // All Categories
  categories: ProjectCategory[] = [
    { id: 'all', name: 'All Projects', icon: 'fas fa-th-large', count: 0 },
    { id: 'fullstack', name: 'Full Stack', icon: 'fas fa-layer-group', count: 0 },
    { id: 'frontend', name: 'Frontend', icon: 'fab fa-html5', count: 0 },
    { id: 'backend', name: 'Backend', icon: 'fas fa-server', count: 0 },
    { id: 'mobile', name: 'Mobile', icon: 'fas fa-mobile-alt', count: 0 }
  ];

  
  projects: Project[] = [
    {
      id: 1,
      title: 'SendIT Courier System',
      description: 'Complete courier management platform with real-time tracking, user authentication, and admin dashboard.',
      longDescription: 'A comprehensive courier delivery system built with Angular and NestJS. Features include user registration, parcel tracking, admin management, payment integration, and real-time notifications.',
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&h=300&fit=crop',
      category: 'fullstack',
      techStack: ['Angular', 'NestJS', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'JWT'],
      liveDemo: 'http://localhost:4200/',
      githubUrl: '',
      featured: true,
      status: 'completed'
    },
    {
      id: 2,
      title: 'E-Learning Platform',
      description: 'Interactive learning platform with course management, video streaming, and progress tracking.',
      longDescription: 'Modern e-learning application with course creation tools, video lectures, quizzes, student progress tracking, and instructor dashboard. Built with scalability in mind.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&h=300&fit=crop',
      category: 'fullstack',
      techStack: ['Angular', 'NestJS',],
      liveDemo: '',
      githubUrl: '',
      featured: true,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'Collaborative task management tool with team features, deadlines, and project organization.',
      longDescription: 'A comprehensive task management solution with team collaboration, project boards, deadline tracking, and real-time updates. Perfect for agile development teams.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
      category: 'frontend',
      techStack: ['Angular', 'TypeScript', 'RxJS', 'Angular Material'],
      liveDemo: '',
      githubUrl: '',
      featured: false,
      status: 'completed'
    },
    {
      id: 4,
      title: 'E-Commerce Store',
      description: 'Full-featured online store with shopping cart, payment processing, and inventory management.',
      longDescription: 'Complete e-commerce solution with product catalog, shopping cart, secure checkout, order management, and admin dashboard for inventory and sales tracking.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
      category: 'fullstack',
      techStack: ['Angular', 'NestJS', 'PayPal API', 'JWT'],
      liveDemo: '',
      githubUrl: '',
      featured: true,
      status: 'completed'
    },
    {
      id: 5,
      title: 'Weather Dashboard',
      description: 'Beautiful weather application with forecasts, location search, and interactive maps.',
      longDescription: 'Modern weather dashboard with current conditions, 7-day forecasts, location-based weather, interactive maps, and customizable widgets.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop',
      category: 'frontend',
      techStack: ['Angular', 'TypeScript', 'OpenWeather API', 'Leaflet Maps'],
      liveDemo: '',
      githubUrl: '',
      featured: false,
      status: 'completed'
    },
    {
      id: 6,
      title: 'Car Rental System',
      description: 'Complete car rental platform with booking system, fleet management, and customer portal.',
      longDescription: 'Comprehensive car rental management system with vehicle booking, availability tracking, customer management, and automated billing.',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=300&fit=crop',
      category: 'fullstack',
      techStack: ['Angular', 'NestJS', 'PostgreSQL', 'Prisma', 'Cloudinary',],
      liveDemo: '',
      githubUrl: '',
      featured: false,
      status: 'completed'
    },
    {
      id: 7,
      title: 'REST API Gateway',
      description: 'Scalable API gateway with authentication, rate limiting, and microservices integration.',
      longDescription: 'Enterprise-grade API gateway built with NestJS, featuring JWT authentication, rate limiting, request logging, and seamless microservices integration.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop',
      category: 'backend',
      techStack: ['NestJS', 'TypeScript',  'PostgreSQL', ],
      githubUrl: '',
      featured: false,
      status: 'completed'
    },
    {
      id: 8,
      title: 'Portfolio Website',
      description: 'Responsive personal portfolio with dark/light mode, animations, and modern design.',
      longDescription: 'Modern personal portfolio website showcasing projects, skills, and experience. Built with Angular and TailwindCSS with smooth animations and responsive design.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop',
      category: 'frontend',
      techStack: ['Angular', 'TypeScript', 'Tailwind CSS', 'FontAwesome', ],
      liveDemo: '',
      githubUrl: '',
      featured: false,
      status: 'completed'
    }
  ];

  ngOnInit(): void {
    // Set up intersection observer for animations
    this.setupIntersectionObserver();
    
    // Initialize filtered projects
    this.updateFilteredProjects();
    
    // Update category counts
    this.updateCategoryCounts();
  }

  // Setup Intersection Observer for scroll animations
  private setupIntersectionObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('#projects');
    if (element) {
      observer.observe(element);
    }
  }

  // Filter projects by category
  filterByCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.updateFilteredProjects();
  }

  // Update filtered projects based on active category
  private updateFilteredProjects(): void {
    if (this.activeCategory === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(
        project => project.category === this.activeCategory
      );
    }
  }

  // Update category counts
  private updateCategoryCounts(): void {
    this.categories.forEach(category => {
      if (category.id === 'all') {
        category.count = this.projects.length;
      } else {
        category.count = this.projects.filter(p => p.category === category.id).length;
      }
    });
  }

  // Open external links
  openLink(url: string): void {
    if (url) {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  }

  // Get status badge class
  getStatusClass(status: string): string {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-progress';
      case 'planned': return 'status-planned';
      default: return 'status-completed';
    }
  }

  // Track by function for better performance
  trackByProjectId(index: number, project: Project): number {
    return project.id;
  }
}