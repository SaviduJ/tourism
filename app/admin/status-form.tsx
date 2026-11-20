"use client";

import { useActionState } from "react";
import { enquiryStatuses, type EnquiryStatus } from "@/lib/enquiry-options";
import { updateStatus } from "./actions";

export function StatusForm({ id, status }: { id: string; status: EnquiryStatus }) {
  const [message, action, pending] = useActionState(updateStatus, "");
  return (
    <form className="staff-status-form" action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="previous" value={status} />
      <label>Status<select name="status" defaultValue={status} key={status}>
        {enquiryStatuses.map((s) => <option key={s}>{s}</option>)}
      </select></label>
      <button className="btn" disabled={pending}>{pending ? "Saving…" : "Save status"}</button>
      <span role="status">{message}</span>
    </form>
  );
}