export const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-semibold">Dashboard</div>
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-gray-200 rounded-full">Settings</button>
        <button className="p-2 bg-gray-200 rounded-full">Logout</button>
      </div>
    </header>
  );
};
