/** Destination for financing applications (per TZ). */
export const FINANCE_APPLICATION_EMAIL = "office@nif.kg";

export type FinanceApplicationPayload = {
  organizationName: string;
  projectGoal: string;
  phone: string;
  email: string;
};

export type FinanceApplicationResult = { ok: true } | { ok: false; message?: string };

/**
 * Sends the application to office@nif.kg via FormSubmit AJAX.
 * First delivery requires a one-time confirmation click in that mailbox.
 */
export async function submitFinanceApplication(
  payload: FinanceApplicationPayload
): Promise<FinanceApplicationResult> {
  const organizationName = payload.organizationName.trim();
  const projectGoal = payload.projectGoal.trim();
  const phone = payload.phone.trim();
  const email = payload.email.trim();

  if (!organizationName || !projectGoal || !phone || !email) {
    return { ok: false, message: "missing_fields" };
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${FINANCE_APPLICATION_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: "Заявка на финансирование проекта — nif.kg",
        _template: "table",
        _replyto: email,
        organizationName,
        "Цель проекта": projectGoal,
        phone,
        email,
      }),
    });

    if (!response.ok) {
      return { ok: false };
    }

    const data = (await response.json().catch(() => null)) as { success?: string | boolean } | null;
    if (data && data.success === false) {
      return { ok: false };
    }

    return { ok: true };
  } catch {
    return { ok: false };
  }
}
