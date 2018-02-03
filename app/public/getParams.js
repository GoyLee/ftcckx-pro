// refers: https://www.sitepoint.com/get-url-parameters-with-javascript/
// 解析url字符串中的参数对
function getUrlParams(url) {
    const d = decodeURIComponent;
    let queryString = url ? url.split('?')[1] : window.location.search.slice(1); //获得url?之后的参数字符串
    const obj = {};
    if (queryString) {
      queryString = queryString.split('#')[0]; // eslint-disable-line
      const arr = queryString.split('&'); //获得按‘&’分割后的array
      for (let i = 0; i < arr.length; i += 1) {
        const a = arr[i].split('=');
        let paramNum;
        const paramName = a[0].replace(/\[\d*\]/, (v) => {
          paramNum = v.slice(1, -1);
          return '';
        });
        const paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
        if (obj[paramName]) {
          if (typeof obj[paramName] === 'string') {
            obj[paramName] = d([obj[paramName]]);
          }
          if (typeof paramNum === 'undefined') {
            obj[paramName].push(d(paramValue));
          } else {
            obj[paramName][paramNum] = d(paramValue);
          }
        } else {
          obj[paramName] = d(paramValue);
        }
      }
    }
    return obj;
  }

  module.exports = getUrlParams;