import { Markup } from "telegraf";
import { bot, REQUIRED_CHANNELS } from "./constanta";

export async function isUserSubscribed(userId: number): Promise<boolean> {
  for (const channel of REQUIRED_CHANNELS) {
    try {
      const member = await bot.telegram.getChatMember(channel.username, userId);
      if (!["member", "administrator", "creator"].includes(member.status)) {
        return false;
      }
    } catch {
      return false;
    }
  }
  return true;
}

export function subscriptionKeyboard() {
  const buttons: any[] = REQUIRED_CHANNELS.map((c) => [
    Markup.button.url(
      `📢 ${c.name}`,
      `https://t.me/${c.username.replace("@", "")}`
    ),
  ]);

  buttons.push([Markup.button.callback("✅ Obuna bo‘ldim", "check_subs")]);

  return Markup.inlineKeyboard(buttons);
}
