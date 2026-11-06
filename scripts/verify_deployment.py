"""Verify the deployed revision and public HTML/CSS/JS, not just workflow status."""
import argparse
import hashlib
import json
import time
from urllib.request import Request, urlopen


def fetch(url: str) -> bytes:
    request = Request(url, headers={"Cache-Control": "no-cache", "User-Agent": "Portfolio-deployment-check"})
    with urlopen(request, timeout=15) as response:
        return response.read()


def check_deployment(base: str, revision: str, read=fetch) -> None:
    base = base.rstrip("/") + "/"
    manifest = json.loads(read(base + "version.json?revision=" + revision))
    if manifest.get("commit") != revision:
        raise ValueError("The public site still serves a different revision")
    fingerprints = manifest.get("sha256", {})
    required = ("index.html", "project-notes.html", "ink.css", "styles.css", "simplefolio.css",
                "main.js", "navigation.js", "project-notes.js")
    for name in required:
        # Test the ordinary homepage URL as well as the assets visitors actually request.
        path = "" if name == "index.html" else name
        actual = hashlib.sha256(read(base + path)).hexdigest()
        if actual != fingerprints.get(name):
            raise ValueError(f"The public {name} has not reached the expected revision")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", required=True)
    parser.add_argument("--revision", required=True)
    parser.add_argument("--attempts", type=int, default=12)
    args = parser.parse_args()
    for attempt in range(args.attempts):
        try:
            check_deployment(args.url, args.revision)
            print(f"Verified public site at {args.url}: {args.revision}", flush=True)
            break
        except (OSError, ValueError) as error:
            print(f"Verification {attempt + 1}/{args.attempts}: {error}", flush=True)
            if attempt + 1 == args.attempts:
                raise SystemExit("The deployment is not yet verified on the public site")
            time.sleep(10)
