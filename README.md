Ottoman Dictionary & AI Transliteration Tool
Welcome to the Ottoman Dictionary & Transliteration Tool, a powerful web application that serves as both a language dictionary and an AI-powered transliteration service. This project was built with modern web technologies on the frontend, backed by a robust Python-based API to deliver an intuitive, data-rich experience for users.

Tech Stack
Frontend: React, Chakra UI
Backend: Flask (Python)
Database: PostgreSQL
AI & Image Processing: Custom Transformer Model, Tesseract OCR
Authentication: Flask JWT (JSON Web Tokens)
Hosting: Frontend deployed on Netlify
Core Features
1. Rich Dictionary Experience
Our dictionary is built from a massive dataset of over 800,000 words. These words were scraped using Python Selenium from a trusted open API, refactored, and stored in a PostgreSQL database. The dictionary supports searches in both Latin and Ottoman alphabets, providing:

Word Definitions: Accurate meanings of Ottoman words.
Cross-Alphabet Search: Search for words in either the Latin or Ottoman script.
Extensive Data Relationships: Each word is linked to its variations and meanings, making it easier to understand the historical and linguistic nuances.
Fun Fact: This was originally implemented with a C# backend, but migrated to Python to improve robustness and synchronization between components.

2. AI-Powered Transliteration Tool
Our custom transformer model is designed to transliterate Ottoman text into modern Turkish. This feature leverages deep learning to ensure accurate transliterations. Here’s how it works:

Image Upload: Authenticated users can upload images (with future plans to restrict based on subscription tiers).
OCR Processing: Uploaded images are parsed using Tesseract OCR, converting the text from images into machine-readable text.
Transliteration: Parsed text is then passed to the custom transformer model, which performs the transliteration from Ottoman script to Turkish.
Secure Access: The AI route is protected and only accessible by registered users, with plans to make it a premium feature for paid subscribers in the future.
3. Secure Authentication
Our application is fully equipped with JWT-based authentication, ensuring that only registered and authenticated users can access the transliteration and other premium features. The authentication system allows for secure uploads and usage tracking.

How the Dictionary Works
Data Scraping & Storage
The dictionary was built by scraping data using Python Selenium from a reliable API. The scraped data was cleaned, refactored, and then stored in a PostgreSQL database. Relationships between words, meanings, and variants were carefully mapped to ensure that the database is highly structured, supporting complex queries efficiently.

Over 800,000 words in the database.
Words are stored with their meanings, variations, and Persian transliterations.
The database supports one-to-many relationships between a word and its variations or meanings.
API Endpoints
The backend offers RESTful API endpoints for querying the dictionary. Key features include:

Search Words: Users can search for words using both the Latin and Ottoman alphabets.
Word Relationships: Responses include associated meanings and variations.
Image Processing & Transliteration Flow
Image Upload: Authenticated users upload images via the frontend.
OCR with Tesseract: Images are processed through Tesseract OCR to extract text.
Custom Transformer Model: The extracted Ottoman text is fed into a custom transformer model for transliteration.
Transliteration Results: The model outputs transliterated text in modern Turkish, which is then returned to the authenticated user.
Data Storage: Only the image paths are saved to the PostgreSQL database, while the images themselves are stored in a static folder for future reference.
Future Plans
While the frontend is currently live at Netlify, the backend will soon be published to provide full functionality. Some planned features include:

Full Website Deployment: The backend will be published soon, offering the complete dictionary and transliteration experience.
Subscription-Based Features: The AI-powered transliteration tool will be restricted to subscribed users, offering premium features to paying customers.
Enhanced Security & Performance: Continuous improvements to user authentication, security, and system performance.
Project Roadmap
Here’s a look at what’s coming next:

Phase 1: Full deployment of both frontend and backend.
Phase 2: Introduce subscription tiers for premium features (AI transliteration).
Phase 3: Expand the dictionary database with more word entries and variations.
Phase 4: Integrate more advanced image parsing features using OCR and deep learning.
Try the Frontend Now!
Check out the frontend of the app currently hosted on Netlify:
👉 Netlify: https://dynamic-sorbet-9e018e.netlify.app/

Stay tuned for updates as we roll out the full site with both frontend and backend functionalities!
