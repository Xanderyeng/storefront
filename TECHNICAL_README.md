# DVT Tech Challenge: E-commerce Storefront (Technical Overview)

[![Next.js](https://img.shields.io/badge/Next.js-13.0+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-4.0+-FF4154?style=for-the-badge&logo=react&logoColor=white)](https://github.com/pmndrs/zustand)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-6.0+-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

## Project Overview

This document provides a technical overview of the DVT Tech Challenge e-commerce storefront implementation. It complements the main `README.md` file by focusing on the technical aspects, architecture, and development practices used in this project.

## Features

- **Product Listing**: Displays all products fetched from the Fake Store API as cards.
- **Category Filtering**: Allows users to browse products by category.
- **Shopping Cart**: Implements a fully functional cart system with add, remove, and update quantity features.
- **Responsive Design**: Ensures a seamless experience across desktop and mobile devices.
- **Dark Mode**: Supports both light and dark themes for user preference.
- **Server-Side Rendering**: Utilizes Next.js for improved performance and SEO.
- **Global State Management**: Uses Zustand for efficient state management across the application.
- **Type Safety**: Implements TypeScript for enhanced code quality and developer experience.
- **Accessibility**: Follows WCAG guidelines to ensure the application is accessible to all users.

## Technologies Used

- **Next.js**: React framework for server-side rendering and routing
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Superset of JavaScript that adds static typing
- **Zustand**: Lightweight state management solution
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Shadcn UI**: Component library for consistent and customizable UI elements
- **Framer Motion**: Animation library for React
- **React Hot Toast**: Lightweight toast notifications

## Project Structure

- `src/app`: Next.js app router pages and layouts
- `src/components`: Reusable React components
- `src/lib`: Utility functions and API calls
- `src/store`: Zustand store for global state management
- `src/types`: TypeScript type definitions
- `public`: Static assets

## Development Practices

### Code Comments

Critical parts of the codebase are commented to explain complex logic, important decisions, and any non-obvious implementations. This practice ensures better maintainability and easier onboarding for team members.

### Branching Strategy

- `main`: The production-ready branch
- `develop`: The primary branch for integrating features and fixes
- Feature branches: Created for each new feature or significant change

All develop work is done in feature branches, which I then merged into the `develop` branch. Once tested and verified, the `develop` branch is merged into `main` for production deployment.

### Deployment

The project is set up for continuous deployment on Vercel. The `develop` branch is automatically deployed to a staging environment, while the `main` branch deploys to production.

## Additional Technical Notes

KEY_NOTE: Due to the fact that Framer-motion relies a lot on browser APIs, most I tagged most components as client components with "use client" directive. I did however, ensure that data fetching is handled server-side.

- **API Integration**: The project uses the Fake Store API for product data. API calls are abstracted in the `src/lib/api` directory for better organization and potential future API changes.

- **State Management**: Zustand is used for global state management, particularly for the shopping cart functionality. The store is defined in `src/store/useCartStore.ts`.

- **Styling**: Tailwind CSS is used for styling, with custom theme configuration in `tailwind.config.js`. The Shadcn UI library provides pre-styled components that are customized to fit the project's design.

- **Animations**: Framer Motion is used for smooth animations and transitions, enhancing the user experience without compromising performance.

- **Accessibility**: The project strives to meet WCAG 2.1 AA standards. This includes proper heading structure, ARIA attributes, and keyboard navigation support.

- **Performance Optimization**: Next.js Image component is used for automatic image optimization. Code splitting and lazy loading are implemented for larger components to improve initial load times.

## Areas for Future Improvement

- Implement unit and integration tests using Jest and React Testing Library -- ✔
- Add more advanced filtering and sorting options for products
- Implement a mock checkout process -- ✔
- Enhance animations and transitions for a more polished user experience
- Implement server-side pagination for product listings

## Contributing

This project is part of a technical challenge and is not open for contributions. However, feedback and suggestions are always welcome!

## License

This project is open-source and available under the MIT License.

