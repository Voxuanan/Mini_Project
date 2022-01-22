function Validator (options) {

    var selectorRules = {};

    function validate(inputElement, rule){
        var errorElement = inputElement.closest(options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        var rules = selectorRules[rule.selector];

        for (var i = 0; i < rules.length; i++){
            switch (inputElement.type){
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );  
                    break;
                default: 
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }
        

        if (errorMessage){
            errorElement.innerHTML = errorMessage;
            inputElement.closest(options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerHTML = '';
            inputElement.closest(options.formGroupSelector).classList.remove('invalid');
        }
        return !errorMessage;
    }


    var formElement = document.querySelector(options.form)


    if (formElement){
        formElement.onsubmit = function (e){
            e.preventDefault();
            
            var isFormValid = true;

            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid){
                    isFormValid = false;
                }
            });

            if (isFormValid){
                if ( typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]');
                    

                    var formValues = Array.from(enableInputs).reduce(function (values, input){
                        switch (input.type){
                            case 'radio':
                                if (formElement.querySelector('input[name="'+ input.name + '"]:checked')){
                                    values[input.name] = formElement.querySelector('input[name="'+ input.name + '"]:checked').value;
                                } else  values[input.name] = '';
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')){
                                    values[input.name] = '';
                                    return values; 
                                } 
                                if (!Array.isArray(values[input.name])){
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return  values;
                    },{})

                    options.onSubmit(formValues);
                } else formElement.submit();
            }

        }

        options.rules.forEach(function (rule) {
            if (Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }
            else selectorRules[rule.selector] = [rule.test];
            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
                if (inputElement){

                    inputElement.oninput = function (){
                        var errorElement = inputElement.closest(options.formGroupSelector).querySelector(options.errorSelector);  
                        errorElement.innerHTML = '';
                        inputElement.closest(options.formGroupSelector).classList.remove('invalid');
                    }
    
                    inputElement.onblur = function () {
                        validate(inputElement, rule);
                    }
                }
            })
          
        });
    }
}

// Rules

Validator.isRequired = function (selector, message){
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message ||  'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = function (selector, message){
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message ||  'Giá trị nhập phải là email';
        }
    }
}

Validator.isPassword = function (selector, message){
    return {
        selector: selector,
        test: function (value) {
            var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
            return regex.test(value) ? undefined : message ||  'Mật khẩu phải có 6 ký tự bao gồm ít nhất một ký tự hoa, một ký tự thường, một ký tự số và không bao gồm ký tự đặc biệt';
        }
    }
}

Validator.minLength = function (selector, min = 6, message){
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message ||  `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    }
}

Validator.maxLength = function (selector, max = 6, message){
    return {
        selector: selector,
        test: function (value) {
            return value.length <=  max ? undefined : message ||  `Vui lòng nhập tối đa ${max} ký tự`;
        }
    }
}

Validator.isConfirm = function (selector,getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || `Giá trị nhập vào không khớp`;
        }
    }
}