$(document).ready(function() {

    var Auth = firebase.auth();
    var dbRef = firebase.database();
    var auth = Auth;

    var IPv4 = '';

    jQuery(document).ready(function() {
        'use strict';
    });

    $.get("Information was hidden for personal reason !", function(response) {
        IPv4 = response.ip;
        console.log('IPv4 = ' + IPv4)
    }, "jsonp");



    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };


    var mlogin = getCookie("login");
    var phone = getCookie("phone");
    var vnphone;


    console.log(' login = ' + mlogin);
    console.log(' phone = ' + phone);


    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth();
    var yyyy = date.getFullYear();
    //document.getElementById("udaithang").innerHTML = mm + 1;


    var new_date = new Date(date.getTime() + (30 * 24 * 60 * 60 * 1000));
    var new_dd = parseInt(dd + 1) < 10 ? '0' + parseInt(dd + 1) : parseInt(dd + 1);
    var new_mm = parseInt(new_date.getMonth() + 1) < 10 ? '0' + parseInt(new_date.getMonth() + 1) : parseInt(new_date.getMonth() + 1);
    var new_yyyy = new_date.getFullYear();
    document.getElementById("Information was hidden for personal reason !").innerHTML = new_dd + '/' + new_mm + '/' + new_yyyy;


    var new_yyyy2 = new_yyyy + 1;

    document.getElementById("lichtra").onclick = function(e) {
        e.preventDefault();

        var sotientramoithang = $('#Information was hidden for personal reason !').val();
        var thoihan = $('#rTime').val();

        var item = '';

        for (var i = 0; i < thoihan; i++) {
            var new_mm2 = parseInt(new_mm) + i;
            if (new_mm2 > 12) {
                new_mm2 = new_mm2 - 12;
                new_yyyy = new_yyyy2;
            }
            new_mm2 = new_mm2 < 10 ? '0' + new_mm2 : new_mm2;
            var ngaytra = new_dd + '/' + new_mm2 + '/' + new_yyyy;
            var sum = parseFloat(Number(sotientramoithang.replaceAll(' ', ''))) * thoihan;
            sum = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            item = item + '<div class="ui-g-6 calc-left"><span style="float: left;font-size: 13px" id="">' + ngaytra + '</span></div>' +
                '<div class="ui-g-6"><span id="" style="font-weight: 600;float: left;font-size: 13px">' + sotientramoithang + '??</span></div>';
        }
        item = item + '<div class="ui-g-6 calc-left"><span style="font-weight: 600;float: left;font-size: 13px" id="">T???ng c???ng</span></div>' +
            '<div class="ui-g-6"><span id="" style="font-weight: 600;float: left;font-size: 13px">' + sum + '??</span></div>';
        Swal.fire({
            title: 'Information was hidden for personal reason !',
            html: item,
            icon: '',
            confirmButtonText: '????ng',
            confirmButtonColor: '#1b8654',
        })
    }


    var t = date.getTime();
    var count = (t + '').substring(2, 8);

    for (var i = 0; i <= count.length - 1; i++) {

        $('#counthk').append('<div id="shiva"><span class="count">' + count[i] + '</span></div>');

    }




    if (mlogin == "true") {
        $('body').removeClass('auth-false').removeClass('unauthenticated').addClass('auth-true').addClass('authenticated');
    } else {
        $('body').removeClass('auth-true').removeClass('authenticated').addClass('auth-false').addClass('unauthenticated');
    }



        dbRef.ref('NOTI').on("value", function(snapshot) {

            snapshot.forEach(function(data) {

                if (data.val() != null) {
                    var title = data.child('title').val();
                    var sms = data.child('context').val();

                    if (title != null && title != '') {


                        var noti = document.getElementById("notification-button");
                        noti.style.display = "block";
                        noti.onclick = function(e) {
                        e.preventDefault();
                        viewNoti(title,sms);
                        
                    };
                        /*
                        const snackbar = new simpleSnackbar('<a href="#" onclick="event.preventDefault();viewNoti(\'' + title + '\',\'' + sms + '\')" style="font-size: 14px;text-align: justify;color:black; font-weight: 400;">' + title + '</a>', {
                            autohide: true,
                            icons: {
                                success: '<svg focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>',
                            },
                            type: 'success',
                        }).show();

                        */
                    }
                }
            })
        });



document.getElementById("loader").style.display = "none";

/*
    dbRef.ref('USER').on("value", function(snapshot) {
        snapshot.forEach(function(data) {

            dbRef.ref('USER').child(data.key).update({

                linkAVATAR: 'https://firebasestorage.googleapis.com/v0/b/vtgonl.appspot.com/o/images%2Favatar.png?alt=media&token=ef50f59f-9d15-48c1-9fea-3108e2d3bed0'
            });
        });
    });

*/

    var sotien;
    var thoihan;
    var tientramoithang;





    if (auth === null) {
        Auth.signInAnonymously().catch(function(error) {
            console.log(' sign In Anonymous fail: errorMessage = ' + error.code);
        });
    }


    Auth.onAuthStateChanged(function(user) {
        if (user) {

            // User is signed in.
            vnphone = user.phoneNumber;
            setCookie("phone", vnphone, 30);

            if (user.isAnonymous) {
                setCookie("isAnonymous", "true", 30);
                setCookie("login", "false", 30);
                console.log('user is Anonymous! ');
                $('body').removeClass('auth-true').removeClass('authenticated').addClass('auth-false').addClass('unauthenticated');
            } else {
                setCookie("isAnonymous", "false", 30);
                dbRef.ref('USER').child(vnphone).once('value').then(function(data) {
                    var userActive = data.child("ACTIVE").val();

                    if (userActive == null || userActive == '') {
                        $('body').removeClass('auth-true').removeClass('authenticated').addClass('auth-false').addClass('unauthenticated');

                        setCookie("login", "false", 30);
                    } else {
                        $('body').removeClass('auth-false').removeClass('unauthenticated').addClass('auth-true').addClass('authenticated');
                        setCookie("login", "true", 30);
                    }
                });
            }

        } else {
            Auth.signInAnonymously().catch(function(error) {});
        }
    });




    //Login
    document.getElementById("doLogin").onclick = function(e) {
        e.preventDefault();

        var phone = $('#userPhoneLogin').val();

        phone = phone.replace('+84', '0');
        if (!phone.match(/^([0]{1}[35789]{1}[0-9]{8})$/)) {

            Swal.fire({
                title: 'L???i !',
                text: 'S??? ??i???n tho???i kh??ng ????ng ?????nh d???ng',
                icon: 'error',
                confirmButtonText: '????ng'
            })
            return false;
        }

        $("body").css("cursor", "progress");
        document.getElementById("loader").style.display = "block";


        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('doLogin', {
            'size': 'invisible',
            'callback': function(response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber. 
                onSignInSubmit();
            }
        });

        var vnphone = '+84' + phone.substring(1, phone.length);

        firebase.auth().signInWithPhoneNumber(vnphone, window.recaptchaVerifier)
            .then((confirmationResult) => {

                $("body").css("cursor", "default");
                document.getElementById("loader").style.display = "none";


                var code = window.prompt('Vui l??ng nh???p m?? x??c nh???n ???? ???????c g???i ?????n s??? ??i???n tho???i ' + phone + '.');

                return confirmationResult.confirm(code);
            }).then((result) => {
                $('#loginModal').modal('hide');

                getDataUser(vnphone);

            }).catch((error) => {

                $("body").css("cursor", "default");
                document.getElementById("loader").style.display = "none";
                setCookie("login", "false", 30);

                if (error.code === 'auth/invalid-verification-code') {
                    Swal.fire('L???i !', "M?? x??c nh???n kh??ng ch??nh x??c", 'error').then((result) => {
                        if (result.value) {
                            window.location.reload()
                        }
                    })
                } else if (error.code === 'auth/too-many-requests') {
                    Swal.fire('L???i !', "T??i kho???n b??? t???m kho?? v?? ???? ????ng nh???p qu?? nhi???u l???n. Vui l??ng quay l???i sau", 'error').then((result) => {
                        if (result.value) {
                            window.location.reload()
                        }
                    })
                } else {
                    Swal.fire({
                        title: 'Tr??nh duy???t kh??ng h??? tr??? !',
                        html: 'Vui l??ng s??? d???ng tr??nh duy???t kh??c </br>(Chrome, IE, Firefox, Safari, Google, Opera,...)</br>Error: <span style="color:red"> ' + error.code + '.</span>',
                        icon: 'error',
                        footer: '<a href="#" onclick="event.preventDefault();environment_error()" style="color:#5742f5" ><center>Xem h?????ng d???n</center></a>'
                    }).then((result) => {
                        if (result.value) {
                            window.location.reload()
                        }
                    })
                }

            });


        return false;

    };




    document.getElementById("userPhoneID").onclick = function() {
        getDataUser(vnphone);
    };

    document.getElementById("payment").onclick = function(e) {
        e.preventDefault();
        showPayment();
    }

    document.getElementById("payment1").onclick = function(e) {
        e.preventDefault();
        showPayment();
    }

    document.getElementById("payment2").onclick = function(e) {
        e.preventDefault();
        showPayment();
    }

    document.getElementById("store").onclick = function(e) {
        e.preventDefault();
            Swal.fire({
                title: 'Coming soon...',
                text: '???ng d???ng ??ang ???????c ph??t h??nh !',
                icon: 'info',
                confirmButtonText: '????ng'
            })

    }



    document.body.addEventListener("click", function(e) {  //bind event to the document
       var targ = e.target;  //get what was clicked on
       var id = targ.id;  //grab the id
       if (["test1","test2"].indexOf(id)!==-1){ //see if it is one of the ids
           alert(targ.textContent);    //show the text
       }
    }, false);




    document.getElementById("contact").onclick = function(e) {
        e.preventDefault();
        var temp = '<div class="ui-g" align = "left" style = "font-size:14px"> <div class="ui-g-4 calc-left">Website</div><div class="ui-g-8 calc-right"> <a href="index.html" > vtgonline.tk</a> ho???c <a href="index.html" > vtgonl.tk</a> </div><div class="ui-g-4 calc-left">Email</div><div class="ui-g-8 calc-right"> <a href="index.html"><a href="mailto:hotrovtgonline@gmail.com">hotrovtgonline@gmail.com</a></div><div class="row ui-g-12"><div class="col-sm-5"><br><p>Fanpage</p><iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fvtgonl&tabs=messages,timeline&width=220&height=350&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=745706189184468" width="220" height="350" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe></div></div></div> </div>';
        Swal.fire({
            title: 'Th??ng tin li??n h???',
            html: temp,
            icon: '',
            confirmButtonText: '????ng'
        });
    }

    setInputFilter(document.getElementById("userPhoneLogin"), function(value) {
        return /^-?\d*$/.test(value);
    });




});




