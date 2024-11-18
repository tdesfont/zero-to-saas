import faiss
import numpy as np
import os
import pandas as pd

from mistralai import Mistral

from dotenv import load_dotenv

load_dotenv()

df = pd.read_csv("rag_embeddings.csv")

text_df = df[['text_chunk', 'url_ref_chunk']]
embeddings_df = df.drop(['text_chunk', 'url_ref_chunk'], axis=1)

text_embeddings = np.array(embeddings_df)

d = text_embeddings.shape[1]
index = faiss.IndexFlatL2(d)
index.add(text_embeddings)

api_key = os.environ.get('MISTRAL_API_KEY')
client = Mistral(api_key=api_key)


def get_text_embedding(input):
    embeddings_batch_response = client.embeddings.create(
        model="mistral-embed",
        inputs=input
    )
    return embeddings_batch_response.data[0].embedding


question = "Ou sortir le Mardi soir a Paris, par exemple diner puis danser sur une guinguette?"
question_embeddings = np.array([get_text_embedding(question)])

D, I = index.search(question_embeddings, k=2)  # distance, index

chunks = text_df['text_chunk']
retrieved_chunks = [chunks[i] for i in I.tolist()[0]]

prompt = f"""
Context information is below.
---------------------
{retrieved_chunks}
---------------------
Given the context information and not prior knowledge, answer the query.
Query: {question}
Answer:
"""


def run_mistral(user_message, model="mistral-large-latest"):
    messages = [
        {
            "role": "user", "content": user_message
        }
    ]
    chat_response = client.chat.complete(
        model=model,
        messages=messages
    )
    return (chat_response.choices[0].message.content)


print(run_mistral(prompt))

print(set(text_df['url_ref_chunk'][i] for i in I.tolist()[0]))
