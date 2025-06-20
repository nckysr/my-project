export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome to Home Page
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          This is the home page of our application.
        </p>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
          Explore More
        </button>
      </div>
    </div>
  );
}
