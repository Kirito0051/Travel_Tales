# 🌍 Travel Tales

**Travel Tales** is a responsive travel website built using **Nuxt.js** that allows users to search for flights, hotels, and car rentals. It provides a seamless booking experience, integrates user authentication with Clerk, and offers a clean UI/UX optimized for all devices.

---

## 📊 Project Flow (Visual Overview)

```mermaid
graph TD
  A[Landing Page] --> B[Search Flights / Hotels / Cars]
  B --> C[Results Page]
  C --> D[Select Option]
  D --> E["Login / Signup (Clerk)"]
  E --> F[Booking Form]
  F --> G[Booking Confirmation]

