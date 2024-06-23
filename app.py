from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

# Load Excel data into a DataFrame
file_path = 'data/product-data.xls'
df = pd.read_excel(file_path)

# Replace NaN values with None to ensure valid JSON
df.replace({np.nan: None}, inplace=True)

# Add SL number as a new column
df['SL'] = range(1, len(df) + 1)

# Route to fetch paginated data and sort
@app.route('/api/data/<int:page>', methods=['GET'])
def get_data(page):
    page_size = 1000
    start_idx = (page - 1) * page_size
    end_idx = start_idx + page_size
    
    sort_order = request.args.get('sort', '')  # Get sort order from query params

    if sort_order == 'asc':
        paginated_df = df.sort_values(by='Price', ascending=True).iloc[start_idx:end_idx]
    elif sort_order == 'desc':
        paginated_df = df.sort_values(by='Price', ascending=False).iloc[start_idx:end_idx]
    else:
        paginated_df = df.iloc[start_idx:end_idx]

    paginated_df['SL'] = range(start_idx + 1, min(end_idx + 1, len(df) + 1))  # Calculate SL numbers for paginated data
    paginated_data = paginated_df.to_dict(orient='records')
    
    return jsonify(paginated_data)

# Route to filter data based on multiple fields
@app.route('/api/filter', methods=['POST'])
def filter_data():
    req_data = request.get_json()
    manufacturer = req_data.get('manufacturer', '')
    category = req_data.get('category', '')
    productName = req_data.get('productName', '')  # Get productName from request

    filtered_df = df.copy()

    if manufacturer:
        filtered_df = filtered_df[filtered_df['Manufacturer'].astype(str).str.contains(manufacturer, case=False, na=False)]
    if category:
        filtered_df = filtered_df[filtered_df['Category'].astype(str).str.contains(category, case=False, na=False)]
    if productName:
        filtered_df = filtered_df[filtered_df['Product Name'].astype(str).str.contains(productName, case=False, na=False)]

    filtered_df['SL'] = range(1, len(filtered_df) + 1)  # Recalculate SL numbers for filtered data
    filtered_data = filtered_df.to_dict(orient='records')
    
    return jsonify(filtered_data)

# Route to sort data based on column and order
@app.route('/api/sort', methods=['POST'])
def sort_data():
    req_data = request.get_json()
    column = req_data['column']
    ascending = req_data['ascending']
    
    sorted_df = df.sort_values(by=column, ascending=ascending)
    sorted_df['SL'] = range(1, len(sorted_df) + 1)  # Recalculate SL numbers after sorting
    sorted_data = sorted_df.to_dict(orient='records')
    
    return jsonify(sorted_data)

if __name__ == '__main__':
    app.run(debug=True)
