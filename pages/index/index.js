//index.js
//获取应用实例
const app = getApp()
const ImageUploader = require('./imageSelectedLoad.js');
Page({
  data: {
   
  },
 
  onLoad: function () {
    this.imageLoader = new ImageUploader(this);
  },

  _chooseImage: function(res){
    console.warn("32312312");
  }

})
