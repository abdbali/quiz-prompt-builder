export function sentenceCase(s){
  if(!s) return s
  s = s.trim()
  return s.split(/([.!?]\s+)/).map((part,idx)=>{
    if(idx % 2 === 0){
      const p = part.trim()
      if(!p) return ''
      return p.charAt(0).toUpperCase() + p.slice(1)
    }
    return part
  }).join('')
}

export function tidy(s){
  if(!s) return s
  s = s.replace(/\s+/g,' ').replace(/\s+([,.;:!?])/g,'$1').trim()
  if(s && !/[.!?]$/.test(s) && s.length < 120) s = s + '.'
  return s
}

export function normalizeAll({program, topic, outcomes = [], criteria}){
  const prog = tidy(sentenceCase(program || ''))
  const top = tidy(sentenceCase(topic || ''))
  const crit = tidy(sentenceCase(criteria || ''))
  const outs = (outcomes||[]).map(o => tidy(sentenceCase(o)))
  return { program: prog, topic: top, outcomes: outs, criteria: crit }
}
