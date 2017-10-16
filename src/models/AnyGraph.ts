import * as bc from "./BuilderComm"
import * as odrlCore from "./odrlCoreVocabulary"
import * as rdf from "./rdfVocabulary"

/**
 * The generic class of the ODRL-RightsML Builder.
 */
export class AnyGraph {
    uid: string;
    props: any;
    actionRefinements: any;
    constructionStatus: bc.BResponse;

    constructor(uid: string){
        this.uid = uid;
        this.props = {};
        this.actionRefinements = [];
        this.constructionStatus = {status : bc.stOK};
    }

    /**
     * Adds a value of any property of type array with a specific name
     * @param {string} propname
     * @param {string} propvalue
     * @returns {BResponse}
     */
    protected addPropValue(propname: string, propvalue: string) : bc.BResponse {
        let bres: bc.BResponse = {status : 0};
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
    protected setPropValue(propname: string, propvalue: string) : bc.BResponse {
        let bres: bc.BResponse = {status : 0};
        this.props[propname] = propvalue;
        bres.status = bc.st1200;
        return bres;
    }

    /** Adds a refinement of the action of the graph
     *
     * @param {string} refinement
     * @returns {BResponse}
     */
    protected addActionRefinement(refinement: string){
        let bres: bc.BResponse = {status : 0};
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
    protected delProp(propname: string, propvalue: string) : bc.BResponse {
        let bres: bc.BResponse = {status : 0};
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
    writeToTriplestore(policyN3store : any){
        let actionBnId: string = "_:refaction01";
        let actionId: string = "";
        for (let prop in this.props){
            let propValue = this.props[prop];
            if (this.actionRefinements.length > 0){
                if (prop === odrlCore.action){
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
            this.actionRefinements.forEach(function(refinement: string){
                policyN3store.addTriple(actionBnId, odrlCore.refinement, refinement);
            })
        }

    }

}