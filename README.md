# HHGoa2026 Vercel OG Share App

This keeps the existing single-file BuilderPass app as `index.html` and adds one Vercel serverless endpoint at `api/share.js`.

## What changed

Builder ID and Frame Share-to-X now send X a URL on your own domain:

- `/api/share?image=<ImgBB-direct-image-url>&kind=builder`
- `/api/share?image=<ImgBB-direct-image-url>&kind=frame`

The endpoint returns server-rendered HTML containing `og:image` and Twitter card metadata. The ImgBB direct image remains the actual image host.

## Deploy

Upload this folder as a Vercel project, or connect it to a Git repository and deploy it. No build command or package installation is required.

After deployment, the app uses `location.origin`, so the share URL automatically uses the deployed domain.
