# Pixa Grid

Virtualized Masonry Photo Gallery

This project is a responsive, virtualized masonry photo gallery that dynamically fetches images from the Pexels API. The grid layout adjusts based on screen size and only renders visible photos, improving performance by minimizing DOM usage. The app is built using Vite-React and TypeScript without external libraries for layout or virtualization, showcasing a custom-built, efficient solution for large sets of images.

## Features

- Virtualized Masonry Layout: A responsive masonry grid that only renders images currently visible in the viewport.
- Infinite Scroll: Seamlessly fetch additional images as the user scrolls.
- Responsive Design: The grid adjusts dynamically to various screen sizes.
- Custom-Built Virtualization: No external libraries for virtualization or layout management, resulting in a lightweight, performant solution.

## Deployed Version

The live version of this application is deployed and accessible at https://pixa-grid.vercel.app.

**Live Demo**

Visit the deployed application to experience the following:

- Responsive Masonry Layout: Test the adaptive grid as you resize the window, where the number of columns adjusts based on screen size.
- Infinite Scrolling: Scroll down to see additional images loaded automatically from the Pexels API.
- Efficient Virtualization: Only images within or near the viewport are loaded, making it highly performant even with large datasets.
- Single Photo Page: View each image in detail, displaying metadata and a larger version of the photo when clicked.

Note: Make sure you’re connected to the internet as the app fetches images from the Pexels API in real time.

## Getting Started

**Prerequisites**

- Node.js and npm installed on your machine.

**Installation**

1. Clone the repository:

```
git clone https://github.com/ebokhyan/pixa-grid.git
cd pixa-grid
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the root directory and add your Pexels API key:

```
VITE_PIXELS_ACCESS_TOKEN="your_api_key_here"
```

4. Run the development server:

```
npm run dev
```

The application will start on http://localhost:3000.

## Performance

This project implements multiple performance optimizations to ensure smooth scrolling, reduce loading times, and minimize memory usage.

**Code Splitting and Lazy Loading**

- Dynamic Imports: Certain components and routes are loaded dynamically to reduce the initial load time. This way, only essential code is loaded immediately, while less-used components (like the single photo page) are fetched when needed.
- React’s lazy and Suspense: Used to lazy-load components that are not immediately required, allowing the app to load faster and reduce the JavaScript bundle size.

**Virtualized Loading**

- Intersection Observer: The Image component uses the Intersection Observer API to load images only when they enter the viewport. This prevents the browser from rendering all images in memory, improving performance for large galleries.
- Buffered Loading: The virtualized grid renders a few rows above and below the viewport to provide smooth scrolling without loading the entire dataset, ensuring that only the relevant portion of the list is rendered.

**Aspect Ratio Detection to Prevent CLS**

- Image Aspect Ratios: Each image is loaded with a pre-calculated aspect ratio based on its width and height metadata from the Pexels API. This approach reserves space in the grid layout before the image loads, reducing Cumulative Layout Shift (CLS) and improving layout stability.
- Placeholder Space: By setting the aspect ratio, skeleton is being loaded, the app maintains the intended layout even if images load at different times, ensuring a consistent visual experience for users.

**Throttling Network Requests**

- Throttle Logic for Fetching: To prevent excessive API calls during scroll events or rapid user interactions, the useListPhotos and useGetPhoto hooks implements throttling on page fetches. This ensures that the app doesn’t overload the network with requests, improving both performance and API rate limit management.

## Configuration

- Pexels API Key: Obtain an API key from the [Pexels Developer](https://www.pexels.com/api/documentation/) API and add it to the .env file.

## Project structure

```
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   ├── favicon.png
│   ├── placeholder.webp
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── components
│   ├── core
│   ├── hooks
│   ├── main.tsx
│   ├── pages
│   ├── routes
│   ├── types
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```
