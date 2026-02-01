import type { Problem } from "./types";

export const problems: Problem[] = [
  {
    id: "PROB-001",
    title: "City-wide Power Outage in Downtown",
    category: "Infrastructure",
    location: "New York, USA",
    timestamp: "2024-07-21T14:30:00Z",
    severity: "Critical",
    urgency: 9,
    sentimentScore: -0.85,
    keyTrends: ["power grid", "blackout", "emergency services"],
    summary:
      "A major power outage has affected the entire downtown district, impacting businesses, traffic signals, and residential buildings. Emergency services are responding, but restoration time is estimated to be over 6 hours.",
    description:
      "Reports from multiple sources, including local news and social media, confirm a widespread power failure originating from the main substation on 5th Ave. The cause is suspected to be a transformer explosion. All transportation systems are heavily disrupted.",
    date: "2024-07-21",
  },
  {
    id: "PROB-002",
    title: "Wildfire Spreading Near National Park",
    category: "Environment",
    location: "California, USA",
    timestamp: "2024-07-21T11:00:00Z",
    severity: "High",
    urgency: 8,
    sentimentScore: -0.7,
    keyTrends: ["wildfire", "evacuation", "air quality"],
    summary:
      "A fast-moving wildfire is approaching the northern boundary of Yosemite National Park, threatening wildlife and prompting evacuation orders for nearby communities. Air quality has dropped to hazardous levels.",
    description:
      "The fire, dubbed the 'Granite Fire,' started yesterday evening and has grown to over 5,000 acres due to strong winds and dry conditions. Firefighting crews are on-site, but containment is currently at 5%.",
    date: "2024-07-21",
  },
  {
    id: "PROB-003",
    title: "Increase in Phishing Scams Targeting Elderly",
    category: "Cyber Threat",
    location: "Global",
    timestamp: "2024-07-20T09:00:00Z",
    severity: "Medium",
    urgency: 6,
    sentimentScore: -0.5,
    keyTrends: ["phishing", "cybersecurity", "scam alert"],
    summary:
      "A coordinated phishing campaign is targeting elderly individuals via email and SMS, attempting to steal personal financial information. The scams impersonate well-known banks and government agencies.",
    description:
      "Cybersecurity forums and public complaint portals show a 200% increase in reports of these specific scams over the past week. The messages often create a sense of urgency, pressuring victims to act quickly.",
    date: "2024-07-20",
  },
  {
    id: "PROB-004",
    title: "Major Water Main Break Floods Urban Area",
    category: "Infrastructure",
    location: "London, UK",
    timestamp: "2024-07-21T08:15:00Z",
    severity: "High",
    urgency: 8,
    sentimentScore: -0.75,
    keyTrends: ["flooding", "water supply", "traffic chaos"],
    summary:
      "A 48-inch water main has burst in Islington, causing significant flooding, property damage, and widespread disruption to water supplies and transportation.",
    description:
      "Thousands of gallons of water per minute are flooding the streets, affecting homes and businesses. Transport for London has closed several roads and Tube stations in the vicinity. Repair crews estimate it will take 24-48 hours to fix the pipe and restore normal services.",
    date: "2024-07-21",
  },
  {
    id: "PROB-005",
    title: "Protests Erupt Over New Housing Policy",
    category: "Social Challenge",
    location: "Paris, France",
    timestamp: "2024-07-19T17:00:00Z",
    severity: "Medium",
    urgency: 5,
    sentimentScore: -0.4,
    keyTrends: ["protest", "housing crisis", "social unrest"],
    summary:
      "Thousands have gathered in central Paris to protest a new government housing policy that critics argue will exacerbate the ongoing housing crisis and displace low-income residents.",
    description:
      "The protests have remained largely peaceful, but have caused significant disruption to public life. Social media is filled with images and videos from the demonstrations, with hashtags trending in the region.",
    date: "2024-07-19",
  },
  {
    id: "PROB-006",
    title: "Air Quality Index Reaches Unhealthy Levels",
    category: "Environment",
    location: "Delhi, India",
    timestamp: "2024-07-20T12:00:00Z",
    severity: "High",
    urgency: 7,
    sentimentScore: -0.6,
    keyTrends: ["air pollution", "public health", "smog"],
    summary:
      "The Air Quality Index (AQI) in Delhi has surpassed 350, reaching 'Very Unhealthy' levels due to a combination of industrial emissions, vehicle exhaust, and agricultural burning in neighboring states.",
    description:
      "Public health officials have issued an advisory, urging residents, especially children and the elderly, to remain indoors. Visibility has been significantly reduced, affecting flights and road traffic.",
    date: "2024-07-20",
  },
  {
    id: "PROB-007",
    title: "Series of Coordinated Burglaries in Suburb",
    category: "Public Safety",
    location: "Sydney, Australia",
    timestamp: "2024-07-18T23:00:00Z",
    severity: "Medium",
    urgency: 6,
    sentimentScore: -0.65,
    keyTrends: ["burglary", "crime wave", "police investigation"],
    summary:
      "A suburban community has been hit by a string of over 10 coordinated burglaries in the last 48 hours, prompting a high-level police investigation and increased patrols.",
    description:
      "Local forums and social media groups are buzzing with concerned residents sharing information and security footage. Police believe a single organized group is responsible and have asked the public for any information.",
    date: "2024-07-18",
  },
  {
    id: "PROB-008",
    title: "Critical Flaw in Popular Financial App",
    category: "Cyber Threat",
    location: "Global",
    timestamp: "2024-07-21T18:00:00Z",
    severity: "Critical",
    urgency: 10,
    sentimentScore: -0.9,
    keyTrends: ["vulnerability", "data breach", "emergency patch"],
    summary:
      "A critical remote code execution (RCE) vulnerability has been discovered in the 'FinanSmart' app, affecting millions of users worldwide. An immediate update is required to prevent potential loss of funds and data.",
    description:
      "Security researchers published a proof-of-concept for the exploit, forcing the developers to issue an emergency patch. The company is urging all users to update the app immediately. There is no evidence of widespread exploitation yet, but the risk is extremely high.",
    date: "2024-07-21",
  },
];
