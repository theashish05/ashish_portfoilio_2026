export const meta = {
  title: "Ashish Acharya",
  role: "Azure Data Engineer | React Developer",
  description:
    "I'm Ashish Acharya, an Azure Data Engineer based in Bengaluru, building ETL/ELT pipelines on Databricks, PySpark and Delta Lake — with a React front-end background.",
};

export const logotext = "AA";

export const introData = {
  title: "I'm Ashish Acharya",
  animated: [
    "I build data pipelines",
    "I love clean lakehouses",
    "I still code cool websites",
  ],
  description:
    "Azure Data Engineer with around 4 years of experience building ETL/ELT pipelines on Azure Databricks, PySpark and Delta Lake — medallion lakehouses, incremental MERGE loads and automated data quality gates. Before that, a React and JavaScript developer, so I can take data all the way from the pipeline to the interface.",
};

export const dataAbout = {
  title: "About myself",
  aboutme:
    "I'm an Azure Data Engineer at Mobily Infotech in Bengaluru. I design multi-stage bronze/silver/gold lakehouses on Databricks and Delta Lake, orchestrate ingestion with Azure Data Factory into ADLS Gen2, and build data quality gates and observability so bad data gets stopped instead of shipped. My foundation is in Python, SQL, REST APIs, Core Java and React — which is why I enjoy turning pipelines into something people can actually see and use.",
};

// Source: resume (Mobily Infotech, Feb 2023 – present)
export const workTimeline = [
  {
    jobtitle: "Senior Software Engineer",
    where: "Mobily Infotech",
    date: "Apr 2026 – Present",
  },
  {
    jobtitle: "Software Engineer",
    where: "Mobily Infotech",
    date: "Sep 2023 – Apr 2026",
  },
  {
    jobtitle: "Software Engineer Trainee",
    where: "Mobily Infotech",
    date: "Feb 2023 – Aug 2023",
  },
];

// Resume-based skills. Only 80%+ are shown, ordered by how central they are in the resume.
// (Ratings are a self-assessment — edit the numbers freely.)
export const skills = [
  { name: "Azure Databricks", value: 90 },
  { name: "SQL", value: 90 },
  { name: "PySpark", value: 88 },
  { name: "Delta Lake", value: 88 },
  { name: "Azure Data Factory", value: 86 },
  { name: "Python", value: 85 },
  { name: "ADLS Gen2", value: 85 },
  { name: "Medallion Architecture", value: 85 },
  { name: "REST APIs", value: 85 },
  { name: "Core Java", value: 82 },
  { name: "ReactJS", value: 82 },
  { name: "Claude API / LLMs", value: 80 },
];

// Shown on the Home page (top of the list above).
export const homeSkillCount = 8;

// Other tools from the resume (no rating)
export const otherTools = [
  "Azure Synapse (Serverless SQL)",
  "Structured Streaming",
  "PL/SQL",
  "Oracle Database",
  "JavaScript",
  "Git",
  "CI/CD",
  "Bitbucket",
  "JIRA",
  "Postman",
  "GitHub Copilot",
];

export const services = [
  {
    title: "Data Pipeline Development (ETL / ELT)",
    description:
      "Design and build production ETL/ELT pipelines on Azure Databricks, PySpark and Delta Lake — from multi-source ingestion to curated, analytics-ready tables.",
  },
  {
    title: "Lakehouse & Medallion Architecture",
    description:
      "Structure bronze/silver/gold layers on Delta Lake with incremental MERGE upserts, so repeat loads process only what changed and don't burn compute.",
  },
  {
    title: "Data Quality & Observability",
    description:
      "Add validation logging and quality gates that halt a pipeline on duplicate or null critical fields, plus LLM-assisted summaries that turn raw failure logs into plain-English alerts.",
  },
  {
    title: "REST-to-Lake Ingestion & Orchestration",
    description:
      "Orchestrate Azure Data Factory pipelines that pull large REST API datasets into ADLS Gen2, then serve the curated output through Synapse serverless SQL for reporting.",
  },
  {
    title: "React Web Development",
    description:
      "Build responsive, component-driven React interfaces — dashboards, portfolios and interactive tools — and integrate them with APIs and back-end systems.",
  },
];

// Latest resume (Google Drive)
const RESUME_ID = "1yvLrumLqv-HOCGSik9a0ewEOXKZsa6TP";
export const resume = {
  view: `https://drive.google.com/file/d/${RESUME_ID}/view?usp=drive_link`,
  download: `https://drive.google.com/uc?export=download&id=${RESUME_ID}`,
};

export const portfolioItems = [
  {
    description: "Resume",
    link: resume.view,
    tag: "PDF",
  },
  {
    description: "Data Pipelines",
    link: "/data-engineering",
    tag: "Data Engineering",
  },
  {
    description: "AM Shopify",
    link: "https://am-shopify.netlify.app/",
    tag: "Web App",
  },
  {
    description: "Cards Templates",
    link: "/cards",
    tag: "UI Kit",
  },
];

export const contactConfig = {
  email: "ashishacharyag305@gmail.com",
  phone: "9880043832",
  phoneIntl: "+919880043832",
  phoneDisplay: "+91 98800 43832",
  description:
    "Feel free to reach out over email or phone. I'm available for new opportunities and would love to discuss how I can contribute to your project.",
  serviceId: "service_8dqbsic",
};

export const socialProfiles = {
  github: "https://github.com/theashish05",
  facebook: "https://facebook.com/ashishacharyag",
  linkedin: "https://www.linkedin.com/in/ashish-acharya-g-946109220",
  instagram: "https://instagram.com/_the_ashish_",
};
