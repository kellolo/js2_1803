let API = 'https://raw.githubusercontent.com/kekima/static/master/js2hw/json/'

let catalog = new Vue({
    el: '#catalog',
    data: {
        url: 'data.json',
        img: 'https://placehold.it/300x200',
        items: []
    },
    methods: {
        async getData() {
            try {
                this.items = await fetch(API + this.url)
                    .then(d => d.json())
            } catch (err) {
                console.log(err)
            } finally {
                console.log(this.items)
            }
        }
    },
    mounted() {
        this.getData()
    }
})

let cart = new Vue({
    //el: '#cart',
    data: {
        url: 'getBasket.json',
        items: [],
        img: 'https://placehold.it/100x80',
        showcart: false
    },
    methods: {
        async getData(url) {
            try {
                this.items = await fetch(API + this.url)
                    .then(d => d.json())
                    .then(data => data.contents)
            } catch (err) {
                console.log(err)
            } finally {
                console.log(this.items)
            }
        }
    },
    mounted() {
        this.getData()
    }
})


export default function app() {
    console.log('Build done!')
}