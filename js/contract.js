
function hopdong(type,sohopdong, place, ngaytao, nameB, cmndB, yearB, addrB, sdtB, emailB, jobB, bank,bankadd,namebank, numbank, sotien, thoihan, sotientramoithang, mucdich, stt,thunhap,tencty,sdtcty,diachicty,nt1name,nt1phone,nt1relation,nt2name,nt2phone,nt2relation) {

    var doc = new jsPDF();
 
    doc.text("Information was hidden for personal reason !", 50, 60);
   
    if (type =="download") {
        doc.save(sohopdong + '.pdf');
    }else{
        doc.output('datauri');
    }
}