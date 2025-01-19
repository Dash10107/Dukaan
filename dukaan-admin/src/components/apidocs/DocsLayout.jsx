import React from 'react';

export function DocsLayout({ children }) {
  return (
    <div className="docs-layout min-h-screen">
      <aside className="sidebar mt-10">
      <aside className="hidden lg:block w-72 shrink-0 border-r">
          <div className="font-bold mb-4 text-xl">E-Commerce API Docs</div>
          <nav className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">GETTING STARTED</div>
              <a href="#introduction" className="block text-sm hover:text-primary">
                Introduction
              </a>
              <a href="#authentication" className="block text-sm hover:text-primary">
                Authentication
              </a>
            </div>
            {/* <Separator /> */}
            <div className='h-[1px] w-[80%] bg-black ' />

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">PRODUCTS</div>
              <a href="#products" className="block text-sm hover:text-primary">
                Product Management
              </a>
              <a href="#product-search" className="block text-sm hover:text-primary">
                Search & Filtering
              </a>
              <a href="#product-ratings" className="block text-sm hover:text-primary">
                Ratings & Reviews
              </a>
              <a href="#product-bulk" className="block text-sm hover:text-primary">
                Bulk Operations
              </a>
              <a href="#product-images" className="block text-sm hover:text-primary">
                Image Upload
              </a>
              <a href="#product-watchlist" className="block text-sm hover:text-primary">
                Watchlist
              </a>
            </div>
            {/* <Separator /> */}
            <div className='h-[1px] w-[80%] bg-black ' />

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">ORDERS</div>
              <a href="#cart" className="block text-sm hover:text-primary">
                Shopping Cart
              </a>
              <a href="#orders" className="block text-sm hover:text-primary">
                Order Management
              </a>
            </div>
            {/* <Separator /> */}
            <div className='h-[1px] w-[80%] bg-black ' />

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">BLOG</div>
              <a href="#blog" className="block text-sm hover:text-primary">
                Blog Posts
              </a>
              <a href="#blog-interactions" className="block text-sm hover:text-primary">
                Likes & Comments
              </a>
            </div>
            <div className='h-[1px] w-[80%] bg-black ' />
            {/* <Separator /> */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">CATEGORIES</div>
              <a href="#product-categories" className="block text-sm hover:text-primary">
                Product Categories
              </a>
              <a href="#blog-categories" className="block text-sm hover:text-primary">
                Blog Categories
              </a>
            </div>
            {/* <Separator /> */}
            <div className='h-[1px] w-[80%] bg-black ' />

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">OTHER</div>
              <a href="#brands" className="block text-sm hover:text-primary">
                Brands
              </a>
              <a href="#colors" className="block text-sm hover:text-primary">
                Colors
              </a>
              <a href="#enquiries" className="block text-sm hover:text-primary">
                Enquiries
              </a>
              <a href="#coupons" className="block text-sm hover:text-primary">
                Coupons
              </a>
              <a href="#uploads" className="block text-sm hover:text-primary">
                File Uploads
              </a>
            </div>
            {/* <Separator /> */}
            <div className='h-[1px] w-[80%] bg-black ' />
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">USERS</div>
              <a href="#auth" className="block text-sm hover:text-primary">
                Authentication
              </a>
              <a href="#user-management" className="block text-sm hover:text-primary">
                User Management
              </a>
              <a href="#user-profile" className="block text-sm hover:text-primary">
                Profile & Settings
              </a>
            </div>
          </nav>
      </aside>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

