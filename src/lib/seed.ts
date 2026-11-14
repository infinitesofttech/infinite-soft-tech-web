/**
 * Default website content. This is what the website shows until you edit it
 * from the admin panel (/admin). Once saved from the admin panel, the stored
 * version (Netlify Blobs) is used instead of this file.
 */
import type {
  BlogPost,
  Client,
  CollectionMap,
  Faq,
  InternshipProgram,
  Product,
  Project,
  Service,
  Settings,
  TeamMember,
  Testimonial,
} from "./types";

export const seedSettings: Settings = {
  companyName: "Infinite Soft Tech",
  tagline: "Beyond Technology. Into Infinite",
  heroBadge: "AI-Powered Software Company in Ahmedabad",
  heroTitle: "Infinite Technology.",
  heroTitleAccent: "Beyond Limits.",
  heroSubtitle:
    "Future-ready websites, mobile apps, ERP, CRM and AI-powered software for modern businesses — planned, built and supported by one dedicated team.",
  heroWords: ["Websites", "Mobile Apps", "ERP Systems", "CRM Software", "SaaS Products", "AI Solutions"],
  phone: "+919409259294",
  phoneDisplay: "+91 94092 59294",
  whatsapp: "919409259294",
  email: "info@infinitesofttech.com",
  address: "205, Emerald Complex, CG Road",
  city: "Ahmedabad",
  state: "Gujarat",
  postalCode: "380009",
  mapUrl: "https://maps.app.goo.gl/JTC3G42trKtcSL3y6",
  mapEmbedUrl: "https://www.google.com/maps?q=Emerald%20Complex%2C%20CG%20Road%2C%20Ahmedabad%20380009&output=embed",
  hours: ["Mon – Fri: 9:00 AM – 7:00 PM", "Saturday: 9:00 AM – 4:00 PM", "Sunday: Closed"],
  linkedin: "https://www.linkedin.com/company/infinite-softtech/",
  instagram: "https://www.instagram.com/infinitesofttech_",
  youtube: "https://youtube.com/@infinitesofttech",
  facebook: "",
  twitter: "",
  stats: [
    { value: 2, suffix: "+", label: "Years of Experience" },
    { value: 12, suffix: "+", label: "Services Offered" },
    { value: 10, suffix: "+", label: "Industries Served" },
    { value: 30, suffix: "+", label: "Technologies" },
  ],
  internshipOpen: true,
  announcement: "Internship admissions open for students",
};

