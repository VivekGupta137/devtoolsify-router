export default {
  async fetch(
    request: Request,
    env: unknown,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    const host = url.hostname;

    // Handle only subdomains of devtoolsify.com
    if (host.endsWith(".devtoolsify.com")) {
      const subdomain = host.replace(".devtoolsify.com", "");

      // Ignore main domain & www
      if (subdomain && subdomain !== "www") {
        // Rewrite ONLY the homepage
        if (url.pathname === "/") {
          url.pathname = `/${subdomain}`;
          return fetch(url.toString(), request);
        }
      }
    }

    // Default pass-through
    return fetch(request);
  }
};
