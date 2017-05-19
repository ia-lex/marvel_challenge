export default {
    data() {
        return {
            apikey: '988df6a40896d6da8128a7a7064b2845',
            marvelBaseUrl: 'http://gateway.marvel.com/',
        }
    },
    methods: {
        api(path) {
            return this.marvelBaseUrl + path;
        }
    }
}