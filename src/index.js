import path from 'path';
import mkdirp from 'mkdirp';
import copyFile from './copy';
import downloadFile from './download';
import {randomFilename, isURL, noop} from './utils';


export  default function download(source, target=randomFileName(), progress=noop) {
  return new Promise((resolve, reject) => {
    mkdirp(path.dirname(target), err => {
      if (err) {
        reject(err);
      }
    });
    resolve((isURL(source)? downloadFile : copyFile)(source, target, progress));
  });
}
