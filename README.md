# Korean Hangul Practice App

A React-based application for learning and practicing Korean Hangul characters, originally built with base44.com and now configured to run locally.

## Features

- Learn Korean consonants (자음)
- Learn Korean vowels (모음)
- Practice double consonants (쌍자음)
- Practice complex vowels (복합모음)
- Interactive character drawing practice
- Audio pronunciation
- Progress tracking

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository (if you haven't already):
```bash
git clone <your-repo-url>
cd bap
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

To start the development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs tests
- `npm eject` - Ejects from Create React App (use with caution)

## Project Structure

```
bap/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # UI component library (shadcn/ui)
│   │   └── hangul/     # Hangul-specific components
│   ├── pages/          # Page components
│   │   ├── home.js     # Home page with category selection
│   │   └── practice.js # Character practice page
│   ├── lib/            # Utility functions
│   ├── App.js          # Main app component
│   ├── index.js        # Entry point
│   └── index.css       # Global styles
├── tailwind.config.js  # Tailwind CSS configuration
├── jsconfig.json       # JavaScript configuration
└── package.json        # Project dependencies
```

## Technologies Used

- React 18
- React Router v6
- Tailwind CSS
- Framer Motion (animations)
- Radix UI (component primitives)
- Lucide React (icons)
- shadcn/ui components

## Development Notes

This project was migrated from base44.com to run locally. The following setup was done:

1. Created `package.json` with all necessary dependencies
2. Configured React Scripts for local development
3. Set up Tailwind CSS with PostCSS
4. Configured path aliases with `jsconfig.json`
5. Organized files into standard React project structure

## Troubleshooting

If you encounter issues:

1. **Dependencies not installing**: Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
2. **Port already in use**: Kill the process on port 3000 or set a different port: `PORT=3001 npm start`
3. **Module not found errors**: Ensure all files are in the correct location within the `src/` directory

## License

[Your License Here]
