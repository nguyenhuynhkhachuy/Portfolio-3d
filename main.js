const projects={project3d_1:{title:"God Slayer",image:"11.png",video:"https://www.youtube.com/embed/k4aGRRwLiq8",description:"You embark on a journey across floating islands teeming with challenges, monsters, and deities corrupted by the Evil God. Each victory yields a fragment of power, empowering your blade and gradually sealing away the Evil God's aspects of Creation and Time. You are accompanied by survivors—each with unique skills and stories—who assist you in navigating traps and solving puzzles. In the final battle on the central island, you unleash your ultimate power to sever the aspects of Destruction and Space, vanquishing the Evil God and liberating the world from darkness.",software:["Maya","ZBrush","Substance Painter","Unreal Engine 5"]},project3d_2:{title:"Kane Oni",image:"22.png",description:"High-poly 3D character model showcasing a dark, demonic warrior surging with purple elemental energy. The visual design emphasizes glowing energy veins, dynamic lightning VFX, and intricate dark fantasy apparel with broken chains, representing an entity breaking free from its ancient seal.",software:["ZBrush","Substance Painter","Marmoset"]},project3d_3:{title:"Cyberpunk Plasma Rifle",image:"33.png",description:"High-tech sci-fi weapon model created with a sci-fi/cyberpunk aesthetic. Features dynamic emissive lighting with cyan power conduits, glowing energy core, and intense red accent lights over dark metallic textures. Focused on detailed hard-surface modeling, realistic PBR texturing, and cinematic rendering setup.",software:["Maya","Substance Painter"]},project3d_4:{title:"Tissot 1853",image:"44.png",description:"Photorealistic 3D product visualization of the classic Tissot 1853 wristwatch. Focused on hard-surface modeling precision, realistic dual-tone metallic materials, textured dial detailing, and studio product lighting setup to highlight the premium look of luxury timepieces.",software:["Maya","Substance Painter"]},project3d_5:{title:"Spider-Man: Project Q",image:"55.png",video:"https://www.youtube.com/embed/fan7BF6-9Ws",description:"A game asset project featuring Spider-Man and Organization Q. The project focuses on character modeling, sculpting, texturing and presentation.",software:["Maya","ZBrush","Substance Painter","Blender"]},project3d_6:{title:"The Final Meditation",image:"66.png",video:"https://www.youtube.com/embed/j3ku-a5OHwU",description:"A humorous 3D short animation featuring stylized, big-headed football characters on the pitch. This project showcases comedic character rigging, expressive facial animation, dynamic body mechanics, and a vibrant stylized rendering setup.",software:["Maya","Substance Painter","Blender"]},project3d_7:{title:"Warm Sunlight Kitchen - Architectural Visualization",image:"77.png",description:"An architectural visualization showcasing a modern, minimalist kitchen space illuminated by soft, warm sunlight. This project focuses on realistic global illumination, subtle shadow play, realistic wooden textures, and mood-driven interior lighting.",software:["Maya"]}};

const imagePreloadList=["avatar.png","Logo.png","ed.png","ts.png","s.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","11.png","22.png","33.png","44.png","55.png","66.png","77.png"];

function preloadImages(images){images.forEach(src=>{const img=new Image();img.decoding="sync";img.src=src})}
preloadImages(imagePreloadList);
Object.values(projects).forEach(project=>{if(project.image){const img=new Image();img.decoding="sync";img.src=project.image}});

const $=selector=>document.querySelector(selector);
const $$=selector=>document.querySelectorAll(selector);
const dock=$(".dock");
const blur=$(".blur-layer");
const bgVideo=$("#bg-video");

function pauseBackgroundVideo(){if(bgVideo&&!bgVideo.paused)bgVideo.pause()}
function playBackgroundVideo(){if(!bgVideo)return;bgVideo.play().catch(()=>{})}
function minimizeDock(){dock?.classList.add("minimized");pauseBackgroundVideo()}
function restoreDock(){dock?.classList.remove("minimized");playBackgroundVideo()}

function openWindow(id){
 const windowEl=document.getElementById(id);
 if(!windowEl)return;
 $$(".window").forEach(windowItem=>{if(windowItem!==windowEl)windowItem.classList.remove("active")});
 windowEl.classList.add("active");
 blur?.classList.add("active");
 minimizeDock();
}

function stopProjectVideo(){
 const video=$("#projectDetailVideo");
 if(video)video.src="";
}

function closeWindow(id){
 const windowEl=document.getElementById(id);
 if(!windowEl)return;
 windowEl.classList.remove("active");
 if(id==="projectDetailWindow")stopProjectVideo();
 if(!$(".window.active")){
  blur?.classList.remove("active");
  restoreDock();
 }
}

function closeAllWindows(){
 $$(".window").forEach(windowEl=>windowEl.classList.remove("active"));
 blur?.classList.remove("active");
 stopProjectVideo();
 restoreDock();
}

function openProject(id){
 const project=projects[id];
 if(!project)return;

 const image=$("#projectDetailImage");
 image.src=project.image;
 image.alt=project.title;

 const header=$("#detailHeaderTitle");
 header.textContent=project.title;
 header.title=project.title;

 const number=id.split("_").pop().padStart(2,"0");
 $("#detailNumber").textContent=`PROJECT ${number}`;
 $("#projectDetailTitle").textContent=project.title;
 $("#projectDetailDescription").textContent=project.description;

 const softwareList=$("#projectDetailSoftware");
 softwareList.innerHTML=project.software.map(item=>`<li>${item}</li>`).join("");

 const videoWrapper=$("#projectVideoWrapper");
 const video=$("#projectDetailVideo");

 if(project.video&&project.video.startsWith("http")){
  video.src=project.video;
  videoWrapper.style.display="block";
 }else{
  video.src="";
  videoWrapper.style.display="none";
 }

 openWindow("projectDetailWindow");

 const media=$(".project-media");
 const info=$(".project-info");

 if(media)media.scrollTop=0;
 if(info)info.scrollTop=0;
}

function backToPortfolio(){
 stopProjectVideo();
 closeWindow("projectDetailWindow");
 openWindow("portfolioWindow");
}

function switchTab(id){
 $$("#resumeWindow .tab-btn").forEach(button=>button.classList.toggle("active",button.dataset.tab===id));
 $$("#resumeWindow .tab-content").forEach(content=>content.classList.toggle("active",content.id===id));
}

async function copyText(button){
 const value=button.dataset.copy||"";
 if(!value)return;

 try{
  await navigator.clipboard.writeText(value);
 }catch{
  const textarea=document.createElement("textarea");
  textarea.value=value;
  textarea.style.position="fixed";
  textarea.style.left="-9999px";
  textarea.style.opacity="0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
 }

 const icon=button.querySelector("i");
 if(!icon)return;

 icon.className="fa-solid fa-check";
 button.style.color="#00f2fe";
 button.style.borderColor="#00f2fe";

 setTimeout(()=>{
  icon.className="fa-regular fa-copy";
  button.style.color="";
  button.style.borderColor="";
 },1200);
}

document.addEventListener("DOMContentLoaded",()=>{
 $$("#resumeWindow .tab-btn").forEach(button=>{
  button.addEventListener("click",()=>switchTab(button.dataset.tab));
 });

 switchTab("tab-education");

 $$(".copy-btn").forEach(button=>{
  button.addEventListener("click",()=>copyText(button));
 });

 $$("img").forEach(image=>{
  image.addEventListener("dragstart",event=>event.preventDefault());
 });
});

document.addEventListener("keydown",event=>{
 if(event.key==="Escape")closeAllWindows();
});