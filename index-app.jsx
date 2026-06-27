import { useState, useEffect, useRef } from "react";

const NAVY="#04102B",NAVY2="#0B1E3D",TEAL="#00D9B4",SKY="#4B7FFF",
      BG="#F4F7FC",WHITE="#FFFFFF",TEXT="#0F1D38",MUTED="#64748B",
      BORD="#E2E8F0",TEAL_BG="rgba(0,217,180,0.1)",TEAL_BD="rgba(0,217,180,0.22)";

const ROLES=[
  {id:"student",label:"Student",icon:"🎓",desc:"Gain real experience on industry and research challenges"},
  {id:"researcher",label:"Researcher",icon:"🔬",desc:"Find partners to amplify your research impact"},
  {id:"industry",label:"Industry",icon:"🏭",desc:"Post real challenges, access top-tier talent"},
  {id:"university",label:"University",icon:"🏛️",desc:"Bridge your campus to the innovation ecosystem"},
];

const SKILLS_DB=["Machine Learning","Python","Data Analysis","React","IoT","Chemistry","Electrical Engineering","UI/UX Design","Arabic NLP","Computer Vision","Robotics","Cybersecurity","Bioinformatics","Materials Science","Urban Planning","Psychology"];

const TYPE_COLORS={Industry:"#FF6B4A",Research:SKY,Academia:"#A855F7"};

const IDEAS=[
  {id:1,type:"Industry",cat:"Environmental Tech",title:"AI-Driven Water Management for UAE Desert Agriculture",
   desc:"ML models to optimize irrigation and cut water waste by 40% using real-time sensor data and predictive analytics.",
   problem:"UAE agriculture wastes over 70% of irrigation water due to inefficient scheduling. Climate change is accelerating desertification, threatening food security. Existing solutions are too costly for small farms.",
   skills:["Machine Learning","Python","IoT","Data Analysis"],
   courses:["Machine Learning Specialization – Coursera","IoT Fundamentals – Cisco Academy","Data Analysis with Python – edX"],
   author:"Dr. Khalid Al-Mansoori",role:"Researcher",org:"UAE University",team:3,maxTeam:6,papers:2,posted:"2 days ago",status:"Open",match:87},
  {id:2,type:"Research",cat:"Linguistics & AI",title:"Open-Source Arabic NLP Benchmark Dataset",
   desc:"The first comprehensive Arabic NLP benchmark covering dialects from 22 countries for open model training and evaluation.",
   problem:"Arabic NLP lags behind English by ~8 years due to a lack of standardized, public training datasets — limiting AI for 400M+ Arabic speakers.",
   skills:["Arabic NLP","Python","Data Analysis","Linguistics"],
   courses:["NLP Specialization – Stanford Online","Arabic Digital Humanities – FutureLearn"],
   author:"Dr. Layla Hassan",role:"Researcher",org:"Khalifa University",team:2,maxTeam:5,papers:4,posted:"5 days ago",status:"Open",match:73},
  {id:3,type:"Industry",cat:"Smart Cities",title:"Predictive Traffic Optimization for Dubai Roads",
   desc:"Computer vision and reinforcement learning to cut commute times by 25% through adaptive signal control across major intersections.",
   problem:"Dubai loses AED 4.2B annually to congestion. Current signal systems are static and cannot respond to real-time traffic or incidents.",
   skills:["Computer Vision","Reinforcement Learning","Python","Urban Planning"],
   courses:["Deep Learning Specialization – Coursera","Smart Cities – MIT OCW"],
   author:"Roads & Transport Authority",role:"Industry",org:"RTA Dubai",team:4,maxTeam:8,papers:1,posted:"1 week ago",status:"Open",match:65},
  {id:4,type:"Academia",cat:"Mental Health",title:"Student Mental Health Early-Warning Platform",
   desc:"Anonymous behavioral analytics detecting early signs of mental health deterioration in university students via app usage patterns.",
   problem:"1 in 4 UAE students reports anxiety or depression, yet 68% never seek help due to stigma. Early intervention is critical but currently absent.",
   skills:["UI/UX Design","React","Psychology","Data Analysis"],
   courses:["Mental Health in the Workplace – FutureLearn","UX Research – Google Certificate"],
   author:"Prof. Sarah Malik",role:"Researcher",org:"American University of Sharjah",team:2,maxTeam:5,papers:3,posted:"3 days ago",status:"Open",match:91},
  {id:5,type:"Industry",cat:"Energy",title:"Smart Grid Integration for Residential Solar in Abu Dhabi",
   desc:"Bidirectional smart grid system enabling residential solar owners to sell excess power back to the grid efficiently.",
   problem:"Abu Dhabi has ambitious solar targets but no micro-grid infrastructure. 34% of potential solar capacity sits unused due to grid barriers.",
   skills:["Electrical Engineering","IoT","Python","Data Analysis"],
   courses:["Solar Energy – TU Delft via edX","Power Systems – IEEE Learning Network"],
   author:"ADNOC Clean Energy",role:"Industry",org:"ADNOC",team:3,maxTeam:7,papers:0,posted:"4 days ago",status:"Open",match:60},
  {id:6,type:"Research",cat:"Materials Science",title:"Bio-Inspired Carbon Capture from UAE Marine Life",
   desc:"Porous carbon materials inspired by UAE coral reef structures for efficient industrial CO₂ capture at scale.",
   problem:"Current carbon capture is expensive and energy-intensive. UAE needs cost-effective solutions aligned with its Net Zero 2050 strategy.",
   skills:["Materials Science","Chemistry","Bioinformatics"],
   courses:["Materials Science – MIT OCW","Green Chemistry – ACS Courses"],
   author:"Dr. Omar Khalifa",role:"Researcher",org:"KAUST",team:1,maxTeam:4,papers:5,posted:"1 week ago",status:"Open",match:45},
];

