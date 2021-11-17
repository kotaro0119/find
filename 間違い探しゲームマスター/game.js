let timer = null;
let max = 5;
let count = 0;
const APPLICATION_KEY = "eb26751fc8579b9e290ba07ab4e1e2ff3ff4bd257642cc5a6b173acb0d5425cb";
const CLIENT_KEY = "f7ccc1dd4a6b51a97fae4457b5a8c202348a89ebb8dbd5c5c7b4619b6a8d118e";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "GameClass";
let GameClass = ncmb.DataStore(DBName);
function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
let size = 5;
let qNum = Math.floor(Math.random()*q.length)
for (let i=0;i<size*size;i++){
  let s = document.createElement("span");
  s.textContent = q[qNum][0];
  s.setAttribute("id", "num"+ i);

  s.addEventListener('click', function(){
    if(this.textContent == q[qNum][1]){
      correct.play();
      while(cells.firstChild){
        cells.removeChild(cells.firstChild);
      }
        count++;
      if(count<max){
        gameStart();
      }else{

        save();
        load();
        clearTimeout(timer);
      }
    }else{
      wrong.play();
    }
  });

  cells.appendChild(s);
  if(i % size == size - 1){
    const br = document.createElement("br");
    cells.appendChild(br);
  }
}
let p = Math.floor(Math.random()*size*size);
let ans = document.getElementById("num" + p);
ans.textContent = q[qNum][1];
}


function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime() - start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()",1000);
}
function save(){
  let test = new GameClass();
  let key = "score";
  let value = timer;
  test.set(key, parseInt(value));
  test.save()
  .then(function(){
    console.log("成功");
  })
  .catch(function(err){
    console.log("エラー発生："+ err);
  });
}
  function load(){
  GameClass
  .order("score")
  .fetchAll()
  .then(function(results){
    if(timer<results[0].score){
      alert("ハイスコア");
    }else{
      alert("クリア");
    }
  })
  .catch(function(err){
    console.log("エラー発生"+err)
  });
}
