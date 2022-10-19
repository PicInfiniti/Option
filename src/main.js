import $ from "jquery"
import './assets/css/style.css'



var server = 'http://192.168.1.11:5000/'






$.ajax({
  type: "GET",
  url: `${server}/option`,
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (data) {
    console.log(data.bData);
    for(let i of data.bData){
      let tr = $('<tr></tr>').appendTo('#option tbody').append(`
      <td>${i.val.namad}</td>
      <td>${i.val.name}</td>
      <td dir='ltr'>${i.val.pghey}</td>
      <td dir='ltr'>${i.val.mb}</td>
      <td dir='ltr'>${i.val.hajm}</td>
      <td dir='ltr'>${i.val.arzesh}</td>
      <td dir='ltr'>${i.val.dm}</td>
      <td dir='ltr'>${i.val.aghey}</td>
      <td dir='ltr' style='background-color:rgba(197, 197, 245, 0.5); color: black'>${i.val.bt_h}</td>
      <td dir='ltr' style='background-color:rgba(197, 197, 245, 0.5); color: black'>${i.val.bt_gh}</td>
      <td dir='ltr' style='background-color:rgba(255, 188, 188, 0.6); color: black'>${i.val.ba_gh}</td>
      <td dir='ltr' style='background-color:rgba(255, 188, 188, 0.6); color: black'>${i.val.ba_h}</td>
      <td dir='ltr'>${i.val.ang}</td>
      <td dir='ltr'>${i.val.r_b}</td>
      <td dir='ltr'>${i.val.ghe}</td>
      <td dir='ltr'>${i.val.gh_s_p}</td>
      `)
    }
  },
  error: function (errMsg) {
    console.log(errMsg);
  }
});