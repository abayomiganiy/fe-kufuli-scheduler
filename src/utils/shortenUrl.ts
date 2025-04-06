export default function replaceUrlsWithShortened(text: string): string {
    const urlRegex = /https?:\/\/[^\s]+/g;

    return text.replace(urlRegex, (match) => shortenUrl(match));
}
function shortenUrl(url: string): string {
    try {
        // Add protocol if missing to prevent URL constructor errors
        const urlWithProtocol = url.match(/^https?:\/\//)
            ? url
            : `https://${url}`;
        const parsedUrl = new URL(urlWithProtocol);

        // Remove 'www.' if present
        const hostname = parsedUrl.hostname.replace(/^www\./, "");

        // Handle subdomains more intelligently
        const domainParts = hostname.split(".");
        const shortHostname =
            domainParts.length > 2 &&
            domainParts[0] !== "blog" &&
            domainParts[0] !== "shop" &&
            domainParts[0] !== "support"
                ? domainParts
                      .slice(Math.max(0, domainParts.length - 2))
                      .join(".")
                : hostname;

        // Keep meaningful path segments (up to first 2 non-empty segments)
        const pathSegments = parsedUrl.pathname
            .split("/")
            .filter((segment) => segment.length > 0);
        let pathPart = "";

        if (pathSegments.length > 0) {
            // Filter out common non-descriptive paths
            const meaningfulSegments = pathSegments.filter(
                (segment) =>
                    ![
                        "api",
                        "static",
                        "assets",
                        "images",
                        "js",
                        "css",
                        "v1",
                        "v2",
                    ].includes(segment.toLowerCase())
            );

            // Take up to 2 meaningful segments
            pathPart = meaningfulSegments.slice(0, 2).join("/");
            if (pathPart) {
                pathPart = `/${pathPart}`;
            }
        }

        // Add a single important query parameter if present (like 'id' or 'product')
        const importantParams = ["id", "product", "p", "item", "article"];
        let queryPart = "";

        for (const param of importantParams) {
            if (parsedUrl.searchParams.has(param)) {
                queryPart = `?${param}=${parsedUrl.searchParams.get(param)}`;
                break;
            }
        }

        // Construct the shortened URL
        const shortUrl = `${parsedUrl.protocol}//${shortHostname}${pathPart}${queryPart}`;

        // Ensure the shortened URL is actually shorter
        return shortUrl.length < url.length ? shortUrl : url;
    } catch (error) {
        console.error("Error shortening URL:", error);
        return url; // Return the original URL if any error occurs
    }
}
