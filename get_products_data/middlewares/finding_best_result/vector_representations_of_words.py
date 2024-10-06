import spacy


nlp = spacy.load("en_core_web_md")


def vector_representations_of_words(query: str, candidates: list):

    query_doc = nlp(query)
    candidate_docs = [nlp(candidate) for candidate in candidates]

    similarities = [query_doc.similarity(candidate_doc) for candidate_doc in candidate_docs]
    print(similarities)

    best_match_idx = similarities.index(max(similarities))

    return candidates[best_match_idx]


print(vector_representations_of_words('iphone 16', ['iphone 16 pro', 'iphone 16 white', 'iphone 16 plus']))
