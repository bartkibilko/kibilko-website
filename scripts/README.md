Run the offline publication check from the repository root before requesting review of a page change (the `ship-page` check):

```sh
python3 scripts/seo-check.py
```

Python 3.9 or later is sufficient; no packages, network access or publishing credentials are needed. The command prints `PASS` and exits zero, or lists errors and exits nonzero. An optional directory argument checks a scratch copy instead.

The check discovers public HTML while excluding hidden/underscore directories and the top-level `scripts`, `scratch` and `screenshots` directories. It validates metadata, JSON-LD, static local links and fragments, PNG/JPEG social images, sitemap, RSS and robots. Descriptions have no arbitrary character limit. JavaScript-generated links and fragment IDs need a separate browser check.

For a new post, fill every template placeholder using a real publication date and an existing image with its actual dimensions. Keep the source template's `noindex`; remove it only in the completed public copy. Update the home and blog lists, sitemap and feed, then run the check before requesting publication review. This command never publishes the site.