function showinfor(sotien, thoihan, sotientramoithang, tbsotientratt) {


    var tbsotientratt;
    var tbuser;

    var gv = sotien.split(" ", 1);
    var st = parseInt(gv);

    if (parseInt(thoihan) <= 12) {
        rsthoihan = thoihan + ' th??ng';
        tbsotientratt = 'Information was hidden for personal reason !';
        tbuser = 'Information was hidden for personal reason !';
    } else {
        rsthoihan = thoihan + ' ng??y';
        tbsotientratt = 'S??? ti???n tr???';

        if (st == 1) {
            tbuser = '<span style="color:#48fa58">Information was hidden for personal reason ! ' + rsthoihan + '.</span>';
        } else {
            tbuser = '<span style="color:#48fa58">Information was hidden for personal reason ! ' + rsthoihan + '.</span>';
        }


    }

    document.getElementById("rMoney").value = gv;
    document.getElementById("rTime").value = thoihan;
    document.getElementById("sotientramoithang").value = sotientramoithang;

    document.getElementById("sotien").innerHTML = sotien + '??';
    document.getElementById("thoihan").innerHTML = rsthoihan;
    document.getElementById("sotientramoithang").innerHTML = sotientramoithang + '??';
    document.getElementById("tbsotientra").innerHTML = tbsotientratt;
    document.getElementById("tbuser").innerHTML = tbuser;


    return false;
}



