const util = require('util');
const exec = util.promisify(require('child_process').exec);
const Json2csvParser = require('json2csv').Parser;

const programs = ["cbench-automotive-bitcount","cbench-automotive-qsort1","cbench-automotive-susan","cbench-bzip2",
"cbench-consumer-jpeg-c","cbench-consumer-jpeg-d","cbench-consumer-lame","cbench-consumer-mad","cbench-consumer-tiff2bw",
"cbench-consumer-tiff2dither","cbench-consumer-tiff2median","cbench-consumer-tiff2rgba","cbench-network-dijkstra",
"cbench-network-patricia","cbench-office-stringsearch2","cbench-security-blowfish","cbench-security-pgp",
"cbench-security-rijndael","cbench-security-sha","cbench-telecom-adpcm-c","cbench-telecom-adpcm-d","cbench-telecom-crc32","cbench-telecom-gsm"]
 
const static_features_size = 65;
const maxBuffer = 1024000

async function load_static_features_from_program(program) {
  const { stdout } = await exec(`ck load program.static.features:${program}`, { maxBuffer : maxBuffer});
  const stdout_json = JSON.parse(stdout);
  const static_features_on_function_level = stdout_json.dict.features.program_static_milepost_features;
  let static_program_features = Array.apply(null, {length: static_features_size}).map(Number.prototype.valueOf, 0)
  for (let property of Object.getOwnPropertyNames(static_features_on_function_level)) {
     let function_features = static_features_on_function_level[property];
     static_program_features = static_program_features.map((e, index) => e + (function_features[index + 1] || 0))
  }
  return static_program_features;
}

fields = () => {
  let features_fields = Array.apply(null, {length: 65}).map(Number.call, Number);
  return ['name'].concat(features_fields.map((e, index) => `ft${Number(index + 1).toString().padStart(2, '0')}`))
}

function get_programs() {
    return process.env.programs ? process.env.programs.split(',') : programs;
}

async function run(){
   let features_from_all_programs_json = [];
   for (let program of get_programs()) {
      let features = await load_static_features_from_program(program);
      let featuresJson = { name : program};
      features.forEach((e, index) => featuresJson[`ft${Number(index + 1).toString().padStart(2, '0')}`] = e)
      features_from_all_programs_json.push(featuresJson)
   }

    const json_csv_parser = new Json2csvParser({ fields : fields(), delimiter : ';'});
    const csv = json_csv_parser.parse(features_from_all_programs_json);
    console.log(csv);
}

run();