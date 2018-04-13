"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  This code creates an ODRL Policy based on IPTC's RightsML implementation example Simple - Geographic
  http://dev.iptc.org/RightsML-Simple-Example-Geographic
 */
const tran2JLD = require("./services/transformToJsonLd");
const odrlCore = require("./models/odrlCoreVocabulary");
const nnh = require("./services/nonnormativeHelp");
const ORPol = require("./models/Policy");
const rml = require("./models/rightsmlVocabulary");
const Rules = require("./models/Rule");
const Constraints = require("./models/Constraint");
function testRmlExSimpleGeo1() {
    /*
    RightsML example at http://dev.iptc.org/RightsML-Combined-Example-geographic-and-duty-to-pay
    */
    let polA = new ORPol.Policy("http://example.com/RightsML/policy/idGeog1", "http://www.w3.org/ns/odrl/2/Set");
    polA.addProfiles([rml.profileUrl]);
    let c1uid = "_:C1";
    let c1 = new Constraints.Constraint(c1uid, nnh.prefixOdrlNs("spatial"), odrlCore.eq, "http://cvx.iptc.org/iso3166-1a3/DEU");
    c1.writeToTriplestore(polA.policyN3store);
    let perm1uid = "_:Pm1";
    let p1 = new Rules.Permission(perm1uid, nnh.prefixOdrlNs("distribute"), "urn:newsml:epa.eu:20090101:120111-999-000013");
    p1.setAssigner("http://example.com/cv/party/epa");
    p1.setAssignee("http://example.com/cv/policy/group/epapartners");
    p1.addConstraint(c1uid);
    p1.writeToTriplestore(polA.policyN3store);
    polA.addPermission(perm1uid);
    let basename = "polAtestRmlExSimpleGeo1";
    polA.writeToFile('./testdataout/' + basename + '.ttl', "");
    polA.writeToFile('./testdataout/' + basename + '=nquads.txt', "N-Triples");
    tran2JLD.transformNquadsToJsonld(basename);
}
// ****** MAIN functions **********************************************************
testRmlExSimpleGeo1(); // Test of a RightsML Example with geo-constraint
//# sourceMappingURL=testRMLsimplegeographic1.js.map