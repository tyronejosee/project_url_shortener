export default function Home() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      {/* <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <div
          className="relative left-[50%] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-indigo-600 opacity-30 sm:w-[72.1875rem]"
          aria-hidden="true"
        ></div>
      </div> */}

      {/* Main Container */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Shorten your links in seconds
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Turn long URLs into short, shareable links. Fast, secure, and free.
        </p>
      </div>

      {/* URL Shortener Form */}
      <div className="mt-10 flex justify-center">
        <form className="w-full max-w-xl flex gap-x-4">
          <input
            type="url"
            id="url"
            name="url"
            required
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            placeholder="https://www.example.com"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Cut
          </button>
        </form>
      </div>

      {/* List of Shortened URLs */}
      <div className="mt-16 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800">
          Your Shortened Links
        </h3>
        <ul className="mt-6 space-y-4">
          <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <span className="text-gray-700 truncate">
              https://www.long-example.com
            </span>
            <a
              href="https://short.ly/abc123"
              className="text-blue-600 font-medium hover:underline"
              target="_blank"
            >
              https://short.ly/abc123
            </a>
          </li>
          <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <span className="text-gray-700 truncate">
              https://www.another-example.com
            </span>
            <a
              href="https://short.ly/xyz789"
              className="text-blue-600 font-medium hover:underline"
              target="_blank"
            >
              https://short.ly/xyz789
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