function kiemtrahopdong(sohopdong) {


    var dbRef = firebase.database();

    dbRef.ref('LOAN').child(sohopdong).once('value').then(function(data) {

        if (data.val() == null) {
            Swal.fire('L???i !', 'H???p ?????ng giao d???ch kh??ng t???n t???i', 'error')
            return false;
        }

        var name = data.child("name").val();
        var sotien = data.child("sotien").val();
        var thoihan = data.child("thoihan").val();
        var sotientramoithang = data.child("sotientramoithang").val();
        var sotienconno = data.child("sotienconno").val();
        var laisuatconno = data.child("laisuatconno").val();
        var phidichvuconno = data.child("phidichvuconno").val();
        var phigiahanconno = data.child("phigiahanconno").val();
        var phiquahan = data.child("phiquahan").val();
        var ngayvay = data.child("ngayvay").val();
        var ngaytratieptheo = data.child("ngaytratieptheo").val();
        var note = data.child("note").val();

        var songayquahan = data.child("songayquahan").val();
        var tongsothangdatra = data.child("tongsothangdatra").val();
        

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
            note = 'Kh??ng';
        }

        if (ngaytratieptheo == '' || ngaytratieptheo == null) {
            ngaytratieptheo = '??ang ch??? ph?? duy???t h??? s??...'
        }

        var total = parseInt(sotientramoithang.replace(/\s/g, '')) + parseInt(phiquahan.replace(/\s/g, '')) + parseInt(sotienconno.replace(/\s/g, '')) + parseInt(laisuatconno.replace(/\s/g, '')) + parseInt(phidichvuconno.replace(/\s/g, '')) + parseInt(phigiahanconno.replace(/\s/g, ''));
        total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        
        var bill = '<a href="#" onclick="event.preventDefault();hoadon(\'' + sohopdong + '\',\'' + name + '\',\'' + ngayvay + '\',\'' + sotien + '\',\'' + sotientramoithang + '\',\'' + phiquahan + '\',\'' + sotienconno + '\',\'' + laisuatconno + '\',\'' + phidichvuconno + '\',\'' + phigiahanconno + '\',\'' + total + '\',\'' + ngaytratieptheo + '\')"><span style="color: red;font-weight:bold"> ' + total + '?? <span style="font-weight:normal">(Xem chi ti???t)</span></span></a>'


        var temp = '<div class="ui-g" align = "left" style = "font-size:14px"><div class="ui-g-5 calc-left">H??? v?? t??n</div> <div class="ui-g-7 calc-right"><strong> ' + name + ' </strong> </div> <div class="ui-g-5 calc-left">S??? ti???n thanh to??n</div> <div class="ui-g-7 calc-right">' + bill + '</div> <div class="ui-g-5 calc-left">Thanh to??n tr?????c ng??y</div> <div class="ui-g-7 calc-right"><strong> ' + ngaytratieptheo + ' </strong></div>  <div class="ui-g-5 calc-left">S??? th??ng ???? tr???</div> <div class="ui-g-7 calc-right">  <strong> ' + tongsothangdatra + '/' + thoihan + ' </strong> </div> <div class="ui-g-5 calc-left">S??? ng??y qu?? h???n</div> <div class="ui-g-7 calc-right"> <strong style="color: red;">' + songayquahan + '</strong> </div> <div class="ui-g-5 calc-left">L???i nh???n</div> <div class="ui-g-7 calc-right"> <strong> ' + note + '</strong> </div> <div class="ui-g"> <div class="ui-g-12"><br><br> <p>Chuy???n ti???n v??o t??i kho???n Ng??n h??ng sau:</p></div> <div class="ui-g-4 calc-left">S??? T??i kho???n</div> <div class="ui-g-8 calc-right"><span style="font-weight: 600">19035740331018</span></div> <div class="ui-g-4 calc-left">T??n T??i kho???n</div> <div class="ui-g-8 calc-right"><span style="font-weight: 600">TRAN HOANG SON</span></div> <div class="ui-g-4 calc-left">T??n Ng??n h??ng</div> <div class="ui-g-8 calc-right"><span style="font-weight: 400">Techcombank</span></div> <div class="ui-g-4 calc-left">Chi nh??nh</div> <div class="ui-g-8 calc-right"><span style="font-weight: 400">Tp. H??? Ch?? Minh</span></div> <div class="ui-g-4 calc-left">N???i dung</div><div class="ui-g-8 calc-right"><span style="font-weight: 400">Thanh to??n cho KH: "T??n kh??ch h??ng" SH??: ???M?? h???p ?????ng c???a b???n.???</span></div> </div></div> ';
        Swal.fire({
            title: 'HD&nbsp;<a href="#" onclick="event.preventDefault();viewContract(\'' + sohopdong + '\')"><span style="color: orange;font-weight:bold"> ' + sohopdong + '</span></a>',
            html: temp,
            icon: '',
            confirmButtonText: 'Close'
        });

    });

}


