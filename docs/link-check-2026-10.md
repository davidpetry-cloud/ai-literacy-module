# Link check, October 2026

**Checked:** 20 October 2026, by a model. Every outside address the site shows was
tested: the 107 source links in `sources.js`, the links in the lessons, the hub
and the pages, and the README. That's 113 unique addresses.

**Result:** every source still exists. Four links had moved and are now fixed. One
site was down on the day, so it needs a second look.

## How it was checked

1. **DOIs (38):** each one was looked up on doi.org's own handle service, which says
   whether the DOI is registered and where it points. Publishers' sites refuse
   scripts, so asking doi.org is the reliable test. All 38 resolve. The DOIs'
   details were checked against Crossref when the sources were added.
2. **Everything else (75):** each address was fetched with a browser-like request,
   following redirects. 54 loaded at once.
3. **The other 21** answered the script with an error (403, 404, 202, 522 or no
   reply). Each was opened in a real browser. 20 of them loaded: those sites only
   block scripts (two of the 20 had moved; see below). One site was down. Bot checks were never clicked through; the two FBI pages that
   showed a "Just a moment" check cleared it on their own within a few seconds.

## Fixed

| Source | Was | Now | Why |
|---|---|---|---|
| FBI, *Sextortion* (Lesson 12) | `fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/sextortion` | `fbi.gov/how-we-can-help-you/common-frauds-and-scams/sextortion` | The FBI dropped `/scams-and-safety/` from its addresses. The old link redirects for now. |
| FBI, *Financially motivated sextortion* (Lesson 12) | the same path, `…/sextortion/financially-motivated-sextortion` | `fbi.gov/how-we-can-help-you/common-frauds-and-scams/sextortion/financially-motivated-sextortion` | Same move. |
| Home Office (2023), *Controlling or coercive behaviour statutory guidance framework* (Lesson 10) | a PDF file address on `assets.publishing.service.gov.uk` | the guidance's GOV.UK page, `gov.uk/government/publications/controlling-or-coercive-behaviour-statutory-guidance-framework` | GOV.UK re-uploaded the PDF on 2 September 2026, so the file address changed. It's the same edition, dated 5 April 2023, so the citation is unchanged. The publication page keeps its address when files are replaced, and it links the current PDF, the Welsh version and an easy-read version. |
| Brignull, *Deceptive patterns* (Lesson 7) | `www.deceptive.design` | `deceptive.design` | The site redirects to its address without `www`. |

The same links in `docs/attestation-queue.md` were updated too.

## Still to check

- **Stop Scams UK, *159 phone number*** (`stopscamsuk.org.uk/159`, Essentials 1, claim
  `uk-159`). On 20 October the whole site was down: Cloudflare reported that the
  site's own server wasn't answering (error 522), at every address tried. That's an
  outage, not a moved page. An earlier, unfinished pass in October 2026 found the page at
  `/our-programmes/159-phone-number/`. Open both addresses once the site is back,
  and if `/159` doesn't reach the page, change the link in `sources.js`.

## Sites that block scripts but work in a browser

Worth knowing for the next check, so these aren't mistaken for broken links:

| Site | Answers scripts with | In a browser |
|---|---|---|
| consumer.ftc.gov, ftc.gov | 404 | All 7 pages load |
| fcc.gov (the consumer guide) | 403 | Loads (docs.fcc.gov PDFs work for scripts too) |
| fbi.gov | 403 | Loads, sometimes after a short automatic check |
| leginfo.legislature.ca.gov | 403 | Loads |
| eur-lex.europa.eu | 202 (a holding page) | All 3 regulations load |
| ohchr.org, w3.org, npmjs.com | 403 | Load |
| esafety.gov.au | no reply in 40 seconds | Loads |

ic3.gov, cisa.gov, docs.fcc.gov and files.consumerfinance.gov answer scripts
normally.

## Next check

Check again by April 2027, or before any lesson is shared widely. Agency pages about
scams and AI move most often. The FTC, the FBI and GOV.UK file addresses all changed
or redirected within a year.
