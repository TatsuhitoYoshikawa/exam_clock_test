/////////////////// 関数部 /////////////////////

// デジタル時計の表示らしく、常に2桁表示させる
function set2fig(num) {
  // 桁数が1桁だったら先頭に0を加えて2桁に調整する
  var ret;
  if( num < 10 ) { ret = "0" + num; }
  else { ret = num; }
  return ret;
}

// 現在時刻を取得・表示する（デジタル）
function GetTimeDigital() {
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
  var target = document.getElementById('show_digi_clock');
  // 取得した要素に時刻表示を追記
  target.innerHTML = clock;
};


// 現在時刻を取得・表示する（アナログ）
function GetTimeAnalogue() {
// 時間を取得
var nowtime = new Date();
var Hour = nowtime.getHours();
var Min = nowtime.getMinutes();
var Sec = nowtime.getSeconds();

// 針の角度
var deg_h = Hour * (360 / 12) + Min * (360 / 12 / 60);
var deg_m = Min * (360 / 60);
var deg_s = Sec * (360 / 60);

// それぞれの針に角度を設定
document.querySelector(".hour").style.transform = `rotate(${deg_h}deg)`;
document.querySelector(".min").style.transform = `rotate(${deg_m}deg)`;
document.querySelector(".sec").style.transform = `rotate(${deg_s}deg)`;
}

// アナログ時計に特定の時刻を設定
function SetTimeAnalogue(s_hour, s_min, s_sec) {
// 針の角度
var deg_h = s_hour * (360 / 12) + s_min * (360 / 12 / 60);
var deg_m = s_min * (360 / 60);
var deg_s = s_sec * (360 / 60);  

// それぞれの針に角度を設定
document.querySelector(".hour").style.transform = `rotate(${deg_h}deg)`;
document.querySelector(".min").style.transform = `rotate(${deg_m}deg)`;
document.querySelector(".sec").style.transform = `rotate(${deg_s}deg)`;
}

// SETボタンを押すと指定の時刻で止める
function SetButtonAction(sh, sm, ss) {
// デジタル時計用の文字列に
const SET_TIME = set2fig(sh) + ":" + set2fig(sm) + ":" + set2fig(ss);
// デジタル時計のdiv要素を取得
var target = document.getElementById('show_digi_clock');
// 取得した要素に時刻をSET
target.innerHTML = SET_TIME;
SetTimeAnalogue(sh, sm, ss);
// setIntervalを止める＝時計の進行を止める
clearInterval(timerId_d);
clearInterval(timerId_a);

return SET_TIME;
}


// STARTボタンを押すと、止まっていた時刻から進み始める
function StartButtonAction(sh, sm, ss) {
  // 準備として、今日の日付を取得して文字列にする
  var tmp_ymd = new Date();
  var yyyy = tmp_ymd.getFullYear();
  var mm = set2fig(tmp_ymd.getMonth() + 1); /* 月は1少ない数で出てくる */
  var dd = set2fig(tmp_ymd.getDate());
  const YMD = yyyy + "-" + mm + "-" + dd + " ";

  // 押されたボタンで設定された時刻と今日の日付を連結して、時刻型に変換
  dt1 = new Date(YMD + SetButtonAction(sh, sm, ss));

  // 指定した時刻から1秒ずつ増やしていく
  let timerId_s = setInterval(function() {
    dt1.setSeconds(dt1.getSeconds() + 1);
    
    // アナログ時計用に数字で取得
    var renew_h = dt1.getHours();
    var renew_m = dt1.getMinutes();
    var renew_s = dt1.getSeconds();

    // デジタル時計用に2桁文字列変換
    var renew_clock = set2fig(renew_h) + ":" + set2fig(renew_m) + ":" + set2fig(renew_s);
    
    // デジタル時計のdiv要素を取得して表示
    var target = document.getElementById('show_digi_clock');
    target.innerHTML = renew_clock;

    // アナログ時計の時刻設定関数を流用
    SetTimeAnalogue(renew_h, renew_m, renew_s);
  }, 1000)
}



//////////////////////// 関数部終了 ///////////////////////////



// アナログ時計の目盛り作成
// 5分ごとの太い目盛り
window.onload = function () {
  for (let i = 1; i <= 12; i++) {
      // scaleクラスの要素の最後にdiv要素を追加
      let scaleElem = document.querySelector(".scale");
      let addElem = document.createElement("div");
      scaleElem.appendChild(addElem);
  
      // 角度をつける
      // scaleクラスの下にあるdiv要素をforで12回追加（時間の目盛り）するので、nth-child()でそれぞれを回転させる
      document.querySelector(".scale div:nth-child(" + i + ")").style.transform = `rotate(${i * 30}deg)`;
    }
  }



  //////////// 時刻表示を秒刻みで更新する /////////////////
let timerId_d = setInterval(GetTimeDigital, 1000);
let timerId_a = setInterval(GetTimeAnalogue, 1000);


// SETボタンを押した時のアクション
// addEventListenerの第二引数は正確には関数ではなくListenerであり、
// 引数付きの関数を入れると、それは”値（返り値）”となるので、うまく動かない
// それを避けるために無名関数で一度囲っている
const time1_1 = [9, 30, 0];
const time1_2 = [14, 0, 0];
const time2_1 = [9, 30, 0];
const time2_2 = [14, 0, 0];
set_button1_1.addEventListener("click", function() {SetButtonAction(time1_1[0], time1_1[1], time1_1[2]);});
set_button1_2.addEventListener("click", function() {SetButtonAction(time1_2[0], time1_2[1], time1_2[2]);});
set_button2_1.addEventListener("click", function() {SetButtonAction(time2_1[0], time2_1[1], time2_1[2]);});
set_button2_2.addEventListener("click", function() {SetButtonAction(time2_2[0], time2_2[1], time2_2[2]);});

//// STARTボタンを押すと、SETした時刻から時計が進み始める
start_button1_1.addEventListener("click", function() {StartButtonAction(time1_1[0], time1_1[1], time1_1[2]);});
start_button1_2.addEventListener("click", function() {StartButtonAction(time1_2[0], time1_2[1], time1_2[2]);});
start_button2_1.addEventListener("click", function() {StartButtonAction(time2_1[0], time2_1[1], time2_1[2]);});
start_button2_2.addEventListener("click", function() {StartButtonAction(time2_2[0], time2_2[1], time2_2[2]);});



//// 切り替え表示の作成
// 要素取得
let digital_button = document.getElementById('digital_button');
let analogue_button = document.getElementById('analogue_button');
let show_digi_clock = document.getElementById('show_digi_clock');
let show_ana_clock = document.getElementById('show_ana_clock');

// 状態の初期化関数
reset_styles = function() {
    digital_button.classList.remove("active");
    analogue_button.classList.remove("active");
    show_digi_clock.classList.remove("active");
    show_ana_clock.classList.remove("active");
  };

// ボタンクリックに対する挙動
// クリックされたボタンのスタイルが活性になる
digital_button.addEventListener("click", function() {
    reset_styles();
    if (this.classList.toggle("active")) {
      show_digi_clock.classList.toggle("active");
    }
  })
analogue_button.addEventListener("click", function() {
    reset_styles();
    if (this.classList.toggle("active")) {
      show_ana_clock.classList.toggle("active");
    }
  });

// デフォルトではデジタル時計のみ表示
show_digi_clock.classList.toggle("active");
digital_button.classList.toggle("active")




