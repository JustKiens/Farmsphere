# FarmSphere: A Web-Based Application for Monitoring Agricultural Crops using Blockchain Technology

**University**

Don Honorio Ventura State University

**Team Members:**
- **Leader:** Stephen Karlle C. Dimitui
- **Members:**
  - Steven Anton B. Carrillo
  - Iliana Lei S. Castillo
  - Kien Andrew C. Dizon

## Project Description
Farmsphere is an innovative web-based platform that is designed to monitor the inventory of crops of the local provinces of Region III. Gathering and monitoring the information needed for the farmers in terms of their agricultural supply. The platform aims to provide a real-time monitoring solutions in order to enhance the transparency, equality, security, and sustainability in agricultural manner. Integrating blockchain and data analytics technologies, FarmSphere ensures that the crops and the supply of each farmer would be transparent, the flow of information of data across the region would be monitored seamlessly, in order to address the growing demand of supplies to sustain and secure the food production systems.  

### Features:
1. **Real-time Supply Monitoring** - FarmSphere provides local farmers around the provinces of Region III with real-time data on crop yields, inventory levels, and logistics. This will allow local farmer on each province to efficiently decide on their supply and managed their crops efficiently. This web-based system will consolidate data to offer an overview of the agricultural supplies of each province around the region, helping on optimizing production, reduces waste and improve resource management.
2. **Blockchain-Driven Transparency** - FarmSphere utilizes blockchain technology, it establishes a safe and transparent record of each transaction that occurs in the agricultural supply chain. Every crop or product supply from a local farmer is documented and the data will remain unchangeable, ensuring the authenticity of the inventory of each province and minimizing the risk of hoarding stocks, fraud and mislabeling that causes a potential waste and loss of income.
3. **Secure Data Sharing and Collaboration** - The web-based system allows the data providers submit request for a specific data, giving a collaborative operation that will enhance the operations of the farmers around Region III. It will enable them to share their crops and agricultural data around the region in order to check and maintain an equal balance of agricultural crops stock around the area, minimizing the exceeds of supply and waste of crops and food stocks.
4. **Farmer Empowerment and Education** - FarmSphere also functions like a farmer’s hub, providing farmers an access on each provinces stock crops allowing them to check resources and create a data driven decision for sustainability together with the adaption of the modern technology. This empowers the farmers of the Region III to stay informed and actively participate on a sustainable agricultural development

## Objectives:
FarmSphere supports the following UN Sustainable Development Goals (SDGs):
- **SDG 1:** No Poverty – with the used of FarmSphere the poverty problem around the nation, particularly for small-scaled farmers will be given a solution with the tools and resources improved productivity by utilizing the web-based system. By giving them real-time data on crop yields, market demands, and supplies around the area it gives them the timing, the right decision to meet the markets demands efficiently, reducing losses and maximizing the revenue. Additionally, the transparency of the data provided by the technology of blockchain ensures that the farmers will receive an equal fair price for their products, and the buyers can verify its authenticity and quality of the crops that are being produced.
- **SDG 2:** Zero Hunger – FarmSphere also aims to eliminate hunger by optimizing food production, reducing food waste, improved supply chain transparency, and increased access to nutritious foods, as the system enables the farmers to monitor their crop conditions and make-data driven decisions that improve the quality of its agricultural productivity, also providing tools that allows farmers to track their inventory, monitor the supply chain around the area and predict the yields of crop more accurately resulting on a fair distribution and makes it easier for organizations and governments to track food supplies, ensuring that it will reach every populations.
- **SDG 8:** Decent Work and Economic Growth -  Decent Work and Economic Growth – FarmSphere uses tools to improve productivity, market access, and income. This promotes fair compensation to all farmers with the use of blockchain transparency. This fosters a sustainable farming practice which leads to the improvement of long-term productivity which reduces cost and contributes to the economic growth. Therefore, the platform creates job opportunities to small-scaled and local farmers by increasing their profitability with the adaption of the technology enabling a direct market connection.
- **SDG 10:** Reduced Inequality – The system reduces the inequality by empowering farmers whether small-scaled or large-scaled farmers, giving both an access to better market their crops with fair compensation and financial inclusion. The blockchain transparency ensures that each farmer can compete on a level playing field. FarmsSphere helps bridge the gap between the small farmers and the large producers.
- **SDG 17:** Partnerships for the Goals – FarmSphere fosters collaboration across agricultural supply chain, allowing the farmers and the Department of Agriculture, connect through a transparent blockchain-based platform. This enables partnership from farmers and government allowing a collaborative space that caters the needs of both the food demand and farmer needs. By the integration of the modern technology, FarmSphere provides innovation and collective progress for sustainability and economic growth. This enhances the accountability and monitoring of SDG goals making it a powerful platform for cooperation and shared responsibilities in the agricultural aspects.


---

## Technologies Used
### Programming Language:
- **TypeScript** - Ensures scalability and reliability through early error detection.

### Frontend:
- **Vite** - Optimizes the development process with fast builds and smooth performance.
- **React** - Facilitates reusable UI components and improves interface performance.
- **Tailwind CSS** - Enables quick styling with predefined classes for a user-friendly interface.
- **Framer Motion** - Adds smooth animations to improve user experience.

### Backend:
- **Node.js** - Handles real-time updates and ensures scalability for large data processing.
- **Express.js** - Provides flexible routing and middleware for authentication and error handling.
- **Azle Book** - Ensures type safety and simplifies API usage.
- **Mongodb** - A NoSQL database that provides flexible and scalable data storage for managing crop inventories, farmer data, and transaction records efficiently.

- **Cloudinary** - Manages image and video uploads, optimizing them for various devices.

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (included with Node.js)
- **Git**
- **TypeScript**

### Step 1: Clone the Repository
```bash
git clone git@github.com:username/farmsphere.git
```
### Step 2: Navigate to the project Directory
Use Git to clone the FarmSphere project repository onto your machine:
```bash
cd Farmsphere
```
### Step 3: Install the Frontend Dependencies
Install all the required dependencies for frontend
```bash
cd Farmsphere/src/frontend
npm install
```
### Step 3: Deploy using DFX Deployment
Make sure you're in directory /Farmsphere 
```bash
dfx start --clean --background
```
Wait for dfx to start and if it's done
```
dfx deploy
```

