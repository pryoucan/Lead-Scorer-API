import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIScoring = async (offer, lead) => {
  const prompt = `
You are an assistant that evaluates how relevant a lead is for a product offer.

Offer:
- Name: ${offer.name}
- Value Props: ${offer.value_props.join(", ")}
- Ideal Use Cases: ${offer.ideal_use_cases.join(", ")}

Lead:
- Name: ${lead.name}
- Role: ${lead.role}
- Company: ${lead.company}
- Industry: ${lead.industry}
- Location: ${lead.location}
- LinkedIn Bio: ${lead.linkedin_bio}

Task:
Evaluate the lead's intent and fit for the offer. 
Return a JSON object like this:
{
  "intent": "high | medium | low",
  "aiScore": <if high, then score will be 50, if medium then map the socre of 20,
  else if low then map it with 10 score>,
  "reasoning": "short explanation"
}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
};
