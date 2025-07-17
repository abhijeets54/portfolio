import { MetadataRoute } from 'next'

// Define your projects data (this should match your actual projects)
const projects = [
  {
    id: 'ootd',
    title: 'OOTD – AI Fashion Stylist',
    lastModified: '2025-07-15',
    priority: 0.9,
  },
  {
    id: 'homely',
    title: 'Homely – Full-Stack Food Delivery Platform',
    lastModified: '2025-07-10',
    priority: 0.9,
  },
  {
    id: 'studybuddy',
    title: 'StudyBuddy – AI-Powered Study Management',
    lastModified: '2025-07-17',
    priority: 0.9,
  },
  {
    id: 'ankkor',
    title: 'Ankkor – E-commerce Clothing Store',
    lastModified: '2025-07-05',
    priority: 0.9,
  },
  {
    id: 'initiators-of-change',
    title: 'Initiators of Change – NGO Website',
    lastModified: '2025-06-30',
    priority: 0.8,
  },
  {
    id: 'd2-global-immigration',
    title: 'D2 Global Immigration – Visa & Immigration Consultancy',
    lastModified: '2025-06-25',
    priority: 0.8,
  },
  {
    id: 'digital-evidence-viewer',
    title: 'Digital Evidence Metadata Viewer',
    lastModified: '2025-06-20',
    priority: 0.8,
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    lastModified: '2025-07-16',
    priority: 0.7,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abhijeets-portfolio.vercel.app';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date('2025-07-16'),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2025-07-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date('2025-07-16'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2025-07-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/extracurricular`,
      lastModified: new Date('2025-07-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Dynamic project pages
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/project/${project.id}`,
    lastModified: new Date(project.lastModified),
    changeFrequency: 'monthly' as const,
    priority: project.priority,
  }));

  // Blog pages (if you have any)
  const blogPages = [
    // Add blog posts here when available
    // {
    //   url: `${baseUrl}/blog/post-slug`,
    //   lastModified: new Date('2025-07-16'),
    //   changeFrequency: 'never' as const,
    //   priority: 0.6,
    // },
  ];

  return [
    ...staticPages,
    ...projectPages,
    ...blogPages,
  ];
}
