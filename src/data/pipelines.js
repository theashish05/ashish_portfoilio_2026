// Diagram data for the Data Engineering page. Content mirrors the resume.
export const pipelines = [
  {
    id: "device-journey",
    title: "Telecom Device Journey Lakehouse",
    tech: ["Azure Databricks", "PySpark", "Delta Lake", "SQL"],
    summary:
      "An end-to-end bronze/silver/gold medallion pipeline on Delta Lake that consolidates telecom device lifecycle events from multiple source systems into one analytics-ready model.",
    points: [
      "Incremental MERGE upserts process device and billing changes without full reprocessing — shorter run time on repeated loads.",
      "Automated data quality checks and validation logging at every stage surface failed records instead of letting silent corruption travel downstream.",
    ],
    nodes: [
      { icon: "source", label: "Source systems", sub: "Device & billing events", accent: "#38bdf8" },
      { icon: "bronze", label: "Bronze", sub: "Raw Delta tables", accent: "#cd7f32", badges: ["DQ check"] },
      { icon: "silver", label: "Silver", sub: "Cleansed & conformed", accent: "#c0c8d4", badges: ["MERGE upsert", "DQ check"] },
      { icon: "gold", label: "Gold", sub: "Unified device journey", accent: "#f5c542", badges: ["DQ check"] },
      { icon: "analytics", label: "Analytics", sub: "Analytics-ready model", accent: "#4ade80" },
    ],
  },
  {
    id: "orchestration",
    title: "Telecom Customer Data Orchestration",
    tech: ["Azure Data Factory", "ADLS Gen2", "Azure Databricks", "PySpark", "Synapse Serverless SQL"],
    summary:
      "ADF ingests millions of customer/device records from a REST API into ADLS Gen2, a Databricks notebook cleans and enriches them into curated Delta tables, and Synapse serverless SQL exposes them for reporting.",
    points: [
      "Derived 4-tier age-band segmentation plus ingestion-timestamp lineage added during the Databricks transformation.",
      "A quality gate halts the write on duplicate customer_id or null-email records — bad data never reaches the curated layer.",
      "The REST-to-ADLS Gen2 ingestion layer was live-validated end-to-end in a working Azure environment.",
    ],
    nodes: [
      { icon: "api", label: "REST API", sub: "Millions of records", accent: "#38bdf8" },
      { icon: "adf", label: "Data Factory", sub: "Ingest & orchestrate", accent: "#60a5fa" },
      { icon: "lake", label: "ADLS Gen2", sub: "Raw landing zone", accent: "#22d3ee" },
      { icon: "spark", label: "Databricks", sub: "Clean · enrich · gate", accent: "#fb7185", badges: ["Age bands", "Lineage", "DQ gate"] },
      { icon: "delta", label: "Curated Delta", sub: "Trusted tables", accent: "#4ade80" },
      { icon: "sql", label: "Synapse SQL", sub: "Serverless reporting", accent: "#a78bfa" },
    ],
  },
  {
    id: "log-summarizer",
    title: "LLM-Assisted Data Quality Log Summarizer",
    tech: ["Python", "Anthropic Claude API", "JSON log parsing"],
    summary:
      "A Python tool that reads structured data quality logs from three pipeline stages and uses the Claude API to condense them into a focused 4–6 sentence plain-English summary grouped by likely root cause.",
    points: [
      "Raw log rows are aggregated into failure counts by check type and pipeline stage before the model call.",
      "That pre-aggregation reduces token usage and improves summary quality compared with sending raw logs directly.",
    ],
    nodes: [
      { icon: "logs", label: "DQ logs", sub: "Bronze · Silver · Gold", accent: "#38bdf8" },
      { icon: "json", label: "JSON parser", sub: "Structured log rows", accent: "#22d3ee" },
      { icon: "aggregate", label: "Aggregate", sub: "Counts by check × stage", accent: "#f5c542", badges: ["Fewer tokens"] },
      { icon: "llm", label: "Claude API", sub: "Prompt + summarise", accent: "#fb923c" },
      { icon: "summary", label: "Summary", sub: "4–6 sentences by root cause", accent: "#4ade80" },
    ],
  },
];
