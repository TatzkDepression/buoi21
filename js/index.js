var arrNhanVien = [];
// mảng quản lý tất cả thông tin nhân viên trên giao diện index.html
document.querySelector("#btnThem").onclick = function () {
  document.querySelector("#password").value = "";
  document.querySelector("#tknv").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#luongCB").value = "";
  document.querySelector("#gioLam").value = "";
  document.querySelector("#chucvu").value = "";
  document.querySelector("#tbMatKhau").style.display = "none";
  document.querySelector("#tbTKNV").style.display = "none";
  document.querySelector("#tbTen").style.display = "none";
  document.querySelector("#tbEmail").style.display = "none";
  document.querySelector("#tbNgay").style.display = "none";
  document.querySelector("#tbLuongCB").style.display = "none";
  document.querySelector("#tbChucVu").style.display = "none";
  document.querySelector("#tbGiolam").style.display = "none";
};
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
  name.chucVu = slChucVu[slChucVu.selectedIndex].innerHTML;
  name.heSoChucVu = slChucVu.value;

  name.gioLam = document.querySelector("#gioLam").value;
  name.tongLuong = name.tinhLuong();
  name.loaiNhanVien = name.xepLoaiNhanVien();
  return name;
}

document.querySelector("#btnThemNV").onclick = function () {
  var nhanVienNew = new NhanVien();
  getValue(nhanVienNew);
  nhanVienNew.tknv = document.querySelector("#tknv").value;
  nhanVienNew.name = document.querySelector("#name").value;
  nhanVienNew.email = document.querySelector("#email").value;
  nhanVienNew.password = document.querySelector("#password").value;
  nhanVienNew.datepicker = document.querySelector("#datepicker").value;
  nhanVienNew.luongCB = document.querySelector("#luongCB").value;
  nhanVienNew.chucvu = document.querySelector("#chucvu").value;
  nhanVienNew.gioLam = document.querySelector("#gioLam").value;
  // thêm nhân viên vào mảng
  arrNhanVien.push(nhanVienNew);
  renderTableNhanVien(arrNhanVien);
  //Lưu mảng nhân viên vào storage
  saveStorageArrNhanVien();
};

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
    <td>${nhanVien.tongLuong}</td>
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
  document.querySelector("#chucvu").value = nvEdit.chucvu;
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
  nvUpdate.tknv = document.querySelector("#tknv").value;
  nvUpdate.name = document.querySelector("#name").value;
  nvUpdate.email = document.querySelector("#email").value;
  nvUpdate.password = document.querySelector("#password").value;
  nvUpdate.datepicker = document.querySelector("#datepicker").value;
  nvUpdate.luongCB = document.querySelector("#luongCB").value;
  nvUpdate.chucvu = document.querySelector("#chucvu").value;
  nvUpdate.gioLam = document.querySelector("#gioLam").value;
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
    arrNhanVien[indexUpdate].gioLam = nvUpdate.gioLam;
    renderTableNhanVien(arrNhanVien);
    saveStorageArrNhanVien();
  }
};
window.onload = function () {
  if (getStorageJSON("arrNhanVien")) {
    arrNhanVien = getStorageJSON("arrNhanVien");
    renderTableNhanVien(arrNhanVien);
  }
};
// tìm kiếm
// document.querySelector("#searchName").oninput = function () {
//   var tuKhoa = document.querySelector("#searchName").value;
//   if (tuKhoa === "") {
//     renderTableNhanVien(arrNhanVien);
//     return;
//   }
//   var arrResult = [];
// };
