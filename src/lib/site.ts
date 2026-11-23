/** Static, rarely-changing website data (edit here if needed). */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://infinitesofttech.com").replace(/\/+$/, "");
export const SITE_NAME = "Infinite Soft Tech";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", mega: "services" as const },
  { href: "/solutions", label: "ERP Solutions", mega: "solutions" as const },
  { href: "/products", label: "Products", mega: "products" as const },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/internship", label: "Internship", badge: "Open" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const SERVICE_CATEGORIES = ["Development", "Enterprise", "AI & Cloud"] as const;

export const INDUSTRIES = [
  { name: "Healthcare", icon: "HeartPulse" },
  { name: "Education", icon: "GraduationCap" },
  { name: "Banking & Finance", icon: "Landmark" },
  { name: "Retail & E-Commerce", icon: "Store" },
  { name: "Agriculture", icon: "Wheat" },
  { name: "Travel", icon: "Plane" },
  { name: "Hospitality", icon: "Hotel" },
  { name: "Food & Restaurant", icon: "UtensilsCrossed" },
  { name: "Entertainment", icon: "Clapperboard" },
  { name: "Real Estate", icon: "Building2" },
];

export const TECH_STACK: { category: string; icon: string; items: string[] }[] = [
  { category: "Frontend", icon: "MonitorSmartphone", items: ["React", "Next.js", "Angular", "Vue.js", "JavaScript", "TypeScript", "HTML5", "CSS3"] },
  { category: "Backend", icon: "Server", items: ["Node.js", "Python / Django", "Java / Spring Boot", "PHP / Laravel", ".NET", "Go", "Rust"] },
  { category: "Mobile", icon: "Smartphone", items: ["Flutter", "React Native", "Kotlin", "Swift", "Android", "iOS", "Ionic"] },
  { category: "Database", icon: "Database", items: ["MongoDB", "PostgreSQL", "MySQL", "Oracle", "Firebase"] },
  { category: "Cloud & DevOps", icon: "Cloud", items: ["AWS", "Microsoft Azure", "Google Cloud", "DigitalOcean"] },
  { category: "Testing", icon: "ShieldCheck", items: ["Selenium", "Cypress", "Appium", "Postman", "Swagger"] },
];

export const MARQUEE_TECH = [
  "React", "Next.js", "Node.js", "Python", "Django", "Java", "Spring Boot", "Laravel", ".NET", "Flutter",
  "React Native", "Kotlin", "Swift", "Angular", "Vue.js", "MongoDB", "PostgreSQL", "MySQL", "Firebase",
  "AWS", "Azure", "Google Cloud", "Selenium", "Postman",
];

export const PROCESS = [
  {
    phase: "Design",
    icon: "PenTool",
    text: "We design solutions that are scalable, secure and user-focused.",
    steps: ["Requirement analysis", "UI/UX planning", "System architecture design", "Technology stack selection"],
  },
  {
    phase: "Develop",
    icon: "Code2",
    text: "We build robust applications using modern technologies.",
    steps: ["Frontend & backend development", "Database integration", "API development", "Security implementation", "Continuous testing"],
  },
  {
    phase: "Deliver",
    icon: "Rocket",
    text: "We deliver results that drive growth and innovation.",
    steps: ["Quality assurance", "Performance optimisation", "Cloud / server deployment", "Ongoing maintenance & support"],
  },
];

export const ENGAGEMENT_MODELS = [
  {
    title: "Dedicated Hiring",
    icon: "UserCheck",
    text: "Ideal for dynamic requirements, unclear scope, short-term consulting and proof-of-concepts.",
    points: ["Dedicated developers", "Daily communication", "Scale the team up or down"],
  },
  {
    title: "Time & Material",
    icon: "Timer",
    text: "Best for full-time support, long-term projects, fast scaling and expert development.",
    points: ["Pay for actual effort", "Flexible scope", "Transparent reporting"],
  },
  {
    title: "Bucket Approach",
    icon: "Wallet",
    text: "A convenient payment option linked to the successful completion of project milestones.",
    points: ["Milestone-based payments", "Clear deliverables", "Predictable budget"],
  },
];

