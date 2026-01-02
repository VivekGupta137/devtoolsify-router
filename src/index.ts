export default {
  async fetch(
    request: Request,
    env: unknown,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    const host = url.hostname;

    // Only handle devtoolsify.com subdomains
    if (host.endsWith(".devtoolsify.com")) {
      const subdomain = host.replace(".devtoolsify.com", "");

      if (subdomain && subdomain !== "www") {
        // Map homepage "/" to subdomain path
        const targetPath = url.pathname === "/" ? `/${subdomain}/` : url.pathname;
        const targetUrl = `https://devtoolsify.com${targetPath}`;
        return fetch(targetUrl, request);
      }
    }
    
    // Default pass-through
    return fetch(request);
  }
};
