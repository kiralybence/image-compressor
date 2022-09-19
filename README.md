# Image Compressor

A simple image compressor API.

## How to use

Just serve the API with `node index.js` and use the `/api/compress` endpoint.

**Important:** If you want to use the HTML form to submit images, you must use the `/` page served by Node.js at `localhost:3000`, instead of opening the HTML file directly (because otherwise the form would submit to Port 80).
