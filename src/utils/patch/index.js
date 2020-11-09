#! /usr/bin/env node
const path = require("path");
const fs = require("fs-extra");
const walkSync = require("walk-sync");

const getLibrariesPackageJsonPath = () => {
  try {
    const paths = walkSync("src", {
      globs: ["modules/**/libraries/**/**/package.json"],
    });
    return paths;
  } catch (error) {
    return [];
  }
};

const makePackageJsonPatch = () => {
  try {
    const allPacakgeJsonPaths = getLibrariesPackageJsonPath();
    allPacakgeJsonPaths.map((allPacakgeJsonPaths) => {
      const packageJsonPath = path.join("src", allPacakgeJsonPaths);
      const packagejsonFileRead = fs.readFileSync(packageJsonPath, "utf8");
      let packagejsonFileJSON = JSON.parse(packagejsonFileRead);
      packagejsonFileJSON.name = undefined;
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packagejsonFileJSON, null, 4)
      );
    });
  } catch (error) {}
};

makePackageJsonPatch();

//
// const makeIndexFileForAllImages=()=>{
//   try {
//     const paths = walkSync("src/modules/ft_rn_home_module/src/screens/ft_rn_home_expo/screen/images/flags/", {
//       globs: ["*.png"],
//     });
//     let fileContent="const flags={";
//     paths.map(pathItem=>{
//       const flagName=pathItem.replace("@2x","").replace(".png","");
//       fileContent+=`
//         ${flagName}:require("../images/flags/${flagName}.png"),
//       `
//     })
//     fileContent+="}";
//     fileContent+=`
    
//     export default flags;`;
//     fs.writeFileSync("/Users/nomanismaeel/Documents/storytesting/FastTractRN/independentScreens/template/ft_rn_template/src/modules/ft_rn_home_module/src/screens/ft_rn_home_expo/screen/defaults/flag.js",fileContent)
//     // return paths;
//   } catch (error) {
//     return [];
//   }
// }

// makeIndexFileForAllImages();