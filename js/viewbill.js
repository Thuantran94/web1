
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

  
    var name,ngayvay,sotien,sotientramoithang,phiquahan,sotienconno,laisuatconno,phidichvuconno,phigiahanconno,total,ngaytratieptheo;

    Auth.onAuthStateChanged(function(user) {
        if (user) {


    dbRef.ref('LOAN').child(shd).once('value').then(function(data) {

        if (data.val() == null) {
            Swal.fire('Lỗi !', 'Information was hidden for personal reason !', 'error')
            return false;
        }

         name = data.child("name").val();
         sotien = data.child("sotien").val();
         thoihan = data.child("thoihan").val();
         sotientramoithang = data.child("sotientramoithang").val();
         sotienconno = data.child("sotienconno").val();
         laisuatconno = data.child("laisuatconno").val();
         phidichvuconno = data.child("phidichvuconno").val();
         phigiahanconno = data.child("phigiahanconno").val();
         phiquahan = data.child("phiquahan").val();
         ngayvay = data.child("ngayvay").val();
         ngaytratieptheo = data.child("ngaytratieptheo").val();
         note = data.child("note").val();

         songayquahan = data.child("songayquahan").val();
         tongsothangdatra = data.child("tongsothangdatra").val();
        

        if (phiquahan == null || phiquahan == '') {
            phiquahan = '0';
        }
        if (sotienconno == null || sotienconno == '') {
            sotienconno = '0';
        }
        if (laisuatconno == null || laisuatconno == '') {
            laisuatconno = '0';
        }
        if (phidichvuconno == null || phidichvuconno == '') {
            phidichvuconno = '0';
        }
        if (phigiahanconno == null || phigiahanconno == '') {
            phigiahanconno = '0';
        }

        if (songayquahan == null || songayquahan == '') {
            songayquahan = '0';
        }

        if (tongsothangdatra == null || tongsothangdatra == '') {
            tongsothangdatra = '0';
        }
        if (note == null || note == '') {
            note = 'Không';
        }

        if (ngaytratieptheo == '' || ngaytratieptheo == null) {
            ngaytratieptheo = 'Information was hidden for personal reason !'
        }

        total = parseInt(sotientramoithang.replace(/\s/g, '')) + parseInt(phiquahan.replace(/\s/g, '')) + parseInt(sotienconno.replace(/\s/g, '')) + parseInt(laisuatconno.replace(/\s/g, '')) + parseInt(phidichvuconno.replace(/\s/g, '')) + parseInt(phigiahanconno.replace(/\s/g, ''));
        total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

      
        hoadon("view",shd,name,ngayvay,sotien,sotientramoithang,phiquahan,sotienconno,laisuatconno,phidichvuconno,phigiahanconno,total,ngaytratieptheo);
                

        });


        } else {
            Auth.signInAnonymously().catch(function(error) {});
        }
    });



    document.getElementById("download").onclick = function(e) {
        e.preventDefault();
        hoadon("download",shd,name,ngayvay,sotien,sotientramoithang,phiquahan,sotienconno,laisuatconno,phidichvuconno,phigiahanconno,total,ngaytratieptheo);
               
    };



    })

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}