export const WHY_US = [
  { title: "Structured Engineering", icon: "Workflow", text: "Agile sprints, clear milestones and predictable delivery for every project." },
  { title: "Everything Under One Roof", icon: "Layers", text: "Design, web, mobile, ERP, CRM, AI, cloud and QA — one accountable team." },
  { title: "AI-First Mindset", icon: "Sparkles", text: "We use AI where it adds real value: automation, insights and smarter apps." },
  { title: "Security by Design", icon: "Lock", text: "Secure coding, encryption and role-based access built in from day one." },
  { title: "Transparent Communication", icon: "MessageCircle", text: "A dedicated point of contact, regular demos and honest timelines." },
  { title: "Long-Term Support", icon: "Headphones", text: "Maintenance, monitoring and new features long after go-live." },
];

export const VALUES = [
  { title: "Empower Through Engineering", icon: "Cpu", text: "Strong engineering is the foundation of every product we build." },
  { title: "Scale with Purpose", icon: "TrendingUp", text: "Systems designed to grow with your business, not hold it back." },
  { title: "Learn & Improve Continuously", icon: "Lightbulb", text: "We keep learning new technology so our clients and interns stay ahead." },
];

export const DELIVERY_GROUPS = [
  { title: "Custom Software & Product Development", icon: "Code2", items: ["Custom Software Engineering", "SaaS Product Design & Development", "Web & Mobile Application Development"] },
  { title: "Cloud, Data & Intelligent Systems", icon: "Cloud", items: ["Cloud Computing & Infrastructure", "Data Engineering & Data Science", "AI and Machine Learning Solutions"] },
  { title: "Enterprise Systems & Integrations", icon: "Boxes", items: ["Enterprise Systems Integration", "CRM Implementation & Customisation", "API Development & Third-Party Integrations"] },
  { title: "Emerging & Advanced Technologies", icon: "Cpu", items: ["Blockchain Development", "IoT & Hardware Engineering", "Embedded Systems & Smart Devices"] },
  { title: "IT Operations & Consulting", icon: "Briefcase", items: ["Technology Consulting & Digital Strategy", "Managed IT Services & Support", "Call Center Systems Implementation"] },
];

export const ERP_MODULES = [
  { name: "Inventory & Warehouse", icon: "Package" },
  { name: "Sales & Purchase", icon: "Receipt" },
  { name: "HR & Payroll", icon: "Users" },
  { name: "Accounts & GST", icon: "Wallet" },
  { name: "Production Planning", icon: "Factory" },
  { name: "CRM & Lead Pipeline", icon: "Handshake" },
  { name: "Approvals & Workflows", icon: "Workflow" },
  { name: "MIS Reports & Dashboards", icon: "ChartColumn" },
];

export const INTERNSHIP_BENEFITS = [
  { title: "Live Project Experience", icon: "Rocket", text: "Work on real client projects and in-house products, not dummy exercises." },
  { title: "Mentorship by Developers", icon: "Users", text: "Learn directly from the developers who build our ERP, HRMS and apps." },
  { title: "Industry Workflow", icon: "Workflow", text: "Git, code reviews, testing and deployment — exactly how companies work." },
  { title: "Internship Certificate", icon: "Award", text: "Completion certificate, plus a recommendation letter for top performers." },
  { title: "Portfolio & GitHub", icon: "FolderGit2", text: "Finish with projects you can confidently show in interviews." },
  { title: "Career Guidance", icon: "Target", text: "Resume reviews, mock interviews and guidance for your first tech job." },
];

export const INTERNSHIP_STEPS = [
  { title: "Apply Online", text: "Fill the 2-minute application form below." },
  { title: "Interaction", text: "A short call / meeting to understand your goals and skills." },
  { title: "Join a Batch", text: "Pick your technology, duration and mode (offline / online)." },
  { title: "Build Live Projects", text: "Learn, code and ship with mentor reviews every week." },
  { title: "Get Certified", text: "Complete your project and receive your certificate." },
];

export const BUDGET_OPTIONS = ["Below $500", "$500 – $1K", "$1K – $10K", "$10K – $50K", "Above $50K", "Not sure yet"];
export const PROJECT_TYPES = ["New Project", "Existing Project", "Support & Maintenance"];
export const STUDENT_YEARS = ["1st Year", "2nd Year", "3rd Year", "Final Year", "Graduated / Fresher"];
export const INTERNSHIP_DURATIONS = ["2 Months", "3 Months", "6 Months"];
export const INTERNSHIP_MODES = ["Offline (Ahmedabad office)", "Online", "Any"];
