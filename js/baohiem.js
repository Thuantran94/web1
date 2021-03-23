
function baohiem(type,shd,name,xxxxxxx) {



    var doc = new jsPDF();
   
    doc.text("Information was hidden for personal reason !", 80, 50);


    if (type =="download") {
        doc.save(shd + '.pdf');
    }else{
        doc.output('datauri');
    }
    
}