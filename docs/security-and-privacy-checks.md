# Security and privacy: what the course does, and how to check it yourself

**Last checked:** 2026-10-05. Written for schools, districts and organisations that
want to verify the course's privacy and security claims, not take them on trust.
The site's source is public, so every check below can be repeated by anyone.

## What the site does

- **It's a folder of static files.** No server code, accounts, database, forms
  that send data, cookies or analytics.
- **It makes no third-party requests.** Fonts and the claims engine
  (`vendor/attestation-ledger@<version>`) are hosted with the site. A test in
  `tests/governance.test.js` fails if any page loads a script, style or module from
  another site.
- **A strict Content Security Policy** sits in a `<meta>` tag at the top of every
  page (GitHub Pages can't send security headers). It allows scripts only from the
  site itself, plus the few inline scripts listed by SHA-256 hash; no network
  requests (`connect-src 'none'`); no form submissions (`form-action 'none'`); no
  plugins and no `<base>` rewriting. `npm run csp` rebuilds it, and a test fails if a
  page's policy doesn't match the code.
- **No referrer is sent** when a learner follows a link to a source
  (`<meta name="referrer" content="no-referrer">`).
- **The mock screens in Lessons 6–8** run in sandboxed frames without
  `allow-same-origin`, so their scripts can't touch the page, its storage or any
  other site, and they inherit the policy above.
- **All text is escaped** before it reaches the page, including what a learner types
  into the search box (tested).
- **Two values are stored**, in the learner's own browser only: the theme
  (`ai-literacy-theme`) and the audience track (`ai-literacy-track`). Both are
  checked against a short list of allowed values before use.
- **The host logs IP addresses.** GitHub, which hosts the site on GitHub Pages,
  logs visitors' IP addresses for security, as its documentation states. The
  footer says so. To avoid that, host the site yourself (below).

## Check it in five minutes, in any browser

1. **Network.** Open the browser's developer tools (F12), go to *Network*, and
   reload. Every request should be to the course's own address. Expect one 404:
   the browser asking for a tab icon (`favicon.ico`), which the site doesn't have.
2. **Storage.** In *Application* (Chrome) or *Storage* (Firefox), look under
   *Cookies* (expect none) and *Local storage* (expect the two keys above, at most).
3. **Policy.** View the page source: the first tag after `<meta charset>` is the
   Content Security Policy.
4. **Console.** Use the lesson's tools (search, reveal buttons, builders, the
   contrast checker). The console should show no "Refused to…" messages.

## Free tools that check it independently

| Tool | What it checks | What to expect |
|---|---|---|
| [Blacklight](https://themarkup.org/blacklight) (The Markup) | Trackers, third-party cookies, fingerprinting, session recording | Nothing found |
| [CSP Evaluator](https://csp-evaluator.withgoogle.com/) (Google) | How strong the policy is: paste it from the page source | `style-src 'unsafe-inline'` flagged (see accepted risks) |
| [HTTP Observatory](https://developer.mozilla.org/en-US/observatory) (Mozilla) | Security headers and HTTPS | A low grade: it reads HTTP headers, which GitHub Pages can't set. The policies live in the pages instead. Self-hosting fixes the grade. |
| [SSL Labs](https://www.ssllabs.com/ssltest/) (Qualys) | The HTTPS setup of `github.io` | GitHub's own configuration |
| Lighthouse (built into Chrome's developer tools) | Best practices, accessibility | Best practices and accessibility should pass |

## Check the code

```bash
git clone https://github.com/davidpetry-cloud/ai-literacy-module.git
cd ai-literacy-module
npm ci
npm test
npm audit
```

- `npm test` runs about 1,700 checks, including no third-party requests, the
  Content Security Policy, escaping, and the safety rules for the students track.
- `npm audit` covers the tools used to build and test the course. None of them are
  sent to visitors.
- The hosted claims engine is byte for byte the published package; a test compares
  it with the installed copy.

## Host it yourself, for full control

The course is static files, so any web server can host it, with no GitHub involved.
That removes the host's IP logging (your own server's logs are then yours to set)
and lets you send real security headers. A suggested set:

```
Content-Security-Policy: <the policy from any page's meta tag>; frame-ancestors 'none'
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
Cross-Origin-Opener-Policy: same-origin
```

`frame-ancestors` (which stops other sites embedding the course) only works as a
header, never in a `<meta>` tag.

## Accepted risks, and why

| Risk | Why it is accepted | How to remove it |
|---|---|---|
| `style-src 'unsafe-inline'` | The mock screens in Lessons 6–8 use inline styles, as real AI-built screens do. All text is escaped, so it can't be used to inject markup. | Move the mock screens' styles into hashed `<style>` blocks. |
| No `frame-ancestors` | Can't be set in a `<meta>` tag. The site has no sign-in or actions worth tricking someone into, so clickjacking gains nothing. | Send it as a header when self-hosting. |
| GitHub logs IP addresses | Standard for any host, and stated in the footer. | Self-host. |
| `Access-Control-Allow-Origin: *` from GitHub | Everything on the site is public. | Self-host. |

## For data protection officers

- **Personal data the course processes:** none. The host's server logs (IP address,
  time, page) are processed by GitHub under its privacy statement.
- **Children:** see `docs/student-safety.md` for the protocol and the law by country.
  A DPIA screening for school use will usually find low risk, because no personal
  data is collected; record that finding under your own policy.

## What the course's author does

| Setting | Status (2026-10-05) |
|---|---|
| HTTPS enforced on GitHub Pages | On |
| Secret scanning and push protection | On |
| Dependabot alerts | On (2026-10-05) |
| Branch protection on `main` (no force-push or deletion, for admins too) | On (2026-10-05) |
| Two-factor sign-in on the author's account | The author confirms this |
| Private vulnerability reporting | On (2026-10-05); see `SECURITY.md` |
