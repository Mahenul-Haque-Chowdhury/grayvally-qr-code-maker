# GrayVally QR Code Generator

A production-ready QR Code Generator for GrayVally Software Solutions. Build branded, high-quality QR codes with advanced styling, export options, and local history — all on-device with no tracking.

## Features
- QR content types: Text/URL, WiFi, Email, Phone, SMS, vCard
- Advanced customization: size, margin, error correction, colors, gradients, rounded modules
- Logo support with optional white padding for scan reliability
- Exports: PNG (1x/2x/3x), SVG, PDF
- History (last 20), favorites, and templates
- Shareable links with optional sensitive data inclusion
- Keyboard accessible, responsive, and localStorage-only

## Library decisions
- **qr-code-styling**: chosen over `qrcode` to support rounded modules, gradients, and logo embedding with higher visual control.
- **pdf-lib**: lightweight browser PDF generation for exports.

## Scripts
- `npm run dev` - start dev server
- `npm run build` - build production bundle
- `npm run start` - run production server
- `npm run lint` - lint
- `npm run format` - format
- `npm run test` - run tests once
- `npm run test:watch` - watch tests

## Deployment
This is a standard Next.js App Router project. Deploy on Vercel, Netlify, or any Node.js host:
- `npm install`
- `npm run build`
- `npm run start`

## Privacy
All data stays in the browser. No tracking or server-side storage.
