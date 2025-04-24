# 🌍 Travel Tales

**Travel Tales** is a responsive travel website built using **Nuxt.js** that allows users to search for flights, hotels, and car rentals. It provides a seamless booking experience, integrates user authentication with Clerk, and offers a clean UI/UX optimized for all devices.

---

🧩 Features
🔍 Flight, hotel, and car rental search

🧾 Booking system with confirmation

🔐 User authentication using Clerk

📱 Responsive design with clean UI

🌐 Built with Nuxt.js & Tailwind CSS

🎥 3D model/video slider on landing page

Tech | Usage

Nuxt.js | Frontend Framework

Tailwind CSS | Styling

Clerk | Authentication

MongoDB | Database (via MongoDB Atlas)

Node.js | Backend 

# npm
npm install
# yarn
yarn install
# pnpm
pnpm install
# bun
bun install

npm run dev
# or
yarn dev
# or
pnpm dev

Connect with Me

GitHub: @Kirito0051

LinkedIn: Anas Shaikh

Email: anas0066@gmail.com
## 📊 Project Flow (Visual Overview)

```mermaid

graph TD
  A[Landing Page] --> B[Search Flights / Hotels / Cars]
  B --> C[Results Page]
  C --> D[Select Option]
  D --> E["Login / Signup (Clerk)"]
  E --> F[Booking Form]
  F --> G[Booking Confirmation]

