# Information Architecture & UX Flow

## 1. Design Principles
*   **Premium & Confident:** Deep tailored colors (e.g., Midnight Blue/Onyx background with high-contrast vibrant accents). Avoid generic templates.
*   **Offline-Resilient:** Caching state. Skeleton loaders. Clear messaging when connection drops.
*   **Typography:** Google Fonts (e.g., Inter or Outfit) for extreme readability on low-end Androids.

## 2. Information Architecture

### Passenger App
*   **Home:** Map (Primary), Where to? (Prominent input), Saved Places, Active Ride Sheet.
*   **Activity:** Past rides, Scheduled rides, Cancelled.
*   **Trusted Drivers:** List of trusted drivers, stats, option to request directly.
*   **Wallet:** Balance, Payment Methods, Add Funds, Transaction History.
*   **Account:** Family Accounts, Safety Settings, Support.

### Driver App
*   **Home (Offline):** Go Online Button, Today's Earnings Summary, Goals.
*   **Home (Online):** Heatmap/Demand zones, Incoming requests.
*   **Trip Radar:** "Opportunity Analysis" (Gross, Comm, Est Fuel, Net, Pickup Dist).
*   **Earnings:** Daily/Weekly breakdown, Withdraw, Expenses (Fuel input).
*   **Profile:** Documents, Rating, Reviews, Vehicle info.

### Admin Command Center (Web)
*   **Dashboard:** Live map, active trips, revenue, SOS alerts.
*   **Drivers:** Pending verifications, active, suspended. Document viewer.
*   **Passengers:** User list, disputes, wallet adjustments.
*   **B2B/Events:** Organization list, Event transport schedules, Route management.
*   **Audit Log:** Immutable record of admin actions.

## 3. Key UX Flows
**Requesting a Trusted Driver:**
1. Passenger enters destination.
2. Selects ride class (e.g., Vella Standard).
3. Toggles "Prioritize Trusted Drivers".
4. System searches passenger's trusted list first.
5. If none available, offers standard matching with clear notification.

**Driver Ride Acceptance:**
1. Request pops up.
2. UI displays: "Estimated Net: ₦4,500 | Fuel Est: ₦1,200 | Distance: 5km total".
3. Visual indicator: Green (Good Opportunity), Yellow (Average).
4. Driver swipes to accept.

**SOS Activation:**
1. Passenger taps Shield Icon.
2. Confirms "Call for Help".
3. App silently records audio (if permitted), shares live link with emergency contacts, alerts Admin Command Center.
4. Screen goes dim to hide SOS activity from aggressive drivers.