function viewContract(shd) {


    window.open('http://vtgonl.firebaseapp.com/contract.html?shd=' + shd, '_blank');
}



function viewNoti(title, sms) {

    Swal.fire({
        title: title,
        html: sms,
        icon: '',
        confirmButtonText: '????ng',
        width: '850px',
    });
}

function showPayment(){

    var temp = '<div class="ui-g" align = "left" style = "font-size:14px"> <center class="ui-g-12"> <input type="tel" style = "width:100%" id="n1" placeholder="Nh???p S??? h???p ?????ng" maxlength="6" /> </center> </div> </div></div>';
        Swal.fire({
            title: 'Thanh to??n',
            html: temp,
            icon: '',
            confirmButtonText: 'Ti???p t???c &rarr;',
            confirmButtonColor: '#1b8654',
        }).then((result) => {
            if (result.value) {
                var shd = $('#n1').val();
                if (shd.length != 6) {
                    Swal.fire('L???i !', 'Information was hidden for personal reason !', 'error')
                    return false;
                } else {
                    kiemtrahopdong(shd);
                }
            }
        })

}

function getDataUser(vnphone) {
    var dbRef = firebase.database();
    var keyPhone = dbRef.ref('USER').child(vnphone).once('value');

    return keyPhone.then(result => {


        var userActive = result.child('ACTIVE').val();
        var username = result.child('name').val();
        var userphone = result.child('phone').val();
        var useremail = result.child('email').val();



        setCookie("login", "true", 30);
        setCookie("phone", vnphone, 30);

        if (userActive == 'admin') {

            Swal.fire({
                title: 'Login as admin',
                html: 'B???n c?? mu???n truy c???p trang qu???n l?? kh??ng?',
                icon: 'question',
                showDenyButton: true,
                denyButtonText: 'Tho??t',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.open('http://vtgonl.firebaseapp.com/admin.html', '_blank');
                } else if (result.isDenied) {
                    firebase.auth().signOut();
                    window.location.reload();
                }
            })
        } else {
            var userloan = '';
            var phone = vnphone.replace('+84', '0');

            dbRef.ref('LOAN').orderByChild('phone').equalTo(phone).on("value", function(snapshot) {
                snapshot.forEach(function(data) {

                    var sohopdong = data.child("SHD").val();
                    var trangthaikhoanvay = data.child("STATUS").val();

                    var color;
                    switch (trangthaikhoanvay) {
                        case 'pending':
                            color = "orange";
                            break;
                        case 'actived':
                            color = "green";
                            break;
                        case 'refused':
                            color = "red";
                            break;
                        case 'finished':
                            color = "grey";
                            break;
                    }

                    userloan = userloan + '<a href="#" onclick="event.preventDefault();viewContract(\'' + sohopdong + '\')"><span style="color: ' + color + ';font-weight:bold; font-size: 16px"> ' + sohopdong + '&nbsp;</span></a>';

                });

                var temp = '<form action="#"> <div class="page slide-page"> <div class="field"><div align=left><div class="label">H??? v?? T??n</div><input value="' + username + '" type="text"></div> <div class="field"><div align=left><div class="label">S??? ??i???n tho???i</div><input  value="' + userphone + '" maxlength="10" type="text"></div><div class="field"><div align=left><div class="label">Email</div><input  value="' + useremail + '"  type="text"></div><div class="field"><div align=left><div class="label">Danh s??ch h???p ?????ng</div><p> ' + userloan + '</p> <p> <span style="color:orange;">&#9632;</span> ??ang ph?? duy???t</p> <p> <span style="color:green;">&#9632;</span> ??ang hi???u l???c</p> <p> <span style="color:grey;">&#9632;</span> ???? k???t th??c</p> <p> <span style="color:red;">&#9632;</span> B??? t??? ch???i</p></div> </div> </div></form>';

                Swal.fire({
                    title: 'Th??ng tin T??i kho???n',
                    html: temp,
                    icon: '',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Xem v??? tr??',
                    confirmButtonColor: '#1b8654',
                    denyButtonText: 'Tho??t',
                    cancelButtonText: '????ng',
                }).then((result) => {
                    if (result.isConfirmed) {
                        getLocation();
                    } else if (result.isDenied) {
                        firebase.auth().signOut();
                        setCookie("login", "false", 30);
                        window.location.reload();

                    } else {}
                })
            });
        }
    });
}


