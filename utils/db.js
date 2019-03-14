var data=require('data.js')
const apiBase='https://www.bupt404.cn/'
export const api={
getUserTask:apiBase+'getUserTask?auth=',
getDiscoverTask:apiBase+'getDiscoverTask',
getTaskDetail:apiBase+'getTaskDetail?auth='


}
export function getUserTask(){
  wx.request({
    url:api.getUserTask,
    method:'GET',
    success:function(res){
      console.log(res.data)
    }
  })
}