
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

    var shd,name,sotien,phibaohiem;


    Auth.onAuthStateChanged(function(user) {
        if (user) {

            dbRef.ref(' Information was hidden for personal reason !').child(shd).once('value').then(function(data) {

                    if (data.val() == null) {

                        document.getElementById('loader').style.display = "none";

                        Swal.fire({
                            title: 'Opps...',
                            text: ' Information was hidden for personal reason !',
                            icon: 'info',
                            confirmButtonText: 'Đóng',
                            confirmButtonColor: '#5742f5'
                        });

                        return false;
                    }


                    var phone  = data.child("Information was hidden for personal reason !").val();
                        sotien = data.child("Information was hidden for personal reason !").val();



                    var rs = parseInt(sotien) * 0.8;
                    phibaohiem = Math.round(rs).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + '00 000';

                     var vnphone = '+84' + phone.substring(1, phone.length);

                    dbRef.ref('Information was hidden for personal reason !').child(vnphone).once('value').then(function(data) {

                        name = data.child("Information was hidden for personal reason !").val();
                        
                        baohiem("Information was hidden for personal reason !",shd,name,phibaohiem);

                        document.getElementById('loader').style.display = "none";

                    })


                });


        } else {
            Auth.signInAnonymously().catch(function(error) {});
        }
    });


    document.getElementById("download").onclick = function(e) {
        e.preventDefault();
        baohiem("download",shd,name,phibaohiem);
    };


    

    })


    function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}