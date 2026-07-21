# Security

Gel Profile Studio is a static, local-first browser application. Gel images are processed in the browser; the application does not provide a server-side upload endpoint.

Project JSON can embed the source image as a data URL. Treat exported project files as scientific data and store or share them according to the sensitivity of the original gel image and metadata.

Do not attach unpublished, confidential, patient-identifiable, proprietary, or otherwise sensitive scientific data to public GitHub issues.

For a security vulnerability, use GitHub's **Report a vulnerability** / private security advisory feature for the repository rather than opening a public issue.

TIFF decoding is loaded on demand from the pinned jsDelivr URL for `utif@3.1.0`. Users operating in restricted or high-assurance environments should review or vendor third-party network dependencies before deployment.
