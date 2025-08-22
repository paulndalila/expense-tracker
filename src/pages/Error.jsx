export default function Error() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="h-20 overflow-hidden flex items-center justify-center mb-6">
            <img
              src="./logo.png"
              className="h-full"
              alt="Africa Inuka Hospital Logo"
            />
          </div>
          <p className="text-xl font-bold text-slate-700">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-gray-900  md:text-6xl">
            Page not found
          </h1>
          <p className="mt-6 text-sm font-medium text-pretty text-gray-500 md:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-sm bg-slate-700 px-3.5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-xs hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go Back
            </a>
            <a
              href="mailto:paulndalila001@gmail.com&subject=Page%20Request%20Error"
              className="text-xs md:text-sm font-semibold text-gray-900 hover:underline"
            >
              Contact Admin <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
