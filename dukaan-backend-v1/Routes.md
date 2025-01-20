Routes Documentation for getAllProduct API Endpoint

Base URL:

http://digic/api/products

Endpoint: GET /api/products

The getAllProduct route allows fetching products with various options, including filtering, sorting, pagination, field selection, and search. Below are usage examples and explanations to make API usage straightforward.

1. Get All Products

Fetch all products, sorted by createdAt in descending order (default behavior):

GET /api/products

2. Pagination

Control the number of results per page and navigate between pages using page and limit parameters.

Example: Fetch the first 10 products:

GET /api/products?page=1&limit=10

Example: Fetch the second page with 20 products per page:

GET /api/products?page=2&limit=20

3. Sorting

Sort products based on one or more fields in ascending or descending order.

Example: Sort by price (ascending):

GET /api/products?sort=price

Example: Sort by price (descending):

GET /api/products?sort=-price

Example: Sort by category (ascending) and then by price (descending):

GET /api/products?sort=category,-price

4. Filtering

Filter products based on field values using operators like gte, lte, gt, lt.

Example: Filter by price range (between 10 and 100):

GET /api/products?price[gte]=10&price[lte]=100

Example: Filter by category:

GET /api/products?category=electronics

Example: Apply multiple filters (category and price range):

GET /api/products?category=electronics&price[gte]=50

5. Field Selection (Limiting Fields)

Retrieve only specific fields by specifying them in the fields parameter.

Example: Retrieve only the name, price, and category fields:

GET /api/products?fields=name,price,category

Example: Exclude the __v field (default behavior):

GET /api/products

6. Combining Options

Combine sorting, filtering, pagination, and field limiting for more precise queries.

Example: Fetch 20 products from page 1, filtered by category=electronics and price[gte]=50, sorted by price (descending), and showing only name, price, and category:

GET /api/products?category=electronics&price[gte]=50&sort=-price&page=1&limit=20&fields=name,price,category

7. Search

Search products by a keyword in the name field (requires text search implementation).

Example: Search for products containing the keyword "laptop":

GET /api/products?search=laptop

8. Filter by Seller

Fetch products associated with a specific seller.

Example: Filter products by seller_id:

GET /api/products?seller=seller_id

9. Stock-Based Filtering

Find products with stock below or above a certain threshold.

Example: Fetch products with stock less than or equal to 10:

GET /api/products?quantity[lte]=10

10. Date-Based Filtering

Filter products created within a specific date range.

Example: Fetch products created between January 1, 2023, and December 31, 2023:

GET /api/products?createdAt[gte]=2023-01-01&createdAt[lte]=2023-12-31

Parameter Reference:

Filtering Operators:

gte: Greater than or equal to.

gt: Greater than.

lte: Less than or equal to.

lt: Less than.

Pagination:

page: Page number (starts at 1).

limit: Number of items per page.

Sorting:

Use a comma-separated list of fields. Prefix a field with - for descending order.

Field Limiting:

Use a comma-separated list of fields to specify which fields to include in the response.

API Documentation for Search and Recommendation Endpoints

Base URL

http://digic/api

1. Search Products Endpoint

Endpoint: POST /search/elastic

This endpoint allows users to search for products in the e-commerce database with advanced filtering and relevance mechanisms. The query can prioritize certain fields and supports category-based filtering.

Request Structure

Method: POSTURL: /search/elasticHeaders:

Content-Type: application/json

Body:

{
  "query": "<search_keyword>",
  "category": "<category_name>" // Optional
}

Search Logic

Prioritized Fields: Searches across title (higher priority with a weight of 3), description, and tags.

Fuzziness: Supports approximate matches using ElasticSearch's AUTO fuzziness.

Category Filter: Optionally filters results by a specific category.

Response

Returns a list of products matching the search criteria.

Response Example:

[
  {
    "id": "123",
    "title": "Wireless Headphones",
    "description": "Noise-canceling over-ear headphones",
    "category": "electronics",
    "tags": ["headphones", "wireless", "audio"]
  },
  {
    "id": "124",
    "title": "Bluetooth Speaker",
    "description": "Portable waterproof speaker",
    "category": "electronics",
    "tags": ["speaker", "portable", "bluetooth"]
  }
]

Usage Examples

Search for products containing "laptop":

POST /search/elastic
{
  "query": "laptop"
}

Search for "headphones" in the "electronics" category:

POST /search/elastic
{
  "query": "headphones",
  "category": "electronics"
}

Search for "smartphone" with approximate matching:

POST /search/elastic
{
  "query": "smartfone"
}

2. Recommend Products Endpoint

Endpoint: GET /recommend/elastic

This endpoint provides product recommendations based on either vector similarity (for advanced personalization) or name-based similarity. If no parameters are provided, it defaults to recommending top products.

Request Structure

Method: GETURL: /recommend/elasticHeaders:

Content-Type: application/json

Query Parameters:

name: (Optional) Name of a product to base recommendations on.

vector: (Optional) Stringified array representing the vector of the product for cosine similarity.

Recommendation Logic

Vector Similarity: Uses cosineSimilarity to match products based on the provided vector. Ideal for advanced personalization.

Name-Based Similarity: Uses ElasticSearch's more_like_this query to find products with similar names or descriptions.

Default Recommendation: Returns the top 10 products if no parameters are provided.

Response

Returns a list of recommended products.

Response Example:

[
  {
    "id": "321",
    "title": "Gaming Laptop",
    "description": "High-performance laptop for gaming",
    "category": "electronics",
    "tags": ["laptop", "gaming", "performance"]
  },
  {
    "id": "322",
    "title": "Mechanical Keyboard",
    "description": "RGB backlit gaming keyboard",
    "category": "electronics",
    "tags": ["keyboard", "gaming", "RGB"]
  }
]

Usage Examples

Recommend products using a vector:

GET /recommend/elastic?vector=[0.12,0.34,0.56,...]

Recommend products similar to a specific name:

GET /recommend/elastic?name=Smartphone

Default recommendation (top 10 products):

GET /recommend/elastic

Maximizing Utilization of These Routes

Search Route

Enhanced Keyword Searches: Use the query parameter to enable customers to find products by titles, descriptions, or tags.

Category-Based Filtering: Allow users to narrow their searches by specifying a category.

Fuzzy Matching: Improve user experience by handling typos and approximate matches.

Advanced Sorting and Filtering: Combine with backend pagination or additional filters for refined results.

Recommendation Route

Personalization with Vector Similarity: Provide users with highly relevant product suggestions based on purchase or browsing history vectors.

Upselling and Cross-Selling: Use name-based similarity to recommend complementary products.

Fallback Recommendations: Ensure engagement by showing top products when no specific query is provided.

Error Handling

Invalid Query Parameter:

Status Code: 400

Response:

{ "error": "Invalid query parameters" }

Elasticsearch Connection Error:

Status Code: 500

Response:

{ "error": "Failed to connect to Elasticsearch" }

