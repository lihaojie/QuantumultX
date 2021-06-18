
/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

const url = `https://zhiren.com/employee_view/employees/19794951/attendances/punch`;
const method = `POST`;
const headers = {
'X-Requested-With' : `XMLHttpRequest`,
'Connection' : `keep-alive`,
'Accept-Encoding' : `gzip, deflate, br`,
'Content-Type' : `application/x-www-form-urlencoded; charset=UTF-8`,
'X-CSRF-Token' : `nNHvC475eHGD/4CUYH5rLW6amSJT2xG+sZ4A7P3+Jo/ioETeyPcRPWi1B/iRl4H9LmDIEto2UbmeK4MHZGx1Gg==`,
'Origin' : `https://zhiren.com`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.3(0x1800032a) NetType/4G Language/zh_CN`,
'Cookie' : `_zr_rack_session=V2ZRMVJRRHNkWkluUml0WUw3dzlEckc0Z1VWM3pUZzZRNStkeFNtbWV3Y1B4N25ROXJRQTh4ZzZPbStiSEFFTnRjcUdPaWg0Vkt6WGlHMXdwYTBKWFFaU3dQQ0QwcGdNQlg0YmVINzlESTFvZ2toRnNRWGd0RGZkM0dMaUF6eHFQVFdzcTZoc3FYVUtsc1JVRzlOeVFXZkg4VjFaZVlXTGZnUkQvMFJvMHZ3bXhPZnlWa3c1dC9Sc3I1VlljOHY2RnNpak1tVkJwb0FSVjY1a0ZsZ1YyUT09LS1TQ1NyUk0ySXdiUEZ4TXF0WjJlNHZRPT0%3D--2320c4047421d558674896f6a6c604f8f68f8f74`,
'Referer' : `https://zhiren.com/employee_view/employees/19794951/attendances/punch/new`,
'Host' : `zhiren.com`,
'Accept-Language' : `zh-cn`,
'Accept' : `*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript`
};
const body = `utf8=%E2%9C%93&attendances_punch%5Blocation%5D=%7B%22latitude%22%3A39.972129821777344%2C%22longitude%22%3A116.29998779296875%2C%22accuracy%22%3A13.307543754577637%7D&attendances_punch%5Bbeacons%5D=&attendances_punch%5Bwifi%5D=&attendances_punch%5Bignore_distance%5D=false`;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};



$task.fetch(myRequest).then(response => {
    // response.statusCode, response.headers, response.body
    console.log(response.body);
    $notify("🎉打卡成功🎉", "😍🥰😘🐂🍺", response.body); // Success!
    $done();
}, reason => {
    // reason.error
    $notify("失败❌", "❌出错啦～", reason.error); // Error!
    $done();
});





