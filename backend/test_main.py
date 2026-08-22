import unittest

from main import health, overview, root


class ApiTests(unittest.TestCase):
    def test_root(self):
        self.assertEqual(root()["docs"], "/docs")

    def test_health(self):
        self.assertEqual(health(), {"status": "ok", "service": "building-api"})

    def test_overview_contains_operational_data(self):
        data = overview()
        self.assertEqual(data["active_alerts"], 3)
        self.assertEqual(len(data["zones"]), 3)


if __name__ == "__main__":
    unittest.main()
