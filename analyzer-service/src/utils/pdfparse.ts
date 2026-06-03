import { PdfReader } from "pdfreader";

export const parsePDF = async (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const rows: string[] = [];
    new PdfReader().parseFileItems(filePath, (err, item) => {
      if (!item) {
        return resolve(rows.join(" "));
      } else if (item?.text) {
        rows.push(item.text);
      } else if (err) {
        console.error(err);
        return reject(err);
      }
    });
  });
};
