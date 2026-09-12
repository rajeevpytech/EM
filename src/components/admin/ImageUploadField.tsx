import React, { useRef, useState } from 'react';
import { Upload, RotateCcw, CheckCircle2, Image as ImageIcon, Link2, AlertCircle } from 'lucide-react';

interface ImageUploadFieldProps {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  value: string;
  defaultValue: string;
  onChangeUrl: (url: string) => void;
  onUploadFile: (file: File) => void;
  onReset?: () => void;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  id,
  title,
  subtitle,
  badge,
  value,
  defaultValue,
  onChangeUrl,
  onUploadFile,
  onReset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const isCustom = value !== defaultValue;
  const isBase64 = value && value.startsWith('data:');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setImageError(false);
      onUploadFile(file);
    }
    // Clear input so the same file can be re-selected if desired
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFileName(file.name);
      setImageError(false);
      onUploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
      {/* Header Info */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-[#0B192C]">{title}</h4>
            {badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0A66C2] uppercase border border-blue-100">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          {isCustom && onReset && (
            <button
              type="button"
              onClick={() => {
                setUploadedFileName(null);
                setImageError(false);
                onReset();
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-[#0B192C] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-slate-200"
              title="Ripristina l'immagine predefinita di fabbrica"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Ripristina</span>
            </button>
          )}

          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 ${
              isBase64
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : isCustom
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {isBase64 ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>File Locale dal PC</span>
              </>
            ) : isCustom ? (
              <span>URL Personalizzato</span>
            ) : (
              <span>Predefinita</span>
            )}
          </span>
        </div>
      </div>

      {/* Grid: Preview on Left, Upload Controls on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Preview Thumbnail */}
        <div className="md:col-span-4 aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-200 shadow-inner relative group">
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center text-slate-400">
              <AlertCircle className="w-6 h-6 text-amber-500 mb-1" />
              <span className="text-[11px] font-medium">Impossibile caricare l'anteprima</span>
            </div>
          ) : (
            <img
              src={value}
              alt={title}
              className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
              onLoad={() => setImageError(false)}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[10px] font-mono pointer-events-none">
            <span className="bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">Anteprima Live</span>
            {uploadedFileName && (
              <span className="truncate max-w-[120px] bg-emerald-950/80 text-emerald-300 px-1.5 py-0.5 rounded">
                {uploadedFileName}
              </span>
            )}
          </div>
        </div>

        {/* Upload Controls & URL */}
        <div className="md:col-span-8 space-y-3">
          {/* Drag & Drop Upload Zone with Prominent Button */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-xl p-3.5 sm:p-4 text-center transition-all ${
              isDragging
                ? 'border-[#0A66C2] bg-blue-50/70 scale-[1.01]'
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/60'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* Main Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
                id={`btn-upload-${id}`}
              >
                <Upload className="w-4 h-4" />
                <span>Carica Immagine dal Computer</span>
              </button>

              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                oppure trascina qui il file
              </span>
            </div>

            {/* Hidden native input */}
            <input
              ref={fileInputRef}
              id={`file-input-${id}`}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />

            <p className="text-[11px] text-slate-500 mt-2">
              Formati consigliati: JPG, PNG, WebP o SVG (dimensione max 10MB)
            </p>

            {uploadedFileName && (
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold">Caricato:</span>
                <span className="font-mono text-[11px] truncate max-w-[220px]">{uploadedFileName}</span>
              </div>
            )}
          </div>

          {/* Direct URL / Local Path Input */}
          <div>
            <label
              htmlFor={`url-input-${id}`}
              className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5"
            >
              <Link2 className="w-3 h-3 text-slate-400" />
              <span>URL Immagine o Percorso Locale Diretto</span>
            </label>
            <input
              id={`url-input-${id}`}
              type="text"
              value={value}
              onChange={(e) => {
                setImageError(false);
                onChangeUrl(e.target.value);
              }}
              placeholder="es. /hero-milan.jpg oppure https://images.unsplash.com/..."
              className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
