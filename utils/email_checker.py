import re

def check_email_domain(text):
    """
    Checks for suspicious email domains in the offer letter text.
    Flags common free email domains (gmail.com, yahoo.com, etc.).
    """
    suspicious_domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "protonmail.com"]
    # Find all emails in text
    matches = re.findall(r"[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})", text)
    
    for domain in matches:
        if domain.lower() in suspicious_domains:
            return True  # Suspicious domain found
    return False  # No suspicious domains found
