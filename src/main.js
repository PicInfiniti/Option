import $ from "jquery"
// import './assets/css/style.css'



var server = 'http://localhost:5000/'
var totalData;

var tags = [
  "aghey",
  "ang",
  "arzesh",
  "ba_gh",
  "ba_h",
  "bt_gh",
  "bt_h",
  "dm",
  "ekh",
  "gh_s_p",
  "ghe",
  "ghe+ba_gh",
  "hajm",
  "leverage",
  "mb",
  "namad",
  "name",
  "p_profit",
  "percent",
  "pghey",
  "r_b"
]


var Dir = ['0', 'asc']


$.ajax({
  type: "GET",
  url: `${server}/option`,
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (data) {
    totalData = data;
    fillTable(data);
  },
  error: function (errMsg) {
    console.log(errMsg);
  }
});

$('#option tbody').on('click', function (e) {
  $('tr').css({
    'background-color': ''
  })
  $(e.target).closest('tr').css({
    'background-color': 'rgba(250, 250, 96, 0.603)'
  })
})



$('#input input').keyup((event) => {
  let name = {}
  for (let i of tags) {
    name[i] = $(`#input [name='${i}'] input`).val()
  }

  let counter = 1
  for (let i of totalData.bData) {
    if (Filter(i.val, name)) {
      $(`#${i.i}`).show()
      $(`#${i.i} td[name='count']`).html(counter++)
    } else {
      $(`#${i.i}`).hide()
    }
  }
})

$('#option .head th').click((event) => {
  let name = event.target.getAttribute('name');
  if (Dir[0] == name) {
    Dir[1] = (Dir[1] == 'asc') ? 'des' : 'asc';
  } else {
    Dir[0] = name
    Dir[1] = 'asc'
  }


  if (name != 'count') {
    totalData.bData.sort((a, b) => {

      if (name == 'percent' || name == 'p_profit' || name == 'leverage') {
        let _a = a.val[name]
        let _b = b.val[name]

        if (Dir[1] == 'asc') {
          return Number(_a) < Number(_b)
        } else {
          return Number(_a) > Number(_b)
        }

      } else {
        let _a = number(a.val[name])
        let _b = number(b.val[name])

        if (isNaN(Number(_a))) {
          if (Dir[1] == 'asc') {
            return _a < _b
          } else {
            return _a > _b
          }

        } else {
          if (Dir[1] == 'asc') {
            return Number(_a) < Number(_b)
          } else {
            return Number(_a) > Number(_b)
          }
        }
      }
    })
  }

  $('#option tbody').empty()
  fillTable(totalData);

})

function fillTable(data) {
  let counter = 1;
  for (let i of data.bData) {
    $(`<tr id=${i.i}></tr>`).appendTo('#option tbody').append(`
    <td name="count">${counter++}</td>
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
    <td dir='ltr' style='color:${r_bColor(i.val.r_b)}'>${i.val.r_b}</td>
    <td dir='ltr'>${i.val.ghe}</td>
    <td dir='ltr' style='color:${colorPicker(i.val.ekh)}'>${i.val.ekh}</td>
    <td dir='ltr'>${i.val.gh_s_p}</td>
    <td dir='ltr' style='color:${colorPicker(i.val.percent)}'>${i.val.percent}</td>
    <td dir='ltr' style='color:${Number(number(i.val.gh_s_p))>Number(number(i.val['ghe+ba_gh']))?'green':'red'}'>${i.val['ghe+ba_gh']}</td>
    <td dir='ltr' style='color:${colorPicker(i.val.p_profit)}'>${i.val.p_profit}</td>
    <td dir='ltr' style='clear:center; text-align:center;'>${i.val.leverage}</td>
    `)
  }

  let name = {}
  for (let i of tags) {
    name[i] = $(`#input [name='${i}'] input`).val()
  }

  counter = 1
  for (let i of totalData.bData) {
    if (Filter(i.val, name)) {
      $(`#${i.i}`).show()
      $(`#${i.i} td[name='count']`).html(counter++)
    } else {
      $(`#${i.i}`).hide()
    }
  }
}


function number(a) {
  let _a = a.replaceAll(',', '')
  if (a.includes('M') || a.includes('B')){
    _a = _a.replace('.', '')
    _a = _a.replace(' M', '00000')
    _a = _a.replace(' B', '00000000')
  }


  return _a
}


function colorPicker(n) {
  if (n !== undefined) {
    n = number(n)
    if (n < 0) {
      return 'red'
    } else if (n >= 0) {
      return 'green'
    } else {
      return 'black'
    }
  } else {
    return 'black'
  }


}

function r_bColor(n) {
  n = number(n)
  if (n < 30) {
    return 'red'
  } else {
    return 'green'
  }
}


function Filter(val, param) {
  for (let i in param) {
    if (param[i] != "") {
      if (i == 'name' || i == 'namad') {
        if (!val[i].includes(param[i])) {
          return false;
        }
      } else {
        let tmp = param[i].split(' ')
        if (tmp.length == 1) {
          if (Number(number(val[i])) != param[i]) {
            return false;
          }
        } else {
          tmp[1] = Number(tmp[1]);
          switch (tmp[0]) {
            case '=':
              if (Number(number(val[i])) != tmp[1]) {
                return false;
              }
              break;

            case '!=':
              if (Number(number(val[i])) == tmp[1]) {
                return false;
              }
              break;

            case '>':
              if (Number(number(val[i])) <= tmp[1]) {
                return false;
              }
              break;

            case '<':
              if (Number(number(val[i])) >= tmp[1]) {
                return false;
              }
              break;

            case '>=':
              if (Number(number(val[i])) < tmp[1]) {
                return false;
              }
              break;

            case '<=':
              if (Number(number(val[i])) > tmp[1]) {
                return false;
              }
              break;

            default:
              return false
          }
        }
      }

    }
  }
  return true
}