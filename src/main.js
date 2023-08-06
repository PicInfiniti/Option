import $ from "jquery"
import './assets/sass/style.sass'
import {
  parsJson
} from './assets/js/counter'
// import totalData from './data.json';

// parsJson(totalData.bData)

var totalData
var Option = 'Call'

if (window.location.pathname.includes('put')) {
  $('#callOption').css({
    display: 'none'
  })
  Option = 'Put'
} else {
  if (!window.location.pathname.includes('call')) {
    window.location.pathname = '/call'
  }
  $('#putOption').css({
    display: 'none'
  })
  Option = 'Call'
}



var callTags = [
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
  "ghePba_gh",
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

var putTags = [
  "ang",
  "fo_aghey",
  "fo_arzesh",
  "fo_ba_gh",
  "fo_ba_h",
  "fo_bt_gh",
  "fo_bt_h",
  "fo_dm",
  "fo_hajm",
  "fo_mb",
  "fo_namad",
  "fo_name",
  "fo_pghey",
  "gh_s_p",
  "ghe",
  "ghePba_gh",
  "r_b"
]

var Dir = ['0', 'asc']

$.ajax({
  url: 'https://old.tse.ir/json/MarketWatch/data_7.json', // Replace with your API endpoint
  type: 'GET',
  success: function (data) {
    totalData = data
    parsJson(totalData.bData)
    if (Option == 'Call') {
      fillTableCall(totalData);
    } else if (Option == 'Put') {
      fillTablePut(totalData)
    } else {
      fillTableCall(totalData);
      fillTablePut(totalData)
    }

  },
  error: function (xhr, status, error) {
    // AJAX request encountered an error, handle the error
    $('#result').html('Error: ' + error);
  }
});


// if (Option == 'Call') {
//   fillTableCall(totalData);
// } else if (Option == 'Put') {
//   fillTablePut(totalData)
// } else {
//   fillTableCall(totalData);
//   fillTablePut(totalData)
// }

$('#callOption tbody').on('click', function (e) {
  $('tr').css({
    'background-color': ''
  })
  $(e.target).closest('tr').css({
    'background-color': 'rgba(250, 250, 96, 0.603)'
  })
})

$('#callOption #input input').keyup((event) => {
  let name = {}
  for (let i of callTags) {
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

$('#callOption .head th').click((event) => {
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

        let _a = number(a.val[name])
        let _b = number(b.val[name])

        if (Dir[1] == 'asc') {
          return Number(_a) < Number(_b) ? 1 : -1
        } else {
          return Number(_a) > Number(_b) ? 1 : -1
        }

      } else {
        let _a = number(a.val[name])
        let _b = number(b.val[name])

        if (isNaN(Number(_a))) {
          if (Dir[1] == 'asc') {
            return _a < _b ? 1 : -1
          } else {
            return _a > _b ? 1 : -1
          }

        } else {
          if (Dir[1] == 'asc') {
            return Number(_a) < Number(_b) ? 1 : -1
          } else {
            return Number(_a) > Number(_b) ? 1 : -1
          }
        }
      }
    })
  }

  $('#callOption tbody').empty()
  fillTableCall(totalData);

})



$('#putOption tbody').on('click', function (e) {
  $('tr').css({
    'background-color': ''
  })
  $(e.target).closest('tr').css({
    'background-color': 'rgba(250, 250, 96, 0.603)'
  })
})

$('#putOption #input input').keyup((event) => {

  let name = {}
  for (let i of putTags) {
    name[i] = $(`#putOption #input [name='${i}'] input`).val()
  }

  let counter = 1
  for (let i of totalData.bData) {
    if (Filter(i.val, name)) {
      $(`#${i.i2}`).show()
      $(`#${i.i2} td[name='count']`).html(counter++)
    } else {
      $(`#${i.i2}`).hide()
    }
  }
})