const services: Service[] = [
  {
    id: "svc-web",
    slug: "web-development",
    title: "Website Development",
    category: "Development",
    icon: "Globe",
    short: "Fast, SEO-ready business websites and web applications that turn visitors into enquiries.",
    description:
      "From corporate websites to complex web portals, we design and develop responsive, lightning-fast web experiences. Every website is built mobile-first, optimised for Google and connected to the tools your team already uses — so your website works as your best salesperson, 24/7.",
    features: [
      "Corporate & business websites",
      "Custom web applications & portals",
      "Responsive, mobile-first design",
      "On-page SEO & Core Web Vitals optimisation",
      "CMS & admin panel integration",
      "Hosting, security & maintenance",
    ],
    technologies: ["Next.js", "React", "Node.js", "PHP / Laravel", "Python / Django", "MySQL", "MongoDB"],
    seoTitle: "Website Development Company in Ahmedabad",
    seoDescription:
      "Custom, SEO-friendly and mobile-first website development in Ahmedabad. Corporate websites, web portals and web applications built with Next.js, React, Laravel and Django.",
    published: true,
  },
  {
    id: "svc-mobile",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "Development",
    icon: "Smartphone",
    short: "Native and cross-platform Android & iOS apps with smooth UX and secure backends.",
    description:
      "We build native and cross-platform mobile apps for every business vertical — from customer-facing shopping and booking apps to internal field-force tools. Agile sprints, API-first architecture and end-to-end encrypted data keep your app fast, scalable and secure.",
    features: [
      "Android & iOS app development",
      "Cross-platform apps with Flutter & React Native",
      "API-first backend & admin panel",
      "Push notifications, maps & payments",
      "App Store & Play Store launch",
      "Ongoing updates & support",
    ],
    technologies: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase", "Node.js"],
    seoTitle: "Mobile App Development Company in Ahmedabad",
    seoDescription:
      "Android and iOS mobile app development in Ahmedabad. Native and cross-platform apps with Flutter and React Native, secure APIs and admin panels.",
    published: true,
  },
  {
    id: "svc-erp",
    slug: "erp-development",
    title: "Custom ERP Development",
    category: "Enterprise",
    icon: "Boxes",
    short: "Custom ERP software that connects inventory, sales, HR, accounts and operations in one system.",
    description:
      "Off-the-shelf ERPs force your business to change the way it works. We build custom ERP systems around your exact processes — inventory, purchase, sales, production, HR and accounting — with role-based access, approval workflows and real-time dashboards that help management take faster decisions.",
    features: [
      "Inventory, purchase & sales modules",
      "Manufacturing & production planning",
      "HR, attendance & payroll",
      "Accounting, invoicing & GST reports",
      "Role-based access & approval workflows",
      "Real-time dashboards & MIS reports",
    ],
    technologies: [".NET", "Java / Spring Boot", "Python / Django", "React", "PostgreSQL", "Oracle"],
    seoTitle: "Custom ERP Software Development Company in Ahmedabad",
    seoDescription:
      "Custom ERP software development for manufacturing, distribution, education and enterprises. Inventory, sales, HR, payroll and accounting in one system — built in Ahmedabad.",
    published: true,
  },
  {
    id: "svc-crm",
    slug: "crm-development",
    title: "CRM Development",
    category: "Enterprise",
    icon: "Handshake",
    short: "Custom CRM to manage leads, sales pipeline, follow-ups and customer service in one place.",
    description:
      "Never lose a lead again. Our custom CRM solutions are tailored to how your sales and support teams actually work — capturing leads from your website, WhatsApp and ads, automating follow-ups and giving you analytics on every stage of the pipeline.",
    features: [
      "Lead capture from website, ads & WhatsApp",
      "Sales pipeline & deal tracking",
      "Automated follow-ups & reminders",
      "Quotations, invoices & payment tracking",
      "Customer support & ticketing",
      "Sales analytics & team performance",
    ],
    technologies: ["React", "Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
    seoTitle: "Custom CRM Software Development Company",
    seoDescription:
      "Custom CRM software development to manage leads, sales pipeline, follow-ups and customer support. Automation and analytics tailored to your business.",
    published: true,
  },
  {
    id: "svc-software",
    slug: "software-development",
    title: "Custom Software Development",
    category: "Development",
    icon: "Code2",
    short: "Tailor-made software that automates your workflows and scales with your business.",
    description:
      "We engineer custom software that fits your business instead of forcing you into generic tools. With a structured engineering process — requirement analysis, architecture, development, testing and deployment — we deliver market-ready products faster and keep improving them as your users' needs grow.",
    features: [
      "Requirement analysis & consulting",
      "Web, desktop & cloud software",
      "Business workflow automation",
      "Legacy system modernisation",
      "Third-party integrations",
      "Long-term maintenance & support",
    ],
    technologies: ["Java", ".NET", "Python", "Node.js", "Go", "React"],
    seoTitle: "Custom Software Development Company in Ahmedabad",
    seoDescription:
      "Tailor-made custom software development in Ahmedabad, India. Workflow automation, enterprise software and legacy modernisation with a structured engineering process.",
    published: true,
  },
  {
    id: "svc-ecom",
    slug: "ecommerce-development",
    title: "E-Commerce Development",
    category: "Development",
    icon: "ShoppingCart",
    short: "Custom online stores with secure payments, smooth checkout and powerful admin control.",
    description:
      "We build custom online stores with user-friendly interfaces, secure payment gateways and integrations that boost sales and customer experience. Manage products, orders, inventory and offers from one simple admin panel — on the web and on mobile.",
    features: [
      "Custom storefront design",
      "Payment gateway & UPI integration",
      "Product, order & inventory management",
      "Coupons, offers & loyalty",
      "Shipping & courier integration",
      "Mobile commerce apps",
    ],
    technologies: ["Next.js", "React", "Node.js", "Laravel", "MySQL", "Payment Gateways"],
    seoTitle: "E-Commerce Website Development Company",
    seoDescription:
      "Custom e-commerce website and app development with secure payments, inventory management and a powerful admin panel.",
    published: true,
  },
  {
    id: "svc-saas",
    slug: "saas-development",
    title: "SaaS Product Development",
    category: "Development",
    icon: "Layers",
    short: "Launch, grow and maintain multi-tenant SaaS products built for scale.",
    description:
      "Have a product idea? We help startups and businesses design, build and scale SaaS platforms — from MVP to multi-tenant production systems with subscriptions, user management and analytics. Data-backed decisions and design thinking guide every release.",
    features: [
      "MVP planning & rapid prototyping",
      "Multi-tenant architecture",
      "Subscription plans & billing",
      "User roles & permissions",
      "Analytics dashboards",
      "Cloud deployment & scaling",
    ],
    technologies: ["Next.js", "Node.js", "Python", "PostgreSQL", "AWS", "Azure"],
    seoTitle: "SaaS Product Development Company",
    seoDescription:
      "SaaS product development from MVP to scale — multi-tenant architecture, subscriptions, user management and cloud deployment.",
    published: true,
  },
  {
    id: "svc-uiux",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    category: "Development",
    icon: "Palette",
    short: "User-centred interfaces and design systems that look premium and convert better.",
    description:
      "Good design is good business. Our designers research your users, plan clean user journeys and create pixel-perfect interfaces for websites, apps and dashboards — then hand them over as a consistent design system that developers can build quickly.",
    features: [
      "User research & journey mapping",
      "Wireframes & interactive prototypes",
      "Website, app & dashboard UI",
      "Design systems & style guides",
      "Usability testing",
      "Redesign of existing products",
    ],
    technologies: ["Figma", "Prototyping", "Design Systems", "Responsive UI"],
    seoTitle: "UI/UX Design Company in Ahmedabad",
    seoDescription:
      "UI/UX design for websites, mobile apps and dashboards — user research, wireframes, prototypes and design systems that convert.",
    published: true,
  },
  {
    id: "svc-ai",
    slug: "ai-solutions",
    title: "AI & Automation Solutions",
    category: "AI & Cloud",
    icon: "BrainCircuit",
    short: "AI-powered apps, chatbots and intelligent automation that cut costs and save time.",
    description:
      "We integrate AI into real business workflows — AI-powered apps, generative AI assistants, intelligent automation and data-driven insights. Automate repetitive work, reduce operating costs and give your customers faster, smarter experiences.",
    features: [
      "AI-powered web & mobile apps",
      "Generative AI chatbots & assistants",
      "Intelligent process automation",
      "Data-driven insights & predictions",
      "Document & data extraction",
      "AI integration into existing software",
    ],
    technologies: ["Python", "Machine Learning", "LLM APIs", "Node.js", "Data Engineering"],
    seoTitle: "AI Development & Automation Company",
    seoDescription:
      "AI-powered applications, generative AI chatbots, intelligent automation and data-driven insights for modern businesses.",
    published: true,
  },
  {
    id: "svc-cloud",
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    category: "AI & Cloud",
    icon: "Cloud",
    short: "Secure cloud infrastructure, CI/CD and monitoring on AWS, Azure and Google Cloud.",
    description:
      "We set up and manage reliable cloud infrastructure so your applications stay fast, secure and available. From migration to automated deployments and monitoring, we help you scale without surprises on your cloud bill.",
    features: [
      "Cloud migration & setup",
      "AWS, Azure & GCP deployment",
      "CI/CD pipelines",
      "Server monitoring & backups",
      "Security hardening",
      "Performance & cost optimisation",
    ],
    technologies: ["AWS", "Microsoft Azure", "Google Cloud", "DigitalOcean", "Linux"],
    seoTitle: "Cloud & DevOps Services",
    seoDescription:
      "Cloud migration, AWS/Azure/GCP deployment, CI/CD pipelines, monitoring and security hardening for your applications.",
    published: true,
  },
  {
    id: "svc-api",
    slug: "api-integration",
    title: "API Development & Integration",
    category: "Enterprise",
    icon: "Plug",
    short: "Secure REST APIs and third-party integrations that make your systems talk to each other.",
    description:
      "Connect your website, apps, ERP, CRM, payment gateways and logistics partners. We design secure, well-documented APIs and integrations that remove manual data entry and keep every system in sync.",
    features: [
      "REST API design & development",
      "Payment gateway integration",
      "ERP, CRM & accounting integrations",
      "WhatsApp, SMS & e-mail APIs",
      "API documentation with Swagger",
      "Secure authentication & access control",
    ],
    technologies: ["Node.js", "Python", "Java", "Swagger", "Postman"],
    seoTitle: "API Development & Third-Party Integration Services",
    seoDescription:
      "Secure REST API development and third-party integrations — payment gateways, ERP, CRM, WhatsApp, SMS and more.",
    published: true,
  },
  {
    id: "svc-qa",
    slug: "software-testing",
    title: "Software Testing & QA",
    category: "AI & Cloud",
    icon: "ShieldCheck",
    short: "Manual and automated testing so you ship bug-free, secure and fast software.",
    description:
      "Quality is built into every project we deliver. Our QA team performs functional, automation, performance and security testing across web, mobile and APIs so your users get a smooth, reliable experience from day one.",
    features: [
      "Manual & functional testing",
      "Web automation with Selenium & Cypress",
      "Mobile app testing with Appium",
      "API testing with Postman",
      "Performance & load testing",
      "Security & regression testing",
    ],
    technologies: ["Selenium", "Cypress", "Appium", "Postman", "Swagger"],
    seoTitle: "Software Testing & QA Services",
    seoDescription:
      "Manual and automated software testing — Selenium, Cypress, Appium and Postman — for web, mobile apps and APIs.",
    published: true,
  },
];

const products: Product[] = [
  {
    id: "prd-hrms",
    slug: "infinite-employee-hrms",
    name: "Infinite Employee – HRMS",
    tagline: "Enterprise Workforce Suite",
    icon: "Users",
    short: "Manage employees, attendance, leave and payroll from one smart HR platform.",
    description:
      "Infinite Employee is our HRMS built for growing companies. It brings employee records, attendance, leave, payroll and performance into one secure platform with self-service for every employee — saving HR teams hours of manual work every month.",
    features: [
      "Employee database & digital documents",
      "Attendance & leave management",
      "Payroll processing & payslips",
      "Employee self-service portal",
      "Performance & appraisal tracking",
      "HR reports & analytics",
    ],
    audience: ["Growing companies", "Multi-branch businesses", "HR & admin teams"],
    status: "Live",
    seoTitle: "Infinite Employee HRMS – HR & Payroll Software",
    seoDescription:
      "Infinite Employee HRMS: employee records, attendance, leave, payroll and performance in one secure HR platform.",
    published: true,
  },
  {
    id: "prd-erp",
    slug: "vidyapeeth-erp",
    name: "Vidyapeeth ERP",
    tagline: "Institutional Management System",
    icon: "GraduationCap",
    short: "One ERP for schools, colleges and institutes — from admissions to results.",
    description:
      "Vidyapeeth ERP helps educational institutions streamline internal administration, automate compliance and securely manage access levels. Admissions, fees, attendance, exams and communication come together in one platform for management, staff, students and parents.",
    features: [
      "Admissions & student records",
      "Fee collection & receipts",
      "Attendance & timetable",
      "Exams, marks & report cards",
      "Staff & payroll management",
      "Parent & student portal",
    ],
    audience: ["Schools", "Colleges", "Coaching institutes"],
    status: "Live",
    seoTitle: "Vidyapeeth ERP – School & College Management Software",
    seoDescription:
      "Vidyapeeth ERP: school and college management software for admissions, fees, attendance, exams and parent communication.",
    published: true,
  },
];

const portfolio: Project[] = [
  {
    id: "prj-hrms",
    title: "Infinite Employee HRMS",
    client: "In-house product",
    category: "ERP & Software",
    summary: "Enterprise workforce suite for employee records, attendance, leave and payroll.",
    tags: ["HRMS", "Web App", "Dashboard"],
    status: "Live",
    link: "/products/infinite-employee-hrms",
    accent: "blue",
    published: true,
  },
  {
    id: "prj-vidyapeeth",
    title: "Vidyapeeth ERP",
    client: "In-house product",
    category: "ERP & Software",
    summary: "Institutional management ERP covering admissions, fees, attendance and exams.",
    tags: ["ERP", "Education", "Web App"],
    status: "Live",
    link: "/products/vidyapeeth-erp",
    accent: "violet",
    published: true,
  },
  {
    id: "prj-uma",
    title: "Uma Papad",
    client: "Uma Foods & Snacks",
    category: "E-Commerce",
    summary: "E-commerce platform for a food brand with product catalogue, cart and secure checkout.",
    tags: ["E-Commerce", "Website"],
    status: "Live",
    link: "https://www.umafoodsandsnacks.com/",
    accent: "pink",
    published: true,
  },
];

const internships: InternshipProgram[] = [
  {
    id: "int-mern",
    title: "Full Stack Web Development (MERN)",
    icon: "Code2",
    duration: "3 – 6 Months",
    mode: "Offline / Online",
    level: "Beginner to Advanced",
    description: "Build complete web applications with MongoDB, Express, React and Node.js on live projects.",
    skills: ["HTML & CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Git"],
    published: true,
  },
  {
    id: "int-react",
    title: "React & Next.js Frontend",
    icon: "MonitorSmartphone",
    duration: "3 – 6 Months",
    mode: "Offline / Online",
    level: "Beginner to Intermediate",
    description: "Create fast, responsive, SEO-friendly interfaces with React, Next.js and Tailwind CSS.",
    skills: ["React", "Next.js", "Tailwind CSS", "REST APIs", "TypeScript basics"],
    published: true,
  },
  {
    id: "int-python",
    title: "Python & Django Development",
    icon: "Terminal",
    duration: "3 – 6 Months",
    mode: "Offline / Online",
    level: "Beginner to Advanced",
    description: "Learn backend development with Python, Django and REST APIs used in real ERP projects.",
    skills: ["Python", "Django", "REST Framework", "PostgreSQL", "Git"],
    published: true,
  },
  {
    id: "int-java",
    title: "Java & Spring Boot",
    icon: "Server",
    duration: "3 – 6 Months",
    mode: "Offline / Online",
    level: "Beginner to Intermediate",
    description: "Master core Java, OOP and Spring Boot to build enterprise-grade backend services.",
    skills: ["Core Java", "OOP", "Spring Boot", "MySQL", "REST APIs"],
    published: true,
  },
  {
    id: "int-flutter",
    title: "Flutter Mobile App Development",
    icon: "Smartphone",
    duration: "3 – 6 Months",
    mode: "Offline / Online",
    level: "Beginner to Intermediate",
    description: "Design and build Android & iOS apps with Flutter, Firebase and real APIs.",
    skills: ["Dart", "Flutter", "Firebase", "REST APIs", "Play Store release"],
    published: true,
  },
  {
    id: "int-uiux",
    title: "UI/UX Design",
    icon: "Palette",
    duration: "2 – 3 Months",
    mode: "Offline / Online",
    level: "Beginner",
    description: "Learn user research, wireframing and high-fidelity UI design for apps and websites.",
    skills: ["Figma", "Wireframing", "Prototyping", "Design Systems"],
    published: true,
  },
  {
    id: "int-qa",
    title: "Software Testing & QA",
    icon: "ShieldCheck",
    duration: "2 – 3 Months",
    mode: "Offline / Online",
    level: "Beginner",
    description: "Learn manual testing, test cases and automation with Selenium and Postman.",
    skills: ["Manual Testing", "Test Cases", "Selenium", "Postman", "Bug Tracking"],
    published: true,
  },
  {
    id: "int-ai",
    title: "AI & Machine Learning with Python",
    icon: "BrainCircuit",
    duration: "3 – 6 Months",
    mode: "Offline / Online",
    level: "Intermediate",
    description: "Work with data, build ML models and integrate AI APIs into real applications.",
    skills: ["Python", "NumPy & Pandas", "ML Models", "LLM APIs", "Data Visualisation"],
    published: true,
  },
];

const team: TeamMember[] = [
  { id: "tm-1", name: "Hardik K Daki", role: "CEO & Founder", group: "Management", published: true },
  { id: "tm-2", name: "Durgesh D Jadav", role: "CTO & Founder", group: "Management", published: true },
  { id: "tm-3", name: "Vinesh A Jadav", role: "Business Head – Service", group: "Management", published: true },
  { id: "tm-4", name: "Krishna R Desai", role: "HR Lead", group: "Team", published: true },
  { id: "tm-5", name: "Jainish A Gamit", role: "React Developer", group: "Team", published: true },
  { id: "tm-6", name: "Pratham D Vaghela", role: "Python Developer", group: "Team", published: true },
  { id: "tm-7", name: "Kenil H Shah", role: "MERN Stack Developer", group: "Team", published: true },
];

const faqs: Faq[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What software development services do you offer?",
    answer:
      "We offer website development, mobile app development, custom ERP and CRM development, custom software, e-commerce, SaaS products, UI/UX design, AI & automation, cloud & DevOps, API integrations and software testing — everything under one roof.",
    published: true,
  },
  {
    id: "faq-2",
    category: "General",
    question: "What is the average development cost and time?",
    answer:
      "It depends on the type of software and your business model. Projects typically range from around $200 for a simple website to $18,000+ for complex custom platforms. A typical app takes around 3 to 6 months, while larger custom solutions vary. Share your requirements and we will send you a free, detailed estimate.",
    published: true,
  },
  {
    id: "faq-3",
    category: "General",
    question: "Which hiring and engagement models do you provide?",
    answer:
      "We work with three models: Dedicated Team Hiring, Time & Material (hourly) and a Bucket / Fixed-cost approach. We help you choose the one that fits your scope, timeline and budget.",
    published: true,
  },
  {
    id: "faq-4",
    category: "General",
    question: "Do you build custom ERP and CRM for large companies?",
    answer:
      "Yes. We design ERP and CRM systems around your exact workflow — inventory, sales, purchase, HR, accounts, production and more — with role-based access, approvals and real-time dashboards. We can also integrate them with your existing software.",
    published: true,
  },
  {
    id: "faq-5",
    category: "General",
    question: "How do you ensure the security of my application?",
    answer:
      "We follow industry-standard security practices: secure coding, multiple layers of encryption, role-based access control, regular testing and trusted third-party security systems.",
    published: true,
  },
  {
    id: "faq-6",
    category: "General",
    question: "Do you provide support after the project goes live?",
    answer:
      "Yes. Deployment is followed by ongoing maintenance and support — bug fixes, updates, monitoring, backups and new features as your business grows.",
    published: true,
  },
  {
    id: "faq-7",
    category: "Internship",
    question: "Who can apply for the internship?",
    answer:
      "Students and freshers from BE / B.Tech, BCA, MCA, B.Sc IT, Diploma and related courses who want hands-on experience on real projects. Basic programming knowledge helps, but our mentors guide you from the fundamentals.",
    published: true,
  },
  {
    id: "faq-8",
    category: "Internship",
    question: "Will I work on live projects?",
    answer:
      "Yes. Interns work alongside our developers on real projects and in-house products, so you learn the industry workflow — Git, code reviews, testing and deployment — not just theory.",
    published: true,
  },
  {
    id: "faq-9",
    category: "Internship",
    question: "Will I get an internship certificate?",
    answer:
      "Yes. Every intern who successfully completes the program receives an internship completion certificate. Top performers can also receive a letter of recommendation.",
    published: true,
  },
  {
    id: "faq-10",
    category: "Internship",
    question: "Is the internship online or offline?",
    answer:
      "Both options are available — offline at our Ahmedabad office on CG Road and online for selected programs. Mention your preference in the application form and our team will guide you.",
    published: true,
  },
];

