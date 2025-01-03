# Anudan Service - Empowering Farmers and CSC Centers

Anudan Service is designed to assist farmers and CSC (Common Service Center) owners in finding **VK (Verification Key) numbers**. It also enables seamless communication with farmers via **WhatsApp API** to provide updates and information regarding their grants and applications.

---

## Features

- **VK Number Finder**: Helps farmers and CSC owners quickly retrieve VK numbers.
- **WhatsApp Messaging**: Send automated updates and information to farmers using WhatsApp API.
- **User-Friendly**: Simple and intuitive interface for easy operation.

---

## Target Audience

- **Farmers**: Receive updates about their applications and grants directly on WhatsApp.
- **CSC Center Owners**: Help farmers retrieve VK numbers and send necessary updates.

---

## Tech Stack

- **Node.js**: Backend runtime
- **Fastify**: Lightweight and fast web framework
- **MongoDB**: For efficient data storage and retrieval
- **Baileys**: For messaging farmers using whatsapp
- **Mongoose**: ODM for MongoDB
- **pnpm**: Dependency management

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/codegshinde/anudan-service.git
   cd anudan-service
   
2. Install dependencies:

   ```bash
   pnpm install
   
4. Create a .env file with the following configuration:

   ```bash
   MONGODB_URI=<your-mongodb-connection-string>
   PORT=3000
5. Start the application:

   ```bash
   pnpm start

