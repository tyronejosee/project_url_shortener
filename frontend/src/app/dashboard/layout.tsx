
import "../../styles/globals.css";
import { Header, Sidebar } from "@/components/common";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
