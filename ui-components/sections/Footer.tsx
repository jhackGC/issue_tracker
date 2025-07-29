import Link from "next/link";
import { Year } from "../core/Year";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-dark-border-subtle dark:bg-dark-base">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Mode</h3>
            <p className="text-sm text-gray-300">
              A modern project management tool built with Next.js.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/features"
                  className="text-sm text-gray-300 hover:text-purple-600"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-gray-300 hover:text-purple-600"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-300 hover:text-purple-600"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-gray-300 hover:text-purple-600"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/yourusername/mode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-purple-600"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-300 hover:text-purple-600"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-gray-300">
            &copy; <Year /> Mode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
