import React from 'react';

export default function StudyPodWidget() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.05)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-slate-900">Active Study Pod: CS 301</span>
        </div>
        <span className="font-mono text-xs text-slate-400 font-semibold">3 online</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2 overflow-hidden">
          <img
            alt="Student 1"
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJalkyI6KpVTakp87egqT9dtFmnZsGfDcPyr8sgapgCu93CtZf4mu-4tCtEsnEFWkoNsvrvq38XbUHANIj0aCGASnFC0RIkv_9vH1KV8CFTWD5NUNLOttEhiHyzJ5zgcNZggKTOs9W9z8-iDq6VDgAXUw8fjkNfck4pPXVNy8DayKGRdhSSNzQU2JlEiHiW9dgAtZ5_WA-yNwA2cznqmM1mdx87MyJIgU2YqZYMVkKx7nvcehUn3Qj-g"
          />
          <img
            alt="Student 2"
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEI_vSFNnP7QSK7yk_kNI1qG5u43YEtmR2qphrGnqqv21nNSQrbzzp1Ivz0S0UlZIYKJTgk8eNgIzi9_GgpwDN-b6kt5KNB3W1zxBNYZI0P9i3eOPuh4rA3t5Ku_3WiptogYIXpPGzhV4zST4FS4ZJZZL34b4mlowXkDz0U2sQnFncXHRZsrW6d0FS6bdX55aaKShLOHCyoGBxWIZk47oaRvEjADnTavXhCXgxFs_hlai76ph6PmDXuA"
          />
          <img
            alt="Student 3"
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa_uKFZrINnxd9e-ueDRXskFzG_gg0FDqmOBF36s-0FqMrf48iWFv5c0AUbL70mUgX23MX219rYi-1eAn_1hAm1JXlt0Zpu1Z9iPUlwGLfIjqmPss6lCWEyAWAUxqssTk-8R3y03QLdM4yFMkz5yA1q9Ij7pcWI-j_CDeHAafg3cpFH0ZMN9SP2ve8i8zyBcDDbdQgctlRlLeVh_ZrFjL7BqPMKoSXqSrRvWJAuRiZS9FIF6EokQgtVQ"
          />
        </div>

        <button
          onClick={() => alert('Launching Discord Study Pod voice room for CS 301...')}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-700 transition-all text-xs font-semibold flex items-center gap-1.5 border border-slate-200 cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">forum</span>
          <span>Join Discord Pod</span>
        </button>
      </div>
    </div>
  );
}
