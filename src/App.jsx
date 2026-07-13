import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  sbSelect, trackFromDb, INIT, CSS, THEMES, LANGS, GENRES, SEMOJI, GCOL,
  gc, fmt, fmtN, makeBeat, nextAdThreshold, COUNTRIES, THEMES as THEME_MAP,
  NAMES, PRODS, SCENES, MOCK_DEVICES, MOCK_HISTORY
} from "./config.js";

function Toast({msg}){return <div style={{position:"fixed",top:60,left:"50%",zIndex:9999,transform:"translateX(-50%)",background:"rgba(8,6,18,0.97)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:28,padding:"10px 22px",color:"white",fontSize:13,fontWeight:700,pointerEvents:"none",boxShadow:"0 8px 32px rgba(0,0,0,0.6)",animation:"toastShow 0.3s ease",maxWidth:"85vw",textAlign:"center"}}>{msg}</div>;}

function SceneWrapper({beat}){
  const scene=SCENES[beat.genre];
  return(<div style={{position:"absolute",inset:0,overflow:"hidden",animation:"bgFade 0.7s ease"}}><div style={{position:"absolute",inset:0,background:scene?.bg||"#050208",animation:"slowZoom 28s ease-in-out infinite alternate"}}>{scene?.render()}</div><div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%,transparent 30%,rgba(0,0,0,0.55) 100%)",zIndex:3,pointerEvents:"none"}}/><div style={{position:"absolute",bottom:0,left:0,right:0,height:"55%",background:"linear-gradient(to bottom,transparent,rgba(0,0,0,0.7) 50%,rgba(0,0,0,0.97))",zIndex:4,pointerEvents:"none"}}/><div style={{position:"absolute",top:0,left:0,right:0,height:"25%",background:"linear-gradient(to bottom,rgba(0,0,0,0.5),transparent)",zIndex:4,pointerEvents:"none"}}/></div>);
}

function Viz({playing,accent}){
  const N=42;const[bars,setBars]=useState(()=>Array(N).fill(3));const tk=useRef(0);
  useEffect(()=>{if(!playing){setBars(Array(N).fill(3));return;}const iv=setInterval(()=>{tk.current++;const intens=0.4+0.6*Math.abs(Math.sin(tk.current*0.04));setBars(Array.from({length:N},(_,i)=>Math.max(3,Math.min(40,3+intens*Math.abs(Math.sin(tk.current*0.18+i*0.43))*(0.6+Math.random()*0.4)*38))));},90);return()=>clearInterval(iv);},[playing]);
  return <div style={{display:"flex",alignItems:"flex-end",gap:1.5,height:40,filter:`drop-shadow(0 0 5px ${accent}88)`}}>{bars.map((v,i)=><div key={i} style={{flex:1,minWidth:1.5,borderRadius:2,height:`${v}px`,background:`linear-gradient(to top,${accent},${accent}66)`,transition:"height 0.09s ease"}}/>)}</div>;
}

function SideBtn({children,count,onClick,active,accent,burst}){
  return <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative"}}><button onClick={onClick} style={{width:40,height:40,borderRadius:"50%",background:active?`${accent}22`:"rgba(255,255,255,0.08)",border:`1.5px solid ${active?accent+"88":"rgba(255,255,255,0.15)"}`,boxShadow:active?`0 0 18px ${accent}66`:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.25s"}}>{children}</button>{count!==undefined&&<span style={{color:"rgba(255,255,255,0.8)",fontSize:10,fontWeight:700}}>{fmtN(count)}</span>}{burst>0&&Array.from({length:5}).map((_,i)=><span key={burst+"-"+i} style={{position:"absolute",top:8,left:"50%",fontSize:10,color:"#FF5C8A",pointerEvents:"none","--dx":`${(i-2)*12}px`,animation:`heartUp 0.85s ease-out ${i*0.05}s forwards`}}>❤</span>)}</div>;
}


function AdModal({reason,onDone,ct,T}){
  const DUR=6;const[n,setN]=useState(DUR);const[done,setDone]=useState(false);
  useEffect(()=>{const iv=setInterval(()=>setN(c=>{if(c<=1){clearInterval(iv);setDone(true);return 0;}return c-1;}),1000);return()=>clearInterval(iv);},[]);
  const circ=2*Math.PI*20;
  return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(14px)",zIndex:2500,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}><div style={{background:"#0A0718",border:"1px solid rgba(255,255,255,0.08)",borderRadius:24,padding:28,width:"100%",maxWidth:340,textAlign:"center",animation:"slideUp 0.3s ease"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><span style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontWeight:700,letterSpacing:1}}>{T.adLabel}</span><div style={{position:"relative",width:44,height:44}}><svg width="44" height="44" style={{position:"absolute",inset:0,transform:"rotate(-90deg)"}}><circle cx="22" cy="22" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3"/>{!done&&<circle cx="22" cy="22" r="20" fill="none" stroke={ct.accent} strokeWidth="3" strokeDasharray={circ} strokeDashoffset={circ*(1-n/DUR)} strokeLinecap="round" style={{transition:"stroke-dashoffset 1s linear"}}/>}</svg><span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:13,fontWeight:800}}>{done?"✓":n}</span></div></div><div style={{height:130,background:"linear-gradient(135deg,#1a0c3a,#0a1428)",borderRadius:16,marginBottom:18,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8}}><div style={{fontSize:36}}>🎵</div><p style={{color:"rgba(255,255,255,0.3)",fontSize:12,margin:0,fontWeight:600}}>BeatMarket Premium</p></div>{done?<button onClick={onDone} style={{width:"100%",padding:"13px",borderRadius:28,background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:"white",fontWeight:800,fontSize:15,cursor:"pointer"}}>{reason==="download"?T.downloadNow:"Continuer →"}</button>:<button disabled style={{width:"100%",padding:"13px",borderRadius:28,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.3)",fontWeight:800,fontSize:14,cursor:"not-allowed"}}>{T.waitSec} {n}s…</button>}</div></div>);
}


function SignupModal({onComplete,onClose,ct,T,reason}){
  const[mode,setMode]=useState("choice"); // choice | google | email | country
  const[step,setStep]=useState(1);
  const[form,setForm]=useState({name:"",email:"",password:""});
  const[country,setCountry]=useState(null);
  const[countryQuery,setCountryQuery]=useState("");
  const[googleLoading,setGoogleLoading]=useState(false);
  const[isLogin,setIsLogin]=useState(false);

  const filteredCountries=useMemo(()=>{if(!countryQuery.trim())return COUNTRIES;const q=countryQuery.toLowerCase();return COUNTRIES.filter(c=>c.name.toLowerCase().includes(q));},[countryQuery]);

  const inp={width:"100%",padding:"13px 15px",borderRadius:14,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"white",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:12};

  const startGoogle=()=>{setGoogleLoading(true);setTimeout(()=>{setGoogleLoading(false);setMode("email");},1600);};

  const submitEmail=()=>{if(!form.name.trim()||!form.email.trim()||!form.password.trim())return;setMode("country");};

  const finish=()=>{if(!country)return;onComplete({...form,country,provider:mode==="google"||form.email==="jonathan.dupont@gmail.com"?"google":"email"});};

  return(<div style={{position:"fixed",inset:0,zIndex:4000,background:"rgba(2,1,6,0.97)",backdropFilter:"blur(20px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.25s ease",overflowY:"auto"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"50px 18px 6px"}}>
      {mode!=="choice"?<button onClick={()=>{setMode("choice");setGoogleLoading(false);}} style={{background:"rgba(255,255,255,0.07)",border:"none",color:"white",width:36,height:36,borderRadius:"50%",fontSize:18,cursor:"pointer"}}>‹</button>:<div style={{width:36}}/>}
      {onClose&&<button onClick={onClose} style={{background:"rgba(255,255,255,0.07)",border:"none",color:"rgba(255,255,255,0.6)",width:36,height:36,borderRadius:"50%",fontSize:16,cursor:"pointer"}}>×</button>}
    </div>

    <div style={{flex:1,display:"flex",flexDirection:"column",padding:"10px 24px 40px",maxWidth:420,width:"100%",margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{width:62,height:62,borderRadius:18,background:`linear-gradient(135deg,${ct.accent},${ct.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",boxShadow:`0 0 26px ${ct.glow}`}}><svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M9 18V5l12-2v13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="6" cy="18" r="3" fill="white"/><circle cx="18" cy="16" r="3" fill="white"/></svg></div>
        <h1 style={{color:"white",fontSize:21,fontWeight:900,margin:"0 0 7px"}}>{mode==="country"?T.selectCountry:T.signupTitle}</h1>
        <p style={{color:"rgba(255,255,255,0.4)",fontSize:13,margin:0,lineHeight:1.5}}>{mode==="country"?"Dernière étape avant de continuer.":(reason&&T["signupRequired"+reason.charAt(0).toUpperCase()+reason.slice(1)])||T.signupSubtitle}</p>
      </div>

      {mode==="choice"&&<>
        <button onClick={startGoogle} disabled={googleLoading} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:11,padding:"14px",borderRadius:16,background:"white",border:"none",cursor:googleLoading?"default":"pointer",marginBottom:12,opacity:googleLoading?0.75:1}}>
          {googleLoading?<><div style={{width:18,height:18,borderRadius:"50%",border:"2.5px solid rgba(0,0,0,0.15)",borderTopColor:"#4285F4",animation:"pulse 0.8s linear infinite"}}/><span style={{color:"#3c4043",fontSize:14,fontWeight:700}}>{T.googleConnecting}</span></>:<><svg width="19" height="19" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg><span style={{color:"#3c4043",fontSize:14,fontWeight:700}}>{T.continueWithGoogle}</span></>}
        </button>
        <div style={{display:"flex",alignItems:"center",gap:10,margin:"6px 0 16px"}}><div style={{flex:1,height:1,background:"rgba(255,255,255,0.1)"}}/><span style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontWeight:600}}>{T.or}</span><div style={{flex:1,height:1,background:"rgba(255,255,255,0.1)"}}/></div>
        <button onClick={()=>setMode("email")} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:11,padding:"14px",borderRadius:16,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",cursor:"pointer",marginBottom:22}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-9.97 6.5a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <span style={{color:"white",fontSize:14,fontWeight:700}}>{T.continueWithEmail}</span>
        </button>
        <p style={{textAlign:"center",color:"rgba(255,255,255,0.3)",fontSize:12.5}}>{isLogin?"Pas encore de compte ? ":T.alreadyHaveAccount+" "}<button onClick={()=>setIsLogin(l=>!l)} style={{background:"none",border:"none",color:ct.accent2,fontSize:12.5,fontWeight:700,cursor:"pointer",padding:0}}>{isLogin?T.backToSignup:T.logIn}</button></p>
        <p style={{textAlign:"center",color:"rgba(255,255,255,0.18)",fontSize:10.5,marginTop:20,lineHeight:1.6}}>{T.bySigningUp} <span style={{textDecoration:"underline"}}>{T.termsOfUse}</span> {T.andOur} <span style={{textDecoration:"underline"}}>{T.privacyPolicy}</span>.</p>
      </>}

      {mode==="email"&&<>
        <label style={{color:"rgba(255,255,255,0.35)",fontSize:10.5,fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>{T.fullName}</label>
        <input style={inp} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Jonathan Dupont" autoFocus/>
        <label style={{color:"rgba(255,255,255,0.35)",fontSize:10.5,fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>{T.emailAddress}</label>
        <input type="email" style={inp} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="toi@email.com"/>
        <label style={{color:"rgba(255,255,255,0.35)",fontSize:10.5,fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>{T.createPassword}</label>
        <input type="password" style={inp} value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} placeholder="••••••••"/>
        <button onClick={submitEmail} disabled={!form.name.trim()||!form.email.trim()||!form.password.trim()} style={{width:"100%",padding:"14px",borderRadius:28,background:(!form.name.trim()||!form.email.trim()||!form.password.trim())?"rgba(255,255,255,0.08)":`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:(!form.name.trim()||!form.email.trim()||!form.password.trim())?"rgba(255,255,255,0.3)":"white",fontWeight:800,fontSize:14,cursor:(!form.name.trim()||!form.email.trim()||!form.password.trim())?"default":"pointer",marginTop:6,boxShadow:(!form.name.trim()||!form.email.trim()||!form.password.trim())?"none":`0 6px 24px ${ct.glow}`}}>{T.continueBtn}</button>
      </>}

      {mode==="country"&&<>
        <div style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:14,padding:"11px 14px",marginBottom:14}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={countryQuery} onChange={e=>setCountryQuery(e.target.value)} placeholder={T.searchCountry} style={{flex:1,background:"none",border:"none",color:"white",fontSize:14,outline:"none"}}/>
        </div>
        <div style={{maxHeight:280,overflowY:"auto",marginBottom:16,borderRadius:14,border:"1px solid rgba(255,255,255,0.06)"}}>
          {filteredCountries.map(c=><button key={c.code} onClick={()=>setCountry(c)} style={{width:"100%",display:"flex",alignItems:"center",gap:13,padding:"12px 14px",background:country?.code===c.code?`${ct.accent}18`:"transparent",border:"none",borderBottom:"1px solid rgba(255,255,255,0.04)",cursor:"pointer",textAlign:"left"}}>
            <span style={{fontSize:22}}>{c.flag}</span><span style={{color:country?.code===c.code?"white":"rgba(255,255,255,0.7)",fontSize:14,fontWeight:country?.code===c.code?800:400,flex:1}}>{c.name}</span>{country?.code===c.code&&<span style={{color:ct.accent,fontSize:16}}>✓</span>}
          </button>)}
          {filteredCountries.length===0&&<p style={{color:"rgba(255,255,255,0.3)",fontSize:13,textAlign:"center",padding:20}}>{T.noResults}</p>}
        </div>
        <button onClick={finish} disabled={!country} style={{width:"100%",padding:"14px",borderRadius:28,background:!country?"rgba(255,255,255,0.08)":`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:!country?"rgba(255,255,255,0.3)":"white",fontWeight:800,fontSize:14,cursor:!country?"default":"pointer",boxShadow:!country?"none":`0 6px 24px ${ct.glow}`}}>{T.createAccount}</button>
      </>}
    </div>
  </div>);
}


function DownloadModal({beat,premium,onWatchAd,onClose,ct,T}){
  const g=gc(beat.genre);
  return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",backdropFilter:"blur(12px)",zIndex:2400,display:"flex",alignItems:"flex-end"}} onClick={onClose}><div style={{width:"100%",background:"#0A0718",borderRadius:"22px 22px 0 0",border:"1px solid rgba(255,255,255,0.07)",padding:"22px 20px 44px",animation:"slideUp 0.3s ease"}} onClick={e=>e.stopPropagation()}><div style={{width:36,height:4,borderRadius:2,background:"rgba(255,255,255,0.16)",margin:"0 auto 18px"}}/><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><div style={{width:52,height:52,borderRadius:14,background:SCENES[beat.genre]?.bg?.split(",")[0]||"#050208",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{SEMOJI[beat.genre]||"🎵"}</div><div><h3 style={{color:"white",fontSize:16,fontWeight:900,margin:"0 0 4px"}}>{beat.title}</h3><div style={{display:"flex",gap:6}}><span style={{background:g.bg,color:g.text,fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:8,border:`1px solid ${g.border}`}}>{beat.genre}</span><span style={{color:"rgba(255,255,255,0.35)",fontSize:12}}>{beat.producer}</span></div></div></div>
  {premium?(<><div style={{background:"linear-gradient(130deg,rgba(255,184,0,0.12),rgba(255,229,102,0.06))",border:"1px solid rgba(255,184,0,0.25)",borderRadius:16,padding:"14px 16px",marginBottom:16}}><p style={{color:"#FFD700",fontSize:13,fontWeight:800,margin:"0 0 4px"}}>👑 {T.premium} · {T.fastDownload}</p><p style={{color:"rgba(255,255,255,0.45)",fontSize:12,margin:0}}>{T.maxQuality} · {T.commercialLicense}</p></div><button onClick={onWatchAd} style={{width:"100%",padding:"14px",borderRadius:28,background:"linear-gradient(90deg,#FFB800,#FFE566)",border:"none",color:"#3a2a00",fontWeight:900,fontSize:15,cursor:"pointer",boxShadow:"0 6px 28px rgba(255,184,0,0.4)"}}>⬇️ {T.download} ({T.premium})</button></>):(<><div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"14px 16px",marginBottom:14}}><p style={{color:"white",fontSize:13,fontWeight:800,margin:"0 0 6px"}}>📋 Licence gratuite</p><div style={{display:"flex",flexDirection:"column",gap:5}}>{["✅ Écoute personnelle","✅ Entraînement","✅ Projets perso"].map((t,i)=><span key={i} style={{color:"rgba(255,255,255,0.55)",fontSize:12}}>{t}</span>)}{["❌ Monétisation","❌ Usage commercial"].map((t,i)=><span key={i} style={{color:"rgba(255,80,80,0.7)",fontSize:12}}>{t}</span>)}</div></div><button onClick={onWatchAd} style={{width:"100%",padding:"14px",borderRadius:28,background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:"white",fontWeight:900,fontSize:15,cursor:"pointer",boxShadow:`0 6px 28px ${ct.glow}`,marginBottom:10}}>📺 {T.watchAd}</button></>)}</div></div>);
}


function PremiumModal({onConfirm,onClose,ct,T}){
  return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(12px)",zIndex:2600,display:"flex",alignItems:"center",justifyContent:"center",padding:24}} onClick={onClose}><div style={{background:"#0A0718",border:"1px solid rgba(255,184,0,0.25)",borderRadius:24,padding:28,width:"100%",maxWidth:360,textAlign:"center",animation:"slideUp 0.3s ease"}} onClick={e=>e.stopPropagation()}><div style={{fontSize:46,marginBottom:10}}>👑</div><h3 style={{color:"white",fontSize:20,fontWeight:900,margin:"0 0 4px"}}>{T.premiumTitle}</h3><p style={{color:"rgba(255,255,255,0.35)",fontSize:13,margin:"0 0 20px"}}>{T.premiumSubtitle}</p><div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:22,textAlign:"left"}}>{[["🚫",T.noAds],["⬇️",T.fastDownload],["🎧",T.maxQuality],["💎",T.exclusiveAccess],["✅",T.commercialLicense],["📱","YouTube · TikTok · Monétisation"]].map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,184,0,0.06)",border:"1px solid rgba(255,184,0,0.15)",borderRadius:12,padding:"10px 13px"}}><span style={{fontSize:17}}>{r[0]}</span><span style={{color:"rgba(255,255,255,0.85)",fontSize:13,fontWeight:600}}>{r[1]}</span></div>)}</div><button onClick={onConfirm} style={{width:"100%",padding:"14px",borderRadius:28,background:"linear-gradient(90deg,#FFB800,#FFE566)",border:"none",color:"#3a2a00",fontWeight:900,fontSize:15,cursor:"pointer",boxShadow:"0 8px 28px rgba(255,184,0,0.4)",marginBottom:10}}>{T.activatePremium} · 8€</button><button onClick={onClose} style={{width:"100%",padding:"10px",background:"none",border:"none",color:"rgba(255,255,255,0.28)",fontSize:13,cursor:"pointer"}}>{T.continueAsFree}</button></div></div>);
}


function CommentsModal({beat,comments,onAdd,onClose,ct,T}){
  const[txt,setTxt]=useState("");const sub=()=>{const v=txt.trim();if(!v)return;onAdd(v);setTxt("");};
  return(<div style={{position:"fixed",inset:0,zIndex:1500,background:"rgba(0,0,0,0.65)",backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-end"}} onClick={onClose}><div style={{width:"100%",maxHeight:"72vh",background:"#0A0718",borderRadius:"22px 22px 0 0",border:"1px solid rgba(255,255,255,0.07)",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}><div style={{padding:"12px 18px 14px",borderBottom:"1px solid rgba(255,255,255,0.06)",textAlign:"center"}}><div style={{width:36,height:4,borderRadius:2,background:"rgba(255,255,255,0.18)",margin:"0 auto 11px"}}/><span style={{color:"white",fontWeight:800,fontSize:15}}>{comments.length} {T.comments}</span></div><div style={{flex:1,overflowY:"auto",padding:"4px 18px"}}>{comments.length===0?<div style={{textAlign:"center",padding:"36px 0"}}><div style={{fontSize:32,marginBottom:8}}>💬</div><p style={{color:"rgba(255,255,255,0.35)",fontSize:13,margin:0}}>{T.addFirstComment}</p></div>:comments.map(c=><div key={c.id} style={{display:"flex",gap:10,padding:"11px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}><div style={{width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${ct.accent},${ct.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:900,fontSize:13,flexShrink:0}}>{c.user[1]?.toUpperCase()}</div><div style={{flex:1}}><span style={{color:"white",fontWeight:700,fontSize:13}}>{c.user}</span><p style={{color:"rgba(255,255,255,0.7)",fontSize:13,margin:"3px 0 0"}}>{c.text}</p></div></div>)}</div><div style={{display:"flex",gap:10,padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.06)"}}><input value={txt} onChange={e=>setTxt(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sub()} placeholder={T.addComment} style={{flex:1,padding:"11px 15px",borderRadius:22,border:"1px solid rgba(255,255,255,0.09)",background:"rgba(255,255,255,0.05)",color:"white",fontSize:13,outline:"none"}}/><button onClick={sub} style={{width:42,height:42,borderRadius:"50%",background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg></button></div></div></div>);
}


function SearchOverlay({beats,history,onSelect,onClose,onAddHistory,ct,T}){
  const[q,setQ]=useState("");const[focused,setFocused]=useState(false);const inp=useRef(null);
  useEffect(()=>{setTimeout(()=>inp.current?.focus(),80);},[]);
  const results=useMemo(()=>{if(!q.trim())return[];const lq=q.toLowerCase();return beats.filter(b=>b.title.toLowerCase().includes(lq)||b.producer.toLowerCase().includes(lq)||b.genre.toLowerCase().includes(lq)||fmtN(b.plays).includes(lq));},[q,beats]);
  const pick=(beat,idx)=>{onAddHistory(beat);onSelect(idx);onClose();};
  return(<div style={{position:"fixed",inset:0,zIndex:500,background:"rgba(3,1,8,0.98)",backdropFilter:"blur(18px)",display:"flex",flexDirection:"column",animation:"fadeIn 0.2s ease"}}><div style={{display:"flex",alignItems:"center",gap:10,padding:"52px 14px 10px"}}><div style={{flex:1,display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.07)",border:`1.5px solid ${focused?ct.accent+"66":"rgba(255,255,255,0.1)"}`,borderRadius:16,padding:"10px 14px",transition:"border-color 0.2s"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input ref={inp} value={q} onChange={e=>setQ(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} placeholder={T.searchPlaceholder} style={{flex:1,background:"none",border:"none",color:"white",fontSize:15,outline:"none",caretColor:ct.accent}}/>{q.length>0&&<button onClick={()=>setQ("")} style={{background:"rgba(255,255,255,0.12)",border:"none",color:"rgba(255,255,255,0.5)",width:20,height:20,borderRadius:"50%",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>}</div><button onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,0.55)",fontSize:14,fontWeight:700,cursor:"pointer",padding:"6px 2px"}}>{T.cancel}</button></div><div style={{flex:1,overflowY:"auto",padding:"0 14px 24px"}}>{q.trim().length===0?(<>{history.length>0&&<><p style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"14px 0 10px"}}>{T.recentlyListened}</p>{history.map((b,i)=><div key={b.id+i} onClick={()=>pick(b,beats.findIndex(x=>x.id===b.id))} style={{display:"flex",alignItems:"center",gap:11,padding:"9px 10px",borderRadius:14,cursor:"pointer",marginBottom:5,background:"rgba(255,255,255,0.03)"}}><div style={{width:44,height:44,borderRadius:11,background:SCENES[b.genre]?.bg?.split(",")[0]||"#050208",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{SEMOJI[b.genre]||"🎵"}</div><div style={{flex:1,minWidth:0}}><p style={{color:"white",fontSize:13,fontWeight:700,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.title}</p><p style={{color:"rgba(255,255,255,0.35)",fontSize:11,margin:"2px 0 0"}}>{b.producer} · <span style={{color:gc(b.genre).text,fontSize:10}}>{b.genre}</span></p></div></div>)}</>}<p style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"18px 0 10px"}}>{T.byGenre}</p><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{GENRES.map(genre=>{const g=gc(genre);return <button key={genre} onClick={()=>setQ(genre)} style={{padding:"8px 14px",borderRadius:20,background:g.bg,border:`1.5px solid ${g.border}`,color:g.text,fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>{SEMOJI[genre]||"🎵"} {genre}</button>;})}</div></>):results.length===0?<div style={{textAlign:"center",padding:"52px 20px"}}><div style={{fontSize:40,marginBottom:10}}>🔍</div><p style={{color:"rgba(255,255,255,0.3)",fontSize:14,margin:0}}>{T.noResults} <span style={{color:"white",fontWeight:700}}>"{q}"</span></p></div>:<>{results.map(b=>{const idx=beats.findIndex(x=>x.id===b.id);const g=gc(b.genre);return <div key={b.id} onClick={()=>pick(b,idx)} style={{display:"flex",alignItems:"center",gap:11,padding:"9px 10px",borderRadius:14,cursor:"pointer",marginBottom:5,background:"rgba(255,255,255,0.03)"}}><div style={{width:50,height:50,borderRadius:12,background:SCENES[b.genre]?.bg?.split(",")[0]||"#050208",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{SEMOJI[b.genre]||"🎵"}</div><div style={{flex:1,minWidth:0}}><p style={{color:"white",fontSize:14,fontWeight:700,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.title}</p><div style={{display:"flex",gap:6,alignItems:"center",marginTop:3}}><span style={{color:"rgba(255,255,255,0.35)",fontSize:11}}>{b.producer}</span><span style={{background:g.bg,color:g.text,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:6,border:`1px solid ${g.border}`}}>{b.genre}</span><span style={{color:"rgba(255,255,255,0.25)",fontSize:10}}>{fmtN(b.plays)} {T.plays}</span></div></div></div>;})} </>}</div></div>);
}


function SeekBar({elapsed,duration,accent,onSeek,fmt}){
  const barRef=useRef(null);
  const seeking=useRef(false);

  const calcSeek=(clientX)=>{
    const bar=barRef.current;
    if(!bar||!duration)return;
    const rect=bar.getBoundingClientRect();
    const ratio=Math.max(0,Math.min(1,(clientX-rect.left)/rect.width));
    onSeek(Math.round(ratio*duration));
  };

  const onMouseDown=(e)=>{seeking.current=true;calcSeek(e.clientX);};
  const onMouseMove=(e)=>{if(seeking.current)calcSeek(e.clientX);};
  const onMouseUp=()=>{seeking.current=false;};

  const onTouchStart=(e)=>{seeking.current=true;calcSeek(e.touches[0].clientX);e.stopPropagation();};
  const onTouchMove=(e)=>{if(seeking.current){calcSeek(e.touches[0].clientX);e.stopPropagation();}};
  const onTouchEnd=(e)=>{seeking.current=false;e.stopPropagation();};

  const pct=duration>0?(elapsed/duration)*100:0;
  const thumbLeft=`calc(${pct}% - 7px)`;

  return(
    <div style={{display:"flex",alignItems:"center",gap:9}}>
      <span style={{color:"rgba(255,255,255,0.38)",fontSize:10,minWidth:26}}>{fmt(elapsed)}</span>
      <div
        ref={barRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{flex:1,height:20,display:"flex",alignItems:"center",cursor:"pointer",position:"relative"}}
      >
        {/* Track */}
        <div style={{position:"absolute",left:0,right:0,height:4,background:"rgba(255,255,255,0.12)",borderRadius:4}}>
          {/* Rempli */}
          <div style={{height:"100%",borderRadius:4,width:`${pct}%`,background:`linear-gradient(90deg,${accent},${accent}99)`,boxShadow:`0 0 10px ${accent}88`}}/>
        </div>
        {/* Thumb */}
        <div style={{position:"absolute",top:"50%",left:thumbLeft,transform:"translateY(-50%)",width:14,height:14,borderRadius:"50%",background:"white",boxShadow:`0 0 8px ${accent}`,pointerEvents:"none"}}/>
      </div>
      <span style={{color:"rgba(255,255,255,0.38)",fontSize:10,minWidth:26,textAlign:"right"}}>{fmt(duration)}</span>
    </div>
  );
}

function BeatCard({beat,nextBeat,isActive,onToast,favs,onFav,commentCount,onComment,onDownload,ct,playing,setPlaying,elapsed,setElapsed,T,reduceAnim,account,onRequireAuth,onTokens}){
  const[liked,setLiked]=useState(false);const[likes,setLikes]=useState(beat.likes);const[saves,setSaves]=useState(0);const[shares,setShares]=useState(0);const[burst,setBurst]=useState(0);
  const isFav=favs.some(f=>f.id===beat.id);const scene=SCENES[beat.genre];const sceneAccent=scene?.accent||ct.accent;const g=gc(beat.genre);const iv=useRef(null);
  const audioRef=useRef(null);

  useEffect(()=>{
    if(isActive){
      setElapsed(0);
      if(beat.audioUrl){
        if(audioRef.current){audioRef.current.pause();audioRef.current.src="";}
        const a=new Audio(beat.audioUrl);
        a.ontimeupdate=()=>setElapsed(Math.floor(a.currentTime));
        a.onended=()=>{setPlaying(false);setElapsed(0);};
        audioRef.current=a;
        a.play().catch(()=>{});
        setPlaying(true);
      } else {
        setPlaying(true);
      }
    } else {
      if(audioRef.current){audioRef.current.pause();audioRef.current.src="";}
      setPlaying(false);
    }
    return()=>{if(audioRef.current){audioRef.current.pause();audioRef.current.src="";}};
  },[isActive,beat.id]);

  useEffect(()=>{
    if(!beat.audioUrl){
      if(playing){iv.current=setInterval(()=>setElapsed(e=>{if(e>=beat.duration){clearInterval(iv.current);setPlaying(false);return 0;}return e+1;}),1000);}
      else clearInterval(iv.current);
      return()=>clearInterval(iv.current);
    } else {
      if(audioRef.current){
        if(playing){audioRef.current.play().catch(()=>{});}
        else audioRef.current.pause();
      }
    }
  },[playing]);
  const doLike=()=>{if(!account){onRequireAuth("like");return;}if(!liked){setBurst(b=>b+1);onTokens?.(1);}setLiked(x=>!x);setLikes(l=>liked?l-1:l+1);};
  const doFav=()=>{if(!account){onRequireAuth("fav");return;}onFav(beat);setSaves(c=>isFav?Math.max(0,c-1):c+1);onToast(isFav?T.removedFromFavs:T.savedToFavs);};
  const doShare=()=>{if(!account){onRequireAuth("fav");return;}setShares(c=>c+1);onTokens?.(2);onToast(T.linkCopied);};
  const doComment=()=>{if(!account){onRequireAuth("comment");return;}onComment(beat);};
  return(<div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:"#030108"}}><SceneWrapper beat={beat}/>{playing&&!reduceAnim&&<div style={{position:"absolute",top:54,left:"50%",transform:"translateX(-50%)",background:"rgba(0,0,0,0.65)",backdropFilter:"blur(12px)",border:`1px solid ${sceneAccent}44`,borderRadius:24,padding:"6px 18px",display:"flex",alignItems:"center",gap:8,zIndex:10,whiteSpace:"nowrap"}}><div style={{display:"flex",gap:2.5,alignItems:"flex-end"}}>{[0,1,2,3,4].map(k=><div key={k} style={{width:2.5,borderRadius:2,background:sceneAccent,animation:`waveBar 0.6s ease-in-out ${k*0.1}s infinite`,height:"14px",transformOrigin:"bottom"}}/>)}</div><span style={{color:"white",fontSize:10,fontWeight:800,letterSpacing:2.5}}>{T.playing}</span></div>}{!playing&&<button onClick={()=>setPlaying(true)} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:10,width:72,height:72,borderRadius:"50%",background:"rgba(0,0,0,0.55)",backdropFilter:"blur(12px)",border:`2px solid ${sceneAccent}88`,boxShadow:`0 0 30px ${sceneAccent}55`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="28" height="28" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg></button>}{playing&&<button onClick={()=>setPlaying(false)} style={{position:"absolute",top:"20%",left:"10%",right:"15%",bottom:"35%",zIndex:9,background:"transparent",border:"none",cursor:"pointer"}}/>}{isActive&&nextBeat&&<div style={{position:"absolute",top:14,right:14,zIndex:20,display:"flex",alignItems:"center",gap:7,background:"rgba(6,4,16,0.5)",backdropFilter:"blur(14px)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"5px 10px 5px 6px",maxWidth:140}}><div style={{width:28,height:28,borderRadius:8,background:SCENES[nextBeat.genre]?.bg?.split(",")[0]||"#050208",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{SEMOJI[nextBeat.genre]||"🎵"}</div><div style={{overflow:"hidden"}}><p style={{color:"rgba(255,255,255,0.3)",fontSize:8,fontWeight:800,letterSpacing:1.5,margin:0,textTransform:"uppercase"}}>{T.next}</p><p style={{color:"white",fontSize:11,fontWeight:700,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{nextBeat.title}</p></div></div>}<div style={{position:"absolute",right:14,top:0,bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:13,zIndex:15}}><SideBtn onClick={doLike} count={likes} active={liked} accent={liked?"#FF5C8A":sceneAccent} burst={burst}><svg width="18" height="18" viewBox="0 0 24 24" fill={liked?"#FF5C8A":"none"} stroke={liked?"#FF5C8A":"white"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></SideBtn><SideBtn onClick={doComment} count={commentCount} accent={sceneAccent}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></svg></SideBtn><SideBtn onClick={doFav} count={saves} active={isFav} accent={sceneAccent}><svg width="18" height="18" viewBox="0 0 24 24" fill={isFav?sceneAccent:"none"} stroke={isFav?sceneAccent:"white"} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></SideBtn><SideBtn onClick={doShare} count={shares} accent={sceneAccent}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></SideBtn><SideBtn onClick={()=>onDownload(beat)} accent={sceneAccent}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></SideBtn></div><div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 16px 18px",zIndex:15}}><div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}><span style={{padding:"5px 12px",borderRadius:18,fontSize:10,fontWeight:800,background:g.bg,color:g.text,border:`1.5px solid ${g.border}`}}>{SEMOJI[beat.genre]||"🎵"} {beat.genre}</span>{beat.exclusive&&<span style={{padding:"5px 12px",borderRadius:18,fontSize:10,fontWeight:700,background:"rgba(255,184,0,0.15)",color:"#FFD700",border:"1.5px solid rgba(255,184,0,0.4)"}}>{T.exclusive}</span>}<span style={{padding:"5px 12px",borderRadius:18,fontSize:10,fontWeight:700,background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.6)",border:"1.5px solid rgba(255,255,255,0.1)"}}>{fmt(beat.duration)}</span></div><h2 style={{color:"white",fontSize:26,fontWeight:900,margin:"0 0 3px",lineHeight:1.1,textShadow:"0 2px 16px rgba(0,0,0,0.8)",letterSpacing:-0.4}}>{beat.title}</h2><p style={{color:"rgba(255,255,255,0.5)",fontSize:13,margin:"0 0 12px"}}>{beat.producer} · {fmtN(beat.plays)} {T.plays}</p><div style={{marginBottom:9}}><Viz playing={playing} accent={sceneAccent}/></div><SeekBar elapsed={elapsed} duration={beat.duration} accent={sceneAccent} onSeek={setElapsed} fmt={fmt}/></div></div>);
}

function MiniPlayer({beat,playing,setPlaying,elapsed,onBack,ct,T}){
  const scene=SCENES[beat.genre];const accent=scene?.accent||ct.accent;
  return(<div style={{position:"sticky",top:0,zIndex:90,display:"flex",alignItems:"center",gap:10,background:"rgba(8,5,18,0.95)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${accent}33`,padding:"10px 14px",boxShadow:"0 4px 18px rgba(0,0,0,0.35)"}}><button onClick={onBack} style={{width:38,height:38,borderRadius:10,background:"rgba(255,255,255,0.06)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer",flexShrink:0}}>{SEMOJI[beat.genre]||"🎵"}</button><div onClick={onBack} style={{flex:1,minWidth:0,cursor:"pointer"}}><p style={{color:"white",fontSize:13,fontWeight:800,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{beat.title}</p><p style={{color:"rgba(255,255,255,0.35)",fontSize:10.5,margin:"2px 0 5px"}}>{playing?T.playing:T.pause} · {beat.producer}</p><div style={{height:2.5,background:"rgba(255,255,255,0.12)",borderRadius:2}}><div style={{height:"100%",borderRadius:2,width:`${(elapsed/beat.duration)*100}%`,background:accent,transition:"width 0.95s linear"}}/></div></div><button onClick={e=>{e.stopPropagation();setPlaying(p=>!p);}} style={{width:38,height:38,borderRadius:"50%",background:`${accent}22`,border:`1.5px solid ${accent}77`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>{playing?<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>:<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>}</button></div>);
}


function Splash({onDone,T}){
  const[pct,setPct]=useState(0);const[show,setShow]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setShow(true),200);return()=>clearTimeout(t);},[]);
  useEffect(()=>{if(!show)return;const iv=setInterval(()=>setPct(p=>{const n=p+2+Math.random();if(n>=100){clearInterval(iv);setTimeout(onDone,400);return 100;}return n;}),70);return()=>clearInterval(iv);},[show]);
  return(<div style={{position:"fixed",inset:0,background:"radial-gradient(ellipse at 50% 30%,rgba(155,89,255,0.2),transparent 65%),linear-gradient(175deg,#04020E,#0C0620 50%,#040510)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"inherit",zIndex:9999,overflow:"hidden"}}>{Array.from({length:22}).map((_,i)=><div key={i} style={{position:"absolute",left:`${(i*17+7)%96}%`,top:`${(i*13+5)%90}%`,width:(i%3)+1,height:(i%3)+1,borderRadius:"50%",background:"white",animation:`twinkle ${2+i%3}s ease-in-out ${i*0.3}s infinite`,pointerEvents:"none"}}/>)}<div style={{display:"flex",flexDirection:"column",alignItems:"center",opacity:show?1:0,transition:"all 0.7s cubic-bezier(0.22,1,0.36,1)"}}><div style={{width:110,height:110,borderRadius:28,background:"linear-gradient(145deg,#160E3A,#06030F)",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 0 70px rgba(155,89,255,0.5)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:26}}><svg width="66" height="66" viewBox="0 0 72 72" fill="none"><path d="M36 12C23.85 12 14 21.85 14 34V50" stroke="url(#sg2)" strokeWidth="5" strokeLinecap="round"/><path d="M36 12C48.15 12 58 21.85 58 34V50" stroke="url(#sg2)" strokeWidth="5" strokeLinecap="round"/><rect x="9" y="44" width="12" height="18" rx="6" fill="url(#sg2)"/><rect x="51" y="44" width="12" height="18" rx="6" fill="url(#sg2)"/><text x="29" y="58" fontSize="15" fill="white" opacity="0.9">♪</text><defs><linearGradient id="sg2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset="0.5" stopColor="#9B89FF"/><stop offset="1" stopColor="#CC55FF"/></linearGradient></defs></svg></div><h1 style={{margin:0,fontSize:44,fontWeight:900,letterSpacing:-1.5,background:"linear-gradient(90deg,#CC55FF,#9B59FF 45%,#55CCFF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{T.appName}</h1><p style={{margin:"10px 0 44px",color:"rgba(235,235,245,0.4)",fontSize:12,letterSpacing:3.5,textTransform:"uppercase"}}>{T.tagline}</p><div style={{width:220}}><div style={{height:4,background:"rgba(255,255,255,0.07)",borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,borderRadius:4,transition:"width 0.1s linear",background:"linear-gradient(90deg,#2D7FF9,#9B59FF,#CC55FF)"}}/></div><p style={{margin:"12px 0 0",color:"rgba(255,255,255,0.2)",fontSize:12,textAlign:"center"}}>{T.splashLoading}</p></div></div></div>);
}


function Onboarding({onDone,T}){
  const[sel,setSel]=useState([]);const toggle=s=>setSel(p=>p.includes(s)?p.filter(x=>x!==s):[...p,s]);
  return(<div style={{position:"fixed",inset:0,background:"linear-gradient(175deg,#04020E,#0C0620 55%,#040510)",overflowY:"auto",fontFamily:"inherit",zIndex:9000}}><div style={{padding:"60px 20px 100px",maxWidth:480,margin:"0 auto"}}><div style={{textAlign:"center",marginBottom:28}}><div style={{fontSize:52,marginBottom:12}}>🎧</div><h1 style={{color:"white",fontSize:24,fontWeight:900,margin:"0 0 8px"}}>{T.onboardingTitle}</h1><p style={{color:"rgba(255,255,255,0.35)",fontSize:14,margin:0}}>{T.onboardingSub}</p></div><div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginBottom:36}}>{GENRES.map(s=>{const on=sel.includes(s);const g=gc(s);return <button key={s} onClick={()=>toggle(s)} style={{padding:"11px 17px",borderRadius:26,border:`2px solid ${on?g.border:"rgba(255,255,255,0.1)"}`,background:on?g.bg:"rgba(255,255,255,0.04)",color:on?g.text:"rgba(255,255,255,0.55)",fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:7,transition:"all 0.2s"}}>{SEMOJI[s]||"🎵"} {s}</button>;})}</div><button onClick={()=>onDone(sel)} style={{width:"100%",padding:"16px",borderRadius:30,background:"linear-gradient(90deg,#7B4FFF,#9B69FF)",border:"none",color:"white",fontWeight:900,fontSize:16,cursor:"pointer",boxShadow:"0 8px 32px rgba(123,79,255,0.5)"}}>{T.enter}</button><button onClick={()=>onDone([])} style={{width:"100%",padding:"12px",background:"none",border:"none",color:"rgba(255,255,255,0.22)",fontSize:13,cursor:"pointer",marginTop:10}}>{T.skip}</button></div></div>);
}


function FavsTab({favs,onRemove,ct,T}){
  if(!favs.length)return <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32}}><div style={{fontSize:52,marginBottom:12}}>🎵</div><h2 style={{color:"white",fontSize:19,fontWeight:900,margin:"0 0 8px"}}>{T.myFavs}</h2><p style={{color:"rgba(255,255,255,0.3)",fontSize:13,textAlign:"center",lineHeight:1.6}}>{T.noFavsYet}</p></div>;
  return <div style={{flex:1,overflowY:"auto",padding:"14px 16px 24px"}}><h2 style={{color:"white",fontSize:18,fontWeight:900,margin:"0 0 12px"}}>{T.myFavs} ({favs.length})</h2>{favs.map(b=>{const g=gc(b.genre);return <div key={b.id} style={{display:"flex",alignItems:"center",gap:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:"10px 11px",marginBottom:9}}><div style={{width:50,height:50,borderRadius:12,background:SCENES[b.genre]?.bg?.split(",")[0]||"#050208",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{SEMOJI[b.genre]||"🎵"}</div><div style={{flex:1,minWidth:0}}><p style={{color:"white",fontSize:14,fontWeight:700,margin:"0 0 3px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.title}</p><div style={{display:"flex",gap:5,alignItems:"center"}}><span style={{color:"rgba(255,255,255,0.35)",fontSize:11}}>{b.producer}</span><span style={{background:g.bg,color:g.text,fontSize:9.5,fontWeight:700,padding:"2px 6px",borderRadius:7}}>{b.genre}</span></div></div><button onClick={()=>onRemove(b.id)} style={{background:"rgba(255,60,60,0.1)",border:"1px solid rgba(255,60,60,0.2)",color:"#FF5C8A",width:32,height:32,borderRadius:10,cursor:"pointer",fontSize:17,flexShrink:0}}>×</button></div>;})}</div>;
}

function PlaylistsTab({playlists,beats,onCreatePlaylist,ct,T,account,onRequireAuth}){
  const[showCreate,setShowCreate]=useState(false);const[name,setName]=useState("");const[type,setType]=useState("public");
  const create=()=>{const v=name.trim();if(!v)return;onCreatePlaylist(v,type);setName("");setShowCreate(false);};
  const handleCreateClick=()=>{if(!account){onRequireAuth("playlist");return;}setShowCreate(s=>!s);};
  return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto",padding:"14px 16px 24px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h2 style={{color:"white",fontSize:18,fontWeight:900,margin:0}}>{T.myPlaylists}</h2><button onClick={handleCreateClick} style={{padding:"8px 14px",borderRadius:20,background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:"white",fontSize:12,fontWeight:800,cursor:"pointer"}}>{T.createPlaylist}</button></div>{showCreate&&<div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:"14px",marginBottom:14,animation:"slideUp 0.2s ease"}}><input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&create()} placeholder={T.playlistName} style={{width:"100%",padding:"10px 13px",borderRadius:12,border:`1px solid ${ct.accent}44`,background:"rgba(255,255,255,0.05)",color:"white",fontSize:14,outline:"none",marginBottom:10}}/><div style={{display:"flex",gap:6,marginBottom:10}}>{[{k:"public",l:T.public,i:"🌍"},{k:"private",l:T.private,i:"🔒"},{k:"collab",l:T.collaborative,i:"🤝"}].map(o=><button key={o.k} onClick={()=>setType(o.k)} style={{flex:1,padding:"8px 4px",borderRadius:10,border:`1.5px solid ${type===o.k?ct.accent+"88":"rgba(255,255,255,0.1)"}`,background:type===o.k?`${ct.accent}18`:"rgba(255,255,255,0.04)",color:type===o.k?ct.accent:"rgba(255,255,255,0.4)",fontSize:11,fontWeight:700,cursor:"pointer"}}>{o.i} {o.l}</button>)}</div><div style={{display:"flex",gap:8}}><button onClick={create} style={{flex:1,padding:"10px",borderRadius:20,background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:"white",fontWeight:800,cursor:"pointer"}}>{T.save}</button><button onClick={()=>setShowCreate(false)} style={{flex:1,padding:"10px",borderRadius:20,background:"rgba(255,255,255,0.06)",border:"none",color:"rgba(255,255,255,0.5)",cursor:"pointer"}}>{T.cancel}</button></div></div>}{playlists.length===0?<div style={{textAlign:"center",padding:"40px 20px"}}><div style={{fontSize:44,marginBottom:10}}>🎶</div><p style={{color:"rgba(255,255,255,0.3)",fontSize:13,lineHeight:1.6}}>{T.newPlaylist}</p></div>:playlists.map(pl=><div key={pl.id} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:"14px",marginBottom:10}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:46,height:46,borderRadius:12,background:`linear-gradient(135deg,${ct.accent}33,${ct.accent2}22)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🎵</div><div style={{flex:1}}><p style={{color:"white",fontSize:14,fontWeight:800,margin:0}}>{pl.name}</p><div style={{display:"flex",gap:6,marginTop:3}}><span style={{color:"rgba(255,255,255,0.35)",fontSize:11}}>{pl.beatIds.length} sons</span><span style={{background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.4)",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:7}}>{pl.type==="private"?"🔒":pl.type==="collab"?"🤝":"🌍"} {pl.type==="private"?T.private:pl.type==="collab"?T.collaborative:T.public}</span></div></div></div></div>)}</div>);
}

function DownloadsTab({activity,beats,T,ct,onPlay}){
  const downloads=activity.downloads;
  if(!downloads.length)return <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32}}><div style={{fontSize:52,marginBottom:12}}>⬇️</div><h2 style={{color:"white",fontSize:19,fontWeight:900,margin:"0 0 8px"}}>{T.downloadsTab}</h2><p style={{color:"rgba(255,255,255,0.3)",fontSize:13,textAlign:"center",lineHeight:1.6}}>{T.noActivity}</p></div>;
  return(<div style={{flex:1,overflowY:"auto",padding:"14px 16px 24px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h2 style={{color:"white",fontSize:18,fontWeight:900,margin:0}}>{T.downloadsTab} ({downloads.length})</h2><span style={{background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.4)",fontSize:10.5,fontWeight:700,padding:"4px 10px",borderRadius:14}}>📲 {T.offlineAvailable}</span></div>{downloads.map((b,i)=>{const g=gc(b.genre);const idx=beats.findIndex(x=>x.id===b.id);return <div key={b.id+i} onClick={()=>idx>=0&&onPlay(idx)} style={{display:"flex",alignItems:"center",gap:11,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:"10px 11px",marginBottom:9,cursor:idx>=0?"pointer":"default"}}><div style={{width:50,height:50,borderRadius:12,background:SCENES[b.genre]?.bg?.split(",")[0]||"#050208",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,position:"relative"}}>{SEMOJI[b.genre]||"🎵"}<div style={{position:"absolute",bottom:-3,right:-3,width:18,height:18,borderRadius:"50%",background:"#00D48C",border:"2px solid #0A0718",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9}}>✓</div></div><div style={{flex:1,minWidth:0}}><p style={{color:"white",fontSize:14,fontWeight:700,margin:"0 0 3px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.title}</p><div style={{display:"flex",gap:5,alignItems:"center"}}><span style={{color:"rgba(255,255,255,0.35)",fontSize:11}}>{b.producer}</span><span style={{background:g.bg,color:g.text,fontSize:9.5,fontWeight:700,padding:"2px 6px",borderRadius:7}}>{b.genre}</span></div></div><span style={{color:"rgba(255,255,255,0.25)",fontSize:11}}>{fmt(b.duration)}</span></div>;})}</div>);
}


function NotificationsPanel({notifs,onMarkAll,ct,T}){
  const ICONS={like:"❤️",comment:"💬",follow:"👤",token:"🪙",promo:"👑",music:"🎵"};
  return(<div style={{flex:1,overflowY:"auto",padding:"14px 16px 24px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><h2 style={{color:"white",fontSize:18,fontWeight:900,margin:0}}>{T.notifications}</h2><button onClick={onMarkAll} style={{background:"none",border:"none",color:ct.accent,fontSize:12,fontWeight:700,cursor:"pointer"}}>{T.markAllRead}</button></div>{notifs.length===0?<div style={{textAlign:"center",padding:"50px 20px"}}><div style={{fontSize:44,marginBottom:10}}>🔔</div><p style={{color:"rgba(255,255,255,0.3)",fontSize:13}}>{T.noNotifs}</p></div>:notifs.map(n=><div key={n.id} style={{display:"flex",gap:11,padding:"12px",borderRadius:14,marginBottom:8,background:n.read?"rgba(255,255,255,0.02)":"rgba(255,255,255,0.055)",border:`1px solid ${n.read?"rgba(255,255,255,0.05)":ct.accent+"22"}`}}><div style={{width:42,height:42,borderRadius:12,background:n.read?"rgba(255,255,255,0.06)":`${ct.accent}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{ICONS[n.type]||"🔔"}</div><div style={{flex:1,minWidth:0}}><p style={{color:"white",fontSize:13,fontWeight:n.read?400:700,margin:0,lineHeight:1.4}}>{n.text}</p><p style={{color:"rgba(255,255,255,0.3)",fontSize:10.5,margin:"4px 0 0"}}>{n.time}</p></div>{!n.read&&<div style={{width:8,height:8,borderRadius:"50%",background:ct.accent,flexShrink:0,marginTop:4,boxShadow:`0 0 8px ${ct.glow}`}}/>}</div>)}</div>);
}


function ProfileTab({favs,commentsMap,ct,premium,premiumUntil,onShowSettings,profile,tokens,joinDate,T,onWantPremium,account,activity}){
  const totalComments=Object.values(commentsMap).reduce((a,b)=>a+b.length,0);
  const fmtDate=d=>d?new Date(d).toLocaleDateString(undefined,{day:"2-digit",month:"long",year:"numeric"}):"";
  const totalPlays=activity?.played?.length||0;
  const dlCount=activity?.downloads?.length||0;
  return(<div style={{flex:1,overflowY:"auto",paddingBottom:24}}><div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 16px 16px"}}><div style={{position:"relative",marginBottom:12}}><div style={{width:90,height:90,borderRadius:"50%",background:`linear-gradient(135deg,${ct.accent},${ct.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,color:"white",fontWeight:900,border:premium?"3px solid #FFD700":`3px solid ${ct.accent}66`,boxShadow:premium?"0 4px 28px rgba(255,184,0,0.5)":`0 4px 28px ${ct.glow}`}}>{(profile.name||account?.name)?.[0]?.toUpperCase()||"🎵"}</div><div style={{position:"absolute",bottom:0,right:0,background:premium?"linear-gradient(135deg,#FFD700,#FFA500)":"linear-gradient(135deg,#555,#333)",borderRadius:20,padding:"3px 9px",border:"2px solid #0A0718",fontSize:10,fontWeight:800,color:premium?"#3a2a00":"#CCC"}}>{premium?"👑 PRO":"Free"}</div></div><h2 style={{color:"white",fontSize:21,fontWeight:900,margin:"0 0 4px"}}>{profile.name||account?.name||"Utilisateur"}</h2>{account?.country&&<span style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:16,padding:"3px 11px",fontSize:11.5,color:"rgba(255,255,255,0.6)",fontWeight:600,marginBottom:6}}>{account.country.flag} {account.country.name}</span>}{account?.email&&<p style={{color:"rgba(255,255,255,0.3)",fontSize:12,margin:"0 0 4px"}}>{account.email}</p>}{profile.bio&&<p style={{color:"rgba(255,255,255,0.4)",fontSize:13,margin:"0 0 6px",textAlign:"center"}}>{profile.bio}</p>}<button onClick={onShowSettings} style={{marginTop:10,padding:"9px 22px",borderRadius:22,background:`${ct.accent}18`,border:`1px solid ${ct.accent}44`,color:ct.accent2,fontSize:12,fontWeight:700,cursor:"pointer"}}>⚙️ {T.settings}</button></div>
  <div style={{padding:"0 16px 16px"}}>{premium?(<div style={{background:"linear-gradient(130deg,rgba(255,184,0,0.15),rgba(255,229,102,0.06))",border:"1px solid rgba(255,184,0,0.3)",borderRadius:20,padding:"16px 20px"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><span style={{fontSize:22}}>👑</span><span style={{color:"#FFD700",fontSize:15,fontWeight:900}}>{T.premiumActive}</span></div><p style={{color:"rgba(255,255,255,0.45)",fontSize:12,margin:0}}>{T.activeUntil} {fmtDate(premiumUntil)}</p></div>):(<button onClick={onWantPremium} style={{width:"100%",background:"linear-gradient(130deg,rgba(255,184,0,0.12),rgba(255,229,102,0.05))",border:"1px solid rgba(255,184,0,0.25)",borderRadius:20,padding:"16px 20px",textAlign:"left",cursor:"pointer"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><div><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:20}}>👑</span><span style={{color:"#FFD700",fontSize:15,fontWeight:900}}>{T.premium} · 8€/mois</span></div><p style={{color:"rgba(255,255,255,0.4)",fontSize:11.5,margin:0}}>{T.noAds} · {T.commercialLicense}</p></div><span style={{color:"#FFD700",fontSize:20}}>→</span></div></button>)}</div>
  <div style={{padding:"0 16px 16px"}}><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>{[{i:"⭐",l:T.favs,v:favs.length},{i:"💬",l:T.comments,v:totalComments},{i:"⬇️",l:T.downloads,v:dlCount},{i:"🎧",l:T.totalPlays,v:fmtN(totalPlays)},{i:"🪙",l:T.tokensEarned,v:tokens.earned},{i:"🪙",l:T.tokensSpent,v:tokens.spent}].map((s,idx)=><div key={idx} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:"12px 6px",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><span style={{fontSize:17}}>{s.i}</span><span style={{color:"white",fontSize:16,fontWeight:900}}>{s.v}</span><span style={{color:"rgba(255,255,255,0.28)",fontSize:9,fontWeight:600,textAlign:"center"}}>{s.l}</span></div>)}</div></div>
  <div style={{padding:"0 16px"}}><p style={{color:"rgba(255,255,255,0.3)",fontSize:11,fontWeight:700,margin:"0 0 8px"}}>{T.memberSince}: {fmtDate(joinDate)}</p><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:0,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,overflow:"hidden"}}><div style={{padding:"8px 6px",borderRight:"1px solid rgba(255,255,255,0.05)",textAlign:"center"}}><span style={{color:"rgba(255,255,255,0.35)",fontSize:10,fontWeight:700}}>{T.feature}</span></div><div style={{padding:"8px 4px",borderRight:"1px solid rgba(255,255,255,0.05)",textAlign:"center"}}><span style={{color:"rgba(255,255,255,0.5)",fontSize:10,fontWeight:700}}>{T.free}</span></div><div style={{padding:"8px 4px",textAlign:"center"}}><span style={{color:"#FFD700",fontSize:10,fontWeight:800}}>👑</span></div>{[["🎧","✅","✅"],["⬇️","📺","⚡"],["🚫 Pub","Oui","Non"],["🎚️","Std","Max"],["💎","❌","✅"],["📱 Mono","❌","✅"],["📄 Lic","Perso","Comm."]].map((r,i)=><><div key={`a${i}`} style={{padding:"7px 6px",borderRight:"1px solid rgba(255,255,255,0.04)",borderTop:"1px solid rgba(255,255,255,0.04)",textAlign:"center"}}><span style={{color:"rgba(255,255,255,0.55)",fontSize:10}}>{r[0]}</span></div><div key={`b${i}`} style={{padding:"7px 4px",borderRight:"1px solid rgba(255,255,255,0.04)",borderTop:"1px solid rgba(255,255,255,0.04)",textAlign:"center"}}><span style={{color:"rgba(255,255,255,0.45)",fontSize:10}}>{r[1]}</span></div><div key={`c${i}`} style={{padding:"7px 4px",borderTop:"1px solid rgba(255,255,255,0.04)",textAlign:"center"}}><span style={{color:["✅","⚡","Non","Max","✅","✅","Comm."].includes(r[2])?"#4DFF99":"rgba(255,255,255,0.65)",fontSize:10,fontWeight:700}}>{r[2]}</span></div></>)}</div></div></div>);
}


function ProfileLocked({onSignup,ct,T}){
  return(<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,textAlign:"center"}}>
    <div style={{width:84,height:84,borderRadius:"50%",background:`${ct.accent}15`,border:`2px solid ${ct.accent}33`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={ct.accent} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    </div>
    <h2 style={{color:"white",fontSize:19,fontWeight:900,margin:"0 0 8px"}}>{T.profileLockedTitle}</h2>
    <p style={{color:"rgba(255,255,255,0.35)",fontSize:13,lineHeight:1.6,margin:"0 0 26px",maxWidth:280}}>{T.profileLockedSub}</p>
    <button onClick={onSignup} style={{padding:"14px 32px",borderRadius:28,background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:"white",fontWeight:800,fontSize:14,cursor:"pointer",boxShadow:`0 6px 24px ${ct.glow}`}}>{T.signUpNow}</button>
  </div>);
}


function SettingsPage({onBack,ct,T,theme,setTheme,langKey,setLangKey,profile,setProfile,premium,onWantPremium,onCancelPremium,accessibility,setAccessibility,onToast,onLogout,onShowHelp}){
  const[section,setSection]=useState(null);
  const[form,setForm]=useState({...profile});
  const[showDel,setShowDel]=useState(false);
  const inp={width:"100%",padding:"11px 13px",borderRadius:12,border:"1px solid rgba(255,255,255,0.09)",background:"rgba(255,255,255,0.05)",color:"white",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:10};

  if(section==="profile"){return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={()=>setSection(null)} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>{T.editProfile}</h2></div><div style={{padding:"18px"}}><div style={{display:"flex",justifyContent:"center",marginBottom:18}}><div style={{width:80,height:80,borderRadius:"50%",background:`linear-gradient(135deg,${ct.accent},${ct.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,color:"white",fontWeight:900,position:"relative",cursor:"pointer"}}>{form.name?.[0]?.toUpperCase()||"🎵"}<div style={{position:"absolute",bottom:0,right:0,width:26,height:26,borderRadius:"50%",background:ct.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,border:"2px solid #0A0718"}}>📷</div></div></div>{[{l:T.pseudo,k:"name",type:"text"},{l:T.email,k:"email",type:"email"},{l:T.password,k:"password",type:"password"},{l:T.bio,k:"bio",type:"text"}].map(f=><div key={f.k}><label style={{color:"rgba(255,255,255,0.3)",fontSize:10.5,fontWeight:700,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:5}}>{f.l}</label>{f.k==="bio"?<textarea style={{...inp,height:72,resize:"none"}} value={form[f.k]||""} onChange={e=>setForm(x=>({...x,[f.k]:e.target.value}))}/>:<input type={f.type} style={inp} value={form[f.k]||""} onChange={e=>setForm(x=>({...x,[f.k]:e.target.value}))} placeholder={f.k==="password"?"••••••••":""}/>}</div>)}<button onClick={()=>{setProfile({...profile,...form});setSection(null);onToast("✅ Profil mis à jour !");}} style={{width:"100%",padding:"14px",borderRadius:28,background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:"white",fontWeight:800,fontSize:14,cursor:"pointer",boxShadow:`0 6px 22px ${ct.glow}`}}>{T.save}</button></div></div>);}

  if(section==="devices"){return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={()=>setSection(null)} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>{T.connectedDevices}</h2></div><div style={{padding:"16px"}}><div style={{background:"rgba(155,89,255,0.08)",border:`1px solid ${ct.accent}44`,borderRadius:16,padding:"14px",marginBottom:10}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:42,height:42,borderRadius:12,background:"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>📱</div><div style={{flex:1}}><p style={{color:"white",fontSize:13,fontWeight:700,margin:0}}>Cet appareil</p><p style={{color:"rgba(255,255,255,0.35)",fontSize:11,margin:"2px 0 0"}}>Session actuelle</p></div><span style={{background:`${ct.accent}22`,color:ct.accent,fontSize:10,fontWeight:800,padding:"3px 9px",borderRadius:20}}>Actuel</span></div></div></div></div>);}

  if(section==="history"){return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={()=>setSection(null)} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>{T.loginHistory}</h2></div><div style={{padding:"16px"}}><div style={{textAlign:"center",padding:"30px 10px"}}><div style={{fontSize:36,marginBottom:10}}>🔐</div><p style={{color:"rgba(255,255,255,0.3)",fontSize:13}}>{T.noActivity}</p></div></div></div>);}

  if(section==="language"){return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={()=>setSection(null)} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>{T.language}</h2></div><div style={{padding:"12px 16px"}}>{Object.entries(LANGS).map(([k,v])=><button key={k} onClick={()=>{setLangKey(k);setSection(null);}} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 14px",borderRadius:14,border:`1.5px solid ${langKey===k?ct.accent+"77":"rgba(255,255,255,0.07)"}`,background:langKey===k?`${ct.accent}12`:"rgba(255,255,255,0.02)",marginBottom:7,cursor:"pointer",textAlign:"left"}}><span style={{fontSize:22}}>{v.flag}</span><span style={{color:langKey===k?"white":"rgba(255,255,255,0.65)",fontSize:14,fontWeight:langKey===k?800:400,flex:1}}>{v.name}</span>{langKey===k&&<span style={{color:ct.accent,fontSize:16}}>✓</span>}</button>)}</div></div>);}

  if(section==="theme"){return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={()=>setSection(null)} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>🎨 {T.theme}</h2></div><div style={{padding:"16px",display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>{Object.entries(THEMES).map(([k,v])=>{const isOn=theme===k;return <button key={k} onClick={()=>{setTheme(k);setSection(null);}} style={{padding:"16px 12px",borderRadius:16,background:`${v.accent}10`,border:`2px solid ${isOn?v.accent:v.accent+"20"}`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:9,boxShadow:isOn?`0 0 24px ${v.glow}`:"none",transition:"all 0.2s"}}><div style={{width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg,${v.accent},${v.accent2})`,boxShadow:`0 4px 14px ${v.glow}`}}/><span style={{color:isOn?v.accent:"rgba(255,255,255,0.5)",fontSize:12,fontWeight:700,textAlign:"center"}}>{v.name}</span>{isOn&&<span style={{color:v.accent,fontSize:14}}>✓</span>}</button>;})}    </div></div>);}

  if(section==="accessibility"){return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={()=>setSection(null)} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>{T.accessibility}</h2></div><div style={{padding:"16px"}}>{[{k:"reduceAnim",l:T.reduceAnimations,i:"🎞️"},{k:"largeText",l:T.textSize+" (Grand)",i:"🔤"},{k:"darkMode",l:T.darkMode,i:"🌑"}].map(o=><div key={o.k} style={{display:"flex",alignItems:"center",gap:12,padding:"14px",borderRadius:14,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",marginBottom:9}}><span style={{fontSize:20}}>{o.i}</span><span style={{color:"white",fontSize:14,fontWeight:600,flex:1}}>{o.l}</span><button onClick={()=>setAccessibility(a=>({...a,[o.k]:!a[o.k]}))} style={{width:48,height:26,borderRadius:13,background:accessibility[o.k]?`linear-gradient(90deg,${ct.accent},${ct.accent2})`:"rgba(255,255,255,0.1)",border:"none",cursor:"pointer",position:"relative",transition:"background 0.3s"}}><div style={{width:22,height:22,borderRadius:"50%",background:"white",position:"absolute",top:2,left:accessibility[o.k]?24:2,transition:"left 0.3s",boxShadow:"0 1px 4px rgba(0,0,0,0.4)"}}/></button></div>)}</div></div>);}

  const GROUPS=[
    {title:T.editProfile,items:[{l:T.pseudo+" · "+T.email,i:"👤",k:"profile"},{l:T.connectedDevices,i:"📱",k:"devices"},{l:T.loginHistory,i:"🔐",k:"history"}]},
    {title:"Application",items:[{l:T.language,i:"🌍",k:"language"},{l:T.theme,i:"🎨",k:"theme"},{l:T.accessibility,i:"♿",k:"accessibility"},{l:T.help,i:"❓",k:"help"}]},
    {title:"Compte",items:[{l:premium?"Premium actif":"Passer Premium 8€/mois",i:"👑",k:"premium"},{l:T.logout,i:"🚪",k:"logout",danger:false},{l:T.deleteAccount,i:"🗑️",k:"delete",danger:true}]},
  ];
  return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={onBack} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>{T.settings}</h2></div><div style={{padding:"12px 16px 24px"}}>{GROUPS.map((g,gi)=><div key={gi} style={{marginBottom:22}}><p style={{color:"rgba(255,255,255,0.3)",fontSize:10.5,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"0 0 8px"}}>{g.title}</p>{g.items.map(item=><button key={item.k} onClick={()=>{if(item.k==="logout"){onLogout();}else if(item.k==="delete"){setShowDel(true);}else if(item.k==="premium"){onWantPremium();}else if(item.k==="help"){onShowHelp();}else{setSection(item.k);}}} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 14px",borderRadius:14,border:"1px solid rgba(255,255,255,0.06)",background:"rgba(255,255,255,0.03)",marginBottom:7,cursor:"pointer",textAlign:"left"}}><span style={{fontSize:19}}>{item.i}</span><span style={{color:item.danger?"#FF5C8A":item.k==="premium"?"#FFD700":"rgba(255,255,255,0.85)",fontSize:14,fontWeight:item.k==="premium"?800:500,flex:1}}>{item.l}</span><span style={{color:"rgba(255,255,255,0.25)",fontSize:18}}>›</span></button>)}</div>)}</div>
  {showDel&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",backdropFilter:"blur(10px)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}><div style={{background:"#0A0718",border:"1px solid rgba(255,60,60,0.3)",borderRadius:22,padding:24,width:"100%",maxWidth:320,textAlign:"center"}}><div style={{fontSize:40,marginBottom:12}}>⚠️</div><h3 style={{color:"white",fontSize:18,fontWeight:900,margin:"0 0 8px"}}>{T.deleteConfirm}</h3><p style={{color:"rgba(255,255,255,0.4)",fontSize:13,margin:"0 0 20px"}}>{T.deleteWarning}</p><button onClick={()=>{setShowDel(false);onToast("Compte supprimé");}} style={{width:"100%",padding:"13px",borderRadius:26,background:"linear-gradient(90deg,#FF2244,#FF5C8A)",border:"none",color:"white",fontWeight:900,fontSize:14,cursor:"pointer",marginBottom:9}}>{T.confirmDelete}</button><button onClick={()=>setShowDel(false)} style={{width:"100%",padding:"11px",background:"none",border:"none",color:"rgba(255,255,255,0.4)",fontSize:13,cursor:"pointer"}}>{T.cancel}</button></div></div>}</div>);
}


function HelpPage({onBack,ct,T}){
  const[openFaq,setOpenFaq]=useState(null);
  const[sent,setSent]=useState(false);
  const[msg,setMsg]=useState("");
  return(<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto"}}><div style={{display:"flex",alignItems:"center",gap:12,padding:"52px 14px 14px",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><button onClick={onBack} style={{background:"none",border:"none",color:"white",fontSize:22,cursor:"pointer"}}>‹</button><h2 style={{color:"white",fontSize:17,fontWeight:900,margin:0}}>{T.help}</h2></div><div style={{padding:"16px 16px 32px"}}>
  <p style={{color:"rgba(255,255,255,0.3)",fontSize:10.5,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"0 0 10px"}}>FAQ</p>{T.faqItems.map((f,i)=><div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,marginBottom:8,overflow:"hidden"}}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 14px",background:"none",border:"none",color:"white",fontSize:13,fontWeight:700,cursor:"pointer",textAlign:"left",gap:10}}><span>{f.q}</span><span style={{color:ct.accent,fontSize:16,flexShrink:0,transition:"transform 0.2s",transform:openFaq===i?"rotate(180deg)":"none"}}>⌄</span></button>{openFaq===i&&<div style={{padding:"0 14px 13px",borderTop:"1px solid rgba(255,255,255,0.06)"}}><p style={{color:"rgba(255,255,255,0.55)",fontSize:12.5,margin:"10px 0 0",lineHeight:1.6}}>{f.a}</p></div>}</div>)}
  <p style={{color:"rgba(255,255,255,0.3)",fontSize:10.5,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"22px 0 10px"}}>{T.contactSupport}</p>
  {sent?<div style={{background:"rgba(0,212,140,0.1)",border:"1px solid rgba(0,212,140,0.3)",borderRadius:14,padding:"16px",textAlign:"center"}}><div style={{fontSize:32,marginBottom:8}}>✅</div><p style={{color:"#00D48C",fontSize:14,fontWeight:800,margin:0}}>Message envoyé !</p><p style={{color:"rgba(255,255,255,0.4)",fontSize:12,margin:"4px 0 0"}}>Nous répondrons sous 24h.</p></div>:<div><textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Décrivez votre problème…" style={{width:"100%",padding:"12px 13px",borderRadius:14,border:"1px solid rgba(255,255,255,0.09)",background:"rgba(255,255,255,0.04)",color:"white",fontSize:13,outline:"none",resize:"none",height:90,boxSizing:"border-box",fontFamily:"inherit",marginBottom:10}}/><button onClick={()=>{if(msg.trim())setSent(true);}} style={{width:"100%",padding:"13px",borderRadius:26,background:`linear-gradient(90deg,${ct.accent},${ct.accent2})`,border:"none",color:"white",fontWeight:800,fontSize:14,cursor:"pointer"}}>Envoyer</button></div>}
  <p style={{color:"rgba(255,255,255,0.3)",fontSize:10.5,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"22px 0 10px"}}>Légal</p>{[{l:T.termsOfUse,i:"📋"},{l:T.privacyPolicy,i:"🔒"},{l:T.reportProblem,i:"🚨"}].map((r,i)=><button key={i} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 14px",borderRadius:14,border:"1px solid rgba(255,255,255,0.06)",background:"rgba(255,255,255,0.03)",marginBottom:7,cursor:"pointer"}}><span style={{fontSize:18}}>{r.i}</span><span style={{color:"rgba(255,255,255,0.7)",fontSize:14,flex:1,textAlign:"left"}}>{r.l}</span><span style={{color:"rgba(255,255,255,0.2)"}}>›</span></button>)}</div></div>);
}

export default function App(){
  const[phase,setPhase]=useState("splash");
  const[langKey,setLangKey]=useState("fr");
  const T=LANGS[langKey]?.t||LANGS.fr.t;
  const[tab,setTab]=useState("feed");
  const[cur,setCur]=useState(0);
  const[beats,setBeats]=useState(INIT);
  const[favs,setFavs]=useState([]);
  const[playlists,setPlaylists]=useState([]);
  const[profile,setProfile]=useState({name:"",bio:"",email:""});
  const[premium,setPremium]=useState(false);
  const[premiumUntil,setPremiumUntil]=useState(null);
  const[toast,setToast]=useState(null);
  const[theme,setTheme]=useState("violet");
  const[cmap,setCmap]=useState({});
  const[cbeat,setCbeat]=useState(null);
  const[playing,setPlaying]=useState(true);
  const[elapsed,setElapsed]=useState(0);
  const[showSearch,setShowSearch]=useState(false);
  const[searchHistory,setSearchHistory]=useState([]);
  const[adState,setAdState]=useState(null);
  const[showDl,setShowDl]=useState(null);
  const[showPremium,setShowPremium]=useState(false);
  const[showSettings,setShowSettings]=useState(false);
  const[showHelp,setShowHelp]=useState(false);
  const[account,setAccount]=useState(null);
  const[showSignup,setShowSignup]=useState(false);
  const[signupReason,setSignupReason]=useState(null);
  const[checkingSession,setCheckingSession]=useState(true);
  const[tokens,setTokens]=useState({earned:0,spent:0});
  const[joinDate,setJoinDate]=useState(null);
  const[accessibility,setAccessibility]=useState({reduceAnim:false,largeText:false,darkMode:true});
  const[notifs,setNotifs]=useState([]);
  const[activity,setActivity]=useState({played:[],downloads:[],favs:[],searches:[]});
  const feedCount=useRef(0);const nextAd=useRef(nextAdThreshold(0));const adCount=useRef(0);const pendingDl=useRef(null);
  const touchY=useRef(null);const loading=useRef(false);
  const[autoplay,setAutoplay]=useState(true);
  const ct=THEMES[theme]||THEMES.violet;
  const unreadNotifs=notifs.filter(n=>!n.read).length;
  const showToast=useCallback(m=>{setToast(m);setTimeout(()=>setToast(null),3000);},[]);
  const loadMore=useCallback(()=>{if(loading.current)return;loading.current=true;setTimeout(()=>{setBeats(b=>[...b,...Array.from({length:10},(_,i)=>makeBeat(b.length+i))]);loading.current=false;},300);},[]);

  const addTokens=useCallback((n)=>{setTokens(t=>({...t,earned:t.earned+n}));},[]);
  const goTo=(next)=>{
    if(next<0||next>=beats.length)return;
    const beat=beats[next];
    setCur(next);
    setActivity(a=>({...a,played:[beat,...a.played.filter(x=>x.id!==beat.id)].slice(0,20)}));
    if(next>=beats.length-3)loadMore();
    if(!premium){feedCount.current++;if(feedCount.current>=nextAd.current){feedCount.current=0;adCount.current++;nextAd.current=nextAdThreshold(adCount.current);setTimeout(()=>setAdState({reason:"feed"}),300);}}
  };
  // Autoplay : passe au suivant quand le son est terminé
  useEffect(()=>{
    if(!autoplay||!playing)return;
    const beat=beats[cur];
    if(!beat)return;
    if(elapsed>=beat.duration&&beat.duration>0){
      setElapsed(0);
      setPlaying(true);
      goTo(cur+1);
    }
  },[elapsed,autoplay,playing,cur,beats]);

  const onTS=e=>{touchY.current=e.touches[0].clientY;};
  const onTE=e=>{if(!touchY.current)return;const dy=touchY.current-e.changedTouches[0].clientY;if(dy>50)goTo(cur+1);if(dy<-50)goTo(cur-1);touchY.current=null;};
  const onW=e=>{if(e.deltaY>40)goTo(cur+1);if(e.deltaY<-40)goTo(cur-1);};
  const toggleFav=beat=>{setFavs(f=>{const has=f.some(x=>x.id===beat.id);const next=has?f.filter(x=>x.id!==beat.id):[beat,...f];setActivity(a=>({...a,favs:has?a.favs.filter(x=>x.id!==beat.id):[beat,...a.favs].slice(0,20)}));return next;});};
  const removeFav=id=>setFavs(f=>f.filter(x=>x.id!==id));
  const addCom=(bid,txt)=>setCmap(m=>({...m,[bid]:[...(m[bid]||[]),{id:Date.now(),user:"@vous",text:txt}]}));
  const createPlaylist=(name,type)=>setPlaylists(p=>[...p,{id:Date.now(),name,beatIds:[],type}]);
  const addToHistory=useCallback(beat=>{setSearchHistory(h=>[beat,...h.filter(x=>x.id!==beat.id)].slice(0,10));},[]);
  useEffect(()=>{const b=beats[cur];if(b)addToHistory(b);},[cur]);
  const handleDownload=(beat)=>{
    if(!account){pendingDl.current=beat;setSignupReason("download");setShowSignup(true);return;}
    if(premium){showToast(T.premiumDownload);setActivity(a=>({...a,downloads:[beat,...a.downloads.filter(x=>x.id!==beat.id)].slice(0,20)}));return;}
    pendingDl.current=beat;setShowDl(beat);
  };
  const requireAuth=(reason)=>{setSignupReason(reason);setShowSignup(true);};
  const handleSignupComplete=async(data)=>{
    const acc={name:data.name,email:data.email,country:data.country,provider:data.provider,joinedAt:new Date().toISOString()};
    setAccount(acc);
    setProfile(p=>({...p,name:data.name,email:data.email}));
    setJoinDate(new Date(acc.joinedAt));
    try{await window.storage.set("user_account_v1",JSON.stringify(acc));}catch{}
    setShowSignup(false);
    showToast(`${T.accountCreated} ${data.country.flag}`);
    if(signupReason==="download"&&pendingDl.current){
      const b=pendingDl.current;
      if(premium){showToast(T.premiumDownload);setActivity(a=>({...a,downloads:[b,...a.downloads.filter(x=>x.id!==b.id)].slice(0,20)}));pendingDl.current=null;}
      else setTimeout(()=>setShowDl(b),350);
    }
    setSignupReason(null);
  };
  const handleAdDone=()=>{const reason=adState?.reason;setAdState(null);if(reason==="download"&&pendingDl.current){const b=pendingDl.current;showToast(`⬇️ "${b.title}" ${T.downloaded}`);setActivity(a=>({...a,downloads:[b,...a.downloads.filter(x=>x.id!==b.id)].slice(0,20)}));pendingDl.current=null;}};
  const activatePremium=()=>{const d=new Date();d.setMonth(d.getMonth()+1);setPremium(true);setPremiumUntil(d);setShowPremium(false);showToast(T.premiumActivated);};
  const handleSplashDone=async()=>{
    try{
      const s=await window.storage.get("user_prefs_v2").catch(()=>null);
      const accRes=await window.storage.get("user_account_v1").catch(()=>null);
      const tokRes=await window.storage.get("user_tokens_v1").catch(()=>null);
      if(accRes?.value){try{const acc=JSON.parse(accRes.value);setAccount(acc);setProfile(p=>({...p,name:acc.name,email:acc.email}));if(acc.joinedAt)setJoinDate(new Date(acc.joinedAt));}catch{}}
      if(tokRes?.value){try{setTokens(JSON.parse(tokRes.value));}catch{}}
      try{
        const dbTracks=await sbSelect("tracks","&active=eq.true&order=uploaded_at.desc");
        if(dbTracks&&dbTracks.length>0){
          const realBeats=dbTracks.map(trackFromDb);
          setBeats(realBeats);
        }
      }catch(e){
        console.error("Erreur chargement Supabase:",e.message);
      }
      if(s?.value){const p=JSON.parse(s.value);if(p.theme)setTheme(p.theme);if(p.lang)setLangKey(p.lang);setPhase("app");}
      else setPhase("onboarding");
    }catch{setPhase("onboarding");}
  };
  const handleOnboardingDone=async(sel)=>{try{await window.storage.set("user_prefs_v2",JSON.stringify({genres:sel,theme,lang:langKey,onboarded:true}));}catch{}setPhase("app");};
  const handleLogout=async()=>{
    try{await window.storage.delete("user_account_v1");}catch{}
    setAccount(null);setPremium(false);setShowSettings(false);
    setTab("feed");
  };
  const markAllNotifs=()=>setNotifs(n=>n.map(x=>({...x,read:true})));
  useEffect(()=>{if(phase!=="app")return;window.storage.set("user_tokens_v1",JSON.stringify(tokens)).catch(()=>{});},[tokens,phase]);

  const fs=accessibility.largeText?1.15:1;
  const RA=accessibility.reduceAnim;

  if(phase==="splash")return <div style={{fontFamily:"'Inter',-apple-system,sans-serif",fontSize:`${fs*14}px`}}><style>{CSS}</style><Splash onDone={handleSplashDone} T={T}/></div>;
  if(phase==="onboarding")return <div style={{fontFamily:"'Inter',-apple-system,sans-serif",fontSize:`${fs*14}px`}}><style>{CSS}</style><Onboarding onDone={handleOnboardingDone} T={T}/></div>;

  const NAV=[
    {id:"feed",lbl:T.feed,icon:(a)=><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a?ct.accent:"rgba(255,255,255,0.3)"} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>},
    {id:"downloads",lbl:T.downloadsTab,icon:(a)=><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a?ct.accent:"rgba(255,255,255,0.3)"} strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>},
    {id:"favs",lbl:T.favs,icon:(a)=><svg width="21" height="21" viewBox="0 0 24 24" fill={a?ct.accent:"none"} stroke={a?ct.accent:"rgba(255,255,255,0.3)"} strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>},
    {id:"playlists",lbl:T.playlists,icon:(a)=><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a?ct.accent:"rgba(255,255,255,0.3)"} strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>},
    {id:"profil",lbl:T.profile,icon:(a)=><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a?ct.accent:"rgba(255,255,255,0.3)"} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>},
  ];

  const curBeat=beats[cur];

  // Settings / Help pages override
  if(showSettings)return(<div style={{width:"100%",height:"100dvh",background:"#030108",display:"flex",flexDirection:"column",fontFamily:"'Inter',-apple-system,sans-serif",fontSize:`${fs*14}px`,overflow:"hidden"}}><style>{CSS}</style>{toast&&<Toast msg={toast}/>}<SettingsPage onBack={()=>setShowSettings(false)} ct={ct} T={T} theme={theme} setTheme={setTheme} langKey={langKey} setLangKey={setLangKey} profile={profile} setProfile={setProfile} premium={premium} onWantPremium={()=>{setShowSettings(false);setShowPremium(true);}} onCancelPremium={()=>setPremium(false)} accessibility={accessibility} setAccessibility={setAccessibility} onToast={showToast} onLogout={handleLogout} onShowHelp={()=>{setShowSettings(false);setShowHelp(true);}}/></div>);
  if(showHelp)return(<div style={{width:"100%",height:"100dvh",background:"#030108",display:"flex",flexDirection:"column",fontFamily:"'Inter',-apple-system,sans-serif",fontSize:`${fs*14}px`,overflow:"hidden"}}><style>{CSS}</style><HelpPage onBack={()=>setShowHelp(false)} ct={ct} T={T}/></div>);

  return(
    <div style={{width:"100%",height:"100dvh",background:"#030108",display:"flex",flexDirection:"column",fontFamily:"'Inter',-apple-system,sans-serif",fontSize:`${fs*14}px`,overflow:"hidden",position:"relative"}}>
      <style>{CSS}</style>
      {toast&&<Toast msg={toast}/>}
      {adState&&<AdModal reason={adState.reason} onDone={handleAdDone} ct={ct} T={T}/>}
      {showDl&&<DownloadModal beat={showDl} premium={premium} onWatchAd={()=>{pendingDl.current=showDl;setShowDl(null);setAdState({reason:"download"});}} onClose={()=>setShowDl(null)} ct={ct} T={T}/>}
      {showPremium&&<PremiumModal onConfirm={activatePremium} onClose={()=>setShowPremium(false)} ct={ct} T={T}/>}
      {showSignup&&<SignupModal onComplete={handleSignupComplete} onClose={()=>{setShowSignup(false);pendingDl.current=null;setSignupReason(null);}} ct={ct} T={T} reason={signupReason}/>}
      {cbeat&&<CommentsModal beat={cbeat} comments={cmap[cbeat.id]||[]} onAdd={txt=>addCom(cbeat.id,txt)} onClose={()=>setCbeat(null)} ct={ct} T={T}/>}
      {showSearch&&<SearchOverlay beats={beats} history={searchHistory} onSelect={i=>{setCur(i);setTab("feed");}} onClose={()=>setShowSearch(false)} onAddHistory={addToHistory} ct={ct} T={T}/>}

      {/* TOP BAR */}
      {tab==="feed"&&<div style={{position:"absolute",top:0,left:0,right:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"50px 14px 12px",background:"linear-gradient(to bottom,rgba(0,0,0,0.55),transparent)",pointerEvents:"none"}}><div style={{display:"flex",alignItems:"center",gap:6,pointerEvents:"auto"}}><div style={{width:32,height:32,borderRadius:10,background:`linear-gradient(135deg,${ct.accent},${ct.accent2})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 14px ${ct.glow}`}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18V5l12-2v13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="6" cy="18" r="3" fill="white"/><circle cx="18" cy="16" r="3" fill="white"/></svg></div><span style={{color:"white",fontSize:17,fontWeight:900,letterSpacing:-0.5}}>{T.appName}</span></div><div style={{display:"flex",alignItems:"center",gap:9,pointerEvents:"auto"}}><div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(255,184,0,0.14)",border:"1px solid rgba(255,184,0,0.35)",borderRadius:18,padding:"6px 12px 6px 9px"}}><span style={{fontSize:14}}>🪙</span><span style={{color:"#FFD700",fontSize:12.5,fontWeight:800}}>{fmtN(tokens.earned)}</span></div><button onClick={()=>setAutoplay(a=>!a)} style={{display:"flex",alignItems:"center",gap:4,padding:"5px 8px",borderRadius:14,background:autoplay?"rgba(0,212,140,0.15)":"rgba(255,255,255,0.07)",border:`1px solid ${autoplay?"rgba(0,212,140,0.4)":"rgba(255,255,255,0.12)"}`,cursor:"pointer"}}><span style={{fontSize:10}}>{autoplay?"🔁":"⏹"}</span><span style={{color:autoplay?"#00D48C":"rgba(255,255,255,0.4)",fontSize:9.5,fontWeight:800,letterSpacing:0.5}}>Auto</span></button><button onClick={()=>setShowSearch(true)} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.1)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button><button onClick={()=>setTab("notifs")} style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.1)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative"}}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>{unreadNotifs>0&&<div style={{position:"absolute",top:6,right:6,width:9,height:9,borderRadius:"50%",background:"#FF2244",border:"1.5px solid #030108"}}/>}</button></div></div>}

      {tab!=="feed"&&tab!=="notifs"&&curBeat&&<MiniPlayer beat={curBeat} playing={playing} setPlaying={setPlaying} elapsed={elapsed} onBack={()=>setTab("feed")} ct={ct} T={T}/>}

      <div style={{flex:1,overflow:"hidden",position:"relative"}}>
        {tab==="feed"&&<div style={{width:"100%",height:"100%",position:"relative"}} onTouchStart={onTS} onTouchEnd={onTE} onWheel={onW}>{beats.map((beat,i)=><div key={beat.id} style={{position:"absolute",inset:0,transform:`translateY(${(i-cur)*100}%)`,transition:RA?"none":"transform 0.4s cubic-bezier(0.4,0,0.2,1)"}}><BeatCard beat={beat} nextBeat={beats[i+1]} isActive={i===cur} onToast={showToast} favs={favs} onFav={toggleFav} commentCount={(cmap[beat.id]||[]).length} onComment={b=>setCbeat(b)} onDownload={handleDownload} ct={ct} playing={i===cur?playing:false} setPlaying={i===cur?setPlaying:()=>{}} elapsed={i===cur?elapsed:0} setElapsed={i===cur?setElapsed:()=>{}} T={T} reduceAnim={RA} account={account} onRequireAuth={requireAuth} onTokens={addTokens}/></div>)}<div style={{position:"absolute",right:5,top:"50%",transform:"translateY(-50%)",display:"flex",flexDirection:"column",gap:4,zIndex:50}}>{beats.slice(Math.max(0,cur-4),cur+6).map((_,i)=>{const idx=Math.max(0,cur-4)+i;return <div key={idx} style={{width:idx===cur?3.5:2,height:idx===cur?22:5,borderRadius:4,background:idx===cur?ct.accent:"rgba(255,255,255,0.2)",transition:RA?"none":"all 0.3s",boxShadow:idx===cur?`0 0 7px ${ct.glow}`:"none"}}/>;})}</div></div>}
        {tab==="downloads"&&<div style={{height:"100%",display:"flex",flexDirection:"column",paddingTop:10}}><DownloadsTab activity={activity} beats={beats} T={T} ct={ct} onPlay={i=>{setCur(i);setTab("feed");}}/></div>}
        {tab==="favs"&&<div style={{height:"100%",display:"flex",flexDirection:"column",paddingTop:10}}><FavsTab favs={favs} onRemove={removeFav} ct={ct} T={T}/></div>}
        {tab==="playlists"&&<div style={{height:"100%",display:"flex",flexDirection:"column",paddingTop:10}}><PlaylistsTab playlists={playlists} beats={beats} onCreatePlaylist={createPlaylist} ct={ct} T={T} account={account} onRequireAuth={requireAuth}/></div>}
        {tab==="notifs"&&<div style={{height:"100%",display:"flex",flexDirection:"column",paddingTop:10}}><NotificationsPanel notifs={notifs} onMarkAll={markAllNotifs} ct={ct} T={T}/></div>}
        {tab==="profil"&&<div style={{height:"100%",display:"flex",flexDirection:"column",paddingTop:4}}>{account?<ProfileTab favs={favs} commentsMap={cmap} ct={ct} premium={premium} premiumUntil={premiumUntil} onShowSettings={()=>setShowSettings(true)} profile={profile} tokens={tokens} joinDate={joinDate} T={T} onWantPremium={()=>setShowPremium(true)} account={account} activity={activity}/>:<ProfileLocked onSignup={()=>requireAuth("profile")} ct={ct} T={T}/>}</div>}
      </div>

      <div style={{display:"flex",background:"rgba(3,1,8,0.98)",borderTop:"1px solid rgba(255,255,255,0.05)",backdropFilter:"blur(26px)",paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
        {NAV.map(n=>{const a=tab===n.id;return <button key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,padding:"11px 0 9px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,position:"relative"}}>{n.icon(a)}<span style={{fontSize:9,fontWeight:700,letterSpacing:0.5,color:a?ct.accent:"rgba(255,255,255,0.27)",transition:"color 0.2s"}}>{n.lbl}</span>{a&&<div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:16,height:2,borderRadius:2,background:ct.accent,boxShadow:`0 0 8px ${ct.glow}`}}/>}</button>;})}
      </div>
    </div>
  );
}
