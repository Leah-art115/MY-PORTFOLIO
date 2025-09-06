import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Blog Post Interface
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  publishDate: string; // Will be converted to Date
  readTime: number;
  eventName?: string;
  eventLocation?: string;
  eventDate?: string; // Will be converted to Date
  featured: boolean;
  slug: string;
  author: {
    name: string;
    avatar: string;
  };
}

// Blog Category Interface
export interface BlogCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  
  // Component State
  isVisible: boolean = false;
  activeCategory: string = 'all';
  filteredPosts: BlogPost[] = [];
  blogPosts: BlogPost[] = [];
  loading: boolean = true;
  error: string = '';

  // Blog Categories
  categories: BlogCategory[] = [
    { id: 'all', name: 'All Posts', icon: 'fas fa-newspaper', count: 0, color: 'var(--accent-purple)' },
    { id: 'events', name: 'Tech Events', icon: 'fas fa-calendar-alt', count: 0, color: '#10B981' },
    { id: 'tutorials', name: 'Tutorials', icon: 'fas fa-code', count: 0, color: '#F59E0B' },
    { id: 'insights', name: 'Tech Insights', icon: 'fas fa-lightbulb', count: 0, color: '#EF4444' },
    { id: 'journey', name: 'Dev Journey', icon: 'fas fa-road', count: 0, color: '#8B5CF6' },
    { id: 'reviews', name: 'Event Reviews', icon: 'fas fa-star', count: 0, color: '#06B6D4' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Load blog posts from JSON files
    this.loadBlogPosts();
    
    // Set up intersection observer for animations
    this.setupIntersectionObserver();
  }

  // Load blog posts from assets/blog/posts.json
  private loadBlogPosts(): void {
    this.loading = true;
    
    // Load the main blog index file that lists all available posts
    this.http.get<string[]>('assets/blog/posts-index.json').subscribe({
      next: (postFiles) => {
        // Load each individual post file
        const postRequests = postFiles.map(fileName => 
          this.http.get<BlogPost>(`assets/blog/posts/${fileName}`)
        );

        // Wait for all posts to load
        Promise.all(postRequests.map(req => req.toPromise()))
          .then(posts => {
            this.blogPosts = posts.filter(post => post != null) as BlogPost[];
            
            // Convert string dates to Date objects for sorting
            this.blogPosts.forEach(post => {
              post.publishDate = new Date(post.publishDate).toISOString();
              if (post.eventDate) {
                post.eventDate = new Date(post.eventDate).toISOString();
              }
            });
            
            // Sort by publish date (newest first)
            this.blogPosts.sort((a, b) => 
              new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
            );
            
            // Initialize filtered posts and category counts
            this.updateFilteredPosts();
            this.updateCategoryCounts();
            
            this.loading = false;
          })
          .catch(err => {
            console.error('Error loading blog posts:', err);
            this.error = 'Failed to load blog posts. Please try again later.';
            this.loading = false;
          });
      },
      error: (err) => {
        console.error('Error loading blog index:', err);
        this.error = 'Failed to load blog posts. Please try again later.';
        this.loading = false;
      }
    });
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

    const element = document.querySelector('#blog');
    if (element) {
      observer.observe(element);
    }
  }

  // Filter posts by category
  filterByCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.updateFilteredPosts();
  }

  // Update filtered posts based on active category
  private updateFilteredPosts(): void {
    if (this.activeCategory === 'all') {
      this.filteredPosts = [...this.blogPosts];
    } else {
      this.filteredPosts = this.blogPosts.filter(
        post => post.category === this.activeCategory
      );
    }
  }

  // Update category counts
  private updateCategoryCounts(): void {
    this.categories.forEach(category => {
      if (category.id === 'all') {
        category.count = this.blogPosts.length;
      } else {
        category.count = this.blogPosts.filter(p => p.category === category.id).length;
      }
    });
  }

  // Get featured posts for hero section
  getFeaturedPosts(): BlogPost[] {
    return this.blogPosts.filter(post => post.featured).slice(0, 3);
  }

  // Format date for display
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  // Get time ago format
  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  }

  // Get category by ID
  getCategoryById(id: string): BlogCategory | undefined {
    return this.categories.find(cat => cat.id === id);
  }

  // Open blog post (placeholder - you can implement full post view later)
  openPost(post: BlogPost): void {
    // For now, scroll to top and show post details
    // Later you can implement routing to individual post pages
    console.log('Opening post:', post.slug);
    
    // Placeholder: You could implement a modal or navigation
    alert(`Opening: ${post.title}\n\nThis is where you'd show the full blog post content. You can implement routing or a modal for this later.`);
  }

  // Share post functionality
  sharePost(post: BlogPost, platform: string): void {
    const url = `${window.location.origin}#blog`; // Update when you add routing
    const text = `Check out this post: ${post.title}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          // You could show a toast notification here
          alert('Link copied to clipboard!');
        });
        break;
    }
  }

  // Retry loading posts
  retryLoading(): void {
    this.error = '';
    this.loadBlogPosts();
  }
}