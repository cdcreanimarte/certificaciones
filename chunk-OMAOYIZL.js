import{a as j,b as B,c as M,d as Ie}from"./chunk-35GLAMPB.js";import{b as Oe}from"./chunk-FSNMDOWA.js";import{P as Pe,h as ge,i as Ce,k as he,l as _e,m as ve,n as ye,o as we,r as be,s as xe,t as Ee,v as Me,w as Se,y as Fe}from"./chunk-TN7L4IB7.js";import"./chunk-2PPFUFFT.js";import{Aa as de,Ba as se,Ca as ue,Da as pe,Ea as fe,Ga as D,ia as ne,pa as re,ra as m,ua as oe,va as ae,xa as ce,ya as le,za as me}from"./chunk-J5ITEULD.js";import{$ as U,$a as l,$b as x,Ab as C,Da as Z,Gb as w,Ib as Q,Jb as H,Kb as k,Lb as n,Mb as o,Nb as F,Rb as W,Ub as f,Wb as $,Xc as te,Yc as ie,Zc as G,_b as b,ac as E,ec as O,fa as R,fc as a,gc as _,hc as P,ib as L,ic as X,jc as K,oa as u,pa as p,rc as I,sc as ee,tc as T,yb as y,zb as J}from"./chunk-UORU4LUB.js";import"./chunk-E4ERW3Q5.js";import"./chunk-OA5THNKF.js";import"./chunk-FK6H3RFT.js";import{j as z}from"./chunk-4ZZIO3ZI.js";var Y=class c{CERTIFICATE_PREFIX="CDC";HASH_LENGTH=4;RANDOM_LENGTH=4;generateCertificateCode(i,t,e){let r=new Date,d=r.getFullYear(),s=this.generateYearCode(d,t),g=this.hashString(i).slice(0,this.HASH_LENGTH),h=this.generateRandomString(this.RANDOM_LENGTH);return{code:`${this.CERTIFICATE_PREFIX}-${s}${g}${h}`,metadata:{generatedAt:r.getTime(),formattedDate:M(r,"dd/MM/yyyy"),validFrom:M(B(r),"yyyy-MM-dd"),validUntil:M(j(new Date(t,0)),"yyyy-MM-dd"),formattedValidFrom:M(B(r),"dd/MM/yyyy"),formattedValidUntil:M(j(new Date(t,0)),"dd/MM/yyyy"),studentId:i,courseId:e,yearCode:s,validity:{startYear:d,endYear:t,durationYears:t-d}}}}decodeCertificateCode(i,t){if(!this.validateCertificateCode(i))return null;try{let[e,r]=i.split("-"),d=parseInt("20"+r.slice(0,2)),s=parseInt(r.slice(2,4)),g=r.slice(4,4+this.HASH_LENGTH),h=r.slice(4+this.HASH_LENGTH),v=new Date(d,0,1),S=new Date(d+s,11,31),V=!1,A=!1;return t&&(A=this.hashString(t).slice(0,this.HASH_LENGTH)===g,V=A),{isValid:!0,isAuthentic:V,details:{prefix:e,issuedYear:d,validityYears:s,endYear:d+s,studentHash:g,randomIdentifier:h,dates:{issuedDate:M(v,"dd/MM/yyyy"),expirationDate:M(S,"dd/MM/yyyy")}},verification:{studentIdProvided:!!t,studentIdMatch:A,originalStudentId:A?t:void 0},reconstructedCode:i}}catch(e){return console.error("Error decoding certificate:",e),null}}generateYearCode(i,t){let e=t-i;return`${M(new Date(i,0),"yy")}${e.toString().padStart(2,"0")}`}generateRandomString(i){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";return Array.from({length:i},()=>t.charAt(Math.floor(Math.random()*t.length))).join("")}hashString(i){let t=0;for(let e=0;e<i.length;e++){let r=i.charCodeAt(e);t=(t<<5)-t+r,t=t&t}return Math.abs(t).toString(16).toUpperCase()}validateCertificateCode(i){return new RegExp(`^${this.CERTIFICATE_PREFIX}-\\d{4}[A-Z0-9]{${this.HASH_LENGTH+this.RANDOM_LENGTH}}$`).test(i)}static \u0275fac=function(t){return new(t||c)};static \u0275prov=U({token:c,factory:c.\u0275fac,providedIn:"root"})};var Ve=["certificateElement"],q=class c{certificateElement;formData;currentDate=new Date;yearSelected=new Date;certificateCode="";getCertificateElement(){return this.certificateElement.nativeElement}static \u0275fac=function(t){return new(t||c)};static \u0275cmp=L({type:c,selectors:[["app-certificate-preview"]],viewQuery:function(t,e){if(t&1&&b(Ve,5),t&2){let r;x(r=E())&&(e.certificateElement=r.first)}},inputs:{formData:"formData",currentDate:"currentDate",yearSelected:"yearSelected",certificateCode:"certificateCode"},decls:52,vars:24,consts:[["certificateElement",""],[1,"certificate-preview"],[1,"certificate-preview__content"],[1,"content-wrapper"],[1,"title-group"],[1,"title"],[1,"company-info"],[1,"student-group"],[1,"student-name"],[1,"id-info"],[1,"course-info"],[1,"course-name"],[1,"signatures"],[1,"representante"],["src","images/fir_rep_legal.jpg","alt","Firma"],[1,"director"],["src","images/fir_dir_general.jpg","alt","Firma"],[1,"verification-info"],["href","https://cdcreanimarte.github.io/certificaciones/"]],template:function(t,e){t&1&&(n(0,"div",1,0)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h1",5),a(6,"DE ASISTENCIA SEG\xDAN RESOLUCI\xD3N 3100 DE 2019"),o(),n(7,"div",6),a(8,"NIT 9012123811 CDCREANIMARTE"),o()(),n(9,"div",7)(10,"h2",8),a(11),o(),n(12,"div",9),a(13),I(14,"mask"),I(15,"uppercase"),o()(),n(16,"div",10)(17,"div"),a(18,"Asisti\xF3 y aprob\xF3 el curso"),o(),n(19,"div",11),a(20),o(),n(21,"div"),a(22),o()(),n(23,"div",12)(24,"div",13),F(25,"img",14),n(26,"div"),a(27,"Representante Legal"),o()(),n(28,"div",15),F(29,"img",16),n(30,"div"),a(31,"Director General"),o()()(),n(32,"div",17)(33,"p"),a(34,"Emitido: "),n(35,"span"),a(36),I(37,"date"),o()(),n(38,"p"),a(39,"Vigencia: "),n(40,"span"),a(41),I(42,"date"),I(43,"date"),o()(),n(44,"p"),a(45,"C\xF3digo: "),n(46,"span"),a(47),o()(),n(48,"p"),a(49,"Verificar: "),n(50,"a",18),a(51,"https://cdcreanimarte.github.io/certificaciones"),o()()()()()()),t&2&&(l(11),_(e.formData==null?null:e.formData.studentName),l(2),K(" IDENTIFICADO CON ",e.formData==null?null:e.formData.documentType,": ",T(14,10,e.formData==null?null:e.formData.documentNumber,"separator.2")," DE ",ee(15,13,e.formData==null?null:e.formData.expeditionPlace)," "),l(7),_(e.formData==null?null:e.formData.courseName),l(2),P("con una intensidad de ",e.formData==null?null:e.formData.hours," horas."),l(14),_(T(37,15,e.currentDate,"dd/MM/yyyy")),l(5),X("",T(42,18,e.currentDate,"yyyy")," - ",T(43,21,e.yearSelected,"yyyy")," "),l(6),_(e.certificateCode))},dependencies:[G,te,ie,Oe],styles:['[_nghost-%COMP%]{display:block;width:100%;overflow-x:auto;padding:1rem}.certificate-preview[_ngcontent-%COMP%]{width:297mm;height:210mm;margin:0 auto;background:#fff;position:relative;transform-origin:top left;transform:scale(.6);-webkit-print-color-adjust:exact;print-color-adjust:exact;border-radius:8px;box-shadow:0 2px 8px #0000001a;overflow:hidden;padding:1rem}@media (max-width: 1200px){.certificate-preview[_ngcontent-%COMP%]{margin-top:1rem;height:auto;transform:scale(.6)}}@media (max-width: 768px){.certificate-preview[_ngcontent-%COMP%]{transform:scale(.5)}}@media print{.certificate-preview[_ngcontent-%COMP%]{transform:scale(1)!important;width:100%;border:none}}.certificate-preview__content[_ngcontent-%COMP%]{width:279.4mm;height:215.9mm;position:relative;background-color:#fff;overflow:hidden;display:grid;grid-template-columns:192px 1fr;margin:0 0 0 35px}.certificate-preview__content[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:10px 0 35px;background:url("./media/template-certificado-F7EXEJCB.png") center/100% 100% no-repeat;z-index:1;background-size:cover}@media (max-width: 1200px){.certificate-preview__content[_ngcontent-%COMP%]{transform:none}}@media (max-width: 768px){.certificate-preview__content[_ngcontent-%COMP%]{transform:none}}.content-wrapper[_ngcontent-%COMP%]{position:relative;z-index:2;grid-column:2;width:100%;margin-top:110px;display:flex;flex-direction:column;align-items:center;text-align:center;padding:2.54cm 1.5cm;margin-left:-372px}.title-group[_ngcontent-%COMP%]{margin-bottom:1.5rem}.title-group[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:20px;font-weight:700;color:#2c3e50;text-transform:uppercase;margin-top:52px;margin-bottom:.5rem;letter-spacing:.5px}.title-group[_ngcontent-%COMP%]   .company-info[_ngcontent-%COMP%]{font-size:20px;font-weight:600;color:#2c3e50}.student-group[_ngcontent-%COMP%]{margin-bottom:1.5rem}.student-group[_ngcontent-%COMP%]   .student-name[_ngcontent-%COMP%]{font-size:30px;font-weight:700;color:#2c3e50;text-transform:uppercase;margin-bottom:.5rem;letter-spacing:.5px}.student-group[_ngcontent-%COMP%]   .id-info[_ngcontent-%COMP%]{font-size:18px;color:#2c3e50;line-height:1.4}.course-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.course-info[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{font-size:18px;color:#2c3e50;line-height:1.4}.course-info[_ngcontent-%COMP%]   .course-name[_ngcontent-%COMP%]{font-size:24px;font-weight:600;color:#2c3e50;margin:.5rem 0}.signatures[_ngcontent-%COMP%]{display:flex;justify-content:center;width:100%;z-index:2}.signatures[_ngcontent-%COMP%]   .representante[_ngcontent-%COMP%], .signatures[_ngcontent-%COMP%]   .director[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;margin:0 2rem}.signatures[_ngcontent-%COMP%]   .representante[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .signatures[_ngcontent-%COMP%]   .director[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100px;height:100px;object-fit:contain}.signatures[_ngcontent-%COMP%]   .representante[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], .signatures[_ngcontent-%COMP%]   .director[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{font-size:16px;color:#2c3e50;font-weight:600}.verification-info[_ngcontent-%COMP%]{width:100%;text-align:left;margin-top:auto;margin-left:16rem;padding-top:1.5rem}.verification-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:2px 0 .5px;font-size:15px;color:#2c3e50b3;line-height:1.2}.verification-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:600;color:#2c3e50}.verification-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-weight:600;color:#4a90e2;text-decoration:none;transition:color .3s ease}.verification-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}@media print{.certificate-preview[_ngcontent-%COMP%]{position:relative;width:100%;border:none}.certificate-preview__content[_ngcontent-%COMP%]{font-size:10pt;page-break-after:always}}']})};var N=["Administraci\xF3n de Medicamentos","Aspectos Legales","Ataque con Sustancias Qu\xEDmicas","Atenci\xF3n a Victimas de Violencia Sexual","Cuidado del Donante","Cuidados Paliativos","Humanizaci\xF3n en Salud","Inyectolog\xEDa Intramuscular","Manejo del Duelo","Primeros Auxilios","Protecci\xF3n Radiol\xF3gica","Soporte Vital Avanzado","Soporte Vital B\xE1sico","Sueroterapia","Toma de Citolog\xEDa Cervicouterina","Toma de Muestras de Laboratorio","Toma de Muestras POCT","V\xEDctimas del conflicto armado"];var Ae=["certificateElement"],Re=["nameInput"],Le=["docInput"],He=["placeInput"],ke=["emailInput"],Ge=["hoursInput"],Ye=(c,i)=>i.tipo;function qe(c,i){c&1&&(n(0,"mat-error"),a(1,"El nombre es requerido y debe tener al menos 3 caracteres"),o())}function ze(c,i){if(c&1&&(n(0,"mat-option",17),a(1),o()),c&2){let t=i.$implicit;C("value",t.tipo),l(),_(t.tipo)}}function Qe(c,i){c&1&&(n(0,"mat-error"),a(1,"Seleccione un tipo de documento"),o())}function $e(c,i){if(c&1&&(n(0,"mat-error"),a(1),o()),c&2){let t=$();l(),_(t.getDocumentErrorMessage())}}function je(c,i){c&1&&(n(0,"mat-error"),a(1,"El lugar de expedici\xF3n es requerido"),o())}function Be(c,i){c&1&&(n(0,"mat-error"),a(1,"Ingrese un correo electr\xF3nico v\xE1lido"),o())}function Ue(c,i){if(c&1&&(n(0,"mat-option",17),a(1),o()),c&2){let t=i.$implicit;C("value",t),l(),_(t)}}function Ze(c,i){if(c&1&&(n(0,"mat-option",17),a(1),o()),c&2){let t=i.$implicit;C("value",t),l(),_(t)}}function Je(c,i){c&1&&(n(0,"mat-error"),a(1,"Seleccione el a\xF1o de validez"),o())}function We(c,i){c&1&&(n(0,"mat-error"),a(1,"La cantidad de horas debe ser mayor a 0"),o())}function Xe(c,i){if(c&1&&F(0,"app-certificate-preview",28,5),c&2){let t=$();C("formData",t.certificateForm.value)("currentDate",t.currentDate)("yearSelected",t.yearSelected)("certificateCode",t.certificateCode)}}var De=class c{certificateElement;nameInput;docInput;placeInput;emailInput;hoursInput;certificateForm;filteredCourses=N;YEARS_TO_SHOW=5;certificateGenerated=!1;isGenerating=!1;currentDate=new Date;yearSelected=new Date;documentTypes=[];selectedDocumentType=null;validityYears=[];certificateCode="";certificateMetadata=null;certificate;_fb=R(ue);_certificateSrv=R(Ie);_certificateCodeSrv=R(Y);ngOnInit(){this.initForm(),this.generateValidityYears(),this.loadDocumentTypes()}initForm(){this.certificateForm=this._fb.group({studentName:["",[m.required,m.minLength(3)]],documentType:["",[m.required]],documentNumber:["",[m.required]],expeditionPlace:["",[m.required,m.minLength(3)]],courseName:["",[m.required,m.minLength(3)]],hours:["",[m.required,m.min(1)]],email:["",[m.required,m.email]],validityYear:["",[m.required]]}),this.certificateForm=this._fb.group({studentName:["NESTOR IV\xC1N MARTINEZ COBO",[m.required,m.minLength(3)]],documentType:["CC",[m.required]],documentNumber:["1061779667",[m.required]],expeditionPlace:["POPAY\xC1N",[m.required,m.minLength(3)]],courseName:["Humanizaci\xF3n de los Servicios de Salud",[m.required,m.minLength(3)]],hours:["40",[m.required,m.min(1)]],email:["sksmartinez@gmail.com",[m.required,m.email]],validityYear:["2026",[m.required]]}),this.setupFormValidations()}setupFormValidations(){this.certificateForm.get("documentType")?.valueChanges.subscribe(i=>{this.selectedDocumentType=this.documentTypes.find(t=>t.tipo===i)??null,this.updateDocumentValidations()}),this.certificateForm.get("validityYear")?.valueChanges.subscribe(i=>{i&&(this.yearSelected=new Date(parseInt(i),0,1))}),this.certificateForm.get("courseName")?.valueChanges.subscribe(i=>{typeof i=="string"&&!N.includes(i)&&this.filterCourses({target:{value:i}})})}updateDocumentValidations(){if(this.selectedDocumentType)try{let i=this.selectedDocumentType.reglasValidacion.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g,'"$2":').replace(/'/g,'"').replace(/\s/g,""),t=JSON.parse(i),e=[m.required];t.min&&e.push(m.minLength(t.min)),t.max&&e.push(m.maxLength(t.max)),t.pattern&&e.push(m.pattern(t.pattern)),this.certificateForm.get("documentNumber")?.setValidators(e),this.certificateForm.get("documentNumber")?.updateValueAndValidity()}catch(i){console.error("Error parsing validation rules:",i),this.certificateForm.get("documentNumber")?.setValidators([m.required,m.minLength(3),m.maxLength(20)])}}generateValidityYears(){let i=new Date().getFullYear();this.validityYears=Array.from({length:this.YEARS_TO_SHOW},(t,e)=>i+e+1)}onInputTransform(i,t){let r=i.target.value;switch(t){case"studentName":case"expeditionPlace":r=r.toUpperCase();break;case"email":r=r.toLowerCase();break}this.certificateForm.get(t)?.setValue(r,{emitEvent:!1})}loadDocumentTypes(){this._certificateSrv.getDocumentTypes().subscribe({next:i=>{this.documentTypes=i,console.log(this.documentTypes)},error:i=>{console.error("Error loading document types:",i)}})}filterCourses(i){let t=i.target.value,e=this.certificateForm.get("courseName")?.value;typeof e=="string"&&N.includes(e)&&t!==e&&this.certificateForm.patchValue({courseName:""});let r=t.toLowerCase();this.filteredCourses=N.filter(d=>d.toLowerCase().includes(r))}displayFn(i){return i||""}onCourseSelected(i){let t=document.querySelector('input[formControlName="courseName"]');t&&t.blur()}clearField(i,t){this.certificateForm.get(i)?.reset(),t instanceof Z?t.nativeElement.focus():t.focus()}getDocumentErrorMessage(){let i=this.certificateForm.get("documentNumber");if(!i?.errors)return"";try{let t=this.parseValidationRules(this.selectedDocumentType?.reglasValidacion||"");if(i.errors.required)return"El n\xFAmero de documento es requerido";if(i.errors.minlength)return`El documento debe tener m\xEDnimo ${t.min} caracteres`;if(i.errors.maxlength)return`El documento debe tener m\xE1ximo ${t.max} caracteres`;if(i.errors.pattern)return{"[0-9]+":"Solo se permiten n\xFAmeros","[A-Za-z0-9]+":"Solo se permiten letras y n\xFAmeros","[0-9]{8}":"Debe contener exactamente 8 n\xFAmeros","[0-9]{10}":"Debe contener exactamente 10 n\xFAmeros"}[t.pattern||""]||"Formato de documento inv\xE1lido"}catch{return"Formato de documento inv\xE1lido"}return""}getMaxLength(){if(!this.selectedDocumentType)return null;try{let i=this.selectedDocumentType.reglasValidacion.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g,'"$2":').replace(/'/g,'"').replace(/\s/g,"");return JSON.parse(i).max||null}catch{return null}}parseValidationRules(i){try{let t=i.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g,'"$2":').replace(/'/g,'"').replace(/\s/g,"");return JSON.parse(t)}catch(t){return console.error("Error parsing validation rules:",t),{min:3,max:20,pattern:"[0-9]+"}}}generateCertificate(){if(this.certificateForm.invalid)return;console.log("\u{1F7E2}: ",this.certificateForm.value);let i=this.certificateForm.value,t=this._certificateCodeSrv.generateCertificateCode(i.documentNumber,parseInt(i.validityYear),i.courseName);this.certificateCode=t.code,this.certificateMetadata=t.metadata,this.certificateGenerated=!0;let{studentName:e,documentType:r,documentNumber:d,expeditionPlace:s,courseName:g,hours:h,email:v,validityYear:S}=this.certificateForm.value;this.certificate={studentName:e||"",documentType:r||"",documentNumber:d||"",expeditionPlace:s||"",courseName:g||"",hours:h||"",email:v||"",validityYear:S||"",code:this.certificateCode||""}}downloadCertificate(){return z(this,null,function*(){if(!(!this.certificateGenerated||this.isGenerating))try{this.isGenerating=!0;let i=this.certificateElement.getCertificateElement(),t=yield this._certificateSrv.generatePDF(i),e=window.URL.createObjectURL(t),r=document.createElement("a");r.href=e,r.download=`Certificado_${this.certificateForm.get("studentName")?.value}.pdf`,r.click(),window.URL.revokeObjectURL(e)}catch(i){console.error("Error en el proceso del certificado:",i),D.error("Error al procesar el certificado")}finally{this.isGenerating=!1}})}onSubmit(){return z(this,null,function*(){if(!this.certificate){D.error("No hay datos del certificado para guardar");return}try{let i={studentName:this.certificate.studentName,documentType:this.certificate.documentType,documentNumber:this.certificate.documentNumber,expeditionPlace:this.certificate.expeditionPlace,courseName:this.certificate.courseName,hours:this.certificate.hours,email:this.certificate.email,validityYear:this.certificate.validityYear,code:this.certificate.code};yield this._certificateSrv.add(i),D.success("Certificado guardado exitosamente")}catch(i){console.error("Error al guardar el certificado:",i),D.error("El certificado no pudo ser guardado")}})}sendEmail(){}decode(){console.log("Decodificando:",this.certificateCode);let i=this.certificateForm.get("documentNumber")?.value;console.log("N\xFAmero de documento:",i);let t=this._certificateSrv.decodeCertificateCode(this.certificateCode,i);t?(console.log("Informaci\xF3n decodificada:",t),t.verification.studentIdMatch?console.log("\xA1El certificado pertenece al estudiante!"):console.log("El certificado NO corresponde al estudiante proporcionado")):console.log("No se pudo decodificar el certificado")}static \u0275fac=function(t){return new(t||c)};static \u0275cmp=L({type:c,selectors:[["app-certificate-form"]],viewQuery:function(t,e){if(t&1&&(b(Ae,5),b(Re,5),b(Le,5),b(He,5),b(ke,5),b(Ge,5)),t&2){let r;x(r=E())&&(e.certificateElement=r.first),x(r=E())&&(e.nameInput=r.first),x(r=E())&&(e.docInput=r.first),x(r=E())&&(e.placeInput=r.first),x(r=E())&&(e.emailInput=r.first),x(r=E())&&(e.hoursInput=r.first)}},decls:94,vars:18,consts:[["nameInput",""],["placeInput",""],["emailInput",""],["courseInput",""],["auto","matAutocomplete"],["certificateElement",""],[1,"certificate"],[1,"certificate__content"],[1,"certificate__form",3,"ngSubmit","formGroup"],[1,"form-section"],[1,"section-title"],[1,"form-row","full-width"],["appearance","outline",1,"certificate__field"],["matInput","","formControlName","studentName","placeholder","Ingrese el nombre completo",3,"input"],["mat-icon-button","","matSuffix","",3,"click"],[1,"form-row","two-columns"],["formControlName","documentType"],[3,"value"],["matInput","","formControlName","documentNumber","placeholder","Ingrese el n\xFAmero de documento"],["matInput","","formControlName","expeditionPlace","placeholder","Ciudad de expedici\xF3n",3,"input"],["matInput","","type","email","formControlName","email","placeholder","ejemplo@correo.com",3,"input"],["type","text","matInput","","formControlName","courseName",3,"input","matAutocomplete"],[3,"optionSelected","displayWith"],["formControlName","validityYear"],["matInput","","type","number","formControlName","hours","placeholder","0","min","1"],[1,"certificate__actions"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],["mat-raised-button","","color","accent","type","button",3,"click","disabled"],[3,"formData","currentDate","yearSelected","certificateCode"]],template:function(t,e){if(t&1){let r=W();n(0,"mat-card",6)(1,"mat-card-content",7)(2,"form",8),f("ngSubmit",function(){return u(r),p(e.generateCertificate())}),n(3,"div",9)(4,"h3",10),a(5,"Datos del Estudiante"),o(),n(6,"div",11)(7,"mat-form-field",12)(8,"mat-label"),a(9,"Nombre del Estudiante"),o(),n(10,"input",13,0),f("input",function(s){return u(r),p(e.onInputTransform(s,"studentName"))}),o(),n(12,"button",14),f("click",function(){u(r);let s=O(11);return p(e.clearField("studentName",s))}),n(13,"mat-icon"),a(14,"close"),o()(),y(15,qe,2,0,"mat-error"),o()(),n(16,"div",15)(17,"mat-form-field",12)(18,"mat-label"),a(19,"Tipo de Documento"),o(),n(20,"mat-select",16),H(21,ze,2,2,"mat-option",17,Ye),o(),y(23,Qe,2,0,"mat-error"),o(),n(24,"mat-form-field",12)(25,"mat-label"),a(26,"N\xFAmero de Documento"),o(),F(27,"input",18),n(28,"button",14),f("click",function(){return u(r),p(e.clearField("documentNumber",e.docInput))}),n(29,"mat-icon"),a(30,"close"),o()(),y(31,$e,2,1,"mat-error"),o()(),n(32,"div",15)(33,"mat-form-field",12)(34,"mat-label"),a(35,"Lugar de Expedici\xF3n"),o(),n(36,"input",19,1),f("input",function(s){return u(r),p(e.onInputTransform(s,"expeditionPlace"))}),o(),n(38,"button",14),f("click",function(){u(r);let s=O(37);return p(e.clearField("expeditionPlace",s))}),n(39,"mat-icon"),a(40,"close"),o()(),y(41,je,2,0,"mat-error"),o(),n(42,"mat-form-field",12)(43,"mat-label"),a(44,"Correo Electr\xF3nico"),o(),n(45,"input",20,2),f("input",function(s){return u(r),p(e.onInputTransform(s,"email"))}),o(),n(47,"button",14),f("click",function(){u(r);let s=O(46);return p(e.clearField("email",s))}),n(48,"mat-icon"),a(49,"close"),o()(),y(50,Be,2,0,"mat-error"),o()()(),n(51,"div",9)(52,"h3",10),a(53,"Datos del Curso"),o(),n(54,"div",11)(55,"mat-form-field",12)(56,"mat-label"),a(57,"Nombre del Curso"),o(),n(58,"input",21,3),f("input",function(s){return u(r),p(e.filterCourses(s))}),o(),n(60,"mat-autocomplete",22,4),f("optionSelected",function(s){return u(r),p(e.onCourseSelected(s))}),H(62,Ue,2,2,"mat-option",17,Q),o()()(),n(64,"div",15)(65,"mat-form-field",12)(66,"mat-label"),a(67,"V\xE1lido hasta el a\xF1o"),o(),n(68,"mat-select",23),H(69,Ze,2,2,"mat-option",17,Q),o(),y(71,Je,2,0,"mat-error"),o(),n(72,"mat-form-field",12)(73,"mat-label"),a(74,"Cantidad de Horas"),o(),F(75,"input",24),n(76,"button",14),f("click",function(){return u(r),p(e.clearField("hours",e.hoursInput))}),n(77,"mat-icon"),a(78,"close"),o()(),y(79,We,2,0,"mat-error"),o()()(),n(80,"div",25)(81,"button",26)(82,"mat-icon"),a(83,"assignment"),o(),a(84),o(),n(85,"button",27),f("click",function(){return u(r),p(e.downloadCertificate())}),n(86,"mat-icon"),a(87,"download"),o(),a(88),o(),n(89,"button",27),f("click",function(){return u(r),p(e.onSubmit())}),n(90,"mat-icon"),a(91,"save"),o(),a(92),o()()()()(),y(93,Xe,2,4,"app-certificate-preview",28)}if(t&2){let r,d,s,g,h,v,S,V=O(61);l(2),C("formGroup",e.certificateForm),l(13),w((r=e.certificateForm.get("studentName"))!=null&&r.touched&&((r=e.certificateForm.get("studentName"))!=null&&r.errors)?15:-1),l(6),k(e.documentTypes),l(2),w((d=e.certificateForm.get("documentType"))!=null&&d.touched&&((d=e.certificateForm.get("documentType"))!=null&&d.errors)?23:-1),l(4),J("maxlength",e.getMaxLength()),l(4),w((s=e.certificateForm.get("documentNumber"))!=null&&s.touched&&((s=e.certificateForm.get("documentNumber"))!=null&&s.errors)?31:-1),l(10),w((g=e.certificateForm.get("expeditionPlace"))!=null&&g.touched&&((g=e.certificateForm.get("expeditionPlace"))!=null&&g.errors)?41:-1),l(9),w((h=e.certificateForm.get("email"))!=null&&h.touched&&((h=e.certificateForm.get("email"))!=null&&h.errors)?50:-1),l(8),C("matAutocomplete",V),l(2),C("displayWith",e.displayFn),l(2),k(e.filteredCourses),l(7),k(e.validityYears),l(2),w((v=e.certificateForm.get("validityYear"))!=null&&v.touched&&((v=e.certificateForm.get("validityYear"))!=null&&v.errors)?71:-1),l(8),w((S=e.certificateForm.get("hours"))!=null&&S.touched&&((S=e.certificateForm.get("hours"))!=null&&S.errors)?79:-1),l(2),C("disabled",!e.certificateForm.valid||e.isGenerating),l(3),P(" ",e.isGenerating?"Generando...":"Previsualizar"," "),l(),C("disabled",!e.certificateGenerated||e.isGenerating),l(3),P(" ",e.isGenerating?"Procesando...":"Descargar"," "),l(),C("disabled",!e.certificateGenerated||e.isGenerating),l(3),P(" ",e.isGenerating?"Procesando...":"Guardar"," "),l(),w(e.certificateGenerated?93:-1)}},dependencies:[G,fe,ce,re,le,oe,ae,se,me,de,pe,Pe,ve,ne,ye,we,be,xe,Ee,_e,ge,Ce,he,Se,Me,Fe,q],styles:["[_nghost-%COMP%]{display:grid;grid-template-columns:minmax(200px,540px) 1fr;gap:1rem;padding:.5rem;height:100vh;overflow-y:auto;overflow-x:hidden;background:#f5f7fa;-ms-overflow-style:none;scrollbar-width:none}[_nghost-%COMP%]::-webkit-scrollbar{display:none}@media (max-width: 1200px){[_nghost-%COMP%]{grid-template-columns:1fr;height:auto}}.form-section[_ngcontent-%COMP%]{margin-bottom:1.5rem;width:100%}.form-section[_ngcontent-%COMP%]:last-of-type{margin-bottom:1rem}.section-title[_ngcontent-%COMP%]{color:#2c3e50;font-size:1rem;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:1px solid rgba(44,62,80,.1)}.form-row[_ngcontent-%COMP%]{margin-bottom:1rem;width:100%}.form-row.two-columns[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}@media (max-width: 768px){.form-row.two-columns[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:.75rem}}.form-row.full-width[_ngcontent-%COMP%]{width:100%}.certificate[_ngcontent-%COMP%]{-ms-overflow-style:none;scrollbar-width:none;overflow-y:auto;overflow-x:hidden;max-height:100vh}.certificate[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.certificate__actions[_ngcontent-%COMP%]{display:flex;gap:1rem;margin-top:1.5rem;padding-bottom:1.5rem;justify-content:center;flex-wrap:wrap;width:100%}@media (max-width: 768px){.certificate__actions[_ngcontent-%COMP%]{flex-direction:column;width:100%;gap:.75rem}}.certificate__actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:14px;height:44px;padding:0 24px;min-width:200px;margin:0 .5rem}@media (max-width: 768px){.certificate__actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;margin:0}}.certificate__actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:20px;height:20px;width:20px;margin-right:8px}.certificate__form[_ngcontent-%COMP%]{-ms-overflow-style:none;scrollbar-width:none;overflow-y:auto;overflow-x:hidden;padding:1rem}.certificate__form[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.certificate__content[_ngcontent-%COMP%]{padding:1rem;-ms-overflow-style:none;scrollbar-width:none;overflow-y:auto;overflow-x:hidden;height:calc(100vh - 2rem)}.certificate__content[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}  .mat-mdc-card{border-radius:8px;box-shadow:0 1px 3px #0000001a!important}  .mat-mdc-form-field{width:100%}  .mat-mdc-text-field-wrapper{padding-top:0;padding-bottom:0}  .mat-mdc-form-field-flex{min-height:45px!important}  .mat-mdc-form-field-infix{padding:12px 0!important;min-height:unset!important}  .mat-mdc-raised-button{border-radius:8px}  .mat-form-field-suffix .mat-icon-button{width:24px;height:24px;line-height:24px}  .mat-form-field-suffix .mat-icon-button .mat-icon{font-size:18px;line-height:18px;height:18px;width:18px;color:#4a556880;transition:color .3s ease}  .mat-form-field-suffix .mat-icon-button .mat-icon:hover{color:#4a5568}"]})};export{De as CertificateFormComponent};
