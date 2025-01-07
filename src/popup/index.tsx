import { createRoot } from "react-dom/client";
import { Popup } from "./Popup";

const rootElement = document.getElementById("root");
if (rootElement !== null) {
  const root = createRoot(rootElement);
  root.render(<Popup />);
} else {
  console.error("Failed to find root element.");
}
