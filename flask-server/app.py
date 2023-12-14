from flask import Flask, jsonify, request
import requests
from langchain.utilities import SearxSearchWrapper
from bs4 import BeautifulSoup
import openai
from langchain.embeddings import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from openai.embeddings_utils import get_embedding, cosine_similarity
import numpy as np

app = Flask(__name__)

@app.route("/get_data", methods=["POST"])
def get_data():
    user_prompt = request.get_json()["prompt"]
    prompt_embedding = get_embedding(user_prompt, engine = "text-embedding-ada-002")
    embeddings_model = OpenAIEmbeddings(model = "text-embedding-ada-002")
    s = SearxSearchWrapper(searx_host = "searx.varoonkodithala.com")
    results = s.results(user_prompt, 
                        num_results = 5,
                        engines = ["google_news", "google"])
    site_content = {}
    paragraph_content = {}
    for result in results:
        url = result["link"]
        response = requests.get(url)
        if response.status_code == 200:
            content = BeautifulSoup(response.text, "html.parser")
            paragraphs = content.find_all('p')
            par = [paragraph.text for paragraph in paragraphs]
            paragraph_content[url] = par
            embeddings = embeddings_model.embed_documents(par)
            similarity_results = []
            for embedding in embeddings:
                output = cosine_similarity(prompt_embedding, embedding)
                similarity_results.append(output)
            site_content.update({ url: similarity_results })
        else:
            print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
    relevant_indices = []
    relevant_content = []
    for site in site_content:
        similarity_results = site_content[site]
        indexed_similarity = [(i, score) for i, score in enumerate(similarity_results)]
        indexed_similarity.sort(key=lambda x: x[1], reverse=True)
        top_2_indices = [index for index, _ in indexed_similarity[:2]]
        relevant_indices.append(top_2_indices)
    for url, indices in zip(site_content.keys(), relevant_indices):
        for indice in indices:
            relevant_content.append(paragraph_content[url][indice])
    print(relevant_content)
    template = """Question: {question}. Source of truth: {relevant_content}. Answer: Let's think step by step."""
    prompt = PromptTemplate(template = template, input_variables = ["question", "relevant_content"])
    llm = OpenAI()
    llm_chain = LLMChain(prompt = prompt, llm = llm)
    result = llm_chain.run({"question": user_prompt, "relevant_content": relevant_content})
    formatted_result = {
        "result": result
    }
    return formatted_result


if __name__ == "__main__":
    app.run(debug=True)
