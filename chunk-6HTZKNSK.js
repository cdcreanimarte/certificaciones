import{a as U}from"./chunk-ITRJEBC2.js";import{A as u,B as H,C as Y,I as R,J as V,K as B,Z as J,aa as l,r as A}from"./chunk-ESXP6LPB.js";import"./chunk-2PPFUFFT.js";import{a as L,c as N,e as F}from"./chunk-H5E3HTG2.js";import"./chunk-BBKHAT7U.js";import{Eb as S,Gb as k,Hb as E,Ib as t,Jb as n,Kb as s,Lb as I,Mb as T,Ob as w,Rb as d,Xa as a,Xc as f,bc as D,cc as o,dc as v,eb as m,ec as _,ka as O,la as h,ua as b,xb as p}from"./chunk-CCAJ3PNG.js";import"./chunk-ODN5LVDJ.js";var g=class i{menuToggle=new b;toggleMenu(){this.menuToggle.emit()}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=m({type:i,selectors:[["app-header"]],outputs:{menuToggle:"menuToggle"},decls:10,vars:0,consts:[["color","primary"],["mat-icon-button","",3,"click"],[1,"toolbar-spacer"],["mat-icon-button",""]],template:function(e,c){e&1&&(t(0,"mat-toolbar",0)(1,"button",1),d("click",function(){return c.toggleMenu()}),t(2,"mat-icon"),o(3,"menu"),n()(),t(4,"span"),o(5,"Certificados Dashboard"),n(),s(6,"span",2),t(7,"button",3)(8,"mat-icon"),o(9,"account_circle"),n()()())},dependencies:[l,A,u,J],styles:[".toolbar-spacer[_ngcontent-%COMP%]{flex:1 1 auto}"]})};var j=[{path:"/administration/dashboard",icon:"dashboard",label:"Dashboard"},{path:"/administration/new",icon:"add",label:"Nuevo Certificado"},{path:"/administration/list",icon:"list",label:"Lista de Certificados"}];function G(i,r){if(i&1&&(I(0),t(1,"a",0)(2,"mat-icon"),o(3),n(),t(4,"span"),o(5),n()(),T()),i&2){let e=r.$implicit;a(),p("routerLink",e.path),a(2),v(e.icon),a(2),v(e.label)}}var C=class i{menuItems=j;static \u0275fac=function(e){return new(e||i)};static \u0275cmp=m({type:i,selectors:[["app-sidenav"]],decls:3,vars:0,consts:[["mat-list-item","","routerLinkActive","active",3,"routerLink"]],template:function(e,c){e&1&&(t(0,"mat-nav-list"),k(1,G,6,3,"ng-container",null,S),n()),e&2&&(a(),E(c.menuItems))},dependencies:[f,l,u,Y,H,N],styles:[".active[_ngcontent-%COMP%]{background:#0000000a}mat-icon[_ngcontent-%COMP%]{margin-right:16px}"]})};var M=class i{version=U;currentYear=new Date().getFullYear();static \u0275fac=function(e){return new(e||i)};static \u0275cmp=m({type:i,selectors:[["app-footer"]],decls:19,vars:2,consts:[[1,"footer"],[1,"footer-content"],[1,"footer-section"],[1,"copyright"],[1,"footer-section","links"],["routerLink","/privacy",1,"footer-link"],[1,"separator"],["routerLink","/terms",1,"footer-link"],["routerLink","/help",1,"footer-link"],[1,"footer-section","version"],[1,"version-text"]],template:function(e,c){e&1&&(t(0,"footer",0)(1,"div",1)(2,"div",2)(3,"span",3),o(4),n()(),t(5,"div",4)(6,"a",5),o(7,"Privacidad"),n(),t(8,"span",6),o(9,"\u2022"),n(),t(10,"a",7),o(11,"T\xE9rminos"),n(),t(12,"span",6),o(13,"\u2022"),n(),t(14,"a",8),o(15,"Ayuda"),n()(),t(16,"div",9)(17,"span",10),o(18),n()()()()),e&2&&(a(4),_(" \xA9 ",c.currentYear," Tu Empresa. Todos los derechos reservados. "),a(14),_("Versi\xF3n ",c.version,""))},styles:[".footer[_ngcontent-%COMP%]{background:#fff;border-top:1px solid rgba(0,0,0,.12);padding:16px 24px;color:#000000b3;font-size:14px}.footer[_ngcontent-%COMP%]   .footer-content[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;max-width:1200px;margin:0 auto}@media (max-width: 768px){.footer[_ngcontent-%COMP%]   .footer-content[_ngcontent-%COMP%]{flex-direction:column;gap:16px;text-align:center}}.footer[_ngcontent-%COMP%]   .footer-section.links[_ngcontent-%COMP%]{display:flex;align-items:center;gap:16px}.footer[_ngcontent-%COMP%]   .footer-section.links[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%]{color:#0000004d}.footer[_ngcontent-%COMP%]   .footer-link[_ngcontent-%COMP%]{color:#000000b3;text-decoration:none;transition:color .2s ease}.footer[_ngcontent-%COMP%]   .footer-link[_ngcontent-%COMP%]:hover{color:#000000e6}.footer[_ngcontent-%COMP%]   .version-text[_ngcontent-%COMP%]{color:#00000080}.footer[_ngcontent-%COMP%]   .copyright[_ngcontent-%COMP%]{white-space:nowrap}"]})};var z=class i{static \u0275fac=function(e){return new(e||i)};static \u0275cmp=m({type:i,selectors:[["app-admin-layout"]],decls:10,vars:1,consts:[["sidenav",""],[1,"admin-layout"],[3,"menuToggle"],[1,"sidenav-container"],["mode","side",3,"opened"],[1,"content-wrapper"]],template:function(e,c){if(e&1){let P=w();t(0,"div",1)(1,"app-header",2),d("menuToggle",function(){O(P);let $=D(4);return h($.toggle())}),n(),t(2,"mat-sidenav-container",3)(3,"mat-sidenav",4,0),s(5,"app-sidenav"),n(),t(6,"mat-sidenav-content")(7,"div",5),s(8,"router-outlet"),n(),s(9,"app-footer"),n()()()}e&2&&(a(3),p("opened",!0))},dependencies:[f,l,V,B,R,F,L,g,C,M],styles:[".admin-layout[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-height:100vh}.admin-layout[_ngcontent-%COMP%]   .sidenav-container[_ngcontent-%COMP%]{flex:1}.admin-layout[_ngcontent-%COMP%]   .sidenav-container[_ngcontent-%COMP%]   mat-sidenav[_ngcontent-%COMP%]{width:250px;border-right:1px solid rgba(0,0,0,.12)}.admin-layout[_ngcontent-%COMP%]   .sidenav-container[_ngcontent-%COMP%]   mat-sidenav-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-height:calc(100vh - 64px)}.admin-layout[_ngcontent-%COMP%]   .sidenav-container[_ngcontent-%COMP%]   mat-sidenav-content[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]{flex:1;padding:24px;overflow-y:auto}.admin-layout[_ngcontent-%COMP%]   .sidenav-container[_ngcontent-%COMP%]   mat-sidenav-content[_ngcontent-%COMP%]   .content-wrapper[_ngcontent-%COMP%]     router-outlet+*{display:block;animation:_ngcontent-%COMP%_fadeIn .3s ease-in-out}.admin-layout[_ngcontent-%COMP%]   .sidenav-container[_ngcontent-%COMP%]   mat-sidenav-content[_ngcontent-%COMP%]   app-footer[_ngcontent-%COMP%]{flex-shrink:0;height:64px}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}"]})};export{z as AdminLayoutComponent};
