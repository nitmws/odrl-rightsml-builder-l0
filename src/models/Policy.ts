import * as fs from "fs";
import * as odrlCore from "./odrlCoreVocabulary";
import * as rdf from "./rdfVocabulary";

import {isNullOrUndefined} from "util";

/**
 * Policy Class as defined by the ODRL IM
 */
export class Policy {
    N3 : any = require('n3'); // replacement of import N3
    policyN3store : any;
    uid : string;

    constructor(uid: string, policytype: string){
        this.policyN3store =  this.N3.Store();
        this.uid = uid;
        this.policyN3store.addTriple(uid, rdf.type, policytype );
    }

    /**
     * Write the whole graph of the Policy to a text file - the Media Type can be set
     * @param {string} outfilePath
     * @param {string} mediatype: if not set: Turtle, other supported type: N-Triples (N3 module is unclear about that)
     */
    writeToFile(outfilePath : string, mediatype: string) {
        let allTriples = this.policyN3store.getTriples(null, null, null, null);
        let writer : any;
        if (isNullOrUndefined(mediatype)){
            writer = this.N3.Writer({});
        }
        else {
            writer = this.N3.Writer({ format: mediatype});
        }
        writer.addTriples(allTriples);
        writer.end((err: any, outstr: string) => {
            fs.writeFileSync(outfilePath, outstr, {encoding:"utf-8"});
        });
    }

    /**
     * Adds an array of ODRL Profile ids
     * @param {string[]} profiles
     */
    addProfiles(profiles: string[]){
        for (let profile of profiles){
            this.policyN3store.addTriple(this.uid, odrlCore.profile, profile);
        }
    }

    /**
     * Adds a Permission (more than 1 in total may be added)
     * @param {string} permissionUid
     */
    addPermission(permissionUid: string) {
        this.policyN3store.addTriple(this.uid, odrlCore.permission, permissionUid);
    }

    /**
     * Adds a Prohibition (more than 1 in total may be added)
     * @param {string} prohibitionUid
     */
    addProhibition(prohibitionUid: string) {
        this.policyN3store.addTriple(this.uid, odrlCore.prohibition, prohibitionUid);

    }

    /**
     * Adds an Obligation (more than 1 in total may be added)
     * @param {string} obligationUid
     */
    addObligation(obligationUid: string) {
        this.policyN3store.addTriple(this.uid, odrlCore.obligation, obligationUid);
    }
}
