# Xile Studios

Plain HTML, CSS, and JavaScript multipage website for Xile Studios.

## Pages
- Home
- About
- Services
- Recent Work
- Contact

## Setup Notes
1. Add your real logo files:
   - `assets/images/logo/logo.png`
   - `assets/images/logo/favicon.ico`

2. Replace work placeholder images:
   - `assets/images/work/project-01.jpg`
   - through
   - `assets/images/work/project-06.jpg`

3. Configure Netlify environment variables:
   - `RESEND_API_KEY`
   - `XILE_INBOX_EMAIL`
   - `XILE_FROM_EMAIL`

4. Update `data/projects.js` with real project titles, descriptions, images, and URLs.

## Contact Form Endpoint
The frontend submits to:

`/.netlify/functions/send-inquiry`

## Notes
- Built without React or frameworks
- Mobile-first and lightweight
- Premium dark design with purple accents
