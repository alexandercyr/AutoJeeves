var api = {
    getMakes(){
        var url = 'https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=ybvpaqeqbzqr55tv9fjr2z5n';
        return fetch(url).then((res) => res.json());
    }
}

module.exports = api;