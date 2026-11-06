"""Package only public portfolio files for GitHub Pages; no Jekyll step."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil

PUBLIC_FILES = (
    "index.html", "project-notes.html", "styles.css", "simplefolio.css", "ink.css",
    "main.js", "navigation.js", "project-notes.js", "THIRD_PARTY_NOTICES.md",
)


def package_site(source: Path, output: Path, revision: str) -> None:
    if not re.fullmatch(r"[0-9a-f]{40}", revision):
        raise ValueError("Expected a full Git commit SHA")
    source = source.resolve()
    files = [source / name for name in PUBLIC_FILES]
    files += sorted((source / "assets").rglob("*"))
    if not (source / "assets").is_dir():
        raise FileNotFoundError("Missing public assets directory")
    for path in files:
        if path.is_symlink():
            raise ValueError(f"Symlink is not a public site file: {path}")
        if not path.exists():
            raise FileNotFoundError(path)
    output.mkdir(parents=True, exist_ok=False)
    for path in files:
        if path.is_file():
            target = output / path.relative_to(source)
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(path, target)
    (output / ".nojekyll").touch()
    fingerprints = {
        name: hashlib.sha256((output / name).read_bytes()).hexdigest()
        for name in PUBLIC_FILES
    }
    (output / "version.json").write_text(
        json.dumps({"commit": revision, "sha256": fingerprints}, indent=2) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=Path("_site"))
    parser.add_argument("--revision", required=True)
    args = parser.parse_args()
    package_site(Path(__file__).resolve().parents[1], args.output, args.revision)
    print(f"Packaged public site at {args.output} ({args.revision[:7]})")
