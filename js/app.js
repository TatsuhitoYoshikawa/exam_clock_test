//////////// 時刻表示を秒刻みで更新する /////////////////
let timerId_d = setInterval(GetTimeDigital, 1000);
let timerId_a = setInterval(GetTimeAnalogue, 1000);

//// SETボタンを押すと、指定された時刻を表示して時計が止まる
// 時刻を指定
const SET_TIME = "10:00:00";

set_button.addEventListener("click", function() {
  // デジタル時計のdiv要素を取得
  var target = document.getElementById('show_digi_clock');
  // 取得した要素に10:00:00をSET
  target.innerHTML = SET_TIME;
  SetTimeAnalogue(10, 0, 0);
  // setIntervalを止める＝時計の進行を止める
  clearInterval(timerId_d);
  clearInterval(timerId_a);
  }
)

//// STARTボタンを押すと、SETした時刻から時計が進み始める
start_button.addEventListener("click", function() {
  // 準備として、今日の日付を取得して文字列にする
  var tmp_ymd = new Date();
  var yyyy = tmp_ymd.getFullYear();
  var mm = set2fig(tmp_ymd.getMonth() + 1); /* 月は1少ない数で出てくる */
  var dd = set2fig(tmp_ymd.getDate());
  const YMD = yyyy + "-" + mm + "-" + dd + " ";

  // 指定した時刻と今日の日付を連結して、時刻型に変換
  dt1 = new Date(YMD + SET_TIME);

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
})



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

// アナログ時計の目盛り作成
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


