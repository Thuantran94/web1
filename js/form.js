let slidePage;

var isSuccessUpload = false;
var isAnonymous = true;
var isSubmit = false;

var newmfileSIM;
var newmfileCMND1;
var newmfileCMND2;
var newmfileHDLD;

var newmfileSAOKE1;
var newmfileSAOKE2;
var newmfileSAOKE3;
var img_count = 0;

var IPv4 = '';

var phone;
var vnphone;
var today = new Date();
var shd = (today.getTime() + '').substring(5, 11);






var sotien;
var kyhan;
var sotientramoithang;
var phidichvu;

var myAvatar;

$(document).ready(function() {

    var Auth = firebase.auth();
    var dbRef = firebase.database();
    var auth = Auth;

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    jQuery(document).ready(function() {
        'use strict';
    });

    jQuery('#user_date_of_birth').datetimepicker();

    var x_timer;
    console.log('shd = ' + shd)

    document.getElementById("shd").innerHTML = shd;


    var date1 = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    var date2 = new Date(today.getTime() - (60 * 24 * 60 * 60 * 1000));
    var date3 = new Date(today.getTime() - (90 * 24 * 60 * 60 * 1000));
    document.getElementById("sk1").innerHTML = date1.getMonth()+1;
    document.getElementById("sk2").innerHTML = date2.getMonth()+1;
    document.getElementById("sk3").innerHTML = date3.getMonth()+1;





    $.get("https://api.ipdata.co?api-key=test", function(response) {
        IPv4 = response.ip;
        console.log('IPv4 = ' + IPv4)
    }, "jsonp");



    $("#sotien").keyup(function(e) {
        clearTimeout(x_timer);
        document.getElementById("check_sotien").style.display = 'none';

        sotien = $(this).val();
        kyhan = document.getElementById("kyhan").value;
        kyhan = parseInt(kyhan.replace(/\s/g, ''));
        x_timer = setTimeout(function() {

            if (sotien != '') {
                document.getElementById("sotien").value = sotien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' VNĐ';
                if (sotien >= 1000000 && sotien <= 10000000) {

                    if (sotien != '' && sotien != null && kyhan != '' && kyhan != null) {
                        sotientramoithang = tientra(sotien, kyhan)
                        phidichvu = tienphi(sotien, kyhan);
                        document.getElementById("sotientramoithang").value = sotientramoithang.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' VNĐ';
                        document.getElementById("phidichvu").value = phidichvu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' VNĐ';

                        document.getElementById("check_sotien").value = true;

                    } else {
                        document.getElementById("sotientramoithang").value = '';
                        document.getElementById("phidichvu").value = '';
                    }
                } else {
                    document.getElementById("sotientramoithang").value = '';
                    document.getElementById("phidichvu").value = '';

                    if (sotien < 1000000) {
                        document.getElementById("check_sotien").style.display = 'block';
                        document.getElementById("check_sotien").value = false;
                    } else {
                        document.getElementById("check_sotien").style.display = 'block';
                        document.getElementById("check_sotien").value = false;
                    }
                }
            }
        }, 1000);
    });

    $("#kyhan").keyup(function(e) {
        clearTimeout(x_timer);
        document.getElementById("check_kyhan").style.display = 'none';

        kyhan = $(this).val();
        sotien = document.getElementById("sotien").value;
        sotien = parseInt(sotien.replace(/\s/g, ''));


        x_timer = setTimeout(function() {


            if (kyhan != '') {
                document.getElementById("kyhan").value = kyhan + ' tháng';

                if (kyhan >= 1 && kyhan <= 6) {

                    if (sotien != '' && sotien != null && kyhan != '' && kyhan != null) {
                        sotientramoithang = tientra(sotien, kyhan);
                        phidichvu = tienphi(sotien, kyhan);
                        document.getElementById("sotientramoithang").value = sotientramoithang.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' VNĐ';
                        document.getElementById("phidichvu").value = phidichvu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' VNĐ';

                        document.getElementById("check_kyhan").value = true;

                    } else {
                        document.getElementById("sotientramoithang").value = '';
                        document.getElementById("phidichvu").value = '';

                    }
                } else {
                    document.getElementById("sotientramoithang").value = '';
                    document.getElementById("phidichvu").value = '';

                    if (kyhan < 1) {
                        document.getElementById("check_kyhan").style.display = 'block';
                        document.getElementById("check_kyhan").value = false;
                    } else {

                        document.getElementById("check_kyhan").style.display = 'block';
                        document.getElementById("check_kyhan").value = false;
                    }
                }
            }
        }, 1000);
    });




    slidePage = document.querySelector(".slide-page");

    const nextBtnFirst = document.querySelector(".firstNext");
    const cancleBtnSec = document.querySelector(".prev-0");
    const prevBtnSec = document.querySelector(".prev-1");
    const submitBtn = document.querySelector(".submit");




    nextBtnFirst.addEventListener("click", function(event) {
        event.preventDefault();

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var hour = today.getHours();
        var minutes = today.getMinutes();




        var user_phone = $('#user_phone').val();
        var user_email = $('#user_email').val();

        var user_name = $('#user_name').val();
        var user_cmnd = $('#user_cmnd').val();
        var user_date_of_birth = $('#user_date_of_birth').val();
        var user_gender = $('#user_gender').val();
        var user_status = $('#user_status').val();
        var user_province = $('#user_province').val();
        var user_village = $('#user_village').val();
        var user_address = $('#user_address').val();
        var user_lifetime = $('#user_lifetime').val();

        var user_edu = $('#user_edu').val();
        var user_job = $('#user_job').val();
        var user_salary = $('#user_salary').val();
        var user_company_name = $('#user_company_name').val();
        var user_company_address = $('#user_company_address').val();
        var user_company_phone = $('#user_company_phone').val();
        var user_goad = $('#user_goad').val();
        

        
        var bank_name = $('#bank_name').val();
        var bank_user_name = $('#bank_user_name').val();
        var bank_user_number = $('#bank_user_number').val();
        var bank_user_address = $('#bank_user_address').val();

        var relation_name1 = $('#relation_name1').val();
        var relation_rela1 = $('#relation_rela1').val();
        var relation_phone1 = $('#relation_phone1').val();


        var relation_name2 = $('#relation_name2').val();
        var relation_rela2 = $('#relation_rela2').val();
        var relation_phone2 = $('#relation_phone2').val();


        var baohiem = $('#baohiem').val();
        var url = $('#facebook').val();
        var kehoachtra = $('#kehoachtra').val();


        var sotien = $('#sotien').val();
        var kyhan = $('#kyhan').val();


        if (!validateName(user_name)) {

            Swal.fire(
                'Lỗi !',
                'Họ và tên không đầy đủ hoặc có chứa các kí tự đặc biệt',
                'error'
            );
            return false;
        }


    
        if (user_cmnd.length < 9 || user_cmnd.length > 12) {

            Swal.fire(
                'Lỗi !',
                'Số CMND không đầy đủ hoặc không chính xác',
                'error'
            );
            return false;
        }
        if (user_date_of_birth == null || user_date_of_birth == '') {

            Swal.fire(
                'Lỗi !',
                'Bạn chưa chọn ngày sinh',
                'error'
            );
            return false;
        }
        if (user_gender == null || user_gender == '') {

            Swal.fire(
                'Lỗi !',
                'Bạn chưa chọn giới tính',
                'error'
            );
            return false;
        }
        if (user_status == null || user_status == '') {

            Swal.fire(
                'Lỗi !',
                'Bạn chưa chọn tình trạng hôn nhân',
                'error'
            );
            return false;
        }

        if (user_province == null || user_province == '' || user_village == null || user_village == '' || user_lifetime == null || user_lifetime == '') {

            Swal.fire(
                'Lỗi !',
                'Thông tin địa chỉ không đầy đủ hoặc không chính xác',
                'error'
            );
            return false;
        }

        if (user_address.length < 10) {
            Swal.fire(
                'Lỗi !',
                'Địa chỉ không đầy đủ hoặc không đúng định dạng. Tên đường, thị xã, quận, huyện, tỉnh thành phải được cách nhau bởi dấu phẩy ","',
                'error'
            );
            return false;
        }

        if (!validatePhone(user_phone)) {

            Swal.fire(
                'Lỗi !',
                'Số điện thoại không đúng định dạng',
                'error'
            );
            return false;
        }
        if (!validateEmail(user_email)) {

            Swal.fire(
                'Lỗi !',
                'Email không đúng định dạng',
                'error'
            );
            return false;
        }


        if (user_edu == null || user_edu == '' || user_job == null || user_job == '' || user_salary == null || user_salary == '') {
            Swal.fire(
                'Lỗi !',
                'Thông tin học vấn và việc làm không đầy đủ',
                'error'
            );
            return false;
        }


        if (!validateName(relation_name1) || !validateName(relation_name2)) {

            Swal.fire(
                'Lỗi !',
                'Họ và tên người thân không đầy đủ hoặc có chứa các kí tự đặc biệt',
                'error'
            );
            return false;
        }
        if (relation_rela1 == null || relation_rela1 == '' || relation_rela2 == '' || relation_rela2 == null) {

            Swal.fire(
                'Lỗi !',
                'Bạn chưa chọn mối quan hệ với người thân',
                'error'
            );
            return false;
        }
        if (!validatePhone(relation_phone1) || !validatePhone(relation_phone2)) {

            Swal.fire(
                'Lỗi !',
                'Số điện thoại người thân không đúng định dạng',
                'error'
            );
            return false;
        }



        if (sotien == null || sotien == '' || !$('#check_sotien').val()  ) {
            Swal.fire(
                'Lỗi !',
                'Số tiền cần vay không hợp lệ',
                'error'
            );
            return false;
        }

        if (kyhan == null || kyhan == '' || !$('#check_kyhan').val()) {
            Swal.fire(
                'Lỗi !',
                'Kỳ hạn vay không hợp lệ',
                'error'
            );
            return false;
        }

        if (user_goad == null || user_goad == '') {
            Swal.fire(
                'Lỗi !',
                'Vui lòng cho biết mục đích sử dụng khoản vay',
                'error'
            );
            return false;
        }

        if (baohiem == null || baohiem == '') {
            Swal.fire(
                'Lỗi !',
                'Vui lòng chọn gói bảo hiểm khoản vay',
                'error'
            );
            return false;
        }

        if (bank_name == null || bank_name == '') {

            Swal.fire(
                'Lỗi !',
                'Bạn chưa chọn tên ngân hàng',
                'error'
            );
            return false;
        }
        if (!validateName(bank_user_name)) {

            Swal.fire(
                'Lỗi !',
                'Tên tài khoản ngân hàng không chính xác hoặc có chứa các kí tự đặc biệt',
                'error'
            );
            return false;
        }
        if (bank_user_number.length < 6 || bank_user_number.length > 20) {

            Swal.fire(
                'Lỗi !',
                'Số tài khoản không chính xác',
                'error'
            );
            return false;
        }

        if (kehoachtra.length < 10) {
            Swal.fire('Lỗi !', 'Vui lòng trình bày chi tiết kế hoạch chi trả khoản vay', 'error');
            return false;
        }

        if (url.length < 10) {
            Swal.fire('Lỗi !', 'Vui lòng kiểm tra lại liên kết trang Facebook', 'error');
            return false;
        }



        var sotientramoithang = $('#sotientramoithang').val();
        var st = parseInt(sotien.split(' ', 1));
        var sotienbangchu;

        switch (st) {

            case 1:
                sotienbangchu = 'Một';
                break;
            case 2:
                sotienbangchu = 'Hai';
                break;
            case 3:
                sotienbangchu = 'Ba';
                break;
            case 4:
                sotienbangchu = 'Bốn';
                break;
            case 5:
                sotienbangchu = 'Năm';
                break;
            case 6:
                sotienbangchu = 'Sáu';
                break;
            case 7:
                sotienbangchu = 'Bảy';
                break;
            case 8:
                sotienbangchu = 'Tám';
                break;
            case 9:
                sotienbangchu = 'Chín';
                break;

            case 10:
                sotienbangchu = 'Mười';
                break;
            case 11:
                sotienbangchu = 'Mười một';
                break;
            case 12:
                sotienbangchu = 'Mười hai';
                break;
            case 13:
                sotienbangchu = 'Mười ba';
                break;
            case 14:
                sotienbangchu = 'Mười bốn';
                break;
            case 15:
                sotienbangchu = 'Mười lăm';
                break;
            case 16:
                sotienbangchu = 'Mười sáu';
                break;
            case 17:
                sotienbangchu = 'Mười bảy';
                break;
            case 18:
                sotienbangchu = 'Mười tám';
                break;
            case 19:
                sotienbangchu = 'Mười chín';
                break;

            case 20:
                sotienbangchu = 'Hai mươi';
                break;
        }

        sotienbangchu = sotienbangchu + ' triệu đồng chẵn';

        var laixuatquahan = Math.round(st * 1000 * 0.03).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' 000 VNĐ/tuần';

        document.getElementById("date").innerHTML = dd + '/' + mm + '/' + yyyy;
        document.getElementById("place").innerHTML = user_village + ', ' + user_province;
        document.getElementById("namehd").innerHTML = user_name;
        document.getElementById("sotienhd").innerHTML = sotien;
        document.getElementById("sotienbchd").innerHTML = sotienbangchu;
        document.getElementById("mucdichvayhd").innerHTML = user_goad;
        document.getElementById("banknamehd").innerHTML = bank_name;
        document.getElementById("bankaddresshd").innerHTML = bank_user_address;
        document.getElementById("banknumhd").innerHTML = bank_user_number;
        document.getElementById("bankusernamehd").innerHTML = bank_user_name;
        document.getElementById("kyhanhd").innerHTML = kyhan;
        document.getElementById("sotien2hd").innerHTML = sotien;
        document.getElementById("sotientramoithanghd").innerHTML = sotientramoithang;
        document.getElementById("lsqh").innerHTML = laixuatquahan;




        if (isAnonymous) {

            $("body").css("cursor", "progress");
            document.getElementById("loader").style.display = "block";

            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('check_otp', {
                'size': 'invisible',
                'callback': function(response) {

                    onSignInSubmit();
                }
            });



            var vnphone = '+84' + user_phone.substring(1, user_phone.length);

            var otp;
            firebase.auth().signInWithPhoneNumber(vnphone, window.recaptchaVerifier)
                .then((confirmationResult) => {

                    $("body").css("cursor", "default");
                    document.getElementById("loader").style.display = "none";

                    otp = window.prompt('Vui lòng nhập mã xác nhận đã được gửi đến số điện thoại ' + user_phone + '.');

                    return confirmationResult.confirm(otp);
                }).then((result) => {


                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    slidePage.style.marginLeft = "-25%";

                    return false;


                }).catch((error) => {


                    $("body").css("cursor", "default");
                    document.getElementById("loader").style.display = "none";

                    if (error.code === 'auth/invalid-verification-code') {
                        Swal.fire('Lỗi !', "Mã xác nhận không chính xác", 'error').then((result) => {
                            if (result.value) {
                                window.location.reload()
                            }
                        })
                    } else if (error.code === 'auth/too-many-requests') {
                        Swal.fire('Lỗi !', "Tài khoản bị tạm khoá vì đã đăng nhập quá nhiều lần. Vui lòng quay lại sau", 'error').then((result) => {
                            if (result.value) {
                                window.location.reload()
                            }
                        })
                    } else {
                        Swal.fire({
                            title: 'Trình duyệt không hỗ trợ !',
                            html: 'Vui lòng sử dụng trình duyệt khác </br>(Chrome, IE, Firefox, Safari, Google, Opera,...)</br>Error: <span style="color:red"> ' + error.code + '.</span>',
                            icon: 'error',
                            footer: '<a href="#" onclick="event.preventDefault();environment_error()" style="color:#5742f5" ><center>Xem hướng dẫn</center></a>'
                        }).then((result) => {
                            if (result.value) {
                                window.location.reload()
                            }
                        })
                    }

                });



        } else {

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            slidePage.style.marginLeft = "-25%";

        }

    });




    submitBtn.addEventListener("click", function(e) {

        e.preventDefault();

        var checkBox = document.getElementById("myCheck");
        if (checkBox.checked == false) {

            Swal.fire(
                '',
                'Vui lòng đồng ý với các Điều khoản & Điều kiện Sử dụng và Chính sách Bảo mật của VTG Online',
                'info'
            );
            return false;
        }

        isSubmit = true;

        if (navigator.geolocation) {

            console.log('getting position...')

            navigator.geolocation.getCurrentPosition(success, error, options);

        } else {
            Swal.fire({
                title: 'Trình duyệt không hỗ trợ!',
                html: 'Vui lòng sử dụng trình duyệt khác </br>(Chrome, IE, Firefox, Safari, Google, Opera,...)</br>Error: <span style="color:red"> ' + error.code + '.</span>',
                icon: 'error',
                footer: '<a href="#" onclick="event.preventDefault();environment_error()" style="color:#5742f5" ><center>Xem hướng dẫn</center></a>'
            }).then((result) => {
                if (result.value) {
                    window.location.reload()
                }
            })

            return false;
        }

    });

    cancleBtnSec.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "index.html";

    });

        prevBtnSec.addEventListener("click", function(event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        slidePage.style.marginLeft = "0%";

    });





    if (auth === null) {
        Auth.signInAnonymously().catch(function(error) {
            console.log(' sign In Anonymous fail: errorMessage = ' + error.code);
        });
    }


    Auth.onAuthStateChanged(function(user) {
        if (user) {

            // User is signed in.
            vnphone = user.phoneNumber;
            isAnonymous = user.isAnonymous;

            document.getElementById("loader").style.display = "none";
            console.log('User is signed in phoneNumber = ' + vnphone)
            setCookie("phone", vnphone, 30);

            if (isAnonymous) {
                setCookie("login", "false", 30);
            } else {

                setCookie("login", "true", 30);

                phone = vnphone.replace('+84', '0');

                dbRef.ref('USER').child(vnphone).once('value').then(function(data) {
                    var userActive = data.child("ACTIVE").val();

                    if (data.val() != null ) {

                        document.getElementById("user_phone").value = phone;
                        document.getElementById("user_email").value = data.child("email").val();
                        document.getElementById("user_name").value = data.child("name").val();
                        document.getElementById("user_cmnd").value = data.child("id").val();
                        document.getElementById("user_date_of_birth").value = data.child("birthday").val();
                        document.getElementById("user_gender").value = data.child("gender").val();
                        document.getElementById("user_status").value = data.child("status").val();
                        document.getElementById("user_province").value = data.child("province").val();
                        document.getElementById("user_village").value = data.child("village").val();
                        document.getElementById("user_address").value = data.child("address").val();
                        document.getElementById("user_lifetime").value = data.child("lifeTime").val();

                        document.getElementById("user_edu").value = data.child("edu").val();
                        document.getElementById("user_job").value = data.child("job").val();
                        document.getElementById("user_salary").value = data.child("salary").val();
                        document.getElementById("user_company_name").value = data.child("companyName").val();
                        document.getElementById("user_company_address").value = data.child("companyPhone").val();
                        document.getElementById("user_company_phone").value = data.child("companyAddress").val();
                        document.getElementById("user_goads").value = data.child("mucdich").val();

                        document.getElementById("relation_name1").value = data.child("relationName1").val();
                        document.getElementById("relation_rela1").value = data.child("relationRela1").val();
                        document.getElementById("relation_phone1").value = data.child("relationPhone1").val();

                        document.getElementById("relation_name2").value = data.child("relationName2").val();
                        document.getElementById("relation_rela2").value = data.child("relationRela2").val();
                        document.getElementById("relation_phone2").value = data.child("relationPhone2").val();

                        document.getElementById("bank_name").value = data.child("bankName").val();
                        document.getElementById("bank_user_name").value = data.child("bankUser").val();
                        document.getElementById("bank_user_number").value = data.child("bankNumber").val();
                        document.getElementById("bank_user_address").value = data.child("bankAddress").val();

                        document.getElementById("facebook").value = data.child("facebook").val();

                        myAvatar = data.child("linkAVATAR").val();
                    }


                });

            }

        } else {
            Auth.signInAnonymously().catch(function(error) {});
        }
    });


    document.getElementById("upload_demo").onclick = function(e) {
        e.preventDefault();
        var temp = '<div class="ui-g" align = "left" style = "font-size:14px"> <h2 class="ui-g-12">1. TTTB SIM chính chủ </h2> <p class="ui-g-12 modal-title" style="text-align: justify;">- Ảnh chụp bằng tính năng chụp màn hình điện thoại hoặc máy tính;</p> <p class="ui-g-12 modal-title" style="text-align: justify;">- Ảnh không qua chỉnh sửa, thay đổi màu sắc và nội dung;</p> <p class="ui-g-12 modal-title" style="text-align: justify;">- Đối với các nhà mạng Viettel & MobiFone & Vinaphone: Gửi tin nhắn theo cú pháp <strong>TTTB</strong> gửi đến số <strong>1414</strong> (miễn phí);</p>  <div class="ui-g-12" align="center"> <img src="https://i.imgur.com/PzyCi4k.jpg" style="max-width:400px;width: 100%; height: auto;margin-top: 20px"> </div> <h2 class="ui-g-12" style="font-weight:500;">2. Ảnh cá nhân </h2> <p class="ui-g-12 modal-title" style="text-align: justify;">- Đảm bảo hình tải lên rõ nét, dễ nhìn, và chỉ có duy nhất gương mặt bạn;</p> <p class="ui-g-12 modal-title" style="text-align: justify;">- Ảnh phải được chụp cùng CMND/CCCD;</p> <p class="ui-g-12 modal-title" style="text-align: justify;">- Ảnh không qua chỉnh sửa hoặc sử dụng các filter làm đẹp;</p> <p class="ui-g-12 modal-title" style="text-align: justify;">- Không đeo khẩu trang, kính màu hoặc hình ảnh có đính kèm sticker;</p> <p class="ui-g-12 modal-title" style="text-align: justify;">- Gương mặt có hướng nhìn thẳng vào camera.</p> <div class="ui-g-12" align="center"> <img src="https://i.imgur.com/VOfze1K.jpg" style="max-width:400px;width:100%; height: auto;margin-top: 20px"> </div> <h2 class="ui-g-12" style="font-weight:500;">3. CMND/CCCD </h2> <p class="ui-g-12 modal-title" style="text-align: justify;">- Ảnh chụp ngay ngắn, rõ nét và không chứa bất kì hình ảnh hoặc tài liệu nào khác;</p> <p class="ui-g-12 modal-title" style="text-align: justify;">- Ảnh không qua chỉnh sửa, thay đổi màu sắc và nội dung;</p> <p class="ui-g-12 modal-title" style="text-align: justify;">- Đối với mặt trước: hình ảnh và các thông tin phải hiển thị rõ ràng, đầy đủ và chính xác; </p> <p class="ui-g-12 modal-title" style="text-align: justify;">- Đối với mặt sau: thông tin phải hiển thị rõ ràng, đầy đủ và chính xác, phải có chữ ký và dấu mộc đỏ của người cấp /nơi cấp.</p> <div class="ui-g-12" align="center"> <img src="https://i.imgur.com/2XnRSLf.jpg" style="max-width:400px;width: 100%; height: auto;margin-top: 20px"> </div> <div class="ui-g-12" align="center"> <img src="https://i.imgur.com/ryh2QJI.jpg" style="max-width:400px;width: 100%; height: auto;margin-top: 20px"> </div> <h2 class="ui-g-12" style="font-weight:500;">4. GPLX </h2> <p class="ui-g-12 modal-title" style="text-align: justify;">- Ảnh chụp ngay ngắn, hình ảnh và các thông tin trên GPLX phải hiển thị rõ nét, đầy đủ và chính xác và không chứa bất kì hình ảnh hoặc tài liệu nào khác;</p> <p class="ui-g-12 modal-title" style="text-align: justify;">- Ảnh không qua chỉnh sửa, thay đổi màu sắc và nội dung.</p> <div class="ui-g-12" align="center"> <img src="https://i.imgur.com/yhaEIVk.jpg" style="max-width:400px;width: 100%; height: auto;margin-top: 20px"> </div> <h2 class="ui-g-12" style="font-weight:500;">5. Sổ hộ khẩu </h2> <p class="ui-g-12 modal-title" style="text-align: justify;">- Ảnh chụp ngay ngắn, rõ nét và không chứa bất kì hình ảnh hoặc tài liệu nào khác;</p> <p class="ui-g-12 modal-title" style="text-align: justify;">- Ảnh không qua chỉnh sửa, thay đổi màu sắc và nội dung;</p> <p class="ui-g-12 modal-title" style="text-align: justify;">- Thông tin trên sổ hộ khẩu phải chuẩn xác;</p> <p class="ui-g-12 modal-title" style="text-align: justify;">- Hộ khẩu phải có dấu chứng nhận của UBND xã, phường nơi cư trú;</p> <p class="ui-g-12 modal-title" style="text-align: justify;">- Trong trường hợp bạn không phải chủ hộ, vui lòng cung cấp thêm hình ảnh phần thông tin của bạn trong SHK. Bổ sung đầy đủ 16 trang sổ hộ khẩu qua email <a href="mailto:hotrovtgonline@gmail.com">hotrovtgonline@gmail.com</a>.</p><div class="ui-g-12" align="center"> <img src="https://i.imgur.com/0usdvKF.jpg" style="max-width:400px;width: 100%; height: auto;margin-top: 20px"> </div> <h2 class="ui-g-12" style="font-weight:500;">6. Facebook </h2> <p class="ui-g-12 modal-title" style="text-align: justify;">- VTG Online yêu cầu trang Facebook cá nhân phải là trang chính thức bạn đang sử dụng. Có ảnh đại diện và các thông tin rõ nét.</p> <p class="ui-g-12 modal-title">- Bước 1: Truy cập vào trang cá nhân của bạn;</p> <p class="ui-g-12 modal-title">- Bước 2: Tại mục cài đặt trang cá nhân chọn <strong>Sao chép liên kết</strong>.</p> <div class="ui-g-12" align="center"> <img src="https://i.imgur.com/dkPIvsL.jpg" style="max-width:200px;max-height:320px; margin-top: 20px"> <img src="https://i.imgur.com/iKPaHKg.jpg" style="max-width:200px;max-height:320px; margin-top: 20px"> </div>  <div id="footer"></div> </div>';
        Swal.fire({
            title: 'Cách gửi hồ sơ',
            html: temp,
            icon: '',
            confirmButtonText: 'Đóng'
        });
    }



   


    setInputFilter(document.getElementById("sotien"), function(value) {
        return /^-?\d*$/.test(value);
    });
    setInputFilter(document.getElementById("kyhan"), function(value) {
        return /^-?\d*$/.test(value);
    });

    $("#user_name").keyup(function(e) {

        var name = $(this).val();
        check_name("check_user_name", name);
    });
    document.getElementById("check_user_name").onclick = function(e) {
        e.preventDefault();
        Swal.fire('Lỗi !', 'Họ và tên không đầy đủ hoặc có chứa các kí tự đặc biệt', 'error')
    }

    $("#relation_name1").keyup(function(e) {

        var name = $(this).val();
        check_name("check_relation_name1", name);
    });
    document.getElementById("check_relation_name1").onclick = function(e) {
        e.preventDefault();
        Swal.fire('Lỗi !', 'Họ và tên không đầy đủ hoặc có chứa các kí tự đặc biệt', 'error')
    }

    $("#relation_name2").keyup(function(e) {

        check_name("check_relation_name2", $(this).val());
    });
    document.getElementById("check_relation_name2").onclick = function(e) {
        e.preventDefault();
        Swal.fire('Lỗi !', 'Họ và tên không đầy đủ hoặc có chứa các kí tự đặc biệt', 'error')
    }

    $("#bank_user_name").keyup(function(e) {

        check_name("check_bank_user_name", $(this).val());
    });
    document.getElementById("check_bank_user_name").onclick = function(e) {
        e.preventDefault();
        Swal.fire('Lỗi !', 'Họ và tên không đầy đủ hoặc có chứa các kí tự đặc biệt', 'error')
    }


    $("#user_phone").keyup(function(e) {
        var phone = $(this).val();
        check_phone("check_user_phone", phone);
    });
    document.getElementById("check_user_phone").onclick = function(e) {
        e.preventDefault();
        Swal.fire('Lỗi !', 'Số điện thoại không đúng định dạng', 'error')
    }

    $("#user_company_phone").keyup(function(e) {

        check_phone("check_company_phone", $(this).val());
    });
    document.getElementById("check_company_phone").onclick = function(e) {
        e.preventDefault();
        Swal.fire('Lỗi !', 'Số điện thoại không đúng định dạng', 'error')
    }
    $("#relation_phone1").keyup(function(e) {

        check_phone("check_relation_phone1", $(this).val());
    });
    document.getElementById("check_relation_phone1").onclick = function(e) {
        e.preventDefault();
        Swal.fire('Lỗi !', 'Số điện thoại không đúng định dạng', 'error')
    }
    $("#relation_phone2").keyup(function(e) {

        check_phone("check_relation_phone2", $(this).val());
    });
    document.getElementById("check_relation_phone2").onclick = function(e) {
        e.preventDefault();
        Swal.fire('Lỗi !', 'Số điện thoại không đúng định dạng', 'error')
    }



    $("#user_email").keyup(function(e) {
        clearTimeout(x_timer);
        document.getElementById("check_email").style.display = 'none';
        var email = $(this).val();

        x_timer = setTimeout(function() {

            document.getElementById("check_email").style.display = 'none';
            // callback_function();
            if (email != '' && !validateEmail(email)) {
                document.getElementById("check_email").style.display = 'block';
            }

        }, 1000);
    });
    document.getElementById("check_email").onclick = function(e) {
        e.preventDefault();
        Swal.fire('Lỗi !', 'Email không đúng định dạng', 'error')
    }

     document.getElementById("check_sotien").onclick = function(e) {
        e.preventDefault();
        Swal.fire('Lỗi !', 'Số tiền vay tối thiểu là 1 000 000 VNĐ và tối đa là 10 000 000 VNĐ', 'error')
    }
    document.getElementById("check_kyhan").onclick = function(e) {
        e.preventDefault();
        Swal.fire('Lỗi !', 'Kỳ hạn vay tối thiểu 1 tháng và tối đa 6 tháng', 'error')
    }
    
                       

    $('#user_province').on('change', function() {

        document.getElementById("user_village").value = '';

        var province = $('#user_province').val();


        var item;
        if (province == 'Tp. Hồ Chí Minh') {

            item = '<option value="Quận 1">Quận 1</option>' +
                '<option value="Quận 2">Quận 2</option>' +
                '<option value="Quận 3">Quận 3</option>' +
                '<option value="Quận 4">Quận 4</option>' +
                '<option value="Quận 5">Quận 5</option>' +
                '<option value="Quận 6">Quận 6</option>' +
                '<option value="Quận 7">Quận 7</option>' +
                '<option value="Quận 8">Quận 8</option>' +
                '<option value="Quận 9">Quận 9</option>' +
                '<option value="Quận 10">Quận 10</option>' +
                '<option value="Quận 11">Quận 11</option>' +
                '<option value="Quận 12">Quận 12</option>' +
                '<option value="Quận Bình Tân">Quận Bình Tân</option>' +
                '<option value="Quận Bình Thạnh">Quận Bình Thạnh</option>' +
                '<option value="Quận Gò Vấp">Quận Gò Vấp</option>' +
                '<option value="Quận Phú Nhuận">Quận Phú Nhuận</option>' +
                '<option value="Quận Tân Bình">Quận Tân Bình</option>' +
                '<option value="Quận Tân Phú">Quận Tân Phú</option>' +
                '<option value="Quận Thủ Đức">Quận Thủ Đức</option>' +
                '<option value="Huyện Bình Chánh">Huyện Bình Chánh</option>' +
                '<option value="Huyện Cần Giờ">Huyện Cần Giờ</option>' +
                '<option value="Huyện Củ Chi">Huyện Củ Chi</option>' +
                '<option value="Huyện Hóc Môn">Huyện Hóc Môn</option>' +
                '<option value="Huyện Nhà Bè">Huyện Nhà Bè</option>';

        } else if (province == 'Long An') {
            item = '<option value="Tp. Tân An">Tp. Tân An</option>' +
                '<option value="Huyện Bến Lức">Huyện Bến Lức</option>' +
                '<option value="Huyện Cần Đước">Huyện Cần Đước</option>' +
                '<option value="Huyện Cần Giuộc">Huyện Cần Giuộc</option>' +
                '<option value="Huyện Châu Thành">Huyện Châu Thành</option>' +
                '<option value="Huyện Đức Hoà">Huyện Đức Hoà</option>' +
                '<option value="Huyện Đức Huệ">Huyện Đức Huệ</option>' +
                '<option value="Huyện Mộc Hoá">Huyện Mộc Hoá</option>' +
                '<option value="Huyện Tân Hưng">Huyện Tân Hưng</option>' +
                '<option value="Thị xã Kiến Tường">Thị xã Kiến Tường</option>' +
                '<option value="Huyện Tân Thạnh">Huyện Tân Thạnh</option>' +
                '<option value="Huyện Tân Trụ">Huyện Tân Trụ</option>' +
                '<option value="Huyện Thạnh Hoá">Huyện Thạnh Hoá</option>' +
                '<option value="Huyện Thủ Thừa">Huyện Thủ Thừa</option>' +
                '<option value="Huyện Vĩnh Hưng">Huyện Vĩnh Hưng</option>';
        }
        document.getElementById("villages").innerHTML = item;

    });



    $('#baohiem').on('change', function() {

        var baohiem = $('#baohiem').val();
        var item;
        if (baohiem == 'Gói Bạch Kim') {
           document.getElementById("check_baohiem").style.display = 'block';
        } else {
           document.getElementById("check_baohiem").style.display = 'none';
        }
       

    });




    $('#uploadSIM').on('change', function() {
        var mfile8 = this.files[0];
        var name = mfile8.name;
        if (this.files && mfile8) {
            var mform = new FormData();
            const newName = phone + 'SIM';
            mform.append('file', mfile8, newName);
            newmfileSIM = mform.get('file');
            document.getElementById("statusSIM").innerHTML = '<strong style ="color:green">Đã chọn</strong>';
            document.getElementById('uploadSIM').style.visibility = 'hidden';
            img_count++;
        }
    });


    $('#uploadCMND1').on('change', function() {
        var mfile1 = this.files[0];
        var name = mfile1.name;
        if (this.files && mfile1) {
            var mform = new FormData();
            const newName = phone + 'CMND1';
            mform.append('file', mfile1, newName);
            newmfileCMND1 = mform.get('file');
            document.getElementById("statusCMND1").innerHTML = '<strong style ="color:green">Đã chọn</strong>';
            document.getElementById('uploadCMND1').style.visibility = 'hidden';
            img_count++;
        }
    });

        $('#uploadCMND2').on('change', function() {
        var mfile4 = this.files[0];
        var name = mfile4.name;
        if (this.files && mfile4) {
            var mform = new FormData();
            const newName = phone + 'CMND2';
            mform.append('file', mfile4, newName);
            newmfileCMND2 = mform.get('file');
            document.getElementById("statusCMND2").innerHTML = '<strong style ="color:green">Đã chọn</strong>';
            document.getElementById('uploadCMND2').style.visibility = 'hidden';
        }
    });

    $('#uploadHDLD').on('change', function() {
        var mfile6 = this.files[0];
        var name = mfile6.name;
        if (this.files && mfile6) {
            var mform = new FormData();
            const newName = phone + 'HDLD';
            mform.append('file', mfile6, newName);
            newmfileHDLD = mform.get('file');
            document.getElementById("statusHDLD").innerHTML = '<strong style ="color:green">Đã chọn</strong>';
            document.getElementById('uploadHDLD').style.visibility = 'hidden';
            img_count++;
        }
    });


    $('#uploadSAOKE1').on('change', function() {
        var mfile7 = this.files[0];
        var name = mfile7.name;
        if (this.files && mfile7) {
            var mform = new FormData();
            const newName = phone + 'SAOKE1';
            mform.append('file', mfile7, newName);
            newmfileSAOKE1 = mform.get('file');
            document.getElementById("statusSAOKE1").innerHTML = '<strong style ="color:green">Đã chọn</strong>';
            document.getElementById('uploadSAOKE1').style.visibility = 'hidden';
            img_count++;
        }
    });


    $('#uploadSAOKE2').on('change', function() {
        var mfile5 = this.files[0];
        var name = mfile5.name;
        if (this.files && mfile5) {
            var mform = new FormData();
            const newName = phone + 'SAOKE2';
            mform.append('file', mfile5, newName);
            newmfileSAOKE2 = mform.get('file');
            document.getElementById("statusSAOKE2").innerHTML = '<strong style ="color:green">Đã chọn</strong>';
            document.getElementById('uploadSAOKE2').style.visibility = 'hidden';
          
        }
    });

    $('#uploadSAOKE3').on('change', function() {
        var mfile2 = this.files[0];
        var name = mfile2.name;
        if (this.files && mfile2) {
            var mform = new FormData();
            const newName = phone + 'SAOKE3';
            mform.append('file', mfile2, newName);
            newmfileSAOKE3 = mform.get('file');
            document.getElementById("statusSAOKE3").innerHTML = '<strong style ="color:green">Đã chọn</strong>';
            document.getElementById('uploadSAOKE3').style.visibility = 'hidden';
      
        }
    });








    setInputFilter(document.getElementById("user_cmnd"), function(value) {
        return /^-?\d*$/.test(value);
    });

    setInputFilter(document.getElementById("user_phone"), function(value) {
        return /^-?\d*$/.test(value);
    });

    setInputFilter(document.getElementById("user_company_phone"), function(value) {
        return /^-?\d*$/.test(value);
    });

    setInputFilter(document.getElementById("relation_phone1"), function(value) {
        return /^-?\d*$/.test(value);
    });

    setInputFilter(document.getElementById("relation_phone2"), function(value) {
        return /^-?\d*$/.test(value);
    });

    setInputFilter(document.getElementById("bank_user_number"), function(value) {
        return /^-?\d*$/.test(value);
    });




});


