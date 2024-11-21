import{r as v,c as p,j as s,a5 as l,a6 as b,E as S,e as q,a7 as _,Q as u,a3 as E}from"./index-f542c721.js";import{S as w}from"./SubmitButton-265ed07f.js";const L=()=>{var r,o,d,m,x;const[t,n]=v.useState(!1),{register:a,handleSubmit:h,reset:f,formState:{errors:e}}=p(),g=i=>{n(!0);const N={full_name:i.first_name+i.last_name,email:i.email,message:i.message};q.post(_,N).then(c=>{var j;n(!1),c.status===200&&(u.success((j=c.data)==null?void 0:j.message),f())}).catch(c=>{n(!1),u.error("something went wrong")})};return s.jsx("div",{className:"contact_form",children:s.jsxs("form",{onSubmit:h(g),children:[s.jsx(l,{error:(r=e==null?void 0:e.first_name)==null?void 0:r.message,placeholder:"First Name",icon:"../assets/images/user.svg",validation:a("first_name",{required:"First Name is required."})}),s.jsx(l,{error:(o=e==null?void 0:e.last_name)==null?void 0:o.message,placeholder:"Last Name",icon:"../assets/images/user.svg",validation:a("last_name",{required:"Last Name is required."})}),s.jsx(l,{error:(d=e==null?void 0:e.email)==null?void 0:d.message,placeholder:"Your Email",icon:"../assets/images/email.svg",validation:a("email",{required:"Email is required.",pattern:{value:b,message:"Please enter a valid email"}})}),s.jsx(l,{error:(m=e==null?void 0:e.subject)==null?void 0:m.message,placeholder:"Subject",icon:"../assets/images/subject_icon.svg",validation:a("subject",{required:"Subject is required."})}),s.jsxs("div",{className:"fieldset",children:[s.jsx("textarea",{placeholder:"Write your message..",name:"message",className:"form-control input-icon message-field",...a("message",{required:"Message is required."})}),s.jsx("span",{className:"input-field-icon",children:s.jsx("img",{src:"../assets/images/message-icon.svg"})}),(e==null?void 0:e.message)&&s.jsx(S,{msg:(x=e==null?void 0:e.message)==null?void 0:x.message})]}),s.jsx("div",{className:"fieldset",children:s.jsx(w,{loader:t,contentText:"Send Message",disabled:t})})]})})},y=()=>s.jsxs("main",{children:[s.jsx(E,{heading:"Looking for Product Support?",title:"Please visit our services center",supportButton:!0}),s.jsx("section",{className:"contactUs_sec py-100",children:s.jsx("div",{className:"container",children:s.jsx("div",{className:"row",children:s.jsx("div",{className:"col-12",children:s.jsx("div",{className:"contactInfo-col",children:s.jsxs("div",{className:"row",children:[s.jsx("div",{className:"col-md-4 col-12",children:s.jsxs("div",{className:"contact-info",children:[s.jsx("h4",{children:"General Enquiries"}),s.jsxs("div",{className:"querySubmission",children:[s.jsx("p",{children:"Submit a Request if you are looking for:"}),s.jsxs("ul",{children:[s.jsx("li",{children:"Marketing"}),s.jsx("li",{children:"Partnerships"}),s.jsx("li",{children:"General Enquiries"}),s.jsx("li",{children:"Sales"}),s.jsx("li",{children:"Media"})]})]}),s.jsxs("div",{className:"phone_icon contact-icon",children:[s.jsx("i",{className:"fa-solid fa-mobile-screen-button"})," ","202-555-0146"]}),s.jsxs("div",{className:"phone_icon contact-icon",children:[s.jsx("i",{className:"fa-solid fa-envelope"})," ","talentco@gmail.com"]}),s.jsxs("div",{className:"phone_icon contact-icon",children:[s.jsx("i",{className:"fa-solid fa-location-dot"})," 102 street 2715 Don"]}),s.jsx("div",{className:"followUs",children:s.jsxs("ul",{children:[s.jsx("li",{children:s.jsx("a",{href:"#",children:s.jsx("i",{className:"fa-brands fa-instagram"})})}),s.jsx("li",{children:s.jsx("a",{href:"#",children:s.jsx("i",{className:"fa-brands fa-square-facebook"})})}),s.jsx("li",{children:s.jsx("a",{href:"#",children:s.jsx("i",{className:"fa-brands fa-x-twitter"})})}),s.jsx("li",{children:s.jsx("a",{href:"#",children:s.jsx("i",{className:"fa-brands fa-linkedin"})})})]})})]})}),s.jsx("div",{className:"col-md-8 col-12",children:s.jsx(L,{})})]})})})})})})]});export{y as default};
