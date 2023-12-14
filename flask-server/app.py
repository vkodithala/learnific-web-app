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
    s = SearxSearchWrapper(searx_host = "searx.varoonkodithala.com", 
                           engines=["semantic_scholar"])
    results = s.results(user_prompt, 
                        num_results = 5)
    for result in results:
        print(result["link"], result["engines"])
    return "finished!"

if __name__ == "__main__":
    app.run(debug=True)
