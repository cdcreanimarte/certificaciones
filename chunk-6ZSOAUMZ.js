import{b as H,c as $}from"./chunk-USRT3PLD.js";import{d as Ct}from"./chunk-35GLAMPB.js";import{A as it,B as nt,C as at,D as ot,E as rt,F as lt,G as mt,H as ct,I as st,J as dt,K as pt,L as ut,M as q,N as ft,O as R,P as b,b as B,c as Q,d as j,e as U,f as J,g as G,h as K,l as W,o as D,p as X,r as Y,v as Z,w as tt,x as et,z as y}from"./chunk-TN7L4IB7.js";import"./chunk-2PPFUFFT.js";import{Ga as P,i as z}from"./chunk-J5ITEULD.js";import{$a as l,$b as k,Ab as d,Gb as M,Lb as n,Mb as a,Nb as x,Ob as p,Pb as u,Rb as T,Ub as g,Wb as f,_b as V,ab as E,ac as F,ec as A,fa as v,fc as o,hc as c,ib as S,oa as _,oc as O,pa as h,yb as s,za as L}from"./chunk-UORU4LUB.js";import"./chunk-E4ERW3Q5.js";import"./chunk-OA5THNKF.js";import"./chunk-FK6H3RFT.js";import{j as w}from"./chunk-4ZZIO3ZI.js";var I=class t{constructor(e){this.data=e}static \u0275fac=function(i){return new(i||t)(E(B))};static \u0275cmp=S({type:t,selectors:[["app-modal-confirmation"]],decls:9,vars:2,consts:[["mat-dialog-title",""],["align","end"],["mat-button","","mat-dialog-close",""],["mat-button","","color","warn",3,"mat-dialog-close"]],template:function(i,r){i&1&&(n(0,"h2",0),o(1,"Confirmar eliminaci\xF3n"),a(),n(2,"mat-dialog-content"),o(3),a(),n(4,"mat-dialog-actions",1)(5,"button",2),o(6,"Cancelar"),a(),n(7,"button",3),o(8,"Eliminar"),a()()),i&2&&(l(3),c(" \xBFEst\xE1s seguro de que deseas eliminar el certificado de ",r.data,"? "),l(4),d("mat-dialog-close",!0))},dependencies:[b,D,j,U,G,J],encapsulation:2})};var bt=()=>[5,10,25,100];function wt(t,e){t&1&&(n(0,"th",20),o(1," C\xF3digo "),a())}function vt(t,e){if(t&1&&(n(0,"td",21),o(1),a()),t&2){let i=e.$implicit;l(),c(" ",i.code," ")}}function Et(t,e){t&1&&(n(0,"th",20),o(1," Estudiante "),a())}function Mt(t,e){if(t&1&&(n(0,"td",21),o(1),a()),t&2){let i=e.$implicit;l(),c(" ",i.studentName," ")}}function Dt(t,e){t&1&&(n(0,"th",20),o(1," Tipo Doc. "),a())}function yt(t,e){if(t&1&&(n(0,"td",21),o(1),a()),t&2){let i=e.$implicit;l(),c(" ",i.documentType," ")}}function Rt(t,e){t&1&&(n(0,"th",20),o(1," N\xFAmero Doc. "),a())}function It(t,e){if(t&1&&(n(0,"td",21),o(1),a()),t&2){let i=e.$implicit;l(),c(" ",i.documentNumber," ")}}function Nt(t,e){t&1&&(n(0,"th",20),o(1," Curso "),a())}function Lt(t,e){if(t&1&&(n(0,"td",21),o(1),a()),t&2){let i=e.$implicit;l(),c(" ",i.courseName," ")}}function Vt(t,e){t&1&&(n(0,"th",20),o(1," Horas "),a())}function kt(t,e){if(t&1&&(n(0,"td",21),o(1),a()),t&2){let i=e.$implicit;l(),c(" ",i.hours," ")}}function Ft(t,e){t&1&&(n(0,"th",20),o(1," Email "),a())}function qt(t,e){if(t&1&&(n(0,"td",21),o(1),a()),t&2){let i=e.$implicit;l(),c(" ",i.email," ")}}function Pt(t,e){t&1&&(n(0,"th",20),o(1," Fecha "),a())}function At(t,e){if(t&1&&(n(0,"td",21),o(1),a()),t&2){let i=e.$implicit;l(),c(" ",i.created_at," ")}}function Ot(t,e){t&1&&(n(0,"th",22),o(1," Acciones "),a())}function Ht(t,e){if(t&1){let i=T();n(0,"td",21)(1,"button",23),g("click",function(){let m=_(i).$implicit,C=f();return h(C.onEdit(m))}),n(2,"mat-icon"),o(3,"edit"),a()(),n(4,"button",23),g("click",function(){let m=_(i).$implicit,C=f();return h(C.onDelete(m))}),n(5,"mat-icon"),o(6,"delete"),a()()()}t&2&&(l(),d("matTooltip","Editar certificado"),l(3),d("matTooltip","Eliminar certificado"))}function $t(t,e){t&1&&x(0,"tr",24)}function zt(t,e){t&1&&x(0,"tr",25)}function Bt(t,e){if(t&1&&(n(0,"tr",26)(1,"td",27),o(2),a()()),t&2){f();let i=A(4);l(2),c('No hay datos que coincidan con el filtro "',i.value,'"')}}var N=class t{constructor(e){this.dialog=e;this.dataSource=new q([])}set data(e){this.dataSource=new q(e),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort,this.setupFilterPredicate(),this.dataSource.filterPredicate=(i,r)=>(i.code+i.studentName+i.documentNumber+i.courseName+i.email).toLowerCase().indexOf(r.toLowerCase())!==-1}deleteRequest=new L;editRequest=new L;displayedColumns=["code","studentName","documentType","documentNumber","courseName","hours","email","created_at","actions"];dataSource;paginator;sort;setupFilterPredicate(){this.dataSource.filterPredicate=(e,i)=>(e.code+e.studentName+e.documentNumber+e.courseName+e.email).toLowerCase().indexOf(i.toLowerCase())!==-1}ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}applyFilter(e){let i=e.target.value;this.dataSource.filter=i.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage()}onEdit(e){console.log("Edit:",e)}onDelete(e){this.dialog.open(I,{width:"350px",data:e.studentName}).afterClosed().subscribe(r=>{r&&this.deleteRequest.emit(e)})}onView(e){console.log("View:",e)}onDownload(e){console.log("Download:",e)}static \u0275fac=function(i){return new(i||t)(E(Q))};static \u0275cmp=S({type:t,selectors:[["app-table"]],viewQuery:function(i,r){if(i&1&&(V(R,5),V(y,5)),i&2){let m;k(m=F())&&(r.paginator=m.first),k(m=F())&&(r.sort=m.first)}},inputs:{data:"data"},outputs:{deleteRequest:"deleteRequest",editRequest:"editRequest"},decls:38,vars:6,consts:[["input",""],["matInput","","placeholder","Buscar...",3,"keyup"],[1,"mat-elevation-z8"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","code"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","studentName"],["matColumnDef","documentType"],["matColumnDef","documentNumber"],["matColumnDef","courseName"],["matColumnDef","hours"],["matColumnDef","email"],["matColumnDef","created_at"],["matColumnDef","actions"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["class","mat-row",4,"matNoDataRow"],["aria-label","Seleccionar p\xE1gina de certificados","showFirstLastButtons","",3,"pageSizeOptions","pageSize"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],["mat-icon-button","",3,"click","matTooltip"],["mat-header-row",""],["mat-row",""],[1,"mat-row"],["colspan","9",1,"mat-cell"]],template:function(i,r){if(i&1){let m=T();n(0,"mat-form-field")(1,"mat-label"),o(2,"Filtrar"),a(),n(3,"input",1,0),g("keyup",function(xt){return _(m),h(r.applyFilter(xt))}),a()(),n(5,"div",2)(6,"table",3),p(7,4),s(8,wt,2,0,"th",5)(9,vt,2,1,"td",6),u(),p(10,7),s(11,Et,2,0,"th",5)(12,Mt,2,1,"td",6),u(),p(13,8),s(14,Dt,2,0,"th",5)(15,yt,2,1,"td",6),u(),p(16,9),s(17,Rt,2,0,"th",5)(18,It,2,1,"td",6),u(),p(19,10),s(20,Nt,2,0,"th",5)(21,Lt,2,1,"td",6),u(),p(22,11),s(23,Vt,2,0,"th",5)(24,kt,2,1,"td",6),u(),p(25,12),s(26,Ft,2,0,"th",5)(27,qt,2,1,"td",6),u(),p(28,13),s(29,Pt,2,0,"th",5)(30,At,2,1,"td",6),u(),p(31,14),s(32,Ot,2,0,"th",15)(33,Ht,7,2,"td",6),u(),s(34,$t,1,0,"tr",16)(35,zt,1,0,"tr",17)(36,Bt,3,1,"tr",18),a(),x(37,"mat-paginator",19),a()}i&2&&(l(6),d("dataSource",r.dataSource),l(28),d("matHeaderRowDef",r.displayedColumns),l(),d("matRowDefColumns",r.displayedColumns),l(2),d("pageSizeOptions",O(5,bt))("pageSize",10))},dependencies:[b,Y,W,K,tt,Z,R,y,it,nt,ot,ct,rt,at,st,lt,mt,dt,pt,ut,ft],styles:[".mat-elevation-z8[_ngcontent-%COMP%]{overflow-x:auto}table[_ngcontent-%COMP%]{width:100%;min-width:900px}.mat-column-actions[_ngcontent-%COMP%]{width:120px;text-align:center}.mat-cell[_ngcontent-%COMP%]{padding:8px}.mat-header-cell[_ngcontent-%COMP%]{font-weight:700;color:#000000de}"]})};function Qt(t,e){t&1&&x(0,"mat-spinner")}function jt(t,e){if(t&1){let i=T();n(0,"div",4),o(1),n(2,"button",6),g("click",function(){_(i);let m=f();return h(m.reloadCertificates())}),o(3,"Reintentar"),a()()}if(t&2){let i=f();l(),c(" ",i.error()," ")}}function Ut(t,e){if(t&1){let i=T();n(0,"app-table",7),g("deleteRequest",function(m){_(i);let C=f();return h(C.onDeleteCertificate(m))})("editRequest",function(m){_(i);let C=f();return h(C.onEditCertificate(m))}),a()}if(t&2){let i=f();d("data",i.certificates())}}var St=class t{_authSrv=v(z);_certificateSrv=v(Ct);_router=v(H);certificates=this._certificateSrv.certificates;loading=this._certificateSrv.loading;error=this._certificateSrv.error;ngOnInit(){this._certificateSrv.list()}reloadCertificates(){this._certificateSrv.list()}onEditCertificate(e){return w(this,null,function*(){this._router.navigate(["/administration/edit",e.id])})}onDeleteCertificate(e){return w(this,null,function*(){try{yield this._certificateSrv.delete(e.id),P.success("Certificado eliminado exitosamente")}catch(i){console.error("Error al eliminar:",i),P.error(i.message||"Error al eliminar el certificado")}})}logout(){return w(this,null,function*(){yield this._authSrv.logOut(),this._router.navigateByUrl("/")})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=S({type:t,selectors:[["app-certificate-list"]],decls:12,vars:3,consts:[[1,"example-button-row"],["mat-flat-button","",3,"click"],["mat-flat-button","","routerLink","/administration/new"],[1,"container"],[1,"error-message"],[3,"data"],["mat-button","",3,"click"],[3,"deleteRequest","editRequest","data"]],template:function(i,r){i&1&&(n(0,"section")(1,"div",0)(2,"button",1),g("click",function(){return r.logout()}),o(3,"Salir"),a(),n(4,"a",2),o(5,"Nuevo Certificado"),a()()(),n(6,"div",3)(7,"h2"),o(8,"Certificados"),a(),s(9,Qt,1,0,"mat-spinner")(10,jt,4,1,"div",4)(11,Ut,1,1,"app-table",5),a()),i&2&&(l(9),M(r.loading()?9:-1),l(),M(r.error()?10:-1),l(),M(!r.loading()&&!r.error()?11:-1))},dependencies:[b,X,D,et,N,$],encapsulation:2})};export{St as CertificateListComponent};