function getLocation() {

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
        Swal.fire({
            title: 'Tr??nh duy???t kh??ng h??? tr???!',
            html: 'Vui l??ng s??? d???ng tr??nh duy???t kh??c </br>(Chrome, IE, Firefox, Safari, Google, Opera,...)</br>Error: <span style="color:red"> ' + error.code + '.</span>',
            icon: 'error',
            footer: '<a href="#" onclick="event.preventDefault();environment_error()" style="color:#5742f5" ><center>Xem h?????ng d???n</center></a>'
        }).then((result) => {
            if (result.value) {
                window.location.reload()
            }
        })
    }
}

function success(position) {

    console.log('get position success!')

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var hour = today.getHours();
    var minutes = today.getMinutes();

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var deviceinfo = navigator.appVersion;

    var temp = ' <div class="ui-g" align="left" style ="font-size:14px"> <div class="ui-g-4">Th???i gian</div> <div class="ui-g-8">Ng??y ' + dd + '/' + mm + '/' + yyyy + ' l??c ' + hour + ':' + minutes + '</div> <div class="ui-g-4">?????a ch??? IP</div> <div class="ui-g-8">' + IPv4 + '</div> <div class="ui-g-4">T???a ?????</div> <div class="ui-g-8">' + latitude.toString().substring(0, 10) + ', ' + longitude.toString().substring(0, 10) + '</div> <div class="ui-g-4 calc-left">T??n thi???t b???</div> <div class="ui-g-8 calc-right">' + deviceinfo.split("AppleWebKit")[0] + '</div> <div class="google-maps"> <iframe src="https://www.google.com/maps?q=' + latitude + ',' + longitude + '&hl=es&z=18&amp&output=embed" target="_self" width="400" height="300" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0">Your browser does not support iframes.</iframe> </div> <p>Vui l??ng ch???p l???i ???nh m??n h??nh hi???n t???i v?? g???i v??? ?????a ch??? email:<a href="mailto:hotrovtgonline@gmail.com"> <span style=" font-weight: 600">hotrovtgonline@gmail.com</span></a>.</p> </div>';
    Swal.fire({
        title: 'T???a ????? v?? thi???t b???',
        html: temp,
        icon: '',
        confirmButtonText: '????ng'
    });

}


