import { Checkbox, Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import {
  CrosswordTab,
  isCrosswordTab,
  parseCrosswordTab,
} from "../lib/parseCrosswordTab";
import { ClueVisibilityStorage } from "../lib/ClueVisibilityStorage";
import { Messaging } from "../lib/messageSchema";

export const Popup = () => {
  const [checked, setChecked] = useState(true);
  const [activeTab, setActiveTab] = useState<CrosswordTab | null>(null);

  useEffect(() => {
    chrome.tabs
      .query({
        url: "https://www.nytimes.com/*",
        active: true,
      })
      .then((tabs) => tabs.map(parseCrosswordTab).find(isCrosswordTab))
      .then((activeTab) => setActiveTab(activeTab ?? null));
  }, []);

  useEffect(() => {
    if (activeTab) {
      ClueVisibilityStorage.getForDate(activeTab.date).then((value) => {
        if (value !== null) {
          setChecked(value);
        }
      });
    }
  }, [activeTab]);

  return (
    <Stack width={"320px"} padding={"1rem"}>
      <Checkbox
        checked={checked}
        label={"Show clues"}
        disabled={activeTab === null}
        onChange={async ({ target: { checked } }) => {
          if (activeTab) {
            Messaging.sendCluesVisibilityMessage(checked, activeTab.id);
            setChecked(checked);
            ClueVisibilityStorage.setForDate(activeTab.date, checked);
          }
        }}
      />
    </Stack>
  );
};
