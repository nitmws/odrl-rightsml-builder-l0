import * as ORPol from "./models/Policy";
import * as Rules from "./models/Rule";
import * as Constraints from "./models/Constraint";
import * as odrl from "./models/odrlCoreVocabulary";
import * as rml from "./models/rightsmlVocabulary"
import * as nnh from "./services/nonnormativeHelp";
import * as tran2JLD from "./services/transformToJsonLd"

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
    let polA: ORPol.Policy = new ORPol.Policy("http://example.com/policy:6163", "http://www.w3.org/ns/odrl/2/Offer");
    polA.addProfiles(['http://iptc.org/std/RightsML/2/'])

    let c1uid = "_:C1";
    let c1: Constraints.Constraint = new Constraints.Constraint(c1uid,  nnh.prefixOdrlNs("dateTime"),
        nnh.prefixOdrlNs("lt"), '"2018-01-01"'); // note: literal values must be delimited by double quote characters = N3 requirement
    c1.writeToTriplestore(polA.policyN3store);

    let perm1uid = "_:Pm1";
    let p1: Rules.Permission = new Rules.Permission(perm1uid, nnh.prefixOdrlNs("distribute"), "http://example.com/document:1234");
    p1.setAssigner("http://example.com/org:616");
    p1.addConstraint(c1uid);
    p1.writeToTriplestore(polA.policyN3store);

    polA.addPermission(perm1uid);

    let basename = "polAtestImEx13";
    polA.writeToFile('./testdataout/' + basename + '.ttl', "")
    polA.writeToFile('./testdataout/' + basename + '=nquads.txt', "N-Triples")

    tran2JLD.transformNquadsToJsonld(basename);
}

function testImEx22(){
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
    let polA: ORPol.Policy = new ORPol.Policy("http://example.com/policy:88", "http://www.w3.org/ns/odrl/2/Offer");
    polA.addProfiles(['http://iptc.org/std/RightsML/2/'])

    let ref1uid = "_:Ref1";
    let ref1: Constraints.Constraint = new Constraints.Constraint(ref1uid,rml.payAmount, odrl.eq, '"5.0"');
    ref1.setUnit("http://dbpedia.org/resource/Euro");
    ref1.writeToTriplestore(polA.policyN3store);

    let c1uid = "_:C1";
    let c1: Constraints.Constraint = new Constraints.Constraint(c1uid,  nnh.prefixOdrlNs("event"),
        nnh.prefixOdrlNs("lt"), rml.policyUsage);
    c1.writeToTriplestore(polA.policyN3store);

    let duty1uid = "_:D1";
    let duty1: Rules.DutyE = new Rules.DutyE(duty1uid, rml.compensate,"");
    duty1.addConstraint(c1uid);
    duty1.addActionRefinement(ref1uid);
    duty1.writeToTriplestore(polA.policyN3store);

    let perm1uid = "_:Pm1";
    let p1: Rules.Permission = new Rules.Permission(perm1uid, nnh.prefixOdrlNs("play"), "http://example.com/music/1999.mp3");
    p1.setAssigner("http://example.com/assigner:sony");
    p1.addDuty(duty1uid);
    p1.writeToTriplestore(polA.policyN3store);

    polA.addPermission(perm1uid);

    let basename = "polAtestImEx22";
    polA.writeToFile('./testdataout/' + basename + '.ttl', "")
    polA.writeToFile('./testdataout/' + basename + '=nquads.txt', "N-Triples")

    tran2JLD.transformNquadsToJsonld(basename);

}

function testImEx20(){
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

    let polA: ORPol.Policy = new ORPol.Policy("http://example.com/policy:42B", "http://www.w3.org/ns/odrl/2/Agreement");
    polA.addProfiles(['http://iptc.org/std/RightsML/2/'])

    let ref1uid = "_:Ref1";
    let ref1: Constraints.Constraint = new Constraints.Constraint(ref1uid,rml.payAmount, odrl.eq, '"500.0"');
    ref1.setUnit("http://dbpedia.org/resource/Euro");
    ref1.writeToTriplestore(polA.policyN3store);


    let oblig1uid = "_:O1";
    let o1: Rules.DutyE = new Rules.DutyE(oblig1uid, rml.compensate,"");
    o1.setAssigner("http://example.com/person:43");
    o1.setAssignee("http://example.com/org:44");
    o1.addActionRefinement(ref1uid);
    o1.writeToTriplestore(polA.policyN3store);

    polA.addObligation(oblig1uid);


    let basename = "polAtestImEx20";
    polA.writeToFile('./testdataout/' + basename + '.ttl', "")
    polA.writeToFile('./testdataout/' + basename + '=nquads.txt', "N-Triples")

    tran2JLD.transformNquadsToJsonld(basename);
}

function testImEx24(){
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
    let polA: ORPol.Policy = new ORPol.Policy("http://example.com/policy:33CC", "http://www.w3.org/ns/odrl/2/Agreement");
    polA.addProfiles(['http://iptc.org/std/RightsML/2/'])

    let rem1uid = "_:Rem1";
    let rem1: Rules.DutyB = new Rules.DutyB(rem1uid, nnh.prefixOdrlNs("anonymize"),"http://example.com/data:77");
    rem1.writeToTriplestore(polA.policyN3store);

    let prohib1uid = "_:Proh1";
    let prohib1: Rules.Prohibition = new Rules.Prohibition(prohib1uid, nnh.prefixOdrlNs("index"), "http://example.com/data:77");
    prohib1.setAssigner("http://example.com/person:88");
    prohib1.setAssignee("http://example.com/org:99");
    prohib1.addRemedy(rem1uid)
    prohib1.writeToTriplestore(polA.policyN3store);

    polA.addProphibition(prohib1uid);

    let basename = "polAtestImEx24";
    polA.writeToFile('./testdataout/' + basename + '.ttl', "")
    polA.writeToFile('./testdataout/' + basename + '=nquads.txt', "N-Triples")

    tran2JLD.transformNquadsToJsonld(basename);
}



// ****** MAIN functions **********************************************************

testImEx13(); // Test of a simple Permission
testImEx22(); // Test of a more complex Permission
testImEx20(); // Test of an Obligation
testImEx24(); // Test of a Prohibition