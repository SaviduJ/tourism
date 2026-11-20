import Link from "next/link";
import { Inbox } from "lucide-react";
import { requireStaff } from "@/lib/admin/session";
import { database } from "@/lib/admin/database.mjs";
import { enquiryStatuses, isEnquiryStatus } from "@/lib/enquiry-options";
import { StatusForm } from "./status-form";
import { logout } from "./actions";

const pageSize = 20;
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Colombo",
});

function inboxLink(status: string, page = 1) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (page > 1) params.set("page", String(page));
  return params.size ? `/admin?${params}` : "/admin";
}

type Search = Promise<{ status?: string; page?: string }>;

export default async function StaffInbox({ searchParams }: { searchParams: Search }) {
  const staff = await requireStaff();
  const query = await searchParams;
  const filter = isEnquiryStatus(query.status ?? "") ? String(query.status) : "";
  const db = await database();
  const grouped = await db.execute("SELECT status, COUNT(*) AS total FROM enquiries GROUP BY status");
  const counts = new Map(grouped.rows.map((row) => [String(row.status), Number(row.total)]));
  const total = Array.from(counts.values()).reduce((sum, n) => sum + n, 0);
  const matching = filter ? (counts.get(filter) ?? 0) : total;
  const pages = Math.max(1, Math.ceil(matching / pageSize));
  const page = Math.min(pages, Math.max(1, Math.trunc(Number(query.page)) || 1));
  const { rows } = await db.execute({
    sql: `SELECT * FROM enquiries ${filter ? "WHERE status=?" : ""}
          ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`,
    args: [...(filter ? [filter] : []), pageSize, (page - 1) * pageSize],
  });

  return (
    <section className="staff-inbox">
      <header className="staff-heading">
        <div><h1>Trip enquiries</h1><p>Review travel requests and track your follow-up.</p></div>
        <form action={logout} className="staff-account">
          <span>{staff}</span><button className="btn outline">Sign out</button>
        </form>
      </header>
      <nav className="staff-filters" aria-label="Filter enquiries">
        {["", ...enquiryStatuses].map((s) => (
          <Link href={inboxLink(s)} key={s} aria-current={filter === s ? "page" : undefined}>
            {s || "All enquiries"} <span>{s ? (counts.get(s) ?? 0) : total}</span>
          </Link>
        ))}
      </nav>
      {rows.length === 0 && (
        <div className="staff-empty">
          <Inbox size={32} aria-hidden="true" />
          <h2>{filter ? "No matching enquiries" : "No trip enquiries yet"}</h2>
          <p>{filter ? "Choose another status to see more requests." : "Requests from the trip enquiry form will appear here."}</p>
        </div>
      )}
      {rows.map((row) => {
        const status = String(row.status);
        if (!isEnquiryStatus(status)) return null;
        return (
          <details className="staff-request" key={String(row.id)}>
            <summary>
              <span className="staff-traveller"><strong>{String(row.name)}</strong><small>{String(row.trip) || "Custom journey"}</small></span>
              <span className="staff-summary-meta"><span className="staff-badge" data-status={status}>{status}</span>
                <time dateTime={new Date(Number(row.created_at)).toISOString()}>{dateFormat.format(Number(row.created_at))}</time>
              </span>
            </summary>
            <div className="staff-request-body">
              <dl>
                <div><dt>Email address</dt><dd><a href={`mailto:${encodeURIComponent(String(row.email))}`}>{String(row.email)}</a></dd></div>
                <div><dt>Travel dates</dt><dd>{String(row.dates) || "Flexible"}</dd></div>
                <div><dt>Trip length</dt><dd>{String(row.duration)}</dd></div>
                <div><dt>Budget per person</dt><dd>{String(row.budget)}</dd></div>
                <div><dt>Travel style</dt><dd>{String(row.style)}</dd></div>
              </dl>
              {Boolean(row.message) && <p className="staff-message">{String(row.message)}</p>}
              <StatusForm id={String(row.id)} status={status} />
            </div>
          </details>
        );
      })}
      {pages > 1 && <nav className="staff-pages" aria-label="Enquiry pages">
        {page > 1 && <Link href={inboxLink(filter, page - 1)}>Previous</Link>}
        <span>Page {page} of {pages}</span>
        {page < pages && <Link href={inboxLink(filter, page + 1)}>Next</Link>}
      </nav>}
    </section>
  );
}