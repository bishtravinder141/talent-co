import{r as l,u as V,ar as S,j as a,af as W,as as H,P as Q,at as U,L as Z,Z as K,_ as X,am as j,au as y,Q as M,av as ee,aw as ae}from"./index-f542c721.js";import{g as se,u as te}from"./jobdashboard-7b2f3f3d.js";import{F as le}from"./FilterTabs-48897b3d.js";import{S as ne}from"./ShareModal-cfad101f.js";const oe=()=>{const[u,N]=l.useState("all"),[p,h]=l.useState({page:1}),[b,P]=l.useState(0),[i,v]=l.useState([]),[E,r]=l.useState(!0),[m,C]=l.useState(""),[R,$]=l.useState(),[g,A]=l.useState(!1),[D,B]=l.useState(null),[x,L]=l.useState(!1),[k,J]=l.useState(null),f=()=>{L(!x)},I=V(),T=e=>{B(e),A(!g)};l.useEffect(()=>{r(!0);let e;const s=localStorage.getItem("redirectedTab");let n=s||u;N(c=>n),localStorage.removeItem("redirectedTab"),n==="all"?e=`?page=${p.page}&page_size=${S}&search=${m}`:e=`?page=${p.page}&page_size=${S}&status=${n}&search=${m}`,O(e)},[p]);const O=e=>{se(e).then(s=>{var n,c,t,d;v((c=(n=s==null?void 0:s.data)==null?void 0:n.data)==null?void 0:c.results),P((d=(t=s==null?void 0:s.data)==null?void 0:t.data)==null?void 0:d.count)}).catch(s=>{console.log(s)}).finally(()=>{r(!1)})},F=e=>{e!==u&&(N(e),h({page:1}))},Y=e=>{h({page:e.selected+1})},q=(e,s)=>{r(!0);const n=`/${e}`,c={status:"active"};y()?te(n,c).then(t=>{var o;const d=[...i];d[s]=(o=t==null?void 0:t.data)==null?void 0:o.data,v([...d]),h({page:1}),M.success("Job Published Successfully")}).catch(t=>{var d,o,w,_;(o=(d=t==null?void 0:t.response)==null?void 0:d.data)!=null&&o.message&&M.error((_=(w=t==null?void 0:t.response)==null?void 0:w.data)==null?void 0:_.message)}).finally(()=>{r(!1)}):(J(ee),f(),r(!1))},z=e=>{if((!i||(i==null?void 0:i.length)===0)&&m.length===0||(C(e),clearTimeout(R),m.length===0&&e.length===0))return;const s=setTimeout(()=>{h({page:1})},500);$(s)},G=()=>{y()?I("/job-recruiter/create-job"):(J(ae),f())};return a.jsx(a.Fragment,{children:a.jsxs(W,{header:" Jobs ",subTitle:"Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at ",showSearchBar:!1,children:[a.jsx("div",{className:"business-dashboard",children:a.jsx("div",{className:"dashboard-main-panel ",children:a.jsxs("div",{className:"dashboard-panel-content",children:[a.jsx("div",{className:"top_left font-weight-bold for-mobile",children:a.jsx("h3",{children:"Jobs"})}),a.jsxs("form",{className:"banner-seach ask-que",children:[a.jsx("input",{type:"text",name:"",placeholder:"keyword",onChange:e=>z(e.target.value)}),a.jsx("button",{type:"button",onClick:G,className:"btn-design",children:"Create New Job"})]}),a.jsxs("div",{className:"jobsTabs-sec py-50",children:[a.jsx("ul",{className:"nav nav-tabs",id:"myTab",role:"tablist",children:H.map((e,s)=>a.jsxs(l.Fragment,{children:[a.jsx(le,{title:e.title,active:u===e.label,handleClickTab:()=>F(e.label)})," "]},s))}),a.jsx("div",{className:"tab-content",id:"myTabContent",children:a.jsxs("div",{className:"tab-pane fade show active",role:"tabpanel","aria-labelledby":"alljobs-tab",children:[E&&a.jsx(Q,{}),a.jsx("div",{className:"global-table table-responsive jobRecruiterTable",children:a.jsxs("table",{className:"table align-middle",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{style:{width:"35%",minWidth:"200px"},children:"Job/Template Title"}),a.jsx("th",{className:"text-center",children:"Status"}),a.jsx("th",{className:"text-center",children:"Date Posted"}),a.jsx("th",{className:"text-end",children:"Actions"})]})}),a.jsx("tbody",{children:i.length>0?i.map((e,s)=>{var n;return a.jsxs("tr",{children:[a.jsxs("td",{children:[a.jsx("strong",{children:e.title}),a.jsxs("p",{children:[e.job_role," | ",e.job_type," |"," ",(n=e==null?void 0:e.employment_options)==null?void 0:n.map((c,t)=>`${c.title} ${e!=null&&e.employment_options[t+1]?"|":""}`)]})]}),a.jsx("td",{className:"text-center",children:a.jsx("span",{className:`${e==null?void 0:e.status}-status`,children:e==null?void 0:e.status})}),a.jsx("td",{className:"text-center",children:e!=null&&e.created_at?U(e==null?void 0:e.created_at).format("MMMM DD, YYYY"):"N/A"}),a.jsx("td",{className:"text-end",children:a.jsxs("div",{className:"action-flex",children:[(e==null?void 0:e.status)==="draft"&&a.jsx("span",{className:"btn-design btn-small border-btn edit-btn",onClick:()=>q(e.id,s),children:"Publish Job"}),(e==null?void 0:e.status)!=="draft"&&a.jsx(Z,{to:`/job-recruiter/edit-job/${e.id}`,state:(e==null?void 0:e.status)==="closed"&&e,className:"btn-design btn-small edit-btn",children:(e==null?void 0:e.status)==="closed"?"Duplicate Job":"Edit Job"}),a.jsxs("div",{className:"dropdown list_edit_panel",children:[a.jsx("button",{className:"btn  dropdown-toggle",type:"button",id:"dropdownMenu2","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false",children:a.jsx("span",{children:a.jsx("i",{className:"fas fa-ellipsis-v"})})}),a.jsxs("div",{className:"dropdown-menu","aria-labelledby":"dropdownMenuButton1",children:[a.jsxs("a",{href:"view_panel_detail.html",className:"dropdown-item",type:"button",children:[a.jsx("img",{src:"/assets/images/referral.svg"})," ","Referral Job"]}),a.jsxs("button",{className:"dropdown-item",type:"button",onClick:()=>{T(e==null?void 0:e.id)},children:[a.jsx("img",{src:"/assets/images/sharing.svg"})," ","Sharing Job"]})]})]})]})})]},e.id)}):a.jsx(K,{})})]})})]})})]}),b>S&&a.jsx(X,{pageData:i,onPageChange:Y,totalPage:b})]})})}),g&&a.jsx(ne,{showShareModal:g,toggleShareModal:T,text:"Share Job",jobID:D}),x&&a.jsx(j,{showModal:x,toggleModal:f,text:k})]})})};export{oe as default};