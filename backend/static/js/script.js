(function ($) {
    $(document).ready(function(){
        // Here you can use regular $ sign
        $("#winnerpopup").hide();
        $('.sweepItem').click(function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            }else{
                $(this).addClass('active');
            }
        });
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
                        url: '/tablets/'+$(this).parent().find('.tablet_id').val()+"/?sweep_ids="+sweep_ids+"&active_sweep=''",
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
                    url: '/tablets/'+$("#tabletID").val()+"/?sweep_ids="+sweep_ids+"&active_sweep=''",
                    type: 'PUT',
                    success: function() {
                        window.location.href='/admin/home/tablet/';
                    }
                });
            }
        });
        $('.selectedsweep').click(function(){
            var sweep_id = $(this).parent().find(".selectedsweepid").val();
            $.ajax({
                url: '/tablets/'+$(this).parent().parent().find('.tabletIDVal').val()+"/?active_sweep="+sweep_id,
                type: 'PUT',
                success: function() {
                    window.location.reload();
                }
            });
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
    })
}(Suit.$));