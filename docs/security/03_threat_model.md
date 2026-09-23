# Security Threat Model & Privacy

## 1. Threat Vectors
1.  **Account Takeover (ATO):** Attackers hijacking passenger or driver accounts.
    *   *Mitigation:* SMS/Email OTP for new device logins. Strict session management.
2.  **GPS Spoofing (Drivers):** Drivers faking location to trigger wait time fees or fake trip completion.
    *   *Mitigation:* OS-level mock location detection, velocity heuristics (impossible travel speed), route deviation alerts.
3.  **Payment Fraud / Stolen Cards:** Use of stolen cards for rides.
    *   *Mitigation:* 3D Secure enforcement via Paystack/Flutterwave, device fingerprinting, rate limiting on card additions.
4.  **Driver-Passenger Collusion:** Arranging fake rides for promos or manipulating fares.
    *   *Mitigation:* Anomaly detection on trip duration vs distance, blocking rides between highly connected accounts.
5.  **Offline Rides (Physical Security):** Driver goes offline to extort passenger.
    *   *Mitigation:* Strict passenger education. Continuous SOS availability. Live location sharing that pings server if trip is cancelled abruptly while moving.

## 2. Infrastructure Security
*   **Database:** Encrypted at rest. No direct public access. VPC peering for backend access.
*   **Secrets:** Managed via Cloud Secret Manager. Never hardcoded.
*   **API Security:** Rate limiting via Redis. JWT with short expiration + HTTP-only refresh tokens. CORS strictly configured.

## 3. Privacy & Data Handling
*   **Location Data:** High precision location retained only for active disputes/safety issues. Aggregated after 90 days.
*   **Driver Documents:** Encrypted in object storage. Accessible only by verified Admins with audit logging.
*   **Phone Numbers:** Masked calling (VoIP) to prevent passengers and drivers from seeing each other's actual phone numbers.
