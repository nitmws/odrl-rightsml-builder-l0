"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const odrlCore = require("./odrlCoreVocabulary");
const rdf = require("./rdfVocabulary");
const util_1 = require("util");
/**
 * Policy Class as defined by the ODRL IM
 */
class Policy {
    constructor(uid, policytype) {
        this.N3 = require('n3'); // replacement of import N3
        this.policyN3store = this.N3.Store();
        this.uid = uid;
        this.policyN3store.addTriple(uid, rdf.type, policytype);
    }
    /**
     * Write the whole graph of the Policy to a text file - the Media Type can be set
     * @param {string} outfilePath
     * @param {string} mediatype: if not set: Turtle, other supported type: N-Triples (N3 module is unclear about that)
     */
    writeToFile(outfilePath, mediatype) {
        let allTriples = this.policyN3store.getTriples(null, null, null, null);
        let writer;
        if (util_1.isNullOrUndefined(mediatype)) {
            writer = this.N3.Writer({});
        }
        else {
            writer = this.N3.Writer({ format: mediatype });
        }
        writer.addTriples(allTriples);
        writer.end((err, outstr) => {
            fs.writeFileSync(outfilePath, outstr, { encoding: "utf-8" });
        });
    }
    /**
     * Adds an array of ODRL Profile ids
     * @param {string[]} profiles
     */
    addProfiles(profiles) {
        for (let profile of profiles) {
            this.policyN3store.addTriple(this.uid, odrlCore.profile, profile);
        }
    }
    /**
     * Adds a Permission (more than 1 in total may be added)
     * @param {string} permissionUid
     */
    addPermission(permissionUid) {
        this.policyN3store.addTriple(this.uid, odrlCore.permission, permissionUid);
    }
    /**
     * Adds a Prohibition (more than 1 in total may be added)
     * @param {string} prohibitionUid
     */
    addProhibition(prohibitionUid) {
        this.policyN3store.addTriple(this.uid, odrlCore.prohibition, prohibitionUid);
    }
    /**
     * Adds an Obligation (more than 1 in total may be added)
     * @param {string} obligationUid
     */
    addObligation(obligationUid) {
        this.policyN3store.addTriple(this.uid, odrlCore.obligation, obligationUid);
    }
}
exports.Policy = Policy;
//# sourceMappingURL=Policy.js.map