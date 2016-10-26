import assert from 'assert';
import path from 'path';
import fs from 'fs';
import download from '../';
import {randomFilename} from '../lib/utils';

let readFile = f => fs.readFileSync(f).toString();
let getFileSize = f => fs.statSync(f).size;

describe('test download', () => {

  it('copy local file', done => {

    let source = __filename;
    let target = randomFilename();
    let onProgress = false;
    console.log(source, target);
    download(source, target, (size, total) => {
      onProgress = true;
      assert.equal(size, total);
      assert.equal(total, getFileSize(source));
      
    }).then(filename => {
      assert.equal(onProgress, true);
      assert.equal(target, filename);
      assert.equal(readFile(source), readFile(target));
      done();
    }).catch(err => {
      throw err;
    });
  });

});
