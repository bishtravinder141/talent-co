import{j as a,A as K,b7 as X,r as n,ax as g,b as S,a8 as $,aG as D,aH as aa,b8 as sa,b9 as ta,af as ea,ar as na,_ as oa,aP as ia,Q as F}from"./index-f542c721.js";import{I as la}from"./InterviewSection-9c7b5a37.js";import{A as ca,M as v,p as ra,r as da}from"./ApplicationModals-95ff2685.js";import"./constant-145911d4.js";import"./successModal-121b1d48.js";import"./index.esm-822dde25.js";import"./SubmitButton-265ed07f.js";import"./DropDownWithSearch-c72190d4.js";import"./index-27ed1d6c.js";function A({name:p,values:o,selectedValue:r,skillName:x,handleRatingChange:u}){return a.jsx(a.Fragment,{children:a.jsxs("div",{className:"give-rating",children:[a.jsx("span",{children:x}),a.jsx("div",{className:"rating-btn",children:o.map((d,_)=>a.jsxs("div",{className:"rateRadio",children:[" ",a.jsx("input",{type:"radio",name:p,"aria-label":`${d}`,value:d,checked:d===r,onChange:i=>u(i.target.name,parseInt(i.target.value))}),a.jsx("span",{children:d})]},_))})]})})}const ma=p=>K.get(`${X}${p}`),Na=()=>{var w,E,L;const[p,o]=n.useState(!0),[r,x]=n.useState([]),[u,d]=n.useState(0),[_,i]=n.useState({page:1}),[e,H]=n.useState(null),[C,j]=n.useState({show:!1,modalTitle:"",modalName:""}),[J,V]=n.useState(null),[N,z]=n.useState({startDate:g().format("YYYY-MM-DD"),endDate:g().add(1,"week").format("YYYY-MM-DD")}),[l,y]=n.useState({timePeriod:"week",position:""}),[h,B]=n.useState({show:!1,title:"Rate Candidates",index:null}),[m,G]=n.useState({technical_test_rating:3,communication_rating:3,responsibility_rating:3,comment:""}),P=S(),I=$(t=>{var s;return(s=t==null?void 0:t.masterAPIData)==null?void 0:s.timeZone}),T=$(t=>{var s;return(s=t==null?void 0:t.masterAPIData)==null?void 0:s.jobTitles});n.useEffect(()=>{if(T.length>0){o(!0);let t=`?start_date=${N.startDate}&end_date=${N.endDate}&job_title=${l.position==="All"?"":l==null?void 0:l.position}`;W(t)}},[_,T]),n.useEffect(()=>{!(I!=null&&I.length)>0&&D().then(t=>{var s,c;P(aa((c=(s=t==null?void 0:t.data)==null?void 0:s.data)==null?void 0:c.timezones))}).catch(t=>{o(!1),console.log(t,"error in time zone API")}),sa().then(t=>{var s;P(ta((s=t==null?void 0:t.data)==null?void 0:s.data)),y({...l,position:"All"})}).catch(t=>{o(!1),console.log(t,"error in time zone API")})},[]);const W=t=>{ma(t).then(s=>{var c,R,k,Y;x((R=(c=s==null?void 0:s.data)==null?void 0:c.data)==null?void 0:R.results),d((Y=(k=s==null?void 0:s.data)==null?void 0:k.data)==null?void 0:Y.count)}).catch(s=>{console.log(s)}).finally(()=>{o(!1)})},q=t=>{i({page:t.selected+1})},O=(t,s)=>{console.log("first"),console.log(l[t],"filtername"),console.log(s,"val"),l[t]!==s&&(console.log("filter changed",s),y({...l,[t]:s}),i({page:1}))},U=()=>{i({page:1})},f=t=>{B({show:!h.show,title:"Rate Candidates",index:t})},b=(t,s)=>{G({...m,[t]:s})},M=(t,s)=>{t===v.invitation?(i({page:1}),j({show:!0,modalTitle:a.jsxs(a.Fragment,{children:[g(s==null?void 0:s.start_date).format("dddd"),",",g(s==null?void 0:s.start_date).format("MMMM d")," at"," ",g(s==null?void 0:s.start_time,"HH:mm").format("h:mm A"),"-",g(s==null?void 0:s.end_time,"HH:mm").format("h:mm A")," ","sent to ",a.jsxs("strong",{children:[s==null?void 0:s.candidate_name," "]})]}),modalName:v.invitation})):t===v.cancelled?(i({page:1}),j({show:!1,modalTitle:"",modalName:""})):j({show:!1,modalTitle:"",modalName:""})},Z=async()=>{try{const t={...m};if(t.interview=e.id,(await ra(t)).status===201){i({page:1}),F.success("Successfully submitted"),f();const c=[...r];c[h.index].rated=!0,x([...c])}else F.error()}catch(t){console.error(t.message)}},Q=t=>{o(!0),da(t,{interview_status:"Completed"}).then(s=>{o(!1),i({page:1})}).catch(s=>{o(!1),console.log(s,"completed interview")})};return a.jsx(a.Fragment,{children:a.jsxs(ea,{header:"Interviews",subTitle:"Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at ",showSearchBar:!1,children:[a.jsx("div",{className:"business-dashboard",children:a.jsx("div",{className:"dashboard-main-panel",children:a.jsxs("div",{className:"dashboard-panel-content",children:[a.jsx("div",{className:"top_left font-weight-bold for-mobile",children:a.jsx("h3",{children:"Interviews"})}),a.jsxs("div",{className:"interviewsList-sec",children:[a.jsx(la,{loader:p,interviewList:r,filter:l,onFilterChange:O,date:N,setDate:z,onDateChange:U,toggleModal:f,setRatingModalData:H,setLoader:o,setShowApplicationModal:j,setSelectedUserIndex:V,handleCompleteInterview:Q}),a.jsx("div",{className:"mt-4",children:u>na&&a.jsx(oa,{pageData:r,onPageChange:q,totalPage:u})})]})]})})}),h.show&&a.jsx(ia,{showModal:h.show,title:h.title,toggleModal:f,children:a.jsxs("div",{className:"modal-body",children:[a.jsxs("div",{className:"applicant-info-col",children:[a.jsx("div",{className:"applicant-thumb",children:a.jsx("img",{src:"/assets/images/user-profile.svg"})}),a.jsxs("div",{className:"applicant-info",children:[a.jsx("h6",{children:(w=e==null?void 0:e.candidate_details)==null?void 0:w.candidate_name}),a.jsxs("ul",{children:[a.jsx("li",{children:e==null?void 0:e.job_title}),a.jsx("li",{children:(E=e==null?void 0:e.candidate_details)==null?void 0:E.total_experience}),a.jsx("li",{children:(L=e==null?void 0:e.candidate_details)==null?void 0:L.job_type}),a.jsx("li",{children:"Remote"})]})]})]}),a.jsxs("div",{className:"row mt-3",children:[a.jsxs("div",{className:"col-12 pb-3",children:[a.jsx("label",{children:"Rating"}),a.jsx(A,{name:"technical_test_rating",values:[0,1,2,3,4,5],selectedValue:m.technical_test_rating,skillName:"Technical Test",handleRatingChange:b}),a.jsx(A,{name:"communication_rating",values:[0,1,2,3,4,5],selectedValue:m.communication_rating,skillName:"Cummunication",handleRatingChange:b}),a.jsx(A,{name:"responsibility_rating",values:[0,1,2,3,4,5],selectedValue:m.responsibility_rating,skillName:"Responsibility",handleRatingChange:b})]}),a.jsxs("div",{className:"col-12",children:[a.jsx("label",{children:"Write Your invitation below"}),a.jsxs("div",{className:"fieldset",children:[a.jsx("textarea",{placeholder:"Enter your comment here",className:"form-control message-field",name:"comment",value:m.remark,onChange:t=>b(t.target.name,t.target.value)}),a.jsx("span",{className:"characters-sets",children:"300 characters"})]})]}),a.jsx("div",{className:"col-12 mt-1",children:a.jsxs("div",{className:"popupBtn",children:[a.jsx("button",{type:"button",className:"btn-design border-btn","data-bs-dismiss":"modal",onClick:f,children:"Cancel"}),a.jsx("button",{type:"button",className:"btn-design",onClick:Z,"data-bs-target":"#ratingsuccessPopup","data-bs-toggle":"modal","data-bs-dismiss":"modal",children:"Rate"})]})})]})]})}),C.show&&a.jsx(ca,{modalDetails:C,toggleModal:M,candidataData:r[J],afterSuccessfullyChangedStatus:M,rescheduleInterviewModal:!0})]})})};export{Na as default};
