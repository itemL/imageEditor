
class ImageUpLoader{

  constructor(pageContext){

    this.sourceType= ['camera', 'album'];
    this.sizeType= ['compressed'];
    this.maxCount= 1;
    this.uploadedImagesPaths= [];
    this.uploadParams= {
      url: '',
        name: 'file',
          formData: {}
    }
    
    this.page = pageContext;
    this.page.chooseImage = this._chooseImage.bind(this);
    this.page.previewImage = this._previewImage.bind(this);
    this.page.deleteImage = this._deleteImage.bind(this);
  }

  _chooseImage() {
    var _this = this;

    this.chooseFileImage(this.sourceType, this.sizeType, this.maxCount).then(res => {
      _this._chooseImageCb(res);
    }, e => {
      console.log(e);
    });
  }

  _previewImage(e) {
    let current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.uploadedImagesPaths
    });
  }

  _deleteImage(e){
    let current = e.target.dataset.imagesrc;
    var i = 0;
    for (; i < this.uploadedImagesPaths.length; ++i){
      var item = this.uploadedImagesPaths[i];
      if (item === current){
        this.uploadedImagesPaths.splice(i,1);
        this.page.setData({
          uploadedImagesPaths: this.uploadedImagesPaths
        });
        break;
      }
    }
  }

  _chooseImageCb(res) {
    var _this = this;
    let filePath = res.tempFilePaths[0];
    _this._addToUploadedPaths(res, filePath);
  }


  _addToUploadedPaths(resp, filePath) {
    if (this._isUploadSuccess(resp)) {
      this.uploadedImagesPaths.push(filePath);
      this.page.setData({
        uploadedImagesPaths: this.uploadedImagesPaths
      });
    }
    else {
      console.error(resp);
    }
  }

  _isUploadSuccess(resp) {
    return true;
  }


chooseFileImage(sourceType = null, sizeType = null, count = null) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({ sourceType: sourceType, sizeType: sizeType, count: count, success: resolve, fail: reject });
  });
}

}

module.exports = ImageUpLoader;