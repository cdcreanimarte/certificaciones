import{h as Ce}from"./chunk-4BNOQN44.js";import{c as z,d as k}from"./chunk-UUBK57OJ.js";import"./chunk-X5YLR3NI.js";import"./chunk-RECFE55V.js";import"./chunk-FK6H3RFT.js";import{$ as R,A as ee,G as te,L as y,M as ie,N as ne,O as ae,P as oe,Q as re,R as le,S as me,T as ce,U as se,V as de,W as pe,X as fe,Y as P,_ as ue,aa as b,b as B,c as Q,d as j,e as U,f as J,g as G,h as K,l as W,o as D,p as X,r as Y,x as Z}from"./chunk-ESXP6LPB.js";import"./chunk-2PPFUFFT.js";import{b as H,c as $}from"./chunk-H5E3HTG2.js";import"./chunk-BBKHAT7U.js";import{Db as E,Ib as n,Jb as a,Kb as h,Lb as p,Mb as f,Ob as T,Rb as g,Tb as u,Xa as l,Xb as V,Ya as M,Yb as F,Zb as q,bc as O,ca as v,cc as o,eb as x,ec as c,ka as C,la as _,lc as A,ua as L,vb as s,xb as d}from"./chunk-CCAJ3PNG.js";import{i as w}from"./chunk-ODN5LVDJ.js";var I=class e{constructor(t){this.data=t}static \u0275fac=function(i){return new(i||e)(M(B))};static \u0275cmp=x({type:e,selectors:[["app-modal-confirmation"]],decls:9,vars:2,consts:[["mat-dialog-title",""],["align","end"],["mat-button","","mat-dialog-close",""],["mat-button","","color","warn",3,"mat-dialog-close"]],template:function(i,r){i&1&&(n(0,"h2",0),o(1,"Confirmar eliminaci\xF3n"),a(),n(2,"mat-dialog-content"),o(3),a(),n(4,"mat-dialog-actions",1)(5,"button",2),o(6,"Cancelar"),a(),n(7,"button",3),o(8,"Eliminar"),a()()),i&2&&(l(3),c(" \xBFEst\xE1s seguro de que deseas eliminar el certificado de ",r.data,"? "),l(4),d("mat-dialog-close",!0))},dependencies:[b,D,j,U,G,J],encapsulation:2})};var be=()=>[5,10,25,100];function we(e,t){e&1&&(n(0,"th",20),o(1," C\xF3digo "),a())}function ve(e,t){if(e&1&&(n(0,"td",21),o(1),a()),e&2){let i=t.$implicit;l(),c(" ",i.code," ")}}function Me(e,t){e&1&&(n(0,"th",20),o(1," Estudiante "),a())}function Ee(e,t){if(e&1&&(n(0,"td",21),o(1),a()),e&2){let i=t.$implicit;l(),c(" ",i.studentName," ")}}function De(e,t){e&1&&(n(0,"th",20),o(1," Tipo Doc. "),a())}function ye(e,t){if(e&1&&(n(0,"td",21),o(1),a()),e&2){let i=t.$implicit;l(),c(" ",i.documentType," ")}}function Re(e,t){e&1&&(n(0,"th",20),o(1," N\xFAmero Doc. "),a())}function Ie(e,t){if(e&1&&(n(0,"td",21),o(1),a()),e&2){let i=t.$implicit;l(),c(" ",i.documentNumber," ")}}function Ne(e,t){e&1&&(n(0,"th",20),o(1," Curso "),a())}function Le(e,t){if(e&1&&(n(0,"td",21),o(1),a()),e&2){let i=t.$implicit;l(),c(" ",i.courseName," ")}}function Ve(e,t){e&1&&(n(0,"th",20),o(1," Horas "),a())}function Fe(e,t){if(e&1&&(n(0,"td",21),o(1),a()),e&2){let i=t.$implicit;l(),c(" ",i.hours," ")}}function qe(e,t){e&1&&(n(0,"th",20),o(1," Email "),a())}function Pe(e,t){if(e&1&&(n(0,"td",21),o(1),a()),e&2){let i=t.$implicit;l(),c(" ",i.email," ")}}function ke(e,t){e&1&&(n(0,"th",20),o(1," Fecha "),a())}function Oe(e,t){if(e&1&&(n(0,"td",21),o(1),a()),e&2){let i=t.$implicit;l(),c(" ",i.created_at," ")}}function Ae(e,t){e&1&&h(0,"th",22)}function He(e,t){if(e&1){let i=T();n(0,"td",21)(1,"button",23),g("click",function(){let m=C(i).$implicit,S=u();return _(S.onDelete(m))}),n(2,"mat-icon"),o(3,"delete"),a()()()}e&2&&(l(),d("matTooltip","Eliminar certificado"))}function $e(e,t){e&1&&h(0,"tr",24)}function ze(e,t){e&1&&h(0,"tr",25)}function Be(e,t){if(e&1&&(n(0,"tr",26)(1,"td",27),o(2),a()()),e&2){u();let i=O(4);l(2),c('No hay datos que coincidan con el filtro "',i.value,'"')}}var N=class e{constructor(t){this.dialog=t;this.dataSource=new P([])}set data(t){this.dataSource=new P(t),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort,this.setupFilterPredicate(),this.dataSource.filterPredicate=(i,r)=>(i.code+i.studentName+i.documentNumber+i.courseName+i.email).toLowerCase().indexOf(r.toLowerCase())!==-1}deleteRequest=new L;editRequest=new L;displayedColumns=["code","studentName","documentType","documentNumber","courseName","hours","email","created_at","actions"];dataSource;paginator;sort;setupFilterPredicate(){this.dataSource.filterPredicate=(t,i)=>(t.code+t.studentName+t.documentNumber+t.courseName+t.email).toLowerCase().indexOf(i.toLowerCase())!==-1}ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}applyFilter(t){let i=t.target.value;this.dataSource.filter=i.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage()}onEdit(t){console.log("Edit:",t)}onDelete(t){this.dialog.open(I,{width:"350px",data:t.studentName}).afterClosed().subscribe(r=>{r&&this.deleteRequest.emit(t)})}onView(t){console.log("View:",t)}onDownload(t){console.log("Download:",t)}static \u0275fac=function(i){return new(i||e)(M(Q))};static \u0275cmp=x({type:e,selectors:[["app-table"]],viewQuery:function(i,r){if(i&1&&(V(R,5),V(y,5)),i&2){let m;F(m=q())&&(r.paginator=m.first),F(m=q())&&(r.sort=m.first)}},inputs:{data:"data"},outputs:{deleteRequest:"deleteRequest",editRequest:"editRequest"},decls:38,vars:6,consts:[["input",""],["matInput","","placeholder","Buscar...",3,"keyup"],[1,"mat-elevation-z8"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","code"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","studentName"],["matColumnDef","documentType"],["matColumnDef","documentNumber"],["matColumnDef","courseName"],["matColumnDef","hours"],["matColumnDef","email"],["matColumnDef","created_at"],["matColumnDef","actions"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["class","mat-row",4,"matNoDataRow"],["aria-label","Seleccionar p\xE1gina de certificados","showFirstLastButtons","",3,"pageSizeOptions","pageSize"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],["mat-icon-button","",3,"click","matTooltip"],["mat-header-row",""],["mat-row",""],[1,"mat-row"],["colspan","9",1,"mat-cell"]],template:function(i,r){if(i&1){let m=T();n(0,"mat-form-field")(1,"mat-label"),o(2,"Filtrar"),a(),n(3,"input",1,0),g("keyup",function(xe){return C(m),_(r.applyFilter(xe))}),a()(),n(5,"div",2)(6,"table",3),p(7,4),s(8,we,2,0,"th",5)(9,ve,2,1,"td",6),f(),p(10,7),s(11,Me,2,0,"th",5)(12,Ee,2,1,"td",6),f(),p(13,8),s(14,De,2,0,"th",5)(15,ye,2,1,"td",6),f(),p(16,9),s(17,Re,2,0,"th",5)(18,Ie,2,1,"td",6),f(),p(19,10),s(20,Ne,2,0,"th",5)(21,Le,2,1,"td",6),f(),p(22,11),s(23,Ve,2,0,"th",5)(24,Fe,2,1,"td",6),f(),p(25,12),s(26,qe,2,0,"th",5)(27,Pe,2,1,"td",6),f(),p(28,13),s(29,ke,2,0,"th",5)(30,Oe,2,1,"td",6),f(),p(31,14),s(32,Ae,1,0,"th",15)(33,He,4,1,"td",6),f(),s(34,$e,1,0,"tr",16)(35,ze,1,0,"tr",17)(36,Be,3,1,"tr",18),a(),h(37,"mat-paginator",19),a()}i&2&&(l(6),d("dataSource",r.dataSource),l(28),d("matHeaderRowDef",r.displayedColumns),l(),d("matRowDefColumns",r.displayedColumns),l(2),d("pageSizeOptions",A(5,be))("pageSize",10))},dependencies:[b,Y,W,K,ee,Z,R,y,ie,ne,oe,ce,re,ae,se,le,me,de,pe,fe,ue],styles:[".mat-elevation-z8[_ngcontent-%COMP%]{overflow-x:auto}table[_ngcontent-%COMP%]{width:100%;min-width:900px}.mat-column-actions[_ngcontent-%COMP%]{width:120px;text-align:center}.mat-cell[_ngcontent-%COMP%]{padding:8px}.mat-header-cell[_ngcontent-%COMP%]{font-weight:700;color:#000000de}"]})};function Qe(e,t){e&1&&h(0,"mat-spinner")}function je(e,t){if(e&1){let i=T();n(0,"div",5),o(1),n(2,"button",7),g("click",function(){C(i);let m=u();return _(m.reloadCertificates())}),o(3,"Reintentar"),a()()}if(e&2){let i=u();l(),c(" ",i.error()," ")}}function Ue(e,t){if(e&1){let i=T();n(0,"app-table",8),g("deleteRequest",function(m){C(i);let S=u();return _(S.onDeleteCertificate(m))})("editRequest",function(m){C(i);let S=u();return _(S.onEditCertificate(m))}),a()}if(e&2){let i=u();d("data",i.certificates())}}var Se=class e{_authSrv=v(z);_certificateSrv=v(Ce);_router=v(H);certificates=this._certificateSrv.certificates;loading=this._certificateSrv.loading;error=this._certificateSrv.error;ngOnInit(){this._certificateSrv.list()}reloadCertificates(){this._certificateSrv.list()}onEditCertificate(t){return w(this,null,function*(){this._router.navigate(["/administration/edit",t.id])})}onDeleteCertificate(t){return w(this,null,function*(){try{yield this._certificateSrv.delete(t.id),k.success("Certificado eliminado exitosamente")}catch(i){console.error("Error al eliminar:",i),k.error(i.message||"Error al eliminar el certificado")}})}logout(){return w(this,null,function*(){yield this._authSrv.logOut(),this._router.navigateByUrl("/")})}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=x({type:e,selectors:[["app-certificate-list"]],decls:13,vars:3,consts:[[1,"page-container"],[1,"example-button-row"],["mat-flat-button","",3,"click"],["mat-flat-button","","routerLink","/administration/new"],[1,"container"],[1,"error-message"],[3,"data"],["mat-button","",3,"click"],[3,"deleteRequest","editRequest","data"]],template:function(i,r){i&1&&(n(0,"div",0)(1,"section")(2,"div",1)(3,"button",2),g("click",function(){return r.logout()}),o(4,"Salir"),a(),n(5,"a",3),o(6,"Nuevo Certificado"),a()()(),n(7,"div",4)(8,"h2"),o(9,"Certificados"),a(),s(10,Qe,1,0,"mat-spinner")(11,je,4,1,"div",5)(12,Ue,1,1,"app-table",6),a()()),i&2&&(l(10),E(r.loading()?10:-1),l(),E(r.error()?11:-1),l(),E(!r.loading()&&!r.error()?12:-1))},dependencies:[b,X,D,te,N,$],encapsulation:2})};export{Se as CertificateListComponent};
