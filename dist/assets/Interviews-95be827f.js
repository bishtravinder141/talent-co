import{r as a,ax as f,u as C,j as i,Y as L,ar as _,_ as b}from"./index-f542c721.js";import{I as E}from"./InterviewSection-9c7b5a37.js";import{j as R,f as M}from"./candidateJobs-9f40d583.js";import"./constant-145911d4.js";const J=()=>{const[c,h]=a.useState({startDate:f().format("YYYY-MM-DD"),endDate:f().add(1,"week").format("YYYY-MM-DD")}),[d,p]=a.useState({timePeriod:"week",position:"Web developer"}),[u,v]=a.useState([]),[g,D]=a.useState(0),[S,l]=a.useState({page:1}),[w,s]=a.useState(!0),I=C();a.useEffect(()=>{s(!0);let t=`start_date=${c.startDate}&end_date=${c.endDate}`;P(t)},[S]);const P=t=>{R(t).then(e=>{var o,r,n,m;v((r=(o=e==null?void 0:e.data)==null?void 0:o.data)==null?void 0:r.results),D((m=(n=e==null?void 0:e.data)==null?void 0:n.data)==null?void 0:m.count)}).catch(e=>{console.log(e)}).finally(()=>{s(!1)})},x=(t,e)=>{d[t]!==e&&(p({...d,[t]:e}),l({page:1}))},Y=()=>{l({page:1})},j=t=>{l({page:t.selected+1})},k=t=>{s(!0),M(t).then(e=>{var o,r,n;s(!1),localStorage.setItem("roomId",(n=(r=(o=e.data)==null?void 0:o.data)==null?void 0:r.results)==null?void 0:n.room_name),I("/job-seeker/messages"),console.log(e)}).catch(e=>{s(!1),console.log(e)})};return i.jsxs(L,{header:"Interviews",subTitle:"Vivamus facilisis arcu quis sapien venenatis, a feugiat urna tristique. Sed gravida non mauris at.",showSearchBar:!1,children:[i.jsx(E,{loader:w,interviewList:u,filter:d,onFilterChange:x,date:c,setDate:h,onDateChange:Y,seekerPage:!0,createChatRoom:k}),i.jsx("div",{className:"mt-4",children:g>_&&i.jsx(b,{pageData:u,onPageChange:j,totalPage:g})})]})};export{J as default};
