import { readFileSync } from "node:fs";
import { PDFDocument } from "pdf-lib";

const buf = readFileSync("./output/The 1-Hour Apartment Reset.pdf");
const doc = await PDFDocument.load(buf);
try {
  const form = doc.getForm();
  const fields = form.getFields();
  console.log(`AcroForm fields found: ${fields.length}`);
  fields.forEach(f => console.log(` - "${f.getName()}" type: ${f.constructor.name}`));
} catch (e) {
  console.log(`No AcroForm found: ${e.message}`);
}