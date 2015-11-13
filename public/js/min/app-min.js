var app=angular.module("app",["ngRoute","oitozero.ngSweetAlert"]),modelos=["A","A Izquierda","B","B Izquierda","B2","C","D","D Izquierda","D Penthouse","E","E Penthouse","F","F Penthouse","G"],deptos_url="json/deptos.json",login_url="json/demo.json",post_url="json/deptos.json",navArray=["Inicio de Secion","Intro","Base","Acabados","Adicionales","Arquitectos","Resumen","Enviar"];app.config(function(t){t.startSymbol("<%"),t.endSymbol("%>")}),app.config(function(t){t.when("/",{templateUrl:"templates/login-template.html",controller:"logInCtrl",controllerAs:"log"}).when("/1",{templateUrl:"templates/info-template.html"}).when("/2",{templateUrl:"templates/base-template.html",controller:"baseCtrl",controllerAs:"base"}).when("/3",{templateUrl:"templates/acabados-template.html",controller:"acabadosCtrl",controllerAs:"sectionCtrl"}).when("/4",{templateUrl:"templates/adicionales-template.html",controller:"addCtrl",controllerAs:"sectionCtrl"}).when("/5",{templateUrl:"templates/arq-template.html",controller:"arqCtrl",controllerAs:"billForm"}).when("/6",{templateUrl:"templates/resumen-template.html",controller:"billCtrl",controllerAs:"billForm"}).when("/7",{templateUrl:"templates/send-template.html",controller:"sendCtrl"}).otherwise({redirectTo:function(t,e,a){return location.reload(),"/"}})}),app.run(function(t){0==t.count&&(location.href="#/",t.count=0)}),app.service("navService",function(){this.title="VIDALTA",this.navArray=navArray,this.count=0,this.subCount={},this.subCount.count=0,this.subCount.max=0,this.subCount.active=!1,this.isLogIn=function(t){return 0==this.count&&0==t?!0:0!=this.count&&0!=t?!0:!1},this.prevActive=function(){var t=this.count>1?!0:!1;return t},this.nextActive=function(){var t=this.count>0&&this.count<this.navArray.length-1?!0:!1;return t},this.isActive=function(t){var e=t==this.count?!0:!1;return e},this.next=function(){this.count<=this.navArray.length-1&&(this.subCount.active&&this.subCount.count<this.subCount.max-1?this.subCount.count+=1:(this.count+=1,location.href="#/"+this.count,this.subCount.count=0,this.subCount.max=0,this.subCount.active=!1))},this.prev=function(){this.count>1&&(this.subCount.active&&this.subCount.count>0?this.subCount.count-=1:(this.count-=1,location.href="#/"+this.count,this.subCount.count=0,this.subCount.max=0,this.subCount.active=!1))}}),app.service("billService",function(t){this.userEmail="",this.deptoModel="",this.deptoNumber=0,this.billArray=[],this.billAcabados=[],this.billAditional=[],this.taxesArray=[],this.taxesActive=!1,this.arqSelect=[],this.baseArray=[],this.acabadosArray=[],this.adicionalesArray=[],this.baseArray.active=!1,this.acabadosArray.active=!1,this.adicionalesArray.active=!1,this.subTotalBill=0,this.subTotalAditional=0,this.totalBill=0,this.iva=0,this.afterTax=0,this.add=function(t,e){t.push(e)},this.delate=function(t,e){var a=t.indexOf(e);null!=a&&t.splice(a,1)},this.calcBill=function(){this.calcSubTotal(),this.getComitions(this.subTotalBill),this.calcTotal()},this.calcSubTotal=function(){this.subTotalBill=0;for(var t=this.billArray.length-1;t>=0;t--)this.subTotalBill+=this.billArray[t].precio;for(var t=this.billAcabados.length-1;t>=0;t--)this.subTotalBill+=this.billAcabados[t].precio;for(var t=this.billAditional.length-1;t>=0;t--)this.subTotalAditional+=this.billAditional[t].precio},this.getComitions=function(){this.subTotalBill+=this.subTotalAditional;for(var t=this.taxesArray.length-1;t>=0;t--){var e=this.taxesArray[t].monto/100;this.taxesArray[t].taxAplay=this.subTotalBill*e}},this.calcTotal=function(){this.totalBill=0;for(var t=this.taxesArray.length-1;t>=0;t--)this.totalBill+=this.taxesArray[t].taxAplay;this.totalBill+=this.subTotalBill,this.iva=.16*this.totalBill,this.afterTax=this.iva+this.totalBill}}),app.factory("secciontFactory",["$http","$httpParamSerializerJQLike",function(t){function e(t){t(a)}var a={};return{getJSON:e,get:function(e){return t.get(e)},save:function(e,a){return t({method:"GET",url:a,params:e})},destroy:function(e,a){return t["delete"](e+a)},setData:function(t){return a=t,!0}}}]),app.controller("generalCtrl",function(t,e,a){e.navArray=navArray,t.navArray=e.navArray,t.isLogIn=function(t){return e.isLogIn(t)},t.isActive=function(t){return e.isActive(t)},t.next=function(){e.next()},t.prev=function(){e.prev()},t.nextActive=function(){return e.nextActive()},t.prevActive=function(){return e.prevActive()},t.getSize=function(){var a=100;return 0!=e.count&&(a=100/(t.navArray.length-1)),a},t.$on("$routeChangeSuccess",function(t,a){0==e.count&&(location.href="#/")})}),app.controller("billCtrl",function(t,e,a){t.bill=a,t.billArray=a.billArray,t.billAcabados=a.billAcabados,t.billAditional=a.billAditional,t.arqSelect=a.arqSelect,t.hitch,t.meses,e.getJSON(function(t){if(0==a.taxesActive){var e=t.tax;a.taxesArray=e;for(var o=a.taxesArray.length-1;o>=0;o--)a.taxesArray[o].taxAplay=0;a.taxesActive=!0,a.calcBill()}})}),app.controller("logInCtrl",function(t,e,a,o){t.deptos_url=deptos_url,t.login_url=login_url,t.models=[],a.get(deptos_url).success(function(e){for(var a=e,o=0;o<a.length;o++){var i=a[o].depto;t.models.push(i)}console.log(t.models)}),t.submit=function(t){if(t){e.userEmail=this.userEmail,e.deptoModel=this.userModel,e.deptoNumber=this.userDepto;var i={};i.modelo=this.userModel,i.acceso=this.userPassword,console.log(i),a.save(i,login_url).success(function(t){if("INVALIDO"!=t){var i={};i.predeterminado=t.predeterminado,i.escoger=t.escoger,i.opcional=t.opcional,i.arquitecto=t.arquitecto,i.tax=t.tax,a.setData(t),e.next()}else o.swal("Error","Contraseña no valida","error")}).error(function(t){o.swal("Error de conexion","Revise su conexión a internet","error")})}else o.swal("Error","Capo invalido","error")}}),app.controller("baseCtrl",function(t,e,a,o){t.baseData=a.baseArray,e.getJSON(function(e){var o=e.predeterminado;if(0==a.baseArray.active){a.baseArray.seccion="Paquete Base",a.baseArray.elementos=[],t.rawData=o;for(var i in t.rawData){var r=t.rawData[i];r.disabled=!0,r.checked=!0,r.basePrice=0,r.section="Paquete Base",a.add(a.billArray,r),a.baseArray.elementos.push(r)}a.calcBill(),a.baseArray.active=!0}})}),app.controller("acabadosCtrl",function(t,e,a,o){t.sectionsData=a.acabadosArray,e.getJSON(function(e){if(0==a.acabadosArray.active){var i=e.escoger;t.rawData=i;for(var r in t.rawData){var n=t.rawData[r];for(var l in n.escogeroptions){var s=n.escogeroptions[l];s.checked=0==l?!0:!1,s.basePrice=0==l?0:s.precio-n.escogeroptions[0].precio,s.disabled=s.precio>=0?!1:!0,s.section=n.seccion,s.checked&&a.add(a.billAcabados,s)}n.selectedItem=0,a.acabadosArray.push(n),a.acabadosArray.active=!0}a.calcBill()}o.subCount.count=0,o.subCount.max=t.sectionsData.length,o.subCount.active=!0}),t.updateBill=function(t,e){var o=t.escogeroptions[t.selectedItem],i=t.escogeroptions.indexOf(e);o!=e?(o.checked=!1,a.delate(a.billAcabados,o),a.add(a.billAcabados,e),t.selectedItem=i,a.calcBill()):e.checked=!0},t.sectionActive=function(t){var e=o.subCount.count==t?!0:!1;return e},t.getTabSize=function(){var t=100/a.acabadosArray.length;return t}}),app.controller("addCtrl",function(t,e,a,o){t.sectionsData=a.adicionalesArray,e.getJSON(function(e){if(0==a.adicionalesArray.active){var i=e.opcional;t.rawData=i;for(var r in t.rawData){var n=t.rawData[r];for(var l in n.opcionaloptions){var s=n.opcionaloptions[l];s.checked=!1,s.disabled=!1,s.basePrice=s.precio,s.section=n.seccion}n.selectedItem=-1,a.adicionalesArray.push(n)}a.calcBill(),a.adicionalesArray.active=!0}o.subCount.count=0,o.subCount.max=t.sectionsData.length,o.subCount.active=!0}),t.updateBill=function(t,e){var o=t.opcionaloptions.indexOf(e);if(o==t.selectedItem){var i=t.opcionaloptions[t.selectedItem];i.checked=!1,a.delate(billAditional,i),t.selectedItem=-1}else{if(e.checked&&-1!=t.selectedItem){var i=t.opcionaloptions[t.selectedItem];i.checked=!1,a.delate(billAditional,i)}e.checked&&(a.add(a.billAditional,e),t.selectedItem=o)}a.calcBill()},t.sectionActive=function(t){var e=o.subCount.count==t?!0:!1;return e},t.getTabSize=function(){var t=100/a.adicionalesArray.length;return t}}),app.controller("arqCtrl",function(t,e,a){t.sectionsData=[],e.getJSON(function(e){var a=e.arquitecto;t.rawData=a;for(var o in t.rawData){var i=t.rawData[o];i.checked=!1,i.disabled=!1,t.sectionsData.push(i)}}),t.arqUpdate=function(t){t.checked?a.add(a.arqSelect,t):a.delate(a.arqSelect,t)}}),app.controller("sendCtrl",function(t,e,a,o,i){t.sendMail=function(){var t={};t.modelo=o.deptoModel,t.numero=o.deptoNumber,t.correo=o.userEmail,i.save(t,post_url).success(function(t){e.swal({title:"Enviado a: "+a.userEmail,text:"La cotizacion se envio con exito. ¿Desae cerrar terminar?",type:"success",showCancelButton:!0,confirmButtonColor:"#FF9500",confirmButtonText:"Terminar",cancelButtonColor:"#f3f3f3",cancelButtonText:"Continuar",closeOnConfirm:!1},function(){e.swal("Booyah!")})}).error(function(t){e.swal("Error de conexion","Revise su conexión a internet","error")})}}),app.filter("priceFilter",function(){return function(t){return t>0?"+ $"+t:0==t?"Incluido":0>t?"Consulte al Probedor":void 0}});