import { useState, type FormEvent } from "react";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitFinanceApplication } from "@/lib/financeApplication";
import { useT } from "@/lib/lang";
import { cn } from "@/lib/utils";

const fieldClassName =
  "h-11 border-white/25 bg-white/10 text-white placeholder:text-white/40 focus-visible:ring-white/40";

const labelClassName = "text-sm font-semibold tracking-wide text-white/85";

export function FinanceApplicationForm({ className }: { className?: string }) {
  const t = useT();
  const f = t.finance.form;

  const [organizationName, setOrganizationName] = useState("");
  const [organizationActivity, setOrganizationActivity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    const result = await submitFinanceApplication({
      organizationName,
      organizationActivity,
      phone,
      email,
    });

    if (result.ok) {
      setStatus("success");
      setOrganizationName("");
      setOrganizationActivity("");
      setPhone("");
      setEmail("");
      toast.success(f.successTitle, {
        description: f.success,
        icon: <CheckCircle2 className="h-5 w-5 text-[color:var(--gold)]" strokeWidth={2} />,
      });
      return;
    }

    setStatus("error");
    toast.error(f.errorTitle, {
      description: f.error,
      icon: <CircleAlert className="h-5 w-5 text-red-300" strokeWidth={2} />,
    });
  }

  return (
    <section
      id="apply"
      className={cn(
        "rounded-2xl border border-white/20 bg-white/10 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-md sm:p-7 md:p-8",
        className
      )}
    >
      <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{t.finance.applyTitle}</h2>
      <p className="mt-2 text-base leading-relaxed text-white/[0.82] sm:mt-3 sm:text-lg">{t.finance.applyIntro}</p>

      {status === "success" ? (
        <div
          className="mt-6 flex items-start gap-3 rounded-2xl border border-[color:var(--gold)]/40 bg-[linear-gradient(135deg,rgba(212,175,55,0.18),rgba(255,255,255,0.06))] px-4 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.2)] sm:mt-7 sm:gap-4 sm:px-5 sm:py-5"
          role="status"
        >
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--gold)]/20 text-[color:var(--gold)] ring-1 ring-[color:var(--gold)]/35">
            <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <p className="font-display text-base font-semibold tracking-wide text-white sm:text-lg">
              {f.successTitle}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white/80 sm:text-base">{f.success}</p>
          </div>
        </div>
      ) : null}

      <form className="mt-6 space-y-5 sm:mt-7" onSubmit={onSubmit} noValidate>
        <div className="space-y-2">
          <Label htmlFor="finance-org-name" className={labelClassName}>
            {f.organizationName}
          </Label>
          <Input
            id="finance-org-name"
            name="organizationName"
            required
            autoComplete="organization"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className={fieldClassName}
            disabled={status === "submitting"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="finance-org-activity" className={labelClassName}>
            {f.organizationActivity}
          </Label>
          <Textarea
            id="finance-org-activity"
            name="organizationActivity"
            required
            rows={3}
            value={organizationActivity}
            onChange={(e) => setOrganizationActivity(e.target.value)}
            className={cn(fieldClassName, "min-h-[5.5rem] py-2.5")}
            disabled={status === "submitting"}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="finance-phone" className={labelClassName}>
              {f.phone}
            </Label>
            <Input
              id="finance-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={fieldClassName}
              disabled={status === "submitting"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="finance-email" className={labelClassName}>
              {f.email}
            </Label>
            <Input
              id="finance-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClassName}
              disabled={status === "submitting"}
            />
          </div>
        </div>

        {status === "error" ? (
          <p className="text-sm text-red-300 sm:text-base" role="alert">
            {f.error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-11 rounded-full border border-white/80 bg-white/20 px-8 font-display text-sm font-semibold tracking-[0.14em] text-white shadow-[0_4px_24px_rgba(0,0,0,0.28)] backdrop-blur-sm transition hover:border-white hover:bg-white/35"
        >
          {status === "submitting" ? f.submitting : f.submit}
        </Button>
      </form>
    </section>
  );
}
