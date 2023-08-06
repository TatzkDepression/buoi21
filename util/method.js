var validation = {
  kiemTraRong: function (value, name, content) {
    if (value.trim() === "") {
      // document.querySelector(`[data-error-required=${name}]`).innerHTML =
      //   name + " không được bỏ trống !";
      document.querySelector(`#${name}`).style.display = "block";
      document.querySelector(`#${name}`).innerHTML =
        content + " không được bỏ trống";
      return false;
    }
    // document.querySelector(`[data-error-required=${name}]`).innerHTML = "";
    document.querySelector(`#${name}`).style.display = "none";
    document.querySelector(`#${name}`).innerHTML = "";
    return true;
  },
  kiemTraTatCaKyTu: function (value, name, content) {
    var regexLetter = /^[A-Z a-z]+$/;
    if (regexLetter.test(value)) {
      // document.querySelector(`[data-error-regexLetter=${name}]`).innerHTML = "";
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    // document.querySelector(`[data-error-regexLetter=${name}]`).innerHTML =
    // name + " tất cả phải ký tự";
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(`#${name}`).innerHTML =
      content + "không được bỏ trống và tất cả phải là chữ";

    return false;
  },
  kiemTraEmail: function (value, name, content) {
    var regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regexEmail.test(value)) {
      // document.querySelector(`[data-error-regexEmail=${name}]`).innerHTML = "";
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    // document.querySelector(`[data-error-regexEmail=${name}]`).innerHTML =
    // name + " tất cả phải ký tự";
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(`#${name}`).innerHTML =
      content + " không được bỏ trống và đúng định dạng";
    return false;
  },
  kiemTraNumber: function (value, name, content, minValue, maxValue) {
    value = Number(value);
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value) && value >= minValue && value <= maxValue) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(
      `#${name}`
    ).innerHTML = `${content} không được để trống, tất cả phải là số và có giá trị từ ${minValue.toLocaleString()} - ${maxValue.toLocaleString()} !`;
    return false;
  },
  kiemTraSo: function (value, name, content) {
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value)) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    // document.querySelector(`[data-error-regexNumber=${name}]`).innerHTML =
    // name + " tất cả phải là số";
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(`#${name}`).innerHTML =
      content + " tối đa 4-6 ký số và không được bỏ trống";

    return false;
  },
  kiemTraDoDai: function (value, name, minLength, maxLength) {
    var length = value.length;
    if (length < minLength || length > maxLength) {
      document.querySelector(
        `[data-error-min-max-length=${name}]`
      ).innerHTML = `${name} có giá trị từ ${minLength} - ${maxLength}`;
      return false;
    }
    document.querySelector(
      `[data-error-min-max-length=${name}]`
    ).innerHTML = ``;
    return true;
  },
  kiemTraGiaTri: function (value, name, minValue, maxValue) {
    if (Number(value) < minValue || Number(value) > maxValue) {
      document.querySelector(
        `[data-error-min-max-value=${name}]`
      ).innerHTML = `${name} giá trị từ ${minValue} - ${maxValue}  !`;
      return false;
    }
    document.querySelector(`[data-error-min-max-value=${name}]`).innerHTML = ``;
    return true;
  },
  kiemTraPass: function (value, name) {
    var regexPassword =
      /(?=.*\d)(?=.*[A-Z])(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{6,10}/; //(?=.*[a-z])
    if (regexPassword.test(value)) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    } else {
      document.querySelector(`#${name}`).style.display = "block";
      document.querySelector(`#${name}`).innerHTML =
        "Mật khẩu không được bỏ trống, phải chứa ít nhất 1 số, 1 chữ hoa, 1 ký tự đặc biệt và độ dài từ 6-10 ký tự !";
      return false;
    }
  },

  kiemTraNgay: function (value, name, content) {
    var regexDate = /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (regexDate.test(value)) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(
      `#${name}`
    ).innerHTML = `${content} không được để trống, và đúng định dạng mm/dd/yyyy`;
    return false;
  },
};

// validation.kiemTraRong()

function stringToSlug(title) {
  //Đổi chữ hoa thành chữ thường
  slug = title.toLowerCase();
  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");

  return slug;
}
