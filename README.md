# hello_vue

42 Tokyo プロジェクト

## Vue.js

データと UI 間の、双方向データバインディングが可能。
データを更新すれば UI が更新され、逆も然り。

- UI に結びつくモデルは、よく Vue Model と呼ばれるため、vm のような変数名の時が多い。

### Exercise 00: Hello 42!

```jsx
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello 42!'
  }
})
```

- Vue オブジェクトを生成している。
- どの領域と結びつけるかを、elements の略である `el` というキーの後に、CSS のセレクターと同じ形式で `#` に続けて指定する
- 保持させるデータは、 `data` というキーの中に、キーと値の配列という形式で記述する。

```html
<div id="app">
    {{ message }}
</div>
```

- 紐付けたい `data` 中のキーを、 `{{ }}` で囲う。`{{}}` の中には、JavaScript の式をそのまま書ける。

### Exercise 01: Hello binding

```html
<!-- <div id="app" v-if="seen"> -->
<div id="app" v-show="seen">
    {{ message }}
</div>
```

- `v-if` や `v-show` といった、 `v-` から始まる属性を**ディレクティブ**と呼ぶ。
- それぞれのクオーテーション中が、条件式となっている。

### `v-if` と `v-show` の違い:

- `v-if` の場合、false 判定だと、DOM ごとなくなる。
- `v-show` の方は DOM を保持し続け、css の `display:none` を適用させている。
こちらだと、初期表示のコストが高くなる代わりに、切り替えに要するコストが低い。
そのため、切り替えの頻度が高い場合は、こちらを使うと良い。
※Safari と IE では、display プロパティを適用できないため、v-show は使えない。

```jsx
data: {
	message: 'Hello Vue!',
	seen: true
}
```

### Exercise 02: Button

```html
<!-- <form v-on:click="hideMessage"> -->
<form @click="hideMessage">
  <input type="button" value="HIDE" />
</form>
```

- イベントを紐付けるには、 `v-on` というディレクティブを使う。 `v-on:(イベント)="(メソッド名)"` のように書く。
- `v-on:` は `@` で代用可能。

```jsx
data: {
  message: "Hello Vue!",
  seen: true
},
methods: {
  hideMessage: function () {
    this.seen = false;
  }
}
```

- メソッドの指定には、 `methods` というキーを使う。
- `el` , `data` , `methods` などが並列関係になるように記述。
- `methods` 内で、 `(メソッド名): (関数)` というように書いてやる。
- `this` によって、 `data` にアクセスできる。
- `methods` 内ではアロー関数を使うことは、 `this` の挙動を変えてしまうため、公式からは奨励されていない。

### Exercise 03: User input

```html
<div id="app">
	  <p><input type="text" v-model="message"></p>
	  <p>{{ message }}</p>
</div>
```

```jsx
data: {
  message: 'Hello Vue!'
}
```

- `v-model` を使用することで、このフォームに入力された値が、data 側と結びつくようになる。

### Exercise 04: Components

部品を再利用するための仕組み。

```html
<div id="app">
  <hello></hello>
</div>
```

このように、独自のタグ名に、一定のセットを設定できる。

```jsx
const sayHello = Vue.extend({
  template: "<h1>Hello Vue!</h1>"
});

const app = new Vue({
  el: "#app",
  components: {
    hello: sayHello
  }
});
```

- `components` というキーの中で、 `(タグ名): (定義名)` という形で記述してある。
- 定義には `Vue.extend` というものを使い、 `template` として設定する。

なお、

```jsx
Vue.component("hello", {
  template: "<h1>Hello Vue!</h1>"
});
```

というように、 `Vue.component` でいきなり定義する方法も存在する。
こちらの方が簡潔に書けるのだが、カスタムコンポーネントの利点である「他ファイルへの切り出し」ができなくなってしまうため、避けた方が無難。

### Exercise 05: Props

コンポーネントにて、大体の機能は同じのまま、少しだけ内容を変えたいという場合に使用する。

```jsx
Vue.component('series-item', {
		props: ['series'],
		template: '<h2>{{ series.text }}</h2>'
})
const app = new Vue({
		el: '#app',
		data: {
			NetflixList: [
				{ id: 0, text: "Queen's Gambit" },
				{ id: 1, text: "Altered Carbon" },
				{ id: 2, text: "Black Mirror" }
			]
		}
});
```

- `series-item` というコンポーネントに、HTML 側から series というカスタム属性を渡せるようにしてある。
それを受け取れるように設定するため、 `props` というキーを用いる（'properties' の意）

```html
<div id="app">
	<!-- <series-item v-for='program in NetflixList' v-bind:series='program'></series-item> -->
	<series-item v-for='program in NetflixList' :series='program'></series-item>
</div>
```

- `v-for` というディレクティブ内では、program という要素名で、NetflixList の各要素を順番に受け取るようになっている。
- `v-bind` により、引き取った program を series というカスタム属性名にて、コンポーネント内で受け取れるようにしている。

### その他

- `v-for` は `v-if` より先に実行されるので、同じところに書くとエラーの原因。
- ブラウザをリロードしても元に戻らないようにするには、LocalStorage を使用できる。
- データが変更されたかを検知してくれる仕組みとして、 `watch` というものを使える。