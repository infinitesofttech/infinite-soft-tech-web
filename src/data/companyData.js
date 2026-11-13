export const companyInfo = {
  name: "Infinite Soft Tech",
  legalName: "Infinite Softtech Private Solutions",
  tagline: "Infinite Technology. Beyond Limits.",
  shortDescription: "AI-Powered Mobile, Web & Enterprise Software Engineering Company based in Ahmedabad, India. We empower businesses worldwide with modern, scalable, and intelligent digital products.",
  foundedYear: 2021,
  stats: [
    { label: "Projects Completed", value: "75+", change: "+12 this year" },
    { label: "Client Retention Rate", value: "98.5%", change: "Industry top tier" },
    { label: "Enterprise Products", value: "3 Live", change: "HRMS, ERP & Commerce" },
    { label: "Global Presence", value: "5+ Countries", change: "India, USA, UAE, UK, CA" }
  ],
  contact: {
    address: "205, Emerald Complex, C.G. Road, Ahmedabad, Gujarat, India - 380009",
    email: "info@infinitesofttech.com",
    salesEmail: "sales@infinitesofttech.com",
    phone: "+91 94092 59294",
    phoneSecondary: "+91 94292 59294",
    whatsapp: "+919409259294",
    whatsappMessage: "Hello Infinite Soft Tech team, I visited your website and would like to discuss a project.",
    hours: "Mon - Sat: 9:30 AM - 7:00 PM IST",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9753448408017!2d72.5562723!3d23.0246723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f09d846b0d%3A0xc4eb1f4fa8e20e85!2sC%20G%20Road%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000"
  },
  socials: {
    linkedin: "https://linkedin.com/company/infinitesofttech",
    instagram: "https://instagram.com/infinitesofttech",
    youtube: "https://youtube.com/@infinitesofttech",
    facebook: "https://facebook.com/infinitesofttech",
    github: "https://github.com/infinitesofttech"
  }
};

export const products = [
  {
    id: "hrms",
    title: "Infinite Employee HRMS",
    badge: "Enterprise Suite",
    status: "Live & Deployed",
    tagline: "All-in-One Workforce, Attendance, Payroll & Performance Management Suite",
    description: "A centralized, intelligent Human Resource Management System designed to eliminate spreadsheet chaos. Features biometric & GPS mobile check-in, automated salary computation, dynamic tax deductions, shift rostering, and self-service employee portals.",
    features: [
      "GPS Geofenced & Biometric Mobile Attendance",
      "1-Click Automated Payroll with PF, ESIC & TDS Rules",
      "Leave Lifecycle Management & Approval Hierarchies",
      "Performance Appraisal, OKRs & Goal Tracking",
      "Asset Tracking & Company Document Locker"
    ],
    techStack: ["React.js", "Python / Django", "PostgreSQL", "Docker", "Tailwind CSS"],
    metrics: "Managing 1,500+ active enterprise staff across 12 organizations",
    demoUrl: "#contact"
  },
  {
    id: "erp",
    title: "Vidyapeeth ERP",
    badge: "EdTech Flagship",
    status: "Live & Deployed",
    tagline: "Next-Gen Institutional Operating System for Schools, Colleges & Institutes",
    description: "An end-to-end cloud campus ERP bridging administration, teachers, students, and parents. Integrates admissions, fee collection gateways, examinations, dynamic grading, bus GPS tracking, and digital homework submissions.",
    features: [
      "Multi-Campus Student & Staff Management",
      "Automated Fee Invoicing, Receipts & Online Payment Gateway",
      "Gradebook, Report Card Generation & Marksheets",
      "Parent-Teacher Portal & Student Mobile App (Android/iOS)",
      "Library, Hostel & Transport Route Geotracking"
    ],
    techStack: ["React.js", "Node.js / Express", "MongoDB", "AWS S3", "Flutter"],
    metrics: "Powering 20+ institutions with 25,000+ daily active users",
    demoUrl: "#contact"
  },
  {
    id: "ecommerce",
    title: "Infinite Commerce (Uma Papad)",
    badge: "Headless E-Commerce",
    status: "Live & Deployed",
    tagline: "High-Performance B2C & B2B Omnichannel Commerce Engine",
    description: "Built for high-volume retail and food manufacturing distribution. Features sub-second page loads, instant search, localized multicurrency support, automated distributor tier pricing, and WhatsApp order notification pipelines.",
    features: [
      "Lightning Fast Headless Storefront (<1s Load Time)",
      "Integrated Razorpay, Paytm, Stripe & Cash on Delivery",
      "Automated Logistics Tracking with Shiprocket & Delhivery",
      "Bulk Wholesale / B2B Pricing Tiers with GST Invoicing",
      "Real-Time WhatsApp Order & Dispatch Tracking Notifications"
    ],
    techStack: ["Next.js / React", "FastAPI / Python", "Redis", "PostgreSQL", "Tailwind CSS"],
    metrics: "Processing 5,000+ monthly orders with 99.98% uptime",
    demoUrl: "#contact"
  }
];

