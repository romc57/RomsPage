# Rom's Professional Portfolio

A modern, responsive portfolio website showcasing professional experience, skills, and projects.

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive layout
- ⚡ Fast loading and optimized
- 🎯 SEO-friendly structure
- 🎭 Smooth animations and transitions
- 📧 Contact form functionality
- 🌙 Theme toggle (light/dark mode)
- 📊 Animated statistics counters
- 🔗 Social media integration

## Sections

1. **Hero** - Introduction and call-to-action
2. **About** - Personal information and statistics
3. **Experience** - Professional timeline
4. **Projects** - Featured work showcase
5. **Skills** - Technical proficiencies
6. **Contact** - Contact form and information

## Customization

### Personal Information
Edit the following in `index.html`:
- Name and title in the hero section
- About me description
- Contact information (email, phone, location)
- Social media links

### Experience
Update the timeline section with your actual work experience:
- Job titles and companies
- Employment dates
- Achievements and responsibilities

### Projects
Replace the placeholder projects with your actual work:
- Project names and descriptions
- Technologies used
- Live demo and GitHub links
- Project images

### Skills
Modify the skills section to reflect your expertise:
- Frontend technologies
- Backend frameworks
- Databases and tools
- Other relevant skills

## Deployment Options

### 1. GitHub Pages (Recommended - Free)

1. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

3. **Your site will be available at:**
   `https://yourusername.github.io/your-portfolio`

### 2. Netlify (Free)

1. **Drag and drop deployment:**
   - Go to [netlify.com](https://netlify.com)
   - Drag your project folder to the deploy area
   - Get instant deployment with custom domain options

2. **Git-based deployment:**
   - Connect your GitHub repository
   - Automatic deployments on every push
   - Custom domain and SSL included

### 3. Vercel (Free)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts for instant deployment**

### 4. Firebase Hosting (Free)

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize and deploy:**
   ```bash
   firebase login
   firebase init hosting
   firebase deploy
   ```

## Custom Domain Setup

After deployment, you can add a custom domain:

1. **Purchase a domain** from providers like:
   - Namecheap
   - GoDaddy
   - Google Domains

2. **Configure DNS settings:**
   - Point your domain to your hosting provider
   - Add CNAME records as required

3. **Enable HTTPS** (usually automatic with modern hosting)

## Performance Optimization

The portfolio is already optimized with:
- Efficient CSS and JavaScript
- Optimized images and fonts
- Minimal external dependencies
- Fast loading animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Local Development

To run locally:
1. Clone the repository
2. Open `index.html` in a web browser
3. Or use a local server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

## Customization Tips

### Colors
The main color scheme uses:
- Primary: `#2563eb` (blue)
- Secondary: `#fbbf24` (yellow)
- Text: `#1f2937` (dark gray)
- Background: `#ffffff` (white)

### Fonts
Currently using Inter font from Google Fonts. You can change this in the HTML head section.

### Images
Replace the placeholder icons with actual images:
- Profile photo in hero section
- Project screenshots
- Company logos

## Contact Form Integration

The contact form currently shows an alert. For production, integrate with:
- [Formspree](https://formspree.io/) - Easy form handling
- [Netlify Forms](https://www.netlify.com/products/forms/) - If using Netlify
- [EmailJS](https://www.emailjs.com/) - Client-side email sending
- Custom backend with Node.js/PHP

## SEO Optimization

Add these to improve SEO:
- Meta descriptions
- Open Graph tags
- Structured data
- Sitemap.xml
- Analytics tracking

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you need help customizing or deploying your portfolio, feel free to reach out!

---

**Happy coding!** 🚀
