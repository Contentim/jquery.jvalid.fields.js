(function($) {

    var jvalidFieldsMethod = function(obj, opts) {

        var $this = this, img, options={};

        defaults = {
            type: 'text', // default type
            error_msg: '', // default message to error
            success_msg: '', // default message to success
            borderColor: '#ee5a5a', // border color field to error - 'color' OR 'HEX'
        };

        $.extend(this, $.fn, {
            init : function () {

                // actual options
                options = $.extend(defaults, opts);

                // dynamic CSS
                $('body').append('<div id="scoped_css_valid_fields"><style>.error_valid{ border-color: '+options.borderColor+'!important;</style></div>');

                // obj - parent object
                // this - method jvalidFieldsMethod
                obj.prop('data-status', 'error');

                var str = obj.val();

                handlerType($this, obj, options);

                obj.removeClass('error_valid');
                obj.parent().find('.valid_text_error').remove();

                return obj.on('keydown keyup blur paste', function(e){

                    var val;

                    if (e.type == 'paste') {
                        val = e.originalEvent.clipboardData.getData("text/plain");
                    } else {
                        val = $(this).val();
                    }

                    handlerType($this, obj, options);

                });
            },

            triggerSuccess : function () {
                obj.trigger('success_jvalidfields');
            },

            triggerError: function(){
                obj.trigger('error_jvalidfields');
            },

        });

        this.init();

    };

    const handlerType = function(global, ob, options){
        /*
            ob - global object
        */

        var re,
            val = ob.val();

        switch (options.type) {
            case 'text-number':
                re = /[a-zA-Zа-яА-Я_0-9\s\-]*/g;
                testRegexp(val, re, options.type);

                break;
            case 'text':
                re = /^[a-zA-Zа-яёЁА-Я'][a-zA-Zа-яёЁА-Я-.\' ]+[a-zA-Zа-яёЁА-Я']?$/g;
                testRegexp(val, re, options.type);

                break;
            case 'name':
                re = /^[a-zA-Zа-яёЁА-Я'][a-zA-Zа-яёЁА-Я-.\' ]+[a-zA-Zа-яёЁА-Я']?$/g;
                testRegexp(val, re, options.type);

                break;
            case 'email':
                re = /(?:[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9а-яА-Я](?:[a-zA-Z0-9а-яА-Я-]*[a-zA-Z0-9а-яА-Я])?\.)+[a-zA-Z0-9а-яА-Я](?:[a-zA-Z0-9а-яА-Я-]*[a-zA-Z0-9а-яА-Я])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;
                testRegexp(val, re, options.type);

                break;
            case 'number':
                // min length - 1 to max length 13
                re = /^(\d){1,13}$/g;
                testRegexp(val, re, options.type);

                break;
            case 'money':
                // Format
                // 000
                // 000.00
                // 000,00
                re = /^[\d]+((\.|\,)([\d]{1,2})|)$/g;
                testRegexp(val, re, options.type);

                break;
        }

        function testRegexp(val, re, type){

            var has = re.test(val);

            if(has){
                ob.removeClass('error_valid');
                ob.addClass('success_valid');
                ob.parent().find('.valid_text_error').remove();

                ob.prop('data-status','success');
                ob.prop('data-formated',val);

                global.triggerSuccess();
            } else {
                var checkStr = ob.position();

                ob.prop('data-status','error');
                ob.removeProp('data-formated');

                ob.parent().find('.valid_text_error').remove();
                ob.addClass('error_valid');
                ob.removeClass('success_valid');
                ob.after('<p class="valid_text_error">'+options.error_msg+'</p>');
                ob.parent().find('.valid_text_error').css('left', checkStr.left);

                global.triggerError();
            }
        }
    }

    $.fn.jvalidFields = function(opts) {
        return new jvalidFieldsMethod(this, opts);
    };

})(jQuery);