export const services = [
  {
    id: "web-dev",
    title: "Web Application Engineering",
    icon: "Globe",
    tagline: "High-performance web apps built for conversion and enterprise scale",
    description: "We architect and develop bespoke web applications using React, Next.js, and modern APIs. From customer-facing SaaS dashboards to high-traffic portals, we prioritize speed, responsiveness, and conversion.",
    capabilities: [
      "Enterprise Single Page Applications (SPAs) & PWAs",
      "Custom SaaS Platforms & Subscription Engines",
      "Headless CMS, E-Commerce & Merchant Portals",
      "Performance Optimization & Core Web Vitals Maximization"
    ],
    tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"]
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    icon: "Smartphone",
    tagline: "Sleek iOS and Android applications with native-grade performance",
    description: "We craft intuitive mobile experiences that captivate users. Leveraging Flutter and React Native, we deliver cross-platform mobile apps with pixel-perfect designs, offline capabilities, and instant push notification systems.",
    capabilities: [
      "Cross-Platform iOS & Android Apps (Flutter / React Native)",
      "Native Swift & Kotlin Development for Specialized Needs",
      "App Store & Google Play Deployment & Optimization (ASO)",
      "Biometric Security, In-App Purchases & Real-Time Sync"
    ],
    tech: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase"]
  },
  {
    id: "custom-software",
    title: "Custom Software & ERP/CRM",
    icon: "Cpu",
    tagline: "Tailor-made business automation software that matches your exact workflow",
    description: "Stop forcing your business into rigid off-the-shelf software. We build bespoke ERP, CRM, and workflow automation solutions that unify your sales, operations, inventory, and customer support into one seamless cockpit.",
    capabilities: [
      "End-to-End Enterprise Resource Planning (ERP)",
      "Custom Customer Relationship Management (CRM) Portals",
      "Inventory, Supply Chain & Warehouse Management",
      "Legacy Codebase Modernization & Cloud Migration"
    ],
    tech: ["Python / Django", "Java Spring Boot", "PostgreSQL", "Docker", ".NET"]
  },
  {
    id: "ai-solutions",
    title: "Generative AI & Intelligent Automation",
    icon: "Sparkles",
    tagline: "Harness LLMs, intelligent bots, and predictive models for a decisive advantage",
    description: "We help forward-thinking companies integrate artificial intelligence into their core products. From domain-trained conversational chatbots and document parsers to automated workflows and predictive analytics.",
    capabilities: [
      "Custom GPT & LLM Integration (OpenAI, Gemini, Claude)",
      "Intelligent Customer Support Chatbots & Voice Agents",
      "Automated Document Processing (OCR & Information Extraction)",
      "Predictive Analytics & Customer Churn Modeling"
    ],
    tech: ["LangChain", "OpenAI / Gemini APIs", "Python", "FastAPI", "Vector DBs"]
  },
  {
    id: "cloud-devops",
    title: "Cloud Infrastructure & DevOps",
    icon: "Cloud",
    tagline: "Scalable, zero-downtime cloud architecture with automated CI/CD pipelines",
    description: "We design resilient cloud foundations across AWS, Google Cloud, and Azure. With automated deployment pipelines, infrastructure as code, and robust monitoring, your applications stay fast, secure, and always accessible.",
    capabilities: [
      "AWS / GCP / Azure Cloud Architecture & Setup",
      "Automated CI/CD Pipelines with GitHub Actions & Docker",
      "Serverless Functions & Auto-Scaling Kubernetes Clusters",
      "Security Hardening, SSL, WAF & Disaster Recovery"
    ],
    tech: ["AWS", "Google Cloud", "Docker", "Kubernetes", "GitHub Actions"]
  },
  {
    id: "uiux-design",
    title: "Product Design & Rapid Prototyping",
    icon: "Palette",
    tagline: "User-centric UI/UX design that converts first-time visitors into loyal customers",
    description: "Design is not just how it looks; it's how it works. Our product designers create interactive prototypes, design systems, and user journeys backed by behavioral research and modern aesthetic standards.",
    capabilities: [
      "Comprehensive User Journey & Wireframing",
      "High-Fidelity Interactive Clickable Prototypes (Figma)",
      "Design Systems & Component Libraries",
      "Conversion Rate Optimization (CRO) UX Audits"
    ],
    tech: ["Figma", "Design Systems", "Prototyping", "User Research"]
  }
];