const COURSE_MAP={
  "Machine Learning":"Machine Learning Specialization – Coursera",
  "Python":"Python for Everybody – Coursera",
  "IoT":"IoT Fundamentals – Cisco Academy",
  "Data Analysis":"Google Data Analytics Certificate",
  "React":"Full Stack Open – University of Helsinki",
  "UI/UX Design":"Google UX Design Certificate",
  "Computer Vision":"Computer Vision Specialization – Coursera",
  "Arabic NLP":"NLP with Python – edX",
  "Electrical Engineering":"Power Electronics – NPTEL",
  "Materials Science":"Materials Science – MIT OCW",
};

function IdeaCard({idea,onOpen}){
  const [hov,setHov]=useState(false);
  const tc=TYPE_COLORS[idea.type]||MUTED;
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={()=>onOpen(idea)}
      style={{background:WHITE,border:`1.5px solid ${hov?TEAL:BORD}`,borderRadius:18,padding:"20px 20px 16px",
        cursor:"pointer",transition:"all 0.2s",transform:hov?"translateY(-3px)":"none",
        boxShadow:hov?"0 10px 28px rgba(0,217,180,0.12)":"0 2px 8px rgba(15,29,56,0.05)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
        <span style={{padding:"3px 10px",borderRadius:999,background:`${tc}18`,color:tc,fontSize:11,fontWeight:700,letterSpacing:"0.06em"}}>{idea.type.toUpperCase()}</span>
        <span style={{fontSize:12,color:TEAL,fontWeight:700,background:TEAL_BG,padding:"3px 10px",borderRadius:999}}>{idea.match}% match</span>
      </div>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:14,fontWeight:700,color:TEXT,marginBottom:7,lineHeight:1.4,minHeight:40}}>{idea.title}</div>
      <div style={{fontSize:12.5,color:MUTED,lineHeight:1.6,marginBottom:12,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{idea.desc}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
        {idea.skills.slice(0,3).map(s=>(
          <span key={s} style={{padding:"3px 9px",borderRadius:999,background:BG,color:MUTED,fontSize:11,border:`1px solid ${BORD}`}}>{s}</span>
        ))}
        {idea.skills.length>3&&<span style={{fontSize:11,color:MUTED,padding:"3px 0"}}>+{idea.skills.length-3}</span>}
      </div>
      <div style={{borderTop:`1px solid ${BORD}`,paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:11,color:MUTED}}>{idea.team}/{idea.maxTeam} members · {idea.posted}</span>
        <span style={{fontSize:12,color:TEAL,fontWeight:600}}>View →</span>
      </div>
    </div>
  );
}

export default function IndexApp(){
  const [view,setView]=useState("home");
  const [user,setUser]=useState(null);
  const [auth,setAuth]=useState(null);
  const [aStep,setAStep]=useState(1);
  const [aData,setAData]=useState({role:"",name:"",email:"",org:"",skills:[]});
  const [sel,setSel]=useState(null);
  const [filt,setFilt]=useState("All");
  const [srch,setSrch]=useState("");
  const [sStep,setSStep]=useState(1);
  const [sDone,setSDone]=useState(false);
  const [form,setForm]=useState({type:"Industry",title:"",desc:"",problem:"",limits:"",skills:[],skillIn:"",maxTeam:4,timeline:"3 months"});
  const cvs=useRef(null);

  useEffect(()=>{
    if(view!=="home")return;
    const canvas=cvs.current; if(!canvas)return;
    const ctx=canvas.getContext("2d");
    canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight;
    const LBL=["Industry","Academia","Research","Innovation","Students"];
    const nodes=Array.from({length:60},()=>({
      x:Math.random()*canvas.width, y:Math.random()*canvas.height,
      vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
      r:Math.random()*1.8+.8,
      label:Math.random()>.88?LBL[Math.floor(Math.random()*LBL.length)]:null,
      ph:Math.random()*Math.PI*2,
    }));
    let raf;
    const draw=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(const n of nodes){
        n.x+=n.vx; n.y+=n.vy; n.ph+=.018;
        if(n.x<-60)n.x=canvas.width+60; if(n.x>canvas.width+60)n.x=-60;
        if(n.y<-60)n.y=canvas.height+60; if(n.y>canvas.height+60)n.y=-60;
      }
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<130){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=`rgba(0,217,180,${(1-d/130)*.28})`;ctx.lineWidth=1;ctx.stroke();}
      }
      for(const n of nodes){
        const p=Math.sin(n.ph)*.5+.5;
        if(n.label){
          ctx.beginPath();ctx.arc(n.x,n.y,16+p*5,0,Math.PI*2);
          ctx.fillStyle=`rgba(0,217,180,${.05+p*.07})`;ctx.fill();
          ctx.beginPath();ctx.arc(n.x,n.y,4,0,Math.PI*2);
          ctx.fillStyle=`rgba(0,217,180,${.7+p*.3})`;ctx.fill();
          ctx.font="500 11px DM Sans,sans-serif";
          ctx.fillStyle=`rgba(0,217,180,${.45+p*.3})`;ctx.textAlign="center";
          ctx.fillText(n.label,n.x,n.y-12);
        } else {
          ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
          ctx.fillStyle=`rgba(75,143,255,${.2+p*.18})`;ctx.fill();
        }
      }
      raf=requestAnimationFrame(draw);
    };
    if(!window.matchMedia("(prefers-reduced-motion:reduce)").matches)draw();
    return()=>cancelAnimationFrame(raf);
  },[view]);

  const login=()=>{
    const n=aData.name||"Safwan Ahmed";
    setUser({name:n,role:aData.role||"Student",org:aData.org||"UAE University",
      initials:n.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2),
      skills:aData.skills.length?aData.skills:["Machine Learning","Python","UI/UX Design"]});
    setAuth(null);setAStep(1);setView("dashboard");
  };
  const openIdea=idea=>{setSel(idea);setView("detail");};
  const addSkill=s=>{if(s&&!form.skills.includes(s))setForm(f=>({...f,skills:[...f.skills,s],skillIn:""}));};
  const resetSubmit=()=>{setSDone(false);setSStep(1);setForm({type:"Industry",title:"",desc:"",problem:"",limits:"",skills:[],skillIn:"",maxTeam:4,timeline:"3 months"});};

  const inp={width:"100%",padding:"10px 13px",border:`1.5px solid ${BORD}`,borderRadius:10,fontSize:14,fontFamily:"DM Sans,sans-serif",display:"block",color:TEXT,background:WHITE,outline:"none"};
  const lbl={display:"block",fontSize:13,fontWeight:600,color:TEXT,marginBottom:6};
  const PBtn={width:"100%",padding:"12px 0",background:TEAL,border:"none",borderRadius:12,color:NAVY,fontFamily:"DM Sans,sans-serif",fontSize:15,fontWeight:700,cursor:"pointer"};
  const GBtn={padding:"11px 20px",background:WHITE,border:`1.5px solid ${BORD}`,borderRadius:12,color:MUTED,fontFamily:"DM Sans,sans-serif",fontSize:14,cursor:"pointer"};

  function Sidebar(){
    const NAV=[{id:"dashboard",icon:"⊞",label:"Dashboard"},{id:"browse",icon:"🔍",label:"Browse Challenges"},{id:"submit",icon:"✦",label:"Submit Idea"},{id:"junior",icon:"🎒",label:"INDEX Junior"}];
    return(
      <aside style={{width:228,background:NAVY2,flexShrink:0,display:"flex",flexDirection:"column",minHeight:"100vh",position:"sticky",top:0,zIndex:10}}>
        <div style={{padding:"22px 18px 18px",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
          <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:20,color:WHITE}}>INDEX<span style={{color:TEAL}}>.</span></div>
        </div>
        {NAV.map(item=>(
          <button key={item.id} onClick={()=>{if(item.id==="submit")resetSubmit();setView(item.id);}}
            style={{display:"flex",alignItems:"center",gap:11,width:"100%",padding:"12px 18px",
              background:view===item.id?"rgba(0,217,180,.12)":"transparent",
              boxShadow:view===item.id?`inset 3px 0 0 ${TEAL}`:"none",
              border:"none",color:view===item.id?TEAL:"rgba(255,255,255,.5)",
              fontSize:13.5,fontWeight:500,cursor:"pointer",textAlign:"left",fontFamily:"DM Sans,sans-serif",transition:"all .15s"}}>
            <span style={{fontSize:15}}>{item.icon}</span>{item.label}
          </button>
        ))}
        <div style={{marginTop:"auto",padding:"16px 18px",borderTop:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,borderRadius:"50%",background:TEAL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:NAVY,flexShrink:0}}>
            {user?.initials||"SA"}
          </div>
          <div style={{overflow:"hidden"}}>
            <div style={{fontSize:13,fontWeight:600,color:WHITE,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user?.name||"Safwan Ahmed"}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>{user?.role||"Student"}</div>
          </div>
        </div>
      </aside>
    );
  }

  function Home(){
    return(
      <div>
        <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"17px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(4,16,43,.92)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
          <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:22,color:WHITE}}>INDEX<span style={{color:TEAL}}>.</span></div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setAuth("login")} style={{padding:"9px 20px",background:"transparent",border:"1px solid rgba(255,255,255,.25)",borderRadius:999,color:WHITE,fontSize:14,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}>Sign In</button>
            <button onClick={()=>setAuth("signup")} style={{padding:"9px 20px",background:TEAL,border:"none",borderRadius:999,color:NAVY,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}>Get Started</button>
          </div>
        </nav>
        <div style={{background:NAVY,minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden"}}>
          <canvas ref={cvs} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.65}}/>
          <div style={{position:"relative",zIndex:2,padding:"0 60px",maxWidth:680,marginTop:80}}>
            <div style={{display:"flex",alignItems:"center",gap:10,fontSize:11,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:TEAL,marginBottom:24}}>
              <div style={{width:26,height:1.5,background:TEAL}}/>Industry · Academia · Research · Innovation
            </div>
            <h1 style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(46px,6.5vw,80px)",fontWeight:800,lineHeight:1.04,letterSpacing:"-2.5px",color:WHITE,marginBottom:24}}>
              Where<br/>Problems<br/><span style={{color:TEAL}}>Meet Solutions.</span>
            </h1>
            <p style={{fontSize:18,fontWeight:300,color:"rgba(255,255,255,.55)",maxWidth:500,lineHeight:1.75,marginBottom:42}}>
              INDEX connects companies, universities, researchers, and students — turning UAE's real-world challenges into collaborative breakthroughs.
            </p>
            <div style={{display:"flex",gap:14}}>
              <button onClick={()=>setAuth("signup")} style={{padding:"14px 32px",background:TEAL,border:"none",borderRadius:999,color:NAVY,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}>Join the Ecosystem</button>
              <button onClick={()=>setAuth("login")} style={{padding:"13px 32px",background:"transparent",border:"1.5px solid rgba(255,255,255,.3)",borderRadius:999,color:WHITE,fontSize:16,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}>Sign In</button>
            </div>
          </div>
        </div>
        <div style={{background:WHITE,padding:"32px 60px",display:"flex",justifyContent:"center",gap:80,flexWrap:"wrap",borderBottom:`1px solid ${BORD}`}}>
          {[["247","Active Challenges"],["1,842","Collaborators"],["34","Universities"],["89","Industry Partners"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:36,fontWeight:800,color:TEXT}}>{v}</div>
              <div style={{fontSize:13,color:MUTED,marginTop:4}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{background:BG,padding:"96px 60px"}}>
          <div style={{textAlign:"center",marginBottom:60}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",color:TEAL,marginBottom:14}}>Platform Features</div>
            <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:800,letterSpacing:"-1px",color:TEXT}}>Everything to Collaborate,<br/>All in One Place</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,maxWidth:1080,margin:"0 auto"}}>
            {[["🧠","AI Skill Matching","Matched to projects based on your skills and interests automatically"],["⚡","Industry Challenges","Real problems posted by UAE companies ready for collaborative solutions"],["🔗","Research Hub","Connect research to industry partners, students, and funding"],["📚","Learning Paths","Personalized course recommendations to close skill gaps"],["🌐","Knowledge Network","Every challenge linked to research papers and case studies"],["🚀","Team Workspace","Share, discuss, and track project milestones together"]].map(([icon,title,desc])=>(
              <div key={title} style={{background:WHITE,border:`1.5px solid ${BORD}`,borderRadius:18,padding:"28px 26px"}}>
                <div style={{fontSize:28,marginBottom:14}}>{icon}</div>
                <div style={{fontFamily:"Syne,sans-serif",fontSize:15,fontWeight:700,color:TEXT,marginBottom:8}}>{title}</div>
                <div style={{fontSize:13,color:MUTED,lineHeight:1.65}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:NAVY,padding:"100px 60px",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,217,180,.13) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",color:TEAL,marginBottom:16}}>Get Started</div>
            <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(30px,5vw,60px)",fontWeight:800,color:WHITE,letterSpacing:"-2px",lineHeight:1.05,marginBottom:18}}>Ready to Join<br/>the Ecosystem?</h2>
            <p style={{fontSize:16,color:"rgba(255,255,255,.5)",marginBottom:40,maxWidth:440,margin:"0 auto 40px"}}>Student, researcher, company, or university — INDEX has a place for you.</p>
            <div style={{display:"flex",gap:14,justifyContent:"center"}}>
              <button onClick={()=>setAuth("signup")} style={{padding:"14px 32px",background:TEAL,border:"none",borderRadius:999,color:NAVY,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}>Create Your Profile</button>
              <button onClick={()=>setAuth("signup")} style={{padding:"13px 32px",background:"transparent",border:"1.5px solid rgba(255,255,255,.3)",borderRadius:999,color:WHITE,fontSize:16,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}>Post a Challenge</button>
            </div>
          </div>
        </div>
        <div style={{background:"#020B1C",padding:"28px 60px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:18,color:WHITE}}>INDEX<span style={{color:TEAL}}>.</span></div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.25)"}}>© 2025 INDEX · Where Problems Meet Solutions</div>
        </div>
      </div>
    );
  }

  function AuthModal(){
    return(
      <div style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(4,16,43,.88)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}
        onClick={e=>{if(e.target===e.currentTarget){setAuth(null);setAStep(1);setAData({role:"",name:"",email:"",org:"",skills:[]});}}}>
        <div style={{background:WHITE,borderRadius:24,padding:"38px 42px",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
          {auth==="login"?(
            <div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:26,fontWeight:800,color:TEXT,marginBottom:6}}>Welcome back</div>
              <div style={{fontSize:14,color:MUTED,marginBottom:28}}>Sign in to your INDEX account</div>
              <label style={lbl}>Email</label>
              <input style={{...inp,marginBottom:14}} placeholder="you@email.com" type="email" onChange={e=>setAData(d=>({...d,email:e.target.value}))}/>
              <label style={lbl}>Password</label>
              <input style={{...inp,marginBottom:24}} placeholder="••••••••" type="password"/>
              <button onClick={login} style={PBtn}>Sign In →</button>
              <div style={{textAlign:"center",marginTop:18,fontSize:14,color:MUTED}}>
                No account?{" "}<span style={{color:TEAL,cursor:"pointer",fontWeight:600}} onClick={()=>{setAuth("signup");setAStep(1);}}>Join INDEX</span>
              </div>
            </div>
          ):(
            <div>
              {aStep===1&&(
                <div>
                  <div style={{fontFamily:"Syne,sans-serif",fontSize:26,fontWeight:800,color:TEXT,marginBottom:6}}>Join INDEX</div>
                  <div style={{fontSize:14,color:MUTED,marginBottom:22}}>I am a...</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    {ROLES.map(r=>(
                      <div key={r.id} onClick={()=>setAData(d=>({...d,role:r.label}))}
                        style={{border:`2px solid ${aData.role===r.label?TEAL:BORD}`,borderRadius:14,padding:"16px 14px",cursor:"pointer",background:aData.role===r.label?TEAL_BG:WHITE,transition:"all .15s"}}>
                        <div style={{fontSize:24,marginBottom:6}}>{r.icon}</div>
                        <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:14,color:TEXT,marginBottom:4}}>{r.label}</div>
                        <div style={{fontSize:11,color:MUTED,lineHeight:1.5}}>{r.desc}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={()=>aData.role&&setAStep(2)} style={{...PBtn,marginTop:20,opacity:aData.role?1:.45}}>Continue →</button>
                  <div style={{textAlign:"center",marginTop:16,fontSize:14,color:MUTED}}>
                    Have an account?{" "}<span style={{color:TEAL,cursor:"pointer",fontWeight:600}} onClick={()=>setAuth("login")}>Sign In</span>
                  </div>
                </div>
              )}
              {aStep===2&&(
                <div>
                  <div style={{fontFamily:"Syne,sans-serif",fontSize:22,fontWeight:800,color:TEXT,marginBottom:4}}>Your Details</div>
                  <div style={{fontSize:13,color:MUTED,marginBottom:22}}>Setting up your {aData.role} profile</div>
                  <label style={lbl}>Full Name</label>
                  <input style={{...inp,marginBottom:14}} placeholder="Your full name" value={aData.name} onChange={e=>setAData(d=>({...d,name:e.target.value}))}/>
                  <label style={lbl}>Email</label>
                  <input style={{...inp,marginBottom:14}} placeholder="you@email.com" type="email" value={aData.email} onChange={e=>setAData(d=>({...d,email:e.target.value}))}/>
                  <label style={lbl}>{aData.role==="Industry"?"Company Name":"University / Institution"}</label>
                  <input style={{...inp,marginBottom:24}} placeholder={aData.role==="Industry"?"Your company":"e.g. UAE University, Khalifa University"} value={aData.org} onChange={e=>setAData(d=>({...d,org:e.target.value}))}/>
                  <div style={{display:"flex",gap:10}}>
                    <button onClick={()=>setAStep(1)} style={GBtn}>← Back</button>
                    <button onClick={()=>setAStep(3)} style={{...PBtn,flex:1}}>Continue →</button>
                  </div>
                </div>
              )}
              {aStep===3&&(
                <div>
                  <div style={{fontFamily:"Syne,sans-serif",fontSize:22,fontWeight:800,color:TEXT,marginBottom:4}}>Your Skills</div>
                  <div style={{fontSize:13,color:MUTED,marginBottom:18}}>Select skills for better project matches</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:24}}>
                    {SKILLS_DB.slice(0,14).map(s=>{
                      const sel2=aData.skills.includes(s);
                      return(
                        <button key={s} onClick={()=>setAData(d=>({...d,skills:sel2?d.skills.filter(x=>x!==s):[...d.skills,s]}))}
                          style={{padding:"6px 14px",borderRadius:999,border:`1.5px solid ${sel2?TEAL:BORD}`,background:sel2?TEAL_BG:WHITE,color:sel2?TEAL:MUTED,fontSize:13,cursor:"pointer",fontWeight:sel2?600:400,transition:"all .12s",fontFamily:"DM Sans,sans-serif"}}>
                          {s}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{display:"flex",gap:10}}>
                    <button onClick={()=>setAStep(2)} style={GBtn}>← Back</button>
                    <button onClick={login} style={{...PBtn,flex:1}}>🎉 Create Account</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  function Dashboard(){
    const top3=[...IDEAS].sort((a,b)=>b.match-a.match).slice(0,3);
    return(
      <div style={{display:"flex",minHeight:"100vh"}}>
        <Sidebar/>
        <main style={{flex:1,padding:"36px 40px",background:BG,overflowY:"auto"}}>
          <div style={{marginBottom:30}}>
            <h1 style={{fontFamily:"Syne,sans-serif",fontSize:24,fontWeight:800,color:TEXT}}>Good morning, {user?.name?.split(" ")[0]||"Safwan"}! 👋</h1>
            <p style={{fontSize:14,color:MUTED,marginTop:4}}>Here are challenges matching your profile</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:32}}>
            {[["12","Skill Matches","🎯",TEAL],["2","Active Projects","⚡",SKY],["74%","Profile Score","📈","#FF6B4A"],["8","Connections","🔗","#A855F7"]].map(([v,l,icon,col])=>(
              <div key={l} style={{background:WHITE,border:`1.5px solid ${BORD}`,borderRadius:16,padding:"18px 20px"}}>
                <div style={{fontSize:22,marginBottom:8}}>{icon}</div>
                <div style={{fontFamily:"Syne,sans-serif",fontSize:28,fontWeight:800,color:col}}>{v}</div>
                <div style={{fontSize:13,color:MUTED,marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:17,fontWeight:700,color:TEXT}}>Recommended for You</div>
            <button onClick={()=>setView("browse")} style={{fontSize:13,color:TEAL,background:"none",border:"none",cursor:"pointer",fontWeight:600,padding:0,fontFamily:"DM Sans,sans-serif"}}>View All →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:30}}>
            {top3.map(idea=><IdeaCard key={idea.id} idea={idea} onOpen={openIdea}/>)}
          </div>
          <div style={{background:`linear-gradient(135deg,${NAVY} 0%,${NAVY2} 100%)`,borderRadius:20,padding:"26px 32px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:15,fontWeight:700,color:WHITE,marginBottom:4}}>Your profile is 74% complete</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,.5)"}}>Add portfolio links and research interests for better matches</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:20}}>
              <div>
                <div style={{width:120,height:7,background:"rgba(255,255,255,.15)",borderRadius:999,overflow:"hidden",marginBottom:6}}>
                  <div style={{width:"74%",height:"100%",background:TEAL,borderRadius:999}}/>
                </div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)",textAlign:"right"}}>74%</div>
              </div>
              <button style={{padding:"9px 18px",background:TEAL,border:"none",borderRadius:999,color:NAVY,fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"DM Sans,sans-serif"}}>Complete Profile</button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  function Browse(){
    const filtered=IDEAS.filter(i=>(filt==="All"||i.type===filt)&&(!srch||i.title.toLowerCase().includes(srch.toLowerCase())||i.skills.some(s=>s.toLowerCase().includes(srch.toLowerCase()))));
    return(
      <div style={{display:"flex",minHeight:"100vh"}}>
        <Sidebar/>
        <main style={{flex:1,padding:"36px 40px",background:BG}}>
          <h1 style={{fontFamily:"Syne,sans-serif",fontSize:24,fontWeight:800,color:TEXT,marginBottom:4}}>Browse Challenges</h1>
          <p style={{fontSize:14,color:MUTED,marginBottom:26}}>{filtered.length} open challenges · Find your next collaboration</p>
          <div style={{display:"flex",gap:12,marginBottom:26}}>
            <input value={srch} onChange={e=>setSrch(e.target.value)} placeholder="Search by title, skill, or keyword..."
              style={{...inp,flex:1,borderRadius:12}}/>
            <div style={{display:"flex",gap:8}}>
              {["All","Industry","Research","Academia"].map(f=>(
                <button key={f} onClick={()=>setFilt(f)}
                  style={{padding:"9px 16px",borderRadius:999,border:`1.5px solid ${filt===f?TEAL:BORD}`,background:filt===f?TEAL_BG:WHITE,color:filt===f?TEAL:MUTED,fontSize:13,fontWeight:filt===f?600:400,cursor:"pointer",fontFamily:"DM Sans,sans-serif",transition:"all .15s"}}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
            {filtered.map(idea=><IdeaCard key={idea.id} idea={idea} onOpen={openIdea}/>)}
          </div>
          {!filtered.length&&(
            <div style={{textAlign:"center",padding:"60px 0",color:MUTED}}>
              <div style={{fontSize:40,marginBottom:12}}>🔍</div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:18,fontWeight:700,color:TEXT,marginBottom:8}}>No challenges found</div>
              <div style={{fontSize:14}}>Try a different search or filter</div>
            </div>
          )}
        </main>
      </div>
    );
  }

  function Submit(){
    const STEPS=["Basic Info","The Problem","Skills & Team","References"];
    const recs=form.skills.filter(s=>COURSE_MAP[s]).map(s=>COURSE_MAP[s]);
    if(sDone)return(
      <div style={{display:"flex",minHeight:"100vh"}}>
        <Sidebar/>
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:BG}}>
          <div style={{textAlign:"center",maxWidth:420,padding:40}}>
            <div style={{width:80,height:80,borderRadius:"50%",background:TEAL_BG,border:`2px solid ${TEAL}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 24px"}}>🎉</div>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:28,fontWeight:800,color:TEXT,marginBottom:12}}>Idea Submitted!</div>
            <div style={{fontSize:15,color:MUTED,lineHeight:1.7,marginBottom:32}}>Your challenge is live on INDEX. Our AI is already finding the best collaborators for your project.</div>
            <button onClick={()=>{setView("browse");resetSubmit();}} style={PBtn}>Browse All Challenges</button>
            <button onClick={()=>{setView("dashboard");resetSubmit();}} style={{...GBtn,width:"100%",marginTop:12}}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    );
    return(
      <div style={{display:"flex",minHeight:"100vh"}}>
        <Sidebar/>
        <main style={{flex:1,padding:"36px",background:BG,overflowY:"auto"}}>
          <div style={{maxWidth:660,margin:"0 auto"}}>
            <h1 style={{fontFamily:"Syne,sans-serif",fontSize:24,fontWeight:800,color:TEXT,marginBottom:4}}>Submit an Idea</h1>
            <p style={{fontSize:14,color:MUTED,marginBottom:34}}>Share a challenge or research opportunity with the INDEX community</p>
            <div style={{display:"flex",marginBottom:38,position:"relative"}}>
              <div style={{position:"absolute",top:15,left:"8%",right:"8%",height:2,background:BORD,zIndex:0}}/>
              <div style={{position:"absolute",top:15,left:"8%",width:`${((sStep-1)/(STEPS.length-1))*84}%`,height:2,background:TEAL,zIndex:0,transition:"width .3s"}}/>
              {STEPS.map((s,i)=>{
                const done=sStep>i+1,active=sStep===i+1;
                return(
                  <div key={s} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative",zIndex:1}}>
                    <div style={{width:30,height:30,borderRadius:"50%",background:done?TEAL:active?NAVY:WHITE,border:`2px solid ${done||active?TEAL:BORD}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:done?NAVY:active?WHITE:MUTED}}>
                      {done?"✓":i+1}
                    </div>
                    <div style={{fontSize:11,color:active?TEAL:MUTED,marginTop:6,fontWeight:active?600:400,textAlign:"center",whiteSpace:"nowrap"}}>{s}</div>
                  </div>
                );
              })}
            </div>
            <div style={{background:WHITE,border:`1.5px solid ${BORD}`,borderRadius:20,padding:"32px 36px"}}>
              {sStep===1&&(
                <div>
                  <h2 style={{fontFamily:"Syne,sans-serif",fontSize:17,fontWeight:700,color:TEXT,marginBottom:22}}>About Your Idea</h2>
                  <label style={lbl}>Type</label>
                  <div style={{display:"flex",gap:8,marginBottom:20}}>
                    {["Industry","Academia","Research"].map(t=>(
                      <button key={t} onClick={()=>setForm(f=>({...f,type:t}))}
                        style={{padding:"8px 20px",borderRadius:999,border:`1.5px solid ${form.type===t?TEAL:BORD}`,background:form.type===t?TEAL_BG:WHITE,color:form.type===t?TEAL:MUTED,fontSize:13,fontWeight:form.type===t?600:400,cursor:"pointer",transition:"all .15s",fontFamily:"DM Sans,sans-serif"}}>
                        {t}
                      </button>
                    ))}
                  </div>
                  <label style={lbl}>Topic / Title</label>
                  <input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="e.g. AI-Driven Water Management System for UAE Agriculture" style={{...inp,marginBottom:18}}/>
                  <label style={lbl}>Description</label>
                  <textarea value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} placeholder="Briefly describe the challenge and what a solution would look like..." rows={4} style={{...inp,resize:"vertical",marginBottom:0}}/>
                </div>
              )}
              {sStep===2&&(
                <div>
                  <h2 style={{fontFamily:"Syne,sans-serif",fontSize:17,fontWeight:700,color:TEXT,marginBottom:22}}>The Problem</h2>
                  <label style={lbl}>Problem Statement</label>
                  <textarea value={form.problem} onChange={e=>setForm(f=>({...f,problem:e.target.value}))} placeholder="What specific problem are you trying to solve? Be as precise as possible..." rows={4} style={{...inp,resize:"vertical",marginBottom:18}}/>
                  <label style={lbl}>Current Solutions & Limitations</label>
                  <textarea value={form.limits} onChange={e=>setForm(f=>({...f,limits:e.target.value}))} placeholder="What solutions already exist? Why aren't they sufficient?" rows={3} style={{...inp,resize:"vertical",marginBottom:0}}/>
                </div>
              )}
              {sStep===3&&(
                <div>
                  <h2 style={{fontFamily:"Syne,sans-serif",fontSize:17,fontWeight:700,color:TEXT,marginBottom:22}}>Skills & Team</h2>
                  <label style={lbl}>Skills Required</label>
                  <input value={form.skillIn} onChange={e=>setForm(f=>({...f,skillIn:e.target.value}))} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addSkill(form.skillIn);}}} placeholder="Type a skill and press Enter, or click below" style={{...inp,marginBottom:10}}/>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                    {SKILLS_DB.filter(s=>!form.skills.includes(s)).slice(0,9).map(s=>(
                      <button key={s} onClick={()=>addSkill(s)} style={{padding:"4px 11px",borderRadius:999,border:`1px solid ${BORD}`,background:BG,color:MUTED,fontSize:12,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}>+ {s}</button>
                    ))}
                  </div>
                  {form.skills.length>0&&(
                    <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:18}}>
                      {form.skills.map(s=>(
                        <span key={s} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:999,background:TEAL_BG,border:`1.5px solid ${TEAL}`,color:TEAL,fontSize:13,fontWeight:600}}>
                          {s}<span onClick={()=>setForm(f=>({...f,skills:f.skills.filter(x=>x!==s)}))} style={{cursor:"pointer",fontWeight:700,lineHeight:1}}>×</span>
                        </span>
                      ))}
                    </div>
                  )}
                  {recs.length>0&&(
                    <div style={{background:BG,border:`1.5px solid ${BORD}`,borderRadius:14,padding:"14px 18px",marginBottom:18}}>
                      <div style={{fontSize:11,fontWeight:700,color:TEAL,marginBottom:10,letterSpacing:".1em",textTransform:"uppercase"}}>✦ AI Course Recommendations</div>
                      {recs.map(c=>(
                        <div key={c} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:TEXT,marginBottom:6}}>
                          <div style={{width:6,height:6,borderRadius:"50%",background:TEAL,flexShrink:0}}/>{c}
                        </div>
                      ))}
                    </div>
                  )}
                  <label style={lbl}>Team Size (max members)</label>
                  <div style={{display:"flex",gap:8}}>
                    {[2,3,4,5,6,8].map(n=>(
                      <button key={n} onClick={()=>setForm(f=>({...f,maxTeam:n}))}
                        style={{width:42,height:42,borderRadius:10,border:`1.5px solid ${form.maxTeam===n?TEAL:BORD}`,background:form.maxTeam===n?TEAL_BG:WHITE,color:form.maxTeam===n?TEAL:MUTED,fontWeight:form.maxTeam===n?700:400,cursor:"pointer",fontSize:14,fontFamily:"DM Sans,sans-serif"}}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {sStep===4&&(
                <div>
                  <h2 style={{fontFamily:"Syne,sans-serif",fontSize:17,fontWeight:700,color:TEXT,marginBottom:22}}>Research & References</h2>
                  <label style={lbl}>Related Research Paper</label>
                  <input placeholder="Paste URL or DOI (e.g. https://arxiv.org/abs/...)" style={{...inp,marginBottom:18}}/>
                  <label style={lbl}>Related Current Work</label>
                  <input placeholder="Link to existing work, repository, or case study" style={{...inp,marginBottom:20}}/>
                  <label style={lbl}>Expected Timeline</label>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {["1 month","3 months","6 months","1 year"].map(t=>(
                      <button key={t} onClick={()=>setForm(f=>({...f,timeline:t}))}
                        style={{padding:"8px 18px",borderRadius:999,border:`1.5px solid ${form.timeline===t?TEAL:BORD}`,background:form.timeline===t?TEAL_BG:WHITE,color:form.timeline===t?TEAL:MUTED,fontSize:13,cursor:"pointer",fontWeight:form.timeline===t?600:400,fontFamily:"DM Sans,sans-serif"}}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div style={{display:"flex",gap:12,marginTop:30,paddingTop:22,borderTop:`1px solid ${BORD}`}}>
                {sStep>1&&<button onClick={()=>setSStep(s=>s-1)} style={GBtn}>← Back</button>}
                {sStep<4
                  ?<button onClick={()=>setSStep(s=>s+1)} style={{...PBtn,flex:1}}>Continue →</button>
                  :<button onClick={()=>setSDone(true)} style={{...PBtn,flex:1}}>🚀 Submit to INDEX</button>}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  function Detail(){
    if(!sel)return null;
    const tc=TYPE_COLORS[sel.type]||MUTED;
    return(
      <div style={{display:"flex",minHeight:"100vh"}}>
        <Sidebar/>
        <main style={{flex:1,padding:"36px 44px",background:BG,overflowY:"auto"}}>
          <button onClick={()=>setView("browse")} style={{background:"none",border:"none",cursor:"pointer",color:MUTED,fontSize:13,display:"flex",alignItems:"center",gap:6,marginBottom:22,padding:0,fontFamily:"DM Sans,sans-serif"}}>← Back to Browse</button>
          <div style={{background:WHITE,border:`1.5px solid ${BORD}`,borderRadius:20,padding:"32px 36px",marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
              <span style={{padding:"5px 14px",borderRadius:999,background:`${tc}18`,color:tc,fontSize:12,fontWeight:700}}>{sel.type}</span>
              <span style={{fontFamily:"Syne,sans-serif",fontSize:20,fontWeight:800,color:TEAL}}>{sel.match}% match</span>
            </div>
            <h1 style={{fontFamily:"Syne,sans-serif",fontSize:24,fontWeight:800,color:TEXT,marginBottom:12,lineHeight:1.2}}>{sel.title}</h1>
            <p style={{fontSize:15,color:MUTED,lineHeight:1.75,marginBottom:20}}>{sel.desc}</p>
            <div style={{display:"flex",gap:28,fontSize:13,color:MUTED,flexWrap:"wrap"}}>
              <span>👤 <strong style={{color:TEXT}}>{sel.author}</strong> · {sel.org}</span>
              <span>⏰ {sel.posted}</span>
              <span>👥 {sel.team}/{sel.maxTeam} members</span>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 290px",gap:16}}>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{background:WHITE,border:`1.5px solid ${BORD}`,borderRadius:16,padding:"24px 28px"}}>
                <div style={{fontFamily:"Syne,sans-serif",fontSize:16,fontWeight:700,color:TEXT,marginBottom:12}}>Problem Statement</div>
                <p style={{fontSize:14,color:MUTED,lineHeight:1.8}}>{sel.problem}</p>
              </div>
              <div style={{background:WHITE,border:`1.5px solid ${BORD}`,borderRadius:16,padding:"24px 28px"}}>
                <div style={{fontFamily:"Syne,sans-serif",fontSize:16,fontWeight:700,color:TEXT,marginBottom:12}}>Skills Required</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:18}}>
                  {sel.skills.map(s=>(
                    <span key={s} style={{padding:"6px 14px",borderRadius:999,background:TEAL_BG,border:`1.5px solid ${TEAL}`,color:TEAL,fontSize:13,fontWeight:600}}>{s}</span>
                  ))}
                </div>
                {sel.courses.length>0&&(
                  <div style={{borderTop:`1px solid ${BORD}`,paddingTop:14}}>
                    <div style={{fontSize:11,fontWeight:700,color:TEAL,marginBottom:10,letterSpacing:".1em",textTransform:"uppercase"}}>✦ Suggested Courses for Acquiring Skills</div>
                    {sel.courses.map(c=>(
                      <div key={c} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:MUTED,marginBottom:8}}>
                        <div style={{width:6,height:6,borderRadius:"50%",background:TEAL,flexShrink:0}}/>{c}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <button style={{width:"100%",padding:"14px 0",background:TEAL,border:"none",borderRadius:14,color:NAVY,fontFamily:"DM Sans,sans-serif",fontSize:15,fontWeight:700,cursor:"pointer"}}>Apply to Join Team</button>
              <div style={{background:WHITE,border:`1.5px solid ${BORD}`,borderRadius:16,padding:"18px 20px"}}>
                <div style={{fontSize:11,fontWeight:700,color:MUTED,textTransform:"uppercase",letterSpacing:".1em",marginBottom:12}}>Posted By</div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:TEAL_BG,border:`1.5px solid ${TEAL}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>👤</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:TEXT}}>{sel.author}</div>
                    <div style={{fontSize:12,color:MUTED}}>{sel.role} · {sel.org}</div>
                  </div>
                </div>
              </div>
              <div style={{background:WHITE,border:`1.5px solid ${BORD}`,borderRadius:16,padding:"18px 20px"}}>
                {[["👥","Team",`${sel.team} of ${sel.maxTeam} filled`],["📄","Papers",`${sel.papers} linked`],["⏰","Posted",sel.posted],["✅","Status",sel.status]].map(([icon,label,val])=>(
                  <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                    <span style={{fontSize:13,color:MUTED}}>{icon} {label}</span>
                    <span style={{fontSize:13,fontWeight:600,color:TEXT}}>{val}</span>
                  </div>
                ))}
              </div>
              <button onClick={()=>{resetSubmit();setView("submit");}} style={{...GBtn,width:"100%"}}>Submit Similar Idea</button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  function Junior(){
    return(
      <div style={{display:"flex",minHeight:"100vh"}}>
        <Sidebar/>
        <main style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:BG,padding:"60px 80px"}}>
          <div style={{maxWidth:600,textAlign:"center"}}>
            <div style={{fontSize:64,marginBottom:20}}>🎒</div>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:WHITE,border:`1.5px solid ${BORD}`,borderRadius:999,padding:"6px 16px",fontSize:12,fontWeight:600,color:SKY,marginBottom:20}}>✦ Coming Soon</div>
            <h1 style={{fontFamily:"Syne,sans-serif",fontSize:40,fontWeight:800,color:TEXT,letterSpacing:"-1px",marginBottom:16}}>INDEX Junior</h1>
            <p style={{fontSize:16,color:MUTED,lineHeight:1.8,marginBottom:12}}>Empowering school students to engage with real-world challenges, guided by university mentors and industry professionals.</p>
            <p style={{fontSize:14,color:MUTED,lineHeight:1.75,marginBottom:32}}>INDEX Junior provides age-appropriate challenges, hands-on guides, mentorship from researchers, and a pathway for young innovators to build real skills before university.</p>
            <button style={{padding:"14px 36px",background:TEAL,border:"none",borderRadius:999,color:NAVY,fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}>Join the Waitlist</button>
          </div>
        </main>
      </div>
    );
  }

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#F4F7FC;}
        textarea{font-family:'DM Sans',sans-serif;}
        input:focus,textarea:focus{outline:none;border-color:#00D9B4!important;box-shadow:0 0 0 3px rgba(0,217,180,.13);}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#F4F7FC;}
        ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:3px;}
        button:focus{outline:none;}
      `}</style>
      {view==="home"&&<Home/>}
      {view==="dashboard"&&<Dashboard/>}
      {view==="browse"&&<Browse/>}
      {view==="submit"&&<Submit/>}
      {view==="detail"&&<Detail/>}
      {view==="junior"&&<Junior/>}
      {auth!==null&&<AuthModal/>}
    </>
  );
}
