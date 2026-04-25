import { PHOTO_COVERS } from "../data/appData.js";

export function slugLabel(value = "") {
  return String(value).split("_").join(" ");
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function formatDate(value) {
  if (!value) return "No date";

  const [year, month, day] = String(value).split("-").map(Number);
  const safeDate = year && month && day ? new Date(year, month - 1, day) : new Date(value);

  if (Number.isNaN(safeDate.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(safeDate);
}

export function daysSince(value) {
  const start = new Date(value);
  if (Number.isNaN(start.getTime())) return 0;

  const diff = Date.now() - start.getTime();
  return Math.max(0, Math.floor(diff / 86400000));
}

export function getEventCover(event) {
  const photos = Array.isArray(event?.photos) ? event.photos : [];
  const coverPhoto = photos.find((photo) => photo.id === event?.coverPhotoId);
  return coverPhoto?.coverClass || photos[photos.length - 1]?.coverClass || PHOTO_COVERS[0];
}

export function getEventCoverImage(event) {
  const photos = Array.isArray(event?.photos) ? event.photos : [];
  const coverPhoto = photos.find((photo) => photo.id === event?.coverPhotoId);
  return coverPhoto?.imageUrl || photos[photos.length - 1]?.imageUrl || event?.imageUrl || "";
}

export function makeDefaultPhotos() {
  const index = Math.abs(Date.now()) % PHOTO_COVERS.length;
  return [{ id: `photo_${Date.now()}`, coverClass: PHOTO_COVERS[index] }];
}
