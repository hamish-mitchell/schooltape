import hidePfp from "./snippets/hidePfp";
import hidePwaPrompt from "./snippets/hidePwaPrompt";
import censor from "./snippets/censor";

export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_start",
  excludeMatches: EXCLUDE_MATCHES,
  async main() {
    hidePfp();
    hidePwaPrompt();
    censor();
  },
});
