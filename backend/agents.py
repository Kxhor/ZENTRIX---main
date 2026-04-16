from crewai import Agent, Task, Crew, Process
import os
from langchain_google_genai import ChatGoogleGenerativeAI

def get_llm():
    # Use Gemini 1.5 Flash for the free tier
    return ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        temperature=0,
        google_api_key=os.environ.get("GEMINI_API_KEY")
    )

class ReDiAgents:
    def sync_agent(self):
        return Agent(
            role='Knowledge Base Sync Agent',
            goal='Parse the local policy_rulebook.json and provide searchable knowledge. When Detection occurs, provide rule_code, source_document, and description.',
            backstory='You are the ultimate source of truth for RBI guidelines related to Payment Aggregators.',
            verbose=True,
            allow_delegation=False,
            llm=get_llm(),
        )

    def detection_agent(self):
        return Agent(
            role='Auditor / Detection Agent',
            goal='Monitor Supabase anomalies and map DB columns to JSON parameters to trigger Regulatory Drifts.',
            backstory='You are a high-speed data auditor that understands exact numeric and logical limits of RBI rules.',
            verbose=True,
            allow_delegation=False,
            llm=get_llm()
        )

    def impact_agent(self):
        return Agent(
            role='Risk Analyst',
            goal='Calculate the real-time Integrity Score (0-100%). Deduct score based on the severity of the drift and identify the fail_action.',
            backstory='You evaluate the legal and financial risk of any regulatory drift, converting them into percentage points.',
            verbose=True,
            allow_delegation=False,
            llm=get_llm()
        )

    def action_agent(self):
        return Agent(
            role='Regulatory Officer',
            goal='Automate paperwork for critical drifts by auto-drafting RBI Compliance Reports in Markdown.',
            backstory='You act as the nodal officer formatting complex breaches into standardized compliance reports.',
            verbose=True,
            allow_delegation=False,
            llm=get_llm()
        )

class ReDiTasks:
    def sync_task(self, agent, rulebook_data, incident_data):
        return Task(
            description=f"Map the incident data: {incident_data} against the rulebook: {str(rulebook_data)[:500]}...",
            expected_output="Identified rule code, source document, and description for the incident.",
            agent=agent
        )

    def detection_task(self, agent, incident_data):
        return Task(
            description=f"Analyze {incident_data} to confirm if it breaches any limits. Output 'DRIFT DETECTED: <Reason>' or 'SAFE'.",
            expected_output="Confirmation of whether a drift occurred.",
            agent=agent
        )

    def impact_task(self, agent, detection_result):
        return Task(
            description=f"Based on the detection: {detection_result}, calculate the new Integrity Score (deduct points) and the fail_action.",
            expected_output="A JSON object with the new score and the fail_action.",
            agent=agent
        )

    def action_task(self, agent, impact_result):
        return Task(
            description=f"Draft an RBI Compliance Report based on the impact result: {impact_result}.",
            expected_output="A Markdown formatted RBI compliance report.",
            agent=agent
        )
