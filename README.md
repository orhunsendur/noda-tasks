# Daily Task Distribution Web Application

A web application that calculates and distributes tasks based on NODA withdrawal times for different brands (BF, CZ, YB).

## Features

- Input form for entering NODA withdrawal times for each brand (BF, CZ, YB)
- Automatic task distribution based on the following logic:
  - Other Methods BF/CZ/YB
  - NODA older than 2 days (sorted by priority)
  - Escalations
  - Payfraud
  - Fraud Tickets
  - GA Tickets
  - NODA that is up to date
- Visual representation of tasks with priority indicators
- Color-coded task categories for better visibility

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installing Node.js and npm

If you don't have Node.js and npm installed:

1. Download Node.js from the [official website](https://nodejs.org/)
2. Follow the installation instructions for your operating system
3. Verify installation with:
   ```bash
   node --version
   npm --version
   ```

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd daily-task-web
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages:

### Setting Up GitHub Repository

1. Create a new GitHub repository
2. Push your code to the repository
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

### Configuring GitHub Pages

1. In your GitHub repository, go to Settings > Pages
2. Under "Build and deployment", select the source as "GitHub Actions"
3. The workflow will automatically deploy your site when you push to the main branch

### Customizing for Your Repository

If your repository name isn't at the root domain:

1. Open `next.config.js`
2. Uncomment and update the `basePath` and `assetPrefix` with your repository name
   ```js
   basePath: '/your-repo-name',
   assetPrefix: '/your-repo-name',
   ```

### Manual Deployment

If you prefer to deploy manually:

```bash
npm run build
# The static site will be generated in the 'out' directory
# You can then deploy this directory to GitHub Pages
```

## Usage

1. Enter the NODA withdrawal times for each brand (BF, CZ, YB) using the date-time pickers
2. Click "Generate Task Distribution" to see the prioritized task list
3. Tasks are automatically ordered according to the priority rules
4. Tasks older than 2 days will be highlighted and given higher priority

## Technology Stack

- Next.js 13+
- React 18
- TypeScript
- TailwindCSS for styling
- date-fns for date manipulation

## Project Structure

- `/app`: Next.js app directory structure
- `/app/components`: React components
- `/app/utils`: Utility functions including task distribution logic
- `/public`: Static assets

## License

This project is licensed under the MIT License. 