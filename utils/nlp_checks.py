import re
import language_tool_python

def check_email_domain(text):
    free_domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "rediffmail.com"]
    pattern = r"[a-zA-Z0-9._%+-]+@(" + "|".join([re.escape(domain) for domain in free_domains]) + ")"
    return bool(re.search(pattern, text.lower()))

def check_suspicious_keywords(text):
    suspicious_words = [
        "congratulations", "lucky", "winner", "urgent", "immediate joining",
        "advance payment", "security deposit", "lottery", "free visa",
        "direct placement", "easy selection", "guaranteed job", "processing fee"
    ]
    return any(word in text.lower() for word in suspicious_words)

def check_contact_details(text):
    phone_match = re.search(r"\b\d{10}\b", text)
    address_keywords = ["address", "head office", "registered office", "corporate office"]
    address_present = any(keyword in text.lower() for keyword in address_keywords)
    if not phone_match and not address_present:
        return True
    return False

def check_over_promises(text):
    promises = [
        "100% job guarantee", "no interview", "direct placement",
        "highest salary", "free visa", "no experience required",
        "selected without test", "instant offer letter"
    ]
    return any(promise in text.lower() for promise in promises)

def check_grammar_simple(text):
    tool = language_tool_python.LanguageTool('en-US')
    matches = tool.check(text)
    return len(matches) > 15
