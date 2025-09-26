### Lead Scorer API
This backend service scores leads based on a product offer by combining rule-based logic + AI analysis from the Gemini API.

Setup and Running the Project
1. Clone the repository
git clone (https://github.com/pryoucan/Lead-Scorer-API.git)
cd Lead-Scorer-API

2. Install dependencies
npm install

3. Create an environment file
Create a .env file in the project's root directory and add your API key.

GEMINI_API_KEY=your_api_key_here

4. Start the server
For development (with auto-reload):

npm run dev

For production:

npm start

The server should be running at http://localhost:3000.

API Endpoints
1. Set the Offer
Endpoint: POST /offer

Description: Uploads the product offer details.

POST http://localhost:3000/offer 
"Content-Type: application/json" 
{
  "name": "AI Outreach Automation",
  "value_props": ["24/7 outreach", "6x more meetings"],
  "ideal_use_cases": ["B2B SaaS mid-market"]
}

2. Upload Leads
Endpoint: POST /leads/upload

Description: Uploads a CSV file of leads.

curl -X POST http://localhost:3000/leads/upload \
"leadsFile=@path/to/your/leads.csv"

3. Score Leads
Endpoint: POST /score

Triggers the scoring process for the uploaded leads.

POST http://localhost:3000/score

4. Get Results (JSON)
Endpoint: GET /results

Fetches the scored leads as a JSON array.

http://localhost:3000/results
