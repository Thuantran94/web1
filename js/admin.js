$(document).ready(function() {


    var Auth = firebase.auth();
    var dbRef = firebase.database();


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var myarray = [];

    jQuery(document).ready(function() {
        'use strict';
    });

    var shd = getUrlVars()["shd"];
    //if (shd !== undefined && shd != "null") {
    //    viewContract(shd);
    //}

 

    var userPhone = getCookie("phone");
    var mlogin = getCookie("login");
    if (mlogin == "false" || mlogin == '' || mlogin == null) {
        window.location.href = "index.html";
        return false;
    }



    if(userPhone !=null){
        dbRef.ref('USER').child(userPhone).child('ACTIVE').once('value').then(function(data) {

        if (data.val() != 'admin') {
            window.location.href = "index.html";
            return false;
        }
    });
    }

    var listCONTACT, listSMS, listCALL;


 


    // hien cac hop dong can duyet
    dbRef.ref('LOAN').orderByChild('STATUS').equalTo('pending').on("value", function(snapshot) {

        var count = 0;
        document.getElementById('tresults').innerHTML = '';
        document.getElementById('mtable').style.display = "block";
        document.getElementById('loader1').style.display = "none";
        document.getElementById('loader2').style.display = "none";
        document.getElementById('mtable2').style.display = "none";
        snapshot.forEach(function(data) {
            count++;
            var SHD = data.child("SHD").val();
            var stt = data.child("STATUS").val();
            var name = data.child("name").val();
            var phone = data.child("phone").val();
            var email = data.child("email").val();
            var sotien = data.child("sotien").val();
            var thoihan = data.child("thoihan").val();
            var sotientramoithang = data.child("sotientramoithang").val();
            var ngayvay = data.child("ngayvay").val();
            var ngaytratieptheo = data.child("ngaytratieptheo").val();
            var ngayketthuc = data.child("ngayketthuc").val();
            var tongsothangdatra = data.child("tongsothangdatra").val();
            var songayquahan = data.child("songayquahan").val();
            var phiquahan = data.child("phiquahan").val();
            var sotienconno = data.child("sotienconno").val();
            var laisuatconno = data.child("laisuatconno").val();
            var phidichvuconno = data.child("phidichvuconno").val();
            var phigiahanconno = data.child("phigiahanconno").val();
            var phigiahanconno = data.child("phigiahanconno").val();
            var mucdich = data.child("mucdich").val();
            var kehoachtra = data.child("kehoachtra").val();
           
            var ngaytao = data.child("ngaytao").val();
            var note = data.child("note").val();


            var lat = data.child("lat").val();
            var lng = data.child("lng").val();
            var map = 'https://maps.google.com/?q=' + lat + ',' + lng;

            var fbID = data.child("facebook").val();
            var facebook = '';
            if (fbID != null && fbID != '') {
                facebook = '<a href= " https://facebook.com/' + fbID + '" target="_blank" style="margin-left:5px"> <span  style="color: #6bfa32"><img src="./images/facebook1.svg" alt="" width="16" height="16" /></span> </a>';
            }

            var zalo = '<a href="https://zalo.me/' + phone + '" target="_blank" style="margin-left:5px"> <span  style="color: #6bfa32"><img src="./images/zalo1.svg" alt="" width="16" height="16" /></span> </a>';



            var statushd;
            switch (stt) {
                case 'pending':
                    statushd = '<button onclick="validateHS(\'' + SHD + '\',\'' + thoihan + '\',\'' + email + '\',\'' + ngayvay + '\',\'' + ngayketthuc + '\',\'' + ngaytratieptheo + '\')" class="mbutton-green-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-check-circle"></i></button>' +
                        '<button onclick="restrictHS(\'' + SHD + '\')" class="mbutton-orange-mini" style="padding: 4px 16px 4px 16px"><i class="fa fa-minus-circle"></i> </button>'
                    break;
                case 'actived':
                    statushd = '<button onclick="finishHS(\'' + SHD + '\')" class="mbutton-green-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-check-circle"></i> </button>';
                    break;
                case 'refused':
                    statushd = '<button onclick="refusedHS(\'' + SHD + '\')" class="mbutton-red-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-times-circle"></i> </button>';
                    break;
                case 'finished':
                    statushd = '';
                    break;
            }


            $('#tresults').append('<tr>' +
                '<td><span style="color: white;font-weight:bold"> ' + count + '</span></td>' +
                '<td><a href="#kq" onclick="event.preventDefault();kiemtrahopdong(\'' + SHD + '\')"><span style="color: orange;font-weight:bold"> ' + SHD + '</span></a></td>' +
                '<th>  <a href="#kq" onclick="event.preventDefault();kiemtrakhachhang(\'' + phone + '\')"><span style="color: white;"> ' + name + '</span></a>  </th>' +
                '<td><a style=" margin-left:5px" href="tel:' + phone + '"> <i class="fa fa-phone"></i> </a> <a style=" margin-left:5px" href="sms:' + phone + '"> <i class="fa fa-envelope"></i> </a> <a href= "' + map + '" target="_blank" style="margin-left:5px"><i class="fa fa-map-marker"></i></a> ' + zalo + facebook + '</td>' +
                '<td>' + phone + '</td>' +
                '<td><a href="" onclick="event.preventDefault();update_so_tien_vay(\'' + SHD + '\',\'' + sotien + '\',\'' + thoihan + '\')"><span style="color: white;"> ' + sotien + '</span></a></td>' +
                '<td><a href="" onclick="event.preventDefault();update_thoi_han_vay(\'' + SHD + '\',\'' + sotien + '\',\'' + thoihan + '\')"><span style="color: white;"> ' + thoihan + '</span></a></td>' +
                '<td><a href="" onclick="event.preventDefault();update_so_tien_tra_moi_thang(\'' + SHD + '\',\'' + sotientramoithang + '\')"><span style="color: white;"> ' + sotientramoithang + '</span></a></td>' +
                '<td><a href="" onclick="event.preventDefault();update_ngay_vay(\'' + SHD + '\',\'' + ngayvay + '\')"><span style="color: white;" id = "start"> ' + ngayvay + '</span></a></td>' +
                '<td><a href="" onclick="event.preventDefault();update_ngay_tra_tiep_theo(\'' + SHD + '\',\'' + ngaytratieptheo + '\')"><span style="color: white;" id = "next"> ' + ngaytratieptheo + '</span></a></td>' +
                '<td><a href="" onclick="event.preventDefault();update_ngay_ket_thuc(\'' + SHD + '\',\'' + ngayketthuc + '\')"><span style="color: white;" id = "end"> ' + ngayketthuc + '</span></a></td>' +
                '<td><a href="" onclick="event.preventDefault();update_so_ngay_qua_han(\'' + SHD + '\',\'' + sotien + '\',\'' + songayquahan + '\')"><span style="color: red;font-weight:bold"> ' + songayquahan + '</span></a></td>' +
                '<td>' + phiquahan + '</td>' +
                '<td><a href="" onclick="event.preventDefault();update_so_thang_da_tra(\'' + SHD + '\',\'' + tongsothangdatra + '\')"><span style="color: #6bfa32;font-weight:bold"> ' + tongsothangdatra + '/' + thoihan + '</span></a></td>' +
                '<td><a href="" onclick="event.preventDefault();update_so_tien_con_no(\'' + SHD + '\',\'' + sotienconno + '\')"><span style="color: white;"> ' + sotienconno + '</span></a></td>' +
                '<td><a href="" onclick="event.preventDefault();update_lai_suat_con_no(\'' + SHD + '\',\'' + laisuatconno + '\')"><span style="color: white;"> ' + laisuatconno + '</span></a></td>' +
                '<td><a href="" onclick="event.preventDefault();update_phi_dich_vu_con_no(\'' + SHD + '\',\'' + phidichvuconno + '\')"><span style="color: white;"> ' + phidichvuconno + '</span></a></td>' +
                '<td><a href="" onclick="event.preventDefault();update_phi_gia_han_con_no(\'' + SHD + '\',\'' + phigiahanconno + '\')"><span style="color: white;"> ' + phigiahanconno + '</span></a></td>' +
              
                '<td>' + mucdich + '</td>' +
                '<td>' + kehoachtra + '</td>' +
                '<td>' + ngaytao + '</td>' +
                '<td>' + note + '</td>' +
                '<th class="right"> ' + statushd + '</th>' +
                '</tr>');
        });
    });


    document.getElementById("deleteNoti").onclick = function(e) {
        e.preventDefault();

        Swal.fire({
            title: 'Xo?? th??ng b??o !',
            text: "B???n c?? mu???n xo?? t???t c??? c??c th??ng b??o hi???n c?? kh??ng?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '?????ng ??',
            cancelButtonText: '????ng',
            confirmButtonColor: '#5742f5'
        }).then((result) => {
            if (result.value) {

                dbRef.ref('NOTI').remove();
                Swal.fire(
                    'Xo?? th??nh c??ng !',
                    '???? xo?? t???t c??? c??c th??ng b??o',
                    'success'
                )
            }
        })
    }



    document.getElementById("fbuidreader").onclick = function(e) {
        e.preventDefault();
        window.open('https://vtgonl.firebaseapp.com/FbUIDReader.html', '_blank');
    }



    document.getElementById("refresh").onclick = function(e) {
        e.preventDefault();

        Swal.fire({
            title: 'Xo?? HS r??c !',
            text: "B???n c?? mu???n xo?? t???t c??? c??c h??? s?? r??c hi???n c?? kh??ng?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '?????ng ??',
            cancelButtonText: '????ng',
            confirmButtonColor: '#5742f5'
        }).then((result) => {
            if (result.value) {

                dbRef.ref('LOAN').orderByChild('STATUS').equalTo('refused').on("value", function(snapshot) {
                    snapshot.forEach(function(data) {

                        var ngaytao = data.child("ngaytao").val();

                        ngaytao = ngaytao.split(" ", 1);


                        if ((stringToTime(dd + '/' + mm + '/' + yyyy, "dd/MM/yyyy", "/") - stringToTime(ngaytao[0], "dd/MM/yyyy", "/")) > 10 * 24 * 60 * 60 * 1000) {
                            dbRef.ref('LOAN').child(data.key).remove();
                        }
                    });
                });
                Swal.fire({
                    icon: 'success',
                    title: '???? xo?? HS r??c !',
                    text: 'C??c h??? s?? ???? b??? t??? ch???i h??n 10 ng??y ???? ???????c xo?? ra kh???i h??? th???ng th??nh c??ng',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        })

    }


    document.getElementById("idTC").onclick = function(e) {
        e.preventDefault();


        var count = 0;
        dbRef.ref('LOAN').on("value", function(snapshot) {
            document.getElementById('tresults').innerHTML = '';
            document.getElementById('mtable').style.display = "block";
            document.getElementById('mtable2').style.display = "none";


            snapshot.forEach(function(data) {
                count++;
                var SHD = data.child("SHD").val();
                var stt = data.child("STATUS").val();
                var name = data.child("name").val();
                var phone = data.child("phone").val();
                var email = data.child("email").val();
                var sotien = data.child("sotien").val();
                var thoihan = data.child("thoihan").val();
                var sotientramoithang = data.child("sotientramoithang").val();
                var ngayvay = data.child("ngayvay").val();
                var ngaytratieptheo = data.child("ngaytratieptheo").val();
                var ngayketthuc = data.child("ngayketthuc").val();
                var tongsothangdatra = data.child("tongsothangdatra").val();
                var songayquahan = data.child("songayquahan").val();
                var phiquahan = data.child("phiquahan").val();
                var sotienconno = data.child("sotienconno").val();
                var laisuatconno = data.child("laisuatconno").val();
                var phidichvuconno = data.child("phidichvuconno").val();
                var phigiahanconno = data.child("phigiahanconno").val();
                var mucdich = data.child("mucdich").val();
                var kehoachtra = data.child("kehoachtra").val();

                var ngaytao = data.child("ngaytao").val();
                var note = data.child("note").val();

                var lat = data.child("lat").val();
                var lng = data.child("lng").val();
                var map = 'https://maps.google.com/?q=' + lat + ',' + lng;

                var fbID = data.child("facebook").val();
                var facebook = '';
                if (fbID != null && fbID != '') {
                    facebook = '<a href= " https://www.facebook.com/' + fbID + '" target="_blank" style="margin-left:5px"> <span  style="color: #6bfa32"><img src="./images/facebook1.svg" alt="" width="16" height="16" /></span> </a>';
                }

                var zalo = '<a href="https://zalo.me/' + phone + '" target="_blank" style="margin-left:5px"> <span  style="color: #6bfa32"><img src="./images/zalo1.svg" alt="" width="16" height="16" /></span> </a>';


                var color;
                var statushd;
                switch (stt) {
                    case 'pending':
                        color = "orange";
                        statushd = '<button onclick="validateHS(\'' + SHD + '\',\'' + thoihan + '\',\'' + email + '\',\'' + ngayvay + '\',\'' + ngayketthuc + '\',\'' + ngaytratieptheo + '\')" class="mbutton-green-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-check-circle"></i> </button>' +
                            '<button onclick="restrictHS(\'' + SHD + '\')" class="mbutton-orange-mini" style="padding: 4px 16px 4px 16px"><i class="fa fa-minus-circle"></i></button>'
                        break;
                    case 'actived':

                        if (songayquahan != "0") {
                            color = "yellow";
                        } else {
                            color = "#0ac404";
                        }
                        statushd = '<button onclick="finishHS(\'' + SHD + '\')" class="mbutton-green-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-check-circle"></i> </button>';
                        break;
                    case 'refused':
                        color = "red";
                        statushd = '<button onclick="refusedHS(\'' + SHD + '\')" class="mbutton-red-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-times-circle"></i> </button>';
                        break;
                    case 'finished':
                        color = "#767a85";
                        statushd = '';
                        break;
                }

                $('#tresults').append('<tr>' +
                    '<td><span style="color: white;font-weight:bold"> ' + count + '</span></td>' +
                    '<td><a href="#kq" onclick="event.preventDefault();kiemtrahopdong(\'' + SHD + '\')"><span style="color: ' + color + ';font-weight:bold"> ' + SHD + '</span></a></td>' +
                    '<th>  <a href="#kq" onclick="event.preventDefault();kiemtrakhachhang(\'' + phone + '\')"><span style="color: white;"> ' + name + '</span></a>  </th>' +
                    '<td><a style=" margin-left:5px" href="tel:' + phone + '"> <i class="fa fa-phone"></i> </a> <a style=" margin-left:5px" href="sms:' + phone + '"> <i class="fa fa-develope"></i> </a> <a href= "' + map + '" target="_blank" style="margin-left:5px"><i class="fa fa-map-marker"></i> </a> ' + zalo + facebook + '</td>' +
                    '<td>' + phone + '</td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_vay(\'' + SHD + '\',\'' + sotien + '\',\'' + thoihan + '\')"><span style="color: white;"> ' + sotien + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_thoi_han_vay(\'' + SHD + '\',\'' + sotien + '\',\'' + thoihan + '\')"><span style="color: white;"> ' + thoihan + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_tra_moi_thang(\'' + SHD + '\',\'' + sotientramoithang + '\')"><span style="color: white;"> ' + sotientramoithang + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_vay(\'' + SHD + '\',\'' + ngayvay + '\')"><span style="color: white;" id = "start"> ' + ngayvay + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_tra_tiep_theo(\'' + SHD + '\',\'' + ngaytratieptheo + '\')"><span style="color: white;" id = "next"> ' + ngaytratieptheo + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_ket_thuc(\'' + SHD + '\',\'' + ngayketthuc + '\')"><span style="color: white;" id = "end"> ' + ngayketthuc + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_ngay_qua_han(\'' + SHD + '\',\'' + sotien + '\',\'' + songayquahan + '\')"><span style="color: red;font-weight:bold"> ' + songayquahan + '</span></a></td>' +
                    '<td>' + phiquahan + '</td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_thang_da_tra(\'' + SHD + '\',\'' + tongsothangdatra + '\')"><span style="color: #6bfa32;font-weight:bold"> ' + tongsothangdatra + '/' + thoihan + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_con_no(\'' + SHD + '\',\'' + sotienconno + '\')"><span style="color: white;"> ' + sotienconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_lai_suat_con_no(\'' + SHD + '\',\'' + laisuatconno + '\')"><span style="color: white;"> ' + laisuatconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_phi_dich_vu_con_no(\'' + SHD + '\',\'' + phidichvuconno + '\')"><span style="color: white;"> ' + phidichvuconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_phi_gia_han_con_no(\'' + SHD + '\',\'' + phigiahanconno + '\')"><span style="color: white;"> ' + phigiahanconno + '</span></a></td>' +
                    '<td>' + mucdich + '</td>' +
                    '<td>' + kehoachtra + '</td>' +
                    '<td>' + ngaytao + '</td>' +
                    '<td>' + note + '</td>' +
                    '<th class="right"> ' + statushd + '</th>' +
                    '</tr>');
            });
        });
    }

    // hien cac hop dong can duyet
    document.getElementById("idCD").onclick = function(e) {
        e.preventDefault();


        dbRef.ref('LOAN').orderByChild('STATUS').equalTo('pending').on("value", function(snapshot) {
            document.getElementById('tresults').innerHTML = '';
            document.getElementById('mtable').style.display = "block";
            document.getElementById('mtable2').style.display = "none";
            var count = 0;

            snapshot.forEach(function(data) {
                count++;
                var SHD = data.child("SHD").val();
                var stt = data.child("STATUS").val();
                var name = data.child("name").val();
                var phone = data.child("phone").val();
                var email = data.child("email").val();
                var sotien = data.child("sotien").val();
                var thoihan = data.child("thoihan").val();
                var sotientramoithang = data.child("sotientramoithang").val();
                var ngayvay = data.child("ngayvay").val();
                var ngaytratieptheo = data.child("ngaytratieptheo").val();
                var ngayketthuc = data.child("ngayketthuc").val();
                var tongsothangdatra = data.child("tongsothangdatra").val();
                var songayquahan = data.child("songayquahan").val();
                var phiquahan = data.child("phiquahan").val();
                var sotienconno = data.child("sotienconno").val();
                var laisuatconno = data.child("laisuatconno").val();
                var phidichvuconno = data.child("phidichvuconno").val();
                var phigiahanconno = data.child("phigiahanconno").val();
                var mucdich = data.child("mucdich").val();
                var kehoachtra = data.child("kehoachtra").val();
    
                var ngaytao = data.child("ngaytao").val();
                var note = data.child("note").val();


                var lat = data.child("lat").val();
                var lng = data.child("lng").val();
                var map = 'https://maps.google.com/?q=' + lat + ',' + lng;

                var fbID = data.child("facebook").val();
                var facebook = '';
                if (fbID != null && fbID != '') {
                    facebook = '<a href= "https://facebook.com/' + fbID + '" target="_blank" style="margin-left:5px"> <span  style="color: #6bfa32"><img src="./images/facebook1.svg" alt="" width="16" height="16" /></span> </a>';
                }

                var zalo = '<a href="https://zalo.me/' + phone + '" target="_blank" style="margin-left:5px"> <span  style="color: #6bfa32"><img src="./images/zalo1.svg" alt="" width="16" height="16" /></span> </a>';

     
                var statushd;
                switch (stt) {
                    case 'pending':
                        statushd = '<button onclick="validateHS(\'' + SHD + '\',\'' + thoihan + '\',\'' + email + '\',\'' + ngayvay + '\',\'' + ngayketthuc + '\',\'' + ngaytratieptheo + '\')" class="mbutton-green-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-check-circle"></i> </button>' +
                            '<button onclick="restrictHS(\'' + SHD + '\')" class="mbutton-orange-mini" style="padding: 4px 16px 4px 16px"><i class="fa fa-minus-circle"></i> </button>'
                        break;
                    case 'actived':
                        statushd = '<button onclick="finishHS(\'' + SHD + '\')" class="mbutton-green-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-check-circle"></i> </button>';
                        break;
                    case 'refused':
                        statushd = '<button onclick="refusedHS(\'' + SHD + '\')" class="mbutton-red-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-times-circle"></i> </button>';
                        break;
                    case 'finished':
                        statushd = '<span style="color: white;font-weight:bold">H???p ?????ng ???? ???????c k???t th??c</span>';
                        break;
                }

                $('#tresults').append('<tr>' +
                    '<td><span style="color: white;font-weight:bold"> ' + count + '</span></td>' +
                    '<td><a href="#kq" onclick="event.preventDefault();kiemtrahopdong(\'' + SHD + '\')"><span style="color: orange;font-weight:bold"> ' + SHD + '</span></a></td>' +
                    '<th>  <a href="#kq" onclick="event.preventDefault();kiemtrakhachhang(\'' + phone + '\')"><span style="color: white;"> ' + name + '</span></a>  </th>' +
                    '<td><a style=" margin-left:5px" href="tel:' + phone + '"> <i class="fa fa-phone"></i> </a> <a style=" margin-left:5px" href="sms:' + phone + '"> <i class="fa fa-envelope"></i> </a> <a href= "' + map + '" target="_blank" style="margin-left:5px"><i class="fa fa-map-marker"></i> </a> ' + zalo + facebook + '</td>' +
                    '<td>' + phone + '</td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_vay(\'' + SHD + '\',\'' + sotien + '\',\'' + thoihan + '\')"><span style="color: white;"> ' + sotien + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_thoi_han_vay(\'' + SHD + '\',\'' + sotien + '\',\'' + thoihan + '\')"><span style="color: white;"> ' + thoihan + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_tra_moi_thang(\'' + SHD + '\',\'' + sotientramoithang + '\')"><span style="color: white;"> ' + sotientramoithang + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_vay(\'' + SHD + '\',\'' + ngayvay + '\')"><span style="color: white;" id = "start"> ' + ngayvay + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_tra_tiep_theo(\'' + SHD + '\',\'' + ngaytratieptheo + '\')"><span style="color: white;" id = "next"> ' + ngaytratieptheo + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_ket_thuc(\'' + SHD + '\',\'' + ngayketthuc + '\')"><span style="color: white;" id = "end"> ' + ngayketthuc + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_ngay_qua_han(\'' + SHD + '\',\'' + sotien + '\',\'' + songayquahan + '\')"><span style="color: red;font-weight:bold"> ' + songayquahan + '</span></a></td>' +
                    '<td>' + phiquahan + '</td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_thang_da_tra(\'' + SHD + '\',\'' + tongsothangdatra + '\')"><span style="color: #6bfa32;font-weight:bold"> ' + tongsothangdatra + '/' + thoihan + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_con_no(\'' + SHD + '\',\'' + sotienconno + '\')"><span style="color: white;"> ' + sotienconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_lai_suat_con_no(\'' + SHD + '\',\'' + laisuatconno + '\')"><span style="color: white;"> ' + laisuatconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_phi_dich_vu_con_no(\'' + SHD + '\',\'' + phidichvuconno + '\')"><span style="color: white;"> ' + phidichvuconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_phi_gia_han_con_no(\'' + SHD + '\',\'' + phigiahanconno + '\')"><span style="color: white;"> ' + phigiahanconno + '</span></a></td>' +
                    '<td>' + mucdich + '</td>' +
                    '<td>' + kehoachtra + '</td>' +
                    '<td>' + ngaytao + '</td>' +
                    '<td>' + note + '</td>' +
                    '<th class="right">  ' + statushd + '</th>' +
                    '</tr>');
            });
        });
    }


    // hien cac hop dong da duyet
    document.getElementById("idDD").onclick = function(e) {
        e.preventDefault();



        dbRef.ref('LOAN').orderByChild('STATUS').equalTo('actived').on("value", function(snapshot) {
            document.getElementById('tresults').innerHTML = '';
            document.getElementById('mtable').style.display = "block";
            document.getElementById('mtable2').style.display = "none";

            myarray = [];

            var count = 0;
            var da_giai_ngan = 0;
            var thu_lai = 0;
            var da_thu = 0;
            snapshot.forEach(function(data) {
                count++;
                var SHD = data.child("SHD").val();
                var stt = data.child("STATUS").val();
                var name = data.child("name").val();
                var phone = data.child("phone").val();
                var email = data.child("email").val();
                var sotien = data.child("sotien").val();
                var thoihan = data.child("thoihan").val();
                var sotientramoithang = data.child("sotientramoithang").val();
                var ngayvay = data.child("ngayvay").val();
                var ngaytratieptheo = data.child("ngaytratieptheo").val();
                var ngayketthuc = data.child("ngayketthuc").val();
                var tongsothangdatra = data.child("tongsothangdatra").val();
                var songayquahan = data.child("songayquahan").val();
                var phiquahan = data.child("phiquahan").val();
                var sotienconno = data.child("sotienconno").val();
                var laisuatconno = data.child("laisuatconno").val();
                var phidichvuconno = data.child("phidichvuconno").val();
                var phigiahanconno = data.child("phigiahanconno").val();
                var mucdich = data.child("mucdich").val();
                var kehoachtra = data.child("kehoachtra").val();

                var ngaytao = data.child("ngaytao").val();
                var note = data.child("note").val();

                var lat = data.child("lat").val();
                var lng = data.child("lng").val();
                var map = 'https://maps.google.com/?q=' + lat + ',' + lng;

                var fbID = data.child("facebook").val();
                var facebook = '';
                if (fbID != null && fbID != '') {
                    facebook = '<a href= "https://facebook.com/' + fbID + '" target="_blank" style="margin-left:5px"> <span  style="color: #6bfa32"><img src="./images/facebook1.svg" alt="" width="16" height="16" /></span> </a>';
                }
                var zalo = '<a href="https://zalo.me/' + phone + '" target="_blank" style="margin-left:5px"> <span  style="color: #6bfa32"><img src="./images/zalo1.svg" alt="" width="16" height="16" /></span> </a>';

                var statushd;
                switch (stt) {
                    case 'pending':
                        statushd = '<button onclick="validateHS(\'' + SHD + '\',\'' + thoihan + '\',\'' + email + '\',\'' + ngayvay + '\',\'' + ngayketthuc + '\',\'' + ngaytratieptheo + '\')" class="mbutton-green-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-check-circle"></i> </button>' +
                            '<button onclick="restrictHS(\'' + SHD + '\')" class="mbutton-orange-mini" style="padding: 4px 16px 4px 16px"><i class="fa fa-minus-circle"></i> </button>'
                        break;
                    case 'actived':
                        statushd = '<button onclick="finishHS(\'' + SHD + '\')" class="mbutton-green-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-check-circle"></i> </button>';
                        break;
                    case 'refused':
                        statushd = '<button onclick="refusedHS(\'' + SHD + '\')" class="mbutton-red-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-times-circle"></i> </button>';
                        break;
                    case 'finished':
                        statushd = '';
                        break;
                }

                if (tongsothangdatra == null ) { tongsothangdatra = '0'};
                

                var color, colorSNQH;

                var st = parseInt(sotien.replace(/\s/g, ''));
                var th = parseInt(thoihan.replace(/\s/g, ''));
                var sttmt = parseInt(sotientramoithang.replace(/\s/g, ''));
                var stdt = parseInt(tongsothangdatra.replace(/\s/g, ''));


                da_giai_ngan = da_giai_ngan + st;
                thu_lai = thu_lai + sttmt * th;
                da_thu = da_thu + sttmt * stdt;


                var expire_time = (stringToTime(dd + '/' + mm + '/' + yyyy, "dd/MM/yyyy", "/") - stringToTime(ngaytratieptheo, "dd/MM/yyyy", "/"));

                var diff = Math.floor(expire_time / 86400000);

                diff = diff + 1; // delay 1 day in french.

                if (diff > 0) {

                    songayquahan = diff;

                    var arr = [SHD, sotien, songayquahan];
                    myarray.push(arr);

                } else {

                    songayquahan = 0;
                }




                if (songayquahan != "0") {
                    color = "yellow";
                    colorSNQH = "red";
                } else {
                    color = "#0ac404";
                    colorSNQH = "#6bfa32";
                }



                $('#tresults').append('<tr>' +
                    '<td><span style="color: white;font-weight:bold"> ' + count + '</span></td>' +
                    '<td><a href="#kq" onclick="event.preventDefault();kiemtrahopdong(\'' + SHD + '\')"><span style="color: ' + color + ';font-weight:bold"> ' + SHD + '</span></a></td>' +
                    '<th>  <a href="#kq" onclick="event.preventDefault();kiemtrakhachhang(\'' + phone + '\')"><span style="color: white;"> ' + name + '</span></a>  </th>' +
                    '<td><a style=" margin-left:5px" href="tel:' + phone + '"> <i class="fa fa-phone"></i> </a> <a style=" margin-left:5px" href="sms:' + phone + '"> <i class="fa fa-envelope"></i> </a> <a href= "' + map + '" target="_blank" style="margin-left:5px"><i class="fa fa-map-marker"></i> </a> ' + zalo + facebook + '</td>' +
                    '<td>' + phone + '</td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_vay(\'' + SHD + '\',\'' + sotien + '\',\'' + thoihan + '\')"><span style="color: white;"> ' + sotien + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_thoi_han_vay(\'' + SHD + '\',\'' + sotien + '\',\'' + thoihan + '\')"><span style="color: white;"> ' + thoihan + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_tra_moi_thang(\'' + SHD + '\',\'' + sotientramoithang + '\')"><span style="color: white;"> ' + sotientramoithang + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_vay(\'' + SHD + '\',\'' + ngayvay + '\')"><span style="color: white;" id = "start"> ' + ngayvay + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_tra_tiep_theo(\'' + SHD + '\',\'' + ngaytratieptheo + '\')"><span style="color: white;" id = "next"> ' + ngaytratieptheo + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_ket_thuc(\'' + SHD + '\',\'' + ngayketthuc + '\')"><span style="color: white;" id = "end"> ' + ngayketthuc + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_ngay_qua_han(\'' + SHD + '\',\'' + sotien + '\',\'' + songayquahan + '\')"><span style="color:' + colorSNQH + ';font-weight:bold"> ' + Math.abs(diff) + '</span></a></td>' +
                    '<td>' + phiquahan + '</td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_thang_da_tra(\'' + SHD + '\',\'' + tongsothangdatra + '\')"><span style="color: #6bfa32;font-weight:bold"> ' + tongsothangdatra + '/' + thoihan + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_con_no(\'' + SHD + '\',\'' + sotienconno + '\')"><span style="color: white;"> ' + sotienconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_lai_suat_con_no(\'' + SHD + '\',\'' + laisuatconno + '\')"><span style="color: white;"> ' + laisuatconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_phi_dich_vu_con_no(\'' + SHD + '\',\'' + phidichvuconno + '\')"><span style="color: white;"> ' + phidichvuconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_phi_gia_han_con_no(\'' + SHD + '\',\'' + phigiahanconno + '\')"><span style="color: white;"> ' + phigiahanconno + '</span></a></td>' +
                    '<td>' + mucdich + '</td>' +
                    '<td>' + kehoachtra + '</td>' +
                    '<td>' + ngaytao + '</td>' +
                    '<td>' + note + '</td>' +
                    '<th class="right">  ' + statushd + '</th>' +
                    '</tr>');

            });




            $('#tresults').append('<tr>' +
                '<td>TC</td>' +
                '<td></td>' +
                '<th></th>' +
                '<td></td>' +
                '<td></td>' +
                '<td style="font-weight:bold">' + (da_giai_ngan + "").replace(/\B(?=(\d{3})+(?!\d))/g, " ") + '</td>' +
                '<td></td>' +
                '<td style="font-weight:bold">' + (thu_lai + "").replace(/\B(?=(\d{3})+(?!\d))/g, " ") + '</td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td style="font-weight:bold">' + (da_thu + "").replace(/\B(?=(\d{3})+(?!\d))/g, " ") + '</td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<th class="right"></th>' +
                '</tr>');

        });


        Swal.fire({
            title: 'Update SNQH ?',
            text: "B???n c?? mu???n c???p nh???t s??? ng??y qu?? h???n kh??ng?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'C??',
            cancelButtonText: '????? sau',
            confirmButtonColor: '#5742f5'
        }).then((result) => {
            if (result.value) {

                update_so_ngay_qua_han_auto(myarray);

            }
        })



    }

    // hien cac hop dong da hoan tat
    document.getElementById("idHT").onclick = function(e) {
        e.preventDefault();

        dbRef.ref('LOAN').orderByChild('STATUS').equalTo('finished').on("value", function(snapshot) {
            document.getElementById('tresults').innerHTML = '';
            document.getElementById('mtable').style.display = "block";
            document.getElementById('mtable2').style.display = "none";
            var count = 0;
            snapshot.forEach(function(data) {
                count++;
                var SHD = data.child("SHD").val();
                var stt = data.child("STATUS").val();
                var name = data.child("name").val();
                var phone = data.child("phone").val();
                var email = data.child("email").val();
                var sotien = data.child("sotien").val();
                var thoihan = data.child("thoihan").val();
                var sotientramoithang = data.child("sotientramoithang").val();
                var ngayvay = data.child("ngayvay").val();
                var ngaytratieptheo = data.child("ngaytratieptheo").val();
                var ngayketthuc = data.child("ngayketthuc").val();
                var tongsothangdatra = data.child("tongsothangdatra").val();
                var songayquahan = data.child("songayquahan").val();
                var phiquahan = data.child("phiquahan").val();
                var sotienconno = data.child("sotienconno").val();
                var laisuatconno = data.child("laisuatconno").val();
                var phidichvuconno = data.child("phidichvuconno").val();
                var phigiahanconno = data.child("phigiahanconno").val();
                var mucdich = data.child("mucdich").val();
                var kehoachtra = data.child("kehoachtra").val();

                var ngaytao = data.child("ngaytao").val();
                var note = data.child("note").val();

                var lat = data.child("lat").val();
                var lng = data.child("lng").val();
                var map = 'https://maps.google.com/?q=' + lat + ',' + lng;

                var fbID = data.child("facebook").val();
                var facebook = '';
                if (fbID != null && fbID != '') {
                    facebook = '<a href= "https://facebook.com/' + fbID + '" target="_blank" style="margin-left:5px"> <span  style="color: #6bfa32"><img src="./images/facebook1.svg" alt="" width="16" height="16" /></span> </a>';
                }

                var zalo = '<a href="https://zalo.me/' + phone + '" target="_blank" style="margin-left:5px"> <span  style="color: #6bfa32"><img src="./images/zalo1.svg" alt="" width="16" height="16" /></span> </a>';



                var statushd;
                switch (stt) {
                    case 'pending':
                        statushd = '<button onclick="validateHS(\'' + SHD + '\',\'' + thoihan + '\',\'' + email + '\',\'' + ngayvay + '\',\'' + ngayketthuc + '\',\'' + ngaytratieptheo + '\')" class="mbutton-green-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-check-circle"></i> </button>' +
                            '<button onclick="restrictHS(\'' + SHD + '\')" class="mbutton-orange-mini" style="padding: 4px 16px 4px 16px"><i class="fa fa-minus-circle"></i> </button>'
                        break;
                    case 'actived':
                        statushd = '<button onclick="finishHS(\'' + SHD + '\')" class="mbutton-green-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-check-circle"></i> </button>';
                        break;
                    case 'refused':
                        statushd = '<button onclick="refusedHS(\'' + SHD + '\')" class="mbutton-red-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-times-circle"></i> </button>';
                        break;
                    case 'finished':
                        statushd = '';
                        break;
                }

                $('#tresults').append('<tr>' +
                    '<td><span style="color: white;font-weight:bold"> ' + count + '</span></td>' +
                    '<td><a href="#kq" onclick="event.preventDefault();kiemtrahopdong(\'' + SHD + '\')"><span style="color: #767a85;font-weight:bold"> ' + SHD + '</span></a></td>' +
                    '<th>  <a href="#kq" onclick="event.preventDefault();kiemtrakhachhang(\'' + phone + '\')"><span style="color: white;"> ' + name + '</span></a>  </th>' +
                    '<td><a style=" margin-left:5px" href="tel:' + phone + '"> <i class="fa fa-phone"></i> </a> <a style=" margin-left:5px" href="sms:' + phone + '"> <i class="fa fa-envelope"></i> </a> <a href= "' + map + '" target="_blank" style="margin-left:5px"><i class="fa fa-map-marker"></i> </a> ' + zalo + facebook + '</td>' +
                    '<td>' + phone + '</td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_vay(\'' + SHD + '\',\'' + sotien + '\',\'' + thoihan + '\')"><span style="color: white;"> ' + sotien + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_thoi_han_vay(\'' + SHD + '\',\'' + sotien + '\',\'' + thoihan + '\')"><span style="color: white;"> ' + thoihan + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_tra_moi_thang(\'' + SHD + '\',\'' + sotientramoithang + '\')"><span style="color: white;"> ' + sotientramoithang + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_vay(\'' + SHD + '\',\'' + ngayvay + '\')"><span style="color: white;" id = "start"> ' + ngayvay + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_tra_tiep_theo(\'' + SHD + '\',\'' + ngaytratieptheo + '\')"><span style="color: white;" id = "next"> ' + ngaytratieptheo + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_ket_thuc(\'' + SHD + '\',\'' + ngayketthuc + '\')"><span style="color: white;" id = "end"> ' + ngayketthuc + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_ngay_qua_han(\'' + SHD + '\',\'' + sotien + '\',\'' + songayquahan + '\')"><span style="color: red;font-weight:bold"> ' + songayquahan + '</span></a></td>' +
                    '<td>' + phiquahan + '</td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_thang_da_tra(\'' + SHD + '\',\'' + tongsothangdatra + '\')"><span style="color: #6bfa32;font-weight:bold"> ' + tongsothangdatra + '/' + thoihan + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_con_no(\'' + SHD + '\',\'' + sotienconno + '\')"><span style="color: white;"> ' + sotienconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_lai_suat_con_no(\'' + SHD + '\',\'' + laisuatconno + '\')"><span style="color: white;"> ' + laisuatconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_phi_dich_vu_con_no(\'' + SHD + '\',\'' + phidichvuconno + '\')"><span style="color: white;"> ' + phidichvuconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_phi_gia_han_con_no(\'' + SHD + '\',\'' + phigiahanconno + '\')"><span style="color: white;"> ' + phigiahanconno + '</span></a></td>' +
                    '<td>' + mucdich + '</td>' +
                    '<td>' + kehoachtra + '</td>' +
                    '<td>' + ngaytao + '</td>' +
                    '<td>' + note + '</td>' +
                    '<th class="right">  ' + statushd + '</th>' +
                    '</tr>');
            });
        });
    }


    document.getElementById("idDH").onclick = function(e) {
        e.preventDefault();

        dbRef.ref('LOAN').orderByChild('STATUS').equalTo('refused').on("value", function(snapshot) {
            document.getElementById('tresults').innerHTML = '';
            document.getElementById('mtable').style.display = "block";
            document.getElementById('mtable2').style.display = "none";
            var count = 0;
            snapshot.forEach(function(data) {
                count++;
                var SHD = data.child("SHD").val();
                var stt = data.child("STATUS").val();
                var name = data.child("name").val();
                var phone = data.child("phone").val();
                var email = data.child("email").val();
                var sotien = data.child("sotien").val();
                var thoihan = data.child("thoihan").val();
                var sotientramoithang = data.child("sotientramoithang").val();
                var ngayvay = data.child("ngayvay").val();
                var ngaytratieptheo = data.child("ngaytratieptheo").val();
                var ngayketthuc = data.child("ngayketthuc").val();
                var tongsothangdatra = data.child("tongsothangdatra").val();
                var songayquahan = data.child("songayquahan").val();
                var phiquahan = data.child("phiquahan").val();
                var sotienconno = data.child("sotienconno").val();
                var laisuatconno = data.child("laisuatconno").val();
                var phidichvuconno = data.child("phidichvuconno").val();
                var phigiahanconno = data.child("phigiahanconno").val();
                var mucdich = data.child("mucdich").val();
                var kehoachtra = data.child("kehoachtra").val();
 
                var ngaytao = data.child("ngaytao").val();
                var note = data.child("note").val();

                var lat = data.child("latitude").val();
                var lng = data.child("longitude").val();
                var map = 'https://maps.google.com/?q=' + lat + ',' + lng;

                var fbID = data.child("facebook").val();
                var facebook = '';
                if (fbID != null && fbID != '') {
                    facebook = '<a href= "https://facebook.com/' + fbID + '" target="_blank" style="margin-left:5px"> <span  style="color: #6bfa32"><img src="./images/facebook1.svg" alt="" width="16" height="16" /></span> </a>';
                }
                var zalo = '<a href="https://zalo.me/' + phone + '" target="_blank" style="margin-left:5px"> <span  style="color: #6bfa32"><img src="./images/zalo1.svg" alt="" width="16" height="16" /></span> </a>';

            
                var statushd;
                switch (stt) {
                    case 'pending':
                        statushd = '<button onclick="validateHS(\'' + SHD + '\',\'' + thoihan + '\',\'' + email + '\',\'' + ngayvay + '\',\'' + ngayketthuc + '\',\'' + ngaytratieptheo + '\')" class="mbutton-green-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-check-circle"></i> </button>' +
                            '<button onclick="restrictHS(\'' + SHD + '\')" class="mbutton-orange-mini" style="padding: 4px 16px 4px 16px"><i class="fa fa-minus-circle"></i> </button>'
                        break;
                    case 'actived':
                        statushd = '<button onclick="finishHS(\'' + SHD + '\')" class="mbutton-green-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-check-circle"></i> </button>';
                        break;
                    case 'refused':
                        statushd = '<button onclick="refusedHS(\'' + SHD + '\')" class="mbutton-red-mini" style="padding: 4px 16px 4px 16px" ><i class="fa fa-times-circle"></i> </button>';
                        break;
                    case 'finished':
                        statushd = '';
                        break;
                }

                $('#tresults').append('<tr>' +
                    '<td><span style="color: white;font-weight:bold"> ' + count + '</span></td>' +
                    '<td><a href="#kq" onclick="event.preventDefault();kiemtrahopdong(\'' + SHD + '\')"><span style="color: red;font-weight:bold"> ' + SHD + '</span></a></td>' +
                    '<th>  <a href="#kq" onclick="event.preventDefault();kiemtrakhachhang(\'' + phone + '\')"><span style="color: white;"> ' + name + '</span></a>  </th>' +
                    '<td><a style=" margin-left:5px" href="tel:' + phone + '"> <i class="fa fa-phone"></i> </a> <a style=" margin-left:5px" href="sms:' + phone + '"> <i class="fa fa-envelope"></i> </a> <a href= "' + map + '" target="_blank" style="margin-left:5px"><i class="fa fa-map-marker"></i> </a> ' + zalo + facebook + '</td>' +
                    '<td>' + phone + '</td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_vay(\'' + SHD + '\',\'' + sotien + '\',\'' + thoihan + '\')"><span style="color: white;"> ' + sotien + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_thoi_han_vay(\'' + SHD + '\',\'' + sotien + '\',\'' + thoihan + '\')"><span style="color: white;"> ' + thoihan + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_tra_moi_thang(\'' + SHD + '\',\'' + sotientramoithang + '\')"><span style="color: white;"> ' + sotientramoithang + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_vay(\'' + SHD + '\',\'' + ngayvay + '\')"><span style="color: white;" id = "start"> ' + ngayvay + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_tra_tiep_theo(\'' + SHD + '\',\'' + ngaytratieptheo + '\')"><span style="color: white;" id = "next"> ' + ngaytratieptheo + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_ngay_ket_thuc(\'' + SHD + '\',\'' + ngayketthuc + '\')"><span style="color: white;" id = "end"> ' + ngayketthuc + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_ngay_qua_han(\'' + SHD + '\',\'' + sotien + '\',\'' + songayquahan + '\')"><span style="color: red;font-weight:bold"> ' + songayquahan + '</span></a></td>' +
                    '<td>' + phiquahan + '</td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_thang_da_tra(\'' + SHD + '\',\'' + tongsothangdatra + '\')"><span style="color: #6bfa32;font-weight:bold"> ' + tongsothangdatra + '/' + thoihan + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_so_tien_con_no(\'' + SHD + '\',\'' + sotienconno + '\')"><span style="color: white;"> ' + sotienconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_lai_suat_con_no(\'' + SHD + '\',\'' + laisuatconno + '\')"><span style="color: white;"> ' + laisuatconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_phi_dich_vu_con_no(\'' + SHD + '\',\'' + phidichvuconno + '\')"><span style="color: white;"> ' + phidichvuconno + '</span></a></td>' +
                    '<td><a href="" onclick="event.preventDefault();update_phi_gia_han_con_no(\'' + SHD + '\',\'' + phigiahanconno + '\')"><span style="color: white;"> ' + phigiahanconno + '</span></a></td>' +
                    '<td>' + mucdich + '</td>' +
                    '<td>' + kehoachtra + '</td>' +
                     '<td>' + ngaytao + '</td>' +
                    '<td>' + note + '</td>' +
                    '<th class="right">  ' + statushd + '</th>' +
                    '</tr>');
            });
        });
    }


    document.getElementById("idTK").onclick = function(e) {
        e.preventDefault();

        dbRef.ref('USER').on("value", function(snapshot) {
            var count = 0;
            document.getElementById('tresults2').innerHTML = '';
            document.getElementById('mtable').style.display = "none";
            document.getElementById('mtable2').style.display = "block";

            snapshot.forEach(function(data) {
                count++;
                var name = data.child("name").val();
                var phone = data.child("phone").val();
                var email = data.child("email").val();
                var village = data.child("addressVillage").val();
                var province = data.child("addressProvince").val();
                var place = village + ', ' + province;

                $('#tresults2').append('<tr>' +
                    '<td>' + count + '</td>' +
                    '<td>' + name + '</td>' +
                    '<td><a style="margin:2px" href="#kq" onclick="event.preventDefault();kiemtrakhachhang(\'' + phone + '\')"> <span style="color: white;"> ' + phone + '</span></a></td>' +
                    '<td>' + email + '</td>' +
                    '<td>' + place + '</td>' +
                    '</tr>');
            });
        });
    }

    document.getElementById("add_search_shd").onclick = function(e) {
        e.preventDefault();

        var temp = ' <input type="tel" id="n1" placeholder="S??? h???p ?????ng" maxlength="6"/>';

        Swal.fire({
            title: 'Th??ng tin h???p ?????ng',
            html: temp,
            icon: '',
            confirmButtonText: 'Ti???p t???c &rarr;'
        }).then((result) => {
            if (result.value) {
                var shd = $('#n1').val();
                if (shd.length != 6) {
                    return false;
                } else {
                    kiemtrahopdong(shd);
                }
            }
        })
    }

    document.getElementById("add_payment").onclick = function(e) {
        e.preventDefault();

        var temp = ' <input type="tel" id="n1" placeholder="S??? h???p ?????ng" maxlength="6"/>';

        Swal.fire({
            title: 'Th??ng tin thanh to??n',
            html: temp,
            icon: '',
            confirmButtonText: 'Ti???p t???c &rarr;'
        }).then((result) => {
            if (result.value) {
                var shd = $('#n1').val();
                if (shd.length != 6) {
                    return false;
                } else {
                    kiemtrahopdong(shd);
                }
            }
        })
    }

    document.getElementById("add_search_phone").onclick = function(e) {
        e.preventDefault();

        var temp = ' <input type="tel" id="n1" placeholder="S??? ??i???n tho???i" maxlength="10"/>';

        Swal.fire({
            title: 'Th??ng tin t??i kho???n',
            html: temp,
            icon: '',
            confirmButtonText: 'Ti???p t???c &rarr;'
        }).then((result) => {
            if (result.value) {
                var phone = $('#n1').val();
                if (phone.length != 10) {
                    return false;
                } else {
                    kiemtrakhachhang(phone);
                }
            }
        })
    }


    document.getElementById("doCheckName").onclick = function(e) {
        e.preventDefault();


        var iname = $('#name').val();


        if (iname.length < 5) {
            Swal.fire({
                title: 'L???i !',
                text: 'T??n Kh??ch h??ng kh??ng ch??nh x??c',
                icon: 'error',
                confirmButtonText: '????ng',
                confirmButtonColor: '#5742f5'
            });
        } else {

            dbRef.ref('LOAN').orderByChild('name').equalTo(iname).on("value", function(snapshot) {


                var val = snapshot.val();
                if (val == null) {
                    Swal.fire({
                        title: 'Oops...',
                        text: 'Kh??ng t??m th???y h???p ?????ng n??o c???a Kh??ch h??ng ' + iname,
                        icon: 'info',
                        confirmButtonText: '????ng',
                        confirmButtonColor: '#5742f5'
                    });
                } else {
                    document.getElementById("mresultName").innerHTML = '';
                    snapshot.forEach(function(data) {

                        var SHD = data.child("SHD").val();
                        var stt = data.child("STATUS").val();
                        switch (stt) {
                            case 'pending':
                                $('#mresultName').append('<a class="hdbox-orange" href="#kq" onclick="event.preventDefault();kiemtrahopdong(\'' + SHD + '\')"><span style="color: white;font-weight:bold"> ' + SHD + '</span></a>');
                                break;
                            case 'actived':
                                $('#mresultName').append('<a class="hdbox-green" href="#kq" onclick="event.preventDefault();kiemtrahopdong(\'' + SHD + '\')"><span style="color: white;font-weight:bold"> ' + SHD + '</span></a>');
                                break;
                            case 'refused':
                                $('#mresultName').append('<a class="hdbox-red" href="#kq" onclick="event.preventDefault();kiemtrahopdong(\'' + SHD + '\')"><span style="color: white;font-weight:bold"> ' + SHD + '</span></a>');
                                break;
                            case 'finished':
                                $('#mresultName').append('<a class="hdbox-grey" href="#kq" onclick="event.preventDefault();kiemtrahopdong(\'' + SHD + '\')"><span style="color: white;font-weight:bold"> ' + SHD + '</span></a>');
                                break;
                        }
                    });
                }


            });
        }

    }




    document.getElementById("doCheckUserPhone").onclick = function(e) {
        e.preventDefault();


        var iuserphone = $('#userphone').val();

        if (iuserphone.length < 10) {
            Swal.fire({
                title: 'L???i !',
                text: 'S??? ??i???n tho???i kh??ng ch??nh x??c',
                icon: 'error',
                confirmButtonText: '????ng',
                confirmButtonColor: '#5742f5'
            });
            return false;
        } else {
            kiemtrakhachhang(iuserphone);
        }

    }




    document.getElementById("doCheck").onclick = function(e) {
        e.preventDefault();

        var id = $('#id').val();
        kiemtrahopdong(id);

    };




    document.getElementById("doHDRestrict").onclick = function(e) {
        e.preventDefault();

        var id = $('#id').val();


        if (id.length < 6) {
            Swal.fire({
                title: 'L???i !',
                text: 'S??? h???p ?????ng kh??ng ch??nh x??c',
                icon: 'error',
                confirmButtonText: '????ng',
                confirmButtonColor: '#5742f5'
            });
        } else {
            restrictHS(id);
        }

    };




    document.getElementById("doDelete").onclick = function(e) {
        e.preventDefault();

        var id = $('#id').val();


        if (id.length < 6) {
            Swal.fire({
                title: 'L???i !',
                text: 'S??? h???p ?????ng kh??ng ch??nh x??c',
                icon: 'error',
                confirmButtonText: '????ng',
                confirmButtonColor: '#5742f5'
            });
            return false;
        }

        Swal.fire({
            title: 'Xo?? h??? s???',
            text: "H??? s?? " + id + " s??? ???????c xo?? kh???i h??? th???ng c???a VTG Online",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: '????ng',
            confirmButtonText: '?????ng ??',
            confirmButtonColor: '#5742f5'
        }).then((result) => {
            if (result.value) {

                dbRef.ref('LOAN').child(id).once('value').then(function(data) {


                    if (data.val() == null) {
                        Swal.fire({
                            title: 'Oops...',
                            text: 'Kh??ng t??m th???y S??? h???p ?????ng ' + id,
                            icon: 'info',
                            confirmButtonText: '????ng',
                            confirmButtonColor: '#5742f5'
                        });
                    } else {


                        var tt = data.child('STATUS').val();
                        if (tt == "actived") {
                            Swal.fire({
                                title: 'Kh??ng th??? xo?? !',
                                text: 'H???p ?????ng ??ang c?? hi???u l???c',
                                icon: 'warning',
                                confirmButtonText: '????ng',
                                confirmButtonColor: '#5742f5'
                            });

                        } else {

                            dbRef.ref('LOAN').child(id).remove();

                            Swal.fire(
                                'Xo?? th??nh c??ng !',
                                'H???p ?????ng ' + id + ' ???? ???????c xo?? ra kh???i h??? th???ng',
                                'success'
                            )

                            document.getElementById("kq").innerHTML = '';
                        }



                    }


                });

            }
        })
    };


    document.getElementById("addEvent").onclick = function(e) {
        e.preventDefault();

        var shd = $('#id').val();

        if (shd.length < 6) {
            Swal.fire({
                title: 'L???i !',
                text: 'S??? h???p ?????ng kh??ng ch??nh x??c',
                icon: 'error',
                confirmButtonText: '????ng',
                confirmButtonColor: '#5742f5'
            });
        } else {

            dbRef.ref("LOAN").orderByChild('SHD').equalTo(shd).on("value", function(snapshot) {

                const val = snapshot.val();

                if (val == null) {
                    Swal.fire({
                        title: 'Oops...',
                        text: 'Kh??ng t??m th???y th??ng tin h???p ?????ng ' + shd,
                        icon: 'info',
                        confirmButtonText: '????ng',
                        confirmButtonColor: '#5742f5'
                    });
                } else {

                    dbRef.ref('LOAN').child(shd).once('value').then(function(data) {
                        var email = data.child("email").val();
                        var th = data.child("thoihan").val();
                        window.location.href = "calendar.html?shd=" + shd + "&thoihan=" + th + "&email=" + email;

                    });
                }
            });
        }

    }



    document.getElementById("doUserRestrict").onclick = function(e) {
        e.preventDefault();

        var sdt = $('#userphone').val();


        if (sdt.length < 10) {
            Swal.fire({
                title: 'L???i !',
                text: 'S??? ??i???n tho???i kh??ng ch??nh x??c',
                icon: 'error',
                confirmButtonText: '????ng',
                confirmButtonColor: '#5742f5'
            });
            return false;
        }

        var ivnphone = '+84' + sdt.substring(1, sdt.length);

        Swal.fire({
            title: 'Ch???n t??i kho???n ?',
            text: "Nghi ng??? t??i kho???n n??y cung c???p th??ng tin sai ho???c c?? g?? ???? b???t th?????ng x???y ra? Ch???n ngay v?? lu??n!",
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: '????ng',
            confirmButtonText: '?????ng ??',
            confirmButtonColor: '#5742f5'
        }).then((result) => {
            if (result.value) {

                dbRef.ref('USER').child(ivnphone).once('value').then(function(data) {


                    if (data.val() == null) {
                        Swal.fire({
                            title: 'Oops...',
                            text: 'Kh??ng t??m th???y S??? ??i???n tho???i ' + sdt,
                            icon: 'info',
                            confirmButtonText: '????ng',
                            confirmButtonColor: '#5742f5'
                        });
                    } else {
                        dbRef.ref('USER').child(ivnphone).update({
                            ACTIVE: 'refused'
                        });

                        Swal.fire(
                            'Ch???n th??nh c??ng !',
                            'T??i kho???n ' + sdt + ' s??? kh??ng th??? y??u c???u c??c d???ch v??? t??? VTG Online',
                            'success'
                        )
                        document.getElementById("kq").innerHTML = '';
                    }


                });

            }
        })
    };

    document.getElementById("doUserDelete").onclick = function(e) {
        e.preventDefault();

        var sdt = $('#userphone').val();


        if (sdt.length < 10) {
            Swal.fire({
                title: 'L???i !',
                text: 'S??? ??i???n tho???i kh??ng ch??nh x??c',
                icon: 'error',
                confirmButtonText: '????ng',
                confirmButtonColor: '#5742f5'
            });
            return false;
        }

        var ivnphone = '+84' + sdt.substring(1, sdt.length);

        Swal.fire({
            title: 'Xo?? t??i kho???n ?',
            text: "?????ng ?? xo?? t??i kho???n v?? to??n b??? h???p ?????ng li??n quan ?????n t??i kho???n n??y ra kh???i h??? th???ng c???a TVG Online?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: '????ng',
            confirmButtonText: '?????ng ??',
            confirmButtonColor: '#5742f5'
        }).then((result) => {
            if (result.value) {


                dbRef.ref('USER').child(ivnphone).once('value').then(function(data) {


                    if (data.val() == null) {
                        Swal.fire({
                            title: 'Oops...',
                            text: 'Kh??ng t??m th???y S??? ??i???n tho???i ' + sdt,
                            icon: 'info',
                            confirmButtonText: '????ng',
                            confirmButtonColor: '#5742f5'
                        });
                    } else {

                        dbRef.ref('LOAN').orderByChild('phone').equalTo(ivnphone).once('value', function(snapshot) {
                            snapshot.forEach(function(child) {
                                dbRef.ref('LOAN').child(child.key).remove();

                            });
                        });
                        dbRef.ref('USER').child(ivnphone).remove();

                        Swal.fire(
                            '???? xo?? !',
                            'B???n ???? xo?? t??i kho???n ' + sdt + ' v?? t???t c??? c??c h???p ?????ng c???a t??i kho???n n??y ra kh???i h??? th???ng VTG Online th??nh c??ng',
                            'success'
                        )
                        document.getElementById("kq").innerHTML = '';
                    }


                });

            }
        })
    };



    document.getElementById("doSendEmail").onclick = function(e) {

        e.preventDefault();

        Swal.fire({
            title: 'G???i th??ng b??o',
            html: '<textarea style="width:100%;padding:15px" rows="1" id="title" placeholder="Ti??u ?????" maxlength="500"></textarea> <p> N???i dung </p>  <textarea style="width:100%;padding:15px" rows="10" id="context" placeholder="?????nh d???ng html" maxlength="5000"></textarea>'
        }).then((result) => {
            if (result.value) {


                var title = document.getElementById("title").value;
                var context = document.getElementById("context").value;


                if (title.length < 10 || context.length < 10) {
                    Swal.fire('L???i !', 'N???i dung th??ng b??o qu?? ng???n', 'error');
                } else {

                    dbRef.ref('NOTI').push({
                        title: title,
                        context: context
                    });
                    Swal.fire(
                        '???? c???p nh???t !',
                        'Th??ng b??o ' + title + ' ???? ???????c th??m',
                        'success'
                    )
                }


            }
        })




    };




    setInputFilter(document.getElementById("userphone"), function(value) {
        return /^-?\d*$/.test(value);
    });

    setInputFilter(document.getElementById("id"), function(value) {
        return /^-?\d*$/.test(value);
    });


});



function tientra(sotien, sothang) {
    var rs = (((sotien / sothang) + (sotien * 0.08)));
    return Math.round(rs * 0.001).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' 000';
}



function update_so_tien_vay(sohopdong, sotien, thoihan) {

    var dbRef = firebase.database();


    Swal.fire({
        title: 'S??? ti???n vay',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        confirmButtonText: '?????ng ??',
        inputValue: sotien,
        cancelButtonText: '????ng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (msotien) => {

            if (msotien == '' || msotien == null) {
                return false;
            }

            var st = parseInt(msotien.replace(/\s/g, ''));

            if (st < 1000000 || st > 10000000) {

                Swal.fire(
                    'L???i !',
                    'S??? ti???n kh??ng n???m trong kho???n gi???i ng??n cho ph??p',
                    'error'
                )
                return false;
            }

            var mtramoithang = tientra(st, thoihan);

            msotien = msotien.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            mtramoithang = mtramoithang.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            dbRef.ref('LOAN').child(sohopdong).update({
                sotien: msotien,
                sotientramoithang: mtramoithang
            });

            Swal.fire(
                '???? c???p nh???t !',
                'S??? ti???n vay ???? ???????c thay ?????i th??nh ' + msotien + ' ??',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}


function update_thoi_han_vay(sohopdong, sotien, thoihan) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'Th???i h???n vay',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: thoihan,
        confirmButtonText: '?????ng ??',
        cancelButtonText: '????ng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (mthoihan) => {


            var th = parseInt(mthoihan);
            if (th < 1 || th > 6 || !(/^-?\d*$/.test(mthoihan))) {

                Swal.fire(
                    'L???i !',
                    'Th???i h???n kh??ng n???m trong kho???n cho ph??p',
                    'error'
                )
                return false;
            }

            var st = parseInt(sotien.replace(/\s/g, ''));
            var mtramoithang = tientra(st, th);

            mtramoithang = mtramoithang.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            dbRef.ref('LOAN').child(sohopdong).update({
                thoihan: mthoihan,
                sotientramoithang: mtramoithang
            });

            Swal.fire(
                '???? c???p nh???t !',
                'Th???i h???n vay ???? ???????c thay ?????i th??nh ' + mthoihan + ' th??ng',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}



function update_so_tien_tra_moi_thang(sohopdong, sotientramoithang) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'Tr??? m???i th??ng',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: sotientramoithang,
        confirmButtonText: '?????ng ??',
        cancelButtonText: '????ng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (mtramoithang) => {

            if (mtramoithang == '' || mtramoithang == null) {
                return false;
            }


            mtramoithang = mtramoithang.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            dbRef.ref('LOAN').child(sohopdong).update({
                sotientramoithang: mtramoithang
            });

            Swal.fire(
                '???? c???p nh???t !',
                'S??? ti???n tr??? m???i th??ng ???? ???????c thay ?????i th??nh ' + mtramoithang + '??',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}


function update_so_tien_con_no(sohopdong, sotienconno) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'D?? n??? g???c',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: sotienconno,
        confirmButtonText: '?????ng ??',
        cancelButtonText: '????ng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (stcn) => {

            if (stcn == '' || stcn == null) {
                return false;
            }


            stcn = stcn.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            dbRef.ref('LOAN').child(sohopdong).update({
                sotienconno: stcn
            });

            Swal.fire(
                '???? c???p nh???t !',
                'Ti???n g???c c??n n??? ???? ???????c thay ?????i th??nh ' + stcn + '??',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}




function update_lai_suat_con_no(sohopdong, laisuatconno) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'D?? n??? l??i su???t',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: laisuatconno,
        confirmButtonText: '?????ng ??',
        cancelButtonText: '????ng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (lscn) => {

            if (lscn == '' || lscn == null) {
                return false;
            }


            lscn = lscn.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            dbRef.ref('LOAN').child(sohopdong).update({
                laisuatconno: lscn
            });

            Swal.fire(
                '???? c???p nh???t !',
                'L??i su???t c??n n??? ???? ???????c thay ?????i th??nh ' + lscn + '??',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}


function update_phi_dich_vu_con_no(sohopdong, phidichvuconno) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'N??? ph?? d???ch v???',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: phidichvuconno,
        confirmButtonText: '?????ng ??',
        cancelButtonText: '????ng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (pdvcn) => {

            if (pdvcn == '' || pdvcn == null) {
                return false;
            }


            pdvcn = pdvcn.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            dbRef.ref('LOAN').child(sohopdong).update({
                phidichvuconno: pdvcn
            });

            Swal.fire(
                '???? c???p nh???t !',
                'Ph?? d???ch v??? c??n n??? ???? ???????c thay ?????i th??nh ' + pdvcn + '??',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}

function update_phi_gia_han_con_no(sohopdong, phigiahanconno) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'N??? ph?? gia h???n',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: phigiahanconno,
        confirmButtonText: '?????ng ??',
        cancelButtonText: '????ng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (pghcn) => {

            if (pghcn == '' || pghcn == null) {
                return false;
            }


            pghcn = pghcn.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            dbRef.ref('LOAN').child(sohopdong).update({
                phigiahanconno: pghcn
            });

            Swal.fire(
                '???? c???p nh???t !',
                'Ph?? gia h???n c??n n??? ???? ???????c thay ?????i th??nh ' + pghcn + '??',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}


function update_ngay_vay(sohopdong, ngayvay) {

    var dbRef = firebase.database();


    Swal.fire({
        title: 'Ng??y vay',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: ngayvay,
        confirmButtonText: '?????ng ??',
        cancelButtonText: '????ng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (nv) => {

            if (nv.length != 10) {

                Swal.fire('L???i !', '?????nh d???ng ng??y DD/MM/YYYY', 'error')
                return false;
            }

            dbRef.ref('LOAN').child(sohopdong).update({
                ngayvay: nv
            });

            Swal.fire(
                '???? c???p nh???t !',
                'Ng??y b???t ?????u h???p ?????ng l?? ng??y ' + nv,
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}


function update_ngay_ket_thuc(sohopdong, ngayketthuc) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'Ng??y k???t th??c',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: ngayketthuc,
        confirmButtonText: '?????ng ??',
        cancelButtonText: '????ng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (nkt) => {

            if (nkt.length != 10) {
                Swal.fire('L???i !', '?????nh d???ng ng??y DD/MM/YYYY', 'error')
                return false;
            }

            dbRef.ref('LOAN').child(sohopdong).update({
                ngayketthuc: nkt
            });

            Swal.fire(
                '???? c???p nh???t !',
                'Ng??y k???t th??c h???p ?????ng l?? ng??y ' + nkt,
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}



function update_ngay_tra_tiep_theo(sohopdong, ngaytratieptheo) {

    var dbRef = firebase.database();


    Swal.fire({
        title: 'Ng??y tr??? ti???p theo',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: ngaytratieptheo,
        confirmButtonText: '?????ng ??',
        cancelButtonText: '????ng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (nttt) => {

            if (nttt.length != 10) {
                Swal.fire('L???i !', '?????nh d???ng ng??y DD/MM/YYYY', 'error')
                return false;
            }

            dbRef.ref('LOAN').child(sohopdong).update({
                ngaytratieptheo: nttt
            });

            Swal.fire(
                '???? c???p nh???t !',
                'Ng??y thanh to??n ti???p theo l?? ng??y ' + nttt,
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}




function update_so_ngay_qua_han(sohopdong, sotien, songayquahan) {

    var dbRef = firebase.database();

    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var mm = parseInt(mm);


    Swal.fire({
        title: 'S??? ng??y qu?? h???n',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: songayquahan,
        confirmButtonText: '?????ng ??',
        cancelButtonText: '????ng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (songayqh) => {


            if (songayqh == null || songayqh == '' || !(/^-?\d*$/.test(songayqh))) {
                return false;
            }

            var heso;
            var sn = parseInt(songayqh);
            if (sn == 1) {
                heso = 0;
            } else if (sn > 1 && sn <= 7) {
                heso = 0.03;
            } else if (sn > 7 && sn <= 14) {
                heso = 0.06;
            } else if (sn > 14 && sn <= 21) {
                heso = 0.09;
            } else if (sn > 21 && sn <= 30) {
                heso = 0.12;
            } else if (sn > 30 && sn <= 60) {
                heso = 0.24;
            } else if (sn > 60 && sn <= 90) {
                heso = 0.36;
            } else if (sn > 90 && sn <= 120) {
                heso = 0.48;
            } else if (sn > 120 && sn <= 150) {
                heso = 0.60;
            } else {
                heso = 0.72;
            }

            var st = parseInt(sotien.replace(/\s/g, ''));
            var phi = Math.round(st * heso).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");



            var nnote;
            if (sn == 0) {

                nnote = '';
                phi = '0';

            } else {

                if (sn <= 30) {
                    nnote = 'Qu?? h???n ' + songayqh + ' ng??y trong T' + mm + '/' + yyyy + '.';

                } else {
                    nnote = '????? ngh??? t???t to??n h???p ?????ng.';

                }

            }

            dbRef.ref('LOAN').child(sohopdong).update({
                songayquahan: songayqh+'',
                phiquahan: phi,
                note: nnote
            });
            Swal.fire(
                '???? c???p nh???t !',
                'B???n ???? thay ?????i s??? ng??y qu?? h???n c???a h???p ?????ng ' + sohopdong + ' th??nh ' + songayqh + ' ng??y',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()

    });
}



function update_so_ngay_qua_han_auto(myarray) {

    var dbRef = firebase.database();

    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var mm = parseInt(mm);


    var sohopdong, sotien, songayqh;
    var heso;

    for (var i = 0; i <= myarray.length - 1; i++) {
        sohopdong = myarray[i][0];
        sotien = myarray[i][1];
        songayqh = myarray[i][2];


        var sn = parseInt(songayqh);
        if (sn == 1) {
            heso = 0;
        } else if (sn > 1 && sn <= 7) {
            heso = 0.03;
        } else if (sn > 7 && sn <= 14) {
            heso = 0.06;
        } else if (sn > 14 && sn <= 21) {
            heso = 0.09;
        } else if (sn > 21 && sn <= 30) {
            heso = 0.12;
        } else if (sn > 30 && sn <= 60) {
            heso = 0.24;
        } else if (sn > 60 && sn <= 90) {
            heso = 0.36;
        } else if (sn > 90 && sn <= 120) {
            heso = 0.48;
        } else if (sn > 120 && sn <= 150) {
            heso = 0.60;
        } else {
            heso = 0.72;
        }

        var st = parseInt(sotien.replace(/\s/g, ''));
        var phi = Math.round(st * heso).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");



        var nnote;
        if (sn == 0) {

            nnote = '';
            phi = '0';

        } else {

            if (sn <= 30) {
                nnote = 'Qu?? h???n ' + songayqh + ' ng??y trong T' + mm + '/' + yyyy + '.';

            } else {
                nnote = '????? ngh??? t???t to??n h???p ?????ng.';

            }

        }

        dbRef.ref('LOAN').child(sohopdong).update({
            songayquahan: songayqh+'',
            phiquahan: phi,
            note: nnote
        });


        Swal.fire(
            '???? c???p nh???t !',
            'C??c h??? s?? thanh to??n tr??? ???? ???????c c???p nh???t SNQH',
            'success'
        )

    }



}




function update_so_thang_da_tra(sohopdong, tongsothangdatra) {

    var dbRef = firebase.database();


    Swal.fire({
        title: 'S??? th??ng ???? thanh to??n',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: tongsothangdatra,
        confirmButtonText: '?????ng ??',
        cancelButtonText: '????ng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (tongsothangdt) => {

            if (tongsothangdt == '' || tongsothangdt == null || !(/^-?\d*$/.test(tongsothangdt))) {
                return false;
            }

            dbRef.ref('LOAN').child(sohopdong).update({
                tongsothangdatra: tongsothangdt
            });

            Swal.fire(
                '???? c???p nh???t !',
                'B???n ???? thay ?????i s??? th??ng ???? thanh to??n c???a h???p ?????ng ' + sohopdong + ' th??nh ' + tongsothangdt + ' th??ng',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}


function viewContract(shd) {
       var dbRef = firebase.database();

       dbRef.ref('LOAN').child(shd).once('value').then(function(data) {

        if (data.val() == null) {
            Swal.fire('L???i !', 'H???p ?????ng giao d???ch kh??ng t???n t???i', 'error')
            return false;
        }
         window.open('http://vtgonl.firebaseapp.com/contract.html?shd=' + shd, '_blank');

});


   
}


function validateHS(sohopdong, th, email, start, end, step) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'Duy???t h??? s?? ' + sohopdong,
        text: "B???n c?? mu???n nh???n h??? s?? v?? ti???n h??nh gi???i ng??n cho kho???n vay n??y kh??ng?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '?????ng ??',
        cancelButtonText: '????ng',
        confirmButtonColor: '#5742f5'
    }).then((result) => {
        if (result.value) {

            if (start == 'null' || start == '') {
                Swal.fire(
                    'Oops...',
                    'Vui l??ng b??? sung ng??y gi???i ng??n h???p ?????ng',
                    'warning'
                )
                return false;
            }

            if (step == 'null' || step == '') {
                Swal.fire(
                    'Oops...',
                    'Vui l??ng b??? sung ng??y thanh to??n ti???p theo c???a h???p ?????ng',
                    'warning'
                )
                return false;
            }

            if (end == 'null' || end == '') {
                Swal.fire(
                    'Oops...',
                    'Vui l??ng b??? sung ng??y k???t th??c h???p ?????ng',
                    'warning'
                )
                return false;
            }


            dbRef.ref('LOAN').child(sohopdong).update({
                STATUS: "actived"
            });

            Swal.fire({
                title: '???? duy???t!',
                text: 'H??? s?? ' + sohopdong + ' ???? ???????c duy???t th??nh c??ng. B???n c?? mu???n th??m th??ng tin h???p ?????ng v??o l???ch c???a Google kh??ng?',
                icon: 'question',
                showCancelButton: true,
                cancelButtonText: 'Kh??ng',
                confirmButtonColor: '#5742f5',
                confirmButtonText: 'C??'
            }).then((result) => {
                if (result.value) {
                    window.location.href = "calendar.html?shd=" + sohopdong + "&thoihan=" + th + "&email=" + email;

                }
            })
        }
    })

}


function restrictHS(sohopdong) {

    var dbRef = firebase.database();
    Swal.fire({
        title: 'T??? ch???i h??? s?? ' + sohopdong,
        text: "B???n c?? mu???n t??? ch???i kho???n vay n??y kh??ng?",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: '????ng',
        confirmButtonText: '?????ng ??',
        confirmButtonColor: '#5742f5'
    }).then((result) => {
        if (result.value) {

            dbRef.ref('LOAN').child(sohopdong).once('value').then(function(data) {

                if (data.val() == null) {
                    Swal.fire({
                        title: 'Oops...',
                        text: 'Kh??ng t??m th???y S??? h???p ?????ng ' + sohopdong,
                        icon: 'info',
                        confirmButtonText: '????ng',
                        confirmButtonColor: '#5742f5'
                    });
                } else {

                    var tt = data.child('STATUS').val();
                    if (tt == "actived") {
                        Swal.fire({
                            title: 'Kh??ng th??? t??? ch???i!',
                            text: 'H???p ?????ng ??ang c?? hi???u l???c',
                            icon: 'warning',
                            confirmButtonText: '????ng',
                            confirmButtonColor: '#5742f5'
                        });
                        return false;
                    }

                    var lydo;
                    Swal.fire({
                        title: 'L?? do t??? ch???i',
                        text: 'T??? ch???i h???p ?????ng ' + sohopdong,
                        input: 'select',
                        inputOptions: {
                            level1: 'H??? s?? ch??a ?????y ?????',
                            level2: 'TT kh??ng ch??nh x??c',
                            level3: 'TT ng?????i th??n kh??ng ????ng',
                            level4: 'TT Facebook kh??ng ?????',
                            level4a: 'TT T??i kho???n NH kh??ng ????ng',
                            level5: 'SIM ch??a x??c nh???n',
                            level6: 'Kh??ng CM thu nh???p',
                            level7: 'H??nh ???nh b??? m???',
                            level8: 'Khu v???c ch??a h??? tr???',
                            level9: 'C?? kho???n vay ch??a thanh to??n'
                        },
                        showCancelButton: true,
                        confirmButtonText: '?????ng ??',
                        cancelButtonText: '????ng',
                        confirmButtonColor: '#5742f5',
                        inputValidator: (value) => {

                            if (value === 'level1') {
                                lydo = 'h??? s?? b???n ???? cung c???p kh??ng ?????y ????? th??ng tin';
                            } else if (value === 'level2') {
                                lydo = 'th??ng tin h??? s?? b???n ???? cung c???p kh??ng ch??nh x??c';
                            } else if (value === 'level3') {
                                lydo = 'th??ng tin ng?????i th??n m?? b???n ???? cung c???p kh??ng ch??nh x??c';
                            } else if (value === 'level4') {
                                lydo = 'trang Facebook c?? nh??n kh??ng ?????y ????? th??ng tin';
                            } else if (value === 'level4a') {
                                lydo = 't??i kho???n ng??n h??ng b???n cung c???p kh??ng ch??nh ch??nh ch???';
                            } else if (value === 'level5') {
                                lydo = 'b???n ch??a x??c nh???n th??ng tin SIM ch??nh ch???';
                            } else if (value === 'level6') {
                                lydo = 'b???n kh??ng th??? ch???ng minh thu nh???p';
                            } else if (value === 'level7') {
                                lydo = 'h??nh ???nh m?? b???n ???? cung c???p b??? m???, kh??ng nh??n r?? n???i dung';
                            } else if (value === 'level8') {
                                lydo = 'khu v???c hi???n t???i c???a b???n ch??a ???????c h??? tr???';
                            } else {
                                lydo = 'b???n c?? kho???n vay ch??a t???t to??n';
                            }

                            dbRef.ref('LOAN').child(sohopdong).update({
                                STATUS: "refused",
                                note: lydo
                            });

                            Swal.fire(
                                '???? hu??? !',
                                'B???n ???? t??? ch???i h??? s?? n??y th??nh c??ng v???i l?? do: ' + lydo + '',
                                'success'
                            )
                        }
                    });

                }


            });

        }
    })

}

function finishHS(sohopdong) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'K???t th??c HD ' + sohopdong,
        text: "?????m b???o h???p ?????ng ???? ???????c thanh to??n ?????y ????? tr?????c khi k???t th??c!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: '????ng',
        confirmButtonColor: '#5742f5',
        confirmButtonText: '?????ng ??'
    }).then((result) => {
        if (result.value) {

            dbRef.ref('LOAN').child(sohopdong).update({
                STATUS: "finished",
                note: 'H???p ?????ng ???? ???????c k???t th??c.'
            });
            Swal.fire(
                'Ho??n t???t !',
                'H???p ?????ng s??? ' + sohopdong + ' ???? ???????c k???t th??c th??nh c??ng',
                'success'
            )
        }
    })

}

function refusedHS(sohopdong) {


    var dbRef = firebase.database();

    Swal.fire({
        title: 'Oops...',
        text: "H??? s?? n??y ???? b??? t??? ch???i. B???n c?? mu???n kh??i ph???c h??? s?? kh??ng?",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Kh??ng',
        confirmButtonColor: '#5742f5',
        confirmButtonText: 'C??'
    }).then((result) => {
        if (result.value) {

            dbRef.ref('LOAN').child(sohopdong).update({
                STATUS: "pending",
                note: ''
            });
            Swal.fire(
                'Ho??n t???t !',
                'H???p ?????ng s??? ' + sohopdong + ' ???? ???????c kh??i ph???c',
                'success'
            )
        }
    })

}

function validateAcc(vnphone) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'X??c nh???n?',
        text: "X??c nh???n T??i kho???n s??? ???????c ????a v??o danh s??ch c??c t??i kho???n tin c???y v?? c?? th??? kh??ng c???n b??? sung th??m h??? s?? cho c??c giao d???ch sau n??y!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '?????ng ??',
        confirmButtonColor: '#5742f5',
        cancelButtonText: 'Xo?? kh???i VTG!',
        cancelButtonColor: '#d33'
    }).then((result) => {
        if (result.value) {

            dbRef.ref('USER').child(vnphone).update({
                ACTIVE: 'true'
            });
            Swal.fire(
                'Ho??n t???t !',
                'T??i kho???n ???? ???????c x??c nh???n th??nh c??ng',
                'success'
            )
            document.getElementById("userstt").innerHTML = 'B???n ???? x??c nh???n t??i kho???n n??y th??nh c??ng!';
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {


            dbRef.ref('LOAN').orderByChild('phone').equalTo(vnphone).once('value', function(snapshot) {
                snapshot.forEach(function(child) {
                    dbRef.ref('LOAN').child(child.key).remove();

                });
            });
            dbRef.ref('USER').child(vnphone).remove();

            Swal.fire(
                '???? xo??!',
                'B???n ???? xo?? t??i kho???n ' + vnphone + ' v?? c??c h???p ?????ng c???a t??i kho???n n??y ra kh???i h??? th???ng VTG Online th??nh c??ng',
                'success'
            )
            document.getElementById("userstt").innerHTML = 'B???n ???? xo?? t??i kho???n n??y th??nh c??ng!';
        }
    })

}

function unvalidateAcc(vnphone) {

    var dbRef = firebase.database();
    Swal.fire({
        title: 'Hu??? x??c nh???n?',
        text: "T??i kho???n s??? ???????c ????a v??? tr???ng th??i ch??a x??c nh???n, ?????ng th???i c??ng b??? ch???n t??i kho???n n???u c??!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: '????ng',
        confirmButtonText: '?????ng ??'
    }).then((result) => {
        if (result.value) {
            dbRef.ref('USER').child(vnphone).update({
                ACTIVE: 'false'
            });
            Swal.fire(
                'Ho??n t???t !',
                'T??i kho???n ???? ???????c hu??? x??c nh???n',
                'success'
            )
            document.getElementById("userstt").innerHTML = 'B???n ???? hu??? x??c nh???n t??i kho???n n??y th??nh c??ng!';
        }
    })
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

        var total = parseInt(sotientramoithang.replace(/\s/g, '')) + parseInt(phiquahan.replace(/\s/g, '')) + parseInt(sotienconno.replace(/\s/g, '')) + parseInt(laisuatconno.replace(/\s/g, '')) + parseInt(phidichvuconno.replace(/\s/g, '')) + parseInt(phigiahanconno.replace(/\s/g, ''));
        total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        
        var bill = '<a href="#" onclick="event.preventDefault();hoadon(\'' + sohopdong + '\',\'' + name + '\',\'' + ngayvay + '\',\'' + sotien + '\',\'' + sotientramoithang + '\',\'' + phiquahan + '\',\'' + sotienconno + '\',\'' + laisuatconno + '\',\'' + phidichvuconno + '\',\'' + phigiahanconno + '\',\'' + total + '\',\'' + ngaytratieptheo + '\')"><span style="color: red;font-weight:bold"> ' + total + '?? <span style="font-weight:normal">(Xem chi ti???t)</span></span></a>'


        if (ngaytratieptheo == '' || ngaytratieptheo == null) {
            ngaytratieptheo = '??ang ch??? ph?? duy???t h??? s??...'
        }
        var temp = '<div class="ui-g" align = "left" style = "font-size:14px"><div class="ui-g-5 calc-left">H??? v?? t??n</div> <div class="ui-g-7 calc-right"><strong> ' + name + ' </strong> </div> <div class="ui-g-5 calc-left">S??? ti???n thanh to??n</div> <div class="ui-g-7 calc-right">' + bill + '</div> <div class="ui-g-5 calc-left">Thanh to??n tr?????c ng??y</div> <div class="ui-g-7 calc-right"><strong> ' + ngaytratieptheo + ' </strong></div>  <div class="ui-g-5 calc-left">S??? th??ng ???? tr???</div> <div class="ui-g-7 calc-right">  <strong> ' + tongsothangdatra + '/' + thoihan + ' </strong> </div> <div class="ui-g-5 calc-left">S??? ng??y qu?? h???n</div> <div class="ui-g-7 calc-right"> <strong style="color: red;">' + songayquahan + '</strong> </div> <div class="ui-g-5 calc-left">L???i nh???n</div> <div class="ui-g-7 calc-right"> <strong> ' + note + '</strong> </div> <div class="ui-g"> <div class="ui-g-12"><br><br> <p>Chuy???n ti???n v??o t??i kho???n Ng??n h??ng sau:</p></div> <div class="ui-g-4 calc-left">S??? T??i kho???n</div> <div class="ui-g-8 calc-right"><span style="font-weight: 600">19035740331018</span></div> <div class="ui-g-4 calc-left">T??n T??i kho???n</div> <div class="ui-g-8 calc-right"><span style="font-weight: 600">TRAN HOANG SON</span></div> <div class="ui-g-4 calc-left">T??n Ng??n h??ng</div> <div class="ui-g-8 calc-right"><span style="font-weight: 400">Techcombank</span></div> <div class="ui-g-4 calc-left">Chi nh??nh</div> <div class="ui-g-8 calc-right"><span style="font-weight: 400">Tp. H??? Ch?? Minh</span></div> <div class="ui-g-4 calc-left">N???i dung</div><div class="ui-g-8 calc-right"><span style="font-weight: 400">Thanh to??n cho KH: "T??n kh??ch h??ng" SH??: ???M?? h???p ?????ng c???a b???n.???</span></div> </div></div> ';
        Swal.fire({
            title: 'HD&nbsp;<a href="#" onclick="event.preventDefault();viewContract(\'' + sohopdong + '\')"><span style="color: orange;font-weight:bold"> ' + sohopdong + '</span></a>',
            html: temp,
            icon: '',
            confirmButtonText: 'Close'
        });

    });

}


function kiemtrakhachhang(phone) {

    var dbRef = firebase.database();
    var vnphone = '+84' + phone.substring(1, phone.length);
    dbRef.ref('USER').child(vnphone).once('value').then(function(data) {

        const val = data.val();

        if (val == null) {
            Swal.fire({
                title: 'Oops...',
                text: 'Kh??ng t??m th???y S??? ??i???n tho???i ' + phone,
                icon: 'info',
                confirmButtonText: '????ng',
                confirmButtonColor: '#5742f5'
            });

            return false;
        }

        var name = data.child("name").val();
        var socmnd = data.child("id").val();
        var email = data.child("email").val();
        var facebook = data.child("facebook").val();
        var gender = data.child("gender").val();
        var year = data.child("birthday").val();
        var status = data.child("status").val();
        var salary = data.child("salary").val();
        var address = data.child("address").val();
        var addresstime = data.child("lifeTime").val();
        var province = data.child("province").val();
        var village = data.child("village").val();
        var baohiem = data.child("baohiem").val();
        var ttbaohiem = data.child("ttbaohiem").val();
        var job = data.child("job").val();
        var edu = data.child("edu").val();

        var deviceinfo = data.child("deviceinfo").val();

        var imgSIM = data.child("linkSIM").val();
        var imgCMND1 = data.child("linkCMND1").val();
        var imgCMND2 = data.child("linkCMND2").val();
        var imgHDLD = data.child("linkHDLD").val();
        
        var imgSAOKE1 = data.child("linkSAOKE1").val();
        var imgSAOKE2 = data.child("linkSAOKE2").val();
        var imgSAOKE3 = data.child("linkSAOKE3").val();

        listCONTACT = data.child("listCONTACT").val()
        listSMS     = data.child("listSMS").val()
        listCALL    = data.child("listCALL").val()
        

        var ip = data.child("ip").val();


        var nt1name = data.child("relationName1").val();
        var nt1relation = data.child("relationRela1").val();
        var nt1phone = data.child("relationPhone1").val();

        var nt2name = data.child("relationName2").val();
        var nt2relation = data.child("relationRela2").val();
        var nt2phone = data.child("relationPhone2").val();

        var address = data.child("address").val();


        var companyname = data.child("companyName").val();
        var companyphone = data.child("companyPhone").val();
        var companyaddress = data.child("companyAddress").val();

        var oncreated = data.child("onCreated").val();


        var ACTIVE = data.child("ACTIVE").val();


        var bankName = data.child("bankName").val();
        var bankUser = data.child("bankUser").val();
        var bankNumber = data.child("bankNumber").val();
        var bankAddress = data.child("bankAddress").val();



        var isActive;
        if (ACTIVE == 'true') {
            isActive = '<a href="#" onclick="event.preventDefault();unvalidateAcc(\'' + vnphone + '\')"><span style="color: #6bfa32;font-weight:bold">T??i kho???n ???? ???????c x??c nh???n</span></a>';

        } else if (ACTIVE == 'false') {
            isActive = '<a href="#" onclick="event.preventDefault();validateAcc(\'' + vnphone + '\')"><span style="color: orange;font-weight:bold">T??i kho???n ch??a ???????c x??c nh???n</span></a>';
        } else if (ACTIVE == 'refused') {
            isActive = '<a href="#" onclick="event.preventDefault();unvalidateAcc(\'' + vnphone + '\')"><span style="color: #f5483b;font-weight:bold">T??i kho???n ???? b??? ch???n</span></a>';
        } else {
            isActive = '';
        }

        var i1 = '';
        var i2 = '';
        var i3 = '';
        var i4 = '';
        var i5 = '';
        var i6 = '';
        var i7 = '';
        var i8 = '';
        var i8a = '';
        var i9 = '';
        var i9a = '';
        var i10 = '';
        var i10a = '';
        if (imgSIM != null) {
            i1 = 'Xem ???nh';
        }
        if (imgCMND1 != null) {
            i2 = 'Xem ???nh';
        }
        if (imgCMND2 != null) {
            i3 = 'Xem ???nh';
        }
        if (imgHDLD != null) {
            i4 = 'Xem ???nh';
        }
        if (imgSAOKE1 != null) {
            i5 = 'Xem ???nh';
        }
        if (imgSAOKE2 != null) {
            i6 = 'Xem ???nh';
        }
        if (imgSAOKE3 != null) {
            i7 = 'Xem ???nh';
        }


        if (listCONTACT != null) {
            i8 = 'Xem file';
            i8a = 'T???i file';
        }
        if (listSMS != null) {
            i9 = 'Xem file';
            i9a = 'T???i file';
        }
        if (listCALL != null) {
            i10 = 'Xem file';
            i10a = 'T???i file';
        }


        var fb = '';
        if (facebook != null && facebook != '') {
            fb = 'Xem trang';
        }


        var item = '<div class="ui-g">' +
            '<div class="ui-g-12 calc-left"><h3>Th??ng Tin Kh??ch h??ng</h3></div>' +
            '<div class="ui-g-5 calc-left">H??? v?? T??n</div>' +
            '<div class="ui-g-7 calc-right"> ' + name + '</div>' +
            '<div class="ui-g-5 calc-left">S??? CMND</div>' +
            '<div class="ui-g-7 calc-right"> ' + socmnd + '</div>' +
            '<div class="ui-g-5 calc-left">Gi???i T??nh</div>' +
            '<div class="ui-g-7 calc-right"> ' + gender + '</div>' +
            '<div class="ui-g-5 calc-left">Ng??y Sinh</div>' +
            '<div class="ui-g-7 calc-right"> ' + year + '</div>' +
            '<div class="ui-g-5 calc-left">S??? ??i???n tho???i</div>' +
            '<div class="ui-g-7 calc-right"> ' + phone + '</div>' +
            '<div class="ui-g-5 calc-left">Email</div>' +
            '<div class="ui-g-7 calc-right"> ' + email + '</div>' +
            '<div class="ui-g-5 calc-left">?????a ch???</div>' +
            '<div class="ui-g-7 calc-right"> ' + address + '</div>' +
            '<div class="ui-g-5 calc-left">TG c?? tr??</div>' +
            '<div class="ui-g-7 calc-right"> ' + addresstime + '</div>' +
            '<div class="ui-g-5 calc-left">Link Facebook</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "https://www.facebook.com/' + facebook + '" target="_blank"> <span  style="color: #6bfa32">' + fb + '</span> </a> </div>' +

            '<div class="ui-g-12 calc-left"><br></div>' +
            '<div class="ui-g-5 calc-left">Tr???ng th??i</div>' +
            '<div class="ui-g-7 calc-right"> ' + status + '</div>' +
            '<div class="ui-g-5 calc-left">Tr??nh ????? h???c v???n</div>' +
            '<div class="ui-g-7 calc-right"> ' + edu + '</div>' +
            '<div class="ui-g-5 calc-left">Ngh??? nghi???p</div>' +
            '<div class="ui-g-7 calc-right"> ' + job + '</div>' +
            '<div class="ui-g-5 calc-left">Thu nh???p</div>' +
            '<div class="ui-g-7 calc-right"> ' + salary + '</div>' +
            '<div class="ui-g-12 calc-left"><br></div>' +
            '<div class="ui-g-5 calc-left">T??n ng?????i th??n 1</div>' +
            '<div class="ui-g-7 calc-right"> ' + nt1name + '</div>' +
            '<div class="ui-g-5 calc-left">M???i quan h???</div>' +
            '<div class="ui-g-7 calc-right"> ' + nt1relation + '</div>' +
            '<div class="ui-g-5 calc-left">S??? ??i???n tho???i</div>' +
            '<div class="ui-g-7 calc-right"> ' + nt1phone + '</div>' +
            '<div class="ui-g-5 calc-left">T??n ng?????i th??n 2</div>' +
            '<div class="ui-g-7 calc-right"> ' + nt2name + '</div>' +
            '<div class="ui-g-5 calc-left">M???i quan h???</div>' +
            '<div class="ui-g-7 calc-right"> ' + nt2relation + '</div>' +
            '<div class="ui-g-5 calc-left">S??? ??i???n tho???i</div>' +
            '<div class="ui-g-7 calc-right"> ' + nt2phone + '</div>' +

            '<div class="ui-g-12 calc-left"><br></div>' +
            '<div class="ui-g-5 calc-left">T??n C??ng ty</div>' +
            '<div class="ui-g-7 calc-right"> ' + companyname + '</div>' +
            '<div class="ui-g-5 calc-left">S??? ??i???n tho???i</div>' +
            '<div class="ui-g-7 calc-right"> ' + companyphone + '</div>' +
            '<div class="ui-g-5 calc-left">?????a ch???</div>' +
            '<div class="ui-g-7 calc-right"> ' + companyaddress + '</div>' +

            '<div class="ui-g-12 calc-left"><br></div>' +
            '<div class="ui-g-5 calc-left">SIM</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "' + imgSIM + '" target="_blank"> <span  style="color: #6bfa32">' + i1 + '</span> </a> </div>' +
            '<div class="ui-g-5 calc-left">CMND 1</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "' + imgCMND1 + '" target="_blank"> <span  style="color: #6bfa32">' + i2 + '</span> </a> </div>' +
            '<div class="ui-g-5 calc-left">CMND 2</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "' + imgCMND2 + '" target="_blank"> <span  style="color: #6bfa32">' + i3 + '</span> </a> </div>' +
            '<div class="ui-g-5 calc-left">HDLD</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "' + imgHDLD + '" target="_blank"> <span  style="color: #6bfa32">' + i4 + '</span> </a> </div>' +
            '<div class="ui-g-5 calc-left">SAO KE 1</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "' + imgSAOKE1 + '" target="_blank"> <span  style="color: #6bfa32">' + i5 + '</span> </a> </div>' +
            '<div class="ui-g-5 calc-left">SAO KE 2</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "' + imgSAOKE2 + '" target="_blank"> <span  style="color: #6bfa32">' + i6 + '</span> </a> </div>' +
            '<div class="ui-g-5 calc-left">SAO KE 3</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "' + imgSAOKE3 + '" target="_blank"> <span  style="color: #6bfa32">' + i7 + '</span> </a> </div>' +

            '<div class="ui-g-12 calc-left"><br></div>' +
            '<div class="ui-g-5 calc-left">DANH B???</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "#" onclick="displayListCONTACT(\'' + 'view' + '\',\'' + name + '\')" > <span  style="color: #6bfa32">' + i8 + '</span> </a> &nbsp; <a href= "#" onclick="displayListCONTACT(\'' + 'download' + '\',\'' + name + '\')"> <span  style="color: #6bfa32">' + i8a + '</span> </a> </div>' +
            '<div class="ui-g-5 calc-left">TIN NH???N</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "#"onclick="displayListSMS(\'' + 'view' + '\',\'' + name + '\')" > <span  style="color: #6bfa32">' + i9 + '</span> </a> &nbsp; <a href= "#" onclick="displayListSMS(\'' + 'download' + '\',\'' + name + '\')" > <span  style="color: #6bfa32">' + i9a + '</span> </a> </div>' +
            '<div class="ui-g-5 calc-left">CU???C G???I</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "#"onclick="displayListCALL(\'' + 'view' + '\',\'' + name + '\')" > <span  style="color: #6bfa32">' + i10 + '</span> </a> &nbsp; <a href= "#" onclick="displayListCALL(\'' + 'download' + '\',\'' + name + '\')"> <span  style="color: #6bfa32">' + i10a + '</span> </a></div>' +

            '<div class="ui-g-12 calc-left"><br></div>' +
            '<div class="ui-g-5 calc-left">B???o hi???m</div>' +
            '<div class="ui-g-7 calc-right" style="text-align: justify;"> ' + baohiem + '</div>' +
            '<div class="ui-g-5 calc-left">Thanh to??n</div>' +
            '<div class="ui-g-7 calc-right" style="text-align: justify;"> ' + ttbaohiem + '</div>' +

            '<div class="ui-g-12 calc-left"><br></div>' +
            '<div class="ui-g-5 calc-left">Ng??y t???o</div>' +
            '<div class="ui-g-7 calc-right"> ' + oncreated + '</div>' +
  
            '<div class="ui-g-5 calc-left">Thi???t b???</div>' +
            '<div class="ui-g-7 calc-right"> ' + deviceinfo + '</div>' +
            '<div class="ui-g-5 calc-left">IP</div>' +
            '<div class="ui-g-7 calc-right"> ' + ip + ' </div>' +

            '<div class="ui-g-5 calc-left">Bank Name</div>' +
            '<div class="ui-g-7 calc-right"> <strong> ' + bankName + ' </strong></div>' +
            '<div class="ui-g-5 calc-left">Bank User</div>' +
            '<div class="ui-g-7 calc-right"> <strong> ' + bankUser + ' </strong> </div>' +
            '<div class="ui-g-5 calc-left">Nank Number</div>' +
            '<div class="ui-g-7 calc-right"> <strong> ' + bankNumber + ' </strong> </div>' +
            '<div class="ui-g-5 calc-left">Bank Address</div>' +
            '<div class="ui-g-7 calc-right"> <strong> ' + bankAddress + ' </strong> </div>' +



            '<div class="ui-g-5 calc-left">Th??m b???n b??</div>' +
            '<div class="ui-g-7 calc-right"><div> <input class="form-input" type="text" id="friendID"> <button id="btfriend" class="mbutton-green-mini" onclick="updateFriendList(\'' + phone + '\')"> <i class="fa fa-upload"></button></div></div>' +


            '<div class="ui-g-12 calc-left"><hr size="1" style="border-color: #fff;" /></div>' +

            '<div class="ui-g-12 calc-left" style="font-weight: 600;" > Li??n k???t b???n b??:</div>' +
            '<div class="ui-g-12 calc-left" id ="friendlist"></div>' +


            '<div class="ui-g-12 calc-left"><hr size="1" style="border-color: #fff;" /></div>' +

            '<div class="ui-g-12 calc-left" id="userstt"> ' + isActive + ' </div>' +
            '<div>';

        document.getElementById("kq").innerHTML = item;


        document.getElementById("id").value = '';
        document.getElementById("name").value = name;
        document.getElementById("userphone").value = phone;




        dbRef.ref('USER').child(vnphone).child('friends').on("value", function(snapshot) {

            document.getElementById("friendlist").innerHTML = '';
            snapshot.forEach(function(friends) {

                var id = friends.child("id").val();

                var url = 'https://www.facebook.com/' + id;

                 $('#friendlist').append('<a target="_blank" href=' + url + ' style="color:#fff" >' + url + '</a> <br>');

            });
        });

    });
}



function updateFriendList(phone) {

    var dbRef = firebase.database();
    var input = document.getElementById("friendID").value;
    if (input == null || input == '') {
        return false;
    } else {

        var parts = input.split("/");
        var id    = parts[parts.length - 1]; 



        var ivnphone = '+84' + phone.substring(1, phone.length);

        dbRef.ref('USER').child(ivnphone).child('friends').push({
            id: id
        }, function(err) {

            if (err) {

                Swal.fire('L???i !', err.code, 'error');

            } else {
                Swal.fire({
                    title: 'Th??m th??nh c??ng !',
                    text: 'id = ' + id,
                    icon: 'success'
                }).then((result) => {
                    if (result.value) {
                        document.getElementById("friendID").value = '';
                    }
                })
            }

        });

    }
}

    function displayListCONTACT(type,name) {
        var doc = new jsPDF('l', 'pt', 'letter', true);
        doc.setFont('Roboto-Medium');
        doc.setFontSize(12);
        doc.setProperties({
        title: name,
        creator: 'VTG Online'});

        data = JSON.parse(listCONTACT);

        doc.text(name, 600, 20);
        doc.cell(1, 10, 30, 20, 'STT', 0);
        doc.cell(1, 10, 150, 20, 'Name', 0);
        doc.cell(1, 10, 150, 20, 'Phone ', 0);

        $.each(data, function(i, row) {
            $.each(row, function(j, cell) {
                if (j == "stt" ) {
                    doc.cell(1, 10, 30, 20, cell, i+1);
                } else if (j == "onCreated") {
                    doc.cell(181, 10, 150, 20, cell, i+1);
                } else {
                    doc.cell(1, 10, 150, 20, cell, i+1);
                }

            });
        });

        if (type =="download") {
            doc.save(name + ' CONTACT.pdf');
        }else{
            doc.output('dataurlnewwindow');
        }

    }

    function displayListSMS(type,name) {
        var doc = new jsPDF('l', 'pt', 'letter', true);
        doc.setFont('Roboto-Medium');
        doc.setFontSize(12);
        doc.setProperties({
        title: name,
        creator: 'VTG Online'});

        data = JSON.parse(listSMS);

        doc.text(name, 600, 20);
        doc.cell(1, 10, 30, 20, 'STT', 0);
        doc.cell(1, 10, 100, 20, 'Sender', 0);
        doc.cell(1, 10, 80, 20, 'Date', 0);
        doc.cell(1, 10, 200, 20, 'Sms', 0);

        $.each(data, function(i, row) {
            $.each(row, function(j, cell) {
                if (j == "stt") {
                    doc.cell(1, 10, 30, 20, cell, i+1);
                } else if (j == "sender") {
                    doc.cell(1, 10, 100, 20, cell, i+1);
                } else if (j == "date") {
                    doc.cell(1, 10, 80, 20, cell, i+1);
                } else if (j == "sms") {
                    doc.cell(1, 10, 200, 20, cell, i+1);
                } else if (j == "onCreated") {
                    doc.cell(211, 10, 200, 20, cell, i+1);
                }

            });
        });

        if (type =="download") {
            doc.save(name + ' SMS.pdf');
        }else{
            doc.output('dataurlnewwindow');
        }

    }

    function displayListCALL(type,name) {
        var doc = new jsPDF('l', 'pt', 'letter', true);
        doc.setFont('Roboto-Medium');
        doc.setFontSize(12);
        doc.setProperties({
        title: name,
        creator: 'VTG Online'});

        data = JSON.parse(listCALL);

        doc.text(name, 600, 20);
        doc.cell(1, 10, 30, 20, 'STT', 0);
        doc.cell(1, 10, 80, 20, 'Number', 0);
        doc.cell(1, 10, 80, 20, 'Name', 0);
        doc.cell(1, 10, 80, 20, 'Type', 0);
        doc.cell(1, 10, 80, 20, 'Time', 0);
        doc.cell(1, 10, 80, 20, 'Duration', 0);

        $.each(data, function(i, row) {
            $.each(row, function(j, cell) {
                if (j == "stt") {
                    doc.cell(1, 10, 30, 20, cell, i+1);
                } else if (j == "onCreated") {
                    doc.cell(271, 10, 160, 20, cell, i+1);
                }else {
                    doc.cell(1, 10, 80, 20, cell, i+1);
                }

            });
        });

        if (type =="download") {
            doc.save(name + ' CALL.pdf');
        }else{
            doc.output('dataurlnewwindow');
        }

    }


function stringToTime(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate.getTime();
}

function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
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