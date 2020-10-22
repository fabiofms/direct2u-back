(this.webpackJsonpfront=this.webpackJsonpfront||[]).push([[0],{24:function(e,t,n){e.exports=n(36)},35:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(22),o=n.n(c),u=n(1),s=n(7),l=n(5),i=n(2),m=n.n(i),p=n(9),f=n(4),d=n(8),b=n(3),h=function(e){var t=Object(a.useState)({name:"",price:""}),n=Object(u.a)(t,2),c=n[0],o=n[1],s=Object(a.useState)(!1),l=Object(u.a)(s,2),i=(l[0],l[1]),h=Object(a.useState)([]),g=Object(u.a)(h,2),E=g[0],y=g[1],v=c.name,j=c.price,O=function(e){return o(Object(b.a)(Object(b.a)({},c),{},Object(d.a)({},e.target.name,e.target.value)))},k=function(){var t=Object(f.a)(m.a.mark((function t(n){var a,r,c,o;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),y((function(e){return[]})),a={name:v,price:j},t.prev=3,i(!0),t.next=7,fetch("https://direct-to-you.herokuapp.com/api/product",{method:"POST",headers:{"Content-Type":"application/json","x-auth-token":localStorage.getItem("token")},body:JSON.stringify(a)});case 7:return r=t.sent,t.next=10,r.json();case 10:c=t.sent,r.ok?(i(!1),e.history.push("/products")):(o=[],c.errors.forEach((function(e){o.push(e.msg)})),y((function(e){return e.concat(o)})),i(!1)),t.next=19;break;case 14:t.prev=14,t.t0=t.catch(3),console.error(t.t0),i(!1),y((function(e){return[].concat(Object(p.a)(e),[t.t0.message||"Something went wrong, please try again"])}));case 19:case"end":return t.stop()}}),t,null,[[3,14]])})));return function(e){return t.apply(this,arguments)}}(),x=function(e){return e.errors.map((function(e,t){return r.a.createElement("p",{key:t,style:{color:"red"}},e)}))};return r.a.createElement("section",{className:"container"},r.a.createElement("h1",{className:"large text-primary"},"Add New Product"),r.a.createElement(x,{errors:E}),r.a.createElement("form",{className:"form",onSubmit:function(e){return k(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"Product Name",name:"name",value:v,onChange:function(e){return O(e)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"Product price",name:"price",value:j,onChange:function(e){return O(e)}})),r.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"Add"})))},g=function(e){var t=function(){var t=Object(f.a)(m.a.mark((function t(){var n,a;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("https://direct-to-you.herokuapp.com/api/product/"+e.id,{method:"DELETE",headers:{"x-auth-token":localStorage.getItem("token")}});case 3:return n=t.sent,t.next=6,n.json();case 6:if(a=t.sent,n.ok){t.next=9;break}throw new Error(a.msg);case 9:e.onDelete(e.id),t.next=14;break;case 12:t.prev=12,t.t0=t.catch(0);case 14:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(){return t.apply(this,arguments)}}();return r.a.createElement("li",null,r.a.createElement("div",{className:"post bg-white p my-1"},r.a.createElement("p",null,"Name: ",e.name,r.a.createElement("br",null),"Price: R$",e.price.toFixed(2)),r.a.createElement("p",null,r.a.createElement("button",{type:"button",className:"btn btn-dark",onClick:function(){e.history.push("/product/"+e.id)}},"Edit"),r.a.createElement("button",{type:"button",className:"btn btn-dark",onClick:t},"Delete"))))},E=function(e){return 0===e.items.length?r.a.createElement("div",{className:"center"},r.a.createElement("h2",null,"No products found.")):r.a.createElement("ul",{style:{position:"relative"},className:"products-list"},e.items.map((function(t){return r.a.createElement(g,{key:t._id,id:t._id,name:t.name,price:t.price,onDelete:e.onDelete,history:e.history})})))},y=function(e){var t=Object(a.useState)(),n=Object(u.a)(t,2),c=n[0],o=n[1],s=Object(a.useState)(),l=Object(u.a)(s,2),i=(l[0],l[1]),p=Object(a.useState)(!1),d=Object(u.a)(p,2),b=(d[0],d[1]);return Object(a.useEffect)((function(){(function(){var e=Object(f.a)(m.a.mark((function e(){var t,n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(!0),e.prev=1,e.next=4,fetch("https://direct-to-you.herokuapp.com/api/product",{method:"GET",headers:{"Content-Type":"application/json","x-auth-token":localStorage.getItem("token")}});case 4:return t=e.sent,e.next=7,t.json();case 7:if(n=e.sent,t.ok){e.next=10;break}throw new Error(n.msg);case 10:o((function(){return n})),b(!1),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(1),b(!1),i(e.t0.message);case 18:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(){return e.apply(this,arguments)}})()()}),[]),r.a.createElement("section",{className:"container"},r.a.createElement("h1",{className:"large text-primary"},"Products"),r.a.createElement("button",{onClick:function(){e.history.push("/product/new")},className:"btn btn-green"},"New Product"),c&&r.a.createElement(E,{items:c,onDelete:function(e){o((function(t){return t.filter((function(t){return t._id!==e}))})),console.log(c)},history:e.history}))},v=function(e){var t=Object(l.g)().productId,n=Object(a.useState)({name:"",price:""}),c=Object(u.a)(n,2),o=c[0],s=c[1],i=Object(a.useState)(!1),h=Object(u.a)(i,2),g=(h[0],h[1]),E=Object(a.useState)([]),y=Object(u.a)(E,2),v=y[0],j=y[1],O=o.name,k=o.price;Object(a.useEffect)((function(){(function(){var e=Object(f.a)(m.a.mark((function e(){var n,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat("https://direct-to-you.herokuapp.com","/api/product/").concat(t),{headers:{"Content-Type":"application/json","x-auth-token":localStorage.getItem("token")}});case 3:return n=e.sent,e.next=6,n.json();case 6:a=e.sent,s({name:a.name,price:a.price}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}})()()}),[t,s]);var x=function(e){return s(Object(b.a)(Object(b.a)({},o),{},Object(d.a)({},e.target.name,e.target.value)))},N=function(){var n=Object(f.a)(m.a.mark((function n(a){var r,c,o,u;return m.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a.preventDefault(),j((function(e){return[]})),r={name:O,price:k},n.prev=3,g(!0),n.next=7,fetch("https://direct-to-you.herokuapp.com/api/product/"+t,{method:"PUT",headers:{"Content-Type":"application/json","x-auth-token":localStorage.getItem("token")},body:JSON.stringify(r)});case 7:return c=n.sent,n.next=10,c.json();case 10:o=n.sent,console.log(o),c.ok?(g(!1),e.history.push("/products")):(u=[],o.errors.forEach((function(e){u.push(e.msg)})),j((function(e){return e.concat(u)})),g(!1)),n.next=20;break;case 15:n.prev=15,n.t0=n.catch(3),console.error(n.t0),g(!1),j((function(e){return[].concat(Object(p.a)(e),[n.t0.message||"Something went wrong, please try again"])}));case 20:case"end":return n.stop()}}),n,null,[[3,15]])})));return function(e){return n.apply(this,arguments)}}(),w=function(e){return e.errors.map((function(e,t){return r.a.createElement("p",{key:t,style:{color:"red"}},e)}))};return r.a.createElement("section",{className:"container"},r.a.createElement("h1",{className:"large text-primary"},"Update Product"),r.a.createElement(w,{errors:v}),r.a.createElement("form",{className:"form",onSubmit:function(e){return N(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"Product Name",name:"name",value:O,onChange:function(e){return x(e)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"Product Price",name:"price",value:k,onChange:function(e){return x(e)}})),r.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"Update"}),r.a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:function(){return e.history.push("/products")}},"Cancel")))},j=function(e){return r.a.createElement("li",null,r.a.createElement("div",{className:"post bg-white p my-1"},r.a.createElement("p",null,"Product: ",e.name),r.a.createElement("p",null,"Quantity: ",e.quantity),r.a.createElement("p",null,r.a.createElement("button",{type:"button",className:"btn btn-dark",onClick:function(){return e.onDelete(e.id)}},"Delete"))))},O=function(e){return r.a.createElement("ul",{style:{position:"relative"},className:"products-list"},e.items.map((function(t){return r.a.createElement(j,{key:t.product,id:t.product,name:t.name,quantity:t.quantity,onDelete:e.onDelete,history:e.history})})))},k=function(e){var t=Object(a.useState)(),n=Object(u.a)(t,2),c=n[0],o=n[1],s=Object(a.useState)([]),l=Object(u.a)(s,2),i=l[0],h=l[1],g=Object(a.useState)([]),E=Object(u.a)(g,2),y=E[0],v=E[1],j=Object(a.useState)(!1),k=Object(u.a)(j,2),x=(k[0],k[1]),N=Object(a.useState)({quantity:"",product:""}),w=Object(u.a)(N,2),S=w[0],C=w[1],I=Object(a.useState)({client:"",email:""}),P=Object(u.a)(I,2),D=P[0],T=P[1],L=S.quantity,A=S.product,U=D.client,_=D.email;Object(a.useEffect)((function(){(function(){var e=Object(f.a)(m.a.mark((function e(){var t,n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x(!0),e.prev=1,e.next=4,fetch("https://direct-to-you.herokuapp.com/api/product",{method:"GET",headers:{"Content-Type":"application/json","x-auth-token":localStorage.getItem("token")}});case 4:return t=e.sent,e.next=7,t.json();case 7:if(n=e.sent,t.ok){e.next=10;break}throw new Error(n.msg);case 10:o((function(){return n})),n.length>0&&C((function(e){return Object(b.a)(Object(b.a)({},e),{},{product:n[0]._id})})),x(!1),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(1),x(!1),v(e.t0.message);case 19:case"end":return e.stop()}}),e,null,[[1,15]])})));return function(){return e.apply(this,arguments)}})()()}),[]);var q=function(e){return T(Object(b.a)(Object(b.a)({},D),{},Object(d.a)({},e.target.name,e.target.value)))},J=function(e){C(Object(b.a)(Object(b.a)({},S),{},Object(d.a)({},e.target.name,e.target.value)))},G=function(){var t=Object(f.a)(m.a.mark((function t(n){var a,r,c,o;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),v((function(e){return[]})),a={client:U,email:_,products:i},t.prev=3,x(!0),t.next=7,fetch("https://direct-to-you.herokuapp.com/api/sale",{method:"POST",headers:{"Content-Type":"application/json","x-auth-token":localStorage.getItem("token")},body:JSON.stringify(a)});case 7:return r=t.sent,t.next=10,r.json();case 10:c=t.sent,r.ok?(x(!1),e.history.push("/sales")):(o=[],c.errors.forEach((function(e){o.push(e.msg)})),v((function(e){return e.concat(o)})),x(!1)),t.next=19;break;case 14:t.prev=14,t.t0=t.catch(3),console.error(t.t0),x(!1),v((function(e){return[].concat(Object(p.a)(e),[t.t0.message||"Something went wrong, please try again"])}));case 19:case"end":return t.stop()}}),t,null,[[3,14]])})));return function(e){return t.apply(this,arguments)}}(),R=function(e){return e.errors.map((function(e,t){return r.a.createElement("p",{key:t,style:{color:"red"}},e)}))};return r.a.createElement("section",{className:"container"},r.a.createElement("h1",{className:"large text-primary"},"Add New Sale"),r.a.createElement(R,{errors:y}),r.a.createElement("form",{className:"form",onSubmit:function(e){return G(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"Client Name",name:"client",value:U,onChange:function(e){return q(e)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"Email",name:"email",value:_,onChange:function(e){return q(e)}})),r.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"Add Sale"})),r.a.createElement("form",{className:"form",onSubmit:function(e){!function(e){e.preventDefault();var t=c.filter((function(e){return e._id===A}))[0].name,n=Object(b.a)(Object(b.a)({},S),{},{name:t});h((function(e){return[].concat(Object(p.a)(e),[n])})),C((function(e){return Object(b.a)(Object(b.a)({},e),{},{quantity:0})}))}(e)}},r.a.createElement("p",null,"Choose a Product:"),c&&r.a.createElement("select",{name:"product",value:A,onChange:function(e){return J(e)}},c.map((function(e){return r.a.createElement("option",{key:e._id,value:e._id},e.name)}))),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"Quantity",name:"quantity",value:L,onChange:function(e){return J(e)}})),r.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"Add Product"})),c&&r.a.createElement(O,{items:i,onDelete:function(e){h((function(t){return t.filter((function(t){return e!==t.product}))}))},history:e.history}))},x=function(e){var t=function(){var t=Object(f.a)(m.a.mark((function t(){var n,a;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("https://direct-to-you.herokuapp.com/api/sale/"+e.id,{method:"DELETE",headers:{"x-auth-token":localStorage.getItem("token")}});case 3:return n=t.sent,t.next=6,n.json();case 6:if(a=t.sent,n.ok){t.next=9;break}throw new Error(a.msg);case 9:e.onDelete(e.id),t.next=14;break;case 12:t.prev=12,t.t0=t.catch(0);case 14:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(){return t.apply(this,arguments)}}();return r.a.createElement("li",null,r.a.createElement("div",{className:"post bg-white p my-1"},r.a.createElement("p",null,"Date: ",e.date," ",r.a.createElement("br",null),"Client: ",e.client," ",r.a.createElement("br",null),"Items: ",e.quantity," ",r.a.createElement("br",null),"Price: R$",e.price.toFixed(2)),r.a.createElement("p",null,r.a.createElement("button",{type:"button",className:"btn btn-dark",onClick:t},"Delete"))))},N=function(e){return 0===e.items.length?r.a.createElement("div",{className:"center"},r.a.createElement("h2",null,"No sales found.")):r.a.createElement("ul",{style:{position:"relative"},className:"sales-list"},e.items.map((function(t){return r.a.createElement(x,{key:t._id,id:t._id,client:t.client,date:t.date,price:t.price,done:t.done,quantity:t.products.length,onDelete:e.onDelete,history:e.history})})))},w=function(e){var t=Object(a.useState)(),n=Object(u.a)(t,2),c=n[0],o=n[1],s=Object(a.useState)(),l=Object(u.a)(s,2),i=(l[0],l[1]),p=Object(a.useState)(!1),d=Object(u.a)(p,2),b=(d[0],d[1]);return Object(a.useEffect)((function(){(function(){var e=Object(f.a)(m.a.mark((function e(){var t,n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(!0),e.prev=1,e.next=4,fetch("https://direct-to-you.herokuapp.com/api/sale",{method:"GET",headers:{"Content-Type":"application/json","x-auth-token":localStorage.getItem("token")}});case 4:return t=e.sent,e.next=7,t.json();case 7:if(n=e.sent,t.ok){e.next=10;break}throw new Error(n.msg);case 10:o((function(){return n})),b(!1),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(1),b(!1),i(e.t0.message);case 18:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(){return e.apply(this,arguments)}})()()}),[]),r.a.createElement("section",{className:"container"},r.a.createElement("h1",{className:"large text-primary"},"Sales"),r.a.createElement("button",{onClick:function(){e.history.push("/sale/new")},className:"btn btn-green"},"New Sale"),c&&r.a.createElement(N,{items:c,onDelete:function(e){o((function(t){return t.filter((function(t){return t._id!==e}))})),console.log(c)},history:e.history}))},S=function(e){var t=Object(l.g)().productId,n=Object(a.useState)({name:"",type:""}),c=Object(u.a)(n,2),o=c[0],s=c[1],i=Object(a.useState)(!1),h=Object(u.a)(i,2),g=(h[0],h[1]),E=Object(a.useState)([]),y=Object(u.a)(E,2),v=y[0],j=y[1],O=o.name,k=o.type;Object(a.useEffect)((function(){(function(){var e=Object(f.a)(m.a.mark((function e(){var n,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat("https://direct-to-you.herokuapp.com","/api/product/").concat(t),{headers:{"Content-Type":"application/json","x-auth-token":localStorage.getItem("token")}});case 3:return n=e.sent,e.next=6,n.json();case 6:a=e.sent,s({name:a.name,type:a.type}),e.next=12;break;case 10:e.prev=10,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}})()()}),[t,s]);var x=function(e){return s(Object(b.a)(Object(b.a)({},o),{},Object(d.a)({},e.target.name,e.target.value)))},N=function(){var n=Object(f.a)(m.a.mark((function n(a){var r,c,o,u;return m.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a.preventDefault(),j((function(e){return[]})),r={name:O,type:k},n.prev=3,g(!0),n.next=7,fetch("https://direct-to-you.herokuapp.com/api/product/"+t,{method:"PUT",headers:{"Content-Type":"application/json","x-auth-token":localStorage.getItem("token")},body:JSON.stringify(r)});case 7:return c=n.sent,n.next=10,c.json();case 10:o=n.sent,console.log(o),c.ok?(g(!1),e.history.push("/products")):(u=[],o.errors.forEach((function(e){u.push(e.msg)})),j((function(e){return e.concat(u)})),g(!1)),n.next=20;break;case 15:n.prev=15,n.t0=n.catch(3),console.error(n.t0),g(!1),j((function(e){return[].concat(Object(p.a)(e),[n.t0.message||"Something went wrong, please try again"])}));case 20:case"end":return n.stop()}}),n,null,[[3,15]])})));return function(e){return n.apply(this,arguments)}}(),w=function(e){return e.errors.map((function(e,t){return r.a.createElement("p",{key:t,style:{color:"red"}},e)}))};return r.a.createElement("section",{class:"container"},r.a.createElement("h1",{className:"large text-primary"},"Add New Product"),r.a.createElement(w,{errors:v}),r.a.createElement("form",{className:"form",onSubmit:function(e){return N(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"Product Name",name:"name",value:O,onChange:function(e){return x(e)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"Product Type",name:"type",value:k,onChange:function(e){return x(e)}})),r.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"Update"})))},C=Object(a.createContext)({isLoggedIn:!1,login:function(){},logout:function(){}}),I=function(e){var t=Object(a.useContext)(C);return r.a.createElement("nav",{className:"navbar bg-dark"},r.a.createElement("h1",null,r.a.createElement(s.b,{to:"/"},r.a.createElement("i",{className:"fas fa-code"})," Direct2U")),r.a.createElement("ul",null,!t.isLoggedIn&&r.a.createElement("li",null,r.a.createElement(s.b,{to:"/register"},"Register")),!t.isLoggedIn&&r.a.createElement("li",null,r.a.createElement(s.b,{to:"/login"},"Login")),t.isLoggedIn&&r.a.createElement("li",null,r.a.createElement(s.b,{to:"/products"},"Products")),t.isLoggedIn&&r.a.createElement("li",null,r.a.createElement(s.b,{to:"/sales"},"Sales")),t.isLoggedIn&&r.a.createElement("li",null,r.a.createElement("button",{onClick:t.logout},"LOGOUT"))))},P=function(){var e=Object(a.useContext)(C);return r.a.createElement("section",{className:"landing"},r.a.createElement("div",{className:"dark-overlay"},r.a.createElement("div",{className:"landing-inner"},r.a.createElement("h1",{className:"x-large"},"Direct2U"),r.a.createElement("p",{className:"lead"},"A Direct Sales Management Plattaform"),r.a.createElement("div",{className:"buttons"},!e.isLoggedIn&&r.a.createElement(s.b,{to:"/register",className:"btn btn-primary"},"Sign Up"),!e.isLoggedIn&&r.a.createElement(s.b,{to:"/login",className:"btn btn-light"},"Login")))))},D=function(){var e=Object(a.useContext)(C),t=Object(a.useState)({email:"",password:""}),n=Object(u.a)(t,2),c=n[0],o=n[1],l=Object(a.useState)(!1),i=Object(u.a)(l,2),h=(i[0],i[1]),g=Object(a.useState)([]),E=Object(u.a)(g,2),y=E[0],v=E[1],j=function(e,t){localStorage.setItem("token",t.token),e.login()},O=c.email,k=c.password,x=function(e){return o(Object(b.a)(Object(b.a)({},c),{},Object(d.a)({},e.target.name,e.target.value)))},N=function(){var t=Object(f.a)(m.a.mark((function t(n){var a,r,c,o;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),v((function(e){return[]})),a={email:O,password:k},t.prev=3,h(!0),t.next=7,fetch("https://direct-to-you.herokuapp.com/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});case 7:return r=t.sent,t.next=10,r.json();case 10:c=t.sent,console.log(c),r.ok?(h(!1),j(e,c)):(localStorage.removeItem("token"),o=[],c.errors.forEach((function(e){o.push(e.msg)})),v((function(e){return e.concat(o)})),h(!1)),t.next=21;break;case 15:t.prev=15,t.t0=t.catch(3),localStorage.removeItem("token"),console.error(t.t0),h(!1),v((function(e){return[].concat(Object(p.a)(e),[t.t0.message||"Something went wrong, please try again"])}));case 21:case"end":return t.stop()}}),t,null,[[3,15]])})));return function(e){return t.apply(this,arguments)}}(),w=function(e){return e.errors.map((function(e,t){return r.a.createElement("p",{key:t,style:{color:"red"}},e)}))};return r.a.createElement("section",{className:"container"},r.a.createElement("h1",{className:"large text-primary"},"Sign In"),r.a.createElement("p",{className:"lead"},r.a.createElement("i",{className:"fas fa-user"})," Sign Into Your Account"),r.a.createElement(w,{errors:y}),r.a.createElement("form",{className:"form",onSubmit:function(e){return N(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"email",placeholder:"Email Address",name:"email",value:O,onChange:function(e){return x(e)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",placeholder:"Password",name:"password",value:k,onChange:function(e){return x(e)}})),r.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"Login"})),r.a.createElement("p",{className:"my-1"},"Don't have an account? ",r.a.createElement(s.b,{to:"/register"},"Sign Up")))},T=function(){var e=Object(a.useContext)(C),t=Object(a.useState)({name:"",email:"",password:"",password2:""}),n=Object(u.a)(t,2),c=n[0],o=n[1],l=Object(a.useState)(!1),i=Object(u.a)(l,2),h=(i[0],i[1]),g=Object(a.useState)([]),E=Object(u.a)(g,2),y=E[0],v=E[1],j=function(e,t){localStorage.setItem("token",t.token),e.login()},O=c.name,k=c.email,x=c.password,N=c.password2,w=function(e){return o(Object(b.a)(Object(b.a)({},c),{},Object(d.a)({},e.target.name,e.target.value)))},S=function(){var t=Object(f.a)(m.a.mark((function t(n){var a,r,c,o;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),v((function(e){return[]})),x===N){t.next=6;break}console.log("Passwords do not match"),t.next=24;break;case 6:return a={name:O,email:k,password:x},t.prev=7,h(!0),t.next=11,fetch("https://direct-to-you.herokuapp.com/api/user",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});case 11:return r=t.sent,t.next=14,r.json();case 14:c=t.sent,r.ok?(h(!1),j(e,c)):(localStorage.removeItem("token"),o=[],c.errors.forEach((function(e){o.push(e.msg)})),v((function(e){return e.concat(o)})),h(!1)),t.next=24;break;case 18:t.prev=18,t.t0=t.catch(7),localStorage.removeItem("token"),console.error(t.t0),h(!1),v((function(e){return[].concat(Object(p.a)(e),[t.t0.message||"Something went wrong, please try again"])}));case 24:case"end":return t.stop()}}),t,null,[[7,18]])})));return function(e){return t.apply(this,arguments)}}(),I=function(e){return e.errors.map((function(e,t){return r.a.createElement("p",{key:t,style:{color:"red"}},e)}))};return r.a.createElement("section",{className:"container"},r.a.createElement("h1",{className:"large text-primary"},"Sign Up"),r.a.createElement("p",{className:"lead"},r.a.createElement("i",{className:"fas fa-user"})," Create Your Account"),r.a.createElement(I,{errors:y}),r.a.createElement("form",{className:"form",onSubmit:function(e){return S(e)}},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"Name",name:"name",value:O,onChange:function(e){return w(e)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"email",placeholder:"Email Address",name:"email",value:k,onChange:function(e){return w(e)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",placeholder:"Password",name:"password",value:x,onChange:function(e){return w(e)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",placeholder:"Confirm Password",name:"password2",minLength:"6",value:N,onChange:function(e){return w(e)}})),r.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"Register"})),r.a.createElement("p",{className:"my-1"},"Already have an account? ",r.a.createElement(s.b,{to:"/login"},"Sign In")))},L=(n(35),function(){var e=Object(a.useState)(!1),t=Object(u.a)(e,2),n=t[0],c=t[1],o=Object(a.useCallback)((function(){c(!0)}),[]),i=Object(a.useCallback)((function(){c(!1)}),[]);return r.a.createElement(C.Provider,{value:{isLoggedIn:n,login:o,logout:i}},r.a.createElement(s.a,null,r.a.createElement(I,null),n?r.a.createElement(l.d,null,r.a.createElement(l.b,{path:"/product/new",exact:!0,component:h}),r.a.createElement(l.b,{path:"/products",exact:!0,component:y}),r.a.createElement(l.b,{path:"/product/:productId",exact:!0,component:v}),r.a.createElement(l.b,{path:"/sale/new",exact:!0,component:k}),r.a.createElement(l.b,{path:"/sales",exact:!0,component:w}),r.a.createElement(l.b,{path:"/sale/:saleId",exact:!0,component:S}),r.a.createElement(l.b,{path:"/",exact:!0,component:P}),r.a.createElement(l.a,{to:"/"})):r.a.createElement(l.d,null,r.a.createElement(l.b,{exact:!0,path:"/register",component:T}),r.a.createElement(l.b,{exact:!0,path:"/login",component:D}),r.a.createElement(l.b,{path:"/",exact:!0,component:P}),r.a.createElement(l.a,{to:"/"}))))});o.a.render(r.a.createElement(L,null),document.getElementById("root"))}},[[24,1,2]]]);
//# sourceMappingURL=main.c56f4cdd.chunk.js.map