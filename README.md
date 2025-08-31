# Lendsqr Frontend Assessment

This is my implementation of the Lendsqr frontend assessment.  
The project is built with **React + TypeScript + SCSS**, following a component-driven approach and clean architecture.

---

## Tech Stack
- **React** – UI library for building components  
- **TypeScript** – static typing for reliability and maintainability  
- **SCSS** – modular and responsive styling  
- **LocalStorage** – lightweight persistence of users and filters  
- **Jest + React Testing Library** – for unit testing the login flow  

---

## Project Structure

src/
├── api/                  # API calls & local caching (e.g., fetchUsers, fetchUserById)
├── assets/               # Static resources
│   ├── images/           # Project images
│   ├── icons/            # UI icons (SVG/PNG)
│   ├── fonts/            # Custom fonts
│   └── index.ts          # Centralized imports/exports for assets
├── components/
│   ├── ui/               # Reusable UI components (Pagination, FilterDropdown, StatCard, ActionDropdown)
│   └── layout/           # Layout components (AppLayout, Sidebar, Navbar)
├── pages/                # Application pages (Login, Users, UserDetails)
├── styles/               # Global and modular SCSS
├── types/                # TypeScript type definitions (User, Filter)
└── tests/                # Unit tests (e.g., Login.test.tsx)

---

##  Features

### Authentication
- Simple login page with validation and error handling
- Tested using **React Testing Library and Jest** (`Login.test.tsx`)

### Users Page
- Displays users in a paginated table  
- **Filter by:** organization, username, email, phone, date joined, and status  
- **LocalStorage** integration: users and filter state are cached for persistence  
- **Dynamic Action Dropdowns:** options change based on user status (e.g., active, inactive, blacklisted, pending)  

### User Details Page
- Detailed view of a single user with sections for:  
  - Personal Information  
  - Education & Employment  
  - Socials  
  - Guarantor Information  
- Cached data for faster reloads  
- Tier system with icons (stars)  
- Navigation panel for user sub-sections  

### UI & Styling
- Responsive layout with `Sidebar`, `Navbar`, and `AppLayout` shell  
- Reusable stat cards for displaying user metrics  
- Dropdowns, filters, and pagination components built for reusability  
- Custom assets (images, icons, fonts) managed centrally via `assets/index.ts`  

---

## Key Decisions & Approach

1. **Filter Functionality**  
   - In the design, one dropdown controlled all filter options, which wasn’t intuitive.  
   - I refactored it so **each table header manages its own filter dropdown**, improving clarity and usability.  

2. **Dynamic Action Dropdown**  
   - Figma only included: *View Details, Activate User, Blacklist User*.  
   - I extended it so that the **options change depending on user status**:  
     - **Active user:** View Details, Deactivate, Blacklist, Pending  
     - **Inactive user:** View Details, Blacklist, Pending, Activate  
     - **Pending user:** View Details, Activate, Deactivate, Blacklist  
     - **Blacklisted user:** View Details, Activate  

    This made the UI **smarter and context-aware**, improving user experience.  

---

## Testing
- **Login.test.tsx** ensures:  
  - The login form renders properly  
  - Validations work (empty fields, wrong credentials)  
  - Navigation happens on successful login  

---

##  Running the Project

```bash
# Clone repository
git clone <repo-url>

# Install dependencies
npm install

# Run development server
npm start

# Run tests
npm test

# Build for production
npm run build

Conclusion
This project demonstrates how I structured and implemented the assessment:

Clean separation of concerns (UI, pages, layout, API, types)

Practical improvements to the given Figma design

A balance of usability, performance, and maintainability