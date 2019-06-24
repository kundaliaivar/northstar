import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.14:8080/api';
// require('dns').lookup(require('os').hostname(), function (err, ip, fam) {
//     axios.defaults.baseURL = `http://${ip}:8080/api`;
// })

// dns.lookup(os.hostname(),function (err, ip, fam) {
//     axios.defaults.baseURL = `http://${ip}:8080/api`;
// })