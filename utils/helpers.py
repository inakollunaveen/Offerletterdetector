from utils.nlp_checks import (
    check_email_domain,
    check_suspicious_keywords,
    check_contact_details,
    check_over_promises,
    check_grammar_simple,
)
import requests
import os

HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")

def get_verdict(text):
    issues = []
    strong_red_flags = 0
    weak_flags = 0

    if check_email_domain(text):
        issues.append("Suspicious or free email domain used.")
        strong_red_flags += 1

    if check_contact_details(text):
        issues.append("Missing or invalid contact details.")
        strong_red_flags += 1

    if check_over_promises(text):
        issues.append("Contains unrealistic promises or offers.")
        strong_red_flags += 1

    if "pay" in text.lower() or "deposit" in text.lower() or "fees" in text.lower():
        issues.append("Mentions payment or deposit — usually a scam.")
        strong_red_flags += 1

    if "dear candidate" in text.lower():
        issues.append("Generic greeting — lacks personalization.")
        strong_red_flags += 1

    if check_grammar_simple(text):
        issues.append("Grammar or spelling issues detected.")
        weak_flags += 1

    if check_suspicious_keywords(text):
        issues.append("Contains suspicious keywords.")
        weak_flags += 1

    # Hugging Face hybrid check
    ai_flag = False
    if HUGGINGFACE_API_KEY:
        try:
            response = requests.post(
                "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
                headers={"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"},
                json={
                    "inputs": text,
                    "parameters": {
                        "candidate_labels": ["fake offer letter", "genuine offer letter"]
                    }
                },
                timeout=30
            )
            result = response.json()
            if "labels" in result and result["labels"]:
                ai_label = result["labels"][0]
                ai_score = result["scores"][0]
                issues.append(f"AI analysis: {ai_label} (confidence: {ai_score:.2f})")
                if ai_label == "fake offer letter" and ai_score > 0.80:
                    ai_flag = True
            else:
                issues.append(f"Hugging Face API error: {result.get('error', 'Unknown error')}")
        except Exception as e:
            issues.append(f"Hugging Face API exception: {e}")

    if strong_red_flags >= 1 or weak_flags >= 3 or ai_flag:
        verdict = "Likely Fake"
    else:
        verdict = "Likely Genuine"

    return verdict, issues
