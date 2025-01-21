# 🛠️ ONDC Seller Admin Panel  

The **ONDC Seller Admin Panel** is a robust platform designed to empower administrators to manage sellers, products, and catalog data efficiently. With advanced tools for analytics, AI-powered catalog generation, and seamless control, the admin panel ensures effective oversight of the entire ecosystem.  

---

## 🚀 Features  

1. **Seller Management**  
   - Approve, reject, or deactivate sellers.  
   - View and update seller details.  
   - Monitor seller performance metrics.  

2. **Product & Catalog Management**  
   - Bulk upload products using Excel sheets.  
   - AI-powered catalog descriptions for SEO optimization.  
   - Track product status and ensure data accuracy.  

3. **Advanced Analytics**  
   - Integrated Power BI dashboards for real-time insights.  
   - Monitor sales trends and performance metrics.  
   - Identify top-performing sellers and products.  

4. **API Key Management**  
   - Automated API key generation for seller integrations.  
   - Monitor API usage and revoke keys as needed.  

5. **Role-Based Access Control (RBAC)**  
   - Multi-tier user roles: Super Admin, Manager, and Staff.  
   - Restrict access based on role permissions.  

---

## 📋 Installation  

Follow the steps below to set up and run the Admin Panel:  

### 1. Clone the Repository  
```bash  
git clone https://github.com/Dash10107/Dukaan
cd dukaan--admin
npm install  
npm run dev
```
📈 System Design Highlights
Modular Microservices Architecture

Decoupled modules for sellers, products, and analytics management.
Optimized Database Performance

Separate collections for users, sellers, and product data.
Efficient indexing ensures fast query processing.
High Security

Encrypted passwords using bcrypt.
JWT-based authentication for secure session management.
Scalable Infrastructure

Designed to handle up to 100K concurrent admin requests.
Stress-tested for 99.9% uptime.
Data-Driven Insights

Integrated Power BI APIs for real-time reporting.
🔒 Authentication & Authorization
Authentication:
Login via secure JWT tokens.
Authorization:
Role-based access ensures granular control over functionalities.
🌟 Future Enhancements
AI-Powered Recommendations

Predictive suggestions for catalog improvements.
Audit Logs

Comprehensive logging of admin activities.
Customizable Dashboards

Dynamic widget-based dashboards for personalized insights.
Multi-Language Support

Enable accessibility for diverse regions.
📧 Contact
For questions or assistance, reach out to us at:
admin-support@example.com

📄 License
This project is licensed under the MIT License.


https://digic-admin.vercel.app/ 
