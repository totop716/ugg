(function ($) {
    $(document).ready(function(){
        // Here you can use regular $ sign
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
                        url: '/myusers/'+$(this).parent().find('.tablet_phone').val()+"/?sweep_ids="+sweep_ids,
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
                    url: '/myusers/'+$("#tabletID").val()+"/?sweep_ids="+sweep_ids,
                    type: 'PUT',
                    success: function() {
                        window.location.href='/admin/tablets/';
                    }
                });
            }
        });
        $('.selectedsweep').click(function(){
            var sweep_id = $(this).parent().find(".selectedsweepid").val();
            $.ajax({
                url: '/myusers/'+$(this).parent().parent().find('.tabletIDVal').val()+"/?active_sweep="+sweep_id,
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
                var url = window.location.href + "&key="+$(this).val();
                window.location.href = url;
            }
        });

        $('#searchTablet').click(function(){
            window.location.href = "?key="+$("#searchTabletText").val();
        });

        $("#generatewinner").click(function(){
            
        });
    })
}(Suit.$));