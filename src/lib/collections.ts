/** Admin panel field definitions for each editable collection (client + server safe). */
import type { CollectionKey } from "./types";

export type FieldType =
  | "text"
  | "textarea"
  | "markdown"
  | "number"
  | "select"
  | "boolean"
  | "list"
  | "image"
  | "icon"
  | "date"
  | "url"
  | "slug"
  | "objectList";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  help?: string;
  placeholder?: string;
  /** Slug fields: the field the slug is generated from */
  from?: string;
  /** objectList sub-fields */
  fields?: FieldDef[];
  /** Span both columns in the editor grid */
  wide?: boolean;
}

export interface CollectionDef {
  key: CollectionKey;
  label: string;
  singular: string;
  description: string;
  titleField: string;
  subtitleField?: string;
  /** Public URL prefix for the "view" link (items with a slug) */
  publicPath?: string;
  fields: FieldDef[];
}

const seoFields: FieldDef[] = [
  { name: "seoTitle", label: "SEO title (optional)", type: "text", help: "Shown in Google results. Leave empty to use the title.", wide: true },
  { name: "seoDescription", label: "SEO description (optional)", type: "textarea", help: "150–160 characters works best.", wide: true },
];

const published: FieldDef = { name: "published", label: "Published (visible on website)", type: "boolean" };

export const COLLECTION_DEFS: Record<CollectionKey, CollectionDef> = {
  services: {
    key: "services",
    label: "Services",
    singular: "Service",
    description: "Services shown on the home page, services page, navigation menu and quote form.",
    titleField: "title",
    subtitleField: "category",
    publicPath: "/services/",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "slug", from: "title", required: true, help: "Used in the page URL: /services/your-slug" },
      { name: "category", label: "Menu category", type: "select", options: ["Development", "Enterprise", "AI & Cloud"], required: true },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "short", label: "Short description (cards)", type: "textarea", required: true, wide: true },
      { name: "description", label: "Full description (service page)", type: "textarea", required: true, wide: true },
      { name: "features", label: "Features (one per line)", type: "list", wide: true },
      { name: "technologies", label: "Technologies (one per line)", type: "list", wide: true },
      ...seoFields,
      published,
    ],
  },
  products: {
    key: "products",
    label: "Products",
    singular: "Product",
    description: "Your own software products (HRMS, ERP...).",
    titleField: "name",
    subtitleField: "tagline",
    publicPath: "/products/",
    fields: [
      { name: "name", label: "Product name", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "slug", from: "name", required: true },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "status", label: "Status", type: "select", options: ["Live", "Beta", "Coming Soon"] },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "image", label: "Screenshot (optional)", type: "image" },
      { name: "short", label: "Short description", type: "textarea", required: true, wide: true },
      { name: "description", label: "Full description", type: "textarea", required: true, wide: true },
      { name: "features", label: "Features (one per line)", type: "list", wide: true },
      { name: "audience", label: "Ideal for (one per line)", type: "list", wide: true },
      { name: "link", label: "External link (optional)", type: "url" },
      ...seoFields,
      published,
    ],
  },
  portfolio: {
    key: "portfolio",
    label: "Portfolio",
    singular: "Project",
    description: "Projects shown on the home page and portfolio page.",
    titleField: "title",
    subtitleField: "category",
    fields: [
      { name: "title", label: "Project title", type: "text", required: true },
      { name: "client", label: "Client name", type: "text" },
      { name: "category", label: "Category", type: "select", options: ["Website", "Mobile App", "ERP & Software", "E-Commerce", "AI", "UI/UX"], required: true },
      { name: "status", label: "Status", type: "select", options: ["Live", "In Development", "Completed"] },
      { name: "summary", label: "Summary", type: "textarea", required: true, wide: true },
      { name: "tags", label: "Tags (one per line)", type: "list" },
      { name: "accent", label: "Card colour", type: "select", options: ["blue", "violet", "pink", "emerald", "orange"] },
      { name: "image", label: "Image (optional)", type: "image", help: "Landscape screenshot works best (1200×800)." },
      { name: "link", label: "Live link / page link", type: "url" },
      published,
    ],
  },
  internships: {
    key: "internships",
    label: "Internship Programs",
    singular: "Program",
    description: "Programs listed on the internship page and in the application form.",
    titleField: "title",
    subtitleField: "duration",
    fields: [
      { name: "title", label: "Program title", type: "text", required: true },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "duration", label: "Duration", type: "text", placeholder: "3 – 6 Months" },
      { name: "mode", label: "Mode", type: "text", placeholder: "Offline / Online" },
      { name: "level", label: "Level", type: "text", placeholder: "Beginner to Advanced" },
      { name: "description", label: "Description", type: "textarea", required: true, wide: true },
      { name: "skills", label: "Skills / topics (one per line)", type: "list", wide: true },
      published,
    ],
  },
  blog: {
    key: "blog",
    label: "Blog",
    singular: "Post",
    description: "Blog articles — great for Google ranking. Write in Markdown.",
    titleField: "title",
    subtitleField: "date",
    publicPath: "/blog/",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, wide: true },
      { name: "slug", label: "URL slug", type: "slug", from: "title", required: true },
      { name: "date", label: "Publish date", type: "date", required: true },
      { name: "author", label: "Author", type: "text" },
      { name: "tags", label: "Tags (one per line)", type: "list" },
      { name: "cover", label: "Cover image (optional)", type: "image" },
      { name: "excerpt", label: "Excerpt (short summary)", type: "textarea", required: true, wide: true },
      { name: "content", label: "Content (Markdown)", type: "markdown", required: true, wide: true },
      ...seoFields,
      published,
    ],
  },
  team: {
    key: "team",
    label: "Team",
    singular: "Member",
    description: "Team members shown on the About page.",
    titleField: "name",
    subtitleField: "role",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "group", label: "Group", type: "select", options: ["Management", "Team"] },
      { name: "photo", label: "Photo (optional)", type: "image", help: "Square photo works best." },
      { name: "linkedin", label: "LinkedIn URL", type: "url" },
      published,
    ],
  },
  testimonials: {
    key: "testimonials",
    label: "Testimonials",
    singular: "Testimonial",
    description: "Real client reviews. The section is hidden on the website until you add at least one.",
    titleField: "name",
    subtitleField: "company",
    fields: [
      { name: "name", label: "Client name", type: "text", required: true },
      { name: "role", label: "Role / designation", type: "text" },
      { name: "company", label: "Company", type: "text" },
      { name: "rating", label: "Rating (1–5)", type: "number" },
      { name: "avatar", label: "Photo (optional)", type: "image" },
      { name: "quote", label: "Review", type: "textarea", required: true, wide: true },
      published,
    ],
  },
  faqs: {
    key: "faqs",
    label: "FAQs",
    singular: "FAQ",
    description: "Questions shown on home, contact, services and internship pages (also used for Google FAQ rich results).",
    titleField: "question",
    subtitleField: "category",
    fields: [
      { name: "question", label: "Question", type: "text", required: true, wide: true },
      { name: "category", label: "Category", type: "select", options: ["General", "Internship"], required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true, wide: true },
      published,
    ],
  },
  clients: {
    key: "clients",
    label: "Client Logos",
    singular: "Client",
    description: "Client logos shown in a scrolling strip on the home page (hidden until you add one).",
    titleField: "name",
    fields: [
      { name: "name", label: "Client name", type: "text", required: true },
      { name: "logo", label: "Logo", type: "image" },
      { name: "url", label: "Website", type: "url" },
      published,
    ],
  },
};

