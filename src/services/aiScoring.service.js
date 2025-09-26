import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Api key initialization
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// model want to use
const model = genAI.getGenerativeModel({

    // if current model is not working, then you should use '-latest', for using latest models
    model: "gemini-2.5-flash", 
    generationConfig: {
        responseMimeType: "application/json",
    },
});

// a helper function to delay between each query resolve, free plan might cause some issue, that's why...
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// scores of single lead at a time, again, because of free plans
export const getAIScoring = async (offer, lead) => {
  const prompt = `
    You are an expert lead qualification assistant. Your task is to evaluate a lead based on a product offer and return your analysis in a strict JSON format.

    **Product Offer Details:**
    - Name: ${offer.name}
    - Value Propositions: ${offer.value_props.join(", ")}
    - Ideal Use Cases: ${offer.ideal_use_cases.join(", ")}

    **Lead Details:**
    - Name: ${lead.name}
    - Role: ${lead.role}
    - Company: ${lead.company}
    - Industry: ${lead.industry}
    - LinkedIn Bio: ${lead.linkedin_bio}

    **Your Task:**
    Analyze the lead's information against the offer. Classify their buying intent as "High", "Medium", or "Low". 
    Provide a score based on this mapping: High = 50, Medium = 30, Low = 10.
    Write a concise, one-sentence reasoning for your classification.

    Return ONLY a single JSON object with the keys "intent", "aiScore", and "reasoning".
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const jsonText = response.text();

    if (!jsonText) {
        throw new Error("No text returned from Gemini API");
    }
    return JSON.parse(jsonText);

  } catch (error) {
    console.error(`Error calling Gemini API for lead ${lead.name}:`, error.message);
    return {
      intent: "Low",
      aiScore: 0,
      reasoning: "An error occurred during AI analysis."
    };
  }
};

// now, this processes an entire list of leads sequentially after delaying at each query at a time respective of api rate limits
export async function processLeadsWithRateLimiting(leads, offer) {
    const aiResults = [];
    
    for (const lead of leads) {
        console.log(`Processing AI score for: ${lead.name}...`);
        const result = await getAIScoring(offer, lead);
        aiResults.push(result);
        
        console.log("Waiting 4 seconds to avoid rate limit...");
        await delay(4000); 
    }
    
    return aiResults;
}

