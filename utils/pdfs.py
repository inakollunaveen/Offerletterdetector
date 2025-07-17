import fitz  # PyMuPDF

def extract_text(file_path):
    text = ""
    pdf_document = fitz.open(file_path)
    for page_num in range(len(pdf_document)):
        page = pdf_document[page_num]
        text += page.get_text()
    pdf_document.close()
    return text
