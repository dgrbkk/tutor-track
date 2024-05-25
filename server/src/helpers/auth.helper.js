import bcrypt from 'bcrypt';
import multer from 'multer';
import * as fs from 'fs/promises';
import * as path from 'path';


export const hashPassword = async (password) => {
  const passwordRaw = password;
  const salt = await bcrypt.genSalt(15);
  return await bcrypt.hash(passwordRaw, salt);
};

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage
});


//не питай
export const deleteAllUnusedAvatars = async (req, res) => {
  try {
    const files = await fs.readdir('uploads');

    files.map(file =>
      fs.unlink(path.join('uploads', file)),
    );

    res.json({ data: 'dddddd'});
  } catch (err) {
    console.log(err);
  }
};

