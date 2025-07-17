from transformers import pipeline
import re

# Load Hugging Face zero-shot classification model
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

def rule_based_checks(text):
    issues = []
    red_flags = 0

    # Suspicious links
    if re.search(r"(twitter\.com|linkedin\.com|bit\.ly|tinyurl\.com)", text, re.IGNORECASE):
        issues.append("❌ Suspicious link found (e.g., Twitter, LinkedIn, short URL).")
        red_flags += 1

    # Missing contact info
    if not re.search(r"Email|E-mail", text, re.IGNORECASE):
        issues.append("❌ Missing official email address.")
        red_flags += 1
    if not re.search(r"Phone|Contact|Mobile|Tel", text, re.IGNORECASE):
        issues.append("❌ Missing phone/contact number.")
        red_flags += 1

    # Informal language
    if re.search(r"\b(i|u|ur|plz|thx|regards)\b", text, re.IGNORECASE):
        issues.append("❌ Informal language found.")
        red_flags += 1

    # No legal company title
    if not re.search(r"(Pvt\.? Ltd\.?|LLC|Inc\.?|Ltd\.?|Corporation|Company)", text, re.IGNORECASE):
        issues.append("❌ Legal company name not found (e.g., Pvt Ltd, LLC).")
        red_flags += 1

    # Unusual document length
    word_count = len(text.split())
    if word_count > 1500:
        issues.append("⚠️ Document is unusually long.")
        red_flags += 1
    elif word_count < 100:
        issues.append("⚠️ Document is unusually short.")
        red_flags += 1

    # 🚩 Employee ID assigned before joining
    if re.search(r"\b(employee\s*id|emp[\s:-]?\d{3,})\b", text, re.IGNORECASE):
        issues.append("❌ Employee ID assigned before joining — suspicious.")
        red_flags += 1

    # 🚩 Batch code presence (suspicious)
    if re.search(r"batch\s*(code)?\s*[:\-]?\s*[A-Za-z0-9]+", text, re.IGNORECASE):
        issues.append("❌ Batch Code found — rarely mentioned in genuine offer letters.")
        red_flags += 1

    # 🚩 Payment or deposit for training
    if re.search(r"(pay|deposit|fee|amount|rs\.?|₹|\$)\s*\d{3,}", text, re.IGNORECASE):
        if re.search(r"(training|onboarding)", text, re.IGNORECASE):
            issues.append("❌ Asking for money/deposit for training — strong scam signal.")
            red_flags += 1

    return issues, red_flags

def get_verdict(text):
    candidate_labels = ["fake", "genuine"]
    input_text = text[:1000]  # truncate for efficiency

    try:
        result = classifier(input_text, candidate_labels)
    except Exception as e:
        return "❌ Error during AI analysis", [f"AI error: {str(e)}"]

    best_label = result["labels"][0]
    confidence = result["scores"][0]

    rule_issues, red_flags = rule_based_checks(text)

    # Final decision
    is_fake_ai = (best_label == "fake" and confidence >= 0.80)
    is_fake_rules = red_flags >= 3

    if is_fake_ai or is_fake_rules:
        verdict = "❌ Fake Offer Letter Detected"
    else:
        verdict = "✅ Genuine Offer Letter Detected"

    return verdict, rule_issues
