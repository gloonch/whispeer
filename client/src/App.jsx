import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AccountPage from "./components/AccountPage.jsx";
import AddEventForm from "./components/AddEventForm.jsx";
import AddHighlightModal from "./components/AddHighlightModal.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";
import AppHeader from "./components/AppHeader.jsx";
import ExploreDetailPage from "./components/ExploreDetailPage.jsx";
import ExplorePage from "./components/ExplorePage.jsx";
import MemoryDetailPage from "./components/MemoryDetailPage.jsx";
import NavBar from "./components/NavBar.jsx";
import NotificationsList from "./components/NotificationsList.jsx";
import PageMetaSheet from "./components/PageMetaSheet.jsx";
import TimelinePage from "./components/TimelinePage.jsx";
import TopSheet from "./components/TopSheet.jsx";
import WhispersPage from "./components/WhispersPage.jsx";
import { USER_PROFILE, initialEvents, initialHighlights, initialPartners, initialPublicMemories, initialTodos } from "./data/appData.js";
import { getEventCover, getEventCoverImage, todayISO } from "./utils/appUtils.js";
import { runSelfTests } from "./utils/selfTests.js";

runSelfTests();

const initialNotifications = [
  {
    id: "n1",
    type: "whisper_added",
    title: "Neda added a whisper",
    body: "Tea & Talk is now in Whispers.",
    timeLabel: "2m",
    bucket: "Today",
    unread: true,
    resolved: true,
  },
  {
    id: "n2",
    type: "highlight_added",
    title: "New highlight",
    body: "Movie night at home was kept as a highlight.",
    timeLabel: "12m",
    bucket: "Today",
    unread: true,
    resolved: true,
  },
  {
    id: "n3",
    type: "partner_request",
    title: "Partner request",
    body: "@luna.carter wants to become your partner.",
    timeLabel: "1h",
    bucket: "Earlier",
    unread: true,
    resolved: false,
  },
  {
    id: "n4",
    type: "whisper_done",
    title: "Neda marked a whisper done",
    body: "Tea & Talk is now completed.",
    timeLabel: "Yesterday",
    bucket: "Earlier",
    unread: false,
    resolved: true,
  },
];

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [events, setEvents] = useState(initialEvents);
  const [todos, setTodos] = useState(initialTodos);
  const [highlights, setHighlights] = useState(initialHighlights);
  const [userProfile, setUserProfile] = useState(USER_PROFILE);
  const [partners, setPartners] = useState(initialPartners);
  const [selectedPartnerId, setSelectedPartnerId] = useState(initialPartners[0]?.id || "");
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [highlightWhisper, setHighlightWhisper] = useState(null);
  const [activeTopSheet, setActiveTopSheet] = useState(null);
  const [seedTitle, setSeedTitle] = useState("");
  const [inspirationRecords, setInspirationRecords] = useState([]);
  const [publicMemoryIncrements, setPublicMemoryIncrements] = useState({});
  const [notifications, setNotifications] = useState(initialNotifications);
  const pageMetaTimer = useRef(null);
  const inspiredKeys = useRef(new Set());

  const selectedPartner = partners.find((partner) => partner.id === selectedPartnerId);
  const activePartner = partners.find((partner) => partner.status === "active");
  const relationshipIsWritable = selectedPartner?.status === "active";
  const selectedPartnerEvents = events.filter((event) => !selectedPartnerId || event.partnerId === selectedPartnerId);
  const selectedPartnerTodos = todos.filter((todo) => !selectedPartnerId || todo.partnerId === selectedPartnerId);
  const selectedPartnerHighlights = highlights.filter((highlight) => !selectedPartnerId || highlight.partnerId === selectedPartnerId);
  const inspiredCountByPartner = events.reduce((counts, event) => {
    if (event.visibility !== "public" || !event.inspiredCount) return counts;
    return { ...counts, [event.partnerId]: (counts[event.partnerId] || 0) + event.inspiredCount };
  }, {});
  const openTodos = selectedPartnerTodos.filter((todo) => todo.status === "open");
  const doneTodos = selectedPartnerTodos.filter((todo) => todo.status === "done");
  const hasUnreadNotifications = notifications.some((item) => item.unread);
  const publicMemories = [
    ...initialPublicMemories.map((memory) => ({
      ...memory,
      inspiredCount: (memory.inspiredCount || 0) + (publicMemoryIncrements[memory.id] || 0),
    })),
    ...events
      .filter((event) => event.visibility === "public")
      .map((event) => ({
        id: `public_${event.id}`,
        sourceMemoryId: event.id,
        title: event.title,
        coverClass: getEventCover(event),
        imageUrl: getEventCoverImage(event),
        tags: event.tags,
        publishedAt: event.publishedAt || event.date,
        inspiredCount: event.inspiredCount || 0,
        status: "published",
      })),
  ].sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));

  const currentPage = location.pathname.split("/")[1] || "whispers";
  const isExploreDetail = currentPage === "explore" && location.pathname !== "/explore";
  const pageMeta = {
    timeline: { title: "Timeline", subtitle: "Create intentional memories here. Highlights keep the smaller shared moments close." },
    whispers: { title: "Whispers", subtitle: "Pick one small thing, finish it with one tap, then keep it as a highlight if it matters." },
    explore: { title: "Explore", subtitle: "Photo-first public memories from other couples, shared for inspiration." },
    account: { title: "Account", subtitle: "Simple relationship information without adding extra noise to the product." },
  }[currentPage] || { title: "Whispers", subtitle: "Pick one small thing, finish it with one tap, then keep it as a highlight if it matters." };

  function addEvent(event) {
    if (!relationshipIsWritable) return;
    setEvents((prev) => [{ ...event, partnerId: selectedPartnerId, visibility: "private", publishedAt: null }, ...prev]);
  }

  function toggleMemoryVisibility(memory) {
    setEvents((prev) => prev.map((event) => {
      if (event.id !== memory.id) return event;
      const makePublic = event.visibility !== "public";
      return { ...event, visibility: makePublic ? "public" : "private", publishedAt: makePublic ? todayISO() : null };
    }));
  }

  function setMemoryCover(memoryId, photoId) {
    setEvents((prev) => prev.map((event) => (event.id === memoryId ? { ...event, coverPhotoId: photoId } : event)));
  }

  function deleteMemory(memoryId) {
    setEvents((prev) => prev.filter((event) => event.id !== memoryId));
  }

  function addPartner(partner) {
    const hasActiveRelationship = partners.some((item) => item.status === "active");
    if (hasActiveRelationship) return;
    setPartners((prev) => [...prev, { ...partner, status: "active" }]);
    setSelectedPartnerId(partner.id);
  }

  function addTodo(todo) {
    if (!relationshipIsWritable) return;
    const cleanTitle = String(todo.title || "").trim();
    if (!cleanTitle) return;
    setTodos((prev) => [{ ...todo, title: cleanTitle, partnerId: selectedPartnerId, isHighlighted: false }, ...prev]);
    setActiveTopSheet(null);
  }

  function addPublicMemoryToWhispers(publicMemory) {
    if (!activePartner) {
      setActiveTopSheet("relationshipLocked");
      return false;
    }

    const inspirationKey = `${publicMemory.id}:${activePartner.id}`;
    if (inspiredKeys.current.has(inspirationKey)) return false;
    inspiredKeys.current.add(inspirationKey);

    const createdAt = todayISO();
    setTodos((prev) => [{
      id: `t_${Date.now()}`,
      partnerId: activePartner.id,
      title: publicMemory.title || "Inspired memory",
      minutes: 20,
      status: "open",
      isHighlighted: false,
      tags: publicMemory.tags || {},
      source: {
        type: "public_memory",
        publicMemoryId: publicMemory.id,
        label: "Inspired from Explore",
      },
      createdAt,
    }, ...prev]);
    setSelectedPartnerId(activePartner.id);
    setInspirationRecords((prev) => [{
      id: `ir_${Date.now()}`,
      publicMemoryId: publicMemory.id,
      relationshipId: activePartner.id,
      createdAt,
    }, ...prev]);
    setPublicMemoryIncrements((prev) => ({ ...prev, [publicMemory.id]: (prev[publicMemory.id] || 0) + 1 }));

    if (publicMemory.id.startsWith("public_")) {
      setEvents((prev) => prev.map((event) => (
        event.id === publicMemory.sourceMemoryId
          ? { ...event, inspiredCount: (event.inspiredCount || 0) + 1 }
          : event
      )));
    }

    navigate("/whispers");
    return true;
  }

  function markDone(todoId) {
    if (!relationshipIsWritable) return;
    const doneAt = todayISO();
    setTodos((prev) => prev.map((todo) => (todo.id === todoId ? { ...todo, status: "done", doneAt: todo.doneAt || doneAt } : todo)));
  }

  function highlightTodo(todo) {
    if (!relationshipIsWritable) return;
    setHighlightWhisper(todo);
  }

  function addHighlight(todo, imageUrl) {
    if (!relationshipIsWritable) return;
    const highlightedAt = todayISO();

    setTodos((prev) => prev.map((item) => (
      item.id === todo.id
        ? { ...item, status: "done", isHighlighted: true, doneAt: item.doneAt || highlightedAt, highlightedAt }
        : item
    )));
    setHighlights((prev) => {
      if (prev.some((highlight) => highlight.sourceType === "whisper" && highlight.sourceId === todo.id)) return prev;
      return [{
        id: `h_${Date.now()}`,
        partnerId: selectedPartnerId,
        sourceType: "whisper",
        sourceId: todo.id,
        sourceLabel: todo.source?.label || "From whispers",
        title: todo.title,
        minutes: todo.minutes,
        imageUrl,
        createdAt: highlightedAt,
      }, ...prev];
    });
    setHighlightWhisper(null);
    navigate("/timeline");
  }

  function removeTodo(todoId) {
    if (!relationshipIsWritable) return;
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    setHighlights((prev) => prev.filter((highlight) => highlight.sourceId !== todoId));
  }

  function removeHighlight(highlightId) {
    if (!relationshipIsWritable) return;
    const highlight = highlights.find((item) => item.id === highlightId);
    setHighlights((prev) => prev.filter((item) => item.id !== highlightId));
    if (highlight?.sourceType === "whisper") {
      setTodos((prev) => prev.map((todo) => (todo.id === highlight.sourceId ? { ...todo, isHighlighted: false, highlightedAt: undefined } : todo)));
    }
  }

  function openNewMemory() {
    setSeedTitle("");
    setActiveTopSheet(null);
    setEventModalOpen(true);
  }

  function handleHeaderAdd() {
    if (!relationshipIsWritable) {
      setActiveTopSheet("relationshipLocked");
      return;
    }

    if (currentPage === "timeline") {
      openNewMemory();
      return;
    }

    setActiveTopSheet((sheet) => (sheet === "add" ? null : "add"));
  }

  function showPageMeta() {
    setActiveTopSheet("meta");
    if (pageMetaTimer.current) clearTimeout(pageMetaTimer.current);
    pageMetaTimer.current = setTimeout(() => setActiveTopSheet((sheet) => (sheet === "meta" ? null : sheet)), 5000);
  }

  function openNotifications() {
    setNotifications((prev) => prev.map((item) => (item.unread ? { ...item, unread: false } : item)));
    setActiveTopSheet((sheet) => (sheet === "notifications" ? null : "notifications"));
  }

  function markNotificationsRead() {
    setNotifications((prev) => prev.map((item) => (item.unread ? { ...item, unread: false } : item)));
  }

  function respondToPartnerRequest(notificationId, decision) {
    setNotifications((prev) => prev.map((item) => {
      if (item.id !== notificationId || item.type !== "partner_request") return item;
      return {
        ...item,
        type: "system",
        title: decision === "accept" ? "You're connected" : "Partner request declined",
        body: decision === "accept"
          ? "Luna is now your partner."
          : "The request was declined.",
        timeLabel: "now",
        bucket: "Today",
        unread: false,
        resolved: true,
      };
    }));
  }

  function closeTopSheet() {
    if (pageMetaTimer.current) clearTimeout(pageMetaTimer.current);
    setActiveTopSheet(null);
  }

  function updatePartnerStatus(partnerId, status) {
    const hasOtherActiveRelationship = partners.some((partner) => partner.id !== partnerId && partner.status === "active");
    if (status === "active" && hasOtherActiveRelationship) {
      setActiveTopSheet("relationshipLocked");
      return;
    }

    setPartners((prev) => prev.map((partner) => {
      if (partner.id !== partnerId) return partner;
      return { ...partner, status, endedAt: status === "ended" ? todayISO() : partner.endedAt };
    }));
    if (status === "active") setSelectedPartnerId(partnerId);
  }

  return (
    <div className="min-h-screen bg-slate-200/70 text-slate-950">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-[#f8f5f2] shadow-2xl shadow-slate-950/10">
        <div className="min-h-screen overflow-hidden bg-[#f8f5f2] pb-20">
          {currentPage !== "memories" && !isExploreDetail ? (
            <AppHeader
              pageMeta={pageMeta}
              onAddClick={handleHeaderAdd}
              onTitleClick={showPageMeta}
              onNotificationsClick={openNotifications}
              showActions={currentPage !== "account" && currentPage !== "explore"}
              hasUnread={hasUnreadNotifications}
            />
          ) : null}

          <main className="relative z-10 px-3 py-4">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route index element={<Navigate to="/whispers" replace />} />
                <Route path="/" element={<Navigate to="/whispers" replace />} />
                <Route
                  path="/timeline"
                  element={
                    <TimelinePage
                      events={events}
                      highlights={selectedPartnerHighlights}
                      partners={partners}
                      selectedPartnerId={selectedPartnerId}
                      selectedPartner={selectedPartner}
                      onRemoveHighlight={removeHighlight}
                      onOpenMemory={(memoryId) => navigate(`/memories/${memoryId}`)}
                    />
                  }
                />
                <Route
                  path="/memories/:id"
                  element={
                    <MemoryDetailPage
                      memories={events}
                      onToggleVisibility={toggleMemoryVisibility}
                      onSetCover={setMemoryCover}
                      onDeleteMemory={deleteMemory}
                    />
                  }
                />
                <Route
                  path="/explore/:id"
                  element={
                    <ExploreDetailPage
                      publicMemories={publicMemories}
                      activeRelationshipId={activePartner?.id || ""}
                      inspirationRecords={inspirationRecords}
                      onAddToWhispers={addPublicMemoryToWhispers}
                    />
                  }
                />
                <Route
                  path="/explore"
                  element={
                    <ExplorePage publicMemories={publicMemories} />
                  }
                />
                <Route
                  path="/whispers"
                  element={
                    <WhispersPage
                      openTodos={openTodos}
                      doneTodos={doneTodos}
                      onHighlightTodo={highlightTodo}
                      onMarkDone={markDone}
                      onRemoveTodo={removeTodo}
                      selectedPartner={selectedPartner}
                    />
                  }
                />
                <Route
                  path="/account"
                  element={
                    <AccountPage
                      userProfile={userProfile}
                      onUpdateProfile={setUserProfile}
                      eventsCount={selectedPartnerEvents.length}
                      relationshipsCount={partners.length}
                      partners={partners}
                      selectedPartnerId={selectedPartnerId}
                      inspiredCountByPartner={inspiredCountByPartner}
                      onSelectPartner={setSelectedPartnerId}
                      onAddPartner={addPartner}
                      onUpdatePartnerStatus={updatePartnerStatus}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/whispers" replace />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>

        <NavBar />

        <AnimatePresence>
          {activeTopSheet === "add" ? (
            <TopSheet onClose={closeTopSheet}>
              <AddTodoForm onAdd={addTodo} />
            </TopSheet>
          ) : null}

          {activeTopSheet === "notifications" ? (
            <TopSheet onClose={closeTopSheet}>
              <NotificationsList
                notifications={notifications}
                onRespondToRequest={respondToPartnerRequest}
                onMarkAllRead={markNotificationsRead}
              />
            </TopSheet>
          ) : null}

          {activeTopSheet === "meta" ? (
            <TopSheet onClose={closeTopSheet}>
              <PageMetaSheet text={pageMeta.subtitle} />
            </TopSheet>
          ) : null}

          {activeTopSheet === "relationshipLocked" ? (
            <TopSheet onClose={closeTopSheet}>
              <PageMetaSheet text="This relationship is read-only. Resume it or add a partner from Account when there is no active relationship." />
            </TopSheet>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {eventModalOpen ? (
            <AddEventForm
              seedTitle={seedTitle}
              onAdd={addEvent}
              onClose={() => setEventModalOpen(false)}
            />
          ) : null}

          {highlightWhisper ? (
            <AddHighlightModal
              whisper={highlightWhisper}
              onAdd={addHighlight}
              onClose={() => setHighlightWhisper(null)}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
