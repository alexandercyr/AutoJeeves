var api = {
    getMakes(){
        var url = 'https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=whd6v9437aamfbvpbzgd2wy4';
        return fetch(url).then((res) => res.json());
    },
    getService(modelID: String){
        var url = 'https://api.edmunds.com/v1/api/maintenance/actionrepository/findbymodelyearid?modelyearid='+modelID+'&fmt=json&api_key=ybvpaqeqbzqr55tv9fjr2z5n';
        return fetch(url).then((res) => res.json());
    }
}

module.exports = api;