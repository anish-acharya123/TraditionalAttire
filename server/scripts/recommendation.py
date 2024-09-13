import sys
import os
import json
import pandas as pd
from bson import ObjectId
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from pymongo import MongoClient
from dotenv import load_dotenv
import numpy as np

# Load environment variables
load_dotenv()

# MongoDB connection
MONGO_URI = os.getenv("URL")
client = MongoClient(MONGO_URI)
db = client['Traditionalattire']

def fetch_user_data(email):
    """
    Fetch user data from the database based on the provided email.
    """
    user = db['users'].find_one({'email': email}, {
        'likedItems': 1, 'viewedItems': 1, 'boughtItems': 1
    })
    return user

def fetch_product_data(item_ids):
    """
    Fetch product details for given item IDs from the database.
    """
    item_ids = [ObjectId(item) for item in item_ids]
    products = list(db['posts'].find({'_id': {'$in': item_ids}}, {
        '_id': 1, 'type': 1, 'category': 1, 'description': 1, 'price': 1, 'images': 1, "gender": 1
    }))
    return products

def fetch_products_by_category(categories):
    """
    Fetch products by category from the database.
    """
    # Ensure categories is a Python list, not a NumPy array
    if isinstance(categories, np.ndarray):
        categories = categories.tolist()

    # Fetch products with the given categories
    products = list(db['posts'].find({'category': {'$in': categories}}, {
        '_id': 1, 'type': 1, 'category': 1, 'description': 1, 'price': 1, 'images': 1, "gender": 1
    }))
    return products

def get_recommendations(user_data):
    """
    Generate recommendations based on user's liked, viewed, and bought items.
    """
    liked_items = user_data.get('likedItems', [])
    viewed_items = user_data.get('viewedItems', [])
    bought_items = user_data.get('boughtItems', [])

    all_items = set(liked_items + viewed_items + bought_items)

    if not all_items:
        return []

    products = fetch_product_data(list(all_items))

    if not products:
        return []

    df = pd.DataFrame(products)

    if df.empty or df['description'].isnull().any():
        return []

    # Get unique categories from the user's interacted items
    categories = df['category'].unique()

    # Fetch all products from the categories
    all_category_products = fetch_products_by_category(categories)

    # Exclude items the user has interacted with
    all_category_products = [p for p in all_category_products if str(p['_id']) not in all_items]

    if not all_category_products:
        return []

    df_all_category = pd.DataFrame(all_category_products)

    # Ensure descriptions are available for TF-IDF
    if df_all_category['description'].isnull().any():
        df_all_category = df_all_category.dropna(subset=['description'])

    if df_all_category.empty:
        return []

    # TF-IDF vectorization on descriptions
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df_all_category['description'])

    # Compute cosine similarity
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

    sim_scores = []
    for idx in range(len(df_all_category)):
        scores = list(enumerate(cosine_sim[idx]))
        scores = sorted(scores, key=lambda x: x[1], reverse=True)
        sim_scores.extend(scores[1:4])  # Get top 3 similar items

    recommended_indices = [i[0] for i in sorted(sim_scores, key=lambda x: x[1], reverse=True)[:10]]

    if not recommended_indices:
        return []

    # Fetch full product details for recommended indices
    recommended_ids = [str(df_all_category['_id'].iloc[i]) for i in recommended_indices]
    recommended_products = fetch_product_data(recommended_ids)

    return recommended_products

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps([]))
        sys.exit(1)

    email = sys.argv[1]

    user_data = fetch_user_data(email)

    if not user_data:
        print(json.dumps([]))
        sys.exit(0)

    recommendations = get_recommendations(user_data)

    print(json.dumps(recommendations, default=str))
