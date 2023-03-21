<?php 
$words = [
    ['кошка', 'Мяукающее животное'],
    ['собака', 'И лает, и кусает'],
    ['змея', 'Ползучий гад'],
    ['алабама', 'Штат в США'],
    ['кукушка', 'Отсчитывает наши дни'],
    ['бегемот', 'У него огромный рот, он зовётся...'],
    ['белка', 'По деревьям скачет, орешки колотит'],
    ['муравей', 'Мужички без топоров рубят избу без углов'],
    ['божья коровка', 'Корова, а молока не даёт'],
    ['комар', 'Самого не видно, а песню слышно']
];

if( isset($_POST['action']) ){
    if($_POST['action'] == 'first'){
        echo sendFirstData(intval($_POST['number_puzzle']), $words);
    }else if($_POST['action'] == 'check'){
        echo checkChar($_POST['mainWord'],$_POST['placeholder'],$_POST['char']);
    }
}

//функция для отправки ответа на первый запрос
function sendFirstData($number, $words){
    $req = [
        'word' => $words[$number][0],
        'hint' => $words[$number][1],
    ];
    //возвращаем в виде json
    return json_encode($req);
}

//функция заменяет "*" на буквы в слове
function checkChar($word, $placeholder, $char){
    $char = strtolower($char);
    //если есть такой символ
    if(strpos($word, $char) !== false){
        $ans = '';
        for ($i=0; $i < mb_strlen($word); $i++) { 
            $char_now = mb_substr($word, $i, 1);
            if( $char_now == $char){
                $ans .= $char;
            }else{
                $ans .= mb_substr($placeholder, $i, 1);
            }
        }
        return $ans;
    }else{ //иначе возвращаем "miss"
       return "miss"; 
    }
}
?>