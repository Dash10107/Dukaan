import React from "react"
import { Alert, AlertTitle, AlertDescription } from "../components/Alert"
import { Badge } from "../components/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs"
import { DocsLayout } from "../components/DocsLayout"
import { ApiKeyGenerator } from "../components/ApiKeyGenerator"
import "./api.css"
import { base_url } from "../utils/axiosConfig"
// You'll need to replace these with appropriate icon components or SVGs
const AlertCircle = () => <span>⚠️</span>
const Lock = () => <span>🔒</span>

function Api() {
  return (
    <DocsLayout>
      <div className="space-y-12">
        {/* Introduction */}
        <section id="introduction">
          <h1 className="text-4xl font-bold mb-4">E-Commerce API Documentation</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Complete API documentation for the E-Commerce platform. This API provides endpoints for managing products,
            orders, users, blogs, and more.
          </p>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Base URL</AlertTitle>
            <AlertDescription>
              All API requests should be made to: <code className="text-sm">{base_url}</code>
            </AlertDescription>
          </Alert>
          <ApiKeyGenerator />
        </section>

        {/* Authentication */}
        <section id="authentication" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Authentication</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Authentication Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">API Key Authentication</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Include your API key in the x-api-key header for all requests:
                </p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">x-api-key: your_api_key_here</pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Products */}
        <section id="products" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Products</h2>

          <Card className="mb-8" id="get-products">
            <CardHeader>
              <CardTitle>Get Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="mb-2">GET /api/products</Badge>
              <p className="text-sm text-muted-foreground mb-4">
                Fetch products with various options, including filtering, sorting, pagination, field selection, and
                search.
              </p>
              <h4 className="font-medium mb-2">Query Parameters:</h4>
              <ul className="list-disc pl-6 mb-4 text-sm">
                <li>page: Page number (default: 1)</li>
                <li>limit: Number of items per page (default: 10)</li>
                <li>sort: Sort by field(s), prefix with - for descending order</li>
                <li>fields: Comma-separated list of fields to include</li>
                <li>search: Keyword to search in product names</li>
                <li>[fieldName]: Filter by field value</li>
                <li>[fieldName][gte/gt/lte/lt]: Filter by range</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8" id="pagination">
            <CardHeader>
              <CardTitle>Pagination Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-medium mb-2">Basic Pagination:</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">GET /api/products?page=1&limit=20</pre>
              <p className="text-sm text-muted-foreground mb-4">This request will return the first 20 products.</p>

              <h4 className="font-medium mb-2">Pagination with Sorting:</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                GET /api/products?page=2&limit=15&sort=-price
              </pre>
              <p className="text-sm text-muted-foreground mb-4">
                This request will return the second page of products (15 per page), sorted by price in descending order.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8" id="sorting">
            <CardHeader>
              <CardTitle>Sorting Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-medium mb-2">Sort by a Single Field:</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">GET /api/products?sort=price</pre>
              <p className="text-sm text-muted-foreground mb-4">This will sort products by price in ascending order.</p>

              <h4 className="font-medium mb-2">Sort by Multiple Fields:</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">GET /api/products?sort=-rating,price</pre>
              <p className="text-sm text-muted-foreground mb-4">
                This will sort products by rating in descending order, then by price in ascending order.
              </p>

              <h4 className="font-medium mb-2">Sort with Pagination:</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                GET /api/products?sort=-createdAt&page=1&limit=10
              </pre>
              <p className="text-sm text-muted-foreground mb-4">
                This will return the first 10 products, sorted by creation date in descending order (newest first).
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8" id="filtering">
            <CardHeader>
              <CardTitle>Filtering Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-medium mb-2">Filter by Exact Match:</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">GET /api/products?category=electronics</pre>
              <p className="text-sm text-muted-foreground mb-4">
                This will return all products in the 'electronics' category.
              </p>

              <h4 className="font-medium mb-2">Filter by Range:</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                GET /api/products?price[gte]=50&price[lte]=100
              </pre>
              <p className="text-sm text-muted-foreground mb-4">
                This will return all products with a price between 50 and 100 (inclusive).
              </p>

              <h4 className="font-medium mb-2">Multiple Filters:</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                GET /api/products?category=electronics&brand=Apple&price[lt]=1000
              </pre>
              <p className="text-sm text-muted-foreground mb-4">
                This will return all Apple electronic products with a price less than 1000.
              </p>

              <h4 className="font-medium mb-2">Filter with Sorting and Pagination:</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                GET /api/products?category=clothing&price[gte]=20&sort=-rating&page=1&limit=20
              </pre>
              <p className="text-sm text-muted-foreground mb-4">
                This will return the first 20 clothing products with a price of 20 or more, sorted by rating in
                descending order.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8" id="field-selection">
            <CardHeader>
              <CardTitle>Field Selection Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-medium mb-2">Select Specific Fields:</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                GET /api/products?fields=name,price,category
              </pre>
              <p className="text-sm text-muted-foreground mb-4">
                This will return only the name, price, and category fields for each product.
              </p>

              <h4 className="font-medium mb-2">Field Selection with Filtering and Sorting:</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                GET /api/products?fields=name,price,rating&category=electronics&sort=-rating
              </pre>
              <p className="text-sm text-muted-foreground mb-4">
                This will return the name, price, and rating of electronic products, sorted by rating in descending
                order.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="search" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Search Products</h2>

          <Card>
            <CardHeader>
              <CardTitle>Search Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="mb-2">POST /search/elastic</Badge>
              <p className="text-sm text-muted-foreground mb-4">
                Search for products with advanced filtering and relevance mechanisms.
              </p>
              <h4 className="font-medium mb-2">Request Body:</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                {`{
  "query": "<search_keyword>",
  "category": "<category_name>" // Optional
}`}
              </pre>
              <h4 className="font-medium mb-2">Examples:</h4>
              <h5 className="font-medium mt-4 mb-2">Basic Search:</h5>

              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                {`POST /search/elastic
{
  "query": "laptop"
}`}
              </pre>
              <p className="text-sm text-muted-foreground mb-4">
                This will search for products containing the keyword "laptop" in their title, description, or tags.
              </p>

              <h5 className="font-medium mt-4 mb-2">Search with Category:</h5>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                {`POST /search/elastic
{
  "query": "gaming",
  "category": "electronics"
}`}
              </pre>
              <p className="text-sm text-muted-foreground mb-4">
                This will search for gaming-related products specifically in the electronics category.
              </p>

              <h5 className="font-medium mt-4 mb-2">Fuzzy Search:</h5>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                {`POST /search/elastic
{
  "query": "labtop"
}`}
              </pre>
              <p className="text-sm text-muted-foreground mb-4">
                This demonstrates the fuzzy matching capability. It will still return results for "laptop" despite the
                typo in the search query.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="recommend" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Recommend Products</h2>

          <Card>
            <CardHeader>
              <CardTitle>Recommend Products</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="mb-2">GET /recommend/elastic</Badge>
              <p className="text-sm text-muted-foreground mb-4">
                Get product recommendations based on vector similarity or name-based similarity.
              </p>
              <h4 className="font-medium mb-2">Query Parameters:</h4>
              <ul className="list-disc pl-6 mb-4 text-sm">
                <li>name: (Optional) Name of a product to base recommendations on</li>
                <li>
                  vector: (Optional) Stringified array representing the vector of the product for cosine similarity
                </li>
              </ul>
              <h4 className="font-medium mb-2">Examples:</h4>
              <h5 className="font-medium mt-4 mb-2">Name-based Recommendation:</h5>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                GET /recommend/elastic?name=iPhone 12 Pro
              </pre>
              <p className="text-sm text-muted-foreground mb-4">
                This will return products similar to "iPhone 12 Pro" based on name and description similarity.
              </p>

              <h5 className="font-medium mt-4 mb-2">Vector-based Recommendation:</h5>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                GET /recommend/elastic?vector=[0.1,0.2,0.3,0.4,0.5]
              </pre>
              <p className="text-sm text-muted-foreground mb-4">
                This will return products with similar feature vectors, useful for personalized recommendations based on
                user behavior or product characteristics.
              </p>

              <h5 className="font-medium mt-4 mb-2">Default Recommendation:</h5>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">GET /recommend/elastic</pre>
              <p className="text-sm text-muted-foreground mb-4">
                Without any parameters, this will return the top 10 recommended products, which could be based on
                overall popularity or other default criteria.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </DocsLayout>
  )
}



export default Api