const blog: BlogPost[] = [
  {
    id: "blog-1",
    slug: "custom-erp-vs-ready-made-erp",
    title: "Custom ERP vs Ready-Made ERP: Which Is Right for Your Business?",
    excerpt:
      "Spreadsheets and disconnected tools slowing you down? Here is a clear comparison of custom and off-the-shelf ERP — costs, flexibility and when each one makes sense.",
    author: "Infinite Soft Tech",
    date: "2026-10-20",
    tags: ["ERP", "Business Software"],
    seoTitle: "Custom ERP vs Ready-Made ERP – Which Should You Choose?",
    seoDescription:
      "Compare custom ERP and ready-made ERP software: cost, flexibility, integrations and when to choose each. A practical guide for growing businesses in India.",
    published: true,
    content: `Every growing business reaches a point where spreadsheets, WhatsApp groups and disconnected software start slowing things down. Orders get missed, stock numbers don't match and management waits days for reports. That is usually when the ERP conversation begins — and the first big question is whether to buy a ready-made ERP or build a custom one.

## What is a ready-made ERP?

A ready-made (off-the-shelf) ERP is a pre-built product sold to thousands of businesses. You configure it, train your team and start using it.

**Advantages**

- Faster to start for standard processes
- Lower upfront cost for small teams
- The vendor handles core updates

**Limitations**

- You change your process to fit the software
- Per-user licence fees grow every year as your team grows
- Unused modules add complexity, while the features you really need may be missing
- Integrations with your existing tools can be difficult or expensive

## What is a custom ERP?

A custom ERP is designed around how *your* business actually works — your approval chain, your pricing rules, your production flow and your reports.

**Advantages**

- Every screen and workflow matches your process
- No per-user licence fees — add users as you grow
- Integrates with your website, CRM, payment gateways and accounting tools
- Modules can be added step by step as the business grows
- A competitive edge that competitors can't buy off the shelf

**Things to plan for**

- It needs a clear requirement-analysis phase
- It takes longer than switching on a ready-made product
- You need a reliable technology partner for support

## Which one should you choose?

Choose a **ready-made ERP** if your processes are very standard, your team is small and you need something running next week.

Choose a **custom ERP** if:

1. Your workflow is unique (manufacturing, distribution, education, multi-branch retail)
2. You have outgrown generic software or pay heavily for licences
3. You need ERP, CRM, HR and your website to work as one connected system
4. You want real-time dashboards built around the numbers *you* track

## How we build custom ERP at Infinite Soft Tech

Our process follows three phases — **Design, Develop and Deliver**. We start with requirement analysis and system architecture, build in agile sprints with continuous testing, and deploy on secure cloud servers with ongoing maintenance and support. We have built products like **Vidyapeeth ERP** for institutions and **Infinite Employee HRMS** for workforce management, so we understand both the technology and the day-to-day reality of running operations.

Not sure which option fits you? [Talk to our team](/contact) for a free consultation — we will review your current process and recommend the most cost-effective path.`,
  },
  {
    id: "blog-2",
    slug: "mobile-app-development-cost-india",
    title: "How Much Does Mobile App Development Cost in India? A Practical Guide",
    excerpt:
      "App budgets vary widely. Learn what actually drives the cost of a mobile app, typical timelines and smart ways to launch faster without overspending.",
    author: "Infinite Soft Tech",
    date: "2026-10-05",
    tags: ["Mobile Apps", "Cost Guide"],
    seoTitle: "Mobile App Development Cost in India – 2026 Guide",
    seoDescription:
      "What does it cost to build a mobile app in India? Key cost factors, typical timelines, engagement models and tips to reduce your app development budget.",
    published: true,
    content: `"How much will my app cost?" is the first question almost every client asks — and the honest answer is: it depends on what you want the app to do. The good news is that the cost is not a mystery. It is driven by a handful of clear factors you can control.

## What drives the cost of an app?

1. **Type of app** — a simple information or booking app costs far less than a marketplace, delivery or fintech app.
2. **Number of features** — login, payments, chat, maps, notifications and dashboards each add design, development and testing time.
3. **Platforms** — Android only, iOS only, or both. Cross-platform frameworks like Flutter and React Native let one codebase run on both.
4. **Design** — a custom, branded UI with animations takes more effort than a standard layout.
5. **Backend & admin panel** — most business apps need a secure server, database, APIs and an admin panel to manage content, users and orders.
6. **Integrations** — payment gateways, SMS, WhatsApp, ERP or CRM connections.
7. **Maintenance** — OS updates, new features, monitoring and support after launch.

## Typical budget range

Projects typically range from around **$200 for a simple website to $18,000+ for complex custom platforms**. Most business apps land somewhere in between depending on the factors above. The only way to get an accurate number is a short requirement discussion — which is why we always share a free, detailed estimate before you commit.

## How long does it take?

A typical app takes around **3 to 6 months** from planning to launch. A focused MVP can be faster, while large platforms with many user roles take longer. We work in agile sprints, so you see working builds regularly instead of waiting until the end.

## Choose the right engagement model

- **Dedicated Hiring** — ideal for dynamic requirements, unclear scope, short-term consulting and proof-of-concepts.
- **Time & Material** — best for long-term projects, fast scaling and ongoing development.
- **Bucket approach** — a convenient payment option linked to successful project milestones.

## 5 ways to reduce your app cost

- Start with an **MVP** — launch the core features first and grow with user feedback
- Use **cross-platform** development to cover Android and iOS together
- Write down your requirements and reference apps before development starts
- Reuse proven modules like authentication, payments and notifications
- Plan maintenance from day one so small issues never become expensive rewrites

## Get a free estimate

Have an app idea? [Share your requirements](/contact) and our team will reply with a clear scope, timeline and cost — no obligation.`,
  },
  {
    id: "blog-3",
    slug: "it-internship-in-ahmedabad-guide",
    title: "IT Internship in Ahmedabad: How Students Can Choose the Right Program",
    excerpt:
      "An internship can shape your entire tech career. Here is what to look for — live projects, mentorship, modern technology — and how to prepare before you apply.",
    author: "Infinite Soft Tech",
    date: "2026-09-18",
    tags: ["Internship", "Careers"],
    seoTitle: "IT Internship in Ahmedabad – How to Choose the Right Program",
    seoDescription:
      "Looking for an IT internship in Ahmedabad? Learn what makes a good internship, which technology to choose and how to prepare as a BE, BCA, MCA or Diploma student.",
    published: true,
    content: `For computer engineering, IT, BCA, MCA and Diploma students, an internship is often the bridge between college theory and a first job. But not every internship teaches you the skills companies actually hire for. Here is how to choose wisely.

## Why an internship matters

Recruiters want to see that you can work on real code with a real team. A good internship gives you:

- Experience on **live projects**, not just practice exercises
- A **portfolio** and GitHub profile you can show in interviews
- Exposure to professional workflows — Git, code reviews, testing and deployment
- Confidence to explain your work in technical interviews

## What to look for in an internship program

1. **Live project work** — ask what projects interns actually contribute to.
2. **Mentorship from working developers** — people who ship software every day.
3. **Modern technology** — React, Next.js, Node.js, Python, Django, Flutter and cloud tools are in demand.
4. **Small batches** — so mentors can review your code personally.
5. **Certificate and recommendation** — proof of your work for future employers.

## Which technology should you choose?

- **MERN / Full Stack** — if you enjoy building complete web applications.
- **React & Next.js** — if you love UI, animations and frontend performance.
- **Python & Django** — great for backend, APIs and future AI/ML work.
- **Java & Spring Boot** — widely used in enterprise software.
- **Flutter** — one codebase for Android and iOS apps.
- **UI/UX Design** — if you are creative and like solving user problems.
- **Software Testing** — a strong entry point into the IT industry.
- **AI & Machine Learning** — if you are comfortable with Python and maths.

## Red flags to avoid

- Only theory or recorded videos with no real code reviews
- Outdated technology that companies no longer use
- No clear outcome — no project, no certificate, no feedback

## How to prepare before you apply

- Learn the basics of one programming language
- Create a GitHub account and push a small project
- Understand HTML, CSS and how the web works
- Be curious — ask questions and build things on your own

## Internship at Infinite Soft Tech

At Infinite Soft Tech in Ahmedabad, interns learn by building real software alongside our developers — the same team that builds our ERP, HRMS, websites and mobile apps. [Explore our internship programs](/internship) and apply online in two minutes.`,
  },
];

const testimonials: Testimonial[] = [];
const clients: Client[] = [];

export const seedCollections: { [K in keyof CollectionMap]: CollectionMap[K][] } = {
  services,
  products,
  portfolio,
  internships,
  blog,
  team,
  testimonials,
  faqs,
  clients,
};
