//////////// 時刻表示を秒刻みで更新する /////////////////
setInterval(GetTime, 1000);



/////////////////// 関数部 /////////////////////

// デジタル時計の表示らしく、常に2桁表示させる
function set2fig(num) {
    // 桁数が1桁だったら先頭に0を加えて2桁に調整する
    var ret;
    if( num < 10 ) { ret = "0" + num; }
    else { ret = num; }
    return ret;
 }

 // 現在時刻を取得・表示する
function GetTime() {
    //// 時刻取得
    // new演算子は後に来るコンストラクタのインスタンスを生成する
    // Dateコンストラクタからインスタンスを生成
    // 時間・分・秒をメソッドで取り出す
    var nowtime = new Date();
    var Hour = set2fig(nowtime.getHours());
    var Min = set2fig(nowtime.getMinutes());
    var Sec = set2fig(nowtime.getSeconds());

    // 文字列として結合したいので、最初に空白文字列を置いて、足していく
    var clock = "" + Hour + ":" + Min + ":" + Sec;

    //// 時刻表示を追記
    // htmlファイルにある要素を取得
    var target = document.getElementById('showclock');
    // 取得した要素に時刻表示を追記
    target.innerHTML = clock;
};

