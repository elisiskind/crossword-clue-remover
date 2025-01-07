export interface CrosswordTab {
  date: string;
  id: number;
}

export const parseCrosswordDateFromUrl = (url: string) => {
  return url?.match(/daily\/(\d\d\d\d\/\d\d\/\d\d)/)?.[1] ?? null;
};

export const parseCrosswordTab = ({ id, url }: chrome.tabs.Tab) => {
  const date = url ? (parseCrosswordDateFromUrl(url) ?? undefined) : undefined;
  return { date, id: id };
};

export const isCrosswordTab = (
  tab: Partial<CrosswordTab>,
): tab is CrosswordTab => tab.id !== undefined && tab.date !== undefined;
