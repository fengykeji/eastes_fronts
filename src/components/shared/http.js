//const httphead = { 'headers': { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'Accept': '*/*', 'ACCESS_ROLE':'provide','ACCESS_TOKEN':'1332132'} }
const httpurl = '' //localStorage.getItem('http');
import axios from 'axios'
const httphead = (token, role) => {
    return { 'headers': { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 'Accept': '*/*', 'ACCESS_ROLE': token, 'ACCESS_TOKEN': role } }
}

const webservicexml = (method, data) => {
    console.log('提交参数=====>' + method, data)
    let DATA = '<soapenv:Envelope xmlns:soapenv=\'http://schemas.xmlsoap.org/soap/envelope/\' xmlns:own=\'http://own.mamp.ophiux.com/\'>' +
        '<soapenv:Body>' +
        '<' + method + '>' +
        '<data>' +
        JSON.stringify(data) +
        '</data>' +
        '</' + method + '>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>'
    return DATA
}
const returndata = (data) => {
    data = data.replace(/&quot;/g, '"').replace(/<return>/g, '%').replace('</return>', '%')
    data = data.split('%')
    data = data[1]
    console.log(JSON.parse(data))
    return JSON.parse(data)
}
const getrandomstring = (data) => {


}

const md5 = (data) => {
    return this.MD5(data);
}


export default {
    httphead,
    httpurl,
    webservicexml,
    returndata
}