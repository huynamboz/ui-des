Software Specifications for Washing Machine Management Embedded Application 

1. Introduction 

1.1 Purpose 

This document outlines the software specifications for an embedded application designed to manage a washing machine in a shared or smart home environment. The application runs on an ESP32-S3 microcontroller with an integrated 4-inch display. The primary goal is to optimize washing operations based on real-time electricity costs by fetching spot prices from sahko.tk (a Finnish electricity price service), estimating the cost of a washing cycle, managing user accounts, and calculating monthly washing expenses per user. 

1.2 Scope 

The software will: 

Fetch and display real-time electricity spot prices. 

Estimate and display the cost of a single washing cycle. 

Handle user authentication and account management. 

Track washing usage and compute monthly costs. 

Provide a user-friendly interface on the 4-inch display. 

The application does not include direct hardware control of the washing machine (e.g., starting/stopping cycles) unless specified in future iterations. It focuses on cost estimation and management. Integration with the washing machine's sensors or relays for usage tracking is assumed but not detailed here. 

1.3 Assumptions and Dependencies 

The ESP32-S3 has Wi-Fi connectivity for internet access. 

The 4-inch display is a TFT LCD (e.g., ILI9341 or similar) with touchscreen capabilities for user input. 

Electricity consumption per washing cycle is predefined (e.g., 1.5 kWh for a standard cycle; configurable). 

Prices from sahko.tk include VAT and are in snt/kWh (cents per kWh). 

No official API is available from sahko.tk; data fetching will involve HTTP requests and HTML parsing. 

User data is stored locally on the ESP32's flash memory (e.g., via SPIFFS or NVS). 

Time synchronization via NTP for accurate price fetching and logging. 

1.4 Definitions and Acronyms 

ESP32-S3: Espressif's microcontroller with dual-core Xtensa LX7, Wi-Fi, and Bluetooth. 

Spot Price: Hourly electricity price from the Nord Pool exchange, as displayed on sahko.tk. 

Washing Cycle: A single load of laundry, assuming fixed energy consumption. 

User Account: Profile for tracking individual usage and costs. 

2. System Overview 

2.1 Architecture 

The software is built as an embedded system using the ESP-IDF or Arduino framework in C/C++. Key components: 

Network Module: Handles Wi-Fi connection and HTTP requests to sahko.tk. 

Data Parser: Extracts spot prices from HTML responses (e.g., using string matching for table data). 

Cost Calculator: Computes cycle and monthly costs based on fetched prices and usage logs. 

User Management: Simple database for accounts, usage logs, and authentication. 

UI Module: Renders screens on the 4-inch display using libraries like LVGL or TFT_eSPI. 

Storage Module: Persists user data and configuration. 

Task Scheduler: FreeRTOS tasks for periodic price updates, UI handling, and background calculations. 

The system operates in a loop: fetch prices every hour, update UI, handle user inputs, and log usage. 

2.2 Data Flow 

Default screen show current Electric price 

User touches the screen, login panel appear, User logs in via touchscreen. 

User requests a cost estimate for a washing cycle. User see how much spent current month. A washing would takes 2kwh and 30 litre of water and drying 1kwh. 

System calculates estimate based on current price and predefined kWh. 

Upon cycle completion (manual input or sensor trigger), log usage and update monthly totals. 

Display dashboards for current price, estimates, and personal costs. 

3. Hardware Requirements 

Microcontroller: ESP32-S3 with at least 4MB PSRAM and 16MB flash. 

Display: 4-inch TFT LCD (320x240 resolution minimum), with capacitive touchscreen. 

Connectivity: Wi-Fi for internet access. 

Peripherals: Optional RTC module for timekeeping, buzzer for alerts, and relay/GPIO for washing machine integration (e.g., to detect cycle start/end). 

Power Supply: 5V DC, with low-power modes for energy efficiency. 

4. Functional Requirements 

4.1 Price Fetching 

The system shall connect to Wi-Fi on boot (configurable SSID/password). 

Fetch current hourly spot prices from https://sahko.tk via HTTP GET. 

Parse HTML to extract: 

Current price (e.g., for the ongoing hour). 

Daily average, high, and low prices. 

Tomorrow's prices if available. 

Update prices every 30-60 minutes (configurable). 

Handle errors (e.g., no internet) by displaying cached data and alerts. 

4.2 Cost Estimation 

Assume default washing cycle consumption: 1.5 kWh (configurable via settings). 

Calculate cost estimate: Cost = Spot Price (snt/kWh) * Consumption (kWh). 

Display estimate on UI, e.g., "Estimated cost for one cycle: 0.12 €". 

Provide options for custom cycles (e.g., eco mode: 1.0 kWh). 

4.3 User Account Management 

Support up to 10 user accounts (expandable). 

Features: 

Create account: Username, PIN (4 digits). 

Login: Via touchscreen keypad. 

Logout: Automatic after inactivity (5 minutes). 

Secure storage: Hash PINs using simple algorithm (e.g., SHA-256 if resources allow). 

4.4 Usage Tracking and Monthly Costs 

Log each washing cycle per user: Timestamp, duration (assumed 1 hour), spot price at start, calculated cost. 

Calculate monthly totals: Sum costs for the current month per user. 

Reset logs at month-end or on admin request. 

Display personal dashboard: "This month's cost: 5.67 €" with breakdown. 

4.5 UI Screens 

Home Screen: Current spot price, daily summary, quick estimate button. 

Login Screen: Keypad for PIN entry. 

Dashboard: User-specific usage history, monthly cost, cycle estimate. 

Settings Screen: Admin mode for Wi-Fi config, consumption values, user management. 

Use icons and graphs (e.g., price trend chart) for visual appeal. 

4.6 Alerts and Notifications 

Alert if price is high (>15 snt/kWh): "High price period – delay washing?" 

Buzzer or display flash for errors (e.g., Wi-Fi down). 

5. Non-Functional Requirements 

5.1 Performance 

Boot time: <10 seconds. 

Price fetch latency: <5 seconds. 

UI response: <500ms for touch inputs. 

Memory usage: <2MB RAM to leave headroom for ESP32-S3. 

5.2 Reliability 

Graceful error handling: Retry failed fetches (3 attempts). 

Data persistence: Save logs on power loss using non-volatile storage. 

Watchdog timer to prevent hangs. 

5.3 Security 

Basic authentication to prevent unauthorized access. 

No sensitive data transmission (prices are public). 

Over-the-air (OTA) updates for firmware. 

5.4 Usability 

Intuitive touchscreen interface with large buttons for 4-inch display. 

Multilingual support: English (default ). 

Accessibility: High-contrast mode. 

5.5 Power Efficiency 

Enter deep sleep when idle, wake on touch or timer. 

Display backlight auto-off after 1 minute inactivity. 

6. Testing and Validation 

Unit Tests: For parser, calculator, and storage modules (using ESP-IDF test framework). 

Integration Tests: Wi-Fi fetch, UI rendering. 

System Tests: End-to-end scenarios (e.g., login → estimate → log cycle). 

Edge Cases: No internet, invalid HTML, full storage. 

7. Deployment and Maintenance 

Build with ESP-IDF v5.0+ or Arduino IDE. 

Flash via USB or OTA. 

Logging: Serial output for debugging. 

Versioning: Start at v1.0, with changelog for updates. 

This specification provides a foundation for development. Further details (e.g., API alternatives if scraping proves unreliable) can be added based on prototyping. 

 

 

 

 

 

 

 

 

 

 

 

 

 

Wireframe Designs for Washing Machine Management App 

I'll help you design simple wireframes for the key screens based on the software specifications. Since this is an embedded app on a 4-inch (likely 320x240 pixel) touchscreen display, the designs prioritize simplicity, large touch-friendly elements, and minimalism to fit the small screen. I'll use text-based ASCII art to represent the layouts, with descriptions for each screen. These are low-fidelity wireframes—think boxes for UI elements, labels for text, and notes on interactions. 

If you'd like me to generate actual image-based wireframes (e.g., using design tools or sketches), please confirm, and I can proceed with that. 

1. Home Screen 

Purpose: Displays current electricity spot price, daily summary, and a quick button to estimate washing cost or log in. This is the default screen on boot or after logout. 

Layout Notes: 

Top: Header with time/date and app title. 

Middle: Large display of current price and summary stats. 

Bottom: Action buttons. 

Interactions: Touch buttons to navigate; auto-refresh price every 15 min. 

2. Login Screen 

Purpose: Secure user authentication with a 4-digit PIN keypad. Appears when user taps "Login" from Home. 

Layout Notes: 

Full-screen keypad for easy touch input. 

Top: Username selection (if multiple users) or prompt. 

Middle: Numeric keypad. 

Bottom: Confirm/Cancel buttons. 

Interactions: Touch numbers to enter PIN; haptic feedback if possible; auto-logout on inactivity. 

text 

