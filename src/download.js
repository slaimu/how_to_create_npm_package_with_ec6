import fs from 'fs';
import request from 'request';

export default function downLodaFile(url, target, progress) {
  return new Promise((resolve, reject) => {
    let s = fs.createWriteStream(target);
    s.on('error', reject);

    let totalSize = 0;
    let downLoadSize = 0;
    let req = request
        .get({
          url: url,
          encoding: null
        })
        .on('response', res => {
          if (res.statusCode !== 200) {
            return reject(new Error('status: ' + res.statusCode));
          }
          totalSize = Number(res.headers['content-length']) || 0;
          res.on('data', data => {
            downLoadSize += data.length;
            if (progress) {
              progress(downLoadSize, totalSize);
            }
          });
          res.on('end', () => resolve(target));

        })
        .pipe(s);
  });
}
