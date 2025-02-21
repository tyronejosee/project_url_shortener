export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Welcome to the Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Aquí van tus widgets o paneles de información */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Panel 1</h3>
          {/* Contenido del panel */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Panel 2</h3>
          {/* Contenido del panel */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Panel 3</h3>
          {/* Contenido del panel */}
        </div>
      </div>
    </div>
  );
}
