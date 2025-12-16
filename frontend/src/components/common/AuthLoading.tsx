import { Spinner } from "@heroui/react";

export default function AuthLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Spinner size="lg" color="primary" />
      <h1 className="text-xl font-semibold">Authenticating...</h1>
      <p className="text-gray-500">Please wait while we log you in.</p>
    </div>
  );
}
