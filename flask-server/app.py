from flask import Flask, jsonify, request
import requests, json, asyncio, aiohttp
from bs4 import BeautifulSoup
from langchain.utilities import SearxSearchWrapper

app = Flask(__name__)
mistral_apikey = "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"

@app.route("/get_data", methods=["POST"])
async def get_data():
    user_prompt = fmt_query(request.get_json()["prompt"])
    results = get_papers(user_prompt)
    first_elem_url = get_paper_info(results["data"][0])["url"]
    print(await scrape_webpage(first_elem_url))
    return "done!"

def fmt_query(query: str):
    return query.replace(" ", "+")

def get_papers(fmt_query: str):
    fmt_url = f"http://api.semanticscholar.org/graph/v1/paper/search?query={fmt_query}"
    response = requests.get(fmt_url)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return f"{response.status_code} error in retrieving data from Semantic Scholar."
    
def get_paper_info(paper_data: dict):
    paper_id = paper_data["paperId"]
    fmt_url = f"https://api.semanticscholar.org/graph/v1/paper/{paper_id}?fields=title,abstract,url"
    response = requests.get(fmt_url)
    if (response.status_code == 200):
        data = response.json()
        return data
    else:
        return f"{response.status_code} error in retrieving paper metadata for paper with ID {paper_id}"
    
async def scrape_webpage(url: str):
    if not url.startswith(("https://", "http://")):
        url = "https://" + url
    r = await requests.get(url)
    print(r.status_code)
    return 'test'

## not fully done with code for this - go back and edit
def get_summary_mistral(relevant_info: list):
    response = requests.post(
        url = "https://openrouter.ai/api/v1/chat/completions",
        headers = {
            "Authorization": f"Bearer {mistral_apikey}",
            "Content-Type": "application/json"
        },
        data = json.dumps({
             "model": "mistralai/mixtral-8x7b-instruct", # Optional
            "messages": [
            {"role": "user", "content": "Return the string 'hello world' in the following JSON format: {'word1': 'word2'}, where 'hello' is word1 and 'world' is word2"}
            ]
        })
    )
    print(response.json()["choices"][0]["message"]["content"])
    return "finished"
    
if __name__ == "__main__":
    app.run(debug=True)