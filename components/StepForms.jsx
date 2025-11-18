import React from 'react'

export default function StepForms({step, data, update}){
  if(step === 0){
    return (
      <>
        <label className="label">Öğretim Programı</label>
        <input className="input" value={data.program} onChange={e=> update({program:e.target.value})} placeholder="Örn: MEB 5. Sınıf Fen" />

        <div className="form-row">
          <div style={{flex:1}}>
            <label className="label">Sınıf</label>
            <input className="input" value={data.grade} onChange={e=> update({grade:e.target.value})} placeholder="Örn: 5" />
          </div>
          <div style={{flex:1}}>
            <label className="label">(Opsiyonel) Süre / Not</label>
            <input className="input" value={data.duration || ''} onChange={e=> update({duration: e.target.value})} placeholder="Toplam süre veya puan" />
          </div>
        </div>
      </>
    )
  }

  if(step === 1){
    return (
      <>
        <label className="label">Konu</label>
        <input className="input" value={data.topic} onChange={e=> update({topic:e.target.value})} placeholder="Örn: Fotosentez" />

        <label className="label">Öğrenme Çıktıları (Add -> Enter)</label>
        <OutcomeList outcomes={data.outcomes} update={update} />
      </>
    )
  }

  if(step === 2){
    return (
      <>
        <label className="label">Soru Türleri - adet girin</label>
        <div className="form-row">
          <div style={{flex:1}}>
            <label className="label">Çoktan Seçmeli</label>
            <Counter value={data.mcq} onChange={v=> update({mcq:v})} />
          </div>
          <div style={{flex:1}}>
            <label className="label">Boşluk Doldurma</label>
            <Counter value={data.fill} onChange={v=> update({fill:v})} />
          </div>
          <div style={{flex:1}}>
            <label className="label">Doğru / Yanlış</label>
            <Counter value={data.tf} onChange={v=> update({tf:v})} />
          </div>
        </div>
      </>
    )
  }

  if(step === 3){
    return (
      <>
        <label className="label">Bloom Taksonomisi (hedef seviye)</label>
        <input className="input" value={data.bloom} onChange={e=> update({bloom:e.target.value})} placeholder="Örn: Anlama / Uygulama" />

        <label className="label">Ek Kriterler (zorluk, değerlendirme, yönergeler)</label>
        <textarea className="input" value={data.criteria} onChange={e=> update({criteria:e.target.value})} placeholder="Varsa ek notlar" />
      </>
    )
  }

  // step 4: preview (önizle)
  return (
    <>
      <label className="label">Girdi Önizleme</label>
      <div className="result-box">
        <strong>Program:</strong> {data.program||'-'} <br/>
        <strong>Sınıf:</strong> {data.grade||'-'} <br/>
        <strong>Konu:</strong> {data.topic||'-'} <br/>
        <strong>Çıktılar:</strong>
        <ul className="list">
          {data.outcomes.length ? data.outcomes.map((o,i)=>(<li key={i}>{o}</li>)) : <li>-</li>}
        </ul>
        <strong>Soru Türleri:</strong> Çoktan Seçmeli {data.mcq}, Boşluk {data.fill}, D/Y {data.tf} <br/>
        <strong>Bloom:</strong> {data.bloom||'-'} <br/>
        <strong>Ek kriterler:</strong> {data.criteria||'-'}
      </div>
    </>
  )
}

function Counter({value, onChange}){
  return (
    <div className="counter">
      <button onClick={()=> onChange(Math.max(0, value-1))}>-</button>
      <div style={{minWidth:24,textAlign:'center'}}>{value}</div>
      <button onClick={()=> onChange(value+1)}>+</button>
    </div>
  )
}

class OutcomeList extends React.Component{
  constructor(props){ super(props); this.state = {text:''} }
  add = () => {
    const v = this.state.text.trim()
    if(!v) return
    const arr = [...(this.props.outcomes||[]), v]
    this.props.update({outcomes: arr})
    this.setState({text:''})
  }
  remove = (i) => {
    const arr = this.props.outcomes.filter((_,idx)=> idx !== i)
    this.props.update({outcomes: arr})
  }
  onKey = (e) => { if(e.key === 'Enter'){ e.preventDefault(); this.add() } }
  render(){
    return (
      <>
        <div style={{display:'flex',gap:8}}>
          <input className="input" value={this.state.text} onChange={e=> this.setState({text:e.target.value})} onKeyDown={this.onKey} placeholder="Yeni çıktı yazıp Enter'a basın" />
          <button className="btn small" onClick={this.add}>Ekle</button>
        </div>
        <ul className="list">
          {(this.props.outcomes||[]).map((o,i)=>(
            <li key={i}>{o} <button className="small-x" onClick={()=>this.remove(i)}>x</button></li>
          ))}
        </ul>
      </>
    )
  }
}
