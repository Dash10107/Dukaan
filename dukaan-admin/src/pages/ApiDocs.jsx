'use client'

import { Alert, AlertDescription, AlertTitle } from "../components/apidocs/Alert"
import { Badge } from "../components/apidocs/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/apidocs/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/apidocs/tabs"
import { DocsLayout } from "../components/apidocs/DocsLayout"
import { AlertCircle, Lock } from 'lucide-react'
import '../components/apidocs/app.css'

export default function ApiDocs() {
  return (
    <DocsLayout>
      <div className="space-y-12">
        {/* Introduction */}
        <section id="introduction">
          <h1 className="text-4xl font-bold mb-4">E-Commerce API Documentation</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Complete API documentation for the E-Commerce platform. This API provides endpoints for managing products, orders, users, blogs, and more.
          </p>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Base URL</AlertTitle>
            <AlertDescription>
              All API requests should be made to: <code className="text-sm">http://localhost:5000/api</code>
            </AlertDescription>
          </Alert>
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
                <h4 className="font-medium mb-2">Bearer Token Authentication</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Include your token in the Authorization header:
                </p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">API Key Authentication</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Some endpoints support API key authentication via the x-api-key header:
                </p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  x-api-key: your_api_key_here
                </pre>
              </div>
              <div>
                <h4 className="font-medium mb-2">Admin Login</h4>
                <Badge className="mb-2">POST /user/admin-login</Badge>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "email": "admin@example.com",
  "password": "admin_password"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* User Authentication */}
        <section id="auth" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">User Authentication</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Register User</CardTitle>
                  <Badge>POST /user/register</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Request Body</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "password": "secure_password",
  "role": "user"  // Optional: "user", "seller", "admin"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Login</CardTitle>
                  <Badge>POST /user/login</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-medium mb-2">Request Body</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "email": "john@example.com",
  "password": "secure_password"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Password Management</CardTitle>
                  <div className="space-x-2">
                    <Badge>POST /user/forgot-password-token</Badge>
                    <Badge>PUT /user/reset-password/:token</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Request Password Reset</h4>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "email": "john@example.com"
}`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Reset Password</h4>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "password": "new_secure_password"
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* User Management */}
        <section id="user-management" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">User Management</h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Profile</CardTitle>
                  <div className="space-x-2">
                    <Badge>PUT /user/edit-user</Badge>
                    <Badge>GET /user/all-users</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Update User Profile</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "firstname": "Johnny",
  "lastname": "Depp",
  "email": "johnny@example.com",
  "mobile": "9876643220"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Actions</CardTitle>
                  <div className="space-x-2">
                    <Badge>PUT /user/unblock-user/:id</Badge>
                    <Badge>GET /user/refresh</Badge>
                    <Badge>GET /user/logout</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Available Actions</h4>
                    <ul className="list-disc pl-6 text-sm space-y-2">
                      <li>Unblock a user account</li>
                      <li>Refresh authentication token</li>
                      <li>Logout user session</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Address Management</CardTitle>
                  <Badge>PUT /user/save-address</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-medium mb-2">Save User Address</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "address": "123 Main St, City, Country"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Wishlist Management</CardTitle>
                  <Badge>GET /user/wishlist</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Retrieve the user's wishlist containing all saved products.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Products</h2>
          
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="get">Get</TabsTrigger>
              <TabsTrigger value="update">Update</TabsTrigger>
              <TabsTrigger value="delete">Delete</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Create Product</CardTitle>
                    <Badge>POST /product</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Request Body</h4>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "title": "Apple Ipad 2",
  "description": "This is an apple product",
  "price": 1000,
  "quantity": 100,
  "brand": "Apple",
  "category": "watches",
  "color": ["green", "yellow", "red"]
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="get">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Get Products</CardTitle>
                    <div className="space-x-2">
                      <Badge>GET /product</Badge>
                      <Badge>GET /product/:id</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Get All Products</h4>
                    <p className="text-sm text-muted-foreground mb-2">Query Parameters:</p>
                    <ul className="list-disc pl-6 mb-2 text-sm">
                      <li>limit: Number of items per page (default: 10)</li>
                      <li>page: Page number (default: 1)</li>
                    </ul>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      GET /api/product?limit=3&page=1
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Get Single Product</h4>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      GET /api/product/:id
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Get Seller Products</h4>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      GET /api/product/seller/:sellerId
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="update">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Update Product</CardTitle>
                    <Badge>PUT /product/:id</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Request Body</h4>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "title": "Updated Product Name",
  "price": 1200,
  "category": "tablets"
  // Include only fields that need to be updated
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delete">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Delete Product</CardTitle>
                    <Badge>DELETE /product/:id</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Deletes a product by its ID. Requires authentication and appropriate permissions.
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    DELETE /api/product/:id
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bulk">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Bulk Upload Products</CardTitle>
                    <Badge>POST /product/bulk</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload multiple products using an Excel file.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Request</h4>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`// Content-Type: multipart/form-data