export const techStackData = {
  frontend: [
    { name: "React.js", desc: "Component architecture & reactive UI", level: "Core" },
    { name: "Next.js", desc: "Server-side rendering & SEO supremacy", level: "Advanced" },
    { name: "TypeScript", desc: "Type-safe robust web code", level: "Standard" },
    { name: "Tailwind CSS", desc: "Modern utility-first styling", level: "Expert" },
    { name: "Vue.js / Nuxt", desc: "Progressive client interfaces", level: "Skilled" },
    { name: "HTML5 / Modern JS", desc: "Web standards compliance", level: "Foundation" }
  ],
  backend: [
    { name: "Python (Django / FastAPI)", desc: "High-speed APIs & AI integration", level: "Core" },
    { name: "Node.js / Express", desc: "Event-driven asynchronous microservices", level: "Core" },
    { name: "Java (Spring Boot)", desc: "High-concurrency enterprise backbones", level: "Advanced" },
    { name: "PHP (Laravel)", desc: "Rapid business web application delivery", level: "Skilled" },
    { name: ".NET Core", desc: "Enterprise Windows & cross-platform services", level: "Skilled" }
  ],
  mobile: [
    { name: "Flutter", desc: "High-performance multi-platform UI", level: "Core" },
    { name: "React Native", desc: "Native iOS & Android from one code", level: "Core" },
    { name: "Android (Kotlin)", desc: "Specialized device hardware integration", level: "Advanced" },
    { name: "iOS (Swift)", desc: "Apple ecosystem native experience", level: "Advanced" }
  ],
  ai: [
    { name: "Generative AI & LLMs", desc: "OpenAI GPT-4, Gemini & Claude models", level: "Core" },
    { name: "LangChain / LlamaIndex", desc: "RAG & knowledge-base grounding", level: "Advanced" },
    { name: "Vector Databases", desc: "Pinecone, ChromaDB, PGVector", level: "Advanced" },
    { name: "Python Data Science", desc: "Pandas, NumPy, Scikit-learn", level: "Core" }
  ],
  database: [
    { name: "PostgreSQL", desc: "Rock-solid relational enterprise database", level: "Core" },
    { name: "MongoDB", desc: "Flexible JSON document store", level: "Core" },
    { name: "MySQL", desc: "High-speed transactional storage", level: "Standard" },
    { name: "Redis", desc: "Sub-millisecond caching & session store", level: "Core" },
    { name: "Firebase", desc: "Realtime data sync & serverless auth", level: "Advanced" }
  ],
  cloud: [
    { name: "Amazon Web Services (AWS)", desc: "EC2, S3, RDS, Lambda, CloudFront", level: "Core" },
    { name: "Google Cloud (GCP)", desc: "App Engine, Cloud Run, BigQuery", level: "Advanced" },
    { name: "Docker & Containers", desc: "Isolated, reproducible deployment units", level: "Standard" },
    { name: "Netlify & Vercel", desc: "Instant Edge CDN & serverless hosting", level: "Expert" }
  ],
  testing: [
    { name: "Postman", desc: "Automated API contract testing", level: "Core" },
    { name: "Selenium", desc: "Cross-browser web automation", level: "Standard" },
    { name: "Cypress", desc: "Modern end-to-end user journey tests", level: "Advanced" },
    { name: "Appium", desc: "Automated mobile regression suites", level: "Skilled" }
  ]
};

