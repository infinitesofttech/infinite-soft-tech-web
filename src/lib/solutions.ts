export interface Solution {
  slug: string;
  icon: string;
  name: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  intro: string;
  forWho: string[];
  problems: string[];
  modules: { title: string; text: string }[];
  benefits: string[];
  service: string;
  related?: { label: string; href: string };
  faqs: { question: string; answer: string }[];
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "school-erp-software",
    icon: "GraduationCap",
    name: "School ERP",
    title: "School & College ERP Software",
    seoTitle: "School ERP Software in Ahmedabad – Admissions, Fees, Attendance, Exams",
    seoDescription:
      "School and college ERP software for admissions, fee collection, attendance, exams, report cards and parent portal. Built by Infinite Soft Tech, Ahmedabad. Book a free demo.",
    headline: "School ERP Software That Saves Hours Every Day",
    intro:
      "Manage admissions, fees, attendance, exams, staff and parent communication in one secure system. Our Vidyapeeth ERP is built for schools, colleges and coaching institutes.",
    forWho: ["Schools", "Colleges & universities", "Coaching institutes", "Trusts & education groups"],
    problems: [
      "Fee records kept in registers and Excel",
      "Parents constantly calling for attendance and results",
      "Report cards prepared manually",
      "No clear view of dues and collections",
    ],
    modules: [
      { title: "Admissions & Student Records", text: "Online enquiry, application, documents and complete student profile." },
      { title: "Fee Management", text: "Fee structures, instalments, receipts, dues and automatic reminders." },
      { title: "Attendance & Timetable", text: "Daily attendance for students and staff with class timetables." },
      { title: "Exams & Report Cards", text: "Marks entry, grading and automatic report card generation." },
      { title: "Staff & Payroll", text: "Staff records, leave management and salary processing." },
      { title: "Parent & Student Portal", text: "Notices, attendance, results and fee status on mobile." },
    ],
    benefits: ["Save administrative time", "Fewer fee leakages and errors", "Happier, informed parents", "Reports for management in one click"],
    service: "Custom ERP Development",
    related: { label: "See Vidyapeeth ERP", href: "/products/vidyapeeth-erp" },
    faqs: [
      { question: "Can the school ERP be customised for our board and fee structure?", answer: "Yes. We configure fee heads, instalments, report cards and reports to match your school or college." },
      { question: "Is there a mobile app for parents and teachers?", answer: "A parent and student portal is available, and a dedicated mobile app can be added as per your requirement." },
      { question: "Do you provide training and support?", answer: "Yes. We train your staff during setup and provide ongoing support and updates." },
    ],
  },
  {
    slug: "manufacturing-erp-software",
    icon: "Factory",
    name: "Manufacturing ERP",
    title: "ERP Software for Manufacturing & Factories",
    seoTitle: "Manufacturing ERP Software in Ahmedabad – Inventory, Production, Sales, Accounts",
    seoDescription:
      "Custom ERP software for manufacturers and factories: inventory, purchase, production planning, sales, quality and accounts in one system. Free consultation in Ahmedabad.",
    headline: "Manufacturing ERP Built Around Your Factory Process",
    intro:
      "From raw material purchase to dispatch, connect every department on one system. We design ERP around your exact production flow, not a generic template.",
    forWho: ["Manufacturers & factories", "Job-work units", "Engineering & fabrication", "Chemical, textile & plastic units"],
    problems: [
      "Stock mismatch between store, production and accounts",
      "Production planning done on paper or Excel",
      "No visibility of order status and delays",
      "Month-end reports take days",
    ],
    modules: [
      { title: "Inventory & Warehouse", text: "Multi-location stock, batch tracking, minimum stock alerts." },
      { title: "Purchase & Vendors", text: "Purchase requests, approvals, orders and GRN." },
      { title: "Production Planning", text: "BOM, work orders, job work and wastage tracking." },
      { title: "Sales & Dispatch", text: "Quotations, sales orders, invoices and delivery." },
      { title: "Accounts & GST", text: "Invoicing, payments, GST reports and Tally integration." },
      { title: "MIS Dashboards", text: "Live reports for owners and department heads." },
    ],
    benefits: ["Real-time stock and production visibility", "Fewer delays and stock-outs", "Approvals and accountability", "Faster decisions with live reports"],
    service: "Custom ERP Development",
    faqs: [
      { question: "Can the ERP integrate with Tally?", answer: "Yes. We can integrate with Tally so accounts stay in sync while operations run in the ERP." },
      { question: "How long does a manufacturing ERP take?", answer: "It depends on modules and complexity. We often go live module by module so you see value early." },
      { question: "Do you customise reports?", answer: "Yes. MIS and production reports are designed around the numbers you track." },
    ],
  },
  {
    slug: "distribution-inventory-software",
    icon: "Truck",
    name: "Distribution Software",
    title: "Inventory & Distribution Management Software",
    seoTitle: "Inventory & Distribution Software in Ahmedabad – Sales, Stock, Billing, Orders",
    seoDescription:
      "Custom inventory and distribution management software for traders, wholesalers and distributors: orders, billing, stock, salesmen and outstanding in one app.",
    headline: "Distribution Software for Traders, Wholesalers & Distributors",
    intro:
      "Track orders, stock, billing, salesmen and outstanding payments from one dashboard — with a mobile app for your field team.",
    forWho: ["Distributors & wholesalers", "Traders & retail chains", "FMCG and pharma distribution", "Multi-branch businesses"],
    problems: [
      "Orders coming on WhatsApp and calls",
      "Stock and billing not matched",
      "Outstanding payments forgotten",
      "No tracking of salesmen and routes",
    ],
    modules: [
      { title: "Order Management", text: "Orders from salesmen, retailers and WhatsApp in one place." },
      { title: "Stock & Billing", text: "Live stock, GST billing and multi-godown support." },
      { title: "Outstanding & Collections", text: "Party-wise dues, ageing and payment reminders." },
      { title: "Salesman App", text: "Mobile app for orders, visits and collections." },
      { title: "Schemes & Pricing", text: "Price lists, discounts and special schemes." },
      { title: "Reports", text: "Sales, margin, stock and salesman performance reports." },
    ],
    benefits: ["No missed orders", "Faster collections", "Accurate stock", "Visibility of every salesman"],
    service: "Custom Software Development",
    faqs: [
      { question: "Is there a mobile app for salesmen?", answer: "Yes, a mobile app for order booking, visits and collections can be included." },
      { question: "Can it handle multiple branches or godowns?", answer: "Yes. Multi-branch and multi-godown stock is supported with role-based access." },
    ],
  },
  {
    slug: "crm-software",
    icon: "Handshake",
    name: "CRM Software",
    title: "Custom CRM Software for Sales & Support Teams",
    seoTitle: "Custom CRM Software in Ahmedabad – Lead Management, Sales Pipeline, Follow-ups",
    seoDescription:
      "Custom CRM software to capture leads from your website and WhatsApp, track the sales pipeline, automate follow-ups and report team performance. Book a free CRM demo.",
    headline: "Custom CRM That Turns Enquiries Into Customers",
    intro:
      "Capture every lead, never miss a follow-up and see your complete sales pipeline. Our CRM is shaped around how your team actually sells.",
    forWho: ["Sales teams", "Real estate & consultants", "Service companies", "Education & training institutes"],
    problems: [
      "Leads lost between WhatsApp, calls and Excel",
      "Follow-ups forgotten",
      "No visibility of quotation status",
      "Sales data lost when staff leaves",
    ],
    modules: [
      { title: "Lead Capture", text: "Leads from your website, ads, WhatsApp and calls in one inbox." },
      { title: "Sales Pipeline", text: "Visual stages from enquiry to won, with deal values." },
      { title: "Follow-up Automation", text: "Tasks, reminders and alerts for every lead." },
      { title: "Quotations & Invoices", text: "Create quotes and invoices from the same record." },
      { title: "Customer Support", text: "Tickets and service history for every customer." },
      { title: "Analytics", text: "Conversion, source and team performance dashboards." },
    ],
    benefits: ["More leads converted", "Complete customer history", "Accountable sales team", "Integrates with ERP and accounts"],
    service: "CRM Development",
    related: { label: "CRM development service", href: "/services/crm-development" },
    faqs: [
      { question: "Can leads from our website go directly into the CRM?", answer: "Yes. Website forms, ads and other sources can push leads into the CRM automatically." },
      { question: "Can the CRM connect to our ERP or Tally?", answer: "Yes, we integrate CRM with ERP, accounting and other tools through APIs." },
    ],
  },
];

export function getSolution(slug: string) {
  return SOLUTIONS.find((s) => s.slug === slug) ?? null;
}
