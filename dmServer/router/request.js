/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/22
  * Time: 11:18
  * request 请求模块
  */

const express = require('express');
const router = express.Router();
const WonderfulBingWallpaper = require('wonderful-bing-wallpaper');

router.get('/bingWallpaper', (req, res, next) => {
  let resultFn = () => {
    return new Promise(resolve => {
      const resolutions = WonderfulBingWallpaper.resolutions;
      const wbw = new WonderfulBingWallpaper({
        size: 8,
        day: 7,
        resolution: resolutions[0],
        host: 'cn.bing.com',
        local: 'zh-cn'
      });

      // wbw.setOptions({ size: 3 });
      // console.log('wallPaper', wbw)
      // console.log('\nwallPaper resolutions', resolutions, resolutions[3])

      // today wallpaper story
      /*wbw.getTodayWallpaperStory().then(todayWallpaperStory => {
        // console.log('got todayWallpaperStory', todayWallpaperStory);
        //resolve(todayWallpaperStory);
      });*/

      // default json
      /* wbw.getWallpapers().then(wallpaperJSON => {
        resultPaper.wallpaperJSON = wallpaperJSON;
        resolve(wbw.humanizeWallpapers(wallpaperJSON, resolutions[0]));
        // console.log(`\ngot wallpaperJSON-1 humanizeWallpapers data :url = ${resolutions[2]}\n`, wbw.humanizeWallpapers(wallpaperJSON))
        // console.log(`\ngot wallpaperJSON-1 humanizeWallpapers data :url = ${resolutions[3]}\n`, wbw.humanizeWallpapers(wallpaperJSON, resolutions[0]))
        // console.log(`\ngot wallpaperJSON-1[0] humanizeWallpapers data :url = ${resolutions[2]}\n`, wbw.humanizeWallpapers(wallpaperJSON[0]))
        // console.log(`\ngot wallpaperJSON-1[0] humanizeWallpapers data :url = ${resolutions[5]}\n`, wbw.humanizeWallpapers(wallpaperJSON[0], resolutions[5]))
      }); */
      // params json
      /* wbw.getWallpapers({ day: 0 }).then(wallpaperJSON => {
        // console.log('got wallpaperJSON-2 data', wallpaperJSON)
        // console.log('got wallpaperJSON-2 humanizeWallpapers data', wbw.humanizeWallpapers(wallpaperJSON))
        // console.log('got wallpaperJSON-2[0] humanizeWallpapers data\n', wbw.humanizeWallpapers(wallpaperJSON[0]))
      }); */
      Promise.all([wbw.getTodayWallpaperStory(), wbw.getWallpapers({ size: 1, day: 0 })]).then(data => {
        // console.log('1231312', data);
        resolve({
          story: data[0],
          wallpaperJSON: wbw.humanizeWallpapers(data[1])[0]
        });
      });
    });
  };
  resultFn().then(data => {
    res.json({ status: 0, data: data, message: 'bingWallpaper' });
  });
});


module.exports = router;
