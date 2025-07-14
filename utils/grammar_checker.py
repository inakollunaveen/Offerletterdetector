import language_tool_python

def check_grammar_simple(text):
    """
    Uses LanguageTool to check grammar and spelling in the given text.
    Returns True if too many grammar mistakes are found (threshold = 10).
    """
    try:
        tool = language_tool_python.LanguageTool('en-US')
        matches = tool.check(text)
        return len(matches) > 10  # You can adjust threshold as needed
    except Exception as e:
        print(f"[Grammar Check Error]: {e}")
        return False  # In case of error, don't block the process
