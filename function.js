var fs = require("fs")

exports.seeTodoAll = function () {
  try {
    let nilai = fs.readdirSync("./src")
    return `success : ${JSON.stringify(nilai)}`
  } catch (error) {
    return `File ${nilai} not found`
  }
}

exports.addTodo = function (name) {
  let nilaiOld = fs.readdirSync(`./src`)

  // jika nama telah digunakan
  for (let i = 0; i < nilaiOld.length; i++) {
    // console.log(nilaiOld[i], name + '.json')
    if (nilaiOld[i] === name + '.json') {
      return `Name file ${name}.json telah digunakan`
    }
  }

  try {
    // jika nama undefined
    if (name === undefined) {
      return `Failed add todolist ${name}.json`
    } else {
      let nilaiku = fs.writeFileSync(`./src/${name}.json`, '{"data":[]}')
      let nilaiNew = fs.readdirSync(`./src`)
      return `success add todolist ${JSON.stringify(nilaiNew)}`
    }
  } catch (error) {
    return `Failed add todolist ${error}`
  }
}


exports.renameTodo = function (nameOld, nameNew) {
  let nilaiIni = fs.readdirSync('./src')

  for (let i = 0; i < nilaiIni.length; i++) {
    // ada kagak file tersebut
    if (nilaiIni[i] === nameOld + '.json') {
      // namanya udh di pake belum
      if (nilaiIni[i] === nameNew + '.json') {
        return `Name file ${nameNew}.json telah digunakan`
      }
    } else {
      return `Name file ${nameNew}.json tidak ditemukan`
    }
  }

  try {
    // ada kagak nama barunya
    if (nameNew === undefined) {
      return `Failed rename todolist ${nameNew}.json`
    } else {
      let nilaiku = fs.renameSync(`./src/${nameOld}.json`, `./src/${nameNew}.json`)
      let nilaiNew = fs.readdirSync('./src')
      return `success rename todolist ${JSON.stringify(nilaiNew)}`
    }
  } catch (error) {
    return `Failed rename todolist ${error}`
  }
}

exports.deleteTodo = function (name) {
  let nilaiIni = fs.readdirSync('./src');

  try {
    if (name === undefined) {
      return `Failed delete todolist ${name}.json`
    } else {
      for (let i = 0; i < nilaiIni.length; i++) {
        // ada kagak file tersebut
        if (nilaiIni[i] === name + '.json') {
          let nilaiku = fs.unlinkSync(`./src/${name}.json`)
          let nilaiNew = fs.readdirSync('./src')
          return `success delete todolist ${JSON.stringify(nilaiNew)}`
        } else {
          return `Name file ${name}.json tidak ditemukan`
        }
      }
    }
  } catch (error) {
    return `Failed delete todolist ${error}`
  }
}

exports.seeDataTodo = function (nameFile) {
  let nilai = JSON.parse(fs.readFileSync(`./src/${nameFile}.json`, 'utf8'))
  return `Sucess : ${JSON.stringify(nilai.data)}`
}

exports.addDataTodo = function (
  nameFile,
  judul,
  category = '',
  date,
  note = '',
  template = []
) {
  if (fs.existsSync(`./src/${nameFile}.json`)) {

    let nilai = JSON.parse(fs.readFileSync(`./src/${nameFile}.json`, 'utf8'))
    let arr = nilai.data

    // buat tanggal hari ini
    let dateNow = Date(Date.now()).toString()

    // cek namaFile dan judul harus ada
    if (nameFile === undefined || judul === undefined) {
      return `Failed add todolist ${nameFile}.json`
    }
    // isi date dengan hari sekarang 
    if (date === undefined) {
      date = dateNow
    }

    // cek apakah file tersebut ada datanya atau tidak
    if (arr.length <= 0) {
      let rek = {
        "id": 1,
        "judul": judul,
        "category": category,
        "date": date,
        "note": note,
        "template": template,
      }
      arr.push(rek)
      let nilaia = fs.writeFileSync(`./src/${nameFile}.json`, JSON.stringify(nilai))
      let nilaiNew = JSON.parse(fs.readFileSync(`./src/${nameFile}.json`, 'utf8'))
      return `Sucess add data : ${JSON.stringify(nilaiNew)}`
    } else {
      let id = 1;

      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element.id >= id) {
          id = element.id + 1
        }
      }

      let rek = {
        "id": id,
        "judul": judul,
        "category": category,
        "date": date,
        "note": note,
        "template": template,
      }
      arr.push(rek)
      let nilaia = fs.writeFileSync(`./src/${nameFile}.json`, JSON.stringify(nilai))
      let nilaiNew = JSON.parse(fs.readFileSync(`./src/${nameFile}.json`, 'utf8'))
      return `Sucess add data : ${JSON.stringify(nilaiNew)}`
    }
  } else {
    return `File name ${nameFile}.json Not Found`
  }
}

exports.renameDataTodo = function (
  nameFile,
  id,
  judul,
  category,
  date,
  note,
  template
) {
  if (fs.existsSync(`./src/${nameFile}.json`)) {

    let nilai = JSON.parse(fs.readFileSync(`./src/${nameFile}.json`, 'utf8'))
    let arr = nilai.data
    let status = 0
    // cek namaFile harus ada
    if (nameFile === undefined || id === undefined) {
      return `Failed rename todolist ${nameFile}.json`
    }

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element.id.toString() === id) {
        status = 1
        if (judul) {
          element.judul = judul
        } else {
          element.judul = element.judul
        }

        if (category) {
          element.category = category
        } else {
          element.category = element.category
        }

        if (date) {
          element.date = date
        } else {
          element.date = element.date
        }

        if (note) {
          element.note = note
        } else {
          element.note = element.note
        }

        if (template) {
          element.template = template
        } else {
          element.template = element.template
        }

        arr[i] = element
      }
    }

    if (status === 1) {
      let nilaia = fs.writeFileSync(`./src/${nameFile}.json`, JSON.stringify(nilai))
      let nilaiNew = JSON.parse(fs.readFileSync(`./src/${nameFile}.json`, 'utf8'))
      return `Sucess rename data : ${JSON.stringify(nilaiNew)}`
    } else {
      return `Data name ${nameFile}.json Not Found`
    }
  } else {
    return `File name ${nameFile}.json Not Found`
  }
}


exports.deleteDataTodo = function (
  nameFile,
  id,
) {
  if (fs.existsSync(`./src/${nameFile}.json`)) {
    let status = 0
    let nilai = JSON.parse(fs.readFileSync(`./src/${nameFile}.json`, 'utf8'))
    let arr = nilai.data

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element.id.toString() === id) {
        status = 1
        arr.splice(i, 1)
      }
    }

    if (status === 1) {
      let nilaia = fs.writeFileSync(`./src/${nameFile}.json`, JSON.stringify(nilai))
      let nilaiNew = JSON.parse(fs.readFileSync(`./src/${nameFile}.json`, 'utf8'))
      return `Sucess delete data : ${JSON.stringify(nilaiNew)}`
    } else {
      return `Failed delete data `
    }
  } else {
    return `File name ${nameFile}.json Not Found`
  }
}