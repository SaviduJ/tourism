import type { Metadata } from "next";
import "./staff.css";

export const metadata: Metadata = {
  title: "Staff workspace",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="staff-area">{children}</main>;
}