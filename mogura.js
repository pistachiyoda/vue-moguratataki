"use strict";

let score = 0;
var bus = new Vue();

class GameController {
  constructor() {
    this.moguras = [];
  }
  start() {
    setTimeout(() => {
      this.end();
    }, 3000);
  }
  end() {
    // イベントバスを使って終了イベントをmoguraコンポーネントに伝える
    bus.$emit("bus-event");
    //this.moguras.forEach(mogura => mogura.stop());
    alert(`ゲーム終了 スコア${score}`);
  }
}

var gameController = new GameController();
const startButton = document.getElementById("start");
startButton.addEventListener("click", () => {
  const gameController = new GameController();
  gameController.start();
});

const STATUS = {
  HIDE: 0,
  SHOW: 1,
  HIT: 2
};
const TYPES = ["normal", "abnormal"];
const HIT_MOGURAS = {
  normal: "images/モグ1.png",
  abnormal: "images/モグ4.png"
};
const NORMAL_MOGRAS = {
  normal: "images/モグ2.png",
  abnormal: "images/モグ3.png"
};
const ANA = "images/穴.png";

Vue.component("mogura", {
  data: function() {
    return { currrent_mogura: NORMAL_MOGRAS.normal };
  },
  methods: {
    show() {
      //Math.floor(Math.random() * 2);
      this.status = STATUS.SHOW;
      let mogura_type = TYPES[Math.floor(Math.random() * 2)];
      this.mogura_type = mogura_type;
      this.currrent_mogura = NORMAL_MOGRAS[mogura_type];
      this.currrent_timeout_id = setTimeout(() => {
        this.hide();
      }, 1000);
    },
    hide() {
      this.status = STATUS.HIDE;
      this.currrent_mogura = ANA;
      this.currrent_timeout_id = setTimeout(() => {
        this.show();
      }, Math.floor(Math.random() * 10000));
    },
    hit() {
      if (this.status === STATUS.SHOW) {
        score++;
        this.status === STATUS.HIT;
        this.currrent_mogura =
          this.mogura_type === "normal"
            ? HIT_MOGURAS.normal
            : HIT_MOGURAS.abnormal;
      }
    },
    stop() {
      clearTimeout(this.current_tiemout_id);
    }
  },
  mounted: function() {
    this.hide();
    bus.$on("bus-event", this.stop);
  },
  template: "<img :src='currrent_mogura' @click='hit'></img>"
});

var vm = new Vue({
  el: "#app",
  data: {
    moguraNumber: new Array(9)
  }
});
