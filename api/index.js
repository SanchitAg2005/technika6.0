import server from "../dist/server/server.js";

export default async function handler(req, res) {
  // 1. Construct the absolute URL from incoming request headers
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const url = new URL(req.url, `${protocol}://${host}`);

  // 2. Read the request body stream for non-GET/HEAD requests
  let body = null;
  if (req.method !== "GET" && req.method !== "HEAD") {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    body = Buffer.concat(buffers);
  }

  // 3. Construct a standard Web Request object
  const request = new Request(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: body,
  });

  try {
    // 4. Process the request via our compiled TanStack Start server
    const response = await server.fetch(request, null, null);

    // 5. Transfer response status and headers back to the Node.js ServerResponse
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // 6. Read response body as buffer and return it
    const responseBody = await response.arrayBuffer();
    res.end(Buffer.from(responseBody));
  } catch (error) {
    console.error("Vercel Serverless Function Error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
