import Link from "next/link";
import UsernameForm from "./components/cookietracking/usernameform";

export default function NavMenu() {
  return (
    <nav className="w-full bg-white bg-opacity-95 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link href="/" className="text-red-600 hover:text-red-900">
              454 Calendar
            </Link>

            <ul className="flex items-center space-x-4 ml-10">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Day Info
                </Link>
              </li>
              <li>
                <Link
                  href="/presets"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Comp Day
                </Link>
              </li>
              <li>
                <Link
                  href="/duration"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Month Duration
                </Link>
              </li>
              <li>
                <UsernameForm />
              </li>
            </ul>
          </div>
          {/* Additional elements like search or buttons can be added here */}
        </div>
      </div>
    </nav>
  );
}
