import React, { useState } from 'react';
import {
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Lock,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { useAdminStore } from '../../utils/adminStore';

interface AdminSecurityTabProps {
  onNotify: (message: string) => void;
}

export const AdminSecurityTab: React.FC<AdminSecurityTabProps> = ({ onNotify }) => {
  const { adminCredentials, updateAdminCredentials, resetDefaultCredentials } = useAdminStore();

  const [newUserId, setNewUserId] = useState(adminCredentials.id);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const cleanId = newUserId.trim();
    const cleanPwd = newPassword.trim();
    const cleanConfirm = confirmPassword.trim();

    if (!cleanId || cleanId.length < 3) {
      setFeedback({
        type: 'error',
        message: "L'ID Amministratore deve essere di almeno 3 caratteri.",
      });
      return;
    }

    if (!cleanPwd || cleanPwd.length < 4) {
      setFeedback({
        type: 'error',
        message: 'La nuova password deve contenere almeno 4 caratteri.',
      });
      return;
    }

    if (cleanPwd !== cleanConfirm) {
      setFeedback({
        type: 'error',
        message: 'La conferma password non coincide con la nuova password digitata.',
      });
      return;
    }

    const result = updateAdminCredentials(cleanId, cleanPwd);
    if (result.success) {
      setFeedback({
        type: 'success',
        message: result.message,
      });
      onNotify(`Credenziali admin aggiornate! ID: "${cleanId}"`);
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setFeedback({
        type: 'error',
        message: result.message,
      });
    }
  };

  const handleResetDefaults = () => {
    const result = resetDefaultCredentials();
    setNewUserId('Admin');
    setNewPassword('');
    setConfirmPassword('');
    setIsResetConfirmOpen(false);
    setFeedback({
      type: 'success',
      message: result.message,
    });
    onNotify('Credenziali ripristinate a ID "Admin" / Password "admin123"');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-[#0B192C]">
            Sicurezza & Credenziali Amministratore
          </h3>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 border border-emerald-300">
            Attivo & Protetto
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Modifica liberamente l'User ID e la Password di accesso al pannello amministrativo. Le modifiche sono immediatamente attive.
        </p>
      </div>

      {/* Current Credentials Overview Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0B192C] text-[#0A66C2] flex items-center justify-center">
              <KeyRound className="w-4 h-4 text-[#70B5F9]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Credenziali di Accesso Attualmente in Uso
              </h4>
              <p className="text-[11px] text-slate-500">
                Utilizza queste credenziali per i prossimi accessi
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            {adminCredentials.updatedAt || 'Aggiornato'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              User ID Attivo
            </span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono font-bold text-[#0B192C]">
                {adminCredentials.id}
              </span>
              <span className="text-[10px] bg-blue-100 text-[#0A66C2] font-semibold px-2 py-0.5 rounded">
                Case-Insensitive
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Password Attiva
              </span>
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="text-[10px] text-[#0A66C2] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
              >
                {showCurrentPassword ? (
                  <>
                    <EyeOff className="w-3 h-3" /> Nascondi
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3" /> Mostra
                  </>
                )}
              </button>
            </div>
            <span className="text-sm font-mono font-bold text-[#0B192C]">
              {showCurrentPassword ? adminCredentials.password : '••••••••••••'}
            </span>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-start gap-3 text-xs font-semibold ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">{feedback.message}</div>
        </div>
      )}

      {/* Change Credentials Form */}
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <UserCheck className="w-4 h-4 text-[#0A66C2]" />
          <h4 className="text-sm font-bold text-slate-900">
            Modifica User ID e Password
          </h4>
        </div>

        <div className="space-y-4">
          {/* New User ID */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nuovo User ID (Nome Utente Amministratore)
            </label>
            <input
              type="text"
              value={newUserId}
              onChange={(e) => setNewUserId(e.target.value)}
              placeholder="Es. Admin, direzione, sicurezza"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 text-sm font-medium"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              L'ID è utilizzabile sia in minuscolo che maiuscolo durante il login.
            </p>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nuova Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Inserisci la nuova password (min. 4 caratteri)"
                required
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 text-sm font-medium"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                title={showNewPassword ? 'Nascondi password' : 'Mostra password'}
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Conferma Nuova Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Digita nuovamente la nuova password"
                required
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 text-sm font-medium"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                title={showConfirmPassword ? 'Nascondi password' : 'Mostra password'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0B192C] hover:bg-[#081220] text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#0A66C2]" />
            <span>Salva Nuove Credenziali</span>
          </button>

          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Ripristina Default (Admin / admin123)</span>
          </button>
        </div>
      </form>

      {/* Confirmation Dialog for Reset Defaults */}
      {isResetConfirmOpen && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900">
              <strong className="block text-amber-950 font-bold mb-0.5">
                Confermi il ripristino delle credenziali predefinite?
              </strong>
              L'ID tornerà ad essere <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">Admin</code> e la password tornerà ad essere <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">admin123</code>.
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-amber-100/80 cursor-pointer"
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs cursor-pointer"
            >
              Sì, Ripristina (Admin / admin123)
            </button>
          </div>
        </div>
      )}

      {/* Info note */}
      <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-start gap-3 text-xs text-slate-700">
        <ShieldCheck className="w-4 h-4 text-[#0A66C2] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#0B192C] font-semibold block mb-0.5">
            Sicurezza Produzione & Pronti per il Live:
          </strong>
          Le nuove credenziali vengono salvate immediatamente nello store locale protetto. Al prossimo accesso non verrà mostrato alcun errore o finestra di test.
        </div>
      </div>
    </div>
  );
};
