let vm = new Vue({
  el: '.playroom',
  data: {
    matrix: [],
    mxLength: 5,
    state: false,
    scale: false,
    dimensions: false,
    opacity: false
  },
  methods: {
    getColor() {
      return '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1,6);
    },
    changeState() {
      this.state = !this.state
    },
    changeScale() {
      this.scale = !this.scale
    },
    changeDimensions() {
      this.dimensions = !this.dimensions
    },
    changeOpacity() {
      this.opacity = !this.opacity
    },
    deleteMatrix() {
      this.matrix = [];
      this.state = false;
      this.scale = false,
        this.dimensions = false,
        this.opacity = false
    },
    initializeMatrix() {
      let mx = this.matrix;
      for (let a = 0; a < this.mxLength; a++) {
        mx[a] = [];
        for (let b = 0; b < this.mxLength; b++) {
          mx[a][b] = {
            color: this.getColor(),
            delay: b + 1
          };
        }
      }
      console.log(mx);
      this.matrix = mx.slice();
    },
    initializeReverseMatrix() {
      let mx = this.matrix;
      for (let a = 0; a < this.mxLength; a++) {
        mx[a] = [];
        for (let b = 0; b < this.mxLength; b++) {
          mx[a][b] = {
            color: this.getColor()
          };
        }
      }

      let aux = 0;
      for (let i = 0; i < mx.length; i++) {
        for (let j = mx[i].length; j > 0; j--) {
          mx[i][j - 1].delay = aux + 1;
          aux++;
        }
        aux = 0;
      }
      console.log(mx);
      this.matrix = mx.slice();
    },
    initializeEmptyMatrix() {
      let mx = this.matrix;
      for (let a = 0; a < this.mxLength; a++) {
        mx[a] = [];
        for (let b = 0; b < this.mxLength; b++) {
          mx[a][b] = {
            color: this.getColor(),
            delay: 0
          };
        }
      }
      this.matrix = mx.slice();
    },
    createMatrixLeftRight() {
      this.initializeMatrix();
    },
    createMatrixRightLeft() {
      this.initializeReverseMatrix();
    },
    createMatrixTopBot() {
      this.initializeEmptyMatrix();
      let mx = this.matrix;

      for (let i = 0; i < mx.length; i++) {
        for (let j = 0; j < mx[i].length; j++) {
          mx[i][j].delay = i + 1;
        }
      }
      this.matrix = mx.slice();
    },
    createMatrixBotTop() {
      this.initializeEmptyMatrix();
      let mx = this.matrix;

      let aux = 1;
      for (let i = mx.length; i > 0; i--) {
        for (let j = 0; j < mx[i - 1].length; j++) {
          mx[i - 1][j].delay = aux;
        }
        aux++;
      }
      this.matrix = mx.slice();
    },
    createMatrixCrossed() {
      this.initializeEmptyMatrix();
      let mx = this.matrix;

      for (let i = 0; i < mx.length; i++) {
        for (let j = 0; j < mx[i].length; j++) {
          if (j % 2 == 0) {
            mx[i][j].delay = i + 1;
          }
        }
      }
      let aux = 1;
      for (let i = mx.length; i > 0; i--) {
        for (let j = 0; j < mx[i - 1].length; j++) {
          if (j % 2 != 0) {
            mx[i - 1][j].delay = aux;
          }
        }
        aux++;
      }
      this.matrix = mx.slice();
    },
    createMatrixArrowTopLeft() { /*from top-left to bot-right */
      this.initializeMatrix();
      let mx = this.matrix;

      let aux = 0;
      for (let q = 0, w = 0; q < mx.length; q++, w++) {
        aux = w;
        for (let x = 0; x < w; x++) {
          mx[q][x].delay += aux;
          aux--;
        }
      }
      this.matrix = mx.slice();
    },
    createMatrixArrowBotLeft() { /*from bot-left to top-right */
      this.initializeMatrix();
      let mx = this.matrix;

      let aux = 0;
      for (let a = mx.length, b = 0; a > 0; a--, b++) {
        aux = b;
        for (let x = 0; x < b; x++) {
          mx[a - 1][x].delay += aux;
          aux--;
        }
      }
      this.matrix = mx.slice();
    },
    createMatrixArrowTopRight() { /*from top-right to bot-left */
      this.initializeReverseMatrix();
      let mx = this.matrix;

      let aux = 0;
      for (let a = 0, b = 0; a < mx.length; a++, b++) {
        aux = b;
        for (let x = mx[a].length, l = 0; l < b; x--, l++) {
          mx[a][x - 1].delay += aux;
          aux--;
        }
      }
      this.matrix = mx.slice();
    },
    createMatrixArrowBotRight() { /*from bot-right to top-left */
      this.initializeReverseMatrix();
      let mx = this.matrix;

      let aux = 0;
      for (let a = mx.length, b = 0; a > 0; a--, b++) {
        aux = b;
        for (let x = mx[a - 1].length, l = 0; l < b; x--, l++) {
          mx[a - 1][x - 1].delay += aux;
          aux--;
        }
      }
      this.matrix = mx.slice();
    }
  }
});