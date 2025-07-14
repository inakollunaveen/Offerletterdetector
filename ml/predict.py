
def predict(text):
    """
    Dummy ML prediction function.
    In real use, you can replace this with DeepSeek API or any trained model.
    """
    suspicious_keywords = ["congratulations", "urgent", "lottery", "win", "immediate join", "huge salary"]
    explanation = []

    for keyword in suspicious_keywords:
        if keyword in text.lower():
            explanation.append(f"Found suspicious keyword: '{keyword}'.")

    if explanation:
        return "fake", " ".join(explanation)
    else:
        return "genuine", "No obvious scam keywords detected."
