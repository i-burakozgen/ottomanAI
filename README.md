# Ottoman Text Translit

**Ottoman Text Translit** is a web application designed for transliterating Ottoman texts and providing a comprehensive dictionary for searching words. Users can upload images containing Ottoman script, which are processed using Tesseract OCR. The application then employs custom transformers to transliterate the extracted text into Latin script.

## Features

- **Image Upload:** Seamlessly upload images containing Ottoman texts for processing.
- **OCR Processing:** Utilizes Tesseract OCR to accurately extract text from uploaded images.
- **Custom Transliteration:** Converts Ottoman script into Latin script using specialized transformers.
- **Dictionary Search:** A built-in dictionary feature allows users to search for words and their transliterations, enhancing the usability of the application.

## Tech Stack

Ottoman Text Translit employs a robust set of technologies:

- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) - Optical character recognition engine for text extraction.
- [Flask](https://flask.palletsprojects.com/en/3.0.x/) - Minimalist web framework for Python.
- [React](https://reactjs.org/) - Library for building interactive user interfaces.
- [PostgreSQL](https://www.postgresql.org/) - Relational database for storing transliterations and dictionary entries.


## Installation

To set up Ottoman Text Translit locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/i-burakozgen/ottomanAI.git