function error(error) {

    $('#loader').hide();

    switch (error.code) {
        case error.PERMISSION_DENIED:
            Swal.fire({
                icon: 'error',
                title: 'L???i !',
                confirmButtonColor: '#5742f5',
                confirmButtonText: '????ng',
                text: 'B???n ???? ch???n quy???n truy c???p v??? tr?? tr??n tr??nh duy???t n??y',
                footer: '<a href ="setup.html" target="_blank" style="color:#5742f5" ><center>Xem h?????ng d???n</center></a>'
            });
            break;
        case error.POSITION_UNAVAILABLE:
            Swal.fire({
                title: 'Tr??nh duy???t kh??ng h??? tr??? !',
                html: 'Vui l??ng s??? d???ng tr??nh duy???t kh??c </br>(Chrome, IE, Firefox, Safari, Google, Opera,...)</br>Error: <span style="color:red"> ' + error.code + '.</span>',
                icon: 'error',
                footer: '<a href="#" onclick="event.preventDefault();environment_error()" style="color:#5742f5" ><center>Xem h?????ng d???n</center></a>'
            });
            break;
        case error.TIMEOUT:
            Swal.fire({
                icon: 'error',
                title: 'L???i !',
                confirmButtonColor: '#5742f5',
                confirmButtonText: '????ng',
                text: 'Y??u c???u truy c???p v??? tr?? c???a b???n ???? h???t h???n',
                footer: '<a href ="setup.html" target="_blank" style="color:#5742f5" ><center>Xem h?????ng d???n</center></a>'
            });
            break;
        case error.UNKNOWN_ERROR:
            Swal.fire({
                icon: 'error',
                title: 'L???i ?????nh v???!',
                confirmButtonColor: '#5742f5',
                confirmButtonText: '????ng',
                html: '<p style="text-align:justify">VTG Online kh??ng th??? x??c ?????nh v??? tr?? c???a b???n! ????? ti???p t???c vui l??ng b???t ?????nh v??? trong ph???n c??i ?????t c???a thi???t b??? v?? cho ph??p tr??nh duy???t truy c???p v??? tr?? c???a b???n</p>',
                footer: '<a href ="setup.html" target="_blank" style="color:#5742f5" ><center>Xem h?????ng d???n</center></a>'
            });
            break;
    }
}


function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}