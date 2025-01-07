import { Messaging } from "../lib/messageSchema";
import { parseCrosswordDateFromUrl } from "../lib/parseCrosswordTab";
import { ClueVisibilityStorage } from "../lib/ClueVisibilityStorage";

const updateCluesVisibility = (visible: boolean) => {
  document
    .querySelector(".xwd__layout--cluelists")
    ?.setAttribute("style", visible ? "" : "display: none;");
};

chrome.runtime.onMessage.addListener((message) => {
  if (Messaging.isCluesVisibilityMessage(message)) {
    updateCluesVisibility(message.value);
  }
});

const date = parseCrosswordDateFromUrl(window.location.href);
if (date) {
  ClueVisibilityStorage.getForDate(date).then((value) => {
    if (value !== null) {
      const observer = new MutationObserver((mutations, observer) => {
        mutations.forEach((mutation) =>
          mutation.addedNodes.forEach(({ nodeName }) => {
            if (nodeName === "MAIN") {
              updateCluesVisibility(value);
              observer.disconnect();
            }
          }),
        );
      });

      observer.observe(document, { subtree: true, childList: true });
    }
  });
}
