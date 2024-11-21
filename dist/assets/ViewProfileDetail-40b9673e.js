import{A,r as l,D as C,u as R,H as B,I as T,J as U,K as V,j as s,P as O,L as r,N as q,$ as M,O as J,S as H}from"./index-f542c721.js";import{c as K}from"./candidateJobs-9f40d583.js";const W="candidate/public/profile/",z=e=>A.get(`${W}${e}`),X=()=>{var p,N,u,f,b,_,k,w,y,I,P,L;const[e,o]=l.useState({}),[F,t]=l.useState(!0),[c,h]=l.useState({}),[m,x]=l.useState(!1),{pathname:$}=C(),j=R(),{id:g}=B(),d=$.includes("/view-candidate-public-profile"),v=l.useRef(null);l.useEffect(()=>{d?z(g).then(a=>{var i;const n=(i=a==null?void 0:a.data)==null?void 0:i.data;o({...e,...n}),h(n==null?void 0:n.user_details)}).catch(a=>{a.response.status===404&&(T(H),j("/job-recruiter/application")),console.log(a.response.status===404)}).finally(()=>{t(!1)}):U().then(a=>{var i;const n=(i=a==null?void 0:a.data)==null?void 0:i.data;o({...e,...n})}).catch(a=>{console.log(a)}).finally(()=>{t(!1)})},[]),l.useEffect(()=>{d||V().then(a=>{var i;const n=(i=a==null?void 0:a.data)==null?void 0:i.data;h({first_name:n==null?void 0:n.first_name,last_name:n==null?void 0:n.last_name})}).catch(a=>{console.log(a)})},[]);const S=()=>{K(g).then(a=>{var n,i,E;t(!1),localStorage.setItem("roomId",(E=(i=(n=a.data)==null?void 0:n.data)==null?void 0:i.results)==null?void 0:E.room_name),j("/job-recruiter/messages")}).catch(a=>{t(!1),console.log(a)})};return s.jsxs(s.Fragment,{children:[F&&s.jsx(O,{}),s.jsxs("div",{className:"view-profile-sec py-60",ref:v,children:[s.jsx("div",{className:"container",children:s.jsx("div",{className:"pb-4",children:s.jsxs("div",{className:"row",children:[s.jsx("div",{className:"col-12 pb-5",children:s.jsxs("div",{className:"back-arrow-heading d-flex font-weight-bold align-items-center mt-4",children:[s.jsx(r,{to:d?"/job-recruiter/application":"/job-seeker/user-profile-page",children:s.jsx("img",{src:"/assets/images/back-arrow.svg",alt:"Back"})}),s.jsx("h3",{children:"View Public Profile"})]})}),s.jsx("div",{}),s.jsxs("div",{className:"col-md-7 col-12",children:[s.jsxs("div",{className:"view-profile-items",children:[s.jsx("div",{className:"profile_image",children:s.jsx("img",{src:`${e!=null&&e.profile_picture?`${q}${e.profile_picture}`:"/assets/images/demo-user.png"}`})}),s.jsxs("div",{className:"profileInfo",children:[s.jsxs("h4",{children:[(c==null?void 0:c.first_name)&&(c==null?void 0:c.first_name)," ",(c==null?void 0:c.last_name)&&(c==null?void 0:c.last_name)]}),s.jsxs("div",{className:"userDesgInfo",children:[s.jsx("span",{className:"user-desg",children:"Accountant"}),s.jsx("span",{className:"label-type",children:e==null?void 0:e.status}),s.jsxs("span",{className:"user-social",children:[((p=e==null?void 0:e.links)==null?void 0:p.length)>0&&e.links[0].link_url&&s.jsx(r,{to:`${(N=e==null?void 0:e.links[0])==null?void 0:N.link_url}`,children:s.jsx("img",{src:"/assets/images/website-icon.svg"})}),((u=e==null?void 0:e.links)==null?void 0:u.length)>1&&e.links[1].link_url&&s.jsx(r,{to:`${(f=e==null?void 0:e.links[1])==null?void 0:f.link_url}`,children:s.jsx("img",{src:"/assets/images/linkedin-icon.svg"})})]})]})]})]}),s.jsx("p",{className:"profile_desc",children:e==null?void 0:e.professional_overview}),s.jsxs("div",{className:"user-other-info",children:[((b=e==null?void 0:e.job_locations)==null?void 0:b.length)>0&&s.jsxs("div",{className:"otherInfo_items",children:[s.jsx("span",{children:"Location"}),s.jsx("h6",{children:(_=e==null?void 0:e.job_locations[0])==null?void 0:_.location})]}),(e==null?void 0:e.job_type)&&s.jsxs("div",{className:"otherInfo_items",children:[s.jsx("span",{children:"Job Type"}),s.jsx("h6",{children:(e==null?void 0:e.job_type)==="Full-Time"?"Full-time":"Part-time"})]}),((k=e==null?void 0:e.employment_options)==null?void 0:k.length)>0&&s.jsxs("div",{className:"otherInfo_items",children:[s.jsx("span",{children:"Employment Options"}),s.jsx("h6",{children:e==null?void 0:e.employment_options.map(a=>a.title).join(" , ")})]})]})]}),s.jsx("div",{className:"col-md-5 col-12",children:s.jsxs("div",{className:"complete-profile-right text-end",children:[!d&&s.jsx(r,{to:"/job-seeker/resume",className:"btn-design btn-small border-btn me-2  ",children:"View CV"}),d&&s.jsx("span",{onClick:S,className:"btn-design btn-small cursor-pointer",children:"Message"})]})})]})})}),s.jsx("div",{className:"profile-form",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"row",children:[s.jsx("div",{className:"col-12 pb-5",children:s.jsxs("div",{className:"profile-field shadow-box",children:[s.jsx("h6",{children:"Experience"}),((w=e==null?void 0:e.experiences)==null?void 0:w.length)>0?(y=e==null?void 0:e.experiences)==null?void 0:y.map(a=>s.jsx(s.Fragment,{children:s.jsxs("div",{className:"profile-field-col",children:[s.jsx("div",{className:"profile-field-icon",children:s.jsx("span",{children:s.jsx("img",{src:"/assets/images/brifcase.svg",alt:"Briefcase"})})}),s.jsxs("div",{className:"profile-field-right",children:[s.jsx("h6",{children:a.position}),s.jsxs("span",{className:"text-grey",children:[a.start_month," Dec 2022 - Present"]}),s.jsx("p",{className:"text-grey fw-bold",children:a.company_name}),s.jsx("p",{children:a.description})]})]},a.id+a.company_name)})):s.jsx("div",{children:"No Data Found"})]})}),s.jsx("div",{className:"col-12 pb-5",children:s.jsxs("div",{className:"profile-field shadow-box",children:[s.jsx("h6",{children:"Education"}),((I=e==null?void 0:e.qualifications)==null?void 0:I.length)>0?e==null?void 0:e.qualifications.map((a,n)=>s.jsx(s.Fragment,{children:s.jsxs("div",{className:"profile-field-col",children:[s.jsx("div",{className:"profile-field-icon",children:s.jsx("span",{children:s.jsx("img",{src:"/assets/images/edu-cap.svg",alt:"Education Cap"})})}),s.jsxs("div",{className:"profile-field-right",children:[s.jsx("h6",{children:a.university}),s.jsx("span",{className:"text-grey",children:a.graduation_year}),s.jsx("p",{className:"text-grey fw-bold",children:a.qualification})]})]},a.id)})):s.jsx("div",{children:"No Data Found"})]})}),s.jsx("div",{className:"col-12 pb-5",children:s.jsxs("div",{className:"profile-field shadow-box",children:[s.jsx("h6",{children:"Skills"}),s.jsx("div",{className:"auto-flex",children:((P=e==null?void 0:e.skills)==null?void 0:P.length)>0?e.skills.map(a=>s.jsxs("div",{className:"skill-profile-col",children:[s.jsx("div",{className:"skill-profile-icon",children:s.jsx("span",{children:s.jsx("img",{src:"/assets/images/marktag-icon.svg",alt:"Skill Icon"})})}),s.jsxs("div",{className:"skill-profile-content",children:[s.jsx("h6",{children:a.skill_name}),s.jsx("p",{children:a.level}),s.jsx("p",{children:a.description})]})]},a.id)):s.jsx("div",{children:"No Data Found"})})]})}),s.jsx("div",{className:"col-12 pb-3",children:s.jsxs("div",{className:"profile-field shadow-box",children:[s.jsx("h6",{children:"Language"}),s.jsx("div",{className:"auto-flex",children:((L=e==null?void 0:e.languages)==null?void 0:L.length)>0?e==null?void 0:e.languages.map((a,n)=>s.jsx(s.Fragment,{children:s.jsxs("div",{className:"language-profile-col",children:[s.jsx("div",{className:"skill-profile-icon",children:s.jsx("span",{children:"EN"})}),s.jsxs("div",{className:"skill-profile-content",children:[s.jsx("h6",{children:a.language}),s.jsx("p",{children:a.level})]})]})})):s.jsx("div",{children:"No Data Found"})})]})})]})})})]}),s.jsx("div",{className:"col-12 text-center mb-4",children:s.jsx("div",{className:"fieldset d-flex justify-content-center",children:s.jsxs("button",{className:`${m?"btn-on-loading":"btn-design"}`,onClick:async()=>{x(a=>!0),await M(v,{filename:"profile.pdf"}),x(a=>!1)},children:["Export Profile to PDF",m&&s.jsx(J,{})]})})})]})};export{X as default};
