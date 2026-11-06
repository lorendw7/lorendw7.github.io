"""Protect the public package boundary and detect stale CDN content."""
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


def module(name):
    spec = importlib.util.spec_from_file_location(name, ROOT / "scripts" / f"{name}.py")
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


package = module("package_site")
verify = module("verify_deployment")
REVISION = "a" * 40


class DeploymentTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.source = Path(self.temp.name) / "source"
        self.source.mkdir()
        for name in package.PUBLIC_FILES:
            (self.source / name).write_text(name, encoding="utf-8")
        (self.source / "assets").mkdir()
        (self.source / "assets" / "portrait.jpg").write_bytes(b"public-image")
        (self.source / ".claude").mkdir()
        (self.source / ".claude" / "local.txt").write_text("not public")
        (self.source / "README.md").write_text("not a page")
        self.output = Path(self.temp.name) / "public"
        package.package_site(self.source, self.output, REVISION)

    def read(self, url):
        name = url.removeprefix("https://example.test/").split("?")[0] or "index.html"
        return (self.output / name).read_bytes()

    def test_public_files_only_and_valid_checksums(self):
        self.assertFalse((self.output / ".claude").exists())
        self.assertFalse((self.output / "README.md").exists())
        self.assertTrue((self.output / ".nojekyll").exists())
        self.assertEqual((self.output / "assets/portrait.jpg").read_bytes(), b"public-image")
        verify.check_deployment("https://example.test", REVISION, self.read)

    def test_stale_html_fails_even_when_version_marker_is_current(self):
        (self.output / "index.html").write_text("stale homepage")
        with self.assertRaisesRegex(ValueError, "index.html"):
            verify.check_deployment("https://example.test", REVISION, self.read)

    def test_old_or_incomplete_manifest_fails(self):
        with self.assertRaisesRegex(ValueError, "different revision"):
            verify.check_deployment("https://example.test", "b" * 40, self.read)
        (self.output / "version.json").write_text(json.dumps({"commit": REVISION}))
        with self.assertRaises(ValueError):
            verify.check_deployment("https://example.test", REVISION, self.read)

    def test_existing_output_is_not_overwritten(self):
        with self.assertRaises(FileExistsError):
            package.package_site(self.source, self.output, REVISION)


if __name__ == "__main__":
    unittest.main()
