// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">
        Sorry, the page you're looking for does not exist.
      </p>
    </div>
  );
}
