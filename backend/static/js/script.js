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
        var images = [];
        $("#survey_form input[type='file']").change(function(){
            var index = images.findIndex(value => value.key==$(this).attr('name'));
            if(index > -1){
                images.splice(index, 1);
            }
            images.push({key: $(this).attr('name'), file: this.files[0]});
        });
        $("#survey_form").submit(function(e){
            e.preventDefault();
            var formData = new FormData();
            for(var i = 0; i < images.length; i++){
                formData.append(images[i].key, images[i].file);
            }
            if($('#survey_form .survey_id').val() == "add"){
                $.ajax({
                    url: '/savesurvey/',
                    type: 'POST',
                    data: $(this).serialize(),
                    success: function(data) {
                        $.ajax({
                            url: '/fileupload/?survey_id='+$('#survey_form .survey_id').val(),
                            type: 'PUT',
                            data: formData,
                            processData: false,  // Important!
                            contentType: false,
                            cache: false,
                            success: function(data1) {
                                // console.log("RES", data1);
                                location.href="/admin/home/survey/";
                            }
                        });
                    }
                });    
            }else{
                $.ajax({
                    url: '/savesurvey/'+$('#survey_form .survey_id').val()+"/",
                    type: 'PUT',
                    data: $(this).serialize(),
                    success: function(data) {
                        $.ajax({
                            url: '/fileupload/?survey_id='+$('#survey_form .survey_id').val(),
                            type: 'PUT',
                            data: formData,
                            processData: false,  // Important!
                            contentType: false,
                            cache: false,
                            success: function(data1) {
                                // console.log("RES", data1);
                                location.href="/admin/home/survey/";
                            }
                        });
                    }
                });
            }
        });
        if($('#survey_form .survey_id').val() !== undefined){
            $.ajax({
                url: '/savesurvey/'+$('#survey_form .survey_id').val(),
                type: 'GET',
                success: function(data) {
                    console.log('Data', data);
                    for(var i = 0; i < data.questions.length; i++){
                        $('.field-question_'+(i+1)).find('.choice_part input[type="radio"]').each(function(){
                            if($(this).val() == data.questions[i].question_type){
                                $(this).attr('checked', 'checked');
                            }
                            if(data.questions[i].question_type == "1"){
                                $('.field-question_'+(i+1)).find('.answer_text_part').show();
                                $('.field-question_'+(i+1)).find('select.numberofquestions').val(data.questions[i].options_count);
                                var answer_text_options = data.answer_text.filter(function(value){return value.option_question==data.questions[i].id});
                                var count = 0;
                                $('.field-question_'+(i+1)).find('.answer_text_part .answer_part').each(function(){
                                    if(count < data.questions[i].options_count){
                                        $(this).parent().parent().show();
                                        $(this).find('textarea').html(answer_text_options[count].option_text);
                                        $(this).find('select').val(answer_text_options[count].option_goquestion)
                                        $(this).find('input[type="radio"]').each(function(){
                                            if($(this).val() == answer_text_options[count].option_complete){
                                                $(this).attr('checked', 'checked');
                                            }
                                        });
                                    }else{
                                        $(this).parent().parent().hide();
                                    }
                                    count++;
                                })
                            }else{
                                $('.field-question_'+(i+1)).find('.answer_image_part').show();
                                $('.field-question_'+(i+1)).find('.answer_image_part .numberoption_container input[type="radio"]').each(function(){
                                    if(parseInt($(this).val()) == data.questions[i].options_count){
                                        $(this).attr('checked', 'checked');
                                    }
                                });
                                var count = 0;
                                var answer_image_options = data.answer_image.filter(function(value){return value.option_question==data.questions[i].id});
                                $('.field-question_'+(i+1)).find('.answer_image_part .image_row').each(function(){
                                    if(count < data.questions[i].options_count){
                                        $(this).show();
                                        if(answer_image_options[count].option_image != null){
                                            $(this).find('.image_change').show();
                                            $(this).find('.image_change span').html(answer_image_options[count].option_image);
                                            $(this).find('.image_change .option_image_name').val(answer_image_options[count].option_image);
                                            $(this).find('.image_field_container span').show();    
                                        }
                                        $(this).find('input[type="text"]').val(answer_image_options[count].option_tag);
                                        $(this).find('select').val(answer_image_options[count].option_goquestion)
                                        $(this).find('input[type="radio"]').each(function(){
                                            if($(this).val() == answer_image_options[count].option_complete){
                                                $(this).attr('checked', 'checked');
                                            }
                                        });
                                    }else{
                                        $(this).hide();
                                    }
                                    count++;
                                })
                            }
                        })
                        $('.field-question_'+(i+1)).find('textarea.question_text').html(data.questions[i].question_text);
                    }
                }
            });      
        }
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
        $("#removeFeatureModal .delete_sweepstake_tablet").click(function(e){
            e.preventDefault();
            $.ajax({
                url: '/removesweep_tablet?sweep_id='+$(this).parent().find(".sweepstake_id").val()+'&tablet_id='+$(this).parent().find(".tablet_id").val(),
                type: 'GET',
                success: function(data) {
                    location.href="/admin/home/tablet/";
                }
            });
        });
        $("#removeadminModal .button-container .btn-delete").click(function(e){
            e.preventDefault();
            $.ajax({
                url: '/removeadminuser?user_id='+$(this).parent().parent().find(".user_id").val(),
                type: 'GET',
                success: function(data) {
                    location.href="/admin/admins/";
                }
            });
        });
        $("#removeSurveyModal .delete_survey").click(function(e){
            e.preventDefault();
            $.ajax({
                url: '/savesurvey/'+$(this).parent().find(".survey_id").val()+"/",
                type: 'DELETE',
                success: function(data) {
                    location.href="/admin/home/survey/";
                }
            });
        });
        $("#removeUsersModal .cancel-modal").click(function(e){
            $("#removeUsersModal").modal('hide')
        });
        $("#removeUsersModal .delete_sweepusers").click(function(e){
            $(".user_list_form tbody input[type='checkbox']:checked").each(function(){
                $.ajax({
                    url: '/sweepuser/'+$(this).val()+"/",
                    type: 'DELETE',
                    success: function(data) {
                        location.href="/admin/home/sweepuser/";
                    }
                });
            })
        });
        $("#admin-form-content-main form").submit(function(e){
            e.preventDefault();
            console.log($(this).find(".admin_user_id").val());
            if($(this).find(".admin_user_id").val() == ""){
                $.ajax({
                    url: '/saveadmin_user/',
                    type: 'POST',
                    data: $(this).serialize(),
                    success: function(data) {
                        location.href="/admin/admins/";
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
            }else{
                $.ajax({
                    url: '/saveadmin_user/?user_id='+$(this).find(".admin_user_id").val(),
                    type: 'PUT',
                    data: $(this).serialize(),
                    success: function(data) {
                        location.href="/admin/admins/";
                    }
                });
            }
        })
        $(".btn-delete-admin-user").click(function(){
            $("#removeadminModal .user_id").val($(this).attr("user-id"));
        });
        $(".btn-cancel-admin-delete").click(function(){
            $("#removeadminModal").modal('toggle');
        })
        $(".sweepstakecontain .btn.selectedsweep").click(function(){
            $("#removeFeatureModal .tablet_id").val($(this).attr("data-tabletid"));
            $("#removeFeatureModal .sweepstake_id").val($(this).attr("data-sweepid"));
        })
        $(".delete-survey-buttt").click(function(){
            $("#removeSurveyModal .survey_id").val($(this).attr("survey_id"));
        })
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
            var text_row_count = 0; var image_row_count = 0;
            $(this).parent().parent().parent().parent().find(".answer_text_part .row").each(function(){
                if(text_row_count > $(this).parent().find("select").val()){
                    $(this).hide();
                }else{
                    $(this).show();
                }
                text_row_count++;
            })

            $(this).parent().parent().parent().parent().find(".answer_image_part .image_row").each(function(){
                if($(this).parent().find(".numberoption_container input[type='radio']:checked").val() == undefined || image_row_count > $(this).parent().find(".numberoption_container input[type='radio']:checked").val()){
                    $(this).hide();
                }else{
                    $(this).show();
                }
                image_row_count++;
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
        $(".btn-reportsurvey").click(function(e){
            e.preventDefault();
            var survey_id = $(this).attr('survey-id');

            $.ajax({
                url: '/getsurveydetailslist/?survey_id='+survey_id,
                type: 'GET',
                success: function(res) {
                    var headers = {
                        tabletID: "Tablet ID",
                        sweepstakes: "Sweepstakes",
                        question_1: 'Q1',
                        question_2: 'Q2',
                        question_3: 'Q3',
                        question_4: 'Q4',
                        question_5: 'Q5',
                        question_6: 'Q6',
                        question_7: 'Q7',
                        question_8: 'Q8',
                        question_9: 'Q9',
                        question_10: 'Q10',
                    };
                    
                    var fileTitle = 'survey_report'+survey_id;

                    var itemsFormatted = [];
                    var question_answer = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
                    $.each(res, function(i){
                        itemsFormatted.push({tabletID: '', sweepstakes: '', question_1: res[i].fields.survey_question_1 == '' ? 'N/A' : question_answer[parseInt(res[i].fields.survey_question_1)], question_2: res[i].fields.survey_question_2 == '' ? 'N/A' : question_answer[parseInt(res[i].fields.survey_question_2)], question_3: res[i].fields.survey_question_3 == '' ? 'N/A' : question_answer[parseInt(res[i].fields.survey_question_3)], question_4: res[i].fields.survey_question_4 == '' ? 'N/A' : question_answer[parseInt(res[i].fields.survey_question_4)], question_5: res[i].fields.survey_question_5 == '' ? 'N/A' : question_answer[parseInt(res[i].fields.survey_question_5)], question_6: res[i].fields.survey_question_6 == '' ? 'N/A' : question_answer[parseInt(res[i].fields.survey_question_6)], question_7: res[i].fields.survey_question_7 == '' ? 'N/A' : question_answer[parseInt(res[i].fields.survey_question_7)], question_8: res[i].fields.survey_question_8 == '' ? 'N/A' : question_answer[parseInt(res[i].fields.survey_question_8)], question_9: res[i].fields.survey_question_9 == '' ? 'N/A' : question_answer[parseInt(res[i].fields.survey_question_9)], question_10: res[i].fields.survey_question_10 == '' ? 'N/A' : question_answer[parseInt(res[i].fields.survey_question_10)]});
                        $.ajax({
                            url: '/sweepstakes/'+ res[i].fields.sweep_id,
                            type: 'GET',
                            success: function(res1) {
                                itemsFormatted[i].sweepstakes = res1.sweepstake.name;

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
                        suite_po_box: "Suite/PO Box",
                        city: "City",
                        state: "State",
                        zipcode: "Zip Code",
                        checkSMS: "SMS",
                        checkEmail: "Email"
                    };
                    console.log(res);
                    
                    var fileTitle = 'Users';

                    var itemsFormatted = [];
                    for(var i = 0; i < res.users.length; i++){
                        itemsFormatted.push({first_name: res.users[i].first_name, last_name: res.users[i].last_name, phone: res.users[i].phone, email: res.users[i].email, address: res.users[i].address, suite_po_box: res.users[i].suite_po_box, city: res.users[i].city, state: res.users[i].state, zipcode: res.users[i].zipcode, checkSMS: res.users[i].checkSMS, checkEmail: res.users[i].checkEmail });
                    }
                    console.log(itemsFormatted);
                    exportCSVFile(headers, itemsFormatted, fileTitle);
                }
            });
        })
    })
}(Suit.$));