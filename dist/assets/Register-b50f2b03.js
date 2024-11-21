import{M as F,a as G,r as i,u as z,c as H,j as s,C as h,k as I,E as m,p as Z,L as _,g as D,l as O,d as L,e as Q,Q as M,R as W}from"./index-f542c721.js";import{p as A}from"./password-icon-c9c96b4d.js";import{A as X,S as J,L as K}from"./LoginType-5efdf988.js";import{o as Y}from"./yup-f45bf39b.js";import{c as ss,a as f,b as es}from"./index.esm-822dde25.js";import{V as as}from"./VerifyOTP-7260b346.js";import{S as rs}from"./SubmitButton-265ed07f.js";import{R as os}from"./recaptcha-wrapper-0c87ddc3.js";import"./index-27ed1d6c.js";const ns=ss().shape({first_name:f().required("First name is required"),last_name:f().required("Last name is required"),password:f().required("Password is required").min(6,"Password must be at least 6 digits long.").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{6,}$/g,"Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"),phone_number:f().matches(/^[0-9]+$/,"Mobile number must contain only digits with country code eg: 919898989898").min(12,F).max(15,G).required("Mobile number is required"),confirmPassword:f().oneOf([es("password"),null],"Passwords and confirm password must match").required("Confirm Password is required")}),fs=()=>{const[t,N]=i.useState({confirmPass:!1,pass:!1}),[g,c]=i.useState({show:!1,msg:""}),[j,w]=i.useState("Register"),v=z(),[y,S]=i.useState(!1),[q,k]=i.useState(!1),x=i.useRef(),{handleSubmit:T,watch:b,control:l,setError:P,formState:{errors:r}}=H({resolver:Y(ns)}),V=e=>{k(!0),c({show:!1,msg:""})},$=e=>{var u;const a=(u=x==null?void 0:x.current)==null?void 0:u.getValue();if((a==null?void 0:a.length)<=0){c({show:!0,msg:L});return}if(!q){c({show:!0,msg:L});return}const n={...e,phone_number:"+"+e.phone_number};delete n.confirmPassword,S(!0),Q.post(O.createOtp,n).then(o=>{var p;S(!1),localStorage.setItem("first_name",n.first_name),localStorage.setItem("last_name",n.last_name),localStorage.setItem("phone_number",n.phone_number),(p=o==null?void 0:o.data)!=null&&p.message&&M.success(o.data.message),w("OTP")}).catch(o=>{var p,R,E;S(!1),((p=o==null?void 0:o.response)==null?void 0:p.status)===400&&(c({show:!0,msg:(R=o.response.data)==null?void 0:R.message}),M.error((E=o.response.data)==null?void 0:E.message))})},d=(e,a)=>{const n=b("password"),u=b("confirmPassword");e==="password"&&(a===u?P("confirmPassword",{type:"manual",message:""}):u.length>0&&P("confirmPassword",{type:"manual",message:"Passwords and confirm password must match"})),e==="confirmPassword"&&n===a&&P("confirmPassword",{type:"manual",message:""}),g.show&&c({show:!1,msg:""})},C=e=>{e&&(localStorage.setItem("token",e==null?void 0:e.access),localStorage.setItem("refresh_token",e==null?void 0:e.refresh),localStorage.setItem("user_id",e==null?void 0:e.id)),w("SelectUser")},U=e=>{e===W.jobseeker?v("/job-seeker/dashboard"):v("/job-recruiter/dashboard")},B=()=>{w("Register")};return s.jsxs(s.Fragment,{children:[j==="Register"&&s.jsxs(X,{children:[s.jsx("h2",{children:"Sign Up"}),s.jsxs("div",{className:"form-wrap",children:[s.jsxs("form",{onSubmit:T($),children:[s.jsxs("div",{className:"fieldset",children:[s.jsx(h,{name:"first_name",control:l,defaultValue:"",render:({field:e})=>s.jsx("input",{...e,onChange:a=>{d("first_name","name"),e.onChange(a.target.value)},className:"form-control input-icon phone-number",placeholder:"First Name"})}),s.jsx("span",{className:"input-field-icon",children:s.jsx("img",{src:I})}),r.first_name&&s.jsx(m,{msg:r.first_name.message})]}),s.jsxs("div",{className:"fieldset",children:[s.jsx(h,{name:"last_name",control:l,defaultValue:"",render:({field:e})=>s.jsx("input",{...e,onChange:a=>{d("last_name","name"),e.onChange(a.target.value)},className:"form-control input-icon phone-number",placeholder:"Last Name"})}),s.jsx("span",{className:"input-field-icon",children:s.jsx("img",{src:I})}),r.last_name&&s.jsx(m,{msg:r.last_name.message})]}),s.jsxs("div",{className:"fieldset",children:[s.jsx(h,{name:"phone_number",control:l,defaultValue:"",render:({field:e})=>s.jsx("input",{...e,onChange:a=>{d("number","num");const n=a.target.value.replace(/[^0-9]/g,"");e.onChange(n)},className:"form-control input-icon phone-number",placeholder:"Phone number eg: 919898989898","aria-invalid":"true","aria-errormessage":"error-message-phone"})}),s.jsx("span",{className:"input-field-icon",children:s.jsx("img",{src:Z})}),r.phone_number&&s.jsx(m,{id:"error-message-phone",msg:r.phone_number.message})]}),s.jsxs("div",{className:"fieldset",children:[s.jsx(h,{name:"password",control:l,defaultValue:"",render:({field:e})=>s.jsx("div",{children:s.jsx("input",{...e,onChange:a=>{d("password",a.target.value),e.onChange(a)},placeholder:"Password",className:"password form-control input-icon",type:t.pass?"text":"password","aria-invalid":"true","aria-errormessage":"error-message-pasword"})})}),s.jsx("i",{className:`far icon-position ${t.pass?"fa-eye fa-eye-slash":"fa-eye-slash"}`,style:{cursor:"pointer"},onClick:()=>N({...t,pass:!t.pass})}),s.jsx("span",{className:"input-field-icon",children:s.jsx("img",{src:A})}),r.password&&s.jsx(m,{id:"error-message-pasword",msg:r.password.message})]}),s.jsxs("div",{className:"fieldset",children:[s.jsx(h,{name:"confirmPassword",control:l,defaultValue:"",render:({field:e})=>s.jsx("div",{children:s.jsx("input",{...e,onChange:a=>{d("confirmPassword",a.target.value),e.onChange(a)},placeholder:"confirmPassword",className:"password form-control input-icon",type:t.confirmPass?"text":"password","aria-label":"Has Error","aria-invalid":"true","aria-errormessage":"error-message-confirm-pasword"})})}),s.jsx("i",{className:`far icon-position ${t.confirmPass?"fa-eye fa-eye-slash":"fa-eye-slash"}`,style:{cursor:"pointer"},onClick:()=>N({...t,confirmPass:!t.confirmPass})}),s.jsx("span",{className:"input-field-icon",children:s.jsx("img",{src:A})}),r.confirmPassword&&s.jsx(m,{id:"error-message-confirm-pasword",msg:r.confirmPassword.message})]}),g.show&&s.jsx(m,{msg:g.msg}),s.jsx("div",{className:"fieldset",children:s.jsx(rs,{loader:y,disabled:g.show||y,contentText:"Sign Up"})})]}),s.jsx("div",{className:"or-with",children:s.jsx("span",{children:"Or Signup with"})}),s.jsx(J,{afterAPISuccess:C}),s.jsxs("p",{children:["By continuing you accept our standard"," ",s.jsx(_,{to:"/rms-conditions.html",children:"Terms and conditions"})," and our ",s.jsx(_,{to:"/licies",children:"Privacy policy"}),"."]}),s.jsx("div",{className:"d-flex justify-content-center mt-2 mb-2",children:s.jsx(os,{ref:x,sitekey:D,onChange:V})}),s.jsxs("p",{children:["Already have an account? ",s.jsx(_,{to:"/login",children:" Log In"}),"."]})]})]}),j==="OTP"&&s.jsx(as,{afterAPISuccess:C,mobileNumberScreen:B,mobileNo:b("phone_number"),APIUrl:O.verifyOtp,registerFlow:!0}),j==="SelectUser"&&s.jsx(K,{afterSelectUserType:U})]})};export{fs as default};