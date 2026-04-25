import { EVENT_TAGS, PHOTO_COVERS, USER_PROFILE, initialEvents, initialHighlights, initialPartners, initialPublicMemories } from "../data/appData.js";
import { formatDate, getEventCover, slugLabel } from "./appUtils.js";

export function runSelfTests() {
  const tests = [
    ["slugLabel formats snake_case", slugLabel("movie_night") === "movie night"],
    ["formatDate handles ISO day", formatDate("2026-04-22").includes("2026")],
    ["event tags include required groups", ["what", "where", "how", "with"].every((key) => Array.isArray(EVENT_TAGS[key]))],
    ["profile has username", Boolean(USER_PROFILE.username)],
    ["partners have ids and usernames", initialPartners.every((partner) => Boolean(partner.id && partner.name && partner.username))],
    ["events are scoped to partners", initialEvents.every((event) => Boolean(event.partnerId))],
    ["highlights are scoped to partners", initialHighlights.every((highlight) => Boolean(highlight.partnerId && highlight.sourceId))],
    ["public memories expose only public payload", initialPublicMemories.every((memory) => memory.status === "published" && Boolean(memory.title) && Number.isFinite(memory.inspiredCount) && Boolean(memory.coverClass || memory.imageUrl))],
    ["event cover uses last photo", getEventCover(initialEvents[0]) === PHOTO_COVERS[2]],
    ["grid has three columns concept", PHOTO_COVERS.length >= 3],
  ];

  const failed = tests.filter(([, ok]) => !ok).map(([name]) => name);
  if (failed.length > 0) console.warn("Relationship MVP self-tests failed:", failed);
}
