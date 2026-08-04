import { readFileSync, readdirSync } from "fs";

function check(site, pendingDir, blogDir) {
  console.log(`\n=== ${site} ===`);
  const pendingFiles = readdirSync(pendingDir).filter(f => f.endsWith(".md") && f !== "README.md" && f !== "check-sizes.mjs" && f !== "check-posts.mjs");
  const publishedFiles = readdirSync(blogDir).map(f => f.toLowerCase());
  
  for (const f of pendingFiles) {
    const c = readFileSync(pendingDir + "/" + f, "utf8");
    const lines = c.split("\n").length;
    const isStub = c.startsWith("---") && lines <= 15;
    // Strip leading "NN-" prefix for filename comparison
    const normalized = f.replace(/^\d+-/, "").toLowerCase();
    const alreadyPublished = publishedFiles.includes(normalized) || publishedFiles.includes(f.replace(/\.md$/, "").replace(/^\d+-/, "").toLowerCase());
    
    console.log(`  ${isStub ? "STUB" : "WRITTEN"} : ${f} (${lines} lines) ${alreadyPublished ? "✅ PUBLISHED" : "❌ NOT PUBLISHED"}`);
  }
}

check("UK", "blogs/uk-subn-1/BLOGS TO POST", "blogs/uk-subn-1/britishhomeinterior/src/content/blog");
check("CANADA", "blogs/canada-subn-1/BLOGS TO POST", "blogs/canada-subn-1/smallspacehome/src/content/blog");