function check_name(id, name) {
    var x_timer;
    clearTimeout(x_timer);
    x_timer = setTimeout(function() {
        document.getElementById(id).style.display = 'none';
        // callback_function();
        if (name != '' && !validateName(name)) {
            document.getElementById(id).style.display = 'block';
        }
    }, 1000);

}


function check_phone(id, phone) {
    var x_timer;
    clearTimeout(x_timer);
    x_timer = setTimeout(function() {
        document.getElementById(id).style.display = 'none';
        if (phone != '' && !validatePhone(phone)) {
            document.getElementById(id).style.display = 'block';
        }
    }, 1000);

}



function validateName(name) {
    if (name != null && name != '') {
        var trim_name = name.trim();
        var re = /^([a-zA-ZàáảãạăằắẳẵặâầấẩẫậđĐèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởõợùúủũụưừứữựỳýỷỹỵÀÁẢÃẠĂẰẮẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỮỬỰỲÝỶỸỴ]{2,})+(?:[ _-]([a-zA-ZàáảãạăằắẳẵặâầấẩẫậđĐèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứữựỳýỷỹỵÀÁẢÃẠĂẰẮẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỮỬỰỲÝỶỸỴ]{1,})+)*$/;
        return re.test(String(trim_name));
    } else {
        return false;
    }
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    return phone.match(/^([0]{1}[235789]{1}[0-9]{8})$/);
}

