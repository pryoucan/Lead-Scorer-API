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
  // lowercasing cause there might be some capital letters data
  const roleLower = lead.role.toLowerCase();
  // if lead role is as decisionmake then 20
  if (decisionMakerRoles.some((r) => roleLower.includes(r))) {
    return 20;
  } // else 10 if he/she is influencer
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
  // if found exact match, then 20
  if (idealUseCases.includes(leadIndustry)) {
    return 20;
  }
  // if found some of the kywords, then 10
  if (
    idealUseCases.some(
      (i) => leadIndustry.includes(i) || i.includes(leadIndustry)
    )
  ) {
    return 10;
  }

  return 0;
};
// if every field is fulfilled then data is complete
const dataCompleteness = (lead) => {
  const requiredFields = [
    "name",
    "role",
    "company",
    "industry",
    "location",
    "linkedin_bio",
  ];
  return requiredFields.every(
    (field) => lead[field] && lead[field].trim() !== ""
  )
    ? 10
    : 0;
};

export const calculateTotalRuleScore = () => {
  storage.leads.forEach((lead) => {
    const roleScore = roleRelevacneScoreCalculator(lead);
    const industryScore = industryMatchScoreCalculator(lead);
    const completenessScore = dataCompleteness(lead);

    // this is total rule score, ai score is not yet
    lead.ruleScore = roleScore + industryScore + completenessScore;
  });
};
