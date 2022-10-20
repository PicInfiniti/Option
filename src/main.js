import $ from "jquery"
// import './assets/css/style.css'



var server = 'http://192.168.1.11:5000/'
var Data;

var Dir = ['0', 'asc']


$.ajax({
  type: "GET",
  url: `${server}/option`,
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (data) {
    Data = data;
    fillTable(data);
  },
  error: function (errMsg) {
    console.log(errMsg);
  }
});

$('#Search').keyup(() => {
  let input = document.getElementById("Search");
  let filter = input.value.toUpperCase();
  let table = document.getElementById("option");
  let tr = table.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    let td_0 = tr[i].getElementsByTagName("td")[0];
    let td_1 = tr[i].getElementsByTagName("td")[1];
    if (td_0 && td_1) {
      let txtValue_0 = td_0.textContent || td_0.innerText;
      let txtValue_1 = td_1.textContent || td_1.innerText;
      if (txtValue_0.toUpperCase().indexOf(filter) > -1 || txtValue_1.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
})

$('#option th').click((event) => {
  let name = event.target.getAttribute('name');
  if (Dir[0] == name) {
    Dir[1] = (Dir[1] == 'asc') ? 'des' : 'asc';
  } else {
    Dir[0] = name
    Dir[1] = 'asc'
  }
  console.log(Dir)
  Data.bData.sort((a, b) => {

    let _a = a.val[name].replaceAll(',', '')
    let _b = b.val[name].replaceAll(',', '')

    _a = _a.replace('.', '')
    _b = _b.replace('.', '')

    _a = _a.replace(' M', '00000')
    _b = _b.replace(' M', '00000')

    _a = _a.replace(' B', '00000000')
    _b = _b.replace(' B', '00000000')


    if (isNaN(Number(_a))) {
      if (Dir[1] == 'asc') {
        return _a < _b
      } else {
        return _a > _b
      }

    } else {
      console.log(Dir[1])
      if (Dir[1] == 'asc') {
        return Number(_a) < Number(_b)
      } else {
        return Number(_a) > Number(_b)
      }
    }

  })
  $('#option tbody').empty()
  fillTable(Data);

})

function fillTable(data) {
  for (let i of data.bData) {
    $('<tr></tr>').appendTo('#option tbody').append(`
    <td style="display: none">${i.darayi}</td>
    <td>${i.val.namad}</td>
    <td>${i.val.name}</td>
    <td dir='ltr'>${i.val.pghey}</td>
    <td dir='ltr'>${i.val.mb}</td>
    <td dir='ltr'>${i.val.hajm}</td>
    <td dir='ltr'>${i.val.arzesh}</td>
    <td dir='ltr'>${i.val.dm}</td>
    <td dir='ltr'>${i.val.aghey}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(197, 197, 245, 0.5); color: black'>${i.val.bt_h}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(197, 197, 245, 0.5); color: black'>${i.val.bt_gh}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(255, 188, 188, 0.6); color: black'>${i.val.ba_gh}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(255, 188, 188, 0.6); color: black'>${i.val.ba_h}</td>
    <td dir='ltr'>${i.val.ang}</td>
    <td dir='ltr'>${i.val.r_b}</td>
    <td dir='ltr'>${i.val.ghe}</td>
    <td dir='ltr'>${i.val.ekh}</td>
    <td dir='ltr'>${i.val.gh_s_p}</td>
    <td dir='ltr'>${i.val.percent}</td>
    `)
  }

}