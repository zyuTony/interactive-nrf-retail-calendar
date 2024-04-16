import Link from "next/link";

export default function NavMenu() {
  const pastCalendars = [
    {
      year: "2023-2025",
      url: "https://6a83cd4f6d8a17c1b6dd-0490b3ba35823e24e2c50ce7533598b0.ssl.cf1.rackcdn.com/454%20Calendars/3%20Year%20Calendar%2023-25.pdf",
    },
    {
      year: "2022-2024",
      url: "http://80ec4822782e2a37d9ee-478852ca0c5c18669502b2f9c7e01a0d.r61.cf1.rackcdn.com/3%20Year%20Calendar%2022-24.pdf",
    },
    {
      year: "2021-2023",
      url: "http://80ec4822782e2a37d9ee-478852ca0c5c18669502b2f9c7e01a0d.r61.cf1.rackcdn.com/3%20Year%20Calendar%2021-23.pdf",
    },
    {
      year: "2020-2022",
      url: "https://6a83cd4f6d8a17c1b6dd-0490b3ba35823e24e2c50ce7533598b0.ssl.cf1.rackcdn.com/454%20Calendars/3%20Year%20Calendar%2020-22.pdf",
    },
    {
      year: "2019-2021",
      url: "https://6a83cd4f6d8a17c1b6dd-0490b3ba35823e24e2c50ce7533598b0.ssl.cf1.rackcdn.com/454%20Calendars/3%20Year%20Calendar%2019-21.pdf",
    },
  ];
  return (
    <nav className="w-full bg-white bg-opacity-95 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center py-3">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-900 text-lg font-semibold"
          >
            454 Calendar
          </Link>

          <div className="relative group ml-8">
            <span className="text-gray-600 hover:text-gray-900 text-sm font-medium cursor-pointer text-center pl-5">
              PDF Calendars
            </span>
            <div className="absolute left-0 bg-white shadow-lg hidden group-hover:block w-32 rounded-md border border-gray-200">
              <ul className="py-1">
                {pastCalendars.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 block px-2 py-2 text-sm rounded-md hover:bg-gray-50 w-full text-center"
                    >
                      {link.year}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
