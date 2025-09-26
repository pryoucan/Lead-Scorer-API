import { getAIScoring } from "../services/aiScoring.service.js";
import { calculateTotalRuleScore } from "./rule.controller.js";
import storage from "../storage.js";

const scoreController = async (req, res) => {
  if (!storage.offers || storage.leads.length === 0) {
    return res.status(400).json({ message: "Please upload offer and leads first." });
  }

  calculateTotalRuleScore();

  const results = [];

  for (const lead of storage.leads) {
    const aiResult = await getAIScoring(storage.offers, lead);

    const finalScore = lead.ruleScore + aiResult.aiScore;

    results.push({
      name: lead.name,
      role: lead.role,
      company: lead.company,
      intent: aiResult.intent,
      score: finalScore,
      reasoning: aiResult.reasoning,
    });
  }

  storage.results = results;

  res.status(200).json({
    message: "Scoring completed successfully",
    results: storage.results,
  });
};

export default scoreController;