export const portfolioProjects = [
  {
    id: "proj-1",
    title: "Infinite Employee HRMS",
    category: "enterprise",
    categoryLabel: "Enterprise Software",
    badge: "In-House Product",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    client: "Internal Product & 12+ Corporate Clients",
    summary: "Cloud-based workforce cockpit integrating attendance, payroll, compliance, and employee lifecycle management.",
    impact: "Reduced monthly payroll calculation time from 4 days to 15 minutes with 100% statutory accuracy.",
    tech: ["React.js", "Django", "PostgreSQL", "Tailwind CSS"],
    link: "#contact"
  },
  {
    id: "proj-2",
    title: "Vidyapeeth Institutional ERP",
    category: "web",
    categoryLabel: "EdTech & Cloud ERP",
    badge: "Flagship Suite",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    client: "Educational Trusts & Colleges across Gujarat",
    summary: "Comprehensive campus operations system connecting administrators, professors, parents, and students.",
    impact: "Enabled automated digital fee collection of over ₹3.5 Crore with real-time reconciliations.",
    tech: ["React.js", "Node.js", "MongoDB", "Flutter Mobile App"],
    link: "#contact"
  },
  {
    id: "proj-3",
    title: "Uma Papad Omnichannel Store",
    category: "web",
    categoryLabel: "E-Commerce",
    badge: "High Growth",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
    client: "Uma Food Products",
    summary: "High-performance direct-to-consumer store with tiered wholesale pricing and automated shipping API sync.",
    impact: "Boosted direct online orders by 240% in first 90 days with sub-second page loading speed.",
    tech: ["Next.js", "FastAPI", "Redis", "Razorpay"],
    link: "#contact"
  },
  {
    id: "proj-4",
    title: "AI Logistics Assistant & Dispatch Bot",
    category: "ai",
    categoryLabel: "AI & Automation",
    badge: "AI Powered",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    client: "Regional Freight & Supply Chain Provider",
    summary: "Intelligent conversational bot handling shipment tracking, delivery rescheduling, and automated proof of delivery parsing.",
    impact: "Automated 68% of inbound support calls without human intervention.",
    tech: ["OpenAI LLM", "Python", "WhatsApp Cloud API", "FastAPI"],
    link: "#contact"
  },
  {
    id: "proj-5",
    title: "FitPulse Mobile Fitness Tracker",
    category: "mobile",
    categoryLabel: "Mobile App",
    badge: "Cross-Platform",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    client: "HealthTech Startup",
    summary: "Gamified workout tracker with live heart-rate Bluetooth sync, diet planner, and community challenges.",
    impact: "Maintained 4.8 star rating across App Store & Google Play with 40,000+ active downloads.",
    tech: ["Flutter", "Firebase", "HealthKit / Google Fit API"],
    link: "#contact"
  },
  {
    id: "proj-6",
    title: "FinMatrix Wealth & Investment Dashboard",
    category: "enterprise",
    categoryLabel: "FinTech & Web App",
    badge: "FinTech",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    client: "Financial Advisory Firm",
    summary: "Real-time portfolio management dashboard featuring interactive charts, mutual fund NAV feeds, and tax reports.",
    impact: "Managing assets under advice (AUA) exceeding ₹50 Crore with live bank statement parsing.",
    tech: ["React.js", "Python", "PostgreSQL", "ApexCharts"],
    link: "#contact"
  }
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description: "We dive deep into your business objectives, target audience, technical feasibility, and feature roadmap to align on deliverables."
  },
  {
    step: "02",
    title: "UI/UX & Prototyping",
    description: "Our designers craft interactive wireframes and high-fidelity Figma prototypes so you can click through your product before coding starts."
  },
  {
    step: "03",
    title: "Agile Development",
    description: "Our engineering squad develops your application in two-week sprints with transparent code reviews and live staging links."
  },
  {
    step: "04",
    title: "Quality Assurance",
    description: "Rigorous manual and automated test suites covering security, cross-device responsiveness, API stress tests, and usability."
  },
  {
    step: "05",
    title: "Cloud Deployment",
    description: "Zero-downtime deployment to your preferred cloud (Netlify, AWS, GCP) with SSL configuration, CDN caching, and domain setup."
  },
  {
    step: "06",
    title: "Support & Evolution",
    description: "Dedicated SLA maintenance, security updates, real-time monitoring, and proactive feature enhancements as your user base scales."
  }
];

