import * as fs from "fs";
let jsonfile = require('jsonfile');
let jsonld = require('jsonld');

/**
 * Transform a text file of NQuads to variants of JSON-LD
 * @param {string} basename: basename of the NQuads and JSON-LD files for in- and output
 */
export function transformNquadsToJsonld(basename: string) {
    if (basename === undefined) {
        return
    }

    let nquadsstr = "";
    try {
        nquadsstr = fs.readFileSync('./testdataout/' + basename + '=nquads.txt', 'utf8');
    } catch(e) {
        console.log('Error:', e.stack);
        return;
    }
    jsonld.fromRDF(nquadsstr, {}, (err: any, doc: any) => {
        if (err) {
            console.log('Error raised by jsonld.fromRDF: ' + err.message)
        }
        if (doc) {
            jsonfile.writeFileSync('./testdataout/' + basename + '=expanded.json', doc, {spaces: 2})
            let context: any = jsonfile.readFileSync('./src/services/ODRL22.jsonld');
            jsonld.compact(doc, context, {skipExpansion : true},  function(err: any, compacted: any) {
                compacted['@context'] = "http://www.w3.org/ns/odrl.jsonld" // use the link of the ODRL @context resource
                jsonfile.writeFileSync('./testdataout/' + basename + '=compact.json', compacted, {spaces: 2})
                if (compacted['@graph'] !== undefined) {
                    let nested = nest(compacted)
                    jsonfile.writeFileSync('./testdataout/' + basename + '=compactnested.json', nested, {spaces: 2})
                }
            });
        }
        else {
            console.log('Sample ' + basename + ' not transformed, no jsonld output' )
        }
    })
}

function nest(compactjson: any){
    let rootjson: any;
    // add root node
    for (let i = 0; i < compactjson['@graph'].length; i++){
        if (!compactjson['@graph'][i].uid.startsWith('_:')){
            rootjson = compactjson['@graph'][i];
            break
        }
    }
    rootjson['@context'] = compactjson['@context']
    let nestedjson = addBlanknode(rootjson, compactjson);
    return nestedjson
}

function addBlanknode(testnode: any, cjson: any){
    for (let prop in testnode) {
        let value = testnode[prop]
        if (typeof value === 'string') {
            if (value.startsWith('_:')) {
                if (prop !== 'uid') {
                    let bnode = getBlanknode(value, cjson)
                    let bnode1 = addBlanknode(bnode, cjson)
                    testnode[prop] = bnode1
                }
                else {
                    delete testnode[prop] // deletes the auto-generated id of a blank node
                }
            }
        }
    }
    return testnode
}

function getBlanknode(blanknodeid: string, cjson: any){
    let bnode = undefined
    for (let i = 0; i < cjson['@graph'].length; i++){
        if (cjson['@graph'][i].uid === blanknodeid){
            bnode = cjson['@graph'][i]
            break
        }
    }
    return bnode
}

