---
type: Infrastructure Spec
title: Email Authentication (SPF / DKIM / DMARC)
description: DNS email-authentication records for adanacalpine.ca — SPF, DKIM, and DMARC as configured and verified, plus the decision to keep DNS hosted at Porkbun.
Module: Infrastructure
Business_Case_Stage: Complete
Dependencies: [context-project-overview]
Test_Suite: []
Status: Final (Sep 2026)
resource: https://adanacalpine.ca
tags: [dns, email, spf, dkim, dmarc, security]
timestamp: "2026-09-21T00:00:00Z"
---

# Email Authentication (SPF / DKIM / DMARC)

## Executive Summary

adanacalpine.ca sends and receives mail through Google Workspace (MX `smtp.google.com`). To stop corporate email from being flagged as spam and to prevent spoofing, the domain now publishes SPF, DKIM, and DMARC records. All three are configured in Porkbun DNS, verified live against Porkbun's authoritative nameservers, and DMARC is in monitoring (`p=none`) mode.

## Core Objectives

- Prove to receiving mail servers that Google Workspace is the only authorized sender for the domain.
- Digitally sign outbound mail so it cannot be impersonated.
- Publish a DMARC policy that tells receivers how to handle mail that fails SPF/DKIM, starting with reporting-only.
- Preserve existing email service (Google Workspace) and website (Vercel) with zero downtime.

## Decisions

### DNS stays hosted at Porkbun (Vercel nameservers NOT adopted)

Vercel emailed requesting the domain's nameservers be moved to `ns1/ns2.vercel-dns.com`. This was **declined**. Rationale:

| Option | Result |
|---|---|
| Keep nameservers at Porkbun (current) | Email MX + verification TXT untouched, zero risk, one project on Vercel managed via external DNS |
| Move nameservers to Vercel | Must manually recreate MX + TXT records in Vercel DNS; one mistake silently breaks email for up to 48h |

Primary site records (A `216.198.79.1` = Vercel, www CNAME → `vercel-dns`) already resolve correctly from Porkbun DNS. No benefit worth the email risk.

## Current DNS Records

| Name | Type | Value | Purpose |
|---|---|---|---|
| adanacalpine.ca | NS | `curitiba/fortaleza/maceio/salvador.ns.porkbun.com` | DNS authority (Porkbun) |
| adanacalpine.ca | A | `216.198.79.1` | Website apex → Vercel |
| www.adanacalpine.ca | CNAME | `546f6ca8c9506808.vercel-dns-017.com` | Website www → Vercel |
| adanacalpine.ca | MX | `1 smtp.google.com` | Google Workspace mail |
| adanacalpine.ca | TXT | `v=spf1 include:_spf.google.com ~all` | **SPF** — authorizes Google to send |
| google._domainkey | TXT | `v=DKIM1;k=rsa;p=MIIBIjAN…` (2048-bit) | **DKIM** — digital signature key |
| _dmarc.adanacalpine.ca | TXT | `v=DMARC1; p=none; rua=mailto:sergey@adanacalpine.ca` | **DMARC** — policy + aggregate reports |
| adanacalpine.ca | TXT | `google-site-verification=mCPBXSzVsCFFsAJ2W1xgVDFFEMOJwrBoEkcGKrIj_Ag` | Google Workspace domain verification |

All values on this table reflect the authoritative state on 2026-09-21, verified via `dig` against Porkbun nameservers and Google Public DNS.

## Security & Privacy

- SPF hard-fails (`~all`) unlisted senders; only Google's SPF include is allowed.
- DKIM uses a 2048-bit RSA key (strong key size, non-expiring, managed by Google).
- DMARC aggregate reports (`rua`) are delivered to `sergey@adanacalpine.ca`.
- Scope guard: if any third-party service (CRM, newsletter, booking, Stripe receipts) ever sends as `support@` / `admin@` / `hello@` / any `@adanacalpine.ca` address, it must be added to SPF/DKIM **before** DMARC is tightened. DMARC covers all sub-addressed mail automatically — no per-alias records needed.

## Hardening & Monitoring

### DMARC hardening roadmap

| Phase | Policy | Trigger to advance |
|---|---|---|
| 1 (now) | `p=none` reporting only | Monitor aggregate reports ~2 weeks |
| 2 | `p=quarantine` | No legit third-party senders failing; reports clean |
| 3 (optional) | `p=reject` | After sustained clean `quarantine` period |

DMARC `rua` reports can be reviewed via a DMARC parser (e.g. Google Workspace's built-in DMARC reporting, or a third-party analyzer) to confirm only Google sends mail.

### Verification commands

```bash
dig +short TXT adanacalpine.ca                     # SPF
dig +short TXT google._domainkey.adanacalpine.ca   # DKIM
dig +short TXT _dmarc.adanacalpine.ca              # DMARC
```

## See Also

- [Project Overview](context-project-overview.md) — hosting topology (Porkbun → Vercel, Google Workspace mail).

## Implementation Status

| Area | Status | Notes |
|---|---|---|
| SPF | ✅ Done | Published + verified 2026-09-21 |
| DKIM | ✅ Done | Key pre-existing; record live; Google auth pending (< 48h banner) |
| DMARC `p=none` | ✅ Done | Published + verified 2026-09-21 |
| DMARC `p=quarantine` | 📅 Planned | After ~2 weeks of clean reports |
| Vercel nameserver migration | ❌ Declined | Keep DNS at Porkbun |

## Citations

[1] [Google Workspace — Set up SPF](https://support.google.com/a/answer/33777)
[2] [Google Workspace — Set up DKIM](https://support.google.com/a/answer/174124)
[3] [Google Workspace — Set up DMARC](https://support.google.com/a/answer/1068390)