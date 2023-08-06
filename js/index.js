var arrNhanVien = [];

function reset() {
  document.querySelector("#nhanVienFormReset").reset();
}
/**
 * nhận vào 1 object tên name đã được tạo rồi lấy các value cần thiết
 * @param {*} name
 * @returns
 */
function getValue(name) {
  name.tknv = document.querySelector("#tknv").value;
  name.name = document.querySelector("#name").value;
  name.email = document.querySelector("#email").value;
  name.password = document.querySelector("#password").value;
  name.datepicker = document.querySelector("#datepicker").value;
  name.luongCB = document.querySelector("#luongCB").value;

  var slChucVu = document.querySelector("#chucvu");
  name.chucvu = slChucVu[slChucVu.selectedIndex].innerHTML;
  name.heSoChucVu = slChucVu.value;

  name.gioLam = document.querySelector("#gioLam").value;
  name.tongLuong = name.tinhLuong();
  name.loaiNhanVien = name.xepLoaiNhanVien();
  return name;
}

/**
 * Hàm nhận vào tham số là arrNV [{...},{...},{...}]
 * @param {*} arrNV là mảng chứa các object nhanVien : arrNV = [{NhanVien:1,...},{NhanVien:2,...},...]
 */
function renderTableNhanVien(arrNV) {
  var outputHTML = "";
  for (var index = 0; index < arrNV.length; index++) {
    var nhanVien = arrNV[index];
    outputHTML += `
    <tr>
    <td>${nhanVien.tknv}</td>
    <td>${nhanVien.name}</td>
    <td>${nhanVien.email}</td>
    <td>${nhanVien.datepicker}</td>
    <td>${nhanVien.chucvu}</td>
    <td>${nhanVien.tongLuong.toLocaleString()}</td>
    <td>${nhanVien.loaiNhanVien}</td>
    <td>
    <button class="btn btn-danger" onclick="xoaNhanVien('${index}')">Xóa</button>
    <button class="btn btn-primary mx-2"  data-toggle="modal" data-target="#myModal" onclick="suaNhanVien('${index}')">Sửa</button>
    </td>
    </tr>
    `;
  }
  document.querySelector("#tableDanhSach").innerHTML = outputHTML;
}

document.querySelector("#btnThemNV").onclick = function () {
  var nhanVienNew = new NhanVien();
  getValue(nhanVienNew);
  
  // thêm nhân viên vào mảng
  arrNhanVien.push(nhanVienNew);
  renderTableNhanVien(arrNhanVien);
  //Lưu mảng nhân viên vào storage
  saveStorageArrNhanVien();
};

function xoaNhanVien(indexDel) {
  arrNhanVien.splice(indexDel, 1);
  renderTableNhanVien(arrNhanVien);
  saveStorageArrNhanVien();
}
function suaNhanVien(indexEdit) {
  var nvEdit = arrNhanVien[indexEdit];
  document.querySelector("#tknv").value = nvEdit.tknv;
  document.querySelector("#name").value = nvEdit.name;
  document.querySelector("#email").value = nvEdit.email;
  document.querySelector("#password").value = nvEdit.password;
  document.querySelector("#datepicker").value = nvEdit.datepicker;
  document.querySelector("#luongCB").value = nvEdit.luongCB;
  document.querySelector("#chucvu").value = nvEdit.heSoChucVu;
  document.querySelector("#gioLam").value = nvEdit.gioLam;
}
//Phương thức lưu vào application storage
function saveStorageArrNhanVien() {
  var strNhanVien = JSON.stringify(arrNhanVien);
  localStorage.setItem("arrNhanVien", strNhanVien);
}
//Phương thức lấy dữ liệu từ localstorage
function getStorageJSON(name) {
  if (localStorage.getItem(name)) {
    var str = localStorage.getItem(name);
    var jsonValue = JSON.parse(str);

    return jsonValue;
  }
  return null;
}

document.querySelector("#btnCapNhat").onclick = function () {
  var nvUpdate = new NhanVien();
  getValue(nvUpdate);
  var indexUpdate = -1;
  for (var index = 0; index < arrNhanVien.length; index++) {
    if (arrNhanVien[index].tknv === nvUpdate.tknv) {
      indexUpdate = index;
      break;
    }
  }
  if (indexUpdate !== -1) {
    arrNhanVien[indexUpdate].name = nvUpdate.name;
    arrNhanVien[indexUpdate].email = nvUpdate.email;
    arrNhanVien[indexUpdate].password = nvUpdate.password;
    arrNhanVien[indexUpdate].datepicker = nvUpdate.datepicker;
    arrNhanVien[indexUpdate].luongCB = nvUpdate.luongCB;
    arrNhanVien[indexUpdate].chucvu = nvUpdate.chucvu;
    arrNhanVien[indexUpdate].heSoChucVu = nvUpdate.heSoChucVu;
    arrNhanVien[indexUpdate].gioLam = nvUpdate.gioLam;
    arrNhanVien[indexUpdate].tongLuong = nvUpdate.tongLuong;
    arrNhanVien[indexUpdate].loaiNhanVien = nvUpdate.loaiNhanVien;
  } else {
    return;
  }
  renderTableNhanVien(arrNhanVien);
  saveStorageArrNhanVien();
};
window.onload = function () {
  if (getStorageJSON("arrNhanVien")) {
    arrNhanVien = getStorageJSON("arrNhanVien");
    renderTableNhanVien(arrNhanVien);
  }
};
// tìm kiếm
document.querySelector("#searchName").onkeyup = function () {
  var tuKhoa = document.querySelector("#searchName").value;
  var result = [];
  if (tuKhoa == "") {
    renderTableNhanVien(arrNhanVien);
    return;
  }
  for (var index = 0; index < arrNhanVien.length; index++) {
    tuKhoa = stringToSlug(tuKhoa);
    xlNhanVien = stringToSlug(arrNhanVien[index].loaiNhanVien);
    if (xlNhanVien.search(tuKhoa) !== -1) {
      result.push(arrNhanVien[index]);
    }
  }
  renderTableNhanVien(result);
};
