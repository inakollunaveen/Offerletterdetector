def check_formatting(text):
    """
    Check if important contact info is missing (e.g., phone number or address).
    Returns True if formatting looks suspicious or missing details.
    """
    suspicious = False

    if "phone" not in text.lower() and "mobile" not in text.lower() and not any(char.isdigit() for char in text):
        suspicious = True

    if "address" not in text.lower() and "location" not in text.lower():
        suspicious = True

    return suspicious
