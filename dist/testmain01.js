"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ORPol = require("./models/Policy");
const Rules = require("./models/Rule");
const Constraints = require("./models/Constraint");
const odrlCore = require("./models/odrlCoreVocabulary");
const rml = require("./models/rightsmlVocabulary");
const nnh = require("./services/nonnormativeHelp");
const tran2JLD = require("./services/transformToJsonLd");
function testImEx13() {
    /*
    ODRL IM.CR Example 13
{
    "@context": "http://www.w3.org/ns/odrl.jsonld",
    "@type": "Offer",
    "uid": "http://example.com/policy:6163",
    "profile": "http://example.com/odrl:profile:10",
    "permission": [{
       "target": "http://example.com/document:1234",
       "assigner": "http://example.com/org:616",
       "action": "distribute",
       "constraint": [{
           "leftOperand": "dateTime",
           "operator": "lt",
           "rightOperand": "2018-01-01"
       }]
   }]
}
    */
    let polA = new ORPol.Policy("http://example.com/policy:6163", "http://www.w3.org/ns/odrl/2/Offer");
    polA.addProfiles(['http://iptc.org/std/RightsML/2/']);
    let c1uid = "_:C1";
    let c1 = new Constraints.Constraint(c1uid, nnh.prefixOdrlNs("dateTime"), nnh.prefixOdrlNs("lt"), '"2018-01-01"'); // note: literal values must be delimited by double quote characters = N3 requirement
    c1.writeToTriplestore(polA.policyN3store);
    let perm1uid = "_:Pm1";
    let p1 = new Rules.Permission(perm1uid, nnh.prefixOdrlNs("distribute"), "http://example.com/document:1234");
    p1.setAssigner("http://example.com/org:616");
    p1.addConstraint(c1uid);
    p1.writeToTriplestore(polA.policyN3store);
    polA.addPermission(perm1uid);
    let basename = "polAtestImEx13";
    polA.writeToFile('./testdataout/' + basename + '.ttl', "");
    polA.writeToFile('./testdataout/' + basename + '=nquads.txt', "N-Triples");
    tran2JLD.transformNquadsToJsonld(basename);
}
function testImEx22() {
    /*
    ODRL IM.CR Example 22
 {
    "@context": "http://www.w3.org/ns/odrl.jsonld",
    "@type": "Offer",
    "uid": "http://example.com/policy:88",
    "profile": "http://example.com/odrl:profile:09",
    "permission": [{
        "assigner": "http://example.com/assigner:sony",
        "target": "http://example.com/music/1999.mp3",
        "action": "play",
        "duty": [{
           "action": [{
              "rdf:value": { "@id": "odrl:compensate" },
              "refinement": [{
                 "leftOperand": "payAmount",
                 "operator": "eq",
                 "rightOperand": "5.00",
                 "unit": "http://dbpedia.org/resource/Euro"
              }]
            }],
            "constraint": [{
                "leftOperand": "event",
                "operator": "lt",
                "rightOperand": "policyUsage"
            }]
        }]
    }]
 }
    */
    let polA = new ORPol.Policy("http://example.com/policy:88", "http://www.w3.org/ns/odrl/2/Offer");
    polA.addProfiles(['http://iptc.org/std/RightsML/2/']);
    let ref1uid = "_:Ref1";
    let ref1 = new Constraints.Constraint(ref1uid, rml.payAmount, odrlCore.eq, '"5.0"');
    ref1.setUnit("http://dbpedia.org/resource/Euro");
    ref1.writeToTriplestore(polA.policyN3store);
    let c1uid = "_:C1";
    let c1 = new Constraints.Constraint(c1uid, nnh.prefixOdrlNs("event"), nnh.prefixOdrlNs("lt"), rml.policyUsage);
    c1.writeToTriplestore(polA.policyN3store);
    let duty1uid = "_:D1";
    let duty1 = new Rules.DutyE(duty1uid, rml.compensate, "");
    duty1.addConstraint(c1uid);
    duty1.addActionRefinement(ref1uid);
    duty1.writeToTriplestore(polA.policyN3store);
    let perm1uid = "_:Pm1";
    let p1 = new Rules.Permission(perm1uid, nnh.prefixOdrlNs("play"), "http://example.com/music/1999.mp3");
    p1.setAssigner("http://example.com/assigner:sony");
    p1.addDuty(duty1uid);
    p1.writeToTriplestore(polA.policyN3store);
    polA.addPermission(perm1uid);
    let basename = "polAtestImEx22";
    polA.writeToFile('./testdataout/' + basename + '.ttl', "");
    polA.writeToFile('./testdataout/' + basename + '=nquads.txt', "N-Triples");
    tran2JLD.transformNquadsToJsonld(basename);
}
function testImEx20() {
    /*
    ODRL IM.CR Example 20
{
  "@context": "http://www.w3.org/ns/odrl.jsonld",
  "@type": "Agreement",
  "uid": "http://example.com/policy:42",
  "profile": "http://example.com/odrl:profile:09",
  "obligation": [{
      "assigner": "http://example.com/org:43",
      "assignee": "http://example.com/person:44",
      "action": [{
          "rdf:value": {
            "@id": "odrl:compensate"
          },
          "refinement": [
            {
              "leftOperand": "payAmount",
              "operator": "eq",
              "rightOperand": "500.00",
              "unit": "http://dbpedia.org/resource/Euro"
            }]
        }]
    }]
}
    */
    let polA = new ORPol.Policy("http://example.com/policy:42B", "http://www.w3.org/ns/odrl/2/Agreement");
    polA.addProfiles(['http://iptc.org/std/RightsML/2/']);
    let ref1uid = "_:Ref1";
    let ref1 = new Constraints.Constraint(ref1uid, rml.payAmount, odrlCore.eq, '"500.0"');
    ref1.setUnit("http://dbpedia.org/resource/Euro");
    ref1.writeToTriplestore(polA.policyN3store);
    let oblig1uid = "_:O1";
    let o1 = new Rules.DutyE(oblig1uid, rml.compensate, "");
    o1.setAssigner("http://example.com/person:43");
    o1.setAssignee("http://example.com/org:44");
    o1.addActionRefinement(ref1uid);
    o1.writeToTriplestore(polA.policyN3store);
    polA.addObligation(oblig1uid);
    let basename = "polAtestImEx20";
    polA.writeToFile('./testdataout/' + basename + '.ttl', "");
    polA.writeToFile('./testdataout/' + basename + '=nquads.txt', "N-Triples");
    tran2JLD.transformNquadsToJsonld(basename);
}
function testImEx24() {
    /*
    ODRL IM.CR Example 24
{
    "@context": "http://www.w3.org/ns/odrl.jsonld",
    "@type": "Agreement",
    "uid": "http://example.com/policy:33CC",
    "profile": "http://example.com/odrl:profile:09",
    "prohibition": [{
        "target": "http://example.com/data:77",
        "assigner": "http://example.com/person:88",
        "assignee": "http://example.com/org:99",
        "action": "index",
        "remedy": [{
            "action": "anonymize",
            "target": "http://example.com/data:77"
        }]
    }]
}
     */
    let polA = new ORPol.Policy("http://example.com/policy:33CC", "http://www.w3.org/ns/odrl/2/Agreement");
    polA.addProfiles(['http://iptc.org/std/RightsML/2/']);
    let rem1uid = "_:Rem1";
    let rem1 = new Rules.DutyB(rem1uid, nnh.prefixOdrlNs("anonymize"), "http://example.com/data:77");
    rem1.writeToTriplestore(polA.policyN3store);
    let prohib1uid = "_:Proh1";
    let prohib1 = new Rules.Prohibition(prohib1uid, nnh.prefixOdrlNs("index"), "http://example.com/data:77");
    prohib1.setAssigner("http://example.com/person:88");
    prohib1.setAssignee("http://example.com/org:99");
    prohib1.addRemedy(rem1uid);
    prohib1.writeToTriplestore(polA.policyN3store);
    polA.addProphibition(prohib1uid);
    let basename = "polAtestImEx24";
    polA.writeToFile('./testdataout/' + basename + '.ttl', "");
    polA.writeToFile('./testdataout/' + basename + '=nquads.txt', "N-Triples");
    tran2JLD.transformNquadsToJsonld(basename);
}
function testRmlExGeoDuty1() {
    /*
    RightsML example at http://dev.iptc.org/RightsML-Combined-Example-geographic-and-duty-to-pay
    */
    let polA = new ORPol.Policy("http://epa.eu/cv/policy/2", "http://www.w3.org/ns/odrl/2/Set");
    polA.addProfiles(['http://iptc.org/std/RightsML/2/']);
    let c1uid = "_:C1";
    let c1 = new Constraints.Constraint(c1uid, nnh.prefixOdrlNs("spatial"), odrlCore.eq, "http://cvx.iptc.org/iso3166-1a3/DEU");
    c1.writeToTriplestore(polA.policyN3store);
    let duty1uid = "_:D1";
    let duty1 = new Rules.DutyE(duty1uid, nnh.prefixOdrlNs("nextPolicy"), "http://epa.eu/cv/policy/3");
    duty1.writeToTriplestore(polA.policyN3store);
    let perm1uid = "_:Pm1";
    let p1 = new Rules.Permission(perm1uid, nnh.prefixOdrlNs("grantUse"), "urn:newsml:epa.eu:20090101:120111-999-000013");
    p1.setAssigner("http://example.com/cv/party/epa");
    p1.setAssignee("http://example.com/cv/party/dpa");
    p1.addConstraint(c1uid);
    p1.addDuty(duty1uid);
    p1.writeToTriplestore(polA.policyN3store);
    polA.addPermission(perm1uid);
    let basename = "polAtestRmlExGeoDuty1";
    polA.writeToFile('./testdataout/' + basename + '.ttl', "");
    polA.writeToFile('./testdataout/' + basename + '=nquads.txt', "N-Triples");
    tran2JLD.transformNquadsToJsonld(basename);
}
function testRmlExGeoTempor1() {
    /*
    RightsML example at http://dev.iptc.org/RightsML-Combined-Example-geographic-and-time-period
    */
    let polA = new ORPol.Policy("http://gimages.info/cv/policy/2", "http://www.w3.org/ns/odrl/2/Set");
    polA.addProfiles(['http://iptc.org/std/RightsML/2/']);
    let c1uid = "_:C1";
    let c1 = new Constraints.Constraint(c1uid, nnh.prefixOdrlNs("spatial"), odrlCore.neq, "http://cvx.iptc.org/iso3166-1a3/GBR");
    c1.writeToTriplestore(polA.policyN3store);
    let c2uid = "_:C2";
    let c2 = new Constraints.Constraint(c2uid, nnh.prefixOdrlNs("dateTime"), odrlCore.lt, '"2013-06-15"');
    c2.setDataType("http://www.w3.org/2001/XMLSchema#dateTime");
    c2.writeToTriplestore(polA.policyN3store);
    let perm1uid = "_:Pm1";
    let p1 = new Rules.Permission(perm1uid, nnh.prefixOdrlNs("use"), "http://example.org/assets/120111-999-000013");
    p1.setAssigner("http://companyreg.com/gim");
    p1.setAssignee("http://companyreg.com/gim/clientgroup1");
    p1.addConstraint(c1uid);
    p1.addConstraint(c2uid);
    p1.writeToTriplestore(polA.policyN3store);
    polA.addPermission(perm1uid);
    let basename = "polAtestRmlExGeoTemp1";
    polA.writeToFile('./testdataout/' + basename + '.ttl', "");
    polA.writeToFile('./testdataout/' + basename + '=nquads.txt', "N-Triples");
    tran2JLD.transformNquadsToJsonld(basename);
}
// ****** MAIN functions **********************************************************
testImEx13(); // Test of a simple Permission
testImEx22(); // Test of a more complex Permission
testImEx20(); // Test of an Obligation
testImEx24(); // Test of a Prohibition
testRmlExGeoDuty1(); // Test of a RightsML Example with geo-constraint and a duty to pay
testRmlExGeoTempor1(); // Test of a RightsML Example with geographic and temporal constraints
//# sourceMappingURL=testmain01.js.map