export const engagementModels = [
  {
    title: "Dedicated Developers",
    tagline: "Hire vetted React, Python, or Flutter developers exclusively for your project",
    bestFor: "Growing tech startups, ongoing product engineering, long-term scaling",
    perks: [
      "100% Dedicated 160+ hours / month per developer",
      "Direct daily communication via Slack / Teams / WhatsApp",
      "Seamless integration with your internal workflow",
      "Flexible scaling: add or swap developers with 2 weeks notice",
      "Zero recruitment overhead, zero infrastructure hassle"
    ],
    cta: "Hire Dedicated Talent"
  },
  {
    title: "Fixed-Price Milestone",
    popular: true,
    tagline: "Defined deliverables, crystal-clear deadline, and fixed budget",
    bestFor: "MVPs, specific product builds, redesigns with defined scope",
    perks: [
      "Pre-agreed milestone schedule and deliverables",
      "Guaranteed on-time completion within approved budget",
      "Milestone-based payment releases upon your sign-off",
      "Comprehensive end-to-end project management included",
      "30-day post-launch warranty and bug-fix guarantee"
    ],
    cta: "Get Fixed Quote"
  },
  {
    title: "Time & Material (Agile)",
    tagline: "Pay only for actual hours logged with maximum sprint flexibility",
    bestFor: "Dynamic requirements, early-stage exploratory research, rapid pivots",
    perks: [
      "Sprint-by-sprint scope adjustments without change orders",
      "Weekly transparent timesheets & Jira progress updates",
      "Prioritize and re-order backlog items at any time",
      "Pay only for productive engineering hours delivered",
      "Access to mixed skillsets (UI designer, QA, Lead Architect as needed)"
    ],
    cta: "Discuss Agile Model"
  }
];

export const teamMembers = [
  {
    name: "Hardik Daki",
    role: "CEO & Founder",
    bio: "Technologist & entrepreneur passionate about building scalable digital businesses and enterprise software ecosystems.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    specialties: ["Executive Leadership", "SaaS Strategy", "Business Architecture"]
  },
  {
    name: "Durgesh Jadav",
    role: "CTO & Co-Founder",
    bio: "Architecting cloud systems, scalable microservices, and leading Infinite's AI and engineering initiatives.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    specialties: ["Cloud Architecture", "AI / ML Pipelines", "Enterprise Security"]
  },
  {
    name: "Vinesh Jadav",
    role: "Business Head - Service",
    bio: "Ensuring top-tier client partnerships, agile delivery standards, and customer success across all global engagements.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    specialties: ["Client Relations", "Agile Operations", "Product Delivery"]
  },
  {
    name: "Jainish Gamit",
    role: "Lead React & Frontend Engineer",
    bio: "Specializing in high-performance Single Page Applications, Tailwind design systems, and responsive user interfaces.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    specialties: ["React.js", "Next.js", "Tailwind CSS", "State Architecture"]
  },
  {
    name: "Pratham Vaghela",
    role: "Senior Backend & Python Engineer",
    bio: "Focusing on Django, FastAPI, database query optimization, and high-concurrency RESTful API architectures.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    specialties: ["Python / Django", "PostgreSQL", "FastAPI", "API Security"]
  },
  {
    name: "Kenil Shah",
    role: "Full-Stack & Mobile Developer",
    bio: "Crafting fluid cross-platform mobile apps with Flutter & React Native alongside NodeJS microservices.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    specialties: ["Flutter", "React Native", "Node.js", "Realtime WebSockets"]
  }
];

