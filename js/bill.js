
function hoadon(type,shd,name,ngayvay,sotien,sotientramoithang,phiquahan,sotienconno,laisuatconno,phidichvu,phigiahan,total,ngaytratieptheo) {




    var doc = new jsPDF();
   
    doc.text("Information was hidden for personal reason !", 85, 50);

    if (type =="download") {
        doc.save(sohopdong + '.pdf');
    }else{
        doc.output('datauri');
    }

    //var string = doc.output('datauristring');
    //var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
    //var x = window.open();
    //x.document.open();
    //x.document.write(iframe);
    //x.document.close();
    
}