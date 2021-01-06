(function() {
	'use strict';

	const vm = new Vue({
		el: '#app',
		data: {
			newItem: '',
			todos: [
				'item 1',
				'item 2',
				'item 3',
			]
		},
		methods: {
			// こちらは、js 内でどうにかする書き方。
			// よく使うため、HTML での v-on で制御する方法が用意されている。
			// addItem: function(e) {
			// 	e.preventDefault();
			// 	this.todos.push(this.newItem);
			// };
			addItem: function() {
				this.todos.push(this.newItem);
				// submit 後、フォームに残った文字をリセット
				this.newItem = '';
			},
			deleteItem: function(index) {
				if (confirm('are you sure?'))
					this.todos.splice(index, 1);
			},
		}
	});

})();