export const testimonials = [
  {
    name: "Rajesh Patel",
    company: "Apex Healthcare Logistics",
    role: "Managing Director",
    quote: "Infinite Soft Tech completely transformed our dispatch and workforce operations. Their custom software automated our attendance and billing pipelines, saving us dozens of hours each week. True technical partners!",
    rating: 5,
    location: "Ahmedabad, India"
  },
  {
    name: "Sneha Mehta",
    company: "Shree Vidya Educational Trust",
    role: "Academic Director",
    quote: "Implementing Vidyapeeth ERP was the best decision for our institutions. The system handles 12,000+ student records, fees collection, and parent communication flawlessly. The team's post-launch support is outstanding.",
    rating: 5,
    location: "Gujarat, India"
  },
  {
    name: "Amit Sharma",
    company: "Uma Global Foods",
    role: "Head of Operations",
    quote: "The e-commerce platform Infinite Soft Tech built for us increased our online revenue by over 200%. The site is blazing fast, and the automated WhatsApp order tracking delighted our retail and wholesale buyers.",
    rating: 5,
    location: "Mumbai, India"
  },
  {
    name: "David Reynolds",
    company: "CloudScale US",
    role: "VP of Engineering",
    quote: "We hired 3 dedicated React and Python developers from Infinite Soft Tech. Their technical caliber, communication, and speed of delivery exceeded our expectations. Highly recommended for staff augmentation.",
    rating: 5,
    location: "Austin, Texas"
  }
];

export const faqs = [
  {
    question: "What core software and IT services does Infinite Soft Tech provide?",
    answer: "We offer end-to-end digital solutions including: Custom Web Application Development (React, Next.js), Cross-Platform Mobile Apps (Flutter, React Native), Enterprise ERP & CRM suites (such as our Vidyapeeth ERP and Infinite Employee HRMS), Generative AI & Automation solutions, and Cloud DevOps infrastructure."
  },
  {
    question: "What is your typical project cost and turnaround timeline?",
    answer: "Project cost depends on requirements, complexity, and engagement model. A focused MVP or custom web application typically ranges from $1,500 to $8,000 (₹1.2L to ₹6.5L) with a timeline of 3 to 8 weeks. Larger enterprise platforms or multi-module ERPs range higher. You can use our interactive Cost Estimator on this page to get an immediate ballpark estimate."
  },
  {
    question: "Can I hire dedicated developers for my existing product?",
    answer: "Yes! We provide dedicated frontend (React, Next.js), backend (Python, Django, Node, Java), and mobile (Flutter, React Native) developers on a monthly engagement model. You get full control over daily sprint tasks, direct Slack/Teams communication, and dedicated 160+ hours per month."
  },
  {
    question: "How do you protect project confidentiality and intellectual property?",
    answer: "We sign strict Non-Disclosure Agreements (NDAs) prior to project discovery. All source code, intellectual property, database assets, and design files remain 100% your exclusive property upon project completion."
  },
  {
    question: "Can you deploy and host our application on Netlify or AWS?",
    answer: "Absolutely. We configure production-ready automated CI/CD deployments on Netlify (using high-speed Edge CDN and serverless functions for 100% cost-efficiency) or on AWS / Google Cloud with autoscaling, custom domain SSL, and automatic backups."
  },
  {
    question: "Where is Infinite Soft Tech located and can we meet in person?",
    answer: "Our headquarters is located at 205, Emerald Complex, C.G. Road, Ahmedabad, Gujarat, India. You are welcome to visit our office or schedule a video consultation with our founders Hardik Daki and Durgesh Jadav."
  }
];
