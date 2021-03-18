export function formatTimestamp(timestamp, format = 'YYYY-MM-dd hh:mm:ss') {
  let date = new Date(timestamp * 1000)

  let obj = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    'S': date.getMilliseconds(),
  }

  if (/(Y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (let i in obj) {
    if (new RegExp("(" + i + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? obj[i] : ("00" + obj[i]).substr(("" + obj[i]).length));
    }
  }

  return format;
}