{
  "file": // Excel file containing product data
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Product Search & Filtering */}
        <section id="product-search" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Product Search & Filtering</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Elastic Search</CardTitle>
                <Badge>GET /product/search/elastic</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Request Body</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "query": "search term"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Product Ratings */}
        <section id="product-ratings" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Product Ratings</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Rate Product</CardTitle>
                <Badge>PUT /product/rating</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Request Body</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "star": "5",
  "prodId": "product_id",
  "comment": "Excellent Product"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Product Watchlist */}
        <section id="product-watchlist" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Product Watchlist</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Manage Watchlist</CardTitle>
                <div className="space-x-2">
                  <Badge>PUT /product/wishlist</Badge>
                  <Badge>GET /user/wishlist</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Add to Watchlist</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "prodId": "product_id"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Blog */}
        <section id="blog" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Blog</h2>
          
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="get">Get</TabsTrigger>
              <TabsTrigger value="update">Update</TabsTrigger>
              <TabsTrigger value="delete">Delete</TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Create Blog Post</CardTitle>
                    <Badge>POST /blog</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-medium mb-2">Request Body</h4>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "title": "My Travel Blog",
  "category": "Travel",
  "description": "My Travel Blog Description"
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="get">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Get Blog Posts</CardTitle>
                    <div className="space-x-2">
                      <Badge>GET /blog</Badge>
                      <Badge>GET /blog/:id</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Retrieve all blog posts or a single blog post by ID.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="update">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Update Blog Post</CardTitle>
                    <Badge>PUT /blog/:id</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-medium mb-2">Request Body</h4>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "title": "Updated Blog Title",
  "category": "Updated Category",
  "description": "Updated Description"
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delete">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Delete Blog Post</CardTitle>
                    <Badge>DELETE /blog/:id</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Deletes a blog post by its ID. Requires authentication.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Blog Interactions */}
        <section id="blog-interactions" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Blog Interactions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Like/Dislike Blog</CardTitle>
                  <div className="space-x-2">
                    <Badge>PUT /blog/likes</Badge>
                    <Badge>PUT /blog/dislikes</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-medium mb-2">Request Body</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "blogId": "blog_post_id"
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Categories */}
        <section id="product-categories" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Product Categories</h2>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Category Management</CardTitle>
                <div className="space-x-2">
                  <Badge>POST /category</Badge>
                  <Badge>GET /category</Badge>
                  <Badge>PUT /category/:id</Badge>
                  <Badge>DELETE /category/:id</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Create Category</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "title": "Electronics"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Blog Categories */}
        <section id="blog-categories" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Blog Categories</h2>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Blog Category Management</CardTitle>
                <div className="space-x-2">
                  <Badge>POST /blogcategory</Badge>
                  <Badge>GET /blogcategory</Badge>
                  <Badge>PUT /blogcategory/:id</Badge>
                  <Badge>DELETE /blogcategory/:id</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Create Blog Category</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "title": "Travel"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Brands */}
        <section id="brands" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Brands</h2>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Brand Management</CardTitle>
                <div className="space-x-2">
                  <Badge>POST /brand</Badge>
                  <Badge>GET /brand</Badge>
                  <Badge>PUT /brand/:id</Badge>
                  <Badge>DELETE /brand/:id</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Create Brand</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "title": "Apple"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Colors */}
        <section id="colors" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Colors</h2>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Color Management</CardTitle>
                <div className="space-x-2">
                  <Badge>POST /color</Badge>
                  <Badge>GET /color</Badge>
                  <Badge>PUT /color/:id</Badge>
                  <Badge>DELETE /color/:id</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Create Color</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "title": "green"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Enquiries */}
        <section id="enquiries" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Enquiries</h2>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Enquiry Management</CardTitle>
                <div className="space-x-2">
                  <Badge>POST /enquiry</Badge>
                  <Badge>GET /enquiry</Badge>
                  <Badge>PUT /enquiry/:id</Badge>
                  <Badge>DELETE /enquiry/:id</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Create Enquiry</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "comment": "I have a question about..."
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium mb-2">Update Enquiry Status</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "status": "In Progress"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Coupons */}
        <section id="coupons" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Coupons</h2>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Coupon Management</CardTitle>
                <div className="space-x-2">
                  <Badge>POST /coupon</Badge>
                  <Badge>GET /coupon</Badge>
                  <Badge>PUT /coupon/:id</Badge>
                  <Badge>DELETE /coupon/:id</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Create Coupon</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "name": "SUMMER30",
  "expiry": "2024-12-31T23:59:59.999Z",
  "discount": 30
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium mb-2">Apply Coupon to Cart</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "coupon": "SUMMER30"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Orders */}
        <section id="orders" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Orders</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Create Order</CardTitle>
                  <Badge>POST /user/cart/create-order</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Request Body</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "totalPrice": 5000,
  "totalPriceAfterDiscount": 4000,
  "shippingInfo": {
    "address": "123 Street",
    "state": "State",
    "pincode": 456777,
    "country": "Country",
    "name": "Customer Name"
  },
  "orderItems": [
    {
      "productId": "product_id",
      "quantity": 2,
      "price": 500,
      "color": "green"
    }
  ],
  "paymentInfo": {
    "orderId": "payment_order_id",
    "paymentId": "payment_id"
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Order Management</CardTitle>
                  <div className="space-x-2">
                    <Badge>GET /user/get-orders</Badge>
                    <Badge>GET /user/getallorders</Badge>
                    <Badge>PUT /user/order/update-order/:id</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Update Order Status</h4>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "status": "Processing"
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cart */}
        <section id="cart" className="scroll-m-20">
          <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Cart Operations</CardTitle>
                  <div className="space-x-2">
                    <Badge>POST /user/cart</Badge>
                    <Badge>GET /user/cart</Badge>
                    <Badge>DELETE /user/cart</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Add to Cart</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`{
  "productId": "product_id",
  "quantity": 2,
  "color": "blue",
  "price": 23500
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Cart Management Endpoints</h4>
                  <ul className="list-disc pl-6 text-sm space-y-2">
                    <li>GET /user/cart - Get cart contents</li>
                    <li>DELETE /user/delete-product-cart/:id - Remove specific item</li>
                    <li>DELETE /user/empty-cart - Clear entire cart</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

      </div>
    </DocsLayout>
  )
}

