from playwright.sync_api import sync_playwright, expect
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to frontend (Vite default port 5173)
        try:
            print("Navigating to home...")
            page.goto("http://localhost:5173", timeout=20000)

            # Wait for content to load
            print("Waiting for content...")
            expect(page.get_by_text("SimplMusic")).to_be_visible()
            expect(page.get_by_text("Home")).to_be_visible(timeout=10000)

            # Take Home screenshot
            page.screenshot(path="verification/verification_home.png")
            print("Home screenshot taken")

            # Go to Search
            print("Navigating to Search...")
            page.get_by_role("link", name="Search").click()
            expect(page.get_by_placeholder("What do you want to play?")).to_be_visible()

            # Search
            print("Searching for Wonderwall...")
            page.get_by_placeholder("What do you want to play?").fill("Wonderwall")

            # Trigger search (Enter) or wait if logic requires
            # My logic triggers on submit
            page.get_by_placeholder("What do you want to play?").press("Enter")

            # Wait for results
            print("Waiting for results...")
            expect(page.get_by_text("Top Results")).to_be_visible(timeout=15000)

            # Take Search screenshot
            page.screenshot(path="verification/verification_search.png")
            print("Search screenshot taken")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/verification_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
