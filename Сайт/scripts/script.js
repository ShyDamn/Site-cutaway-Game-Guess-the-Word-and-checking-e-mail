//скрипт начнёт выполнятся когда документ загрузиться
$(document).ready(function(){
    // получаем случайную загадку
    let number_puzzle = getRandomInt(10);
    let mainWord;
    let placeholder;
    //получаем данные для загадки с сервера
    $.ajax({
        method: 'POST',
        url: './server.php',
        data:{
            number_puzzle: number_puzzle,
            action: 'first',
        },
        success: function(data){
            //преобразуем json в объект
            const obj = JSON.parse(data);
            $('#hint').text(obj.hint)
            //назначаем нужные переменные
            mainWord = obj.word;
            placeholder = '*'.repeat(mainWord.length);
            // генерируем звёздочки в зависимости от кол-ва символов
            $('#secret').val(placeholder);
        }
    })

    $('#tryit').on('click', function(){
        let char = $('#letter').val();
        //валидация
        if(char == '' || char == undefined || char.length != 1){
            $('.message').text('Пожалуйста, введите одну букву');
            $('.message').fadeIn();
            return;
        }
        $.ajax({
            method: 'POST',
            url: './server.php',
            data:{
                placeholder: placeholder,
                mainWord: mainWord,
                char: char,
                action: 'check',
            },
            success: function(data){
                $('#numretries').val(parseInt($('#numretries').val()) + 1);
                if(data == 'miss'){
                    $('.message').text('Мимо!');
                    $('.message').fadeIn();
                }else{
                    $('.message').text('Есть такая буква!');
                    $('.message').fadeIn();
                    $('#secret').val(data);
                    placeholder = data;
                    if(!placeholder.includes('*')){
                        $('.message').text('Вы отгадали слово!');
                        $('.ui').fadeOut(1);
                    }
                }
            }
        })
    });

});

//функция которая возвращает случаное значение от 0 до max не включая его
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }