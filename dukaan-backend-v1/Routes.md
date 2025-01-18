getAllProduct Route Usage Examples

Base URL: http://your-api-url.com/api/products

1. Get all products (default sorting by createdAt in descending order):
   GET /api/products

2. Pagination:
   GET /api/products?page=1&limit=10

3. Sorting:
   - Sort by price ascending:  GET /api/products?sort=price
   - Sort by price descending: GET /api/products?sort=-price
   - Sort by multiple fields:  GET /api/products?sort=category,-price

4. Filtering:
   - Filter by price range:    GET /api/products?price[gte]=10&price[lte]=100
   - Filter by category:       GET /api/products?category=electronics
   - Multiple filters:         GET /api/products?category=electronics&price[gte]=50

5. Field limiting:
   GET /api/products?fields=name,price,category

6. Combining options:
   GET /api/products?category=electronics&price[gte]=50&sort=-price&page=1&limit=20&fields=name,price,category

7. Search by name (assuming you've implemented text search):
   GET /api/products?search=keyword

8. Filter by seller (assuming you've added this functionality):
   GET /api/products?seller=seller_id

9. Get products with stock below a certain threshold:
   GET /api/products?quantity[lte]=10

10. Get products created within a date range:
    GET /api/products?createdAt[gte]=2023-01-01&createdAt[lte]=2023-12-31

Remember:
- Use URL encoding for special characters in the query string.
- The 'page' parameter starts at 1.
- The 'limit' parameter defines the number of items per page.
- Use comma-separated values for multiple fields in sorting and field limiting.
- Use [gte], [gt], [lte], [lt] for greater than or equal, greater than, less than or equal, and less than respectively.