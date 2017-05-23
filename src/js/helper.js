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
        },
        getFromStorage(key) {
            let data = localStorage.getItem(key);
            if (data) {
                return JSON.parse(data);
            } else {
                return false;
            }
        },
        setStorage(key, data) {
            let dataToSave = JSON.stringify(data);
            localStorage.setItem(key, dataToSave);
        },
        arrayIndexShuffle(length) {
            let arrayTemp = Array.from(new Array(length), (val, index) => index);
            let j = 0;
            let temp;
            while(length--) {
                j = Math.floor(Math.random() * length);
                temp = arrayTemp[length];
                arrayTemp[length] = arrayTemp[j];
                arrayTemp[j] = temp;
            }
            return arrayTemp;
        }
    }
}