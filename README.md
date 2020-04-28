# Manual jquery.jvalid.fields.js

## Relation
[jQuery](https://code.jquery.com/) - по-умолчанию.

## Install
```
// jquery.jvalid.fields.js
<script src="/jquery.jvalid.fields.js"></script>
```

## Default options
```
defaults = {
    type: 'text', // default type
    error_msg: 'Error', // this message to error
    success_msg: 'Success', // this message to success
    textColor: '#ee5a5a', // text-color error message to error - 'color' OR 'HEX'
    borderColor: '#ee5a5a', // border color input to error - 'color' OR 'HEX'
};
```

## Listing
```js
$('#input-text').jvalidFields({
    type: 'email',
    error_msg: 'Неверный формат email',
    success_msg: 'Success',
    textColorError: '#ee5a5a',
    borderColorError:'#ee5a5a',
});
```

## Listen to events
```js
// success
function log() {
    console.log('value = ' + $(this).val());
    console.log('status = ' + $(this).prop('data-status'));
};
$('#input-text').on('success_jvalidfields', log);

// error
function log() {
    console.log('status = ' + $(this).prop('data-status'));
};
$('#input-text').on('error_jvalidfields', log);
```

## Статусы (data-status) и отформатированные данные (data-formated)
После обработки данных плагин возвращает динамическое свойство data-status для *input* для последующего использования в связке с другими плагинами обработки полей ввода, например [маска номера телефона](https://github.com/Contentim/jquery.jmask.phone.js).

### data-status
Статус принимает одно из **2 состояний**:
- success
- error

### data-status
Динамическое свойство data-formated предназначено для работы AJAX - возможность забирать "чистые" данные из этого поля, а не из свойства *value*.

## LICENSE
The MIT License (MIT)

Copyright (c) 2020 Ivan Goncharenko ([contentim.ru](https://vk.com/contentim_ru)) or email - *contentim@yandex.ru*

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
