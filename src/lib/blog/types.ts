export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  tags: string[];
  readTime: string;
  featured?: boolean;
  projectUrl?: string;
}

export interface BlogMetadata {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  tags: string[];
  readTime: string;
  featured?: boolean;
  projectUrl?: string;
}
