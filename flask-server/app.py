from flask import Flask, jsonify, request
import requests, json, io, chromadb
from chromadb.utils import embedding_functions
from openai import OpenAI
from FlagEmbedding import FlagReranker
from pypdf import PdfReader
from pypdf.errors import PdfStreamError
from bs4 import BeautifulSoup
from langchain.utilities import SearxSearchWrapper

app = Flask(__name__)
client = OpenAI()
chroma_client = chromadb.Client()
default_ef = embedding_functions.DefaultEmbeddingFunction()
reranker = FlagReranker('BAAI/bge-reranker-large', use_fp16=True)

@app.route("/get_data", methods=["POST"])
def get_data():
    user_prompt = fmt_query(request.get_json()["prompt"])
    query_placeholder = "I want to learn about research into cures for cancer"
    query_embedded = default_ef([query_placeholder])
    results: list = get_papers(user_prompt)["data"]
    summaries = []
    for i in range(len(results)):
        if results[i]["tldr"] != None:
            summaries.append(f"Summary of paper {i}: {results[i]['tldr']['text']}")
        else:
            summaries.append(f"Title of paper {i}: {results[i]['title']}")
    top_indices = json.loads(get_top_N(query_placeholder, summaries))
    first_elem_url = results[top_indices["paper_2"]]["openAccessPdf"]["url"]
    print(first_elem_url)
    pages_arr = []
    ids_arr = []
    r = requests.get(first_elem_url)
    content_type = r.headers.get("Content-Type", "")
    doc_parsed = False
    if "application/pdf" in content_type:
        f = io.BytesIO(r.content)
        reader = PdfReader(f)
        try:
            for i in range(len(reader.pages)):
                content = reader.pages[i].extract_text()
                pages_arr = split_text(content, 412, pages_arr)
                ids_arr = get_ids_arr(i, content, 412, ids_arr)
            doc_parsed = True
        except PdfStreamError as e:
            print(f"Could not parse PDF due to {e}.")
    else:
        print("This content is not a valid PDF.")
    first_elem_url = fmt_chroma_pk(first_elem_url)
    try:
        if doc_parsed and chroma_client.get_collection(name=first_elem_url):
            print("Embeddings already exist for this paper!")
    except ValueError as e:
        if doc_parsed:
            collection = chroma_client.create_collection(
                name = first_elem_url,
                metadata = {"hnsw:space": "cosine"}
            )
            collection.add(
                documents = pages_arr,
                ids = ids_arr
            )
    collection = chroma_client.get_collection(name=first_elem_url)
    query_result = collection.query(
        query_embeddings = query_embedded,
        n_results = 10
    )
    print(query_result)
    return "done!"

def fmt_query(query: str):
    return query.replace(" ", "+")

def fmt_chroma_pk(pk: str):
    chars_to_remove = ",?=/:"
    return ''.join([char for char in pk if char not in chars_to_remove])

def get_papers(fmt_query: str):
    fmt_url = f"http://api.semanticscholar.org/graph/v1/paper/search?query={fmt_query}&year=2020-2023&openAccessPdf&fields=title,year,openAccessPdf,tldr&limit=50"
    response = requests.get(fmt_url)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return f"{response.status_code} error in retrieving data from Semantic Scholar."
    
def get_top_N(preferences:str, paper_info: list):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        response_format={ "type": "json_object" },
        messages=[
            {"role": "system", "content": """
            You are an agent that helps me find the top 3 research papers in an array of papers based on my preferences. You will always respond with a JSON object.
            If a user asks you for the indices of the top 3 most relevant papers to their area of study, you will respond with JSON keys paper_1, paper_2, and paper_3.
            The value for these keys will always be the index of the paper in the array that the user passes in.
            """},
            {"role": "user", "content": """
            Below is a list of my preferences:
            ```
            {preferences}
            ```
            I've compiled a list of the descriptions of all of the research papers that I have access to below:
            ```
            {paper_desc}
            ```
            You will return me a list of the indices of the three most relevant papers to my area of interest in the array above.
            """}
        ]
    )
    response_data = response.choices[0].message.content
    return response_data

def split_text(text: str, chunk_size: int, arr: list):
    for i in range(0, len(text), chunk_size):
        arr.append(text[i:i + chunk_size])
    return arr

def get_ids_arr(page_num: int, text: str, chunk_size: int, arr: list):
    for i in range(0, len(text), chunk_size):
        arr.append(f"{page_num}-{i}")
    return arr
    
if __name__ == "__main__":
    app.run(debug=True)