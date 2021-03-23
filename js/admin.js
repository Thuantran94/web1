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
            title: 'Xoá thông báo !',
            text: "Bạn có muốn xoá tất cả các thông báo hiện có không?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Đóng',
            confirmButtonColor: '#5742f5'
        }).then((result) => {
            if (result.value) {

                dbRef.ref('NOTI').remove();
                Swal.fire(
                    'Xoá thành công !',
                    'Đã xoá tất cả các thông báo',
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
            title: 'Xoá HS rác !',
            text: "Bạn có muốn xoá tất cả các hồ sơ rác hiện có không?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Đóng',
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
                    title: 'Đã xoá HS rác !',
                    text: 'Các hồ sơ đã bị từ chối hơn 10 ngày đã được xoá ra khỏi hệ thống thành công',
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
                        statushd = '<span style="color: white;font-weight:bold">Hợp đồng đã được kết thúc</span>';
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
            text: "Bạn có muốn cập nhật số ngày quá hạn không?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Để sau',
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

        var temp = ' <input type="tel" id="n1" placeholder="Số hợp đồng" maxlength="6"/>';

        Swal.fire({
            title: 'Thông tin hợp đồng',
            html: temp,
            icon: '',
            confirmButtonText: 'Tiếp tục &rarr;'
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

        var temp = ' <input type="tel" id="n1" placeholder="Số hợp đồng" maxlength="6"/>';

        Swal.fire({
            title: 'Thông tin thanh toán',
            html: temp,
            icon: '',
            confirmButtonText: 'Tiếp tục &rarr;'
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

        var temp = ' <input type="tel" id="n1" placeholder="Số điện thoại" maxlength="10"/>';

        Swal.fire({
            title: 'Thông tin tài khoản',
            html: temp,
            icon: '',
            confirmButtonText: 'Tiếp tục &rarr;'
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
                title: 'Lỗi !',
                text: 'Tên Khách hàng không chính xác',
                icon: 'error',
                confirmButtonText: 'Đóng',
                confirmButtonColor: '#5742f5'
            });
        } else {

            dbRef.ref('LOAN').orderByChild('name').equalTo(iname).on("value", function(snapshot) {


                var val = snapshot.val();
                if (val == null) {
                    Swal.fire({
                        title: 'Oops...',
                        text: 'Không tìm thấy hợp đồng nào của Khách hàng ' + iname,
                        icon: 'info',
                        confirmButtonText: 'Đóng',
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
                title: 'Lỗi !',
                text: 'Số điện thoại không chính xác',
                icon: 'error',
                confirmButtonText: 'Đóng',
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
                title: 'Lỗi !',
                text: 'Số hợp đồng không chính xác',
                icon: 'error',
                confirmButtonText: 'Đóng',
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
                title: 'Lỗi !',
                text: 'Số hợp đồng không chính xác',
                icon: 'error',
                confirmButtonText: 'Đóng',
                confirmButtonColor: '#5742f5'
            });
            return false;
        }

        Swal.fire({
            title: 'Xoá hồ sơ?',
            text: "Hồ sơ " + id + " sẽ được xoá khỏi hệ thống của VTG Online",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Đóng',
            confirmButtonText: 'Đồng ý',
            confirmButtonColor: '#5742f5'
        }).then((result) => {
            if (result.value) {

                dbRef.ref('LOAN').child(id).once('value').then(function(data) {


                    if (data.val() == null) {
                        Swal.fire({
                            title: 'Oops...',
                            text: 'Không tìm thấy Số hợp đồng ' + id,
                            icon: 'info',
                            confirmButtonText: 'Đóng',
                            confirmButtonColor: '#5742f5'
                        });
                    } else {


                        var tt = data.child('STATUS').val();
                        if (tt == "actived") {
                            Swal.fire({
                                title: 'Không thể xoá !',
                                text: 'Hợp đồng đang có hiệu lực',
                                icon: 'warning',
                                confirmButtonText: 'Đóng',
                                confirmButtonColor: '#5742f5'
                            });

                        } else {

                            dbRef.ref('LOAN').child(id).remove();

                            Swal.fire(
                                'Xoá thành công !',
                                'Hợp đồng ' + id + ' đã được xoá ra khỏi hệ thống',
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
                title: 'Lỗi !',
                text: 'Số hợp đồng không chính xác',
                icon: 'error',
                confirmButtonText: 'Đóng',
                confirmButtonColor: '#5742f5'
            });
        } else {

            dbRef.ref("LOAN").orderByChild('SHD').equalTo(shd).on("value", function(snapshot) {

                const val = snapshot.val();

                if (val == null) {
                    Swal.fire({
                        title: 'Oops...',
                        text: 'Không tìm thấy thông tin họp đồng ' + shd,
                        icon: 'info',
                        confirmButtonText: 'Đóng',
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
                title: 'Lỗi !',
                text: 'Số điện thoại không chính xác',
                icon: 'error',
                confirmButtonText: 'Đóng',
                confirmButtonColor: '#5742f5'
            });
            return false;
        }

        var ivnphone = '+84' + sdt.substring(1, sdt.length);

        Swal.fire({
            title: 'Chặn tài khoản ?',
            text: "Nghi ngờ tài khoản này cung cấp thông tin sai hoặc có gì đó bất thường xảy ra? Chặn ngay và luôn!",
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Đóng',
            confirmButtonText: 'Đồng ý',
            confirmButtonColor: '#5742f5'
        }).then((result) => {
            if (result.value) {

                dbRef.ref('USER').child(ivnphone).once('value').then(function(data) {


                    if (data.val() == null) {
                        Swal.fire({
                            title: 'Oops...',
                            text: 'Không tìm thấy Số điện thoại ' + sdt,
                            icon: 'info',
                            confirmButtonText: 'Đóng',
                            confirmButtonColor: '#5742f5'
                        });
                    } else {
                        dbRef.ref('USER').child(ivnphone).update({
                            ACTIVE: 'refused'
                        });

                        Swal.fire(
                            'Chặn thành công !',
                            'Tài khoản ' + sdt + ' sẽ không thể yêu cầu các dịch vụ từ VTG Online',
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
                title: 'Lỗi !',
                text: 'Số điện thoại không chính xác',
                icon: 'error',
                confirmButtonText: 'Đóng',
                confirmButtonColor: '#5742f5'
            });
            return false;
        }

        var ivnphone = '+84' + sdt.substring(1, sdt.length);

        Swal.fire({
            title: 'Xoá tài khoản ?',
            text: "Đồng ý xoá tài khoản và toàn bộ hợp đồng liên quan đến tài khoản này ra khỏi hệ thống của TVG Online?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Đóng',
            confirmButtonText: 'Đồng ý',
            confirmButtonColor: '#5742f5'
        }).then((result) => {
            if (result.value) {


                dbRef.ref('USER').child(ivnphone).once('value').then(function(data) {


                    if (data.val() == null) {
                        Swal.fire({
                            title: 'Oops...',
                            text: 'Không tìm thấy Số điện thoại ' + sdt,
                            icon: 'info',
                            confirmButtonText: 'Đóng',
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
                            'Đã xoá !',
                            'Bạn đã xoá tài khoản ' + sdt + ' và tất cả các hợp đồng của tài khoản này ra khỏi hệ thống VTG Online thành công',
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
            title: 'Gửi thông báo',
            html: '<textarea style="width:100%;padding:15px" rows="1" id="title" placeholder="Tiêu đề" maxlength="500"></textarea> <p> Nội dung </p>  <textarea style="width:100%;padding:15px" rows="10" id="context" placeholder="Định dạng html" maxlength="5000"></textarea>'
        }).then((result) => {
            if (result.value) {


                var title = document.getElementById("title").value;
                var context = document.getElementById("context").value;


                if (title.length < 10 || context.length < 10) {
                    Swal.fire('Lỗi !', 'Nội dung thông báo quá ngắn', 'error');
                } else {

                    dbRef.ref('NOTI').push({
                        title: title,
                        context: context
                    });
                    Swal.fire(
                        'Đã cập nhật !',
                        'Thông báo ' + title + ' đã được thêm',
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
        title: 'Số tiền vay',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        inputValue: sotien,
        cancelButtonText: 'Đóng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (msotien) => {

            if (msotien == '' || msotien == null) {
                return false;
            }

            var st = parseInt(msotien.replace(/\s/g, ''));

            if (st < 1000000 || st > 10000000) {

                Swal.fire(
                    'Lỗi !',
                    'Số tiền không nằm trong khoản giải ngân cho phép',
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
                'Đã cập nhật !',
                'Số tiền vay đã được thay đổi thành ' + msotien + ' đ',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}


function update_thoi_han_vay(sohopdong, sotien, thoihan) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'Thời hạn vay',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: thoihan,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Đóng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (mthoihan) => {


            var th = parseInt(mthoihan);
            if (th < 1 || th > 6 || !(/^-?\d*$/.test(mthoihan))) {

                Swal.fire(
                    'Lỗi !',
                    'Thời hạn không nằm trong khoản cho phép',
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
                'Đã cập nhật !',
                'Thời hạn vay đã được thay đổi thành ' + mthoihan + ' tháng',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}



function update_so_tien_tra_moi_thang(sohopdong, sotientramoithang) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'Trả mỗi tháng',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: sotientramoithang,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Đóng',
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
                'Đã cập nhật !',
                'Số tiền trả mỗi tháng đã được thay đổi thành ' + mtramoithang + 'đ',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}


function update_so_tien_con_no(sohopdong, sotienconno) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'Dư nợ gốc',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: sotienconno,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Đóng',
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
                'Đã cập nhật !',
                'Tiền gốc còn nợ đã được thay đổi thành ' + stcn + 'đ',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}




function update_lai_suat_con_no(sohopdong, laisuatconno) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'Dư nợ lãi suất',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: laisuatconno,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Đóng',
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
                'Đã cập nhật !',
                'Lãi suất còn nợ đã được thay đổi thành ' + lscn + 'đ',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}


function update_phi_dich_vu_con_no(sohopdong, phidichvuconno) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'Nợ phí dịch vụ',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: phidichvuconno,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Đóng',
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
                'Đã cập nhật !',
                'Phí dịch vụ còn nợ đã được thay đổi thành ' + pdvcn + 'đ',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}

function update_phi_gia_han_con_no(sohopdong, phigiahanconno) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'Nợ phí gia hạn',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: phigiahanconno,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Đóng',
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
                'Đã cập nhật !',
                'Phí gia hạn còn nợ đã được thay đổi thành ' + pghcn + 'đ',
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}


function update_ngay_vay(sohopdong, ngayvay) {

    var dbRef = firebase.database();


    Swal.fire({
        title: 'Ngày vay',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: ngayvay,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Đóng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (nv) => {

            if (nv.length != 10) {

                Swal.fire('Lỗi !', 'Định dạng ngày DD/MM/YYYY', 'error')
                return false;
            }

            dbRef.ref('LOAN').child(sohopdong).update({
                ngayvay: nv
            });

            Swal.fire(
                'Đã cập nhật !',
                'Ngày bắt đầu hợp đồng là ngày ' + nv,
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}


function update_ngay_ket_thuc(sohopdong, ngayketthuc) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'Ngày kết thúc',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: ngayketthuc,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Đóng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (nkt) => {

            if (nkt.length != 10) {
                Swal.fire('Lỗi !', 'Định dạng ngày DD/MM/YYYY', 'error')
                return false;
            }

            dbRef.ref('LOAN').child(sohopdong).update({
                ngayketthuc: nkt
            });

            Swal.fire(
                'Đã cập nhật !',
                'Ngày kết thúc hợp đồng là ngày ' + nkt,
                'success'
            )
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}



function update_ngay_tra_tiep_theo(sohopdong, ngaytratieptheo) {

    var dbRef = firebase.database();


    Swal.fire({
        title: 'Ngày trả tiếp theo',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: ngaytratieptheo,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Đóng',
        confirmButtonColor: '#5742f5',
        showLoaderOnConfirm: true,
        preConfirm: (nttt) => {

            if (nttt.length != 10) {
                Swal.fire('Lỗi !', 'Định dạng ngày DD/MM/YYYY', 'error')
                return false;
            }

            dbRef.ref('LOAN').child(sohopdong).update({
                ngaytratieptheo: nttt
            });

            Swal.fire(
                'Đã cập nhật !',
                'Ngày thanh toán tiếp theo là ngày ' + nttt,
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
        title: 'Số ngày quá hạn',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: songayquahan,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Đóng',
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
                    nnote = 'Quá hạn ' + songayqh + ' ngày trong T' + mm + '/' + yyyy + '.';

                } else {
                    nnote = 'Đề nghị tất toán hợp đồng.';

                }

            }

            dbRef.ref('LOAN').child(sohopdong).update({
                songayquahan: songayqh+'',
                phiquahan: phi,
                note: nnote
            });
            Swal.fire(
                'Đã cập nhật !',
                'Bạn đã thay đổi số ngày quá hạn của hợp đồng ' + sohopdong + ' thành ' + songayqh + ' ngày',
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
                nnote = 'Quá hạn ' + songayqh + ' ngày trong T' + mm + '/' + yyyy + '.';

            } else {
                nnote = 'Đề nghị tất toán hợp đồng.';

            }

        }

        dbRef.ref('LOAN').child(sohopdong).update({
            songayquahan: songayqh+'',
            phiquahan: phi,
            note: nnote
        });


        Swal.fire(
            'Đã cập nhật !',
            'Các hồ sơ thanh toán trễ đã được cập nhật SNQH',
            'success'
        )

    }



}




function update_so_thang_da_tra(sohopdong, tongsothangdatra) {

    var dbRef = firebase.database();


    Swal.fire({
        title: 'Số tháng đã thanh toán',
        text: 'SHD ' + sohopdong,
        input: 'text',
        showCancelButton: true,
        inputValue: tongsothangdatra,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Đóng',
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
                'Đã cập nhật !',
                'Bạn đã thay đổi số tháng đã thanh toán của hợp đồng ' + sohopdong + ' thành ' + tongsothangdt + ' tháng',
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
            Swal.fire('Lỗi !', 'Hợp đồng giao dịch không tồn tại', 'error')
            return false;
        }
         window.open('http://vtgonl.firebaseapp.com/contract.html?shd=' + shd, '_blank');

});


   
}


function validateHS(sohopdong, th, email, start, end, step) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'Duyệt hồ sơ ' + sohopdong,
        text: "Bạn có muốn nhận hồ sơ và tiến hành giải ngân cho khoản vay này không?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Đóng',
        confirmButtonColor: '#5742f5'
    }).then((result) => {
        if (result.value) {

            if (start == 'null' || start == '') {
                Swal.fire(
                    'Oops...',
                    'Vui lòng bổ sung ngày giải ngân hợp đồng',
                    'warning'
                )
                return false;
            }

            if (step == 'null' || step == '') {
                Swal.fire(
                    'Oops...',
                    'Vui lòng bổ sung ngày thanh toán tiếp theo của hợp đồng',
                    'warning'
                )
                return false;
            }

            if (end == 'null' || end == '') {
                Swal.fire(
                    'Oops...',
                    'Vui lòng bổ sung ngày kết thúc hợp đồng',
                    'warning'
                )
                return false;
            }


            dbRef.ref('LOAN').child(sohopdong).update({
                STATUS: "actived"
            });

            Swal.fire({
                title: 'Đã duyệt!',
                text: 'Hồ sơ ' + sohopdong + ' đã được duyệt thành công. Bạn có muốn thêm thông tin hợp đồng vào lịch của Google không?',
                icon: 'question',
                showCancelButton: true,
                cancelButtonText: 'Không',
                confirmButtonColor: '#5742f5',
                confirmButtonText: 'Có'
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
        title: 'Từ chối hồ sơ ' + sohopdong,
        text: "Bạn có muốn từ chối khoản vay này không?",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Đóng',
        confirmButtonText: 'Đồng ý',
        confirmButtonColor: '#5742f5'
    }).then((result) => {
        if (result.value) {

            dbRef.ref('LOAN').child(sohopdong).once('value').then(function(data) {

                if (data.val() == null) {
                    Swal.fire({
                        title: 'Oops...',
                        text: 'Không tìm thấy Số hợp đồng ' + sohopdong,
                        icon: 'info',
                        confirmButtonText: 'Đóng',
                        confirmButtonColor: '#5742f5'
                    });
                } else {

                    var tt = data.child('STATUS').val();
                    if (tt == "actived") {
                        Swal.fire({
                            title: 'Không thể từ chối!',
                            text: 'Hợp đồng đang có hiệu lực',
                            icon: 'warning',
                            confirmButtonText: 'Đóng',
                            confirmButtonColor: '#5742f5'
                        });
                        return false;
                    }

                    var lydo;
                    Swal.fire({
                        title: 'Lý do từ chối',
                        text: 'Từ chối hợp đồng ' + sohopdong,
                        input: 'select',
                        inputOptions: {
                            level1: 'Hồ sơ chưa đầy đủ',
                            level2: 'TT không chính xác',
                            level3: 'TT người thân không đúng',
                            level4: 'TT Facebook không đủ',
                            level4a: 'TT Tài khoản NH không đúng',
                            level5: 'SIM chưa xác nhận',
                            level6: 'Không CM thu nhập',
                            level7: 'Hình ảnh bị mờ',
                            level8: 'Khu vực chưa hổ trợ',
                            level9: 'Có khoản vay chưa thanh toán'
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Đồng ý',
                        cancelButtonText: 'Đóng',
                        confirmButtonColor: '#5742f5',
                        inputValidator: (value) => {

                            if (value === 'level1') {
                                lydo = 'hồ sơ bạn đã cung cấp không đầy đủ thông tin';
                            } else if (value === 'level2') {
                                lydo = 'thông tin hồ sơ bạn đã cung cấp không chính xác';
                            } else if (value === 'level3') {
                                lydo = 'thông tin người thân mà bạn đã cung cấp không chính xác';
                            } else if (value === 'level4') {
                                lydo = 'trang Facebook cá nhân không đầy đủ thông tin';
                            } else if (value === 'level4a') {
                                lydo = 'tài khoản ngân hàng bạn cung cấp không chính chính chủ';
                            } else if (value === 'level5') {
                                lydo = 'bạn chưa xác nhận thông tin SIM chính chủ';
                            } else if (value === 'level6') {
                                lydo = 'bạn không thể chứng minh thu nhập';
                            } else if (value === 'level7') {
                                lydo = 'hình ảnh mà bạn đã cung cấp bị mờ, không nhìn rõ nội dung';
                            } else if (value === 'level8') {
                                lydo = 'khu vực hiện tại của bạn chưa được hổ trợ';
                            } else {
                                lydo = 'bạn có khoản vay chưa tất toán';
                            }

                            dbRef.ref('LOAN').child(sohopdong).update({
                                STATUS: "refused",
                                note: lydo
                            });

                            Swal.fire(
                                'Đã huỷ !',
                                'Bạn đã từ chối hồ sơ này thành công với lý do: ' + lydo + '',
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
        title: 'Kết thúc HD ' + sohopdong,
        text: "Đảm bảo hợp đồng đã được thanh toán đầy đủ trước khi kết thúc!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Đóng',
        confirmButtonColor: '#5742f5',
        confirmButtonText: 'Đồng ý'
    }).then((result) => {
        if (result.value) {

            dbRef.ref('LOAN').child(sohopdong).update({
                STATUS: "finished",
                note: 'Hợp đồng đã được kết thúc.'
            });
            Swal.fire(
                'Hoàn tất !',
                'Hợp đồng số ' + sohopdong + ' đã được kết thúc thành công',
                'success'
            )
        }
    })

}

function refusedHS(sohopdong) {


    var dbRef = firebase.database();

    Swal.fire({
        title: 'Oops...',
        text: "Hồ sơ này đã bị từ chối. Bạn có muốn khôi phục hồ sơ không?",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Không',
        confirmButtonColor: '#5742f5',
        confirmButtonText: 'Có'
    }).then((result) => {
        if (result.value) {

            dbRef.ref('LOAN').child(sohopdong).update({
                STATUS: "pending",
                note: ''
            });
            Swal.fire(
                'Hoàn tất !',
                'Hợp đồng số ' + sohopdong + ' đã được khôi phục',
                'success'
            )
        }
    })

}

function validateAcc(vnphone) {

    var dbRef = firebase.database();

    Swal.fire({
        title: 'Xác nhận?',
        text: "Xác nhận Tài khoản sẽ được đưa vào danh sách các tài khoản tin cậy và có thể không cần bổ sung thêm hồ sơ cho các giao dịch sau này!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        confirmButtonColor: '#5742f5',
        cancelButtonText: 'Xoá khỏi VTG!',
        cancelButtonColor: '#d33'
    }).then((result) => {
        if (result.value) {

            dbRef.ref('USER').child(vnphone).update({
                ACTIVE: 'true'
            });
            Swal.fire(
                'Hoàn tất !',
                'Tài khoản đã được xác nhận thành công',
                'success'
            )
            document.getElementById("userstt").innerHTML = 'Bạn đã xác nhận tài khoản này thành công!';
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
                'Đã xoá!',
                'Bạn đã xoá tài khoản ' + vnphone + ' và các hợp đồng của tài khoản này ra khỏi hệ thống VTG Online thành công',
                'success'
            )
            document.getElementById("userstt").innerHTML = 'Bạn đã xoá tài khoản này thành công!';
        }
    })

}

function unvalidateAcc(vnphone) {

    var dbRef = firebase.database();
    Swal.fire({
        title: 'Huỷ xác nhận?',
        text: "Tài khoản sẽ được đưa về trạng thái chưa xác nhận, đồng thời cũng bỏ chặn tài khoản nếu có!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Đóng',
        confirmButtonText: 'Đồng ý'
    }).then((result) => {
        if (result.value) {
            dbRef.ref('USER').child(vnphone).update({
                ACTIVE: 'false'
            });
            Swal.fire(
                'Hoàn tất !',
                'Tài khoản đã được huỷ xác nhận',
                'success'
            )
            document.getElementById("userstt").innerHTML = 'Bạn đã huỷ xác nhận tài khoản này thành công!';
        }
    })
}



function kiemtrahopdong(sohopdong) {


    var dbRef = firebase.database();

    dbRef.ref('LOAN').child(sohopdong).once('value').then(function(data) {

        if (data.val() == null) {
            Swal.fire('Lỗi !', 'Hợp đồng giao dịch không tồn tại', 'error')
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
            note = 'Không';
        }

        var total = parseInt(sotientramoithang.replace(/\s/g, '')) + parseInt(phiquahan.replace(/\s/g, '')) + parseInt(sotienconno.replace(/\s/g, '')) + parseInt(laisuatconno.replace(/\s/g, '')) + parseInt(phidichvuconno.replace(/\s/g, '')) + parseInt(phigiahanconno.replace(/\s/g, ''));
        total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        
        var bill = '<a href="#" onclick="event.preventDefault();hoadon(\'' + sohopdong + '\',\'' + name + '\',\'' + ngayvay + '\',\'' + sotien + '\',\'' + sotientramoithang + '\',\'' + phiquahan + '\',\'' + sotienconno + '\',\'' + laisuatconno + '\',\'' + phidichvuconno + '\',\'' + phigiahanconno + '\',\'' + total + '\',\'' + ngaytratieptheo + '\')"><span style="color: red;font-weight:bold"> ' + total + 'đ <span style="font-weight:normal">(Xem chi tiết)</span></span></a>'


        if (ngaytratieptheo == '' || ngaytratieptheo == null) {
            ngaytratieptheo = 'Đang chờ phê duyệt hồ sơ...'
        }
        var temp = '<div class="ui-g" align = "left" style = "font-size:14px"><div class="ui-g-5 calc-left">Họ và tên</div> <div class="ui-g-7 calc-right"><strong> ' + name + ' </strong> </div> <div class="ui-g-5 calc-left">Số tiền thanh toán</div> <div class="ui-g-7 calc-right">' + bill + '</div> <div class="ui-g-5 calc-left">Thanh toán trước ngày</div> <div class="ui-g-7 calc-right"><strong> ' + ngaytratieptheo + ' </strong></div>  <div class="ui-g-5 calc-left">Số tháng đã trả</div> <div class="ui-g-7 calc-right">  <strong> ' + tongsothangdatra + '/' + thoihan + ' </strong> </div> <div class="ui-g-5 calc-left">Số ngày quá hạn</div> <div class="ui-g-7 calc-right"> <strong style="color: red;">' + songayquahan + '</strong> </div> <div class="ui-g-5 calc-left">Lời nhắn</div> <div class="ui-g-7 calc-right"> <strong> ' + note + '</strong> </div> <div class="ui-g"> <div class="ui-g-12"><br><br> <p>Chuyển tiền vào tài khoản Ngân hàng sau:</p></div> <div class="ui-g-4 calc-left">Số Tài khoản</div> <div class="ui-g-8 calc-right"><span style="font-weight: 600">19035740331018</span></div> <div class="ui-g-4 calc-left">Tên Tài khoản</div> <div class="ui-g-8 calc-right"><span style="font-weight: 600">TRAN HOANG SON</span></div> <div class="ui-g-4 calc-left">Tên Ngân hàng</div> <div class="ui-g-8 calc-right"><span style="font-weight: 400">Techcombank</span></div> <div class="ui-g-4 calc-left">Chi nhánh</div> <div class="ui-g-8 calc-right"><span style="font-weight: 400">Tp. Hồ Chí Minh</span></div> <div class="ui-g-4 calc-left">Nội dung</div><div class="ui-g-8 calc-right"><span style="font-weight: 400">Thanh toán cho KH: "Tên khách hàng" SHĐ: “Mã hợp đồng của bạn.”</span></div> </div></div> ';
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
                text: 'Không tìm thấy Số điện thoại ' + phone,
                icon: 'info',
                confirmButtonText: 'Đóng',
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
            isActive = '<a href="#" onclick="event.preventDefault();unvalidateAcc(\'' + vnphone + '\')"><span style="color: #6bfa32;font-weight:bold">Tài khoản đã được xác nhận</span></a>';

        } else if (ACTIVE == 'false') {
            isActive = '<a href="#" onclick="event.preventDefault();validateAcc(\'' + vnphone + '\')"><span style="color: orange;font-weight:bold">Tài khoản chưa được xác nhận</span></a>';
        } else if (ACTIVE == 'refused') {
            isActive = '<a href="#" onclick="event.preventDefault();unvalidateAcc(\'' + vnphone + '\')"><span style="color: #f5483b;font-weight:bold">Tài khoản đã bị chặn</span></a>';
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
            i1 = 'Xem ảnh';
        }
        if (imgCMND1 != null) {
            i2 = 'Xem ảnh';
        }
        if (imgCMND2 != null) {
            i3 = 'Xem ảnh';
        }
        if (imgHDLD != null) {
            i4 = 'Xem ảnh';
        }
        if (imgSAOKE1 != null) {
            i5 = 'Xem ảnh';
        }
        if (imgSAOKE2 != null) {
            i6 = 'Xem ảnh';
        }
        if (imgSAOKE3 != null) {
            i7 = 'Xem ảnh';
        }


        if (listCONTACT != null) {
            i8 = 'Xem file';
            i8a = 'Tải file';
        }
        if (listSMS != null) {
            i9 = 'Xem file';
            i9a = 'Tải file';
        }
        if (listCALL != null) {
            i10 = 'Xem file';
            i10a = 'Tải file';
        }


        var fb = '';
        if (facebook != null && facebook != '') {
            fb = 'Xem trang';
        }


        var item = '<div class="ui-g">' +
            '<div class="ui-g-12 calc-left"><h3>Thông Tin Khách hàng</h3></div>' +
            '<div class="ui-g-5 calc-left">Họ và Tên</div>' +
            '<div class="ui-g-7 calc-right"> ' + name + '</div>' +
            '<div class="ui-g-5 calc-left">Số CMND</div>' +
            '<div class="ui-g-7 calc-right"> ' + socmnd + '</div>' +
            '<div class="ui-g-5 calc-left">Giới Tính</div>' +
            '<div class="ui-g-7 calc-right"> ' + gender + '</div>' +
            '<div class="ui-g-5 calc-left">Ngày Sinh</div>' +
            '<div class="ui-g-7 calc-right"> ' + year + '</div>' +
            '<div class="ui-g-5 calc-left">Số điện thoại</div>' +
            '<div class="ui-g-7 calc-right"> ' + phone + '</div>' +
            '<div class="ui-g-5 calc-left">Email</div>' +
            '<div class="ui-g-7 calc-right"> ' + email + '</div>' +
            '<div class="ui-g-5 calc-left">Địa chỉ</div>' +
            '<div class="ui-g-7 calc-right"> ' + address + '</div>' +
            '<div class="ui-g-5 calc-left">TG cư trú</div>' +
            '<div class="ui-g-7 calc-right"> ' + addresstime + '</div>' +
            '<div class="ui-g-5 calc-left">Link Facebook</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "https://www.facebook.com/' + facebook + '" target="_blank"> <span  style="color: #6bfa32">' + fb + '</span> </a> </div>' +

            '<div class="ui-g-12 calc-left"><br></div>' +
            '<div class="ui-g-5 calc-left">Trạng thái</div>' +
            '<div class="ui-g-7 calc-right"> ' + status + '</div>' +
            '<div class="ui-g-5 calc-left">Trình độ học vấn</div>' +
            '<div class="ui-g-7 calc-right"> ' + edu + '</div>' +
            '<div class="ui-g-5 calc-left">Nghề nghiệp</div>' +
            '<div class="ui-g-7 calc-right"> ' + job + '</div>' +
            '<div class="ui-g-5 calc-left">Thu nhập</div>' +
            '<div class="ui-g-7 calc-right"> ' + salary + '</div>' +
            '<div class="ui-g-12 calc-left"><br></div>' +
            '<div class="ui-g-5 calc-left">Tên người thân 1</div>' +
            '<div class="ui-g-7 calc-right"> ' + nt1name + '</div>' +
            '<div class="ui-g-5 calc-left">Mối quan hệ</div>' +
            '<div class="ui-g-7 calc-right"> ' + nt1relation + '</div>' +
            '<div class="ui-g-5 calc-left">Số điện thoại</div>' +
            '<div class="ui-g-7 calc-right"> ' + nt1phone + '</div>' +
            '<div class="ui-g-5 calc-left">Tên người thân 2</div>' +
            '<div class="ui-g-7 calc-right"> ' + nt2name + '</div>' +
            '<div class="ui-g-5 calc-left">Mối quan hệ</div>' +
            '<div class="ui-g-7 calc-right"> ' + nt2relation + '</div>' +
            '<div class="ui-g-5 calc-left">Số điện thoại</div>' +
            '<div class="ui-g-7 calc-right"> ' + nt2phone + '</div>' +

            '<div class="ui-g-12 calc-left"><br></div>' +
            '<div class="ui-g-5 calc-left">Tên Công ty</div>' +
            '<div class="ui-g-7 calc-right"> ' + companyname + '</div>' +
            '<div class="ui-g-5 calc-left">Số điện thoại</div>' +
            '<div class="ui-g-7 calc-right"> ' + companyphone + '</div>' +
            '<div class="ui-g-5 calc-left">Địa chỉ</div>' +
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
            '<div class="ui-g-5 calc-left">DANH BẠ</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "#" onclick="displayListCONTACT(\'' + 'view' + '\',\'' + name + '\')" > <span  style="color: #6bfa32">' + i8 + '</span> </a> &nbsp; <a href= "#" onclick="displayListCONTACT(\'' + 'download' + '\',\'' + name + '\')"> <span  style="color: #6bfa32">' + i8a + '</span> </a> </div>' +
            '<div class="ui-g-5 calc-left">TIN NHẮN</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "#"onclick="displayListSMS(\'' + 'view' + '\',\'' + name + '\')" > <span  style="color: #6bfa32">' + i9 + '</span> </a> &nbsp; <a href= "#" onclick="displayListSMS(\'' + 'download' + '\',\'' + name + '\')" > <span  style="color: #6bfa32">' + i9a + '</span> </a> </div>' +
            '<div class="ui-g-5 calc-left">CUỘC GỌI</div>' +
            '<div class="ui-g-7 calc-right"> <a href= "#"onclick="displayListCALL(\'' + 'view' + '\',\'' + name + '\')" > <span  style="color: #6bfa32">' + i10 + '</span> </a> &nbsp; <a href= "#" onclick="displayListCALL(\'' + 'download' + '\',\'' + name + '\')"> <span  style="color: #6bfa32">' + i10a + '</span> </a></div>' +

            '<div class="ui-g-12 calc-left"><br></div>' +
            '<div class="ui-g-5 calc-left">Bảo hiểm</div>' +
            '<div class="ui-g-7 calc-right" style="text-align: justify;"> ' + baohiem + '</div>' +
            '<div class="ui-g-5 calc-left">Thanh toán</div>' +
            '<div class="ui-g-7 calc-right" style="text-align: justify;"> ' + ttbaohiem + '</div>' +

            '<div class="ui-g-12 calc-left"><br></div>' +
            '<div class="ui-g-5 calc-left">Ngày tạo</div>' +
            '<div class="ui-g-7 calc-right"> ' + oncreated + '</div>' +
  
            '<div class="ui-g-5 calc-left">Thiết bị</div>' +
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



            '<div class="ui-g-5 calc-left">Thêm bạn bè</div>' +
            '<div class="ui-g-7 calc-right"><div> <input class="form-input" type="text" id="friendID"> <button id="btfriend" class="mbutton-green-mini" onclick="updateFriendList(\'' + phone + '\')"> <i class="fa fa-upload"></button></div></div>' +


            '<div class="ui-g-12 calc-left"><hr size="1" style="border-color: #fff;" /></div>' +

            '<div class="ui-g-12 calc-left" style="font-weight: 600;" > Liên kết bạn bè:</div>' +
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

                Swal.fire('Lỗi !', err.code, 'error');

            } else {
                Swal.fire({
                    title: 'Thêm thành công !',
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