import $ from "jquery"
import './assets/sass/style.sass'

import totalData from './data.json';

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
  "instrumentName",
  "companyNamePersian",
  "closingPrice",
  "moqeyateBaz",
  "tradeVolume",
  "tradeValue",
  "lastPrice",
  "buyQuantity",
  "buyBuyPrice",
  "sellBuyPrice",
  "sellBuyQuantity",
  "andazeQarardad",
  "baghimandeTaSarresid",
  "qeymateEmal",
  "qeymateMabna",
  "sellInstrumentName",
  "sellCompanyNamePersian",
  "sellClosingPrice",
  "sellMoqeyathayeBaz",
  "sellTradeVolume",
  "sellTradeValue",
  "sellLastPrice",
  "sellSellPrice",
  "sellSellQuantity",
  "ekh",
  "percent",
  "ghe+sellBuyPrice",
  "ekh_profit",
  "p_profit",
  "leverage"
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
  "ghe+ba_gh",
  "r_b"
]

var Dir = ['0', 'asc']

if (Option == 'Call') {
  fillTableCall(totalData);
} else if (Option == 'Put') {
  fillTablePut(totalData)
} else {
  fillTableCall(totalData);
  fillTablePut(totalData)
}

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
  for (let row of totalData) {
    if (Filter(row, name)) {
      $(`#${row.instrumentId}`).show()
      $(`#${row.instrumentId} td[name='count']`).html(counter++)
    } else {
      $(`#${row.instrumentId}`).hide()
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
    totalData.sort((a, b) => {

      if (name == 'percent' || name == 'p_profit' || name == 'leverage') {
        let _a = a[name]
        let _b = b[name]

        if (Dir[1] == 'asc') {
          return Number(_a) < Number(_b) ? 1 : -1
        } else {
          return Number(_a) > Number(_b) ? 1 : -1
        }

      } else {
        let _a = number(a[name])
        let _b = number(b[name])

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
  for (let i of totalData) {
    if (Filter(i, name)) {
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
    totalData.sort((a, b) => {

      if (name == 'percent' || name == 'p_profit' || name == 'leverage') {
        let _a = a[name]
        let _b = b[name]

        if (Dir[1] == 'asc') {
          return Number(_a) < Number(_b)
        } else {
          return Number(_a) > Number(_b)
        }

      } else {
        let _a = number(a[name])
        let _b = number(b[name])

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

  $('#putOption tbody').empty()
  fillTablePut(totalData);

})







function fillTableCall(data) {
  let counter = 1;
  for (let i of data) {
    $(`<tr id=${i.instrumentId}></tr>`).appendTo('#callOption tbody').append(`
    <td name="count">${counter++}</td>
    <td>${i.instrumentName}</td>
    <td>${i.companyNamePersian}</td>
    <td dir='ltr'>${i.closingPrice}</td>
    <td dir='ltr'>${i.moqeyateBaz}</td>
    <td dir='ltr'>${i.tradeVolume}</td>
    <td dir='ltr'>${i.tradeValue}</td>
    <td dir='ltr'>${i.lastPrice}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(197, 197, 245, 0.5); color: black'>${i.buyQuantity}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(197, 197, 245, 0.5); color: black'>${i.buyBuyPrice}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(255, 188, 188, 0.6); color: black'>${i.sellBuyPrice}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(255, 188, 188, 0.6); color: black'>${i.sellBuyQuantity}</td>
    <td dir='ltr'>${i.andazeQarardad}</td>
    <td dir='ltr' style='color:${r_bColor(i.baghimandeTaSarresid)}'>${i.baghimandeTaSarresid}</td>
    <td dir='ltr'>${i.qeymateEmal}</td>
    <td dir='ltr' style='color:${colorPicker(i.ekh)}'>${i.ekh}</td>
    <td dir='ltr'>${i.qeymateMabna}</td>
    <td dir='ltr' style='color:${colorPicker(i.percent)}'>${i.percent}</td>
    <td dir='ltr' style='color:${Number(number(i.gh_s_p))>Number(number(i['ghe+sellBuyPrice']))?'green':'red'}'>${i['ghe+sellBuyPrice']}</td>
    <td dir='ltr' style='color:${colorPicker(i.p_profit)}'>${i.p_profit}</td>
    <td dir='ltr' style='clear:center; text-align:center;'>${i.leverage}</td>
    `)
  }

  let name = {}
  for (let i of callTags) {
    name[i] = $(`#callOption #input [name='${i}'] input`).val()
  }

  counter = 1
  for (let i of totalData) {
    if (Filter(i, name)) {
      $(`#${i.i}`).show()
      $(`#${i.i} td[name='count']`).html(counter++)
    } else {
      $(`#${i.i}`).hide()
    }
  }
}

function fillTablePut(data) {
  let counter = 1;
  for (let i of data) {
    $(`<tr id=${i.i2}></tr>`).appendTo('#putOption tbody').append(`
    <td name="count">${counter++}</td>
    <td style="display: none">${i.darayi}</td>
    <td>${i.fo_namad}</td>
    <td>${i.fo_name}</td>
    <td dir='ltr'>${i.fo_pghey}</td>
    <td dir='ltr'>${i.fo_mb==null || i.fo_mb=='' ? 0 : i.fo_mb}</td>
    <td dir='ltr'>${i.fo_hajm}</td>
    <td dir='ltr'>${i.fo_arzesh}</td>
    <td dir='ltr'>${i.fo_dm}</td>
    <td dir='ltr'>${i.fo_aghey}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(197, 197, 245, 0.5); color: black'>${i.fo_bt_h}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(197, 197, 245, 0.5); color: black'>${i.fo_bt_gh}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(255, 188, 188, 0.6); color: black'>${i.fo_ba_gh}</td>
    <td dir='ltr' style='clear:center; text-align:center; background-color:rgba(255, 188, 188, 0.6); color: black'>${i.fo_ba_h}</td>
    <td dir='ltr'>${i.ang}</td>
    <td dir='ltr' style='color:${r_bColor(i.r_b)}'>${i.r_b}</td>
    <td dir='ltr'>${i.ghe}</td>
    <td dir='ltr' style='color:${colorPicker(i.ekh)}'>${i.ekh}</td>
    <td dir='ltr'>${i.gh_s_p}</td>
    <td dir='ltr' style='color:${colorPicker(i.percent)}'>${i.percent}</td>
    <td dir='ltr' style='color:${Number(number(i.gh_s_p))>Number(number(i['ghe+ba_gh']))?'green':'red'}'>${i['ghe+ba_gh']}</td>
    <td dir='ltr' style='color:${colorPicker(i.p_profit)}'>${i.p_profit}</td>
    <td dir='ltr' style='clear:center; text-align:center;'>${i.leverage}</td>
    `)
  }

  let name = {}
  for (let i of putTags) {
    name[i] = $(`#putOption #input [name='${i}'] input`).val()
  }

  counter = 1
  for (let i of totalData) {
    if (Filter(i, name)) {
      $(`#${i.i2}`).show()
      $(`#${i.i2} td[name='count']`).html(counter++)
    } else {
      $(`#${i.i2}`).hide()
    }
  }
}


function number(a) {
  // let _a = a.replaceAll(',', '')
  // if (a.includes('M') || a.includes('B')){
  //   _a = _a.replace('.', '')
  //   _a = _a.replace(' M', '00000')
  //   _a = _a.replace(' B', '00000000')
  // }

  return a
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
    if (param[i] && param[i] != "") {
      if (i == 'instrumentName' || i == 'companyNamePersian' || i == 'sellInstrumentName' || i == 'sellCompanyNamePersian') {
        if (!val[i].includes(param[i])) {
          return false;
        }
      } else {
        let tmp = param[i].split(' ')
        if (tmp.length == 1) {
          if (Number(number(val[i])) != Number(param[i])) {
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