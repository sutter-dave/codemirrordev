const fs = require("fs"), {join} = require("path")

//========================================
// I'm updating this by adding a repository base for each repo, so I can 
// draw from my own repos.
// Each entry should be either (1) an array with [package short name, repo, package name]
// of (2) the package short name, with the other values completed by codemirror defaults (see below)
//========================================
const coreRepos = [
  "state",
  "view",
  "language",
  "commands",
  "search",
  "autocomplete",
  "lint",
  "collab",
  "language-data",
  ["codemirror","codemirror/basic-setup","codemirror"],
]
const nonCoreRepos = [
  "lang-javascript",
  "lang-java",
  "lang-json",
  "lang-cpp",
  "lang-php",
  "lang-python",
  "lang-css",
  "lang-html",
  "lang-sql",
  "lang-rust",
  "lang-xml",
  ["lang-markdown","codemirror/lang-markdown","@codemirror/lang-markdown"],
  "lang-lezer",
  "lang-wast",
  "legacy-modes",
  "theme-one-dark",
  "merge",
  ["cmwidgetdev","sutter-dave/cmwidgetdev","@sutter-dave/cmwidgetdev"],
  ["lezer-markdown","sutter-dave/cm-lezer-markdown","@lezer/markdown"]
]

const allRepos = coreRepos.concat(nonCoreRepos)

exports.core = coreRepos.map(entry => Array.isArray(entry) ? entry[0] : entry)
exports.nonCore = nonCoreRepos.map(entry => Array.isArray(entry) ? entry[0] : entry)
exports.all = allRepos.map(entry => Array.isArray(entry) ? entry[0] : entry)

class Pkg {
  constructor(packageEntry) {

    console.log(packageEntry)

    let name,repo,fullName
    if(Array.isArray(packageEntry)) {
      name = packageEntry[0]
      repo = packageEntry[1]
      fullName = packageEntry[2]
    }
    else {
      name = packageEntry
      repo = "codemirror/" + name
      fullName = "@codemirror/" + name
    }

    this.name = name
    this.repo = repo
    this.fullName = fullName

    this.dir = join(__dirname, "..", name)
    this.main = null

    if (name != "legacy-modes" && fs.existsSync(this.dir)) {
      let files = fs.readdirSync(join(this.dir, "src")).filter(f => /^[^.]+\.ts$/.test(f))
      let main = files.length == 1 ? files[0] : files.includes("index.ts") ? "index.ts"
          : files.includes(name.replace(/^(theme-|lang-)/, "") + ".ts") ? name.replace(/^(theme-|lang-)/, "") + ".ts" : null
      if (!main) throw new Error("Couldn't find a main script for " + name)
      this.main = join(this.dir, "src", main)
    }
  }
}
exports.Pkg = Pkg

exports.loadPackages = function loadPackages() {
  let packages = allRepos.map(packageEntry => new Pkg(packageEntry))
  let packageNames = Object.create(null)
  for (let p of packages) packageNames[p.name] = p
  return {packages, packageNames, buildPackages: packages.filter(p => p.main)}
}