function makeId(length) {

    var newid = "AZERTYUIOPQSDFGHJKLMNBVCXW";

    var result = '';
    var charactersLength = newid.length;
    for (var i = 0; i < length; i++) {
        result += newid.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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

function uploadImg() {


    var dbRef = firebase.database();
    var storageRef = firebase.storage().ref();


    Swal.fire({
        icon: 'info',
        title: 'Gửi hồ sơ',
        html: '<p style="text-align:justify">Quá trình tải hồ sơ có thể mất vài phút tuỳ vào tốc độ đường truyền của bạn. Vui lòng chọn tiếp tục và chờ cho đến khi có thông báo tiếp theo!</p>',
        confirmButtonText: 'Tiếp tục'
    }).then((result) => {
        if (result.value) {
            $("body").css("cursor", "progress");
            $('#loader').show();
            $("body").css("pointer-events", "none");
            document.getElementById("mrs").innerHTML = 'Đang gửi hồ sơ, vui lòng chờ trong giây lát...';




            if (newmfileSIM !=null) {

                var uploadTask8 = storageRef.child('images/' + newmfileSIM.name).put(newmfileSIM);

                uploadTask8.on('state_changed',
                    function(snapshot) {},
                    function(error) {},
                    function() {

                        // Handle successful uploads on complete

                        uploadTask8.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                            dbRef.ref('USER').child(vnphone).update({

                                linkSIM: downloadURL

                            }, function(err) {
                                if (err) {
                                    $('#loader').hide();
                                    $("body").css("cursor", "default");
                                    $("body").css("pointer-events", "auto");
                                    document.getElementById("statusSIM").innerHTML = 'Lỗi: ' + error.code;
                                } else {
                                    document.getElementById("statusSIM").innerHTML = '<p style ="color:orange"> Đang chờ phê duyệt... </p>';
                                    console.log('linkSIM = ' + downloadURL);
                                    showalert();
                                }
                            });

                        });
                    });
            }


            if (newmfileCMND1 !=null) {

                var uploadTask1 = storageRef.child('images/' + newmfileCMND1.name).put(newmfileCMND1);

                uploadTask1.on('state_changed',
                    function(snapshot) {},
                    function(error) {},
                    function() {

                        uploadTask1.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                            dbRef.ref('USER').child(vnphone).update({

                                linkCMND1: downloadURL

                            }, function(err) {
                                if (err) {
                                    $('#loader').hide();
                                    $("body").css("cursor", "default");
                                    $("body").css("pointer-events", "auto");
                                    document.getElementById("statusCMND1").innerHTML = 'Lỗi: ' + error.code;
                                } else {
                                    document.getElementById("statusCMND1").innerHTML = '<p style ="color:orange">Đang chờ phê duyệt... </p>';
                                    console.log('linkCMND1 = ' + downloadURL);
                                    showalert();

                                }
                            });

                        });
                    });
            }


            if (newmfileCMND2 !=null) {

                var uploadTask4 = storageRef.child('images/' + newmfileCMND2.name).put(newmfileCMND2);

                uploadTask4.on('state_changed',
                    function(snapshot) {},
                    function(error) {},
                    function() {

                        // Handle successful uploads on complete

                        uploadTask4.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                            dbRef.ref('USER').child(vnphone).update({

                                linkCMND2: downloadURL

                            }, function(err) {
                                if (err) {
                                    $('#loader').hide();
                                    $("body").css("cursor", "default");
                                    $("body").css("pointer-events", "auto");
                                    document.getElementById("statusCMND2").innerHTML = 'Lỗi: ' + error.code;
                                } else {
                                    document.getElementById("statusCMND2").innerHTML = '<p style ="color:orange"> Đang chờ phê duyệt... </p>';
                                    console.log('linkCMND2 = ' + downloadURL);
                                    showalert();
                                }
                            });

                        });
                    });
            }

            if (newmfileHDLD !=null) {

                var uploadTask6 = storageRef.child('images/' + newmfileHDLD.name).put(newmfileHDLD);

                uploadTask6.on('state_changed',
                    function(snapshot) {},
                    function(error) {},
                    function() {

                        // Handle successful uploads on complete

                        uploadTask6.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                            dbRef.ref('USER').child(vnphone).update({

                                linkHDLD: downloadURL

                            }, function(err) {
                                if (err) {
                                    $('#loader').hide();
                                    $("body").css("cursor", "default");
                                    $("body").css("pointer-events", "auto");
                                    document.getElementById("statusHDLD").innerHTML = 'Lỗi: ' + error.code;
                                } else {
                                    document.getElementById("statusHDLD").innerHTML = '<p style ="color:orange"> Đang chờ phê duyệt... </p>';
                                    console.log('linkHDLD = ' + downloadURL);
                                    showalert();
                                }
                            });

                        });
                    });
            }


            if (newmfileSAOKE1 !=null) {

                var uploadTask7 = storageRef.child('images/' + newmfileSAOKE1.name).put(newmfileSAOKE1);

                uploadTask7.on('state_changed',
                    function(snapshot) {},
                    function(error) {},
                    function() {

                        // Handle successful uploads on complete

                        uploadTask7.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                            dbRef.ref('USER').child(vnphone).update({

                                linkSAOKE1: downloadURL

                            }, function(err) {
                                if (err) {
                                    $('#loader').hide();
                                    $("body").css("cursor", "default");
                                    $("body").css("pointer-events", "auto");
                                    document.getElementById("statusSAOKE1").innerHTML = 'Lỗi: ' + error.code;
                                } else {
                                    document.getElementById("statusSAOKE1").innerHTML = '<p style ="color:orange"> Đang chờ phê duyệt... </p>';
                                    console.log('linkSAOKE1 = ' + downloadURL);
                                    showalert();
                                }
                            });

                        });
                    });
            }



            if (newmfileSAOKE2 !=null) {

                var uploadTask5 = storageRef.child('images/' + newmfileSAOKE2.name).put(newmfileSAOKE2);

                uploadTask5.on('state_changed',
                    function(snapshot) {},
                    function(error) {},
                    function() {

                        // Handle successful uploads on complete

                        uploadTask5.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                            dbRef.ref('USER').child(vnphone).update({

                                linkSAOKE2: downloadURL

                            }, function(err) {
                                if (err) {
                                    $('#loader').hide();
                                    $("body").css("cursor", "default");
                                    $("body").css("pointer-events", "auto");
                                    document.getElementById("statusSAOKE2").innerHTML = 'Lỗi: ' + error.code;
                                } else {
                                    document.getElementById("statusSAOKE2").innerHTML = '<p style ="color:orange"> Đang chờ phê duyệt... </p>';
                                    console.log('linkSAOKE2 = ' + downloadURL);
                                    showalert();
                                }
                            });

                        });
                    });
            }

            if (newmfileSAOKE3 !=null) {

                var uploadTask2 = storageRef.child('images/' + newmfileSAOKE3.name).put(newmfileSAOKE3);

                uploadTask2.on('state_changed',
                    function(snapshot) {},
                    function(error) {},
                    function() {

                        // Handle successful uploads on complete

                        uploadTask2.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                            dbRef.ref('USER').child(vnphone).update({

                                linkSAOKE3: downloadURL

                            }, function(err) {
                                if (err) {
                                    $('#loader').hide();
                                    $("body").css("cursor", "default");
                                    $("body").css("pointer-events", "auto");
                                    document.getElementById("statusSAOKE3").innerHTML = 'Lỗi: ' + error.code;
                                } else {
                                    document.getElementById("statusSAOKE3").innerHTML = '<p style ="color:orange">Đang chờ phê duyệt... </p>';
                                    console.log('linkSAOKE3 = ' + downloadURL);
                                    showalert();
                                }
                            });

                        });
                    });
            }


        }
    })

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

    if (!isSubmit) {

        var temp = ' <div class="ui-g" align="left" style ="font-size:14px"> <div class="ui-g-4">Thời gian</div> <div class="ui-g-8">Ngày ' + dd + '/' + mm + '/' + yyyy + ' lúc ' + hour + ':' + minutes + '</div> <div class="ui-g-4">Địa chỉ IP</div> <div class="ui-g-8">' + IPv4 + '</div> <div class="ui-g-4">Tọa độ</div> <div class="ui-g-8">' + latitude.toString().substring(0, 10) + ', ' + longitude.toString().substring(0, 10) + '</div> <div class="ui-g-4 calc-left">Tên thiết bị</div> <div class="ui-g-8 calc-right">' + deviceinfo.split("AppleWebKit")[0] + '</div> <div class="google-maps"> <iframe src="https://www.google.com/maps?q=' + latitude + ',' + longitude + '&hl=es&z=18&amp&output=embed" target="_self" width="400" height="300" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0">Your browser does not support iframes.</iframe> </div> <p>Vui lòng chụp lại ảnh màn hình hiện tại và gửi về địa chỉ email:<a href="mailto:hotrovtgonline@gmail.com"> <span style=" font-weight: 600">hotrovtgonline@gmail.com</span></a>.</p> </div>';
        Swal.fire({
            title: 'Tọa độ và thiết bị',
            html: temp,
            icon: '',
            confirmButtonText: 'Đóng'
        });

    } else {

        uploadInfo(position);
    }

}


    function error(error) {

        $('#loader').hide();

        switch (error.code) {
            case error.PERMISSION_DENIED:
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi !',
                    confirmButtonColor: '#5742f5',
                    confirmButtonText: 'Đóng',
                    text: 'Bạn đã chặn quyền truy cập vị trí trên trình duyệt này',
                    footer: '<a href ="setup.html" target="_blank" style="color:#5742f5" ><center>Xem hướng dẫn</center></a>'
                });
                break;
            case error.POSITION_UNAVAILABLE:
                Swal.fire({
                    title: 'Trình duyệt không hỗ trợ !',
                    html: 'Vui lòng sử dụng trình duyệt khác </br>(Chrome, IE, Firefox, Safari, Google, Opera,...)</br>Error: <span style="color:red"> ' + error.code + '.</span>',
                    icon: 'error',
                    footer: '<a href="#" onclick="event.preventDefault();environment_error()" style="color:#5742f5" ><center>Xem hướng dẫn</center></a>'
                });
                break;
            case error.TIMEOUT:
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi !',
                    confirmButtonColor: '#5742f5',
                    confirmButtonText: 'Đóng',
                    text: 'Yêu cầu truy cập vị trí của bạn đã hết hạn',
                    footer: '<a href ="setup.html" target="_blank" style="color:#5742f5" ><center>Xem hướng dẫn</center></a>'
                });
                break;
            case error.UNKNOWN_ERROR:
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi định vị !',
                    confirmButtonColor: '#5742f5',
                    confirmButtonText: 'Đóng',
                    html: '<p style="text-align:justify">VTG Online không thể xác định vị trí của bạn! Để tiếp tục vui lòng bật định vị trong phần cài đặt của thiết bị và cho phép trình duyệt truy cập vị trí của bạn</p>',
                    footer: '<a href ="setup.html" target="_blank" style="color:#5742f5" ><center>Xem hướng dẫn</center></a>'
                });
                break;
        }
    }


    function showalert() {

        if (!isSuccessUpload) {

            isSuccessUpload = true;

            $('#loader').hide();
            $("body").css("cursor", "default");
            $("body").css("pointer-events", "auto");
            document.getElementById("mrs").innerHTML = '<span style="color: #32CD32">Hồ sơ của bạn đã được gửi thành công !</span>';


            Swal.fire('Gửi thành công !', 'Vui lòng kiểm tra email để nhận kết quả trong 24h tới \n(trừ Thứ 7, Chủ nhật và các ngày lễ)', 'success').then((result) => {
                window.location.reload();
            })
        }

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
            var sothangconlai = sothangconlai = parseInt(thoihan) - parseInt(tongsothangdatra);

            var total = parseInt(sotientramoithang.replace(/\s/g, '')) + parseInt(phiquahan.replace(/\s/g, '')) + parseInt(sotienconno.replace(/\s/g, '')) + parseInt(laisuatconno.replace(/\s/g, '')) + parseInt(phidichvuconno.replace(/\s/g, '')) + parseInt(phigiahanconno.replace(/\s/g, ''));
            total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");


            var bill = '<a href="#" target="_blank" onclick="event.preventDefault();hoadon(\'' + sohopdong + '\',\'' + name + '\',\'' + sotientramoithang + '\',\'' + phiquahan + '\',\'' + sotienconno + '\',\'' + laisuatconno + '\',\'' + phidichvuconno + '\',\'' + phigiahanconno + '\',\'' + total + '\',\'' + ngayvay + '\',\'' + ngaytratieptheo + '\')"><span style="color: red;font-weight:bold"> ' + total + 'đ <span style="font-weight:normal">(Xem chi tiết)</span></span></a>'


            if (ngaytratieptheo == '' || ngaytratieptheo == null) {
                ngaytratieptheo = 'Đang chờ phê duyệt hồ sơ...'
            }
            var temp = '<div class="ui-g" align = "left" style = "font-size:14px"><div class="ui-g-5 calc-left">Họ và tên</div> <div class="ui-g-7 calc-right">' + name + '</div> <div class="ui-g-5 calc-left">Số tiền thanh toán</div> <div class="ui-g-7 calc-right">' + bill + '</div> <div class="ui-g-5 calc-left">Thanh toán trước ngày</div> <div class="ui-g-7 calc-right">' + ngaytratieptheo + '</div>  <div class="ui-g-5 calc-left">Số tháng đã trả</div> <div class="ui-g-7 calc-right">  ' + tongsothangdatra + '</div> <div class="ui-g-5 calc-left">Số tháng còn lại</div> <div class="ui-g-7 calc-right"> ' + sothangconlai + '</div> <div class="ui-g-5 calc-left">Số ngày quá hạn</div> <div class="ui-g-7 calc-right"> <strong style="color: red;">' + songayquahan + '</strong> </div> <div class="ui-g-5 calc-left">Lời nhắn</div> <div class="ui-g-7 calc-right"> <strong> ' + note + '</strong> </div> <div class="ui-g"> <div class="ui-g-12"><br><br> <p>Chuyển tiền vào tài khoản Ngân hàng sau:</p></div> <div class="ui-g-4 calc-left">Số Tài khoản</div> <div class="ui-g-8 calc-right"><span style="font-weight: 600">19035740331018</span></div> <div class="ui-g-4 calc-left">Tên Tài khoản</div> <div class="ui-g-8 calc-right"><span style="font-weight: 600">TRAN HOANG SON</span></div> <div class="ui-g-4 calc-left">Tên Ngân hàng</div> <div class="ui-g-8 calc-right"><span style="font-weight: 400">Techcombank</span></div> <div class="ui-g-4 calc-left">Chi nhánh</div> <div class="ui-g-8 calc-right"><span style="font-weight: 400">Tp. Hồ Chí Minh</span></div> <div class="ui-g-4 calc-left">Nội dung</div><div class="ui-g-8 calc-right"><span style="font-weight: 400">Thanh toán cho KH: "Tên khách hàng" SHĐ: “Mã hợp đồng của bạn.”</span></div> </div></div> ';
            Swal.fire({
                title: 'THÔNG TIN HĐ&nbsp;<a href="#" onclick="event.preventDefault();viewContract(\'' + sohopdong + '\')"><span style="color: orange;font-weight:bold"> ' + sohopdong + '</span></a>',
                html: temp,
                icon: '',
                allowOutsideClick: false,
                confirmButtonText: 'Đóng'
            });

        });

    }


    function uploadInfo(position) {

        console.log('upload Info...')

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var hour = today.getHours();
        var minutes = today.getMinutes();

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var deviceinfo = navigator.appVersion;




        var dbRef = firebase.database();
        var email_auth = '';

        var sotien = $('#sotien').val();
        var kyhan = $('#kyhan').val();
        var sotientramoithang = $('#sotientramoithang').val();
        var phidichvu = $('#phidichvu').val();


        var user_name = $('#user_name').val();
        var user_phone = $('#user_phone').val();
        var user_email = $('#user_email').val();


        var user_cmnd = $('#user_cmnd').val();
        var user_date_of_birth = $('#user_date_of_birth').val();
        var user_gender = $('#user_gender').val();
        var user_status = $('#user_status').val();
        var user_province = $('#user_province').val();
        var user_village = $('#user_village').val();
        var user_address = $('#user_address').val();
        var user_lifetime = $('#user_lifetime').val();

        var user_edu = $('#user_edu').val();
        var user_job = $('#user_job').val();
        var user_salary = $('#user_salary').val();
        var user_company_name = $('#user_company_name').val();
        var user_company_address = $('#user_company_address').val();
        var user_company_phone = $('#user_company_phone').val();


        var relation_name1 = $('#relation_name1').val();
        var relation_rela1 = $('#relation_rela1').val();
        var relation_phone1 = $('#relation_phone1').val();

        var relation_name2 = $('#relation_name2').val();
        var relation_rela2 = $('#relation_rela2').val();
        var relation_phone2 = $('#relation_phone2').val();


        var bank_name = $('#bank_name').val();
        var bank_user_name = $('#bank_user_name').val();
        var bank_user_number = $('#bank_user_number').val();
        var bank_user_address = $('#bank_user_address').val();


        var user_goad = $('#user_goad').val();
       

        var baohiem = $('#baohiem').val();
        var ttbaohiem = $('#ttbaohiem').val();
        var url = $('#facebook').val();
        var kehoachtra = $('#kehoachtra').val();


        
        var parts = url.split("/");
        var fbID  = parts[parts.length - 1]; 

      


        var linkAVATAR;
        if (myAvatar==null) {
 			linkAVATAR = 'https://firebasestorage.googleapis.com/v0/b/vtgonl.appspot.com/o/images%2Favatar.png?alt=media&token=ef50f59f-9d15-48c1-9fea-3108e2d3bed0';
        }else{
        	linkAVATAR = myAvatar;
        }

       


        sotien = parseInt(sotien.replace(/\s/g, '')).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        kyhan = parseInt(kyhan.replace(/\s/g, '')).toString();
        sotientramoithang = parseInt(sotientramoithang.replace(/\s/g, '')).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        user_date_of_birth = user_date_of_birth.split(" ")[0];


        if (img_count < 3) {

            Swal.fire('Hồ sơ không đầy đủ!', 'Vui lòng cung cấp ít nhất 3 tài liệu được yêu cầu', 'error');
            document.getElementById("loader").style.display = "none";
            return false;
        }

        $("body").css("cursor", "progress");
        document.getElementById("loader").style.display = "block";



        console.log('updating USER database...')
        dbRef.ref('USER').child(vnphone).update({
            ACTIVE: "false",
            name: user_name,
            phone: phone,
            email: user_email,
            id: user_cmnd,
            birthday: user_date_of_birth,
            gender: user_gender,
            status: user_status,
            province: user_province,
            village: user_village,
            address: user_address,
            lifeTime: user_lifetime,
            bankName:bank_name,
            bankUser:bank_user_name,
            bankNumber:bank_user_number,
            bankAddress:bank_user_address,
            job: user_job,
            edu: user_edu,
            salary: user_salary,
            companyName: user_company_name,
            companyAddress: user_company_address,
            companyPhone: user_company_phone,
            relationName1: relation_name1,
            relationPhone1: relation_phone1,
            relationRela1: relation_rela1,
            relationName2: relation_name2,
            relationPhone2: relation_phone2,
            relationRela2: relation_rela2,
            facebook: fbID,
            lat: latitude,
            lng: longitude,
            deviceinfo: deviceinfo,
            ip: IPv4,
            baohiem: baohiem,
            ttbaohiem: ttbaohiem,
            linkAVATAR:linkAVATAR,
            onCreated: dd + '/' + mm + '/' + yyyy
        }, function(err) {
            if (err) {
                Swal.fire('Lỗi !', err.code, 'error');
                $("body").css("cursor", "default");
                document.getElementById("loader").style.display = "none";

            } else {

                console.log('updating LOAN database...')
                dbRef.ref('LOAN').child(shd).set({
                    SHD: shd,
                    STATUS: 'pending',
                    name: user_name,
                    phone: user_phone,
                    email: user_email,
                    sotien: sotien,
                    thoihan: kyhan,
                    sotientramoithang: sotientramoithang,
                    ngaytao: dd + '/' + mm + '/' + yyyy + ' lúc ' + hour + ':' + minutes,
                    mucdich: user_goad,
                    kehoachtra: kehoachtra,
                    tongsothangdatra: '0',
                    facebook: fbID,
                    lat: latitude,
                    lng: longitude,
                }, function(err) {

                    $("body").css("cursor", "default");
                    document.getElementById("loader").style.display = "none";

                    if (err) {
                        Swal.fire('Lỗi !', err.code, 'error');

                    } else {
                        console.log('uploading images....')
                        uploadImg();
                    }
                });
            }
        });




    }


    function getAccount() {

        var dbRef = firebase.database();

        dbRef.ref('USER').child(vnphone).once('value').then(function(result) {

            if (result.val() != null) {

                var userActive = result.child('ACTIVE').val();
                var username = result.child('name').val();
                var userphone = result.child('phone').val();
                var useremail = result.child('email').val();

            

                if (userActive == 'admin') {

                    Swal.fire({
                        title: 'Login as admin',
                        html: 'Bạn có muốn truy cập trang quản lý không?',
                        icon: 'question',
                        showDenyButton: true,
                        denyButtonText: 'Thoát',
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

                    dbRef.ref('LOAN').orderByChild('phone').equalTo(vnphone).on("value", function(snapshot) {
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

                        var temp = '<form action="#"> <div class="page slide-page"> <div class="field"><div align=left><div class="label">Họ và Tên</div><input value="' + username + '" type="text" style="pointer-events: none"></div> <div class="field"><div align=left><div class="label">Số điện thoại</div><input  value="' + userphone + '" maxlength="10" type="text" style="pointer-events: none"></div><div class="field"><div align=left><div class="label">Email</div><input  value="' + useremail + '"  type="text" style="pointer-events: none"></div><div class="field"><div align=left><div class="label">Mã hợp đồng</div><p> ' + userloan + '</p> <p> <span style="color:orange;">&#9632;</span> Đang phê duyệt</p> <p> <span style="color:green;">&#9632;</span> Đang hiệu lực</p> <p> <span style="color:grey;">&#9632;</span> Đã kết thúc</p> <p> <span style="color:red;">&#9632;</span> Bị từ chối</p></div> </div> </div></form>';

                        Swal.fire({
                            title: 'Thông tin Tài khoản',
                            html: temp,
                            icon: '',
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Thanh toán',
                            confirmButtonColor: '#d43f8d',
                            denyButtonText: 'Thoát',
                            cancelButtonText: 'Đóng',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                document.getElementById("payment").click();
                            } else if (result.isDenied) {
                                firebase.auth().signOut();
                                window.location.reload();
                            }
                        })
                    });
                }
            } 
            
        });
    }

    function viewContract(shd) {

        if (shd.length < 6) {
            Swal.fire('Lỗi !', 'Hợp đồng giao dịch không tồn tại', 'error');
            return false;
        }

        window.open('http://vtgonl.firebaseapp.com/contract.html?shd=' + shd, '_blank');
    }


    function environment_error() {

        var temp = ' <p>Bước 1: Truy cập vào biểu tượng chia sẻ</p> \n(biểu tượng dấu 3 chấm đối với thiết bị Android) <p><img src="https://i.imgur.com/OSvar93.jpg" style="max-width:400px;width: 100%; height: auto;margin-top: 20px"></p> <p>Bước 2: Chọn <strong>Open in Safari</strong> đối với thiết bị IOS \n(hoặc <strong>Open in Browser</strong> đối với thiết bị Android)</p> <p><img src="https://i.imgur.com/fb5L7eQ.jpg" style="max-width:400px;width: 100%; height: auto;margin-top: 20px" ></p>  <p>Hoặc bạn có thể chọn mở bằng một trong các trình duyệt thông dụng bất kỳ khác như hình sau</p> <p><img src="https://i.imgur.com/Mrw0MKH.jpg" style="max-width:400px;width: 100%; height: auto;margin-top: 20px"></p> <p>Bước 3: Sau khi mở trình duyệt đã chọn, tiến hành đăng ký lại bình thường. Chúc bạn thàng công !</p>';

        Swal.fire({
            title: 'Lỗi trình duyệt không hỗ trợ !',
            html: temp,
            icon: '',
            confirmButtonText: 'Đóng'
        })

    }


    function tientra(sotien, sothang) {
        var rs = (((sotien / sothang) + (sotien * 0.08)));
        return Math.round(rs * 0.001).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' 000';
    }

    function tienphi(sotien, sothang) {
        var index = 0.10;
        if (sothang > 1) {
            index = index + (sothang - 1) * 0.01
        }
        var rs = sotien * index;
        return Math.round(rs).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

