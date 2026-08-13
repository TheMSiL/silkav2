import type { LocaleContent } from "@/types";
import { projects } from "./projects";
import { insights } from "./insights";
import { services } from "./services";
import {
  capabilityBlocks,
  automationFlow,
  aiFlow,
  dashboardTabs,
  builderModules,
  estimatorSteps,
} from "./capabilities";
import { processSteps, philosophyChain } from "./process";
import { techCategories, complexityLevels } from "./technology";
import { industries, principles, stats } from "./industries";
import { testimonials } from "./testimonials";

const disciplines = [
  { label: "Product strategy", note: "Scoping, prioritisation, and knowing what not to build" },
  { label: "UX & research", note: "Flows, prototypes and testing with the people who do the job" },
  { label: "Interface design", note: "Design systems, not folders of screens" },
  { label: "Frontend engineering", note: "React and Next.js, performance and accessibility budgets" },
  { label: "Backend engineering", note: "Domain modelling, services, queues, real-time" },
  { label: "Mobile", note: "React Native with native modules where it counts" },
  { label: "AI engineering", note: "Retrieval, evaluation harnesses, human-in-the-loop design" },
  { label: "Infrastructure", note: "Docker, CI/CD, infrastructure as code, observability" },
];

const pricingFactors = [
  { label: "Complexity", note: "How much has to be true before anything can ship" },
  { label: "Integrations", note: "Every third party is a dependency and a risk" },
  { label: "Platforms", note: "Web, iOS, Android, admin — each is a surface to design and test" },
  { label: "Design", note: "From your designs, or from a blank page" },
  { label: "Backend", note: "Data model, jobs, real-time, scale" },
  { label: "Automation", note: "What the system should do without anyone asking" },
  { label: "Support", note: "Handover, or an ongoing relationship" },
];

const privacy = [
  {
    heading: "What we collect",
    paragraphs: [
      "When you submit the contact form we store what you typed: your name, email address, optional company, the project type and budget you selected, and your message.",
      "We also record how you arrived — the page you submitted from, the referrer, and any UTM parameters in the URL. This tells us which of our own pages are useful. It is not used to build a profile of you.",
    ],
  },
  {
    heading: "What we do with it",
    paragraphs: [
      "We reply to you. That is the entire purpose. Your details are not sold, rented or shared with third parties for marketing, and you will not be added to a mailing list because you asked us a question.",
    ],
  },
  {
    heading: "Analytics",
    paragraphs: [
      "We measure aggregate usage — which pages are read, which sections people interact with — through an analytics layer that receives event names and coarse properties, never form contents.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "Enquiries are kept while the conversation is live and for a reasonable period afterwards in case it resumes. Ask us to delete yours and we will, without asking why.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You can ask what we hold, ask for a copy, ask for corrections, or ask us to delete it. Email us and a person will handle it.",
    ],
  },
  {
    heading: "Changes",
    paragraphs: [
      "If this policy changes materially, the updated version will be published here with a new date.",
    ],
  },
];

const terms = [
  {
    heading: "Scope",
    paragraphs: [
      "These terms cover the use of this website. Client engagements are governed by a separate signed agreement, which takes precedence over anything written here.",
    ],
  },
  {
    heading: "Content on this site",
    paragraphs: [
      "The writing, design and code of this site belong to us. You are welcome to quote it with attribution and to link to it freely.",
      "Case studies describe work we designed and built. Product names, brands and trademarks shown belong to their respective owners, and screenshots are included to illustrate the work rather than to imply endorsement.",
    ],
  },
  {
    heading: "Estimates and ranges",
    paragraphs: [
      "Any figure, range or delivery window shown on this site — including in the product builder and the estimator — is indicative. It is a starting point for a conversation, not an offer or a quotation, and nothing on this site forms a contract.",
    ],
  },
  {
    heading: "External links",
    paragraphs: [
      "Case studies link to live products we built. Those sites are operated by their owners, and we are not responsible for their current content or availability.",
    ],
  },
  {
    heading: "Liability",
    paragraphs: [
      "The site is provided as is. We take care to keep it accurate, but we do not accept liability for decisions made solely on the basis of information published here.",
    ],
  },
];

export const enContent: LocaleContent = {
  projects,
  insights,
  services,
  capabilityBlocks,
  automationFlow,
  aiFlow,
  dashboardTabs,
  builderModules,
  estimatorSteps,
  processSteps,
  philosophyChain,
  techCategories,
  complexityLevels,
  industries,
  principles,
  testimonials,
  stats,
  disciplines,
  pricingFactors,
  privacy,
  terms,
};
