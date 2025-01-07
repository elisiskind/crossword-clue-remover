import { z } from "zod";

export class ClueVisibilityStorage {
  private static readonly storageKeyPrefix = "show-clues__";

  static readonly getForDate = async (date: string) => {
    const storageKey = `${ClueVisibilityStorage.storageKeyPrefix}${date}`;
    const result = await chrome.storage.local.get(storageKey);
    if (!(storageKey in result)) return null;
    const parsed = z.boolean().safeParse(result[storageKey]);
    return parsed.success ? parsed.data : null;
  };

  static readonly setForDate = (date: string, value: boolean) =>
    chrome.storage.local.set({
      [`${ClueVisibilityStorage.storageKeyPrefix}${date}`]: value,
    });
}
