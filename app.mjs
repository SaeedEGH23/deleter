import dotenv from "dotenv";
import fs from "fs";
import folderSize from "get-folder-size";

dotenv.config();

const dir = process.env.FOLRED_PATH || "Config .env direction";
const checkTime = process.env.TIME_CHECKING || 1;
const maxSize = process.env.MAX_FILE_SIZE * Math.pow(10, 9) || 1;

async function fileS() {
  let size = await folderSize.loose(dir);
  return size;
}

setInterval(async () => {
  let size = await fileS();
  console.log(size);
  if (size >= maxSize) {
    try {
      fs.rm(dir, { recursive: true }, () => {
        console.log(`${dir} folder deleted !`);
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log(`size is lower than your max size. ${maxSize}`);
  }
}, checkTime * 6000);
