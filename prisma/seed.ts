import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@nextera.digital' },
    update: {},
    create: {
      email: 'admin@nextera.digital',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
  })
  console.log('✅ Created admin user (email: admin@nextera.digital, password: admin123)')

  // Create Services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: 'custom-software' },
      update: {},
      create: {
        name: 'Custom Software & SaaS',
        slug: 'custom-software',
        description: 'Build scalable software products from idea to launch',
        category: 'Product',
        isFeatured: true,
        icon: 'rocket',
        outcomes: JSON.stringify([
          'Scalable architecture that handles growth',
          'Modern tech stack for performance',
          'User-focused design and experience',
          'Cloud deployment and infrastructure',
        ]),
        timeline: '3-6 months for MVP, ongoing for scaling',
        budgetRange: 'Starting from $15k for MVP',
        relatedServices: JSON.stringify(['ai-automation', 'brand-growth', 'web-experiences']),
        packages: JSON.stringify([
          { name: 'Starter', features: ['Basic MVP', 'Core features', '3 months support'] },
          { name: 'Growth', features: ['Full product', 'Advanced features', '6 months support', 'Analytics'] },
          { name: 'Enterprise', features: ['Custom solution', 'Unlimited features', 'Ongoing support', 'Dedicated team'] },
        ]),
      },
    }),
    prisma.service.upsert({
      where: { slug: 'ai-automation' },
      update: {},
      create: {
        name: 'AI & Automation',
        slug: 'ai-automation',
        description: 'Intelligent systems that streamline your operations',
        category: 'Automation',
        isFeatured: true,
        icon: 'sparkles',
        outcomes: JSON.stringify([
          'Automated workflows and processes',
          'AI-powered insights and decisions',
          'Integration with existing systems',
          'Cost reduction through efficiency',
        ]),
        timeline: '2-4 months for implementation',
        budgetRange: 'Starting from $10k',
        relatedServices: JSON.stringify(['custom-software', 'brand-growth', 'modernization']),
      },
    }),
    prisma.service.upsert({
      where: { slug: 'mobile-apps' },
      update: {},
      create: {
        name: 'Mobile App Development',
        slug: 'mobile-apps',
        description: 'Native and web apps that users love',
        category: 'Mobile',
        isFeatured: true,
        icon: 'code',
        outcomes: JSON.stringify([
          'Native performance',
          'Cross-platform compatibility',
          'App store ready',
        ]),
        timeline: '3-5 months for full app',
        budgetRange: 'Starting from $20k',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'web-experiences' },
      update: {},
      create: {
        name: 'Web Experiences',
        slug: 'web-experiences',
        description: 'Fast, responsive, and modern web applications',
        category: 'Web',
        isFeatured: true,
        icon: 'code',
        outcomes: JSON.stringify([
          'Fast & responsive',
          'SEO optimized',
          'Modern UX',
        ]),
        timeline: '2-4 months',
        budgetRange: 'Starting from $12k',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'modernization' },
      update: {},
      create: {
        name: 'Legacy Modernization',
        slug: 'modernization',
        description: 'Transform legacy systems into modern platforms',
        category: 'Transformation',
        isFeatured: true,
        icon: 'rocket',
        outcomes: JSON.stringify([
          'Tech stack upgrade',
          'Performance boost',
          'Future-proof architecture',
        ]),
        timeline: '4-8 months',
        budgetRange: 'Starting from $25k',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'brand-growth' },
      update: {},
      create: {
        name: 'Brand & Growth Systems',
        slug: 'brand-growth',
        description: 'Digital strategies that drive real results',
        category: 'Growth',
        isFeatured: true,
        icon: 'chart',
        outcomes: JSON.stringify([
          'Digital strategy',
          'Marketing automation',
          'Analytics & insights',
        ]),
        timeline: '2-3 months',
        budgetRange: 'Starting from $8k',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'training-workshops' },
      update: {},
      create: {
        name: 'Training & Workshops',
        slug: 'training-workshops',
        description: 'Team upskilling and best practices',
        category: 'Education',
        isFeatured: false,
        icon: 'book',
        outcomes: JSON.stringify([
          'Team upskilling',
          'Best practices',
          'Hands-on learning',
        ]),
        timeline: '1-2 days per workshop',
        budgetRange: 'Starting from $2k',
      },
    }),
  ])

  console.log(`✅ Created ${services.length} services`)

  // Create Solutions
  const solutions = await Promise.all([
    prisma.solution.upsert({
      where: { slug: 'skillturn' },
      update: {},
      create: {
        name: 'Skillturn',
        slug: 'skillturn',
        tagline: 'EdTech & Careers Platform',
        description: 'Comprehensive education and career development platform',
        type: 'PRODUCT',
        status: 'LIVE',
        isFeatured: true,
        category: 'EdTech',
        whoItsFor: JSON.stringify(['Educational institutions', 'Career coaching platforms', 'Skill development startups']),
        features: JSON.stringify([
          'Course management system',
          'Student progress tracking',
          'Assessment & certification',
          'Career guidance tools',
        ]),
        architecture: JSON.stringify({
          frontend: 'React, Next.js',
          backend: 'Node.js, PostgreSQL',
          integrations: 'Payment gateways, Email services',
        }),
        engagementOptions: JSON.stringify([
          'Use as-is (SaaS)',
          'Customized deployment under your brand',
          'One-time license + support',
        ]),
      },
    }),
    prisma.solution.upsert({
      where: { slug: 'brandbite' },
      update: {},
      create: {
        name: 'BrandBite',
        slug: 'brandbite',
        tagline: 'Creatives & Growth',
        description: 'Platform for creative professionals and brand growth',
        type: 'PRODUCT',
        status: 'LIVE',
        isFeatured: true,
        category: 'Growth',
        whoItsFor: JSON.stringify(['Creative agencies', 'Marketing teams', 'Content creators']),
        features: JSON.stringify([
          'Content management',
          'Social media integration',
          'Analytics dashboard',
        ]),
      },
    }),
    prisma.solution.upsert({
      where: { slug: 'financemate' },
      update: {},
      create: {
        name: 'FinanceMate',
        slug: 'financemate',
        tagline: 'Personal Finance',
        description: 'Personal finance management and planning tool',
        type: 'PRODUCT',
        status: 'LIVE',
        isFeatured: true,
        category: 'FinTech',
        whoItsFor: JSON.stringify(['Individuals', 'Financial advisors', 'Small businesses']),
        features: JSON.stringify([
          'Budget tracking',
          'Investment planning',
          'Expense management',
        ]),
      },
    }),
    prisma.solution.upsert({
      where: { slug: 'edtech-starter' },
      update: {},
      create: {
        name: 'EdTech Starter',
        slug: 'edtech-starter',
        tagline: 'Education platform template',
        description: 'Ready-to-deploy education platform',
        type: 'KIT',
        status: 'BETA',
        isFeatured: false,
        category: 'EdTech',
      },
    }),
    prisma.solution.upsert({
      where: { slug: 'temple-saas' },
      update: {},
      create: {
        name: 'Temple SaaS',
        slug: 'temple-saas',
        tagline: 'Community management platform',
        description: 'SaaS platform for community management',
        type: 'KIT',
        status: 'BETA',
        isFeatured: false,
        category: 'Community',
      },
    }),
  ])

  console.log(`✅ Created ${solutions.length} solutions`)

  // Create Case Studies
  const caseStudies = await Promise.all([
    prisma.caseStudy.upsert({
      where: { slug: 'ecommerce-modernization' },
      update: {},
      create: {
        title: 'E-commerce Platform Modernization',
        slug: 'ecommerce-modernization',
        client: 'Confidential',
        industry: 'Retail',
        problem: 'Legacy system limitations',
        result: '300% efficiency increase',
        background: 'A leading retail company was struggling with their legacy e-commerce platform that couldn\'t handle growing traffic and lacked modern features.',
        challenge: 'The existing system was built on outdated technology, causing slow load times, frequent crashes, and inability to scale during peak seasons.',
        whatWeBuilt: 'We built a modern, scalable e-commerce platform using React, Node.js, and cloud infrastructure. The new system includes advanced search, real-time inventory management, and AI-powered recommendations.',
        results: JSON.stringify([
          { metric: '300%', label: 'Efficiency increase' },
          { metric: '50%', label: 'Faster load times' },
          { metric: '99.9%', label: 'Uptime' },
        ]),
        techStack: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'AWS']),
        servicesUsed: JSON.stringify(['custom-software', 'modernization']),
        tags: JSON.stringify(['Modernization', 'SaaS', 'E-commerce']),
      },
    }),
    prisma.caseStudy.upsert({
      where: { slug: 'ai-analytics-dashboard' },
      update: {},
      create: {
        title: 'AI-Powered Analytics Dashboard',
        slug: 'ai-analytics-dashboard',
        client: 'Tech Startup',
        industry: 'SaaS',
        problem: 'Manual reporting processes',
        result: '80% time saved',
        background: 'A growing SaaS company needed to automate their reporting and analytics processes.',
        challenge: 'Manual data collection and report generation was taking hours each week.',
        whatWeBuilt: 'We developed an AI-powered analytics dashboard that automatically collects, processes, and visualizes data from multiple sources.',
        results: JSON.stringify([
          { metric: '80%', label: 'Time saved' },
          { metric: 'Real-time', label: 'Data updates' },
        ]),
        techStack: JSON.stringify(['React', 'Python', 'Machine Learning', 'APIs']),
        servicesUsed: JSON.stringify(['ai-automation', 'custom-software']),
        tags: JSON.stringify(['AI', 'Automation', 'Analytics']),
      },
    }),
    prisma.caseStudy.upsert({
      where: { slug: 'mobile-education-app' },
      update: {},
      create: {
        title: 'Mobile App for Education',
        slug: 'mobile-education-app',
        client: 'EdTech Company',
        industry: 'Education',
        problem: 'No mobile presence',
        result: '50k+ downloads',
        background: 'An EdTech company wanted to expand their reach with a mobile application.',
        challenge: 'They had a web platform but no mobile app, limiting their user base.',
        whatWeBuilt: 'We developed a native mobile app for both iOS and Android with offline capabilities and push notifications.',
        results: JSON.stringify([
          { metric: '50k+', label: 'Downloads' },
          { metric: '4.8', label: 'App Store rating' },
        ]),
        techStack: JSON.stringify(['React Native', 'Node.js', 'MongoDB']),
        servicesUsed: JSON.stringify(['mobile-apps']),
        tags: JSON.stringify(['Mobile', 'EdTech']),
      },
    }),
  ])

  console.log(`✅ Created ${caseStudies.length} case studies`)

  // Create Blog Posts
  const blogPosts = await Promise.all([
    prisma.blogPost.upsert({
      where: { slug: 'building-scalable-saas' },
      update: {},
      create: {
        title: 'Building Scalable SaaS Products',
        slug: 'building-scalable-saas',
        excerpt: 'Lessons learned from building multiple SaaS platforms',
        content: `
          <h2>Building Scalable SaaS Products</h2>
          <p>Building scalable SaaS products requires careful planning and execution. Here are some key lessons we've learned...</p>
          <h3>Start with the Right Architecture</h3>
          <p>Choosing the right tech stack from the beginning is crucial. We prefer modern frameworks that can scale...</p>
          <h3>Focus on User Experience</h3>
          <p>No matter how powerful your backend is, if users can't easily use your product, it won't succeed...</p>
        `,
        author: 'Nextera Team',
        tags: JSON.stringify(['Product', 'SaaS']),
        category: 'Product',
        published: true,
        publishedAt: new Date('2024-12-15'),
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: 'ai-automation-practice' },
      update: {},
      create: {
        title: 'AI Automation in Practice',
        slug: 'ai-automation-practice',
        excerpt: 'How we use AI to streamline client workflows',
        content: '<p>AI automation is transforming how businesses operate...</p>',
        author: 'Nextera Team',
        tags: JSON.stringify(['AI', 'Automation']),
        category: 'AI',
        published: true,
        publishedAt: new Date('2024-11-20'),
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: 'drogenide-to-nextera' },
      update: {},
      create: {
        title: 'From Drogenide to Nextera',
        slug: 'drogenide-to-nextera',
        excerpt: 'The story of our evolution',
        content: '<p>Our journey from Drogenide to Nextera Digital...</p>',
        author: 'Nextera Team',
        tags: JSON.stringify(['Drogenide Stories']),
        category: 'Drogenide Stories',
        published: true,
        publishedAt: new Date('2024-10-10'),
      },
    }),
  ])

  console.log(`✅ Created ${blogPosts.length} blog posts`)

  // Create Jobs
  const jobs = await Promise.all([
    prisma.job.upsert({
      where: { slug: 'senior-developer' },
      update: {},
      create: {
        title: 'Senior Full-Stack Developer',
        slug: 'senior-developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        summary: 'We\'re looking for an experienced full-stack developer to join our team and help build scalable products.',
        responsibilities: JSON.stringify([
          'Develop and maintain web applications using React and Node.js',
          'Collaborate with designers and product managers',
          'Write clean, maintainable code',
          'Participate in code reviews',
        ]),
        requirements: JSON.stringify([
          '5+ years of experience in full-stack development',
          'Strong knowledge of React, Node.js, and TypeScript',
          'Experience with databases (PostgreSQL, MongoDB)',
          'Understanding of cloud infrastructure (AWS, Vercel)',
        ]),
        niceToHave: JSON.stringify([
          'Experience with AI/ML integration',
          'Previous startup experience',
          'Open source contributions',
        ]),
        howToApply: 'Send your resume and portfolio to careers@nextera.digital',
        isOpen: true,
      },
    }),
    prisma.job.upsert({
      where: { slug: 'product-designer' },
      update: {},
      create: {
        title: 'Product Designer',
        slug: 'product-designer',
        department: 'Design',
        location: 'Remote',
        type: 'Full-time',
        summary: 'Join our design team to create beautiful and functional user experiences.',
        responsibilities: JSON.stringify([
          'Design user interfaces and experiences',
          'Create prototypes and wireframes',
          'Collaborate with developers',
        ]),
        requirements: JSON.stringify([
          '3+ years of product design experience',
          'Proficiency in Figma',
          'Strong portfolio',
        ]),
        isOpen: true,
      },
    }),
  ])

  console.log(`✅ Created ${jobs.length} jobs`)

  // Create Timeline Events
  const timelineEvents = await Promise.all([
    prisma.timelineEvent.create({
      data: {
        year: 2019,
        title: 'Starting Drogenide',
        description: 'Began with scripts, websites, and fixes',
        tag: 'Drogenide Era',
        order: 1,
      },
    }),
    prisma.timelineEvent.create({
      data: {
        year: 2020,
        title: 'First Client Projects',
        description: 'Delivered custom solutions for local businesses',
        tag: 'Drogenide Era',
        order: 2,
      },
    }),
    prisma.timelineEvent.create({
      data: {
        year: 2021,
        title: 'First Digital Product Sold',
        description: 'Launched first SaaS product',
        tag: 'Drogenide Era',
        order: 3,
      },
    }),
    prisma.timelineEvent.create({
      data: {
        year: 2022,
        title: 'First Teaching/Coaching',
        description: 'Started workshops and training programs',
        tag: 'Transition',
        order: 4,
      },
    }),
    prisma.timelineEvent.create({
      data: {
        year: 2023,
        title: 'Transition to Nextera',
        description: 'Rebranded and expanded services',
        tag: 'Nextera Era',
        order: 5,
      },
    }),
    prisma.timelineEvent.create({
      data: {
        year: 2024,
        title: 'First Official Nextera Product',
        description: 'Launched Skillturn, BrandBite, and FinanceMate',
        tag: 'Nextera Era',
        order: 6,
      },
    }),
  ])

  console.log(`✅ Created ${timelineEvents.length} timeline events`)

  // Create Lab Items
  const labItems = await Promise.all([
    prisma.labItem.create({
      data: {
        name: 'Code Generator Tool',
        description: 'Internal tool for rapid prototyping',
        status: 'INTERNAL',
        category: 'Tools',
      },
    }),
    prisma.labItem.create({
      data: {
        name: 'API Testing Framework',
        description: 'Custom testing utilities',
        status: 'INTERNAL',
        category: 'Testing',
      },
    }),
    prisma.labItem.create({
      data: {
        name: 'Design System Components',
        description: 'Reusable UI component library',
        status: 'PUBLIC',
        category: 'Design',
        link: 'https://github.com/nextera/components',
      },
    }),
  ])

  console.log(`✅ Created ${labItems.length} lab items`)

  // Create Settings
  const settings = await Promise.all([
    prisma.setting.upsert({
      where: { key: 'site_name' },
      update: {},
      create: {
        key: 'site_name',
        value: 'Nextera Digital',
        type: 'STRING',
        description: 'Site name',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'contact_email' },
      update: {},
      create: {
        key: 'contact_email',
        value: 'hello@nextera.digital',
        type: 'STRING',
        description: 'Contact email',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'stats' },
      update: {},
      create: {
        key: 'stats',
        value: JSON.stringify({
          years: 5,
          projects: 50,
          products: 10,
          industries: 8,
        }),
        type: 'JSON',
        description: 'Company statistics',
      },
    }),
    // Home page settings
    prisma.setting.upsert({
      where: { key: 'homepage_hero_title' },
      update: {},
      create: {
        key: 'homepage_hero_title',
        value: 'We build modern software that actually moves your business',
        type: 'STRING',
        description: 'Home page hero title',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'homepage_hero_subtitle' },
      update: {},
      create: {
        key: 'homepage_hero_subtitle',
        value: 'forward.',
        type: 'STRING',
        description: 'Home page hero subtitle (highlighted text)',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'homepage_hero_description' },
      update: {},
      create: {
        key: 'homepage_hero_description',
        value: 'SaaS, AI automation, mobile apps, and web experiences that scale with your vision.',
        type: 'STRING',
        description: 'Home page hero description',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'homepage_hero_primary_button_text' },
      update: {},
      create: {
        key: 'homepage_hero_primary_button_text',
        value: 'Book a strategy call',
        type: 'STRING',
        description: 'Home page primary button text',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'homepage_hero_primary_button_link' },
      update: {},
      create: {
        key: 'homepage_hero_primary_button_link',
        value: '/contact',
        type: 'STRING',
        description: 'Home page primary button link',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'homepage_hero_secondary_button_text' },
      update: {},
      create: {
        key: 'homepage_hero_secondary_button_text',
        value: 'View case studies',
        type: 'STRING',
        description: 'Home page secondary button text',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'homepage_hero_secondary_button_link' },
      update: {},
      create: {
        key: 'homepage_hero_secondary_button_link',
        value: '/case-studies',
        type: 'STRING',
        description: 'Home page secondary button link',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'homepage_process_steps' },
      update: {},
      create: {
        key: 'homepage_process_steps',
        value: JSON.stringify([
          { title: 'Discover', desc: 'Understand your goals', output: 'Roadmap', icon: '🔍' },
          { title: 'Design', desc: 'Create user experiences', output: 'Clickable prototype', icon: '🎨' },
          { title: 'Build', desc: 'Develop with modern tech', output: 'Production-ready system', icon: '⚡' },
          { title: 'Grow', desc: 'Iterate and scale', output: 'Ongoing optimization', icon: '📈' },
        ]),
        type: 'JSON',
        description: 'Home page process steps',
      },
    }),
  ])

  console.log(`✅ Created ${settings.length} settings`)

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

