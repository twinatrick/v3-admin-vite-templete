const fs = require("fs")
const path = require("path")

const coverageFile = path.join(__dirname, "../coverage/coverage-final.json")
const data = JSON.parse(fs.readFileSync(coverageFile, "utf-8"))

let totalStatements = 0
let totalStatementsHit = 0
let totalFunctions = 0
let totalFunctionsHit = 0
let totalBranches = 0
let totalBranchesHit = 0

console.log("\n========================================")
console.log("測試覆蓋率報告")
console.log("========================================\n")

for (const [file, info] of Object.entries(data)) {
  const fileName = file.split("\\").slice(-3).join("/")

  const statements = Object.keys(info.s).length
  const statementsHit = Object.values(info.s).filter((x) => x > 0).length
  const functions = Object.keys(info.f).length
  const functionsHit = Object.values(info.f).filter((x) => x > 0).length
  // const branches = Object.keys(info.b).length;
  const branchesHit = Object.values(info.b)
    .flat()
    .filter((x) => x > 0).length
  const branchesDenominator = Object.values(info.b).flat().length

  totalStatements += statements
  totalStatementsHit += statementsHit
  totalFunctions += functions
  totalFunctionsHit += functionsHit
  totalBranches += branchesDenominator
  totalBranchesHit += branchesHit

  console.log(`📄 ${fileName}:`)
  console.log(`  語句覆蓋率: ${statementsHit}/${statements} (${((statementsHit / statements) * 100).toFixed(2)}%)`)
  console.log(`  函數覆蓋率: ${functionsHit}/${functions} (${((functionsHit / functions) * 100).toFixed(2)}%)`)
  console.log(
    `  分支覆蓋率: ${branchesHit}/${branchesDenominator} (${((branchesHit / branchesDenominator) * 100).toFixed(2)}%)`
  )
  console.log("")
}

console.log("========================================")
console.log("總覆蓋率")
console.log("========================================\n")
console.log(
  `📊 語句覆蓋率: ${totalStatementsHit}/${totalStatements} (${((totalStatementsHit / totalStatements) * 100).toFixed(
    2
  )}%)`
)
console.log(
  `📊 函數覆蓋率: ${totalFunctionsHit}/${totalFunctions} (${((totalFunctionsHit / totalFunctions) * 100).toFixed(2)}%)`
)
console.log(
  `📊 分支覆蓋率: ${totalBranchesHit}/${totalBranches} (${((totalBranchesHit / totalBranches) * 100).toFixed(2)}%)`
)
console.log("\n========================================\n")
