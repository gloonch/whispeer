import { useState } from "react";
import { motion } from "framer-motion";
import Card from "./Card.jsx";
import PartnerTimelineCard from "./PartnerTimelineCard.jsx";

export default function AccountPage({
  userProfile,
  onUpdateProfile,
  eventsCount,
  relationshipsCount,
  partners,
  selectedPartnerId,
  inspiredCountByPartner,
  onSelectPartner,
  onAddPartner,
  onUpdatePartnerStatus,
}) {
  const [profileImage, setProfileImage] = useState(userProfile.profileImage || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const passwordReady = !newPassword || (currentPassword.length >= 1 && newPassword.length >= 6);
  const imageActionLabel = profileImage ? "Change profile image" : "Upload profile image";

  function saveProfile(e) {
    e.preventDefault();
    onUpdateProfile({ ...userProfile, profileImage });
    setCurrentPassword("");
    setNewPassword("");
  }

  function updateProfileImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <motion.div key="account" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-5">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-3xl border border-white/70 bg-white/70 text-xl font-black text-slate-950 shadow-sm">
              {profileImage ? <img src={profileImage} alt="Profile" className="h-full w-full object-cover" /> : userProfile.name.slice(0, 1)}
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight text-slate-950">{userProfile.name}</h3>
              <p className="mt-1 text-sm font-bold text-slate-600">@{userProfile.username}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 p-4">
          <div className="rounded-2xl bg-white/70 p-3 text-center">
            <div className="text-xl font-black">{relationshipsCount}</div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">relationships</div>
          </div>
          <div className="rounded-2xl bg-white/70 p-3 text-center">
            <div className="text-xl font-black">{eventsCount}</div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">memories</div>
          </div>
        </div>
      </Card>

      <div className="mt-5">
        <PartnerTimelineCard
          partners={partners}
          selectedPartnerId={selectedPartnerId}
          inspiredCountByPartner={inspiredCountByPartner}
          onSelectPartner={onSelectPartner}
          onAddPartner={onAddPartner}
          onUpdatePartnerStatus={onUpdatePartnerStatus}
        />
      </div>

      <div className="mt-5 space-y-3">
        <Card className="p-4">
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-500">Profile settings</h3>
          <form onSubmit={saveProfile} className="mt-4 space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Username</span>
              <input
                value={userProfile.username}
                disabled
                className="h-12 w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm font-bold text-slate-500 outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Profile image</span>
              <span className="flex min-h-12 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 transition hover:border-slate-300">
                {imageActionLabel}
                <input type="file" accept="image/*" onChange={updateProfileImage} className="sr-only" />
              </span>
            </label>

            <div className="grid gap-2 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Current password</span>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:border-purple-300"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">New password</span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:border-purple-300"
                />
              </label>
            </div>

            <button
              disabled={!passwordReady}
              className={`h-12 w-full rounded-2xl px-4 text-sm font-black shadow-lg shadow-slate-950/15 ${
                passwordReady ? "bg-slate-950 text-white" : "cursor-not-allowed bg-slate-300 text-slate-500"
              }`}
            >
              Save profile
            </button>
            {!passwordReady ? <p className="text-xs font-bold text-slate-400">Enter your current password and a new password with at least 6 characters.</p> : null}
          </form>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-500">Privacy</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">This prototype keeps everything local in the preview. In production, this page can show export, invite, and privacy controls.</p>
        </Card>
      </div>
    </motion.div>
  );
}