+-----------------------------+ 
|     Login to Account       |  // Header (15%) 
| Select User: [Dropdown]    |  // Or list if few users 
+-----------------------------+ 
|        Enter PIN:          |  // Input area (20%) 
|         ******             | 
+-----------------------------+ 
|  1   2   3                 |  // Keypad (50%, large buttons) 
|  4   5   6                 | 
|  7   8   9                 | 
|      0   <                 |  // Backspace 
+-----------------------------+ 
| [Confirm]    [Cancel]      |  // Actions (15%) 
+-----------------------------+ 

3. Dashboard Screen (User-Specific) 

Purpose: Shows personalized data after login: monthly costs, usage history, and cycle estimate. 

Layout Notes: 

Top: User greeting and logout button. 

Middle: Key metrics and a simple list or graph for history. 

Bottom: Action to log a new cycle or estimate. 

Interactions: Scroll if history is long; touch to view details. 

text 

+-----------------------------+ 
| Welcome, User1  [Logout]   |  // Header (15%) 
+-----------------------------+ 
| Cost per wash: 5.67 €  |  // Metrics (30%) 
| Total cost: 5.6 Euro | Cycles: 8 | Avg Cost: 0.71 | 
|                            | 
| Usage History:             |  // List/Graph (40%) 
| - Dec 20: 0.85 € (1.5 kWh) | 
| - Dec 15: 0.60 €           | 
| [Simple Bar Chart Here]    | 
+-----------------------------+ 
| [Statistics] [Wash Now]|  // Buttons (15%) 
+-----------------------------+ 

4. Settings Screen (Admin Mode) 

Purpose: Accessible via a hidden gesture or admin login. Allows configuration of Wi-Fi, consumption values, and user management. 

Layout Notes: 

Top: Title and back button. 

Middle: Scrollable list of options. 

Interactions: Touch to edit fields; save changes to storage. 

text 

+-----------------------------+ 
|        Settings            |  // Header (15%) 
| [Back]                     | 
+-----------------------------+ 
| Wi-Fi Config:              |  // Options list (70%, scrollable) 
| SSID: [Text Field]         | 
| Password: [Text Field]     | 
|                            | 
| Cycle Consumption:         | 
| Standard: 1.5 kWh [Edit]   | 
| Eco: 1.0 kWh [Edit]        | 
|                            | 
| User Management:           | 
| [Add User] [Edit Users]    | 
+-----------------------------+ 
| [Save Changes]             |  // Bottom action (15%) 
+-----------------------------+ 

Additional Screens/Elements 

Cost Estimate Popup/Modal: Overlays on Home or Dashboard when "Estimate Cost" is tapped. 

text 

+-------------------------+  // Modal (centered, 80% screen) 
|   Cycle Estimate       | 
| Current Price: 12.5 snt| 
| Consumption: 1.5 kWh   | 
| Estimated Cost: 0.19 € | 
| [Custom Cycle] [Close] | 
+-------------------------+ 

Alert Notification: Full-screen or banner for high prices or errors. 

text 

+-----------------------------+ 
| ! High Price Alert !       | 
| Current: 18.0 snt/kWh      | 
| Suggest delaying wash.     | 
| [OK]                       | 
+-----------------------------+ 

General Design Guidelines 

Color Scheme: Use high-contrast (e.g., dark text on light background) for readability. Green for low prices, red for high. 

Touch Targets: Buttons at least 48x48 pixels for easy tapping. 

Navigation: Back buttons or swipe gestures; no deep menus. 

Icons: Simple icons (e.g., € for costs, clock for time) to save space. 

Responsiveness: Adapt to portrait orientation; fixed layout due to small screen. 

Tools/Libraries: Implement with LVGL for ESP32-S3 to handle touch and graphics. 

These wireframes can be prototyped in tools like Figma or Balsamiq for higher fidelity. Let me know if you want adjustments, more details, or image generations! 

 

 

 

 

Pin mapping 

GPIO 

 

 

 

 

EX_IO 1 

LCD_RS 

RST 

 

 

1 

47 

LCD SDA 

 

 

2 

48 

LCD SCK 

 

 

EX_IO 3 

39 

LCD CS 

 

 

38 

16 

HS 

 

 

39 

17 

VS 

 

 

40 

18 

DE 

 

 

5,45,48,47 

4..7 

DB1..4 

 

 

21 

15 

DB5 

 

 

 

8 

DB6 

 

 

 

20 

DB7 

 

 

 

3 

DB8 

 

 

 

46 

DB9 

 

 

 

9 

DB10 

 

 

 

10 

DB11 

 

 

 

11..14 

DB13..16 

 

 

 

0 

DB17 

 

 

 

TP_INT 

TP_INT 

 

 

 

19 

TP_SDA 

 

 

 

45 

TP_SCL 

 

 

 

LCD_RST 

TP_RST 

 

 

 

 

 

 

 

 