import{j as s,L as T,c as I,r as c,C,E as N,e as F,t as W,Q as v,M as q,a as L,g as k,v as B,d as D,w as G}from"./index-f542c721.js";import{V as z}from"./VerifyOTP-7260b346.js";import{o as V}from"./yup-f45bf39b.js";import{c as $,a as E}from"./index.esm-822dde25.js";import{p as A}from"./password-icon-c9c96b4d.js";import{S as U}from"./SubmitButton-265ed07f.js";import{R as Y}from"./recaptcha-wrapper-0c87ddc3.js";import"./index-27ed1d6c.js";const Z="/assets/success-icon-f5d78640.svg",H=()=>s.jsx("section",{className:"login-process-sec py-100",children:s.jsx("div",{className:"container",children:s.jsx("div",{className:"row",children:s.jsx("div",{className:"col-12",children:s.jsxs("div",{className:"login-process-wrap",children:[s.jsx("h3",{children:"Success"}),s.jsx("p",{children:"Your Password has been reset"}),s.jsx("div",{className:"successfully-col",children:s.jsx("img",{src:Z})}),s.jsx(T,{to:"/login",className:"btn-design",children:"Continue"})]})})})})}),Q=$().shape({password:E().required("Password is required").min(6,"Password must be at least 6 digits long.").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{6,}$/g,"Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"),confirmPassword:E().required("Confirm Password is required")}),X=({userId:d,setUserId:m,setStep:w})=>{const{handleSubmit:h,watch:x,control:p,setError:l,formState:{errors:t}}=I({resolver:V(Q)}),[n,j]=c.useState({confirmPass:!1,pass:!1}),[b,R]=c.useState({show:!1,msg:""}),[P,y]=c.useState(!1),_=r=>{const a={user_code:d,new_password:r.password};F.post(W,a).then(o=>{var e;o.status===200&&(m(""),v.success((e=o==null?void 0:o.data)==null?void 0:e.message),y(!0))}).catch(o=>{var i,u,g,f;o.response.status===400&&w("Forgot");const e=(u=(i=o==null?void 0:o.response)==null?void 0:i.data)!=null&&u.message?(f=(g=o==null?void 0:o.response)==null?void 0:g.data)==null?void 0:f.message:"Something Went Wrong";v.error(e)})},S=(r,a)=>{const o=x("password"),e=x("confirmPassword");r==="password"&&(a===e?l("confirmPassword",{type:"manual",message:""}):e.length>0&&l("confirmPassword",{type:"manual",message:"Passwords and confirm password must match"})),r==="confirmPassword"&&o===a&&l("confirmPassword",{type:"manual",message:""}),b.show&&R({show:!1,msg:""})};return s.jsx(s.Fragment,{children:P?s.jsx(H,{}):s.jsx("section",{className:"login-process-sec py-100",children:s.jsx("div",{className:"container",children:s.jsx("div",{className:"row",children:s.jsx("div",{className:"col-12",children:s.jsxs("div",{className:"login-process-wrap",children:[s.jsx("h3",{children:"Create new password"}),s.jsx("div",{className:"form-wrap pt-3",children:s.jsxs("form",{onSubmit:h(_),children:[s.jsxs("div",{className:"fieldset",children:[s.jsx(C,{name:"password",control:p,defaultValue:"",render:({field:r})=>s.jsx("div",{children:s.jsx("input",{...r,onChange:a=>{S("password",a.target.value),r.onChange(a)},placeholder:"Password",className:"password form-control input-icon",type:n.pass?"text":"password"})})}),s.jsx("i",{className:`far icon-position ${n.pass?"fa-eye fa-eye-slash":"fa-eye-slash"}`,style:{cursor:"pointer"},onClick:()=>j({...n,pass:!n.pass})}),s.jsx("span",{className:"input-field-icon",children:s.jsx("img",{src:A})}),t.password&&s.jsx(N,{msg:t.password.message})]}),s.jsxs("div",{className:"fieldset",children:[s.jsx(C,{name:"confirmPassword",control:p,defaultValue:"",render:({field:r})=>s.jsx("div",{children:s.jsx("input",{...r,onChange:a=>{S("confirmPassword",a.target.value),r.onChange(a)},placeholder:"confirmPassword",className:"password form-control input-icon",type:n.confirmPass?"text":"password"})})}),s.jsx("i",{className:`far icon-position ${n.confirmPass?"fa-eye fa-eye-slash":"fa-eye-slash"}`,style:{cursor:"pointer"},onClick:()=>j({...n,confirmPass:!n.confirmPass})}),s.jsx("span",{className:"input-field-icon",children:s.jsx("img",{src:A})}),t.confirmPassword&&s.jsx(N,{msg:t.confirmPassword.message})]}),s.jsx("div",{className:"fieldset",children:s.jsx("button",{type:"submit",className:"btn-design",children:"Reset Password"})}),s.jsx("p",{children:"Please create a password with at least 10 characters that uses a combination of uppercase and lowercase letters, numbers, and special characters (e,g .,!?$)."})]})})]})})})})})})},J=$().shape({phone_number:E().required("Mobile number is required").matches(/^[0-9]+$/,"Mobile number must contain only digits with country code eg: 919898989898").min(12,q).max(15,L)}),cs=()=>{const[d,m]=c.useState("Forgot"),[w,h]=c.useState(!1),[x,p]=c.useState(""),l=c.useRef(),[t,n]=c.useState({show:!1,msg:""}),{watch:j,handleSubmit:b,control:R,formState:{errors:P}}=I({resolver:V(J)}),y=a=>{if(l.current.getValue().length<=0){n({show:!0,msg:D});return}h(!0),F.post(G,{phone_number:`+${a.phone_number}`}).then(e=>{var i;h(!1),e.status===200&&(m("otp"),v.success((i=e==null?void 0:e.data)==null?void 0:i.message))}).catch(e=>{var u,g,f,M,O;h(!1),((u=e==null?void 0:e.response)==null?void 0:u.status)===400&&n({show:!0,msg:e.response.data.message});const i=(f=(g=e==null?void 0:e.response)==null?void 0:g.data)!=null&&f.message?(O=(M=e==null?void 0:e.response)==null?void 0:M.data)==null?void 0:O.message:"Something Went Wrong";v.error(i)})},_=()=>{m("ResetPassword")},S=()=>{t.show&&n({show:!1,msg:""})},r=a=>{n({show:!1,msg:""}),console.log("Captcha value:",a)};return s.jsx(s.Fragment,{children:s.jsx("div",{children:s.jsx("section",{className:"login-process-sec py-100",children:s.jsx("div",{className:"container",children:s.jsx("div",{className:"row",children:s.jsxs("div",{className:"col-12",children:[d==="Forgot"&&s.jsxs("div",{className:"login-process-wrap",children:[s.jsx("h3",{children:"Forgot your Password?"}),s.jsx("div",{className:"form-wrap pt-4",children:s.jsxs("form",{"aria-label":"form-main",onSubmit:b(y),children:[s.jsxs("div",{className:"fieldset",children:[s.jsx(C,{name:"phone_number",control:R,defaultValue:"",render:({field:a})=>s.jsx("input",{...a,onChange:o=>{S();const e=o.target.value.replace(/[^0-9]/g,"");a.onChange(e)},className:"form-control input-icon phone-number",placeholder:"Phone number eg: 919898989898","aria-invalid":"true","aria-errormessage":"error-message-phone"})}),s.jsx("span",{className:"input-field-icon",children:s.jsx("img",{src:"./../assets/images/phone-icon.svg",alt:"img 1"})}),P.phone_number&&s.jsx(N,{id:"error-message-phone",msg:P.phone_number.message})]}),t.show&&s.jsx(N,{msg:t.msg}),s.jsx("div",{className:"fieldset",children:s.jsx(U,{loader:w,contentText:"Continue",disabled:w})}),s.jsx("p",{children:"Enter the phone number associated with your account and we'll send you a One Time Password."}),s.jsx("div",{className:"d-flex justify-content-center mt-2",children:s.jsx(Y,{ref:l,sitekey:k,onChange:r})})]})})]}),d==="otp"&&s.jsx(z,{afterAPISuccess:_,mobileNo:j("phone_number"),APIUrl:B,setUserId:p}),d==="ResetPassword"&&s.jsx(X,{userId:x,setUserId:p,setStep:m})]})})})})})})};export{cs as default};
