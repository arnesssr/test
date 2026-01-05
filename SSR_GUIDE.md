# Server-Side Rendering (SSR) Guide

This application now supports Server-Side Rendering (SSR) for improved SEO and performance.

## What Changed

### New Files
- **src/entry-server.tsx** - Server entry point that renders the app to a string
- **server.ts** - Express server that handles SSR in both development and production

### Modified Files
- **src/main.tsx** - Changed from `createRoot` to `hydrateRoot` for client-side hydration
- **src/App.tsx** - Removed `BrowserRouter` (now handled in main.tsx for client)
- **index.html** - Added `<!--ssr-outlet-->` marker for server-rendered content
- **package.json** - Added SSR-related scripts
- **vite.config.ts** - Added SSR configuration
- **tsconfig.node.json** - Included server.ts for TypeScript compilation

## Available Scripts

### Development (with SSR)
```bash
npm run dev:ssr
```
Runs the app in development mode with SSR. The server will be available at `http://localhost:3000`.

### Development (without SSR)
```bash
npm run dev
```
Runs the app in traditional client-side mode. Useful for faster development when SSR is not needed.

### Production Build (with SSR)
```bash
npm run build:ssr
```
Builds both client and server bundles:
- Client bundle → `dist/client/`
- Server bundle → `dist/server/`

### Production Preview (with SSR)
```bash
npm run preview:ssr
```
Runs the production build with SSR at `http://localhost:3000`.

### Legacy Build (without SSR)
```bash
npm run build
```
Builds client-side only version to `dist/`.

## Architecture

### How It Works

1. **Server-Side Rendering**:
   - Express server receives a request
   - Vite (dev) or pre-built bundle (prod) renders the React app to a string
   - HTML is sent to the client with initial content

2. **Client-Side Hydration**:
   - Browser receives HTML with rendered content
   - React takes over and attaches event listeners (hydration)
   - App becomes interactive

### Development Mode
- Uses Vite's middleware mode
- Hot module replacement (HMR) works
- Fresh template on each request

### Production Mode
- Serves pre-built static files
- No build-time overhead per request
- Optimized for performance

## Key Differences from CSR

### Client-Side Rendering (CSR)
```bash
npm run dev
```
- Initial HTML is empty shell
- JavaScript loads and renders content
- Better for pure SPA experiences
- Slower initial page load

### Server-Side Rendering (SSR)
```bash
npm run dev:ssr
```
- Initial HTML contains rendered content
- Faster perceived page load
- Better SEO (search engines can read content)
- Better for public-facing pages

## SEO Benefits

SSR provides significant SEO improvements:
- Search engines can crawl the full page content
- Page title and metadata are rendered on the server
- Social media previews work better
- Core Web Vitals improvement (LCP, FID)

## Considerations

### When to Use SSR
- Public-facing pages (home, product listings)
- E-commerce sites (better SEO)
- Content-heavy applications
- When first paint time matters

### When to Use CSR
- Admin dashboards (behind authentication)
- Internal tools
- Apps with heavy client-side interactivity
- When development simplicity is priority

## Troubleshooting

### "document is not defined" Error
If you get this error, it means you're trying to use browser-only APIs in server code:
```typescript
// ❌ Wrong - runs on server
useEffect(() => { /* ... */ });

// ✅ Correct - runs only on client
if (typeof window !== 'undefined') {
  useEffect(() => { /* ... */ });
}
```

### Hydration Mismatch
If you see hydration warnings, ensure server and client render the same markup:
- Check for conditional rendering based on `window`
- Ensure consistent data between server and client
- Avoid rendering random values or timestamps

### Performance Issues
If SSR is slow:
- Check for heavy computations in render
- Consider caching strategies
- Use lazy loading for non-critical components
- Profile the server bundle

## Notes

- The app supports both SSR and CSR modes
- Use SSR for production to get SEO benefits
- Use CSR for development when faster iteration is needed
- Both modes share the same codebase
- Switching between modes doesn't require code changes
