(function ($) {
    function convertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
    
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','
    
                line += array[i][index];
            }
    
            str += line + '\r\n';
        }
    
        return str;
    }
    
    function exportCSVFile(headers, items, fileTitle) {
        if (headers) {
            items.unshift(headers);
        }
    
        // Convert Object to JSON
        var jsonObject = JSON.stringify(items);
    
        var csv = convertToCSV(jsonObject);
    
        var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
    
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilenmae);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    $(document).ready(function(){
        // Here you can use regular $ sign
        $("#winnerpopup").hide();
        $("#survey_form .form-row").each(function(){
            var classname = $(this).attr('class');
            if(classname.indexOf('question_') > -1 && parseInt(classname.substring(classname.indexOf('question_')+9)) > parseInt($("#id_questions_count").val())){
                $(this).hide();
            }
            if(classname.indexOf('question_') == -1){
                $("#survey_main_part").append($(this));
            }
        });
        $(".answer_select_part select option").each(function(){
            var question_count = parseInt($("#id_questions_count").val());
            if(parseInt($(this).html()) > question_count){
                $(this).hide();
            }
        });
        $(".survey_question_part").each(function(){
            var question_choice = null;
            $(this).find(".choice_part input[type='radio']").each(function(){
                if($(this).is(':checked')){
                    question_choice = $(this).val();
                }
            });
            if(question_choice != "1"){
                $(this).find('.answer_text_part').hide();
            }
            if(question_choice != "2"){
                $(this).find('.answer_image_part').hide();
            }
            var text_row_count = 0;
            $(this).find(".answer_text_part .row").each(function(){
                if(text_row_count > $(this).parent().find("select").val()){
                    $(this).hide();
                }
                text_row_count++;
            })
        });
        $(".survey_question_part .choice_part input[type='radio']").click(function(){
            var question_choice = $(this).val();
            if(question_choice == "1"){
                $(this).parent().parent().parent().parent().find('.answer_text_part').show();
                $(this).parent().parent().parent().parent().find('.answer_image_part').hide();
            }else if(question_choice == "2"){
                $(this).parent().parent().parent().parent().find('.answer_image_part').show();
                $(this).parent().parent().parent().parent().find('.answer_text_part').hide();
            }
            var text_row_count = 0;
            $(this).parent().parent().parent().parent().find(".answer_text_part .row").each(function(){
                if(text_row_count > $(this).parent().find("select").val()){
                    $(this).hide();
                }else{
                    $(this).show();
                }
                text_row_count++;
            })
        });
        $(".survey_question_part .answer_text_part select").change(function(){
            var text_row_count = 0; var count_val = $(this).val();
            $(this).parent().parent().parent().find(".row").each(function(){
                if(text_row_count > count_val){
                    $(this).hide();
                }else{
                    $(this).show();
                }
                text_row_count++;
            })
        });
        $(".survey_question_part .answer_image_part .numberoption_container input[type='radio']").click(function(){
            var image_row_count = 0; var count_val = $(this).val();
            $(this).parent().parent().parent().parent().parent().find(".image_row").each(function(){
                if(image_row_count >= count_val){
                    $(this).hide();
                }else{
                    $(this).show();
                }
                image_row_count++;
            })
        });
        $("#id_questions_count").change(function(){
            var questions_count = parseInt($("#id_questions_count").val());
            $("#survey_form .form-row").each(function(){
                var classname = $(this).attr('class');
                if(classname.indexOf('question_') > -1 && parseInt(classname.substring(classname.indexOf('question_')+9)) > questions_count){
                    $(this).hide();
                }else if(classname.indexOf('question_') > -1){
                    $(this).show();
                }
            });
            $(".answer_select_part select option").each(function(){
                if(parseInt($(this).html()) > questions_count){
                    $(this).hide();
                }else{
                    $(this).show();
                }
            })
        })
        $('.sweepItem').click(function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            }else{
                $(this).addClass('active');
            }
        });
        $(".field-background_image_after_sweepstake_check input[type='radio']").change(function(){
           if($(this).val() == 'no'){
                $(".field-background_image_after_sweepstake").hide();
           }else{
                $(".field-background_image_after_sweepstake").show();
           }
        })
        $(".field-survey1_check input[type='radio']").change(function(){
            if($(this).val() == 'no'){
                 $(".field-survey1_name").hide();
            }else{
                 $(".field-survey1_name").show();
            }
         })
         $(".field-survey2_check input[type='radio']").change(function(){
            if($(this).val() == 'no'){
                 $(".field-survey2_name").hide();
            }else{
                 $(".field-survey2_name").show();
            }
         })
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        var csrftoken = getCookie('csrftoken');
        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });
        $('.saveSettings').click(function(){
            var settingType = $("#settingType").val();
            if(settingType == "tablet"){
                var currentSweep = $("#currentSweepID").val()+",";
                var index = 0; var tabletCount = $('.sweepItem').size();
                $('.sweepItem').each(function(){
                    var sweep_ids = $(this).parent().find(".tablet_sweepids").val();
                    if($(this).hasClass("active")){
                        if(sweep_ids.indexOf(currentSweep) == -1)
                            sweep_ids = sweep_ids + currentSweep;
                    }else{
                        if(sweep_ids.indexOf(currentSweep) != -1)
                            sweep_ids = sweep_ids.replace(currentSweep, '');
                    }
                    $.ajax({
                        url: '/tablets/'+$(this).parent().find('.tablet_id').val()+"/?sweep_ids="+sweep_ids+"&active_sweep=",
                        type: 'PUT',
                        success: function() {
                            if(index == tabletCount - 1){
                                window.location.href='/admin/sweepstake?id='+$("#currentSweepID").val();
                            }
                            index ++;
                        }
                    });
                });
            }else{
                var sweep_ids = '';
                $('.sweepItem').each(function(){
                    if($(this).hasClass("active"))
                        sweep_ids += $(this).parent().find('.sweepItemID').val()+",";
                });
                console.log({sweep_ids});
                $.ajax({
                    url: '/tablets/'+$("#tabletID").val()+"/?sweep_ids="+sweep_ids+"&active_sweep=",
                    type: 'PUT',
                    success: function() {
                        window.location.href='/admin/home/tablet/';
                    }
                });
            }
        });
        $('.selectedsweep').click(function(){
            if(!$(this).hasClass("active")){
                var sweep_id = $(this).parent().find(".selectedsweepid").val();
                $.ajax({
                    url: '/tablets/'+$(this).parent().parent().find('.tabletIDVal').val()+"/?active_sweep="+sweep_id,
                    type: 'PUT',
                    success: function() {
                        window.location.reload();
                    }
                });    
            }
        });
        
        $("#searchTabletText").keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                window.location.href = "?key="+$(this).val();
            }
        });

        $("#searchbyTableID").keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                var url;
                if(window.location.href.indexOf("&key") == -1)
                    url = window.location.href + "&key="+$(this).val();
                else
                    url = window.location.href.substring(0, window.location.href.indexOf("&key")) + "&key="+$(this).val();
                window.location.href = url;
            }
        });

        $("#set_tablet_password").click(function(){
            var tablet_pass = $("#tablet_pass").val();
            $.ajax({
                url: '/settings/',
                type: 'GET',
                success: function(res) {
                    if(res.settings.length == 0){
                        $.ajax({
                            url: '/settings/?device_code='+tablet_pass,
                            type: 'POST',
                            success: function() {
                                window.location = '/admin';
                            }
                        });
                    }else{
                        $.ajax({
                            url: '/settings/?device_code='+tablet_pass,
                            type: 'PUT',
                            success: function() {
                                window.location = '/admin';
                            }
                        });
                    }
                }
            });
        })

        $('#searchTablet').click(function(){
            window.location.href = "?key="+$("#searchTabletText").val();
        });

        $("#generatewinner").click(function(){
            var ids = $("#tabletIDS").val().split(",");
            var winner_id = ids[Math.floor(Math.random() * ids.length)];
            $.ajax({
                url: '/generatewinner/?sweep_id='+$("#sweepID").val()+"&winner_id="+winner_id,
                type: 'POST',
                success: function(res) {
                    $("#winnerpopup").html(res.success);
                    $("#winnerpopup").fadeIn(500);
                    setTimeout(function(){
                        window.location.reload();
                    }, 5000)
                }
            });
        });

        $("#downloadsweepdetails").click(function(){
            var sweepID = $("#sweepID").val();
            var sweepKey = $("#sweepKey").val();

            $.ajax({
                url: '/getsweepdetailslist/?sweep_id='+sweepID+"&sweep_key="+sweepKey,
                type: 'GET',
                success: function(res) {
                    var headers = {
                        firstname: 'First Name', // remove commas to avoid errors
                        lastname: "Last Name",
                        phoneno: "Phone",
                        tabletID: "Tablet ID",
                        checkin: "Check Time"
                    };
                    
                    var fileTitle = 'sweepstakecheckin';

                    var itemsFormatted = [];
                    $.each(res, function(i){
                        itemsFormatted.push({firstname: '', lastname: '', phoneno: '', tabletID: '', checkin: ''});
                        var date = new Date(res[i].fields.check_time);
                        itemsFormatted[i].checkin = date.toString('yy-MM-dd H:i:s');
                        $.ajax({
                            url: '/sweepuser/'+ res[i].fields.user_id,
                            type: 'GET',
                            success: function(res1) {
                                itemsFormatted[i].firstname = res1.user.first_name;
                                itemsFormatted[i].lastname = res1.user.last_name;
                                itemsFormatted[i].phoneno = res1.user.phone;

                                $.ajax({
                                    url: '/tablets/'+ res[i].fields.tablet_id,
                                    type: 'GET',
                                    success: function(res2) {
                                        itemsFormatted[i].tabletID = res2.tablets[0].name;
                                        if(i == res.length - 1){
                                            exportCSVFile(headers, itemsFormatted, fileTitle);
                                        }
                                    }
                                })
                            }
                        });
                    });
                }
            });
        })

        $("#downloadsweepusers").click(function(){
            var sweepID = $("#sweepID").val();
            var sweepKey = $("#sweepKey").val();

            $.ajax({
                url: '/sweepusers/',
                type: 'GET',
                success: function(res) {
                    var headers = {
                        first_name: 'First Name', // remove commas to avoid errors
                        last_name: "Last Name",
                        phone: "Phone",
                        email: "Email Address",
                        address: "Address",
                        city: "City",
                        state: "State",
                        zipcode: "Zip Code",
                        po_box_unit_number: "PO Box(Unit Number)",
                        suite: "Suite",
                        checkSMS: "SMS",
                        checkEmail: "Email"
                    };
                    console.log(res);
                    
                    var fileTitle = 'Users';

                    var itemsFormatted = [];
                    for(var i = 0; i < res.users.length; i++){
                        itemsFormatted.push({first_name: res.users[i].first_name, last_name: res.users[i].last_name, phone: res.users[i].phone, email: res.users[i].email, address: res.users[i].address, city: res.users[i].city, state: res.users[i].state, zipcode: res.users[i].zipcode, po_box_unit_number: res.users[i].po_box_unit_number, suite: res.users[i].suite, checkSMS: res.users[i].checkSMS, checkEmail: res.users[i].checkEmail });
                    }
                    console.log(itemsFormatted);
                    exportCSVFile(headers, itemsFormatted, fileTitle);
                }
            });
        })
    })
}(Suit.$));