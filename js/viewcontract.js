
    $(document).ready(function() {


        var Auth = firebase.auth();
        var dbRef = firebase.database();
        var auth = Auth;

        var shd = getUrlVars()["shd"];


    if (auth === null) {
        Auth.signInAnonymously().catch(function(error) {
            console.log(' sign In Anonymous fail: errorMessage = ' + error.code);
        });
    }

    var place,datehd,name,phone,socmnd,year,province,village,address,userphone,email,job,bankName,bankAdd,bankUser,bankNum,sotien,rsthoihan,sotientramoithang,mucdich,trangthaikhoanvay,salary,tencty,sdtcty,diachicty,nt1name,nt1phone,nt1relation,nt2name,nt2phone, nt2relation;


    Auth.onAuthStateChanged(function(user) {
        if (user) {

            dbRef.ref('LOAN').child(shd).once('value').then(function(data) {

                    if (data.val() == null) {

                        document.getElementById('loader').style.display = "none";

                        Swal.fire({
                            title: 'Opps...',
                            text: 'Information was hidden for personal reason !',
                            icon: 'info',
                            confirmButtonText: 'Đóng',
                            confirmButtonColor: '#5742f5'
                        });

                        return false;
                    }

                    trangthaikhoanvay = data.child("Information was hidden for personal reason !").val();

                    phone = data.child("phone").val();
                    sotien = data.child("sotien").val();
                    thoihan = data.child("thoihan").val();
                    sotientramoithang = data.child("Information was hidden for personal reason !").val();
                    mucdich = data.child("Information was hidden for personal reason !").val();


                    ngaytao = data.child("ngaytao").val();
                    ngayvay = data.child("ngayvay").val();

                    if (ngayvay != null && ngayvay != '') {
                        datehd = ngayvay;
                    }else{
                        datehd = ngaytao;
                    }

                     if (parseInt(thoihan) <= 12) {
                        rsthoihan = thoihan + ' tháng';
                    } else {
                        rsthoihan = thoihan + ' ngày';
                    }

                    var vnphone = '+84' + phone.substring(1, phone.length);



                    dbRef.ref('USER').child(vnphone).once('value').then(function(data) {

                        name = data.child("name").val();
                        socmnd = data.child("id").val();
                        userphone = data.child("phone").val();
                        email = data.child("email").val();
                        address = data.child("address").val();
                        year = data.child("birthday").val();
                        salary = data.child("salary").val();
                        province = data.child("province").val();
                        village = data.child("village").val();
                        job = data.child("job").val();


                        tencty = data.child("companyName").val();
                        sdtcty = data.child("companyPhone").val();
                        diachicty = data.child("companyAddress").val();


                        nt1name = data.child("relationName1").val();
                        nt1phone = data.child("relationPhone1").val();
                        nt1relation = data.child("relationRela1").val();

                        nt2name = data.child("relationName2").val();
                        nt2phone = data.child("relationPhone2").val();
                        nt2relation = data.child("relationRela2").val();


                        bankName = data.child("bankName").val();
                        bankAdd = data.child("bankAddress").val();
                        bankUser = data.child("bankUser").val();
                        bankNum = data.child("bankNumber").val();

                        if(bankName == null){bankName =''};
                        if(bankAdd == null){bankAdd =''};
                        if(bankUser == null){bankUser =''};
                        if(bankNum == null){bankNum =''};

                        place = village + ', ' + province;

                        hopdong("view",shd,place,datehd,name,socmnd,year,address,userphone,email,job,bankName,bankAdd,bankUser,bankNum,sotien,rsthoihan,sotientramoithang,mucdich,trangthaikhoanvay,salary,tencty,sdtcty,diachicty,nt1name,nt1phone,nt1relation,nt2name,nt2phone, nt2relation);



                        document.getElementById('loader').style.display = "none";

                    })


                });


        } else {
            Auth.signInAnonymously().catch(function(error) {});
        }
    });



    document.getElementById("download").onclick = function(e) {
        e.preventDefault();
        hopdong("download",shd,place,datehd,name,socmnd,year,address,userphone,email,job,bankName,bankAdd,bankUser,bankNum,sotien,rsthoihan,sotientramoithang,mucdich,trangthaikhoanvay,salary,tencty,sdtcty,diachicty,nt1name,nt1phone,nt1relation,nt2name,nt2phone, nt2relation);
    };



    })

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}