"use strict";

let score = 0;
var bus = new Vue();

class GameController {
  constructor() {
    this.moguras = [];
  }
  start() {
    bus.$emit("bus-event-start");
    setTimeout(() => {
      this.end();
    }, 3000);
  }
  end() {
    bus.$emit("bus-event-end");
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
    return {
      status: null,
      mogura_type: null,
      current_mogura: NORMAL_MOGRAS.normal,
      current_timeout_id: null
    };
  },
  methods: {
    show() {
      this.status = STATUS.SHOW;
      let mogura_type = TYPES[Math.floor(Math.random() * 2)];
      this.mogura_type = mogura_type;
      this.current_mogura = NORMAL_MOGRAS[mogura_type];
      this.current_timeout_id = setTimeout(() => {
        this.hide();
      }, 1000);
    },
    hide() {
      this.status = STATUS.HIDE;
      this.current_mogura = ANA;
      this.current_timeout_id = setTimeout(() => {
        this.show();
      }, Math.floor(Math.random() * 10000));
    },
    hit() {
      if (this.status === STATUS.SHOW) {
        score++;
        this.status === STATUS.HIT;
        this.current_mogura =
          this.mogura_type === "normal"
            ? HIT_MOGURAS.normal
            : HIT_MOGURAS.abnormal;
      }
    },
    stop() {
      clearTimeout(this.current_timeout_id);
    }
  },
  mounted: function() {
    bus.$on("bus-event-start", this.hide);
    bus.$on("bus-event-end", this.stop);
  },
  template: "<img :src='current_mogura' @click='hit'></img>"
});

var vm = new Vue({
  el: "#app",
  data: {
    moguraNumber: new Array(9)
  }
});
