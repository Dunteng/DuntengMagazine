// pages/index/index.js
import { IndexModel } from "../../models/index"
import { likemodel } from "../../models/like"
import { random } from "../../utils/randomStr"
const indexModel = new IndexModel()

Page({

  data: {
    articleList: [],
    markList: [],
    recommend: {},
    getMore: '',
    magazineId: 0,
    loading: true
  },


  onLoad() {
    this.getData()
  },

  onReachBottom() {
    this.setData({
      //   getMore: random(20)
      getMore: []
    })

  },

  onCatalog() {
    wx.switchTab({
      url: "/pages/catalog/catalog"
    })
  },

  onNav(e) {
    const magazineId = e.detail.index

    this.setMagazineId(magazineId)
    this.resetData()
    this.scrollPageToTop()
    this.getData(magazineId)
  },

  onPullDownRefresh() {
    console.log('shuaxin')
  },

  getData(magazineId) {
    const articleList = indexModel.getArticleList(magazineId)
    const markList = indexModel.getMarkList(magazineId)
    const recommend = indexModel.getRecommendInfo(magazineId)

    Promise.all([articleList, markList, recommend]).then(res => {

      this.setData({
        articleList: res[0],
        markList: res[1],
        recommend: res[2]
      })
      this.hideLoading()
    })
  },

  hideLoading() {
    this.setData({
      loading: false
    })
  },

  resetData() {
    this.setData({
      articleList: [],
      markList: [],
      recommend: {}
    })
  },

  scrollPageToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },

  setMagazineId(magazineId) {
    this.setData({
      magazineId
    })
  }

})