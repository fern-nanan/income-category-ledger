# Income Category Ledger

The Income Category Ledger is a single-page, modular user interface built with React.js and Vite. It provides the capability to record, monitor, filter, and analyze income transactions through dynamic summary metrics and a responsive transaction history view.

## Technical Architecture

This application consists of functional React components managed primarily through the `useState` hook. Styling is implemented using inline CSS-in-JS object structures, while responsive design is achieved via CSS grids. The interface incorporates glassmorphism card containers and custom typography utilizing Google Fonts (Fredoka and Quicksand).

## Component Logic & State Management

The application is structured within a single main component (`App.jsx`), maintaining a modular architecture that separates layout blocks while centralizing state management:

1. **State Declaration:**
   - `entries`: An array of objects storing individual transaction records containing properties for identifier (`id`), category, amount, date, and description.
   - **Form Input States (`category`, `amount`, `date`, `description`):** Controlled component states capturing user input parameters prior to submission.
   - `filterCategory`: A filtering state string that isolates specific income categories or displays all entries collectively.

2. **Core Logic Functions:**
   - `handleAddEntry`: Intercepts form submission behavior, validates required numerical and date values, generates a unique timestamp-based identifier (`id`), and prepends the new transaction object to the `entries` state array.
   - `handleDeleteEntry`: Filters out specific transaction objects from the array based on their unique identifier.
   - **Derived State Calculations:** Utilizes JavaScript array methods (`filter` and `reduce`) to dynamically compute filtered subsets and aggregate total income figures in real-time. This approach ensures calculated metrics remain synchronized with the primary dataset without requiring redundant storage states.

## Mandatory AI Defense & Code Usage

In accordance with project requirements regarding development transparency, artificial intelligence tools were utilized exclusively for specific auxiliary tasks during development.

- **Features and Code Assisted by AI:** AI assistance was strictly limited to code cleaning, syntax optimization, formatting adjustments, and resolving minor state-handling bugs in form submission handlers. AI tools did not generate foundational architecture or design features.
- **Component and Logic Defense:** All core architectural decisions, modular layouts, state definitions, and dynamic data filtering mechanisms were manually designed and implemented. The underlying React state model handles data immutability by creating new transaction arrays upon addition or deletion, ensuring predictable re-rendering behavior. Derived state values—such as total income and filtered record counts—are computed dynamically on every render cycle using standard JavaScript array reduction and filtering functions, guaranteeing complete data consistency and avoiding synchronization discrepancies.
