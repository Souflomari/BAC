/**
 * robots.txt. Le site est FERMÉ aux moteurs tant que le propriétaire ne l'a pas ouvert
 * (`SITE_OUVERT` dans `lib/site.ts`, le même interrupteur que la balise `robots` des pages).
 */
import type { MetadataRoute } from "next";
import { SITE_OUVERT, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return SITE_OUVERT
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
