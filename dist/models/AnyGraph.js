"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc = require("./BuilderComm");
const odrlCore = require("./odrlCoreVocabulary");
const rdf = require("./rdfVocabulary");
/**
 * The generic class of the ODRL-RightsML Builder.
 */
class AnyGraph {
    constructor(uid) {
        this.uid = uid;
        this.props = {};
        this.actionRefinements = [];
        this.constructionStatus = { status: bc.stOK };
    }
    /**
     * Adds a value of any property of type array with a specific name
     * @param {string} propname
     * @param {string} propvalue
     * @returns {BResponse}
     */
    addPropValue(propname, propvalue) {
        let bres = { status: 0 };
        if (this.props[propname] === undefined) {
            this.props[propname] = [];
        }
        this.props[propname].push(propvalue);
        bres.status = bc.st1200;
        return bres;
    }
    /**
     * Sets a value of any property with a specific name
     * @param {string} propname
     * @param {string} propvalue
     * @returns {BResponse}
     */
    setPropValue(propname, propvalue) {
        let bres = { status: 0 };
        this.props[propname] = propvalue;
        bres.status = bc.st1200;
        return bres;
    }
    /** Adds a refinement of the action of the graph
     *
     * @param {string} refinement
     * @returns {BResponse}
     */
    addActionRefinement(refinement) {
        let bres = { status: 0 };
        this.actionRefinements.push(refinement);
        bres.status = bc.st1200;
        return bres;
    }
    /**
     * Deletes a property with a specific name
     * @param {string} propname
     * @param {string} propvalue
     * @returns {BResponse}
     */
    delProp(propname, propvalue) {
        let bres = { status: 0 };
        if (this.props[propname] !== undefined) {
            delete this.props[propname];
        }
        bres.status = bc.st1200;
        return bres;
    }
    /**
     * Writes the data of this graph to a N3 triple-store, usually the one of the Policy
     * @param policyN3store
     */
    writeToTriplestore(policyN3store) {
        let actionBnId = "_:refaction01";
        let actionId = "";
        for (let prop in this.props) {
            let propValue = this.props[prop];
            if (this.actionRefinements.length > 0) {
                if (prop === odrlCore.action) {
                    actionId = propValue;
                    policyN3store.addTriple(this.uid, prop, actionBnId);
                }
                else {
                    policyN3store.addTriple(this.uid, prop, propValue);
                }
            }
            else {
                policyN3store.addTriple(this.uid, prop, propValue);
            }
        }
        if (this.actionRefinements.length > 0) {
            policyN3store.addTriple(actionBnId, rdf.value, actionId);
            this.actionRefinements.forEach(function (refinement) {
                policyN3store.addTriple(actionBnId, odrlCore.refinement, refinement);
            });
        }
    }
}
exports.AnyGraph = AnyGraph;
//# sourceMappingURL=AnyGraph.js.map