# LUMA - Interactive Digital Zine Gallery
## �� How to Use

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm (comes with Node.js)
- Git (for version control)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/LUMA.git
   cd LUMA
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install all required packages including:
   - React 18
   - Framer Motion for animations
   - Three.js for 3D effects
   - React Router for navigation
   - Tailwind CSS for styling
   - TypeScript for type safety

3. **Development Server**
   ```bash
   npm run dev
   ```
   This starts the Vite development server at `http://localhost:5173`

4. **Building for Production**
   ```bash
   npm run build
   ```
   Creates an optimized production build in the `dist` directory

5. **Preview Production Build**
   ```bash
   npm run preview
   ```
   Locally preview the production build

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

### Project Structure
LUMA/
├── src/
│ ├── components/
│ │ ├── Gallery/ # Main gallery component
│ │ │ ├── genres/ # Individual zine components
│ │ │ │ ├── NatureZine/
│ │ │ │ ├── CosmosZine/
│ │ │ │ ├── OceanZine/
│ │ │ │ ├── FantasyZine/
│ │ │ │ └── HorrorZine/
│ │ │ └── index.tsx # Gallery entry point
│ │ └── ui/ # Reusable UI components
│ ├── contexts/ # React context providers
│ ├── utils/ # Utility functions
│ └── routes/ # Route definitions
├── public/ # Static assets
├── index.html # Entry HTML file
├── vite.config.ts # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
└── package.json # Project dependencies and scripts


### Development Guidelines

1. **Adding a New Zine**
   - Create a new directory in `src/components/Gallery/genres/`
   - Follow the existing zine component structure
   - Add your zine to `genreData` in `src/utils/genreData.ts`

2. **Styling**
   - Use Tailwind CSS for general styling
   - Create component-specific styles using CSS Modules
   - Follow the existing color scheme and design patterns

3. **Animations**
   - Use Framer Motion for animations
   - Keep animations performant and accessible
   - Consider reduced motion preferences

4. **TypeScript**
   - Maintain type safety
   - Define interfaces for props and state
   - Use proper type annotations

### Performance Optimization

1. **Image Optimization**
   - Use appropriate image formats (WebP when possible)
   - Implement lazy loading for images
   - Optimize image sizes for different devices

2. **Code Splitting**
   - Zines are automatically code-split
   - Use dynamic imports for heavy components
   - Implement proper loading states

3. **Animation Performance**
   - Use `will-change` sparingly
   - Implement proper cleanup for animations
   - Consider using CSS transforms for better performance

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

### Troubleshooting

1. **Development Server Issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules
   npm install
   ```

2. **Build Errors**
   - Check TypeScript errors: `npm run lint`
   - Ensure all dependencies are installed
   - Verify Node.js version compatibility

3. **Common Issues**
   - If animations are not smooth, check for proper cleanup in useEffect
   - For styling issues, verify Tailwind classes and CSS Module imports
   - For routing problems, check React Router configuration

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Images from Unsplash and Pinterest
- Fonts from Google Fonts
- Icons and additional resources from various open-source projects