$('#putOption .head th').click((event) => {
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
          return Number(_a) < Number(_b) ? 1 : -1
        } else {
          return Number(_a) > Number(_b) ? 1 : -1
        }

      } else {
        let _a = number(a.val[name])
        let _b = number(b.val[name])

        if (isNaN(Number(_a))) {
          if (Dir[1] == 'asc') {
            return _a < _b ? 1 : -1
          } else {
            return _a > _b ? 1 : -1
          }

        } else {
          if (Dir[1] == 'asc') {
            return Number(_a) < Number(_b) ? 1 : -1
          } else {
            return Number(_a) > Number(_b) ? 1 : -1
          }
        }
      }
    })
  }

  $('#putOption tbody').empty()
  fillTablePut(totalData);

})







function fillTableCall(data) {
  let counter = 1;
  for (let i of data.bData) {
    $(`<tr id=${i.i}></tr>`).appendTo('#callOption tbody').append(`
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
    <td dir='ltr' style='color:${Number(number(i.val.gh_s_p))>Number(number(i.val['ghePba_gh']))?'green':'red'}'>${i.val['ghePba_gh']}</td>
    <td dir='ltr' style='color:${colorPicker(i.val.p_profit)}'>${i.val.p_profit}</td>
    <td dir='ltr' style='clear:center; text-align:center;'>${i.val.leverage}</td>
    `)
  }

  let name = {}
  for (let i of callTags) {
    name[i] = $(`#callOption #input [name='${i}'] input`).val()
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

function fillTablePut(data) {
  let counter = 1;
  for (let i of data.bData) {
    $(`<tr id=${i.i2}></tr>`).appendTo('#putOption tbody').append(`
    <td name="count">${counter++}</td>
    <td style="display: none">${i.darayi}</td>
    <td>${i.val.fo_namad}</td>
    <td>${i.val.fo_name}</td>
    <td dir='ltr'>${i.val.fo_pghey}</td>
    <td dir='ltr'>${i.val.fo_mb==null || i.val.fo_mb=='' ? 0 : i.val.fo_mb}</td>
    <td dir='ltr'>${i.val.fo_hajm}</td>
    <td dir='ltr'>${i.val.fo_arzesh}</td>
    <td dir='ltr'>${i.val.fo_dm}</td>
    <td dir='ltr'>${i.val.fo_aghey}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(197, 197, 245, 0.5); color: black'>${i.val.fo_bt_h}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(197, 197, 245, 0.5); color: black'>${i.val.fo_bt_gh}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(255, 188, 188, 0.6); color: black'>${i.val.fo_ba_gh}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(255, 188, 188, 0.6); color: black'>${i.val.fo_ba_h}</td>
    <td dir='ltr'>${i.val.ang}</td>
    <td dir='ltr' style='color:${r_bColor(i.val.r_b)}'>${i.val.r_b}</td>
    <td dir='ltr'>${i.val.ghe}</td>
    <td dir='ltr' style='color:${colorPicker(i.val.ekh)}'>${i.val.ekh}</td>
    <td dir='ltr'>${i.val.gh_s_p}</td>
    <td dir='ltr' style='color:${colorPicker(i.val.percent)}'>${i.val.percent}</td>
    <td dir='ltr' style='color:${Number(number(i.val.gh_s_p))>Number(number(i.val['ghePba_gh']))?'green':'red'}'>${i.val['ghePba_gh']}</td>
    <td dir='ltr' style='color:${colorPicker(i.val.p_profit)}'>${i.val.p_profit}</td>
    <td dir='ltr' style='clear:center; text-align:center;'>${i.val.leverage}</td>
    `)
  }

  let name = {}
  for (let i of putTags) {
    name[i] = $(`#putOption #input [name='${i}'] input`).val()
  }

  counter = 1
  for (let i of totalData.bData) {
    if (Filter(i.val, name)) {
      $(`#${i.i2}`).show()
      $(`#${i.i2} td[name='count']`).html(counter++)
    } else {
      $(`#${i.i2}`).hide()
    }
  }
}


function number(a) {
  let _a = a.replaceAll(',', '')
  if (a.includes('M') || a.includes('B')) {
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
      if (i == 'name' || i == 'namad' || i == 'fo_name' || i == 'fo_namad') {
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