export const SETTINGS_FIELDS: { section: string; fields: FieldDef[] }[] = [
  {
    section: "Company & Hero",
    fields: [
      { name: "companyName", label: "Company name", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "heroBadge", label: "Hero badge text", type: "text", wide: true },
      { name: "heroTitle", label: "Hero title (line 1)", type: "text" },
      { name: "heroTitleAccent", label: "Hero title (gradient line 2)", type: "text" },
      { name: "heroSubtitle", label: "Hero subtitle", type: "textarea", wide: true },
      { name: "heroWords", label: "Rotating hero words (one per line)", type: "list", wide: true },
      { name: "announcement", label: "Top bar announcement", type: "text", wide: true },
      { name: "internshipOpen", label: "Internship admissions open", type: "boolean" },
    ],
  },
  {
    section: "Contact details",
    fields: [
      { name: "phone", label: "Phone (with country code, no spaces)", type: "text", placeholder: "+919409259294" },
      { name: "phoneDisplay", label: "Phone (display format)", type: "text", placeholder: "+91 94092 59294" },
      { name: "whatsapp", label: "WhatsApp number (digits only)", type: "text", placeholder: "919409259294" },
      { name: "email", label: "E-mail", type: "text" },
      { name: "address", label: "Street address", type: "text", wide: true },
      { name: "city", label: "City", type: "text" },
      { name: "state", label: "State", type: "text" },
      { name: "postalCode", label: "PIN code", type: "text" },
      { name: "mapUrl", label: "Google Maps link", type: "url" },
      { name: "mapEmbedUrl", label: "Google Maps embed URL", type: "url", wide: true },
      { name: "hours", label: "Working hours (one per line)", type: "list", wide: true },
    ],
  },
  {
    section: "Social media",
    fields: [
      { name: "linkedin", label: "LinkedIn", type: "url" },
      { name: "instagram", label: "Instagram", type: "url" },
      { name: "youtube", label: "YouTube", type: "url" },
      { name: "facebook", label: "Facebook", type: "url" },
      { name: "twitter", label: "X / Twitter", type: "url" },
    ],
  },
  {
    section: "Counters (stats)",
    fields: [
      {
        name: "stats",
        label: "Stats shown on home & about page",
        type: "objectList",
        wide: true,
        fields: [
          { name: "value", label: "Number", type: "number" },
          { name: "suffix", label: "Suffix", type: "text", placeholder: "+" },
          { name: "label", label: "Label", type: "text" },
        ],
      },
    ],
  },
];
