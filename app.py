import os
import requests
import nltk
from nltk.corpus import stopwords
import re
from flask import Flask, jsonify, request
from flask_cors import CORS
import arxiv
from datetime import datetime, timedelta
from google import genai
from google.genai import types
from dotenv import load_dotenv  # To load environment variables from a .env file

# --- 1. Initialization and NLTK Path Fix ---

app = Flask(__name__)
# Enable CORS
CORS(app) 

# NLTK Path Fix
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
LOCAL_NLTK_DATA_PATH = os.path.join(PROJECT_ROOT, "nltk_data")
nltk.data.path.append(LOCAL_NLTK_DATA_PATH)

# Conditional NLTK Download FIX
try:
    nltk.data.find('corpora/stopwords')
    print("✅ NLTK 'stopwords' resource found in local path.")
except LookupError:
    print("⚠️ NLTK 'stopwords' resource missing. Downloading now to local folder...")
    try:
        nltk.download('stopwords', download_dir=LOCAL_NLTK_DATA_PATH) 
        print("✅ Download complete.")
    except Exception as e:
        print(f"❌ Failed to download NLTK stopwords: {e}")
        pass

# Define stop_words set GLOBALLY (kept for potential future use, though not needed for Gemini)
try:
    STOP_WORDS = set(stopwords.words('english'))
except LookupError:
    STOP_WORDS = set()

# --- 2. Load Environment Variables and Initialize Gemini Client ---

# Load environment variables from .env file (if present)
load_dotenv()

# Retrieve the GEMINI_API_KEY from environment
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

# Initialize the Gemini client with the API key
try:
    if GEMINI_API_KEY is None:
        raise ValueError("GEMINI_API_KEY not found in environment variables.")
    client = genai.Client(api_key=GEMINI_API_KEY)
    print("✅ Gemini Client initialized.")
except Exception as e:
    print(f"❌ Failed to initialize Gemini Client: {e}. Check GEMINI_API_KEY.")
    client = None


# --- 3. New Data Acquisition Functions (arXiv & Gemini) ---

def search_arxiv(query, max_results=20):
    """Searches arXiv for recent papers matching the query."""
    date_cutoff = datetime.now() - timedelta(days=3 * 365)
    arxiv_query = f'all:("{query}") AND all:("challenge" OR "problem" OR "limitation")'
    
    search = arxiv.Search(
        query=arxiv_query,
        max_results=max_results,
        sort_by=arxiv.SortCriterion.SubmittedDate,
        sort_order=arxiv.SortOrder.Descending
    )
    
    results_data = []
    for result in search.results():
        if result.published.date() >= date_cutoff.date():
            results_data.append({
                'title': result.title,
                'abstract': result.summary,
                'year': result.published.year,
                'url': result.pdf_url, 
            })
    
    return results_data

def get_gemini_analysis(abstracts_list, innovation_keyword):
    """Uses Gemini to summarize and extract the TOP 5 most critical problems."""
    if not client:
        return ["Error: Gemini Client not initialized."]
    
    combined_text = "\n---\n".join(abstracts_list)
    
    prompt = f"""
    Analyze the following research paper abstracts related to '{innovation_keyword}'.
    
    1. Identify the TOP 5 most critical, recurring **problem statements**, **challenges**, or **research gaps**.
    2. Format the response as a single, numbered list (1., 2., 3., etc.).
    3. Focus only on the core issue (be concise). Do NOT include any introductory text, explanation, or conclusion.
    
    ABSTRACTS:
    {combined_text}
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        
        refined_problems = []
        for line in response.text.split('\n'):
            line = line.strip()
            if line and (re.match(r'^\d+\.\s', line) or line.startswith('*') or line.startswith('-')):
                refined_problems.append(re.sub(r'^\d+\.\s*|[\*-]\s*', '', line).strip())
                
        return refined_problems
        
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return ["Error: Gemini analysis failed."]

# --- 4. Flask API Endpoint (Updated to use arXiv and Gemini) ---

@app.route('/api/get-innovations', methods=['GET'])
def get_innovations():
    """Endpoint to trigger the search based on a user keyword."""
    user_query = request.args.get('keywords')
    if not user_query:
        user_query = 'Digital platform for small artisans' 

    print(f"🔍 Searching arXiv for: {user_query}")
    
    # 1. Use the new arXiv search function
    paper_data = search_arxiv(user_query)
    
    if not paper_data:
        return jsonify({"query": user_query, "total_results": 0, "problem_statements": [], "message": "No recent papers found on this topic."}), 200

    # 2. Extract all abstracts for Gemini analysis
    abstracts_for_gemini = [p['abstract'] for p in paper_data]
    
    # 3. Use the Gemini function to get the refined problem list
    refined_problems = get_gemini_analysis(abstracts_for_gemini, user_query)
    
    # 4. Return the structured data
    return jsonify({
        "query": user_query,
        "total_papers_searched": len(paper_data),
        "problem_statements": [{"statement": p} for p in refined_problems],
        "source_papers": [{"title": p['title'], "url": p['url'], "year": p['year']} for p in paper_data]
    })

# --- 5. Run the Server ---

if __name__ == '__main__':
    print("\n🚀 Starting Flask server...")
    app.run(debug=True, port=5000)