import { useState, useEffect, useCallback, useMemo, useRef } from "react";

// ─── SUPABASE ─────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://zwftcovxxirzzqdmkymc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_NTyCZ4iyHpO7kzvZRVGa6A_YEjsXPhU";

async function sbRequest(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Supabase error (${res.status}): ${errText}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const sbSelect = (table, query = "") => sbRequest(`${table}?select=*${query}`);
const sbInsert = (table, row) => sbRequest(table, { method: "POST", body: JSON.stringify(row) });
const sbDelete = (table, id) => sbRequest(`${table}?id=eq.${id}`, { method: "DELETE" });
const sbUpdate = (table, id, patch) => sbRequest(`${table}?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(patch) });

// Convertit une ligne Supabase (snake_case) en objet JS (camelCase) pour un track
const trackFromDb = r => ({
  id: r.id, title: r.title, genre: r.genre, cover: r.cover,
  audioUrl: r.audio_url, audioName: r.audio_name, duration: r.duration,
  producer: r.producer, plays: r.plays, downloads: r.downloads,
  favorites: r.favorites, shares: r.shares, avgListenSec: r.avg_listen_sec,
  active: r.active, exclusive: r.exclusive, uploadedAt: r.uploaded_at,
  topCountry: null,
});
// Convertit un track JS (camelCase) en ligne Supabase (snake_case) pour insertion
const trackToDb = t => ({
  title: t.title, genre: t.genre, cover: t.cover, audio_url: t.audioUrl,
  audio_name: t.audioName, duration: t.duration, producer: t.producer,
  plays: 0, downloads: 0, favorites: 0, shares: 0, avg_listen_sec: 0,
  active: true, exclusive: false,
});

// ─── CONSTANTES ───────────────────────────────────────────────────────────────
const SUPER_ADMINS = ["kabrejonathan21@gmail.com", "jonathankabre98@gmail.com"];
const ACCENT = "#9B59FF";
const GENRES = ["Drill","Hip-Hop","Trap","Afrobeat","Piano","Love","Sad","Gospel","Amapiano","Lo-Fi","Dancehall"];
const GENRE_ICON = {Drill:"⚡","Hip-Hop":"🎤",Trap:"🔥",Afrobeat:"🌍",Piano:"🎹",Love:"❤️",Sad:"💧",Gospel:"✨",Amapiano:"🎺","Lo-Fi":"🌙",Dancehall:"🇯🇲"};
const COUNTRIES = [
  {code:"FR",name:"France",flag:"🇫🇷"},{code:"BE",name:"Belgique",flag:"🇧🇪"},{code:"CH",name:"Suisse",flag:"🇨🇭"},
  {code:"CA",name:"Canada",flag:"🇨🇦"},{code:"US",name:"États-Unis",flag:"🇺🇸"},{code:"GB",name:"Royaume-Uni",flag:"🇬🇧"},
  {code:"CI",name:"Côte d'Ivoire",flag:"🇨🇮"},{code:"SN",name:"Sénégal",flag:"🇸🇳"},{code:"CM",name:"Cameroun",flag:"🇨🇲"},
  {code:"CD",name:"RD Congo",flag:"🇨🇩"},{code:"NG",name:"Nigéria",flag:"🇳🇬"},{code:"GH",name:"Ghana",flag:"🇬🇭"},
  {code:"MA",name:"Maroc",flag:"🇲🇦"},{code:"DZ",name:"Algérie",flag:"🇩🇿"},{code:"TN",name:"Tunisie",flag:"🇹🇳"},
  {code:"BR",name:"Brésil",flag:"🇧🇷"},{code:"ZA",name:"Afrique du Sud",flag:"🇿🇦"},{code:"IN",name:"Inde",flag:"🇮🇳"},
  {code:"JP",name:"Japon",flag:"🇯🇵"},{code:"DE",name:"Allemagne",flag:"🇩🇪"},
];

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,8);
const fmtN = n => n>=1e6?`${(n/1e6).toFixed(1)}M`:n>=1e3?`${(n/1e3).toFixed(1)}K`:String(n||0);
const fmtMoney = n => `${Number(n).toLocaleString("fr-FR",{maximumFractionDigits:0})} €`;
const nowISO = () => new Date().toISOString();
const fmtDate = iso => iso?new Date(iso).toLocaleDateString("fr-FR",{day:"2-digit",month:"short",year:"numeric"}):"—";
const fmtDT = iso => iso?new Date(iso).toLocaleString("fr-FR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):"—";
const daysAgo = d => new Date(Date.now()-d*864e5);

// ─── STORAGE ──────────────────────────────────────────────────────────────────
async function sGet(key,shared=true){try{const r=await window.storage.get(key,shared);return r?.value?JSON.parse(r.value):null;}catch{return null;}}
async function sSet(key,val,shared=true){try{await window.storage.set(key,JSON.stringify(val),shared);return true;}catch{return false;}}
async function sDel(key,shared=false){try{await window.storage.delete(key,shared);}catch{}}

// ─── ÉTAT INITIAL VIDE ────────────────────────────────────────────────────────
const EMPTY_STATE = {
  users: [],
  tracks: [],
  admins: [],
  events: [{id:uid(), text:"🚀 Serveur BeatMarket initialisé.", icon:"🚀", at:nowISO()}],
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const G = {
  bg:"#06030F",card:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)",
  text:"rgba(255,255,255,0.85)",muted:"rgba(255,255,255,0.35)",dim:"rgba(255,255,255,0.15)",
};
const inpStyle={width:"100%",padding:"11px 14px",borderRadius:13,border:`1px solid ${G.border}`,background:"rgba(255,255,255,0.05)",color:"white",fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"inherit"};

const css=`
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
button,input,select,textarea{font-family:inherit;}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:4px;}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
@keyframes blink{0%,100%{background:rgba(0,212,140,0.8)}50%{background:rgba(0,212,140,0.2)}}
`;

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
const Card=({children,style,onClick})=>(
  <div onClick={onClick} style={{background:G.card,border:`1px solid ${G.border}`,borderRadius:16,padding:14,...style,cursor:onClick?"pointer":undefined}}>
    {children}
  </div>
);
const Pill=({children,color="#9B59FF"})=>(
  <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:"2px 8px",borderRadius:10,fontSize:10,fontWeight:800,color,background:`${color}20`,border:`1px solid ${color}40`}}>{children}</span>
);
const SectionHead=({title,sub,right})=>(
  <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",margin:"20px 0 10px"}}>
    <div><div style={{color:"white",fontSize:14,fontWeight:800}}>{title}</div>{sub&&<div style={{color:G.muted,fontSize:11,marginTop:2}}>{sub}</div>}</div>
    {right}
  </div>
);
const Empty=({text,sub})=>(
  <div style={{textAlign:"center",padding:"36px 20px"}}>
    <div style={{fontSize:32,marginBottom:10}}>📭</div>
    <div style={{color:"white",fontSize:13.5,fontWeight:700,marginBottom:6}}>{text}</div>
    {sub&&<div style={{color:G.muted,fontSize:12,lineHeight:1.6}}>{sub}</div>}
  </div>
);
const Bar=({pct,color=ACCENT})=>(
  <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:4,overflow:"hidden"}}>
    <div style={{height:"100%",width:`${Math.min(100,Math.max(0,pct))}%`,background:`linear-gradient(90deg,${color},${color}99)`,borderRadius:4,transition:"width 0.6s ease"}}/>
  </div>
);
const Divider=()=><div style={{borderBottom:`1px solid ${G.border}`}}/>;

function StatCard({icon,label,value,sub,accent=ACCENT,live}){
  return(
    <Card style={{display:"flex",flexDirection:"column",gap:6,minHeight:90}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:17}}>{icon}</span>
        {live&&<span style={{width:7,height:7,borderRadius:"50%",animation:"blink 1.5s infinite",background:"rgba(0,212,140,0.8)"}}/>}
      </div>
      <div style={{color:"white",fontSize:22,fontWeight:900,letterSpacing:-0.5,lineHeight:1}}>{value}</div>
      <div style={{color:G.muted,fontSize:10.5,fontWeight:600}}>{label}</div>
      {sub&&<div style={{color:accent,fontSize:10,fontWeight:700}}>{sub}</div>}
    </Card>
  );
}

function Toast({msg,kind}){
  const c={info:ACCENT,success:"#00D48C",error:"#FF3B5C",warn:"#FFB800"}[kind]||ACCENT;
  return(
    <div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",zIndex:9999,background:"rgba(8,5,18,0.97)",border:`1px solid ${c}55`,borderRadius:14,padding:"10px 18px",color:"white",fontSize:13,fontWeight:700,boxShadow:`0 8px 32px rgba(0,0,0,0.6)`,animation:"slideDown 0.2s ease",maxWidth:"92vw",textAlign:"center"}}>
      {msg}
    </div>
  );
}

function Modal({onClose,children,maxW=440}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(10px)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#0C0818",border:`1px solid ${G.border}`,borderRadius:20,padding:20,width:"100%",maxWidth:maxW,maxHeight:"88vh",overflowY:"auto",animation:"fadeUp 0.22s ease"}}>
        {children}
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({onLogin,admins}){
  const [email,setEmail]=useState("");
  const [err,setErr]=useState("");
  const all=useMemo(()=>[...SUPER_ADMINS,...admins.map(a=>a.email)],[admins]);
  const go=()=>{
    const e=email.trim().toLowerCase();
    if(!e){setErr("Entre ton email.");return;}
    if(!all.includes(e)){setErr("Accès refusé. Cet email n'est pas administrateur.");return;}
    onLogin({email:e,role:SUPER_ADMINS.includes(e)?"super":"admin"});
  };
  return(
    <div style={{width:"100%",height:"100dvh",background:`radial-gradient(ellipse at 50% 0%,rgba(155,89,255,0.22),transparent 65%),${G.bg}`,display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"inherit"}}>
      <style>{css}</style>
      <div style={{width:"100%",maxWidth:360,animation:"fadeUp 0.3s ease"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{width:68,height:68,borderRadius:20,background:`linear-gradient(135deg,${ACCENT},#5533CC)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",boxShadow:`0 0 40px ${ACCENT}55`}}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h1 style={{color:"white",fontSize:22,fontWeight:900,margin:"0 0 6px"}}>Serveur Central</h1>
          <p style={{color:G.muted,fontSize:12.5,margin:0}}>BeatMarket · Panneau Administrateur</p>
        </div>
        <label style={{color:G.muted,fontSize:10.5,fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:7}}>Email administrateur</label>
        <input value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="ton.email@gmail.com" style={{...inpStyle,marginBottom:err?8:14,border:`1px solid ${err?"#FF3B5C55":G.border}`}}/>
        {err&&<p style={{color:"#FF6B85",fontSize:12,margin:"0 0 12px"}}>{err}</p>}
        <button onClick={go} style={{width:"100%",padding:14,borderRadius:16,background:`linear-gradient(90deg,${ACCENT},#7B3FE0)`,border:"none",color:"white",fontWeight:800,fontSize:14,cursor:"pointer",boxShadow:`0 8px 24px ${ACCENT}44`}}>
          Accéder au serveur →
        </button>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({state}){
  const {users,tracks,events}=state;
  const now=Date.now();
  const todayStart=new Date();todayStart.setHours(0,0,0,0);
  const active=(d)=>users.filter(u=>new Date(u.lastActive)>=daysAgo(d)).length;
  const newToday=users.filter(u=>new Date(u.createdAt)>=todayStart).length;
  const onlineNow=users.filter(u=>now-new Date(u.lastActive).getTime()<10*60*1000).length;
  const totalPlays=users.reduce((a,u)=>a+u.plays,0)+tracks.reduce((a,t)=>a+t.plays,0);
  const totalDL=users.reduce((a,u)=>a+u.downloads,0)+tracks.reduce((a,t)=>a+t.downloads,0);
  const totalAds=users.reduce((a,u)=>a+u.adsWatched,0);
  const tokEarned=users.reduce((a,u)=>a+u.tokensEarned,0);
  const tokSpent=users.reduce((a,u)=>a+u.tokensSpent,0);
  const premium=users.filter(u=>u.premium);
  const premiumToday=premium.filter(u=>u.premiumSince&&new Date(u.premiumSince)>=todayStart).length;
  const premiumWeek=premium.filter(u=>u.premiumSince&&new Date(u.premiumSince)>=daysAgo(7)).length;
  const conversion=users.length?((premium.length/users.length)*100).toFixed(1):"0.0";
  const revenue=premium.length*9.99;
  const adRevenue=totalAds*0.004;

  if(users.length===0&&tracks.length===0){
    return(
      <div style={{paddingBottom:32}}>
        <SectionHead title="Tableau de bord"/>
        <Card style={{textAlign:"center",padding:"40px 24px",marginBottom:12}}>
          <div style={{fontSize:48,marginBottom:14}}>🚀</div>
          <div style={{color:"white",fontSize:16,fontWeight:900,marginBottom:8}}>Serveur prêt</div>
          <div style={{color:G.muted,fontSize:13,lineHeight:1.8}}>
            Aucun utilisateur ni son pour l'instant.<br/>
            Les données s'afficheront ici dès que BeatMarket sera connecté à ce serveur.
          </div>
        </Card>
        <Card style={{background:`${ACCENT}0D`,border:`1px solid ${ACCENT}30`}}>
          <div style={{color:"white",fontSize:12.5,fontWeight:800,marginBottom:6}}>🔌 Prochaine étape</div>
          <div style={{color:G.muted,fontSize:12,lineHeight:1.7}}>Connecte ton app BeatMarket à Supabase ou Firebase, puis lie cette interface à la même base de données. Clique sur l'icône 🔌 en haut pour voir le guide.</div>
        </Card>
      </div>
    );
  }

  return(
    <div style={{paddingBottom:32}}>
      <SectionHead title="Tableau de bord" sub="Données en temps réel"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
        <StatCard icon="👥" label="Utilisateurs totaux" value={fmtN(users.length)} live/>
        <StatCard icon="🟢" label="En ligne maintenant" value={fmtN(onlineNow)} accent="#00D48C" live/>
        <StatCard icon="📅" label="Actifs aujourd'hui" value={fmtN(active(1))}/>
        <StatCard icon="📆" label="Actifs cette semaine" value={fmtN(active(7))}/>
        <StatCard icon="🗓️" label="Actifs ce mois" value={fmtN(active(30))}/>
<StatCard icon="✨" label="Nouveaux aujourd'hui" value={fmtN(newToday)} accent="#FFB800"/>
        <StatCard icon="🎧" label="Écoutes totales" value={fmtN(totalPlays)}/>
        <StatCard icon="⬇️" label="Téléchargements" value={fmtN(totalDL)}/>
        <StatCard icon="📺" label="Pubs regardées" value={fmtN(totalAds)} accent="#FF8C42"/>
        <StatCard icon="🪙" label="Jetons gagnés" value={fmtN(tokEarned)} accent="#FFD700"/>
        <StatCard icon="💸" label="Jetons utilisés" value={fmtN(tokSpent)} accent="#FFD700"/>
        <StatCard icon="🎵" label="Sons en bibliothèque" value={fmtN(tracks.length)}/>
      </div>
      <SectionHead title="Premium & Revenus"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
        <StatCard icon="👑" label="Abonnés Premium" value={fmtN(premium.length)} accent="#FFD700"/>
        <StatCard icon="🆕" label="Nouveaux Premium (jour)" value={fmtN(premiumToday)} accent="#FFD700"/>
        <StatCard icon="📈" label="Nouveaux Premium (sem.)" value={fmtN(premiumWeek)} accent="#FFD700"/>
        <StatCard icon="🔄" label="Taux de conversion" value={`${conversion}%`} accent="#FFD700"/>
        <StatCard icon="💰" label="Revenus Premium estimés" value={fmtMoney(revenue)} accent="#00D48C" sub="9,99 € / abonné"/>
        <StatCard icon="📺" label="Revenus Pub estimés" value={fmtMoney(adRevenue)} accent="#FF8C42" sub="CPM illustratif"/>
      </div>
      <SectionHead title="Activité récente"/>
      <Card style={{padding:0,overflow:"hidden"}}>
        {events.length===0?<Empty text="Aucune activité."/>:events.slice(0,10).map((ev,i)=>(
          <div key={ev.id}>
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px"}}>
              <span style={{fontSize:16}}>{ev.icon||"🔔"}</span>
              <span style={{color:G.text,fontSize:12.5,flex:1,lineHeight:1.4}}>{ev.text}</span>
              <span style={{color:G.dim,fontSize:10,whiteSpace:"nowrap"}}>{fmtDT(ev.at)}</span>
            </div>
            {i<Math.min(events.length,10)-1&&<Divider/>}
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── ADS PANEL ────────────────────────────────────────────────────────────────
function AdsPanel({state}){
  const {users}=state;
  const todayStart=new Date();todayStart.setHours(0,0,0,0);
  const total=users.reduce((a,u)=>a+u.adsWatched,0);
  const today=users.filter(u=>new Date(u.lastActive)>=todayStart).reduce((a,u)=>a+Math.round(u.adsWatched*0.12),0);
  const week=users.filter(u=>new Date(u.lastActive)>=daysAgo(7)).reduce((a,u)=>a+Math.round(u.adsWatched*0.45),0);
  const month=users.filter(u=>new Date(u.lastActive)>=daysAgo(30)).reduce((a,u)=>a+u.adsWatched,0);
  const premiumCount=users.filter(u=>u.premium).length;
  const revTotal=total*0.004;
  const revWeek=week*0.004;

  if(users.length===0) return(
    <div style={{paddingBottom:32}}>
      <SectionHead title="Analyse des publicités"/>
      <Card><Empty text="Aucune donnée pub" sub="Les statistiques de publicité apparaîtront dès que des utilisateurs seront enregistrés."/></Card>
    </div>
  );

  return(
    <div style={{paddingBottom:32}}>
      <SectionHead title="Analyse des publicités" sub="Revenus basés sur CPM illustratif (0,004 € / vue)"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
        <StatCard icon="📺" label="Pubs totales (all-time)" value={fmtN(total)} accent="#FF8C42"/>
        <StatCard icon="☀️" label="Pubs aujourd'hui" value={fmtN(today)} accent="#FF8C42" live/>
        <StatCard icon="📆" label="Pubs cette semaine" value={fmtN(week)} accent="#FF8C42"/>
        <StatCard icon="🗓️" label="Pubs ce mois" value={fmtN(month)} accent="#FF8C42"/>
        <StatCard icon="💵" label="Revenus pub (total)" value={fmtMoney(revTotal)} accent="#00D48C"/>
        <StatCard icon="📈" label="Revenus pub (semaine)" value={fmtMoney(revWeek)} accent="#00D48C"/>
        <StatCard icon="👑" label="Premium (sans pub)" value={fmtN(premiumCount)} accent="#FFD700" sub="Non exposés aux pubs"/>
        <StatCard icon="👥" label="Gratuits (exposés)" value={fmtN(users.length-premiumCount)} accent="#FF8C42"/>
      </div>
    </div>
  );
}

// ─── COUNTRIES ────────────────────────────────────────────────────────────────
function CountryPanel({state}){
  const {users}=state;
  const byCountry=useMemo(()=>{
    const m={};
    users.forEach(u=>{
      const k=u.country?.code;
      if(!k) return;
      if(!m[k]) m[k]={...u.country,users:0,premium:0,plays:0,downloads:0,ads:0};
      m[k].users++; if(u.premium) m[k].premium++;
      m[k].plays+=u.plays; m[k].downloads+=u.downloads; m[k].ads+=u.adsWatched;
    });
    return Object.values(m).sort((a,b)=>b.users-a.users);
  },[users]);
  const max=Math.max(1,...byCountry.map(c=>c.users));

  if(byCountry.length===0) return(
    <div style={{paddingBottom:32}}>
      <SectionHead title="Analyse par pays"/>
      <Card><Empty text="Aucune donnée pays" sub="Les pays s'afficheront dès que des utilisateurs s'inscriront dans BeatMarket."/></Card>
    </div>
  );

  return(
    <div style={{paddingBottom:32}}>
      <SectionHead title="Analyse par pays" sub={`${byCountry.length} pays actifs`}/>
      <Card style={{padding:0,overflow:"hidden"}}>
        {byCountry.map((c,i)=>(
          <div key={c.code}>
            <div style={{padding:"12px 14px"}}>
              <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:8}}>
                <span style={{fontSize:20}}>{c.flag}</span>
                <span style={{color:"white",fontSize:13.5,fontWeight:800,flex:1}}>{c.name}</span>
                <span style={{color:ACCENT,fontSize:12,fontWeight:800}}>{fmtN(c.users)} util.</span>
              </div>
              <Bar pct={(c.users/max)*100}/>
              <div style={{display:"flex",gap:14,marginTop:8,flexWrap:"wrap"}}>
                {[["Écoutes",fmtN(c.plays)],["DL",fmtN(c.downloads)],["Pubs",fmtN(c.ads)],["Premium",fmtN(c.premium)]].map(([l,v])=>(
                  <div key={l}><div style={{color:"white",fontSize:12,fontWeight:800}}>{v}</div><div style={{color:G.dim,fontSize:9.5}}>{l}</div></div>
                ))}
              </div>
            </div>
            {i<byCountry.length-1&&<Divider/>}
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── MUSIC LIBRARY ────────────────────────────────────────────────────────────

function isValidUrl(s){try{return s.startsWith("http://")||s.startsWith("https://");}catch{return false;}}

const UrlField=({label,icon,value,onChange,onBlur,status,onClear,placeholder,hint,isCover})=>(
  <div style={{marginBottom:14}}>
    <FLabel>{label}</FLabel>
    <div style={{position:"relative"}}>
      <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:16,pointerEvents:"none"}}>{icon}</span>
      <input
        value={value}
        onChange={e=>onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        style={{...inpStyle,paddingLeft:38,paddingRight:34,border:`1px solid ${status===true?"#00D48C55":status===false?"#FF3B5C55":G.border}`}}
      />
      {value&&(
        <button
          type="button"
          onClick={onClear}
          style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",width:22,height:22,borderRadius:"50%",border:"none",background:"rgba(255,255,255,0.1)",color:G.muted,fontSize:12,fontWeight:800,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}
          aria-label="Effacer le lien"
        >✕</button>
      )}
    </div>
    <div style={{color:G.dim,fontSize:10.5,marginTop:5,lineHeight:1.5}}>{hint}</div>
    {value.trim()&&status===true&&isCover&&(
      <img src={value.trim()} alt="preview" style={{width:"100%",maxHeight:140,objectFit:"cover",borderRadius:10,marginTop:8,border:`1px solid #00D48C33`}}/>
    )}
  </div>
);

function PublishModal({onClose,onPublish}){
  const [title,setTitle]=useState("");
  const [genre,setGenre]=useState(GENRES[0]);
  const [coverUrl,setCoverUrl]=useState("");
  const [audioUrl,setAudioUrl]=useState("");
  const [error,setError]=useState("");

  const clearCover=()=>setCoverUrl("");
  const clearAudio=()=>setAudioUrl("");

  const handlePublish=()=>{
    if(!title.trim()){setError("Ajoute un titre.");return;}
    setError("");
    onPublish({
      title:title.trim(),
      genre,
      cover:coverUrl.trim()||null,
      audioUrl:audioUrl.trim()||null,
      audioName:"",
      duration:180,
    });
  };

  const ok=title.trim().length>0;

  return(
    <Modal onClose={onClose}>
      <h3 style={{color:"white",fontSize:17,fontWeight:900,margin:"0 0 6px"}}>🎵 Publier un son</h3>
      <div style={{background:`${ACCENT}10`,border:`1px solid ${ACCENT}25`,borderRadius:11,padding:"9px 12px",marginBottom:18}}>
        <div style={{color:ACCENT,fontSize:10.5,fontWeight:800,marginBottom:3}}>📌 Comment obtenir une URL ?</div>
        <div style={{color:G.muted,fontSize:10.5,lineHeight:1.6}}>
          Va sur <span style={{color:"white",fontWeight:700}}>cloudinary.com</span> → Media Library → Upload ton fichier → clique dessus → copie l'URL.
        </div>
      </div>

      <UrlField
        label="1. URL de la cover (image)"
        icon="🖼️"
        value={coverUrl}
        onChange={setCoverUrl}
        onBlur={()=>{}}
        onClear={clearCover}
        status={null}
        placeholder="https://res.cloudinary.com/…/image.jpg"
        hint="Colle n'importe quelle URL d'image. Laisse vide si pas de cover."
      />

      <UrlField
        label="2. URL du fichier audio"
        icon="🎧"
        value={audioUrl}
        onChange={setAudioUrl}
        onBlur={()=>{}}
        onClear={clearAudio}
        status={null}
        placeholder="https://res.cloudinary.com/…/beat.mp3"
        hint="Colle n'importe quelle URL audio. Laisse vide si pas encore prêt."
      />

      <FLabel>3. Titre du son</FLabel>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Ex: Midnight Drip" style={{...inpStyle,marginBottom:14}}/>

      <FLabel>4. Style musical</FLabel>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
        {GENRES.map(g=>(
          <button key={g} onClick={()=>setGenre(g)} style={{padding:"7px 12px",borderRadius:12,border:"1.5px solid "+(genre===g?ACCENT+"88":G.border),background:genre===g?ACCENT+"20":"transparent",color:genre===g?"white":G.muted,fontSize:11.5,fontWeight:700,cursor:"pointer"}}>
            {GENRE_ICON[g]} {g}
          </button>
        ))}
      </div>

      {error&&<p style={{color:"#FF6B85",fontSize:12,margin:"0 0 12px"}}>{error}</p>}

      <button disabled={!ok} onClick={handlePublish} style={{width:"100%",padding:14,borderRadius:16,border:"none",background:ok?`linear-gradient(90deg,${ACCENT},#7B3FE0)`:"rgba(255,255,255,0.07)",color:ok?"white":G.muted,fontWeight:800,fontSize:14,cursor:ok?"pointer":"default"}}>
        🚀 Publier sur BeatMarket
      </button>
    </Modal>
  );
}
const FLabel=({children})=><label style={{color:G.muted,fontSize:10.5,fontWeight:700,letterSpacing:0.8,textTransform:"uppercase",display:"block",margin:"0 0 6px"}}>{children}</label>;

function TrackDetail({track,onClose}){
  return(
    <Modal onClose={onClose}>
      <div style={{display:"flex",gap:12,marginBottom:16,alignItems:"center"}}>
        <div style={{width:56,height:56,borderRadius:13,background:track.cover?`url(${track.cover}) center/cover`:"rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
          {!track.cover&&(GENRE_ICON[track.genre]||"🎵")}
        </div>
        <div>
          <div style={{color:"white",fontSize:16,fontWeight:900}}>{track.title}</div>
          <Pill>{GENRE_ICON[track.genre]} {track.genre}</Pill>
        </div>
      </div>
div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:14}}>
        {[["Écoutes",fmtN(track.plays)],["Téléchargements",fmtN(track.downloads)],["Favoris",fmtN(track.favorites)],["Partages",fmtN(track.shares)],["Tps moy. écoute",`${track.avgListenSec}s`],["Top pays",track.topCountry?`${track.topCountry.flag} ${track.topCountry.name}`:"—"]].map(([l,v])=>(
          <Card key={l} style={{padding:"10px 12px"}}>
            <div style={{color:G.dim,fontSize:9.5,fontWeight:700,textTransform:"uppercase",marginBottom:4}}>{l}</div>
            <div style={{color:"white",fontSize:13.5,fontWeight:800}}>{v}</div>
          </Card>
        ))}
      </div>
      <div style={{color:G.muted,fontSize:11,textAlign:"center"}}>Publié le {fmtDate(track.uploadedAt)}</div>
    </Modal>
  );
}

function MusicLibrary({state,setState,addEvent,toast}){
  const [showPublish,setShowPublish]=useState(false);
  const [genre,setGenre]=useState("Tous");
  const [query,setQuery]=useState("");
  const [detail,setDetail]=useState(null);
  const [playingId,setPlayingId]=useState(null);
  const [audioEl,setAudioEl]=useState(null);
  const {tracks}=state;

  const playTrack=(t)=>{
    if(audioEl){audioEl.pause();audioEl.src="";}
    if(playingId===t.id){setPlayingId(null);setAudioEl(null);return;}
    if(!t.audioUrl){return;}
    const a=new Audio(t.audioUrl);
    a.play().catch(()=>{});
    a.onended=()=>{setPlayingId(null);setAudioEl(null);};
    setAudioEl(a);
    setPlayingId(t.id);
  };
  const filtered=useMemo(()=>tracks.filter(t=>(genre==="Tous"||t.genre===genre)&&t.title.toLowerCase().includes(query.toLowerCase())),[tracks,genre,query]);
  const counts=useMemo(()=>{const m={};GENRES.forEach(g=>m[g]=tracks.filter(t=>t.genre===g).length);return m;},[tracks]);
  const publish=async data=>{
    const producer="@"+session.email.split("@")[0].toUpperCase();
    try{
      const row=trackToDb({...data,producer});
      const result=await sbInsert("tracks",row);
      const inserted=Array.isArray(result)?result[0]:result;
      const t=inserted?trackFromDb(inserted):{id:uid(),...data,producer,plays:0,downloads:0,favorites:0,shares:0,avgListenSec:0,topCountry:null,uploadedAt:nowISO(),active:true,exclusive:false};
      setState(s=>({...s,tracks:[t,...s.tracks]}));
      addEvent(`🎵 Son publié : "${data.title}" (${data.genre})`,"🎵");
      setShowPublish(false);
      toast(`"${data.title}" publié avec succès !`,"success");
    }catch(e){
      toast(`Erreur : ${e.message}`,"error");
    }
  };
  const remove=async id=>{
    const t=tracks.find(x=>x.id===id);
    try{
      await sbDelete("tracks",id);
      setState(s=>({...s,tracks:s.tracks.filter(x=>x.id!==id)}));
      if(t){addEvent(`🗑️ Son supprimé : "${t.title}"`,"🗑️");toast(`"${t.title}" supprimé.`,"warn");}
    }catch(e){
      toast(`Erreur suppression : ${e.message}`,"error");
    }
  };
  return(
    <div style={{paddingBottom:32}}>
      <SectionHead title="Bibliothèque musicale" sub={`${tracks.length} son${tracks.length!==1?"s":""} publié${tracks.length!==1?"s":""}`}
        right={<button onClick={()=>setShowPublish(true)} style={{padding:"9px 15px",borderRadius:13,background:`linear-gradient(90deg,${ACCENT},#7B3FE0)`,border:"none",color:"white",fontWeight:800,fontSize:12,cursor:"pointer"}}>+ Publier</button>}/>

      {tracks.length>0&&(
        <Card style={{marginBottom:14,padding:"10px 12px"}}>
          <div style={{color:G.muted,fontSize:10,fontWeight:800,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>🕐 Récemment publiés</div>
          {tracks.slice(0,5).map(t=>(
            <div key={t.id} style={{display:"flex",alignItems:"center",gap:9,paddingBottom:7,marginBottom:7,borderBottom:`1px solid ${G.border}`}}>
              <div style={{width:32,height:32,borderRadius:8,background:t.cover?`url(${t.cover}) center/cover no-repeat`:"rgba(255,255,255,0.06)",backgroundSize:"cover",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>
                {!t.cover&&(GENRE_ICON[t.genre]||"🎵")}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{color:"white",fontSize:12,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.title}</div>
                <div style={{color:G.muted,fontSize:10}}>{GENRE_ICON[t.genre]} {t.genre}</div>
              </div>
              {t.audioUrl?(
                <button onClick={()=>playTrack(t)} style={{width:28,height:28,borderRadius:"50%",background:playingId===t.id?`${ACCENT}33`:"rgba(255,255,255,0.07)",border:`1px solid ${playingId===t.id?ACCENT+"66":"rgba(255,255,255,0.12)"}`,color:playingId===t.id?ACCENT:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {playingId===t.id
                    ?<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                    :<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                  }
                </button>
              ):(
                <span style={{color:G.dim,fontSize:9,fontStyle:"italic"}}>Pas d'audio</span>
              )}
            </div>
          ))}
        </Card>
      )}
      {tracks.length===0?(
        <Card style={{textAlign:"center",padding:"40px 24px"}}>
          <div style={{fontSize:40,marginBottom:12}}>🎵</div>
          <div style={{color:"white",fontSize:14,fontWeight:800,marginBottom:8}}>Aucun son publié</div>
          <div style={{color:G.muted,fontSize:12.5,lineHeight:1.7,marginBottom:16}}>Publie ton premier instrumental pour qu'il apparaisse dans l'app BeatMarket.</div>
          <button onClick={()=>setShowPublish(true)} style={{padding:"12px 24px",borderRadius:14,background:`linear-gradient(90deg,${ACCENT},#7B3FE0)`,border:"none",color:"white",fontWeight:800,fontSize:13,cursor:"pointer"}}>
            🚀 Publier un son
          </button>
        </Card>
      ):(
        <>
          <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:8,marginBottom:10}}>
            {["Tous",...GENRES].map(g=>(
              <button key={g} onClick={()=>setGenre(g)} style={{flexShrink:0,padding:"7px 12px",borderRadius:12,border:`1.5px solid ${genre===g?ACCENT+"77":G.border}`,background:genre===g?`${ACCENT}18`:"transparent",color:genre===g?"white":G.muted,fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                {g!=="Tous"&&GENRE_ICON[g]} {g}{g!=="Tous"&&` (${counts[g]})`}
              </button>
            ))}
          </div>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher un son…" style={{...inpStyle,marginBottom:12}}/>
          {filtered.length===0?<Card><Empty text="Aucun son trouvé."/></Card>:filtered.map(t=>(
            <Card key={t.id} onClick={()=>setDetail(t)} style={{display:"flex",alignItems:"center",gap:11,marginBottom:9,padding:"11px 13px"}}>
              <div style={{width:46,height:46,borderRadius:12,background:t.cover?`url(${t.cover}) center/cover`:"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                {!t.cover&&(GENRE_ICON[t.genre]||"🎵")}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{color:"white",fontSize:13,fontWeight:800,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.title}</div>
                <div style={{display:"flex",gap:10,marginTop:3,flexWrap:"wrap"}}>
                  <span style={{color:G.muted,fontSize:10.5}}>{GENRE_ICON[t.genre]} {t.genre}</span>
                  <span style={{color:G.muted,fontSize:10.5}}>🎧 {fmtN(t.plays)}</span>
                  <span style={{color:G.muted,fontSize:10.5}}>⬇️ {fmtN(t.downloads)}</span>
                </div>
              </div>
              <button onClick={e=>{e.stopPropagation();remove(t.id);}} style={{width:30,height:30,borderRadius:9,background:"rgba(255,59,92,0.1)",border:`1px solid rgba(255,59,92,0.25)`,color:"#FF6B85",cursor:"pointer",fontSize:16,flexShrink:0}}>×</button>
            </Card>
          ))}
        </>
      )}
      {showPublish&&<PublishModal onClose={()=>setShowPublish(false)} onPublish={publish}/>}
      {detail&&<TrackDetail track={detail} onClose={()=>setDetail(null)}/>}
    </div>
  );
}

// ─── USERS ────────────────────────────────────────────────────────────────────
function UserDetail({user,onClose,onAction}){
  const statusColor={active:"#00D48C",suspended:"#FFB800",banned:"#FF3B5C"};
  const statusLabel={active:"Actif",suspended:"Suspendu",banned:"Banni"};
  return(
    <Modal onClose={onClose}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
        <div style={{width:52,height:52,borderRadius:"50%",background:`linear-gradient(135deg,${ACCENT},#5533CC)`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:900,fontSize:20,flexShrink:0}}>{user.name?.[0]||"?"}</div>
        <div>
          <div style={{color:"white",fontSize:16,fontWeight:800}}>{user.name}</div>
          <div style={{color:G.muted,fontSize:11.5}}>{user.email}</div>
        </div>
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
        <Pill color={statusColor[user.status]}>{statusLabel[user.status]}</Pill>
        {user.premium&&<Pill color="#FFD700">👑 Premium</Pill>}
        {user.country&&<Pill color={ACCENT}>{user.country.flag} {user.country.name}</Pill>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
        {[["Écoutes",fmtN(user.plays)],["Téléchargements",fmtN(user.downloads)],["Pubs vues",fmtN(user.adsWatched)],["Favoris",fmtN(user.favorites)],["Jetons gagnés",fmtN(user.tokensEarned)],["Jetons utilisés",fmtN(user.tokensSpent)],["Inscrit le",fmtDate(user.createdAt)],["Dernière activité",fmtDate(user.lastActive)]].map(([l,v])=>(
          <Card key={l} style={{padding:"10px 12px"}}>
            <div style={{color:G.dim,fontSize:9.5,fontWeight:700,textTransform:"uppercase",marginBottom:4}}>{l}</div>
            <div style={{color:"white",fontSize:13.5,fontWeight:800}}>{v}</div>
          </Card>
        ))}
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {user.status!=="active"&&<ABtn onClick={()=>onAction(user.id,"active")} color="#00D48C">✅ Réactiver</ABtn>}
        {user.status!=="suspended"&&<ABtn onClick={()=>onAction(user.id,"suspended")} color="#FFB800">⏸ Suspendre</ABtn>}
        {user.status!=="banned"&&<ABtn onClick={()=>onAction(user.id,"banned")} color="#FF3B5C">🚫 Bannir</ABtn>}
      </div>
    </Modal>
  );
}
const ABtn=({onClick,color,children})=>(
  <button onClick={onClick} style={{flex:1,minWidth:100,padding:"10px 12px",borderRadius:12,border:`1px solid ${color}44`,background:`${color}15`,color,fontWeight:800,fontSize:12,cursor:"pointer"}}>
    {children}
  </button>
);

function UsersPanel({state,setState,addEvent,toast}){
  const [query,setQuery]=useState("");
  const [statusF,setStatusF]=useState("Tous");
  const [premiumF,setPremiumF]=useState(false);
  const [selected,setSelected]=useState(null);
  const {users}=state;
  const filtered=useMemo(()=>users.filter(u=>{
    const q=query.toLowerCase();
    const mQ=u.name?.toLowerCase().includes(q)||u.email?.toLowerCase().includes(q);
    const mS=statusF==="Tous"||u.status===statusF;
    const mP=!premiumF||u.premium;
    return mQ&&mS&&mP;
  }),[users,query,statusF,premiumF]);
  const doAction=(id,status)=>{
    const u=users.find(x=>x.id===id);
    setState(s=>({...s,users:s.users.map(x=>x.id===id?{...x,status}:x)}));
    if(u) addEvent(`${status==="banned"?"🚫":status==="suspended"?"⏸":"✅"} ${u.name} → ${status}`,status==="banned"?"🚫":"✅");
    toast(`Statut mis à jour : ${status}`,status==="banned"?"error":"success");
    setSelected(null);
  };
  const sc={active:"#00D48C",suspended:"#FFB800",banned:"#FF3B5C"};
  const sl={active:"Actif",suspended:"Susp.",banned:"Banni"};

  if(users.length===0) return(
    <div style={{paddingBottom:32}}>
      <SectionHead title="Gestion des utilisateurs" sub="0 compte enregistré"/>
      <Card><Empty text="Aucun utilisateur" sub="Les utilisateurs apparaîtront ici dès qu'ils s'inscriront dans BeatMarket."/></Card>
    </div>
  );

  return(
    <div style={{paddingBottom:32}}>
      <SectionHead title="Gestion des utilisateurs" sub={`${users.length} comptes · ${filtered.length} affichés`}/>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher nom ou email…" style={{...inpStyle,marginBottom:10}}/>
      <div style={{display:"flex",gap:6,marginBottom:10,overflowX:"auto"}}>
        {["Tous","active","suspended","banned"].map(s=>(
          <button key={s} onClick={()=>setStatusF(s)} style={{flexShrink:0,padding:"7px 12px",borderRadius:12,border:`1.5px solid ${statusF===s?ACCENT+"77":G.border}`,background:statusF===s?`${ACCENT}18`:"transparent",color:statusF===s?"white":G.muted,fontSize:11,fontWeight:700,cursor:"pointer"}}>
            {s==="Tous"?"Tous":sl[s]}
          </button>
        ))}
        <button onClick={()=>setPremiumF(p=>!p)} style={{flexShrink:0,padding:"7px 12px",borderRadius:12,border:`1.5px solid ${premiumF?"#FFD700":"#FFD70033"}`,background:premiumF?"rgba(255,215,0,0.12)":"transparent",color:premiumF?"#FFD700":G.muted,fontSize:11,fontWeight:700,cursor:"pointer"}}>
          👑 Premium
        </button>
      </div>
      {filtered.length===0?<Card><Empty text="Aucun utilisateur trouvé."/></Card>:filtered.slice(0,100).map((u,i)=>(
        <Card key={u.id} onClick={()=>setSelected(u)} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,padding:"10px 12px"}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:`linear-gradient(135deg,${ACCENT},#5533CC)`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:900,fontSize:14,flexShrink:0}}>{u.name?.[0]||"?"}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <span style={{color:"white",fontSize:12.5,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{u.name}</span>
              {u.premium&&<span style={{fontSize:10}}>👑</span>}
            </div>
            <div style={{color:G.dim,fontSize:10.5,marginTop:1}}>{u.country?`${u.country.flag} ${u.country.name} · `:""}{fmtN(u.plays)} écoutes</div>
          </div>
          <Pill color={sc[u.status]}>{sl[u.status]}</Pill>
        </Card>
      ))}
      {filtered.length>100&&<p style={{color:G.muted,fontSize:11,textAlign:"center",marginTop:8}}>Affiche les 100 premiers — affine ta recherche.</p>}
      {selected&&<UserDetail user={selected} onClose={()=>setSelected(null)} onAction={doAction}/>}
    </div>
  );
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
function NotifsPanel({state}){
  const {events}=state;
  const kinds={"🚨":"#FF3B5C","⚠️":"#FFB800","🎉":"#00D48C","👑":"#FFD700","🎵":ACCENT,"🔐":ACCENT,"👥":"#00D48C","🗑️":"#FF8C42","✅":"#00D48C","🚫":"#FF3B5C","⏸":"#FFB800","🚀":"#00D48C"};
  return(
    <div style={{paddingBottom:32}}>
      <SectionHead title="Centre de notifications" sub={`${events.length} alertes`}/>
      <Card style={{padding:0,overflow:"hidden"}}>
        {events.length===0?<Empty text="Aucune alerte."/>:events.map((ev,i)=>{
const c=kinds[ev.icon]||G.muted;
          return(
            <div key={ev.id}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10,padding:"12px 14px"}}>
                <div style={{width:32,height:32,borderRadius:10,background:`${c}18`,border:`1px solid ${c}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{ev.icon||"🔔"}</div>
                <div style={{flex:1}}>
                  <div style={{color:"white",fontSize:12.5,lineHeight:1.4}}>{ev.text}</div>
                  <div style={{color:G.dim,fontSize:10.5,marginTop:3}}>{fmtDT(ev.at)}</div>
                </div>
              </div>
              {i<events.length-1&&<Divider/>}
            </div>
          );
        })}
      </Card>
    </div>
  );
}

// ─── ADMINS ───────────────────────────────────────────────────────────────────
function AdminsPanel({state,setState,session,addEvent,toast}){
  const [newEmail,setNewEmail]=useState("");
  const {admins}=state;
  const add=()=>{
    const e=newEmail.trim().toLowerCase();
    if(!e||!e.includes("@")){toast("Email invalide.","error");return;}
    if(SUPER_ADMINS.includes(e)||admins.some(a=>a.email===e)){toast("Cet email est déjà administrateur.","warn");return;}
    const a={id:uid(),email:e,addedAt:nowISO(),addedBy:session.email};
    setState(s=>({...s,admins:[...s.admins,a]}));
    addEvent(`👤 Nouvel admin ajouté : ${e}`,"👤");
    toast("Administrateur ajouté.","success");
    setNewEmail("");
  };
  const remove=id=>{
    const a=admins.find(x=>x.id===id);
    setState(s=>({...s,admins:s.admins.filter(x=>x.id!==id)}));
    if(a){addEvent(`👤 Admin retiré : ${a.email}`,"👤");toast("Admin retiré.","warn");}
  };
  return(
    <div style={{paddingBottom:32}}>
      <SectionHead title="Gestion des administrateurs"/>
      <Card style={{marginBottom:12}}>
        <div style={{color:G.muted,fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8,marginBottom:10}}>Super Administrateurs</div>
        {SUPER_ADMINS.map(e=>(
          <div key={e} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 0"}}>
            <span style={{fontSize:15}}>👑</span>
            <span style={{color:"white",fontSize:12.5,flex:1}}>{e}</span>
            <Pill color="#FFD700">Super Admin</Pill>
          </div>
        ))}
      </Card>
      {session.role==="super"&&(
        <Card style={{marginBottom:12}}>
          <div style={{color:G.muted,fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8,marginBottom:10}}>Ajouter un administrateur</div>
          <div style={{display:"flex",gap:8}}>
            <input value={newEmail} onChange={e=>setNewEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="email@exemple.com" style={{...inpStyle,flex:1}}/>
            <button onClick={add} style={{padding:"0 18px",borderRadius:13,background:`linear-gradient(90deg,${ACCENT},#7B3FE0)`,border:"none",color:"white",fontWeight:800,fontSize:14,cursor:"pointer"}}>+</button>
          </div>
        </Card>
      )}
      {admins.length>0&&(
        <Card>
          <div style={{color:G.muted,fontSize:10.5,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8,marginBottom:10}}>Administrateurs ({admins.length})</div>
          {admins.map((a,i)=>(
            <div key={a.id}>
              <div style={{display:"flex",alignItems:"center",gap:9,padding:"9px 0"}}>
                <span style={{fontSize:15}}>🛡️</span>
                <div style={{flex:1}}>
                  <div style={{color:"white",fontSize:12.5}}>{a.email}</div>
                  <div style={{color:G.dim,fontSize:10,marginTop:2}}>Ajouté le {fmtDate(a.addedAt)} par {a.addedBy}</div>
                </div>
                {session.role==="super"&&<button onClick={()=>remove(a.id)} style={{width:28,height:28,borderRadius:9,background:"rgba(255,59,92,0.1)",border:`1px solid rgba(255,59,92,0.25)`,color:"#FF6B85",cursor:"pointer",fontSize:15}}>×</button>}
              </div>
              {i<admins.length-1&&<Divider/>}
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

// ─── GUIDE CONNEXION ──────────────────────────────────────────────────────────
function GuideModal({onClose}){
  const steps=[
    {n:"1",title:"Base de données",body:"Crée un projet Supabase (supabase.com) ou Firebase. Tables nécessaires : users, tracks, admins, events, ad_views, tokens."},
    {n:"2",title:"Stockage audio & images",body:"Utilise le Storage Supabase ou Firebase Storage pour héberger les fichiers audio et covers. Ce panneau admin enverra les fichiers directement vers le bucket."},
    {n:"3",title:"Authentification réelle",body:"Active Firebase Auth ou Supabase Auth. Remplace la vérification email par une vraie connexion email+mot de passe avec rôle admin vérifié côté serveur."},
    {n:"4",title:"BeatMarket & Admin : même base",body:"Les deux apps lisent/écrivent la même base. Quand tu publies un son ici → il apparaît dans BeatMarket. Quand un user s'inscrit → il apparaît ici."},
    {n:"5",title:"Géolocalisation IP",body:"Pour l'analyse par ville/région, utilise ipapi.co ou MaxMind GeoLite2 dans une Cloud Function déclenchée à chaque connexion."},
    {n:"6",title:"Scalabilité",body:"Supabase et Firebase tiennent jusqu'à 1M+ utilisateurs. Pour les fichiers audio à grande échelle, utilise Cloudflare R2 ou Bunny.net."},
  ];
  return(
    <Modal onClose={onClose} maxW={500}>
      <h3 style={{color:"white",fontSize:17,fontWeight:900,margin:"0 0 4px"}}>🔌 Connecter BeatMarket</h3>
      <p style={{color:G.muted,fontSize:12,margin:"0 0 18px"}}>Étapes pour passer de ce panneau à une vraie app avec de vrais utilisateurs.</p>
      {steps.map(s=>(
        <div key={s.n} style={{display:"flex",gap:12,marginBottom:16}}>
          <div style={{width:26,height:26,borderRadius:"50%",background:`${ACCENT}20`,border:`1px solid ${ACCENT}55`,color:ACCENT,fontSize:12,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{s.n}</div>
          <div>
            <div style={{color:"white",fontSize:13,fontWeight:800,marginBottom:4}}>{s.title}</div>
            <div style={{color:G.muted,fontSize:12,lineHeight:1.6}}>{s.body}</div>
          </div>
        </div>
      ))}
      <Card style={{background:`${ACCENT}10`,border:`1px solid ${ACCENT}30`,marginTop:4}}>
        <div style={{color:"white",fontSize:12.5,fontWeight:700,marginBottom:4}}>💡 Prochaine étape</div>
        <div style={{color:G.muted,fontSize:12,lineHeight:1.6}}>Crée un compte Supabase gratuit, crée les tables, et partage ton URL + clé publique : je t'écris tout le code de connexion React ↔ Supabase pour les deux apps.</div>
      </Card>
    </Modal>
  );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────
const TABS=[
  {id:"dashboard",label:"Dashboard",icon:"📊"},
  {id:"ads",label:"Publicités",icon:"📺"},
  {id:"countries",label:"Pays",icon:"🌍"},
  {id:"music",label:"Musique",icon:"🎵"},
  {id:"users",label:"Utilisateurs",icon:"👥"},
  {id:"notifs",label:"Alertes",icon:"🔔"},
  {id:"admins",label:"Admins",icon:"🛡️"},
];

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App(){
  const [booting,setBooting]=useState(true);
  const [session,setSession]=useState(null);
  const [state,setState]=useState(EMPTY_STATE);
  const [tab,setTab]=useState("dashboard");
  const [toastData,setToastData]=useState(null);
  const [showGuide,setShowGuide]=useState(false);
  const saveRef=useRef(false);

  const showToast=useCallback((msg,kind="info")=>{
    setToastData({msg,kind});
    setTimeout(()=>setToastData(null),3200);
  },[]);

  const addEvent=useCallback((text,icon="🔔")=>{
    setState(s=>({...s,events:[{id:uid(),text,icon,at:nowISO()},...s.events].slice(0,80)}));
  },[]);

  useEffect(()=>{
    (async()=>{
      const saved=await sGet("bm_prod_v1",true);
      if(saved) setState(saved);
      const sess=await sGet("bm_session_prod_v1",false);
      if(sess) setSession(sess);
      try{
        const dbTracks=await sbSelect("tracks","&order=uploaded_at.desc");
        if(dbTracks) setState(s=>({...s,tracks:dbTracks.map(trackFromDb)}));
      }catch(e){
        console.error("Erreur chargement tracks Supabase:",e.message);
      }
      setBooting(false);
    })();
  },[]);

  useEffect(()=>{
    if(booting) return;
    if(!saveRef.current){saveRef.current=true;return;}
    sSet("bm_prod_v1",state,true);
  },[state,booting]);

  const login=async s=>{
    setSession(s);
    await sSet("bm_session_prod_v1",s,false);
    addEvent(`🔐 Connexion : ${s.email}`,"🔐");
    showToast(`Bienvenue, ${s.email.split("@")[0]} !`,"success");
  };
  const logout=async()=>{
    await sDel("bm_session_prod_v1",false);
    setSession(null);
  };

  if(booting) return(
    <div style={{width:"100%",height:"100dvh",background:G.bg,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <style>{css}</style>
      <div style={{textAlign:"center"}}>
        <div style={{width:40,height:40,borderRadius:"50%",border:`3px solid rgba(255,255,255,0.08)`,borderTopColor:ACCENT,animation:"spin 0.9s linear infinite",margin:"0 auto 14px"}}/>
        <div style={{color:G.muted,fontSize:12}}>Chargement du serveur…</div>
      </div>
    </div>
  );

  if(!session) return(
    <div style={{fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif"}}>
      <style>{css}</style>
      <Login onLogin={login} admins={state.admins}/>
    </div>
  );

  return(
    <div style={{width:"100%",height:"100dvh",background:G.bg,display:"flex",flexDirection:"column",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",overflow:"hidden",color:"white"}}>
      <style>{css}</style>
      {toastData&&<Toast {...toastData}/>}
      {showGuide&&<GuideModal onClose={()=>showGuide&&setShowGuide(false)}/>}

      {/* HEADER */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px 12px",borderBottom:`1px solid ${G.border}`,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,borderRadius:11,background:`linear-gradient(135deg,${ACCENT},#5533CC)`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 20px ${ACCENT}44`}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div>
            <div style={{color:"white",fontSize:13.5,fontWeight:900,lineHeight:1}}>BeatMarket Admin</div>
            <div style={{color:G.dim,fontSize:9.5,marginTop:2}}>{session.role==="super"?"👑 Super Admin":"🛡️ Admin"} · {session.email.split("@")[0]}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:7}}>
          <button onClick={()=>setShowGuide(true)} title="Guide de connexion" style={{width:33,height:33,borderRadius:10,background:"rgba(255,255,255,0.06)",border:`1px solid ${G.border}`,color:"white",fontSize:14,cursor:"pointer"}}>🔌</button>
          <button onClick={logout} title="Déconnexion" style={{width:33,height:33,borderRadius:10,background:"rgba(255,59,92,0.1)",border:"1px solid rgba(255,59,92,0.25)",color:"#FF6B85",fontSize:13,cursor:"pointer"}}>⏻</button>
        </div>
      </div>

      {/* TABS */}
      <div style={{display:"flex",gap:5,padding:"10px 14px 8px",overflowX:"auto",borderBottom:`1px solid ${G.border}`,flexShrink:0}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flexShrink:0,display:"flex",alignItems:"center",gap:5,padding:"8px 12px",borderRadius:12,border:`1.5px solid ${tab===t.id?ACCENT+"77":G.border}`,background:tab===t.id?`${ACCENT}18`:"transparent",color:tab===t.id?"white":G.muted,fontSize:11.5,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",position:"relative"}}>
            {t.icon} {t.label}
            {t.id==="notifs"&&state.events.length>0&&(
              <span style={{position:"absolute",top:-4,right:-4,width:16,height:16,borderRadius:"50%",background:"#FF3B5C",color:"white",fontSize:8,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center"}}>{state.events.length>9?"9+":state.events.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{flex:1,overflowY:"auto",padding:"0 16px"}}>
        <div style={{animation:"fadeUp 0.2s ease"}}>
          {tab==="dashboard"&&<Dashboard state={state}/>}
          {tab==="ads"&&<AdsPanel state={state}/>}
          {tab==="countries"&&<CountryPanel state={state}/>}
          {tab==="music"&&<MusicLibrary state={state} setState={setState} addEvent={addEvent} toast={showToast}/>}
          {tab==="users"&&<UsersPanel state={state} setState={setState} addEvent={addEvent} toast={showToast}/>}
          {tab==="notifs"&&<NotifsPanel state={state}/>}
          {tab==="admins"&&<AdminsPanel state={state} setState={setState} session={session} addEvent={addEvent} toast={showToast}/>}
        </div>
      </div>
    </div>
  );
}
