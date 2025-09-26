import storage from "../storage.js";

const decisionMakerRoles = [
  "vp",
  "head",
  "director",
  "cto",
  "ceo",
  "founder",
  "manager",
];
const influencerRoles = [
  "senior",
  "consultant",
  "develper",
  "lead",
  "engineer",
];

const roleRelevacneScoreCalculator = (lead) => {
  const roleLower = lead.role.toLowerCase();

  if (decisionMakerRoles.some((r) => roleLower.includes(r))) {
    return 20;
  }
  if (influencerRoles.some((r) => roleLower.includes(r))) {
    return 10;
  }

  return 0;
};

const industryMatchScoreCalculator = (lead) => {
  const leadIndustry = lead.industry.toLowerCase();
  const idealUseCases = storage.offers.ideal_use_cases.map((i) =>
    i.toLowerCase()
  );

  if (idealUseCases.includes(leadIndustry)) {
    return 20;
  }

  if (idealUseCases.some((i) => leadIndustry.includes(i) || 
  i.includes(leadIndustry))) {
    return 10;
  }
  
  return 0;
};

const dataCompleteness = (lead) => {
    const requiredFields = ["name", "role", "company", "industry", "location", "linkedin_bio"];
    return requiredFields.every(field => lead[field] && 
        lead[field].trim() !== "") ? 10 : 0;
};

export const calculateTotalRuleScore = () => {
    storage.leads.forEach(lead => {
        const roleScore = roleRelevacneScoreCalculator(lead);
        const industryScore = industryMatchScoreCalculator(lead);
        const completenessScore = dataCompleteness(lead);

        lead.ruleScore = roleScore + industryScore + completenessScore;
    });
};