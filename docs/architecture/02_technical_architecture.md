# Technical Architecture & API Specification

## 1. High-Level Architecture
Vella Mobility will utilize a Modular Monolith architecture initially, designed for easy extraction into microservices as scale demands.

**Tech Stack:**
*   **Backend:** Node.js + TypeScript (NestJS for strict modularity and dependency injection).
*   **Database:** PostgreSQL (Primary relational store) + PostGIS for geospatial queries.
*   **Cache & Real-time:** Redis (Pub/Sub for location updates, state caching) + WebSockets (Socket.io/ws) for real-time bi-directional communication.
*   **Frontend (Admin/Corporate):** Next.js (React) + TypeScript + TailwindCSS (strictly tailored for premium design, no generic templates).
*   **Mobile Apps (Passenger/Driver):** React Native (Expo) - Ensures rapid cross-platform development with optimized native modules for maps/location.
*   **Cloud/Deployment:** Google Cloud Platform (Cloud Run for scalable containers, Cloud SQL for Postgres).

## 2. Database ERD (Core Entities)
*   `users` (id, email, phone, role, password_hash, status, gender, guild_tier)
*   `driver_profiles` (user_id, license_num, verification_status, guild_points)
*   `vehicles` (id, driver_id, make, model, plate, color, ac_status)
*   `rides` (id, passenger_id, driver_id, status, pickup_geom, dropoff_geom, fare_estimated, fare_actual, preferences_json, flight_number)
*   `trusted_drivers` (passenger_id, driver_id, added_at)
*   `wallets` (id, user_id, balance, currency)
*   `transactions` (id, wallet_id, amount, type, reference, is_escrow)
*   `audio_recordings` (id, ride_id, s3_bucket_key, encrypted_hash, uploaded_at)
*   `organizations` (id, name, billing_type)
*   `events` (id, org_id, name, date)
*   `routes` (id, event_id, pickup_geom, destination_geom)

## 3. Real-Time Architecture
*   **Driver Location:** Drivers send GPS pings every 5-10s (dynamic based on speed/battery). Handled via WebSockets, buffered in Redis, periodically flushed to Postgres for trip history.
*   **Trip State Machine:** Strongly validated on the backend. Transitions: `REQUESTED` -> `SEARCHING` -> `ACCEPTED` -> `ARRIVING` -> `ARRIVED` -> `STARTED` -> `COMPLETED`. Clients subscribe to state changes via WebSockets.

## 4. Payment Architecture
*   **Abstraction Layer:** `PaymentGatewayProvider` interface. Implementations: Paystack, Flutterwave.
*   **Ledger:** Immutable double-entry ledger system for wallets. No row updates for balances without corresponding transaction records.
*   **Webhooks:** Asynchronous confirmation of payments. Frontend NEVER dictates payment success.

## 5. API Specification (RESTful + WS)
*   `POST /api/v1/auth/register`
*   `POST /api/v1/rides/request` (Payload: pickup, dropoff, ride_type, preferences, flight_number)
*   `WS /ws/rides/:id` (Realtime tracking, state, and SOS audio stream triggers)
*   `GET /api/v1/drivers/economics/daily` (Driver financial dashboard & guild status)
*   `POST /api/v1/events/:id/book-seat` (Event transport booking)
*   `POST /api/v1/wallets/escrow/resolve` (Auto-transfers change from passenger to driver)
