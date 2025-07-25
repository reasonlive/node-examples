const validate = {
    "amount": {
        "required": true,
        "regExp": "^(5[0-9]{2,}|[6-9]\\d{2,}|\\d{4,})(\\.\\d+)?$"
    },
    "name": {
        "required": true,
        "regExp": "^[А-ЯЁ][а-яё]+\\s[А-ЯЁ][а-яё]+\\s[А-ЯЁ][а-яё]+$"
    }
}

export const validateAmount = (value) => validateRegex(value, validate.amount);

export const validateName = (value) => validateRegexName(value, validate.name);

const validateRegex = (value, validation) => {
    let error = {
        isValid: true,
        errorMessage: '',
    };

    if(validation.required) {
        if(!value) {
            error = {
                isValid: false,
                errorMessage: 'Это обязательное поле для заполнения'
            };
        } else {
            const regex = new RegExp(validation.regExp);
            const isValid = regex.test(value);
            error = {
                isValid: isValid,
                errorMessage: isValid ? '' : 'Сумма должна быть корректна или не меньше 500 руб'
            }
        }
    }

    return error;
}

const validateRegexName = (value, validation) => {
    let error = {
        isValid: true,
        errorMessage: '',
    };

    if(validation.required) {
        if(!value) {
            error = {
                isValid: false,
                errorMessage: 'Это обязательное поле для заполнения'
            };
        } else {
            const regex = new RegExp(validation.regExp);
            const isValid = regex.test(value);
                error = {
                    isValid: isValid,
                    errorMessage: isValid ? '' : `ФИО должны быть написаны в формате: Имя Отчество Фамилия`
                }
        }
    }

    return error;
}
