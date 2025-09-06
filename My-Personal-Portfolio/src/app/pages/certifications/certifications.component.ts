import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  dateEarned: string;
  description: string;
  imageUrl: string;
  skills: string[];
  credentialUrl?: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'tools' | 'other';
  isExpanded?: boolean; //property to track expanded state
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent implements OnInit {

  selectedCategory: string = 'all';
  
  certifications: Certification[] = [
    {
      id: 1,
      title: 'Software Developer Training Program',
      issuer: 'Teach2Give',
      dateEarned: '2025-08-15',
      description: 'During my training at Teach2Give, I completed an intensive Full Stack Development program that focused on building scalable web applications using Angular for the front end, NestJS for the back end, and PostgreSQL with Prisma ORM for database management. The program emphasized clean architecture, API design, database modeling, and seamless integration across the stack. We began with a strong foundation in HTML, CSS, JavaScript, and TypeScript, gradually advancing to real-world application development where I gained hands-on experience creating complete, production-ready systems. In addition to technical skills, the program incorporated valuable soft skills sessions, including mock interviews, public speaking practice, and professional communication training, which strengthened my confidence and ability to articulate ideas effectively in both team and client settings.',
      imageUrl: 'assets/certificates/Teach2Give-software-development-certificate.jpg', 
      skills: ['TypeScript','Angular',  'NestJS', 'PostgreSQL', 'Prisma'], 
      category: 'fullstack', 
      isExpanded: false
    },
    // {
    //   id: 2,
    //   title: 'NestJS Zero to Hero',
    //   issuer: 'Udemy',
    //   dateEarned: '2023-09-22',
    //   description: 'Deep dive into NestJS framework, building scalable Node.js applications with TypeScript. Covered authentication, authorization, database integration, and microservices architecture.',
    //   imageUrl: 'assets/certificates/nestjs-zero-hero.jpg',
    //   skills: ['NestJS', 'Node.js', 'TypeScript', 'JWT', 'PostgreSQL'],
    //   credentialUrl: 'https://udemy.com/certificate/abc',
    //   category: 'backend',
    //   isExpanded: false
    // },
    // {
    //   id: 3,
    //   title: 'PostgreSQL Bootcamp',
    //   issuer: 'Udemy',
    //   dateEarned: '2023-07-10',
    //   description: 'Complete PostgreSQL course from basics to advanced topics including query optimization, indexing, stored procedures, and database design best practices.',
    //   imageUrl: 'assets/certificates/postgresql-bootcamp.jpg',
    //   skills: ['PostgreSQL', 'SQL', 'Database Design', 'Query Optimization'],
    //   category: 'backend',
    //   isExpanded: false
    // },
    // {
    //   id: 4,
    //   title: 'Prisma ORM Mastery',
    //   issuer: 'Prisma',
    //   dateEarned: '2023-10-05',
    //   description: 'Advanced Prisma ORM techniques, schema design, migrations, and performance optimization. Learned to build type-safe database applications with modern tooling.',
    //   imageUrl: 'assets/certificates/prisma-mastery.jpg',
    //   skills: ['Prisma', 'Database Modeling', 'TypeScript', 'Migrations'],
    //   category: 'backend',
    //   isExpanded: false
    // },
    // {
    //   id: 5,
    //   title: 'Full Stack Web Development',
    //   issuer: 'freeCodeCamp',
    //   dateEarned: '2023-06-18',
    //   description: 'Comprehensive full-stack development certification covering HTML, CSS, JavaScript, React, Node.js, and MongoDB. Built 5 major projects demonstrating end-to-end development skills.',
    //   imageUrl: 'assets/certificates/freecodecamp-fullstack.jpg',
    //   skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    //   credentialUrl: 'https://freecodecamp.org/certification/xyz',
    //   category: 'fullstack',
    //   isExpanded: false
    // },
    // {
    //   id: 6,
    //   title: 'Docker & Kubernetes Complete Guide',
    //   issuer: 'Udemy',
    //   dateEarned: '2023-11-12',
    //   description: 'Containerization and orchestration mastery. Learned Docker fundamentals, Kubernetes deployment strategies, CI/CD integration, and production-ready configurations.',
    //   imageUrl: 'assets/certificates/docker-kubernetes.jpg',
    //   skills: ['Docker', 'Kubernetes', 'DevOps', 'CI/CD', 'Container Orchestration'],
    //   category: 'tools',
    //   isExpanded: false
    // },
    // {
    //   id: 7,
    //   title: 'AWS Cloud Practitioner',
    //   issuer: 'Amazon Web Services',
    //   dateEarned: '2024-01-08',
    //   description: 'Foundation-level understanding of AWS Cloud concepts, services, security, architecture, pricing, and support. Essential knowledge for cloud-based application deployment.',
    //   imageUrl: 'assets/certificates/aws-cloud-practitioner.jpg',
    //   skills: ['AWS', 'Cloud Computing', 'EC2', 'S3', 'RDS'],
    //   credentialUrl: 'https://aws.amazon.com/verification',
    //   category: 'tools',
    //   isExpanded: false
    // },
    // {
    //   id: 8,
    //   title: 'Advanced Git & GitHub',
    //   issuer: 'Udemy',
    //   dateEarned: '2023-05-20',
    //   description: 'Advanced version control concepts including branching strategies, conflict resolution, collaborative workflows, and GitHub Actions for automated deployments.',
    //   imageUrl: 'assets/certificates/git-github-advanced.jpg',
    //   skills: ['Git', 'GitHub', 'Version Control', 'GitHub Actions', 'CI/CD'],
    //   category: 'tools',
    //   isExpanded: false
    // }
  ];

  categories = [
    { key: 'all', label: 'All Certifications', count: 0 },
    { key: 'frontend', label: 'Frontend', count: 0 },
    { key: 'backend', label: 'Backend', count: 0 },
    { key: 'fullstack', label: 'Full Stack', count: 0 },
    { key: 'tools', label: 'Tools & DevOps', count: 0 },
    { key: 'other', label: 'Other', count: 0 }
  ];

  constructor() { 
    this.updateCategoryCounts();
  }

  /**
   * Get years of learning
   */
  get yearsOfLearning(): number {
    return this.certifications.length > 0 ? new Date().getFullYear() - 2022 : 0;
  }

  /**
   * Get estimated total hours of learning 
   */
  get totalHoursLearned(): number {
    return this.certifications.length > 0 ? this.certifications.length * 40 : 0;
  }

  ngOnInit(): void {
    this.addScrollAnimations();
  }

  /**
   * Get filtered certifications based on selected category
   */
  get filteredCertifications(): Certification[] {
    if (this.selectedCategory === 'all') {
      return this.certifications;
    }
    return this.certifications.filter(cert => cert.category === this.selectedCategory);
  }

  /**
   * Filter certifications by category
   */
  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }

  /**
   * Update category counts
   */
  private updateCategoryCounts(): void {
    this.categories[0].count = this.certifications.length; // All
    this.categories[1].count = this.certifications.filter(c => c.category === 'frontend').length;
    this.categories[2].count = this.certifications.filter(c => c.category === 'backend').length;
    this.categories[3].count = this.certifications.filter(c => c.category === 'fullstack').length;
    this.categories[4].count = this.certifications.filter(c => c.category === 'tools').length;
    this.categories[5].count = this.certifications.filter(c => c.category === 'other').length;
  }

  /**
   * Format date for display
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  }

  /**
   * Open credential URL in new tab
   */
  viewCredential(url: string): void {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
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
  trackByCertificationId(index: number, certification: Certification): number {
    return certification.id;
  }

  /**
   * Get category icon
   */
  getCategoryIcon(category: string): string {
    const icons = {
      frontend: 'fas fa-palette',
      backend: 'fas fa-server',
      fullstack: 'fas fa-layer-group',
      tools: 'fas fa-tools',
      other: 'fas fa-certificate'
    };
    return icons[category as keyof typeof icons] || 'fas fa-certificate';
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

  /**
   * Toggle description expansion for a specific certification
   */
  toggleDescription(certId: number): void {
    const cert = this.certifications.find(c => c.id === certId);
    if (cert) {
      cert.isExpanded = !cert.isExpanded;
    }
  }

  /**
   * Get truncated description for preview
   */
  getTruncatedDescription(description: string, wordLimit: number = 30): string {
    const words = description.split(' ');
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  /**
   * Check if description needs truncation
   */
  shouldShowReadMore(description: string, wordLimit: number = 30): boolean {
    return description.split(' ').length > wordLimit;
  }

  /**
   * Handle image load error - fallback to placeholder
   */
  onImageError(event: any): void {
    event.target.src = 'assets/certificates/placeholder-certificate.jpg';
  }
}