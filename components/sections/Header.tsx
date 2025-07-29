import Link from "next/link";
import Button from "../../components/ui/Button";

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-dark-border-subtle dark:bg-dark-base">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold">
            Mode
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/features"
              className="text-sm font-medium hover:text-purple-600"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium hover:text-purple-600"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium hover:text-purple-600"
            >
              FAQ
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-4">
            <Link href="/signIn">
              <Button variant="outline">Sign in</Button>
            </Link>
            <Link href="/signUp">
              <Button>Sign up</Button>
            </Link>
            <Link href="/signOut">
              <Button>Sign Out</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
