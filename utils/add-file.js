// 引入readline模块
let readline = require('readline');
// 创建文件夹
let fs = require('fs');
let options = process.argv;
let fileType = options[2].slice(2);
let aimDir = fileType === 'page' ? 'pages' : 'components';
/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
  fs.access(dist, function(err) {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  function _copy(err, src, dist) {
    if (err) {
      callback(err);
    } else {
      fs.readdir(src, function(err, paths) {
        if (err) {
          callback(err);
        } else {
          paths.forEach(function(path, index) {
            let _src = src + '/' + path;
            let _dist = dist + '/' + path;
            fs.writeFileSync(_dist, fs.readFileSync(_src));
          });
          callback();
        }
      });
    }
  }
}

// 创建readline接口实例
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// question方法qa
rl.question('请输入路由名称: ', function(answer) {
  // 如果是添加页面写入app.json,如果是添加组件,那么不做这个操作
  if (fileType === 'page') {
    let data = fs.readFileSync('./src/app.json', 'utf8');
    let temp = JSON.parse(data);
    temp.pages.push(`pages/${answer}/${answer}`);
    let t = JSON.stringify(temp);
    fs.writeFileSync('./src/app.json', t);
  }
  // 创建文件夹和文件
  fs.mkdir(`./src/${aimDir}/${answer}`, '0777', (e) => {
    e ? console.log(e) : '';
    copyDir(`./utils/${fileType}`, `src/${aimDir}/${answer}`, () => {
      fs.renameSync(`./src/${aimDir}/${answer}/model.js`, `./src/${aimDir}/${answer}/${answer}.js`);
      fs.renameSync(`./src/${aimDir}/${answer}/model.json`, `./src/${aimDir}/${answer}/${answer}.json`);
      fs.renameSync(`./src/${aimDir}/${answer}/model.wxml`, `./src/${aimDir}/${answer}/${answer}.wxml`);
      fs.renameSync(`./src/${aimDir}/${answer}/model.scss`, `./src/${aimDir}/${answer}/${answer}.scss`);
      rl.close();
    });
  });
});

// close事件监听
rl.on('close', function() {
  // 结束程序
  process.exit(0);
});