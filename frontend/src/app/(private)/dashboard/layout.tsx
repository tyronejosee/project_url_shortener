import { Header, Sidebar } from "@/components/common";
import "../../../styles/globals.css";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
