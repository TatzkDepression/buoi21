function NhanVien() {
  this.tknv = "";
  this.name = "";
  this.email = "";
  this.password = "";
  this.datepicker = "";
  this.luongCB = "";
  this.chucvu = "";
  this.heSoChucVu = "";
  this.gioLam = "";
  this.tongLuong = "";
  this.loaiNhanVien = "";

  this.xepLoaiNhanVien = function () {
    if (this.gioLam < 160) {
      return (this.loaiNhanVien = "Trung Bình");
    } else if (this.gioLam < 176) {
      return (this.loaiNhanVien = "Khá");
    } else if (this.gioLam < 192) {
      return (this.loaiNhanVien = "Giỏi");
    } else {
      return (this.loaiNhanVien = "Xuất sắc");
    }
  };

  this.tinhLuong = function () {
    return this.luongCB * this.heSoChucVu;
  };
}
