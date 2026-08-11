import type { Lead } from "@/types";
import { BUDGET_LABELS } from "@/server/validators/lead";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/config";

/**
 * Outbound notification for a new lead.
 *
 * Telegram is the default because it is the fastest channel to a human and
 * needs no infrastructure. Configure `TELEGRAM_BOT_TOKEN` and
 * `TELEGRAM_CHAT_ID` to enable; without them this is a no-op and submission
 * still succeeds, because a failed notification must never lose a lead.
 */
export interface Notifier {
  notify(lead: Lead): Promise<void>;
}

const dict = getDictionary(defaultLocale);

export function formatLead(lead: Lead): string {
  const lines = [
    `New project inquiry — ${lead.name}`,
    `Email: ${lead.email}`,
    lead.company ? `Company: ${lead.company}` : null,
    `Type: ${dict.projectTypes[lead.projectType] ?? lead.projectType}`,
    `Budget: ${lead.budget ? BUDGET_LABELS[lead.budget] : "—"}`,
    "",
    lead.message,
    "",
    lead.pageUrl ? `Page: ${lead.pageUrl}` : null,
    lead.source ? `Source: ${lead.source}` : null,
    lead.utmCampaign ? `Campaign: ${lead.utmCampaign}` : null,
  ];
  return lines.filter(Boolean).join("\n");
}

class TelegramNotifier implements Notifier {
  constructor(
    private readonly token: string,
    private readonly chatId: string,
  ) {}

  async notify(lead: Lead): Promise<void> {
    const response = await fetch(`https://api.telegram.org/bot${this.token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: this.chatId,
        text: formatLead(lead),
        disable_web_page_preview: true,
      }),
    });
    if (!response.ok) {
      throw new Error(`Telegram responded ${response.status}`);
    }
  }
}

class NoopNotifier implements Notifier {
  async notify(): Promise<void> {}
}

export function getNotifier(): Notifier {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (token && chatId) return new TelegramNotifier(token, chatId);
  return new NoopNotifier();
}
