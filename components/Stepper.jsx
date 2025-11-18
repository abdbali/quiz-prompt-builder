'use client';

import React, { useState } from 'react'
import StepForms from './StepForms'
import { normalizeAll } from '../lib/normalize'

const STEPS = [
  'Program & Sınıf',
  'Konu & Öğrenme Çıktıları',
  'Soru Tipleri',
  'Bloom & Ek Kriter',
  'Önizle / Oluştur'
]

export default function Stepper(){
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    program: '',
    grade: '',
    topic: '',
    outcomes: [],
    mcq: 0, fill: 0, tf: 0,
    bloom: '', criteria: ''
  })
  const [prompt, setPrompt] = useState('')

  const update = (patch) => setData(prev => ({...prev, ...patch}))

  const next = () => setStep(s => Math.min(STEPS.length -1, s+1))
  const prev = () => setStep(s => Math.max(0, s-1))

  const generate = () => {
    // normalize text fields (trim, sentence case, fix punctuation)
    const normalized = normalizeAll({
      program: data.program,
      topic: data.topic,
      outcomes: data.outcomes,
      criteria: data.criteria
    })

    const template = [
`Aşağıdaki öğretim verilerine dayanarak öğretmen için pedagojik açıdan uygun, seviyeye göre ayarlanmış ve ölçülebilir bir quiz hazırla.`,
`Öğretim Programı: ${normalized.program || '-' }`,
`Sınıf: ${data.grade || '-'}`,
`Konu: ${normalized.topic || '-'}`,
`Öğrenme Çıktıları: ${normalized.outcomes.length ? normalized.outcomes.join(' / ') : '-'}`,
`Soru Tipleri: Çoktan Seçmeli: ${data.mcq}, Boşluk Doldurma: ${data.fill}, Doğru/Yanlış: ${data.tf}`,
`Bloom Taksonomisi: ${data.bloom || '-' }`,
`Ek Kriterler: ${normalized.criteria || '-' }`,
`İstenen çıktı: Her soru için: kısa yönerge, soru metni, (varsa) seçenekler, doğru cevap, ve 1-2 cümle puanlama/geri bildirim notu ver. Soruları kolaydan zora doğru düzenle ve toplam puanlama önerisi ekle.`
    ].join('\n\n')

    setPrompt(template)
    next()
  }

  return (
    <div className="card">
      <div className="header">
        <div className="title">Quiz Prompt Oluşturucu - Adım {step+1}/{STEPS.length}</div>
        <div style={{fontSize:13,color:'#64748b'}}>Adım adım doldurun — sonunda otomatik prompt üretilir</div>
      </div>

      <div className="steps">
        {STEPS.map((s,i)=>(
          <div key={s} className={`step-pill ${i===step?'active':''}`}>{s}</div>
        ))}
      </div>

      <StepForms step={step} data={data} update={update} />

      <div className="btn-row">
        {step>0 && <button className="btn small" onClick={prev}>Geri</button>}
        {step < STEPS.length - 1 && <button className="btn primary small" onClick={next}>İleri</button>}
        {step === STEPS.length - 1 && (
          <>
            <button className="btn" onClick={() => { setPrompt(''); setData({
              program: '', grade:'', topic:'', outcomes:[], mcq:0, fill:0, tf:0, bloom:'', criteria:''
            })}}>Temizle</button>
            <button className="btn primary" onClick={generate}>Düzelt & Prompt Oluştur</button>
          </>
        )}
      </div>

      {prompt && (
        <div className="result-box">
          <strong>Oluşan Prompt (kopyalayabilirsiniz):</strong>
          <div style={{marginTop:8}}>{prompt}</div>
        </div>
      )}

      <div className="footer">Minimal. GitHub’a push → Vercel ile deploy hazır.</div>
    </div>